"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./useTheme";

// Shared header for both languages. The language link always points to the
// OTHER language's home: on /en it shows বাংলা → /, everywhere else it shows
// English → /en. All other links are unchanged. The theme toggle switches
// light/dark for the whole site (default dark, remembered in localStorage).
export default function Header() {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 ${
        dark ? "bg-[#0b1220] text-white" : "bg-white text-slate-900 border-b border-slate-200"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link href={isEnglish ? "/en" : "/"} className="font-extrabold text-lg" style={{ color: dark ? "#fff" : "#0f172a", textDecoration: "none" }}>
          🎙️ {isEnglish ? "Voice Studio" : "ভয়েস স্টুডিও"}
        </Link>
        <nav className="flex items-center gap-4 text-[15px] font-bold flex-wrap justify-end">
          <Link href="/app" style={{ color: dark ? "#fff" : "#0f172a", textDecoration: "none" }}>{isEnglish ? "Studio" : "স্টুডিও"}</Link>
          <Link href="/pricing" style={{ color: dark ? "#fff" : "#0f172a", textDecoration: "none" }}>{isEnglish ? "Pricing" : "প্রাইসিং"}</Link>
          <Link href="/admin" style={{ color: dark ? "#fff" : "#0f172a", textDecoration: "none" }}>{isEnglish ? "Admin" : "অ্যাডমিন"}</Link>
          <Link
            href={isEnglish ? "/" : "/en"}
            style={{ color: dark ? "#bae6fd" : "#0284c7", textDecoration: "none" }}
          >
            {isEnglish ? "বাংলা" : "English"}
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-label={isEnglish ? "Toggle light / dark mode" : "লাইট / ডার্ক মোড বদলান"}
            className="btn"
            style={{ minHeight: 40, padding: "8px 14px" }}
          >
            {dark ? (isEnglish ? "☀️ Light" : "☀️ লাইট") : (isEnglish ? "🌙 Dark" : "🌙 ডার্ক")}
          </button>
          <Link href="/app" className="btn btn-primary" style={{ minHeight: 40, padding: "8px 16px" }}>
            {isEnglish ? "Free trial" : "ফ্রি ট্রায়াল"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
