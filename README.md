# GPA Blog — guerrillaprocessautomation.com

The official blog for [Guerrilla Process Automation (GPA)](https://guerrillabots.com) — writing on automation's last mile, the future of intelligent automation CoEs, and the people RPA forgot.

Built with Next.js + MDX. Deployed on Vercel.

---

## Adding a post

Create a new `.mdx` file in `content/posts/`:

```
content/posts/your-post-slug.mdx
```

Required frontmatter:

```yaml
---
title: "Your Post Title"
date: "2026-06-02"
excerpt: "One line that appears in the post list and meta description."
pillar: "optional-pillar-tag"
---
```

Push to `main` → Vercel auto-deploys.

---

## Local dev

```bash
cp .env.local.example .env.local
# Fill in Upstash credentials

npm install
npm run dev
```

## Environment variables

| Variable | Where to get it |
|---|---|
| `UPSTASH_REDIS_REST_URL` | [upstash.com](https://upstash.com) → Create DB → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | Same place |

Set these in Vercel project settings under Environment Variables.

---

## Stack

- **Next.js 16** (App Router)
- **MDX** via `next-mdx-remote`
- **Upstash Redis** — view counts + thumbs up/down reactions
- **Tailwind CSS** — brand theme (military green + cream)
- **Vercel** — hosting + auto-deploy
