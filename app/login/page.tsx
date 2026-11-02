"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/stats", { headers: { "x-admin-passcode": passcode } });
    if (!res.ok) {
      setError("পাসকোড ঠিক নয়।");
      return;
    }
    try {
      sessionStorage.setItem("voice-admin-passcode", passcode);
    } catch {
      // Session storage unavailable — admin page will ask again.
    }
    router.push("/admin");
  }

  return (
    <div className="wrap py-12" style={{ maxWidth: 560 }}>
      <h1 className="text-3xl font-extrabold">অ্যাডমিন লগইন</h1>
      <p className="text-slate-600 mt-2">
        শুধু সাইটের মালিকের জন্য। এটি V1 ডেমো লগইন — আসল ইউজার অ্যাকাউন্ট
        সিস্টেম Supabase সংযোগের (V2) সাথে আসবে।
      </p>
      <form onSubmit={submit} className="card p-6 mt-6 space-y-4">
        <div>
          <label className="label" htmlFor="login-passcode">পাসকোড</label>
          <input
            id="login-passcode"
            type="password"
            className="input"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="ডেমো পাসকোড"
            autoComplete="off"
          />
          <p className="text-sm text-slate-500 mt-1">
            ডেমো পাসকোড 1234 (যদি ADMIN_PASSCODE env var সেট না থাকে)। বিক্রির
            আগে অবশ্যই বদলাতে হবে।
          </p>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="btn btn-primary">লগইন →</button>
      </form>
    </div>
  );
}
