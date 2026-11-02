import Link from "next/link";
import { DRAFT_PLANS, formatChars } from "@/lib/pricing";

export default function Home() {
  return (
    <>
      <section className="hero-dark">
        <div className="wrap py-14">
          <span className="chip chip-free">ফ্রি ট্রায়াল সহ — V1</span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-4">
            লেখা দিন,
            <br />
            স্বাভাবিক ভয়েস নিন।
          </h1>
          <p className="text-slate-300 max-w-2xl mt-4">
            বাংলা ও ইংরেজি টেক্সট থেকে মানুষের মতো শোনায় এমন ভয়েস তৈরি করুন।
            ভিডিওর ভয়েসওভার, কোর্সের ন্যারেশন, বিজ্ঞাপন বা গল্প — লিখুন, ভয়েস
            বাছুন, MP3 ডাউনলোড করুন।
          </p>
          <div className="flex gap-3 flex-wrap mt-6">
            <Link href="/app" className="btn btn-primary">ফ্রি ট্রায়াল শুরু করুন →</Link>
            <Link href="/pricing" className="btn btn-outline-white">প্রাইসিং দেখুন</Link>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            প্রায় ১,০০০ ক্যারেক্টার = প্রায় ১ মিনিট ভয়েস। ফ্রি ট্রায়াল শুধু
            অ-বাণিজ্যিক ব্যবহারের জন্য।
          </p>
        </div>
      </section>

      <section className="wrap py-12">
        <h2 className="text-2xl font-extrabold mb-6">কীভাবে কাজ করে</h2>
        <div className="grid3">
          <div className="card card-hover p-6">
            <p className="text-3xl font-extrabold text-sky-600">১</p>
            <h3 className="font-extrabold mt-2">টেক্সট লিখুন</h3>
            <p>বাংলা বা ইংরেজি স্ক্রিপ্ট পেস্ট করুন — সর্বোচ্চ ৫,০০০ ক্যারেক্টার।</p>
          </div>
          <div className="card card-hover p-6">
            <p className="text-3xl font-extrabold text-sky-600">২</p>
            <h3 className="font-extrabold mt-2">ভয়েস ও মডেল বাছুন</h3>
            <p>ভয়েস লাইব্রেরি থেকে ভয়েস নিন, মডেল ও টোন (stability / similarity) ঠিক করুন।</p>
          </div>
          <div className="card card-hover p-6">
            <p className="text-3xl font-extrabold text-sky-600">৩</p>
            <h3 className="font-extrabold mt-2">শুনুন ও ডাউনলোড করুন</h3>
            <p>Generate চাপুন, অডিও প্লেয়ারে শুনুন, MP3 ডাউনলোড করে ভিডিওতে ব্যবহার করুন।</p>
          </div>
        </div>
      </section>

      <section className="wrap pb-12">
        <h2 className="text-2xl font-extrabold mb-6">V1-এ যা আছে</h2>
        <div className="grid2">
          <div className="card p-6">
            <h3 className="font-extrabold">🎙️ টেক্সট-টু-স্পিচ স্টুডিও</h3>
            <p>বাংলা + ইংরেজি টেক্সট, ভয়েস বাছাই, মডেল বাছাই, ক্যারেক্টার কাউন্টার, MP3 ডাউনলোড।</p>
          </div>
          <div className="card p-6">
            <h3 className="font-extrabold">🕘 হিস্ট্রি</h3>
            <p>আগের জেনারেশনের হিসাব (কত ক্যারেক্টার, কোন ভয়েস, কোন মডেল) — আবার তৈরি করা যায়।</p>
          </div>
          <div className="card p-6">
            <h3 className="font-extrabold">🪙 ক্রেডিট হিসাব</h3>
            <p>প্রতি জেনারেশনে কত ক্যারেক্টার খরচ হলো, তার স্বচ্ছ হিসাব। V1-এ ডেমো লেজার; Supabase সংযোগ V2-তে।</p>
          </div>
          <div className="card p-6">
            <h3 className="font-extrabold">🔒 নিরাপদ API ব্যবহার</h3>
            <p>API key শুধু সার্ভারে থাকে — ব্রাউজারে কখনো পাঠানো হয় না, লগেও রাখা হয় না।</p>
          </div>
        </div>
        <div className="notice mt-6">
          <strong>সৎ সীমা — V1-এ যা নেই:</strong> ভয়েস ক্লোনিং এখনো নেই। ক্লোনিং
          শুধু পেইড প্ল্যানে আসবে, এবং শুধু যার ভয়েস তার লিখিত অনুমতি থাকলে।
          API key সেট না থাকলে কোনো অডিও তৈরি হয় না — নকল অডিও দেওয়া হয় না।
        </div>
      </section>

      <section className="wrap pb-12">
        <h2 className="text-2xl font-extrabold mb-2">প্রাইসিং — DRAFT</h2>
        <p className="text-slate-600 mb-6">
          নিচের দাম এখনো চূড়ান্ত নয় — বিক্রির আগে মালিকের অনুমোদন লাগবে।
        </p>
        <div className="grid2">
          {DRAFT_PLANS.map((p) => (
            <div key={p.id} className="card p-6">
              <div className="flex justify-between items-start gap-3">
                <h3 className="font-extrabold text-lg">{p.name}</h3>
                {p.highlight && <span className="chip chip-free">জনপ্রিয়</span>}
              </div>
              <p className="text-2xl font-extrabold mt-2">{p.priceBdt}</p>
              <p className="text-slate-500">{p.priceUsd}</p>
              <p className="mt-2">
                {formatChars(p.chars)} ক্যারেক্টার / মাস · {p.minutes}
              </p>
              <ul className="mt-3 list-disc pl-5">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/pricing" className="btn btn-dark">পুরো প্রাইসিং ও খরচের হিসাব →</Link>
        </div>
      </section>

      <section className="wrap pb-12">
        <h2 className="text-2xl font-extrabold mb-6">সাধারণ প্রশ্ন</h2>
        <div className="card p-6 space-y-4">
          <div>
            <p className="font-extrabold">ফ্রি ট্রায়াল দিয়ে কি ভিডিও বানিয়ে বিক্রি করা যাবে?</p>
            <p>না। ফ্রি ট্রায়াল শুধু অ-বাণিজ্যিক পরীক্ষার জন্য। বাণিজ্যিক ব্যবহারের জন্য পেইড প্ল্যান লাগবে।</p>
          </div>
          <div>
            <p className="font-extrabold">আমার ভয়েস ক্লোন করতে পারবো?</p>
            <p>V1-এ নয়। ক্লোনিং পরের ধাপে, শুধু পেইড প্ল্যানে এবং আপনার লিখিত অনুমতি সাপেক্ষে আসবে।</p>
          </div>
          <div>
            <p className="font-extrabold">আমার লেখা টেক্সট কি সংরক্ষণ করা হয়?</p>
            <p>না। সার্ভারে শুধু ক্যারেক্টার সংখ্যা, ভয়েস ও মডেলের হিসাব থাকে — টেক্সট সংরক্ষণ করা হয় না।</p>
          </div>
          <div>
            <p className="font-extrabold">API key ছাড়া কি ডেমো শোনা যাবে?</p>
            <p>না। key ছাড়া স্টুডিও পরিষ্কারভাবে জানিয়ে দেবে যে key সেট করা হয়নি — কোনো নকল অডিও বাজানো হবে না।</p>
          </div>
        </div>
      </section>
    </>
  );
}
