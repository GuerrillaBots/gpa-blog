/**
 * Image generator v2 — "What is GPA?" post
 * Hero: Finance business user, resigned, waiting for automation that never came
 * Filler: CoE developer, overwhelmed, drowning in maintenance not building
 * Run: node scripts/gen_what_is_gpa_v2.js
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
MANDATORY VISUAL STYLE:
• Landscape 16:9, 1200×630px
• Background tones: deep charcoal-olive, warm office light where human scenes appear
• Mood: cinematic, real, emotionally honest — NOT corporate stock photography
• No posed smiling. No generic business meeting scenes. Real moments, real feelings.
• Film grain texture — feels like a photograph, not a render
• Subtle olive-green brand shadow at edges
• Bottom-right corner: small dim "Guerrilla Bots" label in olive (#6A7A3A)
• Inner border: thin straight-cornered frame in olive-yellow (#8A9A2E), inset 10px
`;

const images = [
  {
    name: 'hero.png',
    prompt: `${STYLE}

HERO IMAGE — Cinematic, emotionally real. No text overlay needed — the image tells the story.

THE SCENE: A finance analyst at her office desk, early morning. She has just opened her laptop.

WHAT SHE IS DOING:
She has an IT ticket portal open on her screen — the status reads "OPEN", the submitted date is visible and old (over a year ago). She is looking at it. Not with rage. With quiet resignation — the look of someone who already knew what she'd find, checked anyway out of habit, and is now closing the tab.

Her other screen (or background window) already has her Excel file open — the one she fills manually every Monday. The sticky notes on her monitor have process steps written in her own handwriting. A half-drunk coffee sits on the desk.

THE EMOTION: Not dramatic. This is the quiet defeat of someone who has accepted a system that failed them. She has stopped fighting it. She just does the work now. This is her Monday morning — the same one she's had for two years.

VISUAL DETAILS:
- Warm tungsten office light, slightly cool blue-grey from the monitors
- Hands visible near the keyboard, not typing — just a brief pause before she starts again
- The IT ticket status "OPEN" should be legible on screen if possible — amber or yellow status chip
- Face partially visible — thoughtful, tired, not dramatic
- Desk has the texture of real work: printouts, a pen, a notebook, small personal items
- Shot from slightly above and to the side — intimate, documentary-style

This image should make a reader think: "I know this person. I know this feeling."`,
  },
  {
    name: 'filler.png',
    prompt: `${STYLE}

FILLER / MID-ARTICLE IMAGE — The other side of the same broken system.

THE SCENE: A CoE developer at his workstation, mid-afternoon. Multiple monitors.

WHAT HE IS LOOKING AT:
His screens show a mix of: bot error logs with red failure indicators, a maintenance ticket queue with too many items, a Jira/backlog board where the "In Progress" column has been untouched for days. One screen shows an automation that has broken — a bot that was running fine until a vendor UI changed.

He is not lazy. He is not incompetent. He is a developer who wanted to build things — and instead spends his days patching bots that shouldn't need patching. The queue behind him has 180+ items he will never reach.

THE EMOTION: Genuine frustration mixed with exhaustion. Not anger at a person — frustration at a system. He knows the backlog exists. He knows people are waiting. He also knows he physically cannot get there. He's doing his job. The system isn't built for what the business needs.

VISUAL DETAILS:
- Blue-white monitor glow dominates the lighting — classic developer environment
- Multiple monitors, slightly messy desk — cables, a cold coffee, developer tools visible
- Error indicators, red/amber alerts visible on screen — the maintenance burden is visible
- His posture: leaning back slightly, arms crossed or one hand on face — thinking, not panicking
- Face partially visible in profile or 3/4 angle — looks like a real person, not a model
- Post-it notes on the monitor with quick fix notes
- The backlog number should feel overwhelming — not 5 items, more like a long scrolling list

This image should make a reader think: "This isn't his fault either. Nobody wins in this system."`,
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
  console.log('\n⚡ Generating v2 images: What is GPA?');
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
}

main().catch(console.error);
