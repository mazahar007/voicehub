"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "./useTheme";

export default function Footer() {
  const pathname = usePathname() || "";
  const en = pathname.startsWith("/en");
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <footer className={`border-t ${dark ? "border-[#1e3a5f] bg-[#0b1220]" : "border-slate-200 bg-white"}`}>
      <div className={`wrap py-8 text-[15px] ${dark ? "text-slate-400" : "text-slate-600"}`}>
        {en ? (
          <>
            <p className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>Voice Studio — Voice SaaS V1</p>
            <p>
              Voice engine: ElevenLabs API. No official partnership with or
              endorsement by ElevenLabs is claimed.
            </p>
            <p>
              <a href="/app">Studio</a>
              {" · "}
              <a href="/pricing">Pricing (DRAFT)</a>
              {" · "}
              <a href="/admin">Admin</a>
              {" · "}
              <a href="/api/health">API Health</a>
            </p>
          </>
        ) : (
          <>
            <p className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>ভয়েস স্টুডিও — Voice SaaS V1</p>
            <p>
              ভয়েস ইঞ্জিন: ElevenLabs API। ElevenLabs-এর সাথে কোনো অফিসিয়াল
              পার্টনারশিপ বা অনুমোদন দাবি করা হয় না।
            </p>
            <p>
              <a href="/app">স্টুডিও</a>
              {" · "}
              <a href="/pricing">প্রাইসিং (DRAFT)</a>
              {" · "}
              <a href="/admin">অ্যাডমিন</a>
              {" · "}
              <a href="/api/health">API Health</a>
            </p>
          </>
        )}
      </div>
    </footer>
  );
}
