import Link from "next/link";
import { DRAFT_PLANS, formatChars } from "@/lib/pricing";

// Home page — dark redesign in the style of the screenshot the owner sent
// (10 Minute School home page, dark version): deep-black background, glowing
// hero, colourful category cards, gradient own-pace banner, plan list,
// benefit tiles, FAQ and final CTA, in that order.
// STYLE ONLY: no 10MS branding, slogan, course names, images, testimonials,
// phone number or app links are copied. Every section below uses VoiceHub's
// own V1 content, prices and honest limits, unchanged in substance.
// Other pages (/app, /pricing, /admin) are untouched, so nothing else regresses.

const VOICE_CARDS = [
  { title: "বাংলা ভয়েস", sub: "বাংলা স্ক্রিপ্ট থেকে স্বাভাবিক ভয়েস", tone: "border-sky-400/40 bg-sky-400/10" },
  { title: "ইংরেজি ভয়েস", sub: "ইংরেজি স্ক্রিপ্ট থেকে স্বাভাবিক ভয়েস", tone: "border-blue-400/40 bg-blue-400/10" },
  { title: "Flash v2.5 — দ্রুত", sub: "দ্রুত জেনারেশনের জন্য", tone: "border-emerald-400/40 bg-emerald-400/10" },
  { title: "Multilingual v2", sub: "বহু ভাষার মডেল", tone: "border-orange-400/40 bg-orange-400/10" },
  { title: "Eleven v3 — ফ্ল্যাগশিপ", sub: "সবচেয়ে উন্নত মডেল", tone: "border-violet-400/40 bg-violet-400/10" },
  { title: "MP3 ডাউনলোড", sub: "তৈরি ভয়েস সরাসরি ডাউনলোড করুন", tone: "border-teal-400/40 bg-teal-400/10" },
];

const FEATURE_CARDS = [
  { icon: "🎙️", title: "টেক্সট-টু-স্পিচ স্টুডিও", text: "বাংলা + ইংরেজি টেক্সট, ভয়েস বাছাই, মডেল বাছাই, ক্যারেক্টার কাউন্টার, MP3 ডাউনলোড।" },
  { icon: "🕘", title: "হিস্ট্রি", text: "আগের জেনারেশনের হিসাব (কত ক্যারেক্টার, কোন ভয়েস, কোন মডেল) — আবার তৈরি করা যায়।" },
  { icon: "🪙", title: "ক্রেডিট হিসাব", text: "প্রতি জেনারেশনে কত ক্যারেক্টার খরচ হলো, তার স্বচ্ছ হিসাব। V1-এ ডেমো লেজার; Supabase সংযোগ V2-তে।" },
  { icon: "🔒", title: "নিরাপদ API ব্যবহার", text: "API key শুধু সার্ভারে থাকে — ব্রাউজারে কখনো পাঠানো হয় না, লগেও রাখা হয় না।" },
  { icon: "✍️", title: "৫,০০০ ক্যারেক্টার পর্যন্ত", text: "একবারে বড় স্ক্রিপ্ট পেস্ট করুন — সর্বোচ্চ ৫,০০০ ক্যারেক্টার পর্যন্ত।" },
  { icon: "🎬", title: "ভিডিওর জন্য তৈরি", text: "ভিডিওর ভয়েসওভার, কোর্সের ন্যারেশন, বিজ্ঞাপন বা গল্প — সব কাজে ব্যবহার করুন।" },
];

const BENEFITS = [
  { big: "১,০০০ ≈ ১ মিনিট", small: "প্রায় ১,০০০ ক্যারেক্টার = প্রায় ১ মিনিট ভয়েস" },
  { big: "MP3", small: "তৈরি ভয়েস শুনে MP3 ডাউনলোড করুন" },
  { big: "টেক্সট সংরক্ষণ হয় না", small: "সার্ভারে শুধু সংখ্যা ও হিসাব থাকে, টেক্সট নয়" },
  { big: "সার্ভার-সাইড key", small: "key ব্রাউজারে আসে না, লগেও থাকে না" },
  { big: "হিস্ট্রি", small: "আগের জেনারেশনের পুরো হিসাব দেখুন" },
  { big: "নকল অডিও নেই", small: "key ছাড়া স্টুডিও স্পষ্টভাবে জানিয়ে দেবে" },
];

