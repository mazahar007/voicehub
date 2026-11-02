import Link from "next/link";
import { DRAFT_PLANS, formatChars } from "@/lib/pricing";

export default function Pricing() {
  return (
    <div className="wrap py-12">
      <span className="chip chip-free">DRAFT — এখনো চূড়ান্ত নয়</span>
      <h1 className="text-3xl font-extrabold mt-4">প্রাইসিং</h1>
      <p className="text-slate-600 max-w-2xl mt-2">
        নিচের সব দাম DRAFT — বিক্রি শুরু করার আগে মালিকের অনুমোদন লাগবে।
        V1-এ কোনো চেকআউট / পেমেন্ট নেই; পেমেন্ট (bKash / Stripe) পরের ধাপে
        যোগ হবে। আপাতত ফ্রি ট্রায়াল দিয়ে স্টুডিও পরীক্ষা করুন।
      </p>

      <h2 className="text-xl font-extrabold mt-10 mb-4">খরচের হিসাব (কেন এই দাম)</h2>
      <div className="card p-6">
        <ul className="list-disc pl-5 space-y-1">
          <li>প্রায় ১,০০০ ক্যারেক্টার = প্রায় ১ মিনিট ভয়েস।</li>
          <li>ElevenLabs API খরচ: Turbo/Flash-শ্রেণি $০.০৪ প্রতি ১,০০০ ক্যারেক্টার; v4-শ্রেণি $০.০৮ প্রতি ১,০০০ ক্যারেক্টার।</li>
          <li>৩০,০০০ ক্যারেক্টারে মালিকের খরচ প্রায় $১.২০ – $২.৪০; ১,২০,০০০-এ প্রায় $৪.৮০ – $৯.৬০; ৫,০০,০০০-এ প্রায় $২০ – $৪০।</li>
          <li>তাই প্রতিটি প্ল্যানের দাম খরচের ওপরে মার্জিন রেখে ধরা হয়েছে — খরচের চেয়ে কম দামে বিক্রি করলে ব্যবহার বাড়লেই লস হবে।</li>
        </ul>
      </div>

      <div className="grid2 mt-8">
        {DRAFT_PLANS.map((p) => (
          <div key={p.id} className="card p-6">
            <div className="flex justify-between items-start gap-3">
              <h3 className="font-extrabold text-lg">{p.name}</h3>
              {p.highlight && <span className="chip chip-free">জনপ্রিয়</span>}
            </div>
            <p className="text-2xl font-extrabold mt-2">{p.priceBdt}</p>
            <p className="text-slate-500">{p.priceUsd}</p>
            <p className="mt-2">{formatChars(p.chars)} ক্যারেক্টার / মাস · {p.minutes}</p>
            <ul className="mt-3 list-disc pl-5">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="notice mt-8">
        <strong>ফ্রি ট্রায়াল সম্পর্কে সতর্কতা:</strong> ElevenLabs-এর ফ্রি
        টিয়ার মাসে মাত্র ১০,০০০ ক্রেডিট দেয় এবং তা বাণিজ্যিক নয়। তাই সবার
        জন্য সীমাহীন ফ্রি দেওয়া যাবে না — V1-এ ট্রায়াল ১,০০০ ক্যারেক্টারে
        সীমাবদ্ধ রাখা হয়েছে। পেইড প্ল্যান ছাড়া বেশি ফ্রি দিলে মালিকের
        ক্রেডিট দ্রুত শেষ হয়ে যাবে।
      </div>
      <div className="mt-6">
        <Link href="/app" className="btn btn-primary">স্টুডিওতে ফ্রি ট্রায়াল করুন →</Link>
      </div>
    </div>
  );
}
