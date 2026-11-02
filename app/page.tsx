import Link from "next/link";
import { DRAFT_PLANS, formatChars } from "@/lib/pricing";

// Home page — Zilaseba-style dark design (approved preview v3 + beautiful plan
// section), Bengali version. Style tokens from the zilaseba screenshot:
// full dark navy-black #0A0E1A, #0F1626 glass cards with white/10 borders,
// blue → violet → teal gradient headings/buttons, rounded-3xl cards,
// tinted pill chips. Section gaps are large on purpose: py-20 on mobile
// (≈84px) and py-32 on desktop (128px), so sections never merge.
// Content is VoiceHub's own V1 content only — no zilaseba/10MS branding,
// copy, images, phone, email, testimonials or app links are copied.
// Other pages (/app, /pricing, /admin) are untouched.

const WAVE_HEIGHTS = [18, 36, 24, 48, 30, 44, 22, 40];
const VOLUME_WIDTH: Record<string, string> = {
  trial: "8%",
  starter: "35%",
  creator: "65%",
  pro: "100%",
};

function Wave({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-1 ${className}`} aria-hidden>
      {WAVE_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded bg-gradient-to-t from-sky-400 to-teal-300"
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0a0e1a] text-slate-200">
      {/* Hero */}
      <section className="wrap py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">
              ● ফ্রি ট্রায়াল সহ — V1
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-5 text-white">
              লেখা দিন,
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-teal-300 bg-clip-text text-transparent">
                স্বাভাবিক ভয়েস নিন।
              </span>
            </h1>
            <p className="text-slate-400 max-w-xl mt-5">
              বাংলা ও ইংরেজি টেক্সট থেকে মানুষের মতো শোনায় এমন ভয়েস তৈরি করুন।
              ভিডিওর ভয়েসওভার, কোর্সের ন্যারেশন, বিজ্ঞাপন বা গল্প — লিখুন, ভয়েস
              বাছুন, MP3 ডাউনলোড করুন।
            </p>
            <div className="flex gap-2 flex-wrap mt-5">
              {["বাংলা", "ইংরেজি", "MP3 ডাউনলোড", "৫,০০০ ক্যারেক্টার"].map((p) => (
                <span key={p} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
                  {p}
                </span>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap mt-6">
              <Link href="/app" className="btn btn-primary">ফ্রি ট্রায়াল শুরু করুন →</Link>
              <Link href="/pricing" className="btn btn-outline-white">প্রাইসিং দেখুন →</Link>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              প্রায় ১,০০০ ক্যারেক্টার = প্রায় ১ মিনিট ভয়েস। ফ্রি ট্রায়াল শুধু
              অ-বাণিজ্যিক ব্যবহারের জন্য।
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-80"
              style={{ background: "radial-gradient(circle, #7c3aed 0%, #dc2626 55%, transparent 72%)" }}
            />
            <div className="relative rounded-3xl border border-white/10 bg-[#0f1626] p-5">
              <p className="text-sm font-bold text-slate-400">স্টুডিও — লেখা → ওয়েভ → MP3</p>
              <p className="rounded-xl bg-[#1e293b] p-3 mt-3 text-[15px]">
                আমি একজন কনটেন্ট ক্রিয়েটর, আমি আমার ভিডিওর জন্য...
              </p>
              <Wave className="h-14 mt-4" />
              <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
                <span>◉ প্লে · ০:৪২</span>
                <span className="rounded-full bg-cyan-900 text-cyan-200 px-3 py-1 font-bold">MP3 ↓</span>
              </div>
              <div className="flex gap-2 flex-wrap mt-4">
                <span className="rounded-full border border-violet-400/50 text-violet-200 px-3 py-1 text-sm">Rachel</span>
                <span className="rounded-full border border-cyan-400/50 text-cyan-200 px-3 py-1 text-sm">George</span>
                <span className="rounded-full border border-amber-400/50 text-amber-200 px-3 py-1 text-sm">Flash v2.5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="wrap pb-20 md:pb-32">
        <div className="rounded-3xl border border-white/10 bg-[#0f1626] p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div><p className="text-2xl font-extrabold text-white">৫,০০০</p><p className="text-slate-400 text-sm">ক্যারেক্টার পর্যন্ত একবারে</p></div>
          <div><p className="text-2xl font-extrabold text-white">৩টি</p><p className="text-slate-400 text-sm">মডেল: Flash, Multilingual, v3</p></div>
          <div><p className="text-2xl font-extrabold text-white">২+</p><p className="text-slate-400 text-sm">ভয়েস: Rachel, George + API লাইব্রেরি</p></div>
          <div><p className="text-2xl font-extrabold text-white">১,০০০ ≈ ১ মিনিট</p><p className="text-slate-400 text-sm">ভয়েসের হিসাব</p></div>
        </div>
      </section>

      {/* Features */}
      <section className="wrap pb-20 md:pb-32">
        <div className="text-center">
          <p className="text-cyan-300 text-sm font-extrabold">সুবিধা</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">এক জায়গায় সব ভয়েস সুবিধা</h2>
          <p className="text-slate-400 mt-2">V1-এ যা আছে, সব এক জায়গায়।</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-4 mt-8">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-b from-[#1e293b] to-[#0f1626] p-6">
            <h3 className="font-extrabold text-white text-xl">টেক্সট-টু-স্পিচ স্টুডিও</h3>
            <p className="text-slate-400 mt-2">বাংলা + ইংরেজি টেক্সট, ভয়েস ও মডেল বাছাই, ক্যারেক্টার কাউন্টার, MP3 ডাউনলোড।</p>
            <Wave className="h-10 mt-6" />
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {[
              { t: "হিস্ট্রি", d: "আগের জেনারেশনের হিসাব (কত ক্যারেক্টার, কোন ভয়েস, কোন মডেল)।" },
              { t: "ক্রেডিট হিসাব", d: "প্রতি জেনারেশনে কত ক্যারেক্টার খরচ হলো, তার স্বচ্ছ হিসাব। V1-এ ডেমো লেজার।" },
              { t: "নিরাপদ API ব্যবহার", d: "API key শুধু সার্ভারে থাকে — ব্রাউজারে কখনো পাঠানো হয় না, লগেও রাখা হয় না।" },
              { t: "MP3 ডাউনলোড", d: "তৈরি ভয়েস শুনে MP3 ডাউনলোড করে ভিডিওতে ব্যবহার করুন।" },
            ].map((f) => (
              <div key={f.t} className="rounded-3xl border border-white/10 bg-[#0f1626] p-5">
                <h3 className="font-extrabold text-white">{f.t}</h3>
                <p className="text-slate-400 text-[15px] mt-1">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="wrap pb-20 md:pb-32">
        <p className="text-cyan-300 text-sm font-extrabold">ব্যবহার</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">যেকোনো কাজের জন্য ভয়েস</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { t: "ভিডিও ভয়েসওভার", d: "ইউটিউব, ফেসবুক ভিডিওর ন্যারেশন — লিখুন, ভয়েস নিন, ভিডিওতে বসান।" },
            { t: "কোর্স ন্যারেশন", d: "লেসন, টিউটোরিয়াল, প্রেজেন্টেশনের পরিষ্কার ভয়েস।" },
            { t: "বিজ্ঞাপন ও গল্প", d: "অ্যাড, গল্প, অডিও কনটেন্টের জন্য স্বাভাবিক ভয়েস।" },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-white/10 bg-[#0f1626] p-6">
              <h3 className="font-extrabold text-white">{c.t}</h3>
              <p className="text-slate-400 mt-2">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="wrap pb-20 md:pb-32">
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <p className="text-cyan-300 text-sm font-extrabold">নিরাপত্তা</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              আপনার টেক্সট,
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">আপনার নিয়ন্ত্রণে</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                { t: "টেক্সট সংরক্ষণ হয় না", d: "সার্ভারে শুধু সংখ্যা ও হিসাব থাকে, টেক্সট নয়।" },
                { t: "সার্ভার-সাইড key", d: "key ব্রাউজারে আসে না, লগেও থাকে না।" },
                { t: "নকল অডিও নেই", d: "key ছাড়া স্টুডিও স্পষ্টভাবে জানিয়ে দেবে।" },
                { t: "ক্লোনিংয়ে অনুমতি", d: "শুধু যার ভয়েস তার লিখিত অনুমতি সাপেক্ষে।" },
              ].map((f) => (
                <div key={f.t} className="rounded-3xl border border-white/10 bg-[#0f1626] p-5">
                  <h3 className="font-extrabold text-white">{f.t}</h3>
                  <p className="text-slate-400 text-[15px] mt-1">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-b from-blue-900 to-[#0f172a] p-6">
            <h3 className="font-extrabold text-white text-xl">পেইড প্ল্যানে ক্লোনিং</h3>
            <p className="text-slate-300 mt-3">ভয়েস ক্লোনিং V1-এ নেই — আসছে শুধু পেইড প্ল্যানে, এবং শুধু যার ভয়েস তার লিখিত অনুমতি থাকলে।</p>
            <p className="mt-5"><span className="inline-block rounded-xl bg-white text-slate-900 px-4 py-2 font-extrabold">আসছে →</span></p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="wrap pb-20 md:pb-32">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-violet-700 p-6 md:p-8 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">ফ্রি ট্রায়াল শুরু করুন আজই</h2>
            <p className="text-white/85 mt-1">লিখুন, ভয়েস বাছুন, MP3 ডাউনলোড করুন — কোনো কার্ড লাগবে না।</p>
          </div>
          <Link href="/app" className="btn btn-white">স্টুডিও খুলুন →</Link>
        </div>
      </section>

      {/* Plans — beautiful section */}
      <section className="wrap pb-20 md:pb-32">
        <div className="text-center">
          <p className="text-cyan-300 text-sm font-extrabold">প্রাইসিং — DRAFT</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            যে প্ল্যান, <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-teal-300 bg-clip-text text-transparent">সেই ভয়েস।</span>
          </h2>
          <p className="text-slate-400 mt-2">দাম এখনো চূড়ান্ত নয় — বিক্রির আগে মালিকের অনুমোদন লাগবে।</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 items-stretch">
          {DRAFT_PLANS.map((p) => {
            const popular = !!p.highlight;
            return (
              <div
                key={p.id}
                className={`rounded-3xl p-6 flex flex-col relative ${
                  popular
                    ? "bg-gradient-to-b from-blue-900 to-indigo-900 border-2 border-sky-400 shadow-[0_20px_50px_rgba(59,130,246,.35)] lg:-translate-y-2"
                    : p.id === "trial"
                      ? "border border-emerald-400/40 bg-[#0f1626]"
                      : p.id === "pro"
                        ? "border border-amber-400/40 bg-[#0f1626]"
                        : "border border-white/10 bg-[#0f1626]"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white px-3 py-1 text-xs font-extrabold">
                    ★ সবচেয়ে জনপ্রিয়
                  </span>
                )}
                <h3 className="font-extrabold text-white text-lg mt-1">{p.name}</h3>
                <p className="text-3xl font-extrabold text-white mt-3">{p.priceBdt}</p>
                <p className="text-slate-400 text-sm">{p.priceUsd} · {p.minutes}</p>
                <div className="rounded-full bg-[#1e293b] h-2 mt-4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-teal-300"
                    style={{ width: VOLUME_WIDTH[p.id] ?? "35%" }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">{formatChars(p.chars)} ক্যারেক্টার / মাস</p>
                <ul className="mt-4 space-y-2 text-slate-300 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link href="/app" className={`btn w-full ${popular ? "btn-primary" : "btn-outline-white"}`}>
                    {p.id === "trial" ? "ফ্রি ট্রায়াল করুন →" : `${p.name} নিন →`}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-slate-400 mt-8">
          খরচের হিসাব দেখতে চান? <Link href="/pricing">পুরো প্রাইসিং ও খরচের হিসাব →</Link> · V1-এ কোনো চেকআউট/পেমেন্ট নেই, দাম DRAFT।
        </p>
      </section>

      {/* FAQ */}
      <section className="wrap pb-20 md:pb-32">
        <div className="rounded-3xl border border-white/10 bg-[#0f1626] p-6 md:p-8">
          <h2 className="text-3xl font-extrabold text-white">সাধারণ প্রশ্ন</h2>
          <div className="space-y-5 mt-6">
            <div><p className="font-extrabold text-white">ফ্রি ট্রায়াল দিয়ে কি ভিডিও বানিয়ে বিক্রি করা যাবে?</p><p className="text-slate-400 mt-1">না। ফ্রি ট্রায়াল শুধু অ-বাণিজ্যিক পরীক্ষার জন্য। বাণিজ্যিক ব্যবহারের জন্য পেইড প্ল্যান লাগবে।</p></div>
            <div><p className="font-extrabold text-white">আমার ভয়েস ক্লোন করতে পারবো?</p><p className="text-slate-400 mt-1">V1-এ নয়। ক্লোনিং পরের ধাপে, শুধু পেইড প্ল্যানে এবং আপনার লিখিত অনুমতি সাপেক্ষে আসবে।</p></div>
            <div><p className="font-extrabold text-white">আমার লেখা টেক্সট কি সংরক্ষণ করা হয়?</p><p className="text-slate-400 mt-1">না। সার্ভারে শুধু ক্যারেক্টার সংখ্যা, ভয়েস ও মডেলের হিসাব থাকে — টেক্সট সংরক্ষণ করা হয় না।</p></div>
            <div><p className="font-extrabold text-white">API key ছাড়া কি ডেমো শোনা যাবে?</p><p className="text-slate-400 mt-1">না। key ছাড়া স্টুডিও পরিষ্কারভাবে জানিয়ে দেবে যে key সেট করা হয়নি — কোনো নকল অডিও বাজানো হবে না।</p></div>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 mt-6 text-amber-100">
            <strong>সৎ সীমা — V1-এ যা নেই:</strong> ভয়েস ক্লোনিং এখনো নেই। ক্লোনিং
            শুধু পেইড প্ল্যানে আসবে, এবং শুধু যার ভয়েস তার লিখিত অনুমতি থাকলে।
            API key সেট না থাকলে কোনো অডিও তৈরি হয় না — নকল অডিও দেওয়া হয় না।
          </div>
          <div className="text-center mt-8">
            <Link href="/app" className="btn btn-primary">আজই ফ্রি ট্রায়াল শুরু করুন →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
