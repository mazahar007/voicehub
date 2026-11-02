"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Stats = {
  elevenlabs_configured: boolean;
  supabase: boolean;
  demo_credits: { total: number; used: number; remaining: number; demo: boolean };
  generations: Array<{
    id: string;
    createdAt: string;
    chars: number;
    voice_id: string;
    voice_name: string;
    model_id: string;
  }>;
};

export default function Admin() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let passcode = "";
    try {
      passcode = sessionStorage.getItem("voice-admin-passcode") ?? "";
    } catch {
      passcode = "";
    }
    if (!passcode) {
      setError("লগইন করা হয়নি — প্রথমে লগইন করুন।");
      return;
    }
    fetch("/api/stats", { headers: { "x-admin-passcode": passcode } })
      .then(async (r) => {
        if (!r.ok) throw new Error("পাসকোড ঠিক নয়।");
        setStats(await r.json());
      })
      .catch(() => setError("পাসকোড ঠিক নয় বা সার্ভারে সমস্যা — আবার লগইন করুন।"));
  }, []);

  return (
    <div className="wrap py-12">
      <h1 className="text-3xl font-extrabold">অ্যাডমিন — ডেমো ড্যাশবোর্ড</h1>
      <p className="text-slate-600 mt-2">
        এখানে শুধু ব্যবহারের হিসাব দেখা যায় — ইউজারের টেক্সট কখনো সংরক্ষণ
        করা হয় না, API key কখনো দেখানো হয় না।
      </p>
      {error && (
        <div className="error mt-6">
          {error} <Link href="/login">লগইন পেজে যান →</Link>
        </div>
      )}
      {stats && (
        <>
          <div className="grid3 mt-6">
            <div className="card p-6">
              <p className="text-slate-500 text-sm">ElevenLabs key</p>
              <p className="font-extrabold text-lg">
                {stats.elevenlabs_configured ? "✅ সেট করা আছে" : "❌ সেট করা হয়নি (ডেমো মোড)"}
              </p>
            </div>
            <div className="card p-6">
              <p className="text-slate-500 text-sm">Supabase</p>
              <p className="font-extrabold text-lg">{stats.supabase ? "✅ সংযুক্ত" : "❌ এখনো সংযুক্ত নয় (V2)"}</p>
            </div>
            <div className="card p-6">
              <p className="text-slate-500 text-sm">ডেমো ক্রেডিট বাকি</p>
              <p className="font-extrabold text-lg">
                {stats.demo_credits.remaining.toLocaleString("en-US")} /{" "}
                {stats.demo_credits.total.toLocaleString("en-US")} ক্যারেক্টার
              </p>
              <p className="text-sm text-slate-500">Redeploy-এ এই হিসাব রিসেট হয়।</p>
            </div>
          </div>
          <div className="card p-6 mt-6">
            <h2 className="font-extrabold">সাম্প্রতিক জেনারেশন (শুধু হিসাব)</h2>
            {stats.generations.length === 0 ? (
              <p className="text-slate-600 mt-2">এখনো কোনো সফল জেনারেশন হয়নি।</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {stats.generations.map((g) => (
                  <li key={g.id} className="text-sm border-b border-slate-100 pb-2">
                    {new Date(g.createdAt).toLocaleString("bn-BD")} · {g.voice_name} · {g.model_id} ·{" "}
                    {g.chars} ক্যারেক্টার
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