const FAQS = [
  { q: "ফ্রি ট্রায়াল দিয়ে কি ভিডিও বানিয়ে বিক্রি করা যাবে?", a: "না। ফ্রি ট্রায়াল শুধু অ-বাণিজ্যিক পরীক্ষার জন্য। বাণিজ্যিক ব্যবহারের জন্য পেইড প্ল্যান লাগবে।" },
  { q: "আমার ভয়েস ক্লোন করতে পারবো?", a: "V1-এ নয়। ক্লোনিং পরের ধাপে, শুধু পেইড প্ল্যানে এবং আপনার লিখিত অনুমতি সাপেক্ষে আসবে।" },
  { q: "আমার লেখা টেক্সট কি সংরক্ষণ করা হয়?", a: "না। সার্ভারে শুধু ক্যারেক্টার সংখ্যা, ভয়েস ও মডেলের হিসাব থাকে — টেক্সট সংরক্ষণ করা হয় না।" },
  { q: "API key ছাড়া কি ডেমো শোনা যাবে?", a: "না। key ছাড়া স্টুডিও পরিষ্কারভাবে জানিয়ে দেবে যে key সেট করা হয়নি — কোনো নকল অডিও বাজানো হবে না।" },
];

export default function Home() {
  return (
    <div className="bg-[#050810] text-slate-200">
      {/* Hero — glowing dark hero, like the screenshot's top section */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 50% -40px, rgba(239,68,68,.45), transparent 70%), radial-gradient(500px 260px at 85% 10%, rgba(56,189,248,.25), transparent 70%), radial-gradient(500px 260px at 10% 20%, rgba(249,115,22,.20), transparent 70%)",
          }}
        />
        <div className="wrap relative py-14 md:py-16">
          <span className="chip chip-free">ফ্রি ট্রায়াল সহ — V1</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-5 text-white">
            লেখা দিন,
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300 bg-clip-text text-transparent">
              স্বাভাবিক ভয়েস নিন।
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mt-5">
            বাংলা ও ইংরেজি টেক্সট থেকে মানুষের মতো শোনায় এমন ভয়েস তৈরি করুন।
            ভিডিওর ভয়েসওভার, কোর্সের ন্যারেশন, বিজ্ঞাপন বা গল্প — লিখুন, ভয়েস
            বাছুন, MP3 ডাউনলোড করুন।
          </p>
          <div className="flex gap-3 flex-wrap mt-7">
            <Link href="/app" className="btn btn-primary">ফ্রি ট্রায়াল শুরু করুন →</Link>
            <Link href="/pricing" className="btn btn-outline-white">প্রাইসিং দেখুন</Link>
          </div>
          <p className="text-slate-400 text-sm mt-5">
            প্রায় ১,০০০ ক্যারেক্টার = প্রায় ১ মিনিট ভয়েস। ফ্রি ট্রায়াল শুধু
            অ-বাণিজ্যিক ব্যবহারের জন্য।
          </p>

          {/* Colourful voice / model cards — the screenshot's batch-card row, with our own content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
            {VOICE_CARDS.map((c) => (
              <Link
                key={c.title}
                href="/app"
                className={`rounded-2xl border p-4 hover:-translate-y-1 transition-transform ${c.tone}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p className="font-extrabold text-white leading-snug">{c.title}</p>
                <p className="text-slate-400 text-sm mt-1 leading-snug">{c.sub}</p>
                <p className="text-sky-300 text-sm font-bold mt-3">স্টুডিও →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Voice features — dark rounded panel, like the screenshot's category panels */}
      <section className="wrap py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">ভয়েসে নতুন মাত্রা</h2>
          <p className="text-slate-400 mt-2">V1-এ যা আছে — সব এক জায়গায়।</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {FEATURE_CARDS.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
                <p className="text-2xl">{f.icon}</p>
                <h3 className="font-extrabold text-white mt-2">{f.title}</h3>
                <p className="text-slate-400 text-[15px] mt-1 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Own-pace gradient banner — the screenshot's gradient banner, with our own steps */}
      <section className="wrap pb-10">
        <div className="rounded-3xl bg-gradient-to-br from-sky-900 via-[#0b1220] to-indigo-900 border border-white/10 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">নিজের গতিতে ভয়েস বানান</h2>
          <p className="text-slate-300 mt-2">
            কোনো তাড়া নেই — লিখুন, টোন ঠিক করুন, শুনে তারপর ডাউনলোড করুন।
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { n: "১", t: "টেক্সট লিখুন", d: "বাংলা বা ইংরেজি স্ক্রিপ্ট পেস্ট করুন — সর্বোচ্চ ৫,০০০ ক্যারেক্টার।" },
              { n: "২", t: "ভয়েস ও মডেল বাছুন", d: "ভয়েস লাইব্রেরি থেকে ভয়েস নিন, মডেল ও টোন (stability / similarity) ঠিক করুন।" },
              { n: "৩", t: "শুনুন ও ডাউনলোড করুন", d: "Generate চাপুন, অডিও প্লেয়ারে শুনুন, MP3 ডাউনলোড করে ভিডিওতে ব্যবহার করুন।" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-3xl font-extrabold text-sky-300">{s.n}</p>
                <h3 className="font-extrabold text-white mt-2">{s.t}</h3>
                <p className="text-slate-300 text-[15px] mt-1 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All plans — the screenshot's batch-list panel, with our own DRAFT plans */}
      <section className="wrap pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">সব প্ল্যান এক জায়গায়</h2>
          <p className="text-slate-400 mt-2">
            নিচের দাম এখনো চূড়ান্ত নয় — বিক্রির আগে মালিকের অনুমোদন লাগবে। (DRAFT)
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {DRAFT_PLANS.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl border p-5 bg-[#0b1220] ${p.highlight ? "border-sky-400/60" : "border-white/10"}`}
              >
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-extrabold text-lg text-white">{p.name}</h3>
                  {p.highlight && <span className="chip chip-free">জনপ্রিয়</span>}
                </div>
                <p className="text-2xl font-extrabold text-white mt-2">{p.priceBdt}</p>
                <p className="text-slate-400">{p.priceUsd}</p>
                <p className="text-slate-300 mt-2">
                  {formatChars(p.chars)} ক্যারেক্টার / মাস · {p.minutes}
                </p>
                <ul className="mt-3 list-disc pl-5 text-slate-300 text-[15px] space-y-1">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/pricing" className="btn btn-primary">পুরো প্রাইসিং ও খরচের হিসাব →</Link>
          </div>
        </div>
      </section>

      {/* Benefits tiles — the screenshot's benefit tiles, with our own honest benefits */}
      <section className="wrap pb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">ভয়েস স্টুডিও ব্যবহার করলে যা পাচ্ছেন</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {BENEFITS.map((b) => (
            <div key={b.big} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xl md:text-2xl font-extrabold text-white leading-snug">{b.big}</p>
              <p className="text-slate-400 text-[15px] mt-1 leading-relaxed">{b.small}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ + honest limits */}
      <section className="wrap pb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">সাধারণ প্রশ্ন</h2>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-6 mt-6 space-y-5">
          {FAQS.map((f) => (
            <div key={f.q}>
              <p className="font-extrabold text-white">{f.q}</p>
              <p className="text-slate-400 mt-1">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 mt-4 text-amber-100">
          <strong>সৎ সীমা — V1-এ যা নেই:</strong> ভয়েস ক্লোনিং এখনো নেই। ক্লোনিং
          শুধু পেইড প্ল্যানে আসবে, এবং শুধু যার ভয়েস তার লিখিত অনুমতি থাকলে।
          API key সেট না থাকলে কোনো অডিও তৈরি হয় না — নকল অডিও দেওয়া হয় না।
        </div>
      </section>

      {/* Final CTA */}
      <section className="wrap pb-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-rose-900/60 via-[#0b1220] to-sky-900/60 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">আজই ফ্রি ট্রায়াল শুরু করুন</h2>
          <p className="text-slate-300 mt-2">লিখুন, ভয়েস বাছুন, MP3 ডাউনলোড করুন।</p>
          <div className="mt-6">
            <Link href="/app" className="btn btn-primary">স্টুডিও খুলুন →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
