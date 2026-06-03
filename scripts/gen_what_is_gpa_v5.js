/**
 * Image generator v5 — 2 emotional variations based on V4B
 * Updated dates to 2027. Pushing emotion harder.
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
• 80% cinematic photorealism + 20% Pixar-inspired stylization
  - Pixar qualities: slightly larger expressive eyes, idealized but human skin, emotionally readable face, warm character appeal
  - Environment stays photorealistic. Character has Pixar warmth.
• Attractive South Asian woman, late 20s, professional (blazer or smart top)
• Film grain on environment
• Olive-green vignette at frame edges (#1E2A0F)
• Thin straight-cornered olive-yellow border (#8A9A2E), inset 10px
• "Guerrilla Bots" small dim label bottom-right

FLOATING NOTIFICATION ELEMENT (must appear in both images):
A clean dark-glass UI badge floating in the upper right area — like a system notification:
  Line 1: ⚠ "47 requests in queue"
  Line 2: 🕐 "Estimated delivery: Q2 2027"
This badge should feel like it floated off her screen — semi-transparent, sharp text, urgent but quietly devastating.
`;

const images = [
  {
    name: 'hero_v5a.png',
    prompt: `${STYLE}

VARIATION A — THE WEIGHT OF REPETITION

CONCEPT: The viewer realises this isn't just today. This is every Monday. For over a year. The desk tells that story.

THE SCENE:
Slightly wider shot — we see more of the desk. The environment communicates duration.

DESK DETAILS THAT TELL THE STORY:
- Main monitor: Excel spreadsheet open — the same file she opens every Monday
- Laptop: CoE demand pipeline showing "Finance Report Automation — Weekly Reconciliation" with bold ORANGE "WAITING" status, submitted date showing "Feb 2025" — over a year ago
- Sticky note on monitor frame: handwritten, with "Ticket #4471 — still open" — written, then crossed out, then written again underneath — showing she's checked multiple times
- A paper notepad visible on the desk: the top lines show dates — "Mon Jun 2", "Mon May 26", "Mon May 19" — same task listed under each one. The repetition is visible.
- 2-3 faint coffee cup rings on the desk surface — not from today, stains from many Mondays
- A wall calendar (or desk calendar) showing JUNE 2026 with Mondays subtly circled
- Printed checklist partially filled — same checklist every week, slightly worn at the edges

THE WOMAN:
Eyes half-closed, head tilted slightly back and to the side — not dramatic, just the exhale before starting again. She knows what she's about to spend the next two hours doing. She's accepted it. That acceptance is the saddest part.

Her hand rests on the mouse — not clicking yet. That brief pause before the Monday routine begins again.

Expression: A mix of quiet resignation and the faintest trace of "I used to think this would get fixed." Beautiful, real, deeply relatable.

LIGHTING:
Early morning. Cool blue from monitors. Fluorescent overhead just turning on. The specific loneliness of being in the office before everyone else because the Monday report won't finish itself.

EMOTIONAL TARGET: The viewer's stomach sinks a little. They've felt this exact moment. Or they know someone who has. "This is what a broken system looks like on a human face."`,
  },
  {
    name: 'hero_v5b.png',
    prompt: `${STYLE}

VARIATION B — THE MOMENT SHE STOPS HOPING

CONCEPT: She just refreshed the page. The status hasn't changed — again. This is the exact second her last bit of hope leaves. Not anger. Just the quiet closing of a door she kept trying to open.

THE SCENE:
Medium-close shot. More intimate — we're closer to her face and upper body.

THE SETUP:
Her laptop shows the CoE pipeline clearly. Her automation request is visible: "Finance Report Automation — Weekly Reconciliation". She has just clicked "Refresh". The status still reads "WAITING" in orange. Submitted: Feb 2025.

Her other monitor shows the Excel file already open and waiting — she knew she'd end up here.

THE WOMAN:
This is the money shot. Her expression is the image.

She is looking directly at the laptop screen. But the expression is not frustration — it's something quieter and more devastating: the exact moment a person stops expecting things to change. Eyes slightly glassy — not crying, but that subtle wet quality that comes right before you decide not to cry. Lips pressed gently together. One small breath out.

Her posture: slightly forward, one elbow on the desk, chin resting very lightly on her closed fist — like she's been sitting here for a moment just staring, before she sighs and opens the Excel file and starts the work herself.

She is beautiful. She is clearly capable. She is clearly exhausted by something that has nothing to do with her ability. That gap — between what she deserves and what the system gives her — should be visible in the image without a single word.

GRAPHIC OVERLAY:
The notification badge floats quietly near the upper right: "47 requests in queue / Estimated delivery: Q2 2027"
Also, very faintly behind her — like a ghost of text on the wall or in the air — the words "Still waiting." in dim olive. Subtle, not heavy-handed.

LIGHTING:
Warm-cool mix. Monitor blue on her face. A faint warm light from behind suggesting a window — the world is moving on outside. She is still here. Still manual.

EMOTIONAL TARGET: The viewer feels something in their chest. Empathy. Protectiveness. The recognition that a smart, capable person's time is being wasted by a system that was supposed to help her. They feel — maybe for the first time — that this is genuinely unfair.`,
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
  console.log('\n⚡ Generating v5 hero images (2 emotional variations)');
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
