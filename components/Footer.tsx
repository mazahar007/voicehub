"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "";
  const en = pathname.startsWith("/en");

  return (
    <footer className="border-t border-[#1e3a5f] bg-[#0b1220]">
      <div className="wrap py-8 text-slate-400 text-[15px]">
        {en ? (
          <>
            <p className="font-bold text-white">Voice Studio — Voice SaaS V1</p>
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
            <p className="font-bold text-white">ভয়েস স্টুডিও — Voice SaaS V1</p>
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
