/**
 * Image generator v4 — What is GPA? Hero only, 2 versions
 * Attractive woman, worried, Pixar-ish 10-20%, bot stuck in CoE pipeline tool
 */

const fs   = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const [k, ...v] = line.replace(/"/g, '').split('=');
  if (k && v.length) process.env[k.trim()] = v.join('=').trim();
});

const GEMINI_KEY = process.env.GEMINI_KEY;
if (!GEMINI_KEY) { console.error('GEMINI_KEY missing'); process.exit(1); }

const MODEL   = 'gemini-3.1-flash-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'posts', 'what-is-gpa');
fs.mkdirSync(OUT_DIR, { recursive: true });

const STYLE = `
MANDATORY STYLE:
• 16:9 landscape, 1200×630px
• Art direction: 80% cinematic photorealism + 20% Pixar-inspired stylization
  - Pixar qualities: slightly larger expressive eyes, smooth idealized skin, warm appealing character design, emotionally readable face — like a Pixar human character (think The Incredibles, Up, Soul) but grounded in a real office environment
  - NOT full cartoon. NOT anime. The environment and props stay photorealistic. Only the character has the slight Pixar warmth and expressiveness.
• Attractive South Asian or mixed appearance woman, mid-20s to early 30s, professional
• Film grain texture on the background environment
• Subtle olive-green vignette at frame edges
• Thin straight-cornered olive-yellow border (#8A9A2E), inset 10px
• "Guerrilla Bots" small dim label bottom-right
`;

const SCREEN_DETAILS = `
SCREEN CONTENT — make these clearly readable:
The laptop or monitor shows a CoE demand pipeline tool — Smartsheet or a similar enterprise project tracking interface.
The screen shows an automation request/bot project:
- Project name: "Finance Report Automation — Weekly Reconciliation"
- Status column: bold ORANGE badge — "WAITING / IN QUEUE"
- Submitted date: visible, over 12 months ago (e.g. Nov 2023)
- Priority: Medium (deprioritised)
- Assigned to: Unassigned
- A long queue of other rows visible — showing this is one of many stuck requests
The queue should visually communicate: this request is not special, it's just one of dozens waiting.
`;

const images = [
  {
    name: 'hero_v4a.png',
    prompt: `${STYLE}

VERSION A — HANDS ON HEAD

${SCREEN_DETAILS}

THE CHARACTER:
Attractive woman, professionally dressed (smart casual — blazer or knit top), sitting at her desk.
Her BOTH HANDS are raised to her head — one hand on her forehead, fingers slightly spread, the classic "I can't believe this" stress gesture. Not violent. Just the quiet moment of someone who has checked a status that hasn't changed in months.

Her expression: beautiful but visibly stressed. Eyes slightly wide with disbelief or tired frustration. Mouth slightly open — mid-sigh or mid-thought. She looks like she just refreshed the page and saw "WAITING" again, for the 40th time.

Her eyes are looking at the screen — not at the camera. The Pixar quality means her eyes are expressive and readable even from a distance.

THE DESK:
- Main monitor: large Excel spreadsheet with data — her manual work that she does because the automation never came
- Laptop beside it: the Smartsheet/CoE pipeline with the WAITING status visible
- Sticky notes on monitor frame with manual process steps written by hand
- A printed report on the desk — evidence of work done manually
- A coffee mug — untouched, gone cold
- Slight mess of papers — the organised chaos of someone managing too much manually

LIGHTING:
Cold blue-white from the monitors. Slightly harsh office fluorescents overhead. Early morning feel — before others arrive. The loneliness of Monday morning manual work.

MOOD: She is not catastrophising. She is not crying. She is a competent, attractive professional who is simply tired of a system that keeps failing her. The image should make the viewer think: "She deserves better than this."`,
  },
  {
    name: 'hero_v4b.png',
    prompt: `${STYLE}

VERSION B — LEANING BACK, EYES CLOSED, EXASPERATED

${SCREEN_DETAILS}

THE CHARACTER:
Attractive woman, professionally dressed, sitting at her desk. She has just seen the "WAITING" status again.

Her pose: leaning back in her chair, one hand on the desk in front of her, head tilted slightly back — eyes closed or looking at the ceiling. The posture of someone taking a breath after seeing something they didn't want to see. Not rage — acceptance mixed with frustration. The "okay. again. fine." moment.

Her expression: eyes closed or half-open looking upward, slight tension in her brow, lips pressed together. Beautiful but clearly done with this. The Pixar quality gives her face warmth even in frustration — you root for her immediately.

THE DESK:
Same desk environment:
- The laptop screen shows the Smartsheet CoE pipeline — "WAITING" status visible on her request, submitted over a year ago
- Main monitor shows her Excel spreadsheet — the manual work she does because the automation never came
- Sticky notes on the monitor with handwritten manual steps
- Papers, a notebook with pen, a cold coffee
- Calendar visible showing Monday

LIGHTING:
Warmer than Version A — late afternoon maybe, or a desk lamp adding warmth to the blue monitor glow. The slight warmth makes the frustration feel more personal and human.

OPTIONAL GRAPHIC ELEMENT: A subtle floating UI element near her head — like a translucent notification badge showing "47 requests in queue" or "Estimated delivery: Q3 2025" — adding a graphic layer that makes the abstract burden visual without overwhelming the image.

MOOD: Quiet exasperation of a smart, capable person trapped in a broken system. "This shouldn't be this hard."`,
  },
];

async function generate(prompt, retries = 2) {
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
  });
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: AbortSignal.timeout(120_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
      const data    = await res.json();
      const parts   = data.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
      if (!imgPart) throw new Error(`No image. Model: ${(parts.find(p=>p.text)?.text||'').slice(0,150)}`);
      return Buffer.from(imgPart.inlineData.data, 'base64');
    } catch (err) {
      console.error(`  ⚠  Attempt ${attempt}: ${err.message}`);
      if (attempt <= retries) { console.log('  ↻  6s...'); await new Promise(r => setTimeout(r, 6000)); }
    }
  }
  return null;
}

async function main() {
  console.log('\n⚡ Generating v4 hero images (2 versions)');
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    console.log(`⏳ [${i+1}/2] ${img.name}`);
    const buf = await generate(img.prompt);
    if (buf) {
      fs.writeFileSync(path.join(OUT_DIR, img.name), buf);
      console.log(`✅ ${img.name} (${(buf.length/1024).toFixed(0)}KB)`);
    } else {
      console.error(`❌ Failed: ${img.name}`);
    }
    if (i < images.length - 1) { console.log('   ⏸  5s...'); await new Promise(r => setTimeout(r, 5000)); }
  }
  console.log('\n✨ Done. hero_v4a.png and hero_v4b.png in public/images/posts/what-is-gpa/');
}

main().catch(console.error);
