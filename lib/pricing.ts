// Pricing V1 — DRAFT ONLY, owner approval required before selling.
// Cost basis (ElevenLabs API, verified 2026-11-02):
//   ~1,000 characters = ~1 minute of speech
//   Turbo / Flash-class: $0.04 per 1,000 characters
//   v4-class:             $0.08 per 1,000 characters
// So 30,000 chars cost the owner roughly $1.20 (Turbo) – $2.40 (v4),
// 120,000 chars roughly $4.80 – $9.60, 500,000 chars roughly $20 – $40.
// Every draft price below covers that cost plus margin. Nothing here
// is a live price and there is no checkout in V1.

export type DraftPlan = {
  id: string;
  name: string;
  priceBdt: string;
  priceUsd: string;
  chars: number;
  minutes: string;
  features: string[];
  highlight?: boolean;
};

export const DRAFT_PLANS: DraftPlan[] = [
  {
    id: "trial",
    name: "ফ্রি ট্রায়াল",
    priceBdt: "৳০",
    priceUsd: "$0",
    chars: 1000,
    minutes: "প্রায় ১ মিনিট",
    features: ["এককালীন ট্রায়াল", "বাংলা + ইংরেজি TTS", "MP3 ডাউনলোড", "ভয়েস ক্লোনিং নেই", "শুধু অ-বাণিজ্যিক ব্যবহার"],
  },
  {
    id: "starter",
    name: "স্টার্টার",
    priceBdt: "৳৪৯৯ / মাস",
    priceUsd: "$5 / মাস",
    chars: 30000,
    minutes: "প্রায় ৩০ মিনিট",
    features: ["সব ট্রায়াল সুবিধা", "বাণিজ্যিক ব্যবহার", "হিস্ট্রি সংরক্ষণ", "অগ্রাধিকার ভয়েস"],
    highlight: true,
  },
  {
    id: "creator",
    name: "ক্রিয়েটর",
    priceBdt: "৳১,৪৯৯ / মাস",
    priceUsd: "$15 / মাস",
    chars: 120000,
    minutes: "প্রায় ১২০ মিনিট",
    features: ["সব স্টার্টার সুবিধা", "লং-ফর্ম স্ক্রিপ্ট", "ভয়েস ক্লোনিং (পেইড প্ল্যানে, লিখিত অনুমতি সাপেক্ষে)"],
  },
  {
    id: "pro",
    name: "প্রো",
    priceBdt: "৳৪,৯৯৯ / মাস",
    priceUsd: "$49 / মাস",
    chars: 500000,
    minutes: "প্রায় ৫০০ মিনিট",
    features: ["সব ক্রিয়েটর সুবিধা", "টিম / বেশি ভলিউম", "অগ্রাধিকার সাপোর্ট"],
  },
];

export function formatChars(n: number): string {
  return n.toLocaleString("en-US");
}
