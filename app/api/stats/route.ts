import { NextResponse } from "next/server";
import { demoCredits, demoGenerations } from "@/lib/credits";
import { isElevenLabsConfigured } from "@/lib/elevenlabs";

// GET /api/stats — admin demo stats. Demo-grade protection only:
// header x-admin-passcode must match ADMIN_PASSCODE (or 1234 when
// unset, exactly as the admin pages state). Change it before selling.
// Returns lengths and models only — never user text, never any key.
export async function GET(req: Request) {
  const expected = process.env.ADMIN_PASSCODE || "1234";
  const given = req.headers.get("x-admin-passcode") ?? "";
  if (given !== expected) {
    return NextResponse.json({ error: "পাসকোড ঠিক নয়।" }, { status: 401 });
  }
  return NextResponse.json({
    elevenlabs_configured: isElevenLabsConfigured(),
    supabase: false,
    demo_credits: demoCredits(),
    generations: demoGenerations(),
  });
}
