import Link from "next/link";

// English landing — same V1 scope as the Bengali home page.
// The studio itself is Bengali-first; this page is the English entry point.
export default function EnglishHome() {
  return (
    <>
      <section className="hero-dark">
        <div className="wrap py-14">
          <span className="chip chip-free">Free trial included — V1</span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-4">
            Type it.
            <br />
            Hear it in a natural voice.
          </h1>
          <p className="text-slate-300 max-w-2xl mt-4">
            Turn Bengali and English text into natural-sounding AI voice.
            For video voiceovers, course narration, ads and stories — write,
            pick a voice, download the MP3.
          </p>
          <div className="flex gap-3 flex-wrap mt-6">
            <Link href="/app" className="btn btn-primary">Start free trial →</Link>
            <Link href="/pricing" className="btn btn-outline-white">See pricing</Link>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            About 1,000 characters ≈ 1 minute of voice. The free trial is for
            non-commercial testing only.
          </p>
        </div>
      </section>
      <section className="wrap py-12">
        <h2 className="text-2xl font-extrabold mb-6">How it works</h2>
        <div className="grid3">
          <div className="card p-6">
            <p className="text-3xl font-extrabold text-sky-600">1</p>
            <h3 className="font-extrabold mt-2">Write your text</h3>
            <p>Paste a Bengali or English script — up to 5,000 characters.</p>
          </div>
          <div className="card p-6">
            <p className="text-3xl font-extrabold text-sky-600">2</p>
            <h3 className="font-extrabold mt-2">Pick a voice and model</h3>
            <p>Choose from the voice library and adjust tone (stability / similarity).</p>
          </div>
          <div className="card p-6">
            <p className="text-3xl font-extrabold text-sky-600">3</p>
            <h3 className="font-extrabold mt-2">Listen and download</h3>
            <p>Generate, listen in the player, and download the MP3 for your video.</p>
          </div>
        </div>
        <div className="notice mt-6">
          <strong>Honest limits in V1:</strong> voice cloning is not available
          yet. It will arrive only on paid plans and only with the voice
          owner&apos;s written consent. Without an API key, no audio is
          generated — no fake audio is ever served.
        </div>
        <div className="mt-6">
          <Link href="/" className="btn btn-dark">বাংলা সংস্করণ দেখুন →</Link>
        </div>
      </section>
    </>
  );
}
