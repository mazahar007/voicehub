import { NextResponse } from "next/server";
import {
  elevenLabsApiKey,
  isElevenLabsConfigured,
  validateTtsInput,
  FALLBACK_VOICES,
} from "@/lib/elevenlabs";
import { canSpend, recordGeneration } from "@/lib/credits";

// POST /api/tts — server-side proxy ONLY.
// The ElevenLabs key lives in process.env, is sent only to
// api.elevenlabs.io, and is never returned to the client or logged.
// Without a key: 503 with a clear Bengali message and NO fake audio.
// Demo wallet: 402 when the V1 demo credit runs out.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON বডি ঠিক নয়।" }, { status: 400 });
  }
  const parsed = validateTtsInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  if (!isElevenLabsConfigured()) {
    return NextResponse.json(
      {
        error:
          "ElevenLabs API key এখনো সেট করা হয়নি — API key set koren, তারপর আবার চেষ্টা করুন। এই অবস্থায় কোনো অডিও তৈরি হয় না, নকল অডিও দেওয়া হয় না।",
        demo_mode: true,
      },
      { status: 503 },
    );
  }
  if (!canSpend(parsed.text.length)) {
    return NextResponse.json(
      {
        error:
          "ডেমো ক্রেডিট শেষ হয়ে গেছে। Supabase + পেইড প্ল্যান চালু হলে আবার ব্যবহার করা যাবে।",
        demo_mode: true,
      },
      { status: 402 },
    );
  }
  const url =
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(parsed.voice_id)}` +
    `?output_format=mp3_44100_128`;
  let elRes: Response;
  try {
    elRes = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": elevenLabsApiKey(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: parsed.text,
        model_id: parsed.model_id,
        voice_settings: {
          stability: parsed.stability,
          similarity_boost: parsed.similarity_boost,
        },
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "ElevenLabs-এর সাথে যোগাযোগ করা যায়নি — একটু পরে আবার চেষ্টা করুন।" },
      { status: 502 },
    );
  }
  if (!elRes.ok || !elRes.body) {
    // Forward only a safe, generic message — never the raw upstream
    // body (it must never be able to leak credentials or internals).
    const status = elRes.status === 401 || elRes.status === 403 ? 502 : elRes.status;
    return NextResponse.json(
      {
        error:
          status === 429
            ? "ElevenLabs-এর লিমিট শেষ — একটু পরে আবার চেষ্টা করুন।"
            : "ভয়েস তৈরি করা যায়নি — API key / ক্রেডিট যাচাই করে আবার চেষ্টা করুন।",
      },
      { status },
    );
  }
  // Success only: spend demo credit and record length (never the text).
  const voiceName =
    FALLBACK_VOICES.find((v) => v.voice_id === parsed.voice_id)?.name ?? "Live voice";
  recordGeneration({
    chars: parsed.text.length,
    voice_id: parsed.voice_id,
    voice_name: voiceName,
    model_id: parsed.model_id,
  });
  return new Response(elRes.body, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": 'attachment; filename="voice-studio.mp3"',
      "Cache-Control": "no-store",
    },
  });
}
