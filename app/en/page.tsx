import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Voice Studio — Bengali and English AI Voice",
  description:
    "Type text, hear it in a natural AI voice and download the MP3. Bengali and English text-to-speech, voice library and credit ledger.",
};

// English landing — same Zilaseba-style design as the Bengali home page,
// translated faithfully. Same prices, features, FAQ and honest limits;
// nothing new is invented. Language switch: the header shows the opposite
// language link (see components/Header.tsx), and this page also links back
// to the Bengali home below.

const WAVE_HEIGHTS = [18, 36, 24, 48, 30, 44, 22, 40];

const EN_PLANS = [
  {
    id: "trial",
    name: "Free Trial",
    price: "৳0",
    usd: "$0",
    minutes: "about 1 minute",
    chars: "1,000",
    width: "8%",
    features: ["One-time trial", "Bengali + English TTS", "MP3 download", "No voice cloning", "Non-commercial use only"],
  },
  {
    id: "starter",
    name: "Starter",
    price: "৳499",
    usd: "$5",
    minutes: "about 30 minutes",
    chars: "30,000",
    width: "35%",
    highlight: true,
    features: ["All trial features", "Commercial use", "History saved", "Priority voice"],
  },
  {
    id: "creator",
    name: "Creator",
    price: "৳1,499",
    usd: "$15",
    minutes: "about 120 minutes",
    chars: "120,000",
    width: "65%",
    features: ["All Starter features", "Long-form scripts", "Voice cloning (paid, with written consent)"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "৳4,999",
    usd: "$49",
    minutes: "about 500 minutes",
    chars: "500,000",
    width: "100%",
    features: ["All Creator features", "Team / high volume", "Priority support"],
  },
];

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

export default function EnglishHome() {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#0a0e1a] text-slate-700 dark:text-slate-200">
      <section className="wrap py-[50px]">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300">
              ● Free trial included — V1
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-5 text-slate-900 dark:text-white">
              Type it.
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-teal-300 bg-clip-text text-transparent">
                Hear it in a natural voice.
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mt-5">
              Turn Bengali and English text into natural-sounding AI voice.
              For video voiceovers, course narration, ads and stories — write,
              pick a voice, download the MP3.
            </p>
            <div className="flex gap-2 flex-wrap mt-5">
              {["Bengali", "English", "MP3 download", "5,000 characters"].map((p) => (
                <span key={p} className="rounded-full border border-slate-200 dark:border-white/10 px-3 py-1 text-sm text-slate-600 dark:text-slate-300">
                  {p}
                </span>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap mt-6">
              <Link href="/app" className="btn btn-primary">Start free trial →</Link>
              <Link href="/pricing" className="btn btn-outline-white">See pricing →</Link>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-4">
              About 1,000 characters ≈ 1 minute of voice. The free trial is for
              non-commercial testing only.
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-80"
              style={{ background: "radial-gradient(circle, #7c3aed 0%, #dc2626 55%, transparent 72%)" }}
            />
            <div className="relative rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1626] p-5">
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Studio — Text → Wave → MP3</p>
              <p className="rounded-xl bg-slate-100 dark:bg-[#1e293b] p-3 mt-3 text-[15px]">
                I am a content creator, and I need a voice for my video...
              </p>
              <Wave className="h-14 mt-4" />
              <div className="flex justify-between items-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                <span>◉ Play · 0:42</span>
                <span className="rounded-full bg-cyan-900 text-cyan-700 dark:text-cyan-200 px-3 py-1 font-bold">MP3 ↓</span>
              </div>
              <div className="flex gap-2 flex-wrap mt-4">
                <span className="rounded-full border border-violet-400/50 text-violet-700 dark:text-violet-200 px-3 py-1 text-sm">Rachel</span>
                <span className="rounded-full border border-cyan-400/50 text-cyan-700 dark:text-cyan-200 px-3 py-1 text-sm">George</span>
                <span className="rounded-full border border-amber-400/50 text-amber-700 dark:text-amber-200 px-3 py-1 text-sm">Flash v2.5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pb-[50px]">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1626] p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div><p className="text-2xl font-extrabold text-slate-900 dark:text-white">5,000</p><p className="text-slate-600 dark:text-slate-400 text-sm">characters at once</p></div>
          <div><p className="text-2xl font-extrabold text-slate-900 dark:text-white">3</p><p className="text-slate-600 dark:text-slate-400 text-sm">models: Flash, Multilingual, v3</p></div>
          <div><p className="text-2xl font-extrabold text-slate-900 dark:text-white">2+</p><p className="text-slate-600 dark:text-slate-400 text-sm">voices: Rachel, George + API library</p></div>
          <div><p className="text-2xl font-extrabold text-slate-900 dark:text-white">1,000 ≈ 1 min</p><p className="text-slate-600 dark:text-slate-400 text-sm">voice calculation</p></div>
        </div>
      </section>

      <section className="wrap pb-[50px]">
        <div className="text-center">
          <p className="text-sky-700 dark:text-cyan-300 text-sm font-extrabold">FEATURES</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Everything in one place</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Everything in V1, in one place.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-4 mt-8">
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#1e293b] dark:to-[#0f1626] p-6">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">Text-to-speech studio</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Bengali + English text, voice and model choice, character counter, MP3 download.</p>
            <Wave className="h-10 mt-6" />
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {[
              { t: "History", d: "Past generations, by characters, voice and model." },
              { t: "Credit ledger", d: "Transparent cost per generation. Demo ledger in V1." },
              { t: "Secure API use", d: "The API key stays on the server only — never in the browser, never logged." },
              { t: "MP3 download", d: "Listen, download the MP3, and use it in your video." },
            ].map((f) => (
              <div key={f.t} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1626] p-5">
                <h3 className="font-extrabold text-slate-900 dark:text-white">{f.t}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-[15px] mt-1">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pb-[50px]">
        <p className="text-sky-700 dark:text-cyan-300 text-sm font-extrabold">USE CASES</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">A voice for any job</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { t: "Video voiceovers", d: "YouTube and Facebook video narration — write, get the voice, drop it into your video." },
            { t: "Course narration", d: "Clear voice for lessons, tutorials and presentations." },
            { t: "Ads and stories", d: "Natural voice for ads, stories and audio content." },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1626] p-6">
              <h3 className="font-extrabold text-slate-900 dark:text-white">{c.t}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="wrap pb-[50px]">
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <p className="text-sky-700 dark:text-cyan-300 text-sm font-extrabold">SAFETY</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Your text,
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">under your control</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                { t: "Text is never stored", d: "Only numbers and counts are kept on the server, never the text." },
                { t: "Server-side key", d: "The key never reaches the browser and is never logged." },
                { t: "No fake audio", d: "Without a key, the studio says so clearly." },
                { t: "Cloning needs consent", d: "Only with the voice owner's written permission." },
              ].map((f) => (
                <div key={f.t} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1626] p-5">
                  <h3 className="font-extrabold text-slate-900 dark:text-white">{f.t}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-[15px] mt-1">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-blue-900 dark:to-[#0f172a] p-6">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">Voice cloning on paid plans</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-3">Voice cloning is not in V1 — coming only on paid plans, and only with the voice owner&apos;s written permission.</p>
            <p className="mt-5"><span className="inline-block rounded-xl bg-white text-slate-900 px-4 py-2 font-extrabold">Coming soon →</span></p>
          </div>
        </div>
      </section>

      <section className="wrap pb-[50px]">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-violet-700 p-6 md:p-8 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Start your free trial today</h2>
            <p className="text-white/85 mt-1">Write, pick a voice, download the MP3 — no card needed.</p>
          </div>
          <Link href="/app" className="btn btn-white">Open the studio →</Link>
        </div>
      </section>

      <section className="wrap pb-[50px]">
        <div className="text-center">
          <p className="text-sky-700 dark:text-cyan-300 text-sm font-extrabold">PRICING — DRAFT</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            The right plan, <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-teal-300 bg-clip-text text-transparent">the right voice.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Prices are not final yet — owner approval is needed before selling.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 items-stretch">
          {EN_PLANS.map((p) => {
            const popular = !!(p as { highlight?: boolean }).highlight;
            return (
              <div
                key={p.id}
                className={`rounded-3xl p-6 flex flex-col relative ${
                  popular
                    ? "bg-gradient-to-b from-blue-900 to-indigo-900 border-2 border-sky-400 shadow-[0_20px_50px_rgba(59,130,246,.35)] lg:-translate-y-2"
                    : p.id === "trial"
                      ? "border border-emerald-400/40 bg-white dark:bg-[#0f1626]"
                      : p.id === "pro"
                        ? "border border-amber-400/40 bg-white dark:bg-[#0f1626]"
                        : "border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1626]"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white px-3 py-1 text-xs font-extrabold">
                    ★ Most popular
                  </span>
                )}
                <h3 className={`font-extrabold text-lg mt-1 ${popular ? "text-white" : "text-slate-900 dark:text-white"}`}>{p.name}</h3>
                <p className={`text-3xl font-extrabold mt-3 ${popular ? "text-white" : "text-slate-900 dark:text-white"}`}>{p.price}</p>
                <p className={`text-sm ${popular ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>{p.usd} · {p.minutes}</p>
                <div className="rounded-full bg-slate-100 dark:bg-[#1e293b] h-2 mt-4 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-teal-300" style={{ width: p.width }} />
                </div>
                <p className={`text-sm mt-2 ${popular ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>{p.chars} characters / month</p>
                <ul className={`mt-4 space-y-2 text-[15px] ${popular ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}`}>
                  {p.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link href="/app" className={`btn w-full ${popular ? "btn-primary" : "btn-outline-white"}`}>
                    {p.id === "trial" ? "Try free →" : `Get ${p.name} →`}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-slate-600 dark:text-slate-400 mt-8">
          Want the cost breakdown? <Link href="/pricing">Full pricing and cost calculation →</Link> · No checkout in V1, prices are DRAFT.
        </p>
      </section>

      <section className="wrap pb-[50px]">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1626] p-6 md:p-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">FAQ</h2>
          <div className="space-y-5 mt-6">
            <div><p className="font-extrabold text-slate-900 dark:text-white">Can I sell videos made with the free trial?</p><p className="text-slate-600 dark:text-slate-400 mt-1">No. The free trial is for non-commercial testing only. Commercial use needs a paid plan.</p></div>
            <div><p className="font-extrabold text-slate-900 dark:text-white">Can I clone my voice?</p><p className="text-slate-600 dark:text-slate-400 mt-1">Not in V1. Cloning comes later, only on paid plans and only with your written consent.</p></div>
            <div><p className="font-extrabold text-slate-900 dark:text-white">Is my text saved?</p><p className="text-slate-600 dark:text-slate-400 mt-1">No. Only character counts, voice and model are logged — never the text itself.</p></div>
            <div><p className="font-extrabold text-slate-900 dark:text-white">Can I hear a demo without an API key?</p><p className="text-slate-600 dark:text-slate-400 mt-1">No. Without a key, the studio clearly says the key is not set — no fake audio is ever played.</p></div>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 mt-6 text-amber-900 dark:text-amber-100">
            <strong>Honest limits in V1:</strong> voice cloning is not available
            yet. It will arrive only on paid plans and only with the voice
            owner&apos;s written consent. Without an API key, no audio is
            generated — no fake audio is ever served.
          </div>
          <div className="text-center mt-8">
            <Link href="/" className="btn btn-primary">See the Bengali version →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
