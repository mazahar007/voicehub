import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#0b1220] text-white sticky top-0 z-50">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link href="/" className="font-extrabold text-lg" style={{ color: "#fff", textDecoration: "none" }}>
          🎙️ ভয়েস স্টুডিও
        </Link>
        <nav className="flex items-center gap-4 text-[15px] font-bold flex-wrap justify-end">
          <Link href="/app" style={{ color: "#fff", textDecoration: "none" }}>স্টুডিও</Link>
          <Link href="/pricing" style={{ color: "#fff", textDecoration: "none" }}>প্রাইসিং</Link>
          <Link href="/admin" style={{ color: "#fff", textDecoration: "none" }}>অ্যাডমিন</Link>
          <Link href="/en" style={{ color: "#bae6fd", textDecoration: "none" }}>English</Link>
          <Link href="/app" className="btn btn-primary" style={{ minHeight: 40, padding: "8px 16px" }}>
            ফ্রি ট্রায়াল
          </Link>
        </nav>
      </div>
    </header>
  );
}
