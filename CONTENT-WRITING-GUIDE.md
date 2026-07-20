# Content Writing Guide — Guerrilla Bots / GPA

This guide exists because AI writing is generic by default and generic is invisible. Use this before writing, not after.

Research basis: adversarially verified findings from Perell, Graham, Ship 30 for 30. Claims that didn't survive 3-vote verification are not in here.

---

## The Core Problem With How We're Writing

AI drafts are grammatically correct, tonally plausible, and strategically empty. Every sentence is fine. Nothing lands. Because there's no specific thing it's trying to say — just a topic, covered adequately.

The fix isn't better prompting. It's knowing the ONE specific insight before writing starts.

---

## Step 0: Find the Shiny Dime First

Perell calls it the Shiny Dime — the smallest, most specific insight you can actually write about. Not a topic. Not a theme. One specific, slightly surprising thing that's true.

**Bad (topic):** "GPA helps business users automate"  
**Bad (theme):** "Automation should be accessible to everyone"  
**Good (shiny dime):** "The people who know a workflow best are the last people allowed to automate it"  
**Good (shiny dime):** "Before you can have a human-in-the-loop, you need a human who has time to be in the loop"  
**Good (shiny dime):** "CoE backlogs don't grow because CoEs are slow. They grow because CoEs are the only pipe."  

Once you have the shiny dime, cut anything that doesn't orbit it. The dime is the test: does this sentence, paragraph, section push toward it or away from it?

**How to find it:** Ask "what is slightly wrong here that nobody has named cleanly?" Not "what is the message?" — that's marketing. "What's the anomaly?" — that's writing.

For GPA, the anomaly is almost always: someone with deep expertise was excluded from a system that needed their expertise. Find the specific version of that.

---

## Step 1: Open With the Anomaly, Not the Context

**The Graham move (confirmed):** Start from something that seems slightly wrong, not from background. Don't set the scene. Don't establish credentials. Drop the reader into the tension before they've decided whether they care.

**Before (context-first, wrong):**
> "I've been in finance operations for fourteen years, and automation has always felt like it was built for someone else..."

**After (anomaly-first):**
> "The ticket is still open. The reconciliation has been running for six weeks. I haven't closed it — closing it feels like mourning something nobody showed up for."

The anomaly creates an open loop (see below) and pulls the reader forward. Context kills momentum. Context can enter mid-piece, once the reader is already moving.

**For practitioner posts:** Never open with credentials. Open with the specific thing that happened or the specific thing that's wrong.

---

## Step 2: Open Loops — Make Them Need to Know

An open loop raises a question without answering it. The reader has to keep reading to close it. (Confirmed from Ship 30 for 30 and independent sources.)

**The 3 open loop types that work for GPA:**

1. **Tension hook** — state a situation that's unresolved. "The ticket is still open. The bot has been running for six weeks."
2. **Named anomaly** — name something broken without yet explaining why. "The more bots we built, the longer the backlog grew."
3. **Reversed assumption** — state something that should be obvious but isn't. "The person who knows the workflow is the last person allowed to automate it."

**Rules:**
- Don't resolve the loop in paragraph 1. Let it sit for 2-3 paragraphs.
- Don't name GPA until the reader feels the problem. If you mention the product before the pain, you've written an ad.
- One open loop per piece. Stacking them reads like a listicle, not tension.

**LinkedIn-specific:** Hook lives in the first ~150 characters (mobile matters more than desktop). If the open loop isn't complete in those characters, most readers never click "See more." The entire first sentence has to earn the scroll.

---

## Step 3: Pain Before Product — 60/40

GPA should appear in the second half of the piece. The reader needs to feel the problem fully before the solution means anything.

**Ratio:** 60-70% problem, 30-40% resolution.

**For practitioner posts — how to write the problem:**
- Specific, textured, named. Not "it was inefficient" — "I finished at 6:40 in the evening with a stiff neck and a very cold coffee."
- Make the system's failure feel absurd, not dramatic. Dry recognition works better than outrage.
- Name the structural reason for the failure, not just the personal experience. "The CoE isn't slow. It's the only pipe."

