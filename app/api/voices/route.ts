import { NextResponse } from "next/server";
import { FALLBACK_VOICES, elevenLabsApiKey, isElevenLabsConfigured } from "@/lib/elevenlabs";
import type { VoiceOption } from "@/lib/elevenlabs";

// GET /api/voices — live list when a key is configured, otherwise the
// two verified fallback voices only. Never invents voice IDs.
export async function GET() {
  if (!isElevenLabsConfigured()) {
    return NextResponse.json({
      source: "fallback",
      note: "API key সেট করা হয়নি — যাচাইকৃত ২টি ডিফল্ট ভয়েস দেখানো হচ্ছে।",
      voices: FALLBACK_VOICES,
    });
  }
  try {
    const res = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": elevenLabsApiKey() },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({
        source: "fallback",
        note: "লাইভ ভয়েস তালিকা আনা যায়নি — যাচাইকৃত ২টি ডিফল্ট ভয়েস দেখানো হচ্ছে।",
        voices: FALLBACK_VOICES,
      });
    }
    const data = (await res.json()) as { voices?: Array<{ voice_id?: string; name?: string }> };
    const voices: VoiceOption[] = (data.voices ?? [])
      .filter((v) => typeof v.voice_id === "string" && typeof v.name === "string")
      .map((v) => ({ voice_id: v.voice_id as string, name: v.name as string }));
    if (voices.length === 0) {
      return NextResponse.json({ source: "fallback", voices: FALLBACK_VOICES });
    }
    return NextResponse.json({ source: "live", voices });
  } catch {
    return NextResponse.json({
      source: "fallback",
      note: "লাইভ ভয়েস তালিকা আনা যায়নি — যাচাইকৃত ২টি ডিফল্ট ভয়েস দেখানো হচ্ছে।",
      voices: FALLBACK_VOICES,
    });
  }
}
