import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ভয়েস স্টুডিও — বাংলা ও ইংরেজি AI ভয়েস",
  description:
    "টেক্সট লিখুন, স্বাভাবিক AI ভয়েসে শুনুন ও MP3 ডাউনলোড করুন। বাংলা ও ইংরেজি টেক্সট-টু-স্পিচ, ভয়েস লাইব্রেরি ও ক্রেডিট হিসাব।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>
        <Header />
        <main className="pb-16">{children}</main>
        <footer className="border-t border-[#1e3a5f] bg-[#0b1220]">
          <div className="wrap py-8 text-slate-400 text-[15px]">
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
          </div>
        </footer>
      </body>
    </html>
  );
}
