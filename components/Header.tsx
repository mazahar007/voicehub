"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Shared header for both languages. The language link always points to the
// OTHER language's home: on /en it shows বাংলা → /, everywhere else it shows
// English → /en. All other links are unchanged.
export default function Header() {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  return (
    <header className="bg-[#0b1220] text-white sticky top-0 z-50">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link href={isEnglish ? "/en" : "/"} className="font-extrabold text-lg" style={{ color: "#fff", textDecoration: "none" }}>
          🎙️ {isEnglish ? "Voice Studio" : "ভয়েস স্টুডিও"}
        </Link>
        <nav className="flex items-center gap-4 text-[15px] font-bold flex-wrap justify-end">
          <Link href="/app" style={{ color: "#fff", textDecoration: "none" }}>{isEnglish ? "Studio" : "স্টুডিও"}</Link>
          <Link href="/pricing" style={{ color: "#fff", textDecoration: "none" }}>{isEnglish ? "Pricing" : "প্রাইসিং"}</Link>
          <Link href="/admin" style={{ color: "#fff", textDecoration: "none" }}>{isEnglish ? "Admin" : "অ্যাডমিন"}</Link>
          <Link
            href={isEnglish ? "/" : "/en"}
            style={{ color: "#bae6fd", textDecoration: "none" }}
          >
            {isEnglish ? "বাংলা" : "English"}
          </Link>
          <Link href="/app" className="btn btn-primary" style={{ minHeight: 40, padding: "8px 16px" }}>
            {isEnglish ? "Free trial" : "ফ্রি ট্রায়াল"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
