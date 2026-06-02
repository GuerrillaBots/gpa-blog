/**
 * Blog Post Image Generator
 * Generates 2 images per post: hero (top) + filler (mid-article)
 *
 * Usage:
 *   node scripts/generate_post_images.js <slug> "<post title>" "<one-line hook>"
 *
 * Example:
 *   node scripts/generate_post_images.js what-is-gpa "What is GPA?" "The fix for the 40% RPA forgot."
 *
 * Output: public/images/posts/<slug>/hero.png + filler.png
 * Requires: GEMINI_KEY in .env.local
 */

const fs   = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const [k, ...v] = line.replace(/"/g, '').split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const GEMINI_KEY = process.env.GEMINI_KEY;
if (!GEMINI_KEY) { console.error('GEMINI_KEY missing in .env.local'); process.exit(1); }

const MODEL  = 'gemini-2.0-flash-preview-image-generation';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;

const [,, slug, title, hook] = process.argv;
if (!slug || !title) {
  console.error('Usage: node generate_post_images.js <slug> "<title>" "<hook>"');
  process.exit(1);
}

const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'posts', slug);
fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── Brand style (same DNA as carousels, adapted for landscape blog) ──────────
const STYLE = `
MANDATORY VISUAL STYLE — apply to every element:
• Landscape 16:9 ratio, designed for 1200×630px blog header
• Background: near-black (#0D1509) with a deep olive-green shadow gradient from bottom corners (#1E2A0F)
• Primary text: sharp warm cream (#E8E4D8), clean bold condensed sans-serif
• Accent color: electric yellow-green (#C8D94B) — for key terms and emphasis
• Horizontal dividers where used: thin line, transparent → olive-yellow (#8A9A2E) → transparent
• Texture: subtle film grain / noise overlay — field paper / matte print aesthetic
• Mood: operational briefing, practitioner-real, editorial — NOT corporate polished
• NO stock office imagery, NO generic business meeting scenes
• Human presence (when shown): close-up of hands, real screens, real process environments
• Bottom-right corner: small dim "Guerrilla Bots" label in olive (#6A7A3A)
• Inner border: thin straight-cornered frame in olive-yellow (#8A9A2E), inset 10px — NOT rounded
`;

// ─── Prompts ──────────────────────────────────────────────────────────────────
const images = [
  {
    name: 'hero.png',
    prompt: `${STYLE}

BLOG HERO IMAGE — 16:9 landscape

This is the hero image for a blog post titled: "${title}"
Hook line: "${hook || title}"

SCENE:
A cinematic, editorial scene that captures the emotional core of the post topic.
Think: operational briefing meets field documentation. Real environments, not staged.
If the topic is about automation/RPA: close-up of a real work screen, hands at keyboard, operational context.
If the topic is about the CoE: wide shot of a strategy whiteboard, a conference room with purpose.
Keep human presence subtle — hands, silhouettes, partial figures. Never a posed stock photo face.

LAYOUT — text overlay on image:
LEFT SIDE (60% of width): The cinematic scene
RIGHT SIDE (40% of width): Dark overlay (#0D1509 at 85% opacity) with text:
  - Small uppercase olive-yellow label at top: "GPA FILES"
  - Large bold cream text (2-3 lines max): "${title}"
  - Thin olive-yellow divider
  - Small italic cream text below: "${hook || ''}"

The image should feel like it belongs in a field manual — purposeful, editorial, earned.`,
  },
  {
    name: 'filler.png',
    prompt: `${STYLE}

BLOG FILLER / PULL-QUOTE IMAGE — 16:9 landscape

This is an in-article image for a blog post titled: "${title}"
It should function like a pull-quote visual — emphasising a key idea from the post.

SCENE:
More abstract / typographic than the hero. Less cinematic scene, more bold statement.
Options (pick the strongest fit for the topic):
- A data/math visual: handwritten-style numbers or statistics on the dark background (field notes style)
- A conceptual split: two contrasting states side by side (old way vs new way)
- A pure typographic statement: one key line from the post, large, bold, centered

LAYOUT — typographic pull-quote style:
CENTER: The key insight in large bold condensed cream text (1-2 lines)
Below: A thin olive-yellow divider
Below that: Smaller italic cream text with context or attribution
Background: Near-black with subtle olive-green gradient from corners
No heavy scene — let the words breathe.

Make it feel like something worth screenshotting and sharing.`,
  },
];

// ─── API call ─────────────────────────────────────────────────────────────────
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
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);

      const data    = await res.json();
      const parts   = data.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));

      if (!imgPart) {
        const txt = parts.find(p => p.text)?.text || 'no text';
        throw new Error(`No image. Model said: ${txt.slice(0, 150)}`);
      }
      return Buffer.from(imgPart.inlineData.data, 'base64');
    } catch (err) {
      console.error(`  ⚠  Attempt ${attempt} failed: ${err.message}`);
      if (attempt <= retries) {
        console.log('  ↻  Retrying in 6s...');
        await new Promise(r => setTimeout(r, 6000));
      }
    }
  }
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n⚡ Generating images for: "${title}"`);
  console.log(`📁 Output: ${OUT_DIR}\n`);

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    console.log(`⏳ [${i + 1}/${images.length}] ${img.name}`);
    const buf = await generate(img.prompt);
    if (buf) {
      const out = path.join(OUT_DIR, img.name);
      fs.writeFileSync(out, buf);
      console.log(`✅ ${out} (${(buf.length / 1024).toFixed(0)}KB)`);
    } else {
      console.error(`❌ Failed: ${img.name}`);
    }
    if (i < images.length - 1) {
      console.log('   ⏸  5s gap...');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log('\n─────────────────────────────────────');
  console.log(`✨ Done. Add to your MDX post:`);
  console.log(`   Hero:   /images/posts/${slug}/hero.png`);
  console.log(`   Filler: /images/posts/${slug}/filler.png`);
}

main().catch(console.error);
