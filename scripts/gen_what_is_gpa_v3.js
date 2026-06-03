/**
 * Image generator v3 — What is GPA?
 * Hero: Visual overwhelm — person buried in manual work, ticket still open
 * Filler: Relief — automation running, same person, different Monday
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
• Photorealistic, cinematic — NOT illustrated, NOT cartoon, NOT stock photo aesthetic
• Film grain texture, natural lighting
• Emotionally honest — real feelings, real moments, not posed
• Subtle olive-green vignette at edges (#1E2A0F shadow)
• Thin straight-cornered olive-yellow border (#8A9A2E), inset 10px
• "Guerrilla Bots" small dim label bottom-right in olive
`;

const images = [
  {
    name: 'hero.png',
    prompt: `${STYLE}

HERO IMAGE: The Weight of Manual Work

CONCEPT: Visual overwhelm. A finance or operations analyst at their desk, surrounded by the evidence of work that never ends. The image should communicate BURDEN in the first two seconds — no caption needed.

THE SCENE:
Wide-ish shot of a cluttered work desk. Two monitors. The big monitor shows a massive Excel spreadsheet — columns of data, colour-coded cells, the kind of file that took years to build and takes hours to maintain every week. Multiple browser tabs visible at the top — 8 or more tabs open.

The laptop beside it shows an IT service portal. The ticket status is clearly visible: a bold orange or amber badge that says "OPEN". Below it, a submitted date that is clearly old — over a year ago. The person has stopped looking at it.

ON THE DESK:
- Sticky notes covering the bottom of the monitor — handwritten steps of a manual process ("Step 1: Download from portal", "Step 2: Paste to column D", "Step 3: Send to manager")
- A printed checklist, partially filled in by hand — the kind of thing someone made because no system does it for them
- A coffee cup that has gone cold — not freshly made, just sitting there
- A notebook open with numbers written in it

THE PERSON:
Visible from shoulder to mid-face. Looking at the Excel screen — not at the camera. Expression: focused but exhausted. The look of someone doing something for the 200th time. Not dramatic despair — the quiet grind of accepted repetition. Slight tension in the jaw, slightly drawn eyes. This is Monday morning and they know exactly how long it will take.

LIGHTING:
Cold blue-white from the monitors. Slightly harsh fluorescent overhead. No warmth — this is a workspace, not a home.

EMOTIONAL TARGET: The reader looks at this and thinks: "I know this desk. I know this feeling. I know exactly what she's about to spend the next two hours doing."`,
  },
  {
    name: 'filler.png',
    prompt: `${STYLE}

FILLER IMAGE: The Monday That Changed

CONCEPT: Relief. The same kind of desk, the same kind of person — but everything is different now. Automation is running. The manual work is gone. This is what after looks like.

THE SCENE:
The same desk environment — but transformed. The sticky notes are fewer or gone. The printed checklists are not there. The desk is cleaner.

THE SCREEN:
The main monitor shows an automation in progress — browser tabs opening and closing in sequence, data moving automatically, a progress indicator running. It looks like a process that was recorded once and now runs itself. Maybe a small status panel or progress bar visible: "Processing: Step 3 of 7 — Extracting portal data..."

THE PERSON:
Same type of person — but their posture has completely changed. They are leaning back slightly in their chair. One hand holds a fresh coffee cup — actually warm this time, steam visible. They are watching the screen — but passively. Relaxed. The slight smile of someone watching something work that used to take them two hours.

They are not euphoric. Not jumping for joy. Just... relieved. The quiet satisfaction of a Monday morning that finally costs them nothing.

LIGHTING:
Warmer than the hero. A window light or a warmer desk lamp — slight golden tone mixing with the monitor glow. The same office, but it feels different when you're not grinding through it.

ON THE SCREEN if possible:
A visible notification or status: "Process complete" or a timer showing something like "Completed in 4m 32s" — what used to take two hours.

EMOTIONAL TARGET: The reader looks at this and thinks: "That could be my Monday. I want that Monday."`,
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
  console.log('\n⚡ Generating v3 images: What is GPA?');
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
}

main().catch(console.error);