**What to avoid:**
- "I tried GPA and it worked." (That's a testimonial, not a story.)
- "I² Recorder makes it easy to..." (That's a product page.)
- Any mention of Guerrilla Bots in the first third of the piece.

---

## Step 4: CRIBS — The Only Revision Framework

After a draft, go through it with CRIBS (Perell, high confidence, 3-0 verified):

- **C — Confusing:** Sentence requires re-reading. Rewrite as two simpler sentences or cut.
- **R — Repeated:** You said this already. Cut it. AI loves to say things twice.
- **I — Interesting:** Mark these. Build toward them. Put them at the end of paragraphs.
- **B — Boring:** Context you felt obligated to include. Cut it. Nobody needed it.
- **S — Surprising:** The shiny dime, the anomaly, the reversed assumption. Double down. This is the only thing that makes the piece worth reading.

Most AI drafts are R and B. Cut those. What's left is usually a better piece at half the length.

---

## Step 5: Sentence Rhythm

Vary length deliberately.

Short sentences land. They punctuate. They end things.

Longer sentences carry argument across multiple ideas and build the sense that something complex is being worked through carefully, which earns the punchline that follows.

Short again.

**Rules:**
- Never three consecutive sentences of the same approximate length.
- One-sentence paragraphs are emphasis tools. Use them for the shiny dime or the key turn — not for filler.
- No paragraph longer than 4-5 sentences in a digital post.
- White space is structure. Short paragraphs feel fast. A wall of text feels like homework.

---

## Structural Templates

### Practitioner Story Post (Blog / Substack)

```
Hook — anomaly or unresolved tension. 1-2 sentences. No setup.

Problem — specific, textured reality. What their world actually looks like.
  2-3 paragraphs. No GPA. No solution.

Structural failure — why the system couldn't solve it. 
  1 paragraph. Name the design problem, not the personal frustration.

Turn — what changed and why.
  1-2 paragraphs. GPA enters here, briefly, as logical conclusion.

Resolution — brief, dry, not triumphant.
  1 paragraph.

Closing line(s) — the shiny dime stated directly, or an open question.
  Not a CTA. Not a summary. The one thing the piece was always heading toward.
```

### LinkedIn Post

```
Line 1: Hook — 150 chars max. Anomaly or reversed assumption. Earns the "See more" click.

Lines 2-4: The problem felt. Short sentences. No intro, no credentials.

Lines 5-8: The turn — what shifted, what the structural insight is.

Lines 9-10: The shiny dime stated directly.

Final line: Open question or clean close. No CTA unless it fits naturally.
```

---

## GPA Voice Rules

1. **Scrappy, not inspirational.** No triumphant arcs. Dry recognition works better. "I made chai. I left at 5:30."
2. **Name the system's failure, not the person's pain.** The CoE isn't bad. The structure doesn't fit the problem. That's more interesting and more true.
3. **GPA appears as a logical next step, not a hero.** "Someone built a tool where knowing the workflow was enough." Not "GPA transformed how I work."
4. **No anti-IT framing, ever.** IT approved the infrastructure. That's part of the story.
5. **No ance/bility words.** Governance, observability, resilience, scalability — these are what CoEs say to each other to feel good. Not our vocabulary.
6. **The reader should feel seen, not sold to.** If the piece would work as an ad, it's not working as a story.

---

## What "Basic and Stupid" Looks Like

- Opens with credentials or years of experience
- Explains GPA or I² Recorder in paragraph 2
- Uses "game-changer," "unlocked new possibilities," "empowered business users"
- Tells the reader how to feel ("I was amazed to discover...")
- Ends with "To learn more about Guerrilla Bots..."
- Shiny dime is buried in paragraph 3 or missing
- Every paragraph is the same length
- The anomaly is never named — just "the process was time-consuming"
- Reads like a press release written by someone who once met a practitioner

---

## The Final Test

Read the piece cold. Ask: "Would someone who has nothing to gain from reading this want to read this?"

If no: Find the shiny dime. Restructure around it. Cut everything that doesn't orbit it.

If yes: Run CRIBS. Cut B and R. Amplify S.

If the piece would work as a Guerrilla Bots ad, it's not working as a story. Those are opposites here.
