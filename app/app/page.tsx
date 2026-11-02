"use client";

import { useEffect, useRef, useState } from "react";
import { MODELS, MAX_CHARS, FALLBACK_VOICES } from "@/lib/elevenlabs";
import type { VoiceOption } from "@/lib/elevenlabs";

const BN_SAMPLE =
  "আজকের গল্পটা ছোট, কিন্তু শিক্ষাটা বড়। যে প্রতিদিন একটু একটু করে শেখে, সে একদিন অনেক দূর এগিয়ে যায়।";
const EN_SAMPLE =
  "Every great video starts with a clear voice. Write your script, pick a voice, and let your story be heard.";

type HistoryEntry = {
  text: string;
  voice_id: string;
  voice_name: string;
  model_id: string;
  chars: number;
  createdAt: string;
};

export default function Studio() {
  const [text, setText] = useState(BN_SAMPLE);
  const [voices, setVoices] = useState<VoiceOption[]>([...FALLBACK_VOICES]);
  const [voiceSource, setVoiceSource] = useState<"fallback" | "live">("fallback");
  const [voiceId, setVoiceId] = useState<string>(FALLBACK_VOICES[0].voice_id);
  const [modelId, setModelId] = useState<string>(MODELS[0].id);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [health, setHealth] = useState<{
    elevenlabs_configured: boolean;
    demo_mode: boolean;
    demo_credits?: { remaining: number; used: number; total: number };
  } | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setHealth(d))
      .catch(() => setHealth(null));
    fetch("/api/voices")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.voices) && d.voices.length > 0) {
          setVoices(d.voices);
          setVoiceSource(d.source === "live" ? "live" : "fallback");
          const first = d.voices[0] as VoiceOption;
          if (first?.voice_id) setVoiceId(first.voice_id);
        }
      })
      .catch(() => undefined);
    try {
      const raw = localStorage.getItem("voice-studio-history");
      if (raw) setHistory(JSON.parse(raw) as HistoryEntry[]);
    } catch {
      // History is a convenience only; ignore corrupt storage.
    }
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveHistory(entry: HistoryEntry) {
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 20);
      try {
        localStorage.setItem("voice-studio-history", JSON.stringify(next));
      } catch {
        // Ignore storage failures.
      }
      return next;
    });
  }

  async function generate() {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice_id: voiceId,
          model_id: modelId,
          stability,
          similarity_boost: similarity,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "ভয়েস তৈরি করা যায়নি।");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      const voiceName = voices.find((v) => v.voice_id === voiceId)?.name ?? "Voice";
      saveHistory({
        text,
        voice_id: voiceId,
        voice_name: voiceName,
        model_id: modelId,
        chars: text.trim().length,
        createdAt: new Date().toISOString(),
      });
      const h = await fetch("/api/health").then((r) => r.json()).catch(() => null);
      if (h) setHealth(h);
    } catch {
      setError("সার্ভারের সাথে যোগাযোগ করা যায়নি — একটু পরে আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }

  const chars = text.trim().length;
  const overLimit = chars > MAX_CHARS;

  return (
    <div className="wrap py-12">
      <h1 className="text-3xl font-extrabold">ভয়েস স্টুডিও</h1>
      <p className="text-slate-600 mt-2">
        টেক্সট লিখুন, ভয়েস বাছুন, Generate চাপুন। অডিও তৈরি হলে শুনুন ও MP3
        ডাউনলোড করুন।
      </p>

      {health && !health.elevenlabs_configured && (
        <div className="notice mt-6">
          <strong>ডেমো মোড:</strong> ElevenLabs API key এখনো সেট করা হয়নি।
          Generate চাপলে পরিষ্কার বার্তা দেখাবে — কোনো নকল অডিও তৈরি হবে না।
          key সেট করতে README-SETUP-BN.md দেখুন।
        </div>
      )}
      {health?.demo_credits && (
        <p className="mt-4 text-sm text-slate-600">
          ডেমো ক্রেডিট (DEMO লেজার, redeploy-এ রিসেট হয়):{" "}
          <strong>{health.demo_credits.remaining.toLocaleString("en-US")}</strong> /{" "}
          {health.demo_credits.total.toLocaleString("en-US")} ক্যারেক্টার বাকি
        </p>
      )}

      <div className="card p-6 mt-6 space-y-5">
        <div>
          <label className="label" htmlFor="studio-text">টেক্সট</label>
          <textarea
            id="studio-text"
            className="input"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="বাংলা বা ইংরেজি টেক্সট লিখুন…"
          />
          <div className="flex justify-between flex-wrap gap-2 mt-2 text-sm">
            <span className={overLimit ? "text-red-600 font-bold" : "text-slate-600"}>
              {chars.toLocaleString("en-US")} / {MAX_CHARS.toLocaleString("en-US")} ক্যারেক্টার
              {chars > 0 && ` · প্রায় ${Math.max(1, Math.round(chars / 1000))} মিনিট`}
            </span>
            <span className="flex gap-2">
              <button type="button" className="btn" style={{ minHeight: 36, padding: "6px 12px" }} onClick={() => setText(BN_SAMPLE)}>
                বাংলা নমুনা
              </button>
              <button type="button" className="btn" style={{ minHeight: 36, padding: "6px 12px" }} onClick={() => setText(EN_SAMPLE)}>
                English sample
              </button>
            </span>
          </div>
        </div>

        <div className="grid2">
          <div>
            <label className="label" htmlFor="studio-voice">
              ভয়েস {voiceSource === "live" ? "(লাইভ তালিকা)" : "(যাচাইকৃত ডিফল্ট)"}
            </label>
            <select id="studio-voice" className="input" value={voiceId} onChange={(e) => setVoiceId(e.target.value)}>
              {voices.map((v) => (
                <option key={v.voice_id} value={v.voice_id}>{v.name}</option>
              ))}
            </select>
            <p className="text-sm text-slate-500 mt-1">
              API key থাকলে লাইভ ভয়েস তালিকা আসবে; না থাকলে শুধু যাচাইকৃত ২টি ভয়েস দেখায়।
            </p>
          </div>
          <div>
            <label className="label" htmlFor="studio-model">মডেল</label>
            <select id="studio-model" className="input" value={modelId} onChange={(e) => setModelId(e.target.value)}>
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <p className="text-sm text-slate-500 mt-1">
              বাংলা টেক্সট দিয়ে টেস্ট করে দেখুন — মডেলভেদে উচ্চারণ আলাদা হতে পারে।
            </p>
          </div>
        </div>

        <div className="grid2">
          <div>
            <label className="label" htmlFor="studio-stability">Stability: {stability.toFixed(2)}</label>
            <input
              id="studio-stability"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={stability}
              onChange={(e) => setStability(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-slate-500">বেশি হলে ভয়েস স্থির, কম হলে বেশি আবেগপ্রবণ।</p>
          </div>
          <div>
            <label className="label" htmlFor="studio-similarity">Similarity: {similarity.toFixed(2)}</label>
            <input
              id="studio-similarity"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={similarity}
              onChange={(e) => setSimilarity(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-slate-500">মূল ভয়েসের সাথে কতটা মিল থাকবে।</p>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <button
          type="button"
          className="btn btn-primary"
          disabled={busy || chars === 0 || overLimit}
          onClick={generate}
        >
          {busy ? "ভয়েস তৈরি হচ্ছে…" : "🎙️ Generate ভয়েস"}
        </button>

        {audioUrl && (
          <div className="success">
            <p className="font-extrabold">ভয়েস তৈরি হয়েছে — শুনুন ও ডাউনলোড করুন</p>
            <audio ref={audioRef} controls src={audioUrl} className="w-full mt-2" />
            <a href={audioUrl} download="voice-studio.mp3" className="btn btn-dark mt-3">
              ⬇️ MP3 ডাউনলোড
            </a>
          </div>
        )}
      </div>

      <div className="card p-6 mt-6">
        <h2 className="font-extrabold">🎭 ভয়েস ক্লোনিং — শীঘ্রই আসছে</h2>
        <p className="text-slate-600 mt-1">
          V1-এ ক্লোনিং নেই। এটি শুধু পেইড প্ল্যানে আসবে, এবং শুধু যার ভয়েস তার
          লিখিত অনুমতি থাকলে। ফ্রি টিয়ারে ক্লোনিং দেওয়া হয় না — অনুমতি ছাড়া
          কারো ভয়েস ক্লোন করা হবে না।
        </p>
      </div>

      <div className="card p-6 mt-6">
        <h2 className="font-extrabold">🕘 হিস্ট্রি (এই ব্রাউজারে)</h2>
        {history.length === 0 ? (
          <p className="text-slate-600 mt-1">এখনো কোনো ভয়েস তৈরি হয়নি। অডিও ফাইল নিজে ডাউনলোড করে রাখুন — হিস্ট্রিতে শুধু হিসাব থাকে, অডিও থাকে না।</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {history.map((h, i) => (
              <li key={`${h.createdAt}-${i}`} className="border border-slate-200 rounded-xl p-3">
                <p className="font-bold text-sm">
                  {h.voice_name} · {h.model_id} · {h.chars} ক্যারেক্টার
                </p>
                <p className="text-sm text-slate-600 truncate">{h.text}</p>
                <button
                  type="button"
                  className="btn mt-2"
                  style={{ minHeight: 36, padding: "6px 12px" }}
                  onClick={() => {
                    setText(h.text);
                    setVoiceId(h.voice_id);
                    setModelId(h.model_id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  আবার এই টেক্সট দিয়ে তৈরি করুন
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
