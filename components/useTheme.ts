"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const KEY = "voicehub-theme";

// Shared theme state: stored in localStorage, applied as the `dark` class on
// <html>. Default is dark (the current home look). The toggle dispatches a
// window event so Header and Footer stay in sync on the same page.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      stored = null;
    }
    const initial: Theme = stored === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    const handler = (e: Event) => {
      setTheme((e as CustomEvent<Theme>).detail === "light" ? "light" : "dark");
    };
    window.addEventListener("voicehub-theme", handler);
    return () => window.removeEventListener("voicehub-theme", handler);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        // private mode: theme still applies for this session
      }
      document.documentElement.classList.toggle("dark", next === "dark");
      window.dispatchEvent(new CustomEvent<Theme>("voicehub-theme", { detail: next }));
      return next;
    });
  }, []);

  return { theme, toggle };
}
