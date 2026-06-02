/**
 * Image generator — "What is GPA?" post
 * Outputs: public/images/posts/what-is-gpa/hero.png + filler.png
 * Run: node scripts/gen_what_is_gpa.js
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
MANDATORY VISUAL STYLE — do not deviate:
• Landscape 16:9, optimised for 1200×630px
• Background: near-black (#0D1509) with deep olive-green shadow gradient bleeding from bottom corners
• Inner border: thin straight-cornered frame in olive-yellow (#8A9A2E), inset 10px — NOT rounded
• Primary text: sharp warm cream (#E8E4D8), bold condensed sans-serif
• Accent: electric yellow-green (#C8D94B) on key terms, dividers, emphasis
• Texture: subtle film grain / matte paper overlay
• Mood: operational briefing — practitioner-real, field-tested, NOT corporate polished
• No stock office imagery, no generic meeting scenes
• Bottom-right: small dim "Guerrilla Bots" label in olive (#6A7A3A)
`;

const images = [
  {
    name: 'hero.png',
    prompt: `${STYLE}

HERO IMAGE for blog post: "What is Guerrilla Process Automation?"
Tagline: "A new category of automation — for the people RPA forgot."

CONCEPT — The Last Mile Gap:
A cinematic, split-composition image divided by a thin, slightly glowing olive-yellow vertical line.

LEFT HALF (55% width) — THE COE SIDE — cool, ordered, automated:
- A clean operations room or automation control interface: multiple monitors showing bots running, green status indicators, dashboards, ordered queues
- Cool blue-green lighting, clean, slightly clinical
- A label floating at the top in olive-yellow uppercase small caps: "THE 60%"
- Below the label, tiny dim text: "CoE automations. Running."
- The LEFT half feels COMPLETE — the automation is working here

RIGHT HALF (45% width) — THE LAST MILE — warm, human, manual:
- A close-up of a business analyst's desk: multiple browser tabs open, an Excel spreadsheet, sticky notes, a half-drunk coffee
- Warm tungsten light — the kind in a regular office, not a tech hub
- The person's hands visible — mid-task, copy-pasting data, not looking at the camera
- A faint OPEN IT ticket visible on screen, timestamp showing it was submitted 14 months ago
- A label floating at the top in electric yellow-green uppercase small caps: "THE 40%"
- Below the label, tiny dim text: "Still waiting. Still manual."
- The RIGHT half feels INCOMPLETE — the human is stuck

The dividing line between the two halves should glow faintly, olive-yellow — representing the boundary that GPA bridges.

BOTTOM STRIP (full width, 12% height):
- Dark overlay strip
- Centered cream text: "Guerrilla Process Automation bridges this gap."
- Thin olive-yellow line above the strip

The overall mood: the contrast between order and chaos, between automated and manual, between the served and the forgotten. This is what GPA exists to fix.`,
  },

  {
    name: 'filler.png',
    prompt: `${STYLE}

IN-ARTICLE PULL-QUOTE IMAGE for post: "What is GPA?"

CONCEPT — The Distribution Problem:
A pure typographic statement image. No people, no scenes. Just the key insight, designed to stop a reader mid-scroll.

LAYOUT — centered, breathing, bold:

TOP: Small uppercase olive-yellow label, letter-spaced: "THE CORE INSIGHT"

CENTER (main text, 3 lines, large bold condensed cream):
  Line 1 (smaller, italic, olive): "The automation gap isn't"
  Line 2 (LARGE, bold, cream): "A DISTRIBUTION"
  Line 3 (LARGE, bold, cream): "PROBLEM."

  Then a thin electric yellow-green divider line

  Below the divider, one line in medium italic cream:
  "The automation got built — just not for the right people."

BOTTOM: Small dim olive text, centered:
  "Guerrilla Process Automation — the distribution fix."

BACKGROUND TREATMENT:
- Near-black base with a subtle circular olive-green glow behind the central text — like a spotlight, soft, not harsh
- The grain texture makes it feel like print on field paper
- The electric yellow-green (#C8D94B) divider line should have a faint glow effect
- The overall image should feel like something worth screenshotting — a shareable quote card

This is the moment in the blog where the reader stops, rereads the line, and thinks "that's exactly it."`,
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
  console.log('\n⚡ Generating: What is GPA? — hero + filler');
  console.log(`📁 ${OUT_DIR}\n`);

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

  console.log('\n✨ Done. Reference in MDX:');
  console.log('   ![hero](/images/posts/what-is-gpa/hero.png)');
  console.log('   ![filler](/images/posts/what-is-gpa/filler.png)');
}

main().catch(console.error);
