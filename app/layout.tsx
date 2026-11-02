import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ভয়েস স্টুডিও — বাংলা ও ইংরেজি AI ভয়েস",
  description:
    "টেক্সট লিখুন, স্বাভাবিক AI ভয়েসে শুনুন ও MP3 ডাউনলোড করুন। বাংলা ও ইংরেজি টেক্সট-টু-স্পিচ, ভয়েস লাইব্রেরি ও ক্রেডিট হিসাব।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>
        {/* Pre-paint theme: apply the stored theme before first render so the
            page never flashes the wrong mode. Default is dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('voicehub-theme');if(t!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
