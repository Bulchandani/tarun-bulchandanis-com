---
title: "Springboard — an AI-native job-search platform I built solo"
slug: case-study-springboard
date: 2026-05-09
excerpt: "An honest write-up of an AI-native personal project: how it scans hundreds of company careers pages, evaluates roles against my profile, drafts tailored CVs and cover letters, and stops one click short of submitting. Built with Claude Code + Gemini Flash, ~15K LOC, one engineer."
source: own
---

I built Springboard to do my own job search properly. It's a personal
project but it's also the most rigorous AI-native build I've shipped
outside an enterprise — and the playbook is generalisable to any
"agentic, always-on, mostly-autonomous" workload. This is the honest
version: what it does, how it's built, what it cost, and what I'd
change if I started again.

## What it does

Springboard is a Next.js app + a small fleet of GitHub Actions cron
workers that together do five things, end to end:

1. **Discover** open roles from ~10 sources every few hours
   (Greenhouse, Ashby, Lever, Workday, Reed, Indeed, LinkedIn,
   Jobserve, cwjobs, Adzuna). Each source has its own parser. The
   discovery layer doesn't trust any single source — cross-source
   dedup runs daily and collapses near-duplicates by company +
   normalised title.
2. **Evaluate** every survivor against my profile using a
   six-block rubric (level fit, comp signal, location, skills /
   experience match, posting legitimacy, recommendation). LLM does
   the analytical work; the rubric is structured. Each evaluation
   ends with a 0–5 score, a short summary, and a Block A–G report
   in markdown.
3. **Tailor** a CV + cover letter + interview-prep brief per role,
   passing the JD plus my canonical CV through a chain that picks
   the best CV variant for the archetype, rewrites the summary to
   match the role's framing, and produces a short cover letter +
   8–10 likely interview questions with my STAR-format answers.
4. **Apply** via four interchangeable plans, each suited to a
   different ATS / portal:

   | Plan | Driver | When |
   |---|---|---|
   | A — Plan A | Headless Playwright + LLM-driven DOM mapping | Standard Greenhouse / Workday / etc. on a GH-Actions runner |
   | B — Computer-use | Headless Gemini computer-use model | When DOM auto-fill fails (Lumesse, Workday SPAs) |
   | C — Side panel | Claude in Chrome side-panel prompt | When I want to drive the apply manually with the assistant alongside |
   | E — Local headed | Headed Chromium on my laptop with portal-login pause | Reed / Indeed / LinkedIn portal flows requiring login |

   No plan auto-submits. They all stop one click short of Submit.
   I review the screenshot, click Approve, and only then does the
   submit-application worker fire.
5. **Track** everything — recruiters, follow-ups, interview stages,
   submission proofs, application timeline, weekly conversion funnel.
   This is the CRM half: contacts, activities, tasks, recruiter
   contact extraction from JDs, M365 / LinkedIn enrichment.

The whole thing runs autonomously between sessions. When I open the
inbox in the morning the new high-score evaluations are there;
when I click Apply, draft + submit are queued; when I go to bed the
nightly cron drains the discover queue and dedups duplicates.

## The stack

| Layer | Tech | Why |
|---|---|---|
| Web | Next.js 15 App Router, React 19, TypeScript strict | Server actions, end-to-end TS, Vercel-native |
| UI | Tailwind v4 (CSS variables for theming) + shadcn/ui patterns | Light and dark mode swapping with one cookie |
| ORM | Drizzle | Schema-first, SQL-first, no runtime overhead |
| DB | Supabase (Postgres + pgvector + Storage) | Embeddings for cross-source dedup, signed URLs for tailored PDFs |
| Hosting | Vercel (web) + GitHub Actions (workers) | Vercel for the cockpit; Actions for the cron fleet |
| Browser auto | Playwright (headless on GH runners; headed locally for Plan E) | Single API, works everywhere |
| LLMs | Multi-model router — Gemini 2.5 Pro for evaluation; Gemini 2.5 Flash for cheap enrichment; Anthropic Sonnet 4.5 (when key set); Gemini Computer Use Preview for Plan B | Each task picks the cheapest model that gets the answer |
| Auth | Supabase Auth, magic-link, single-email allow-list | One user, no signup flow needed |
| Encryption | libsodium AES-256-GCM with `STORAGE_STATE_KEY` | Playwright session blobs and credentials at rest |

The codebase is a pnpm workspace: `apps/web` (Next.js cockpit),
`apps/workers` (every cron worker), `packages/db` (Drizzle schema +
migrations), `packages/core` (pure logic — title filter, dedup,
rubric), `packages/llm` (LLM router with cost tally), and
`packages/integrations` (Telegram, Resend, Gmail, M365, Reed API,
Adzuna, Workday).

## Costs — actual numbers from a real month

| Line item | Monthly |
|---|---|
| Vercel Hobby | $0 |
| Supabase Free | $0 |
| Resend (3,000 emails free) | $0 |
| GitHub Actions (~500 minutes / 2,000 free) | $0 |
| Gemini 2.5 Pro evaluations (~50 / week) | ~$3 |
| Gemini Flash enrichment (careers URLs, contact lookup) | <$1 |
| Cross-source dedup embeddings (text-embedding-3-small) | ~$0.05 |
| **Total** | **~$4 / month** |

The whole platform — discovery + evaluation + tailored-CV generation +
auto-apply against four ATS variants — costs less than a coffee. The
deliberate architecture choice that makes this work: every workload
picks the cheapest model that answers the question, every cron
batches work to amortise prompt-cache hits, every Playwright session
blob is reused so we don't pay for redundant logins.

## What's interesting from an engineering-practice angle

A few patterns I'd carry into any equivalent build:

### 1. Multi-tier model routing as a first-class concern

The LLM router lives at `packages/llm/src/providers.ts` and resolves a
`(taskName) → ModelChoice` mapping per-call. Today's mappings:

```
evaluate → gemini-2.5-pro      (analytical work, structured output)
coverLetter → gemini-2.5-pro   (writing quality matters)
careersDiscover → gemini-2.5-flash  (high volume, low precision)
generic-fill → gemini-2.5-pro   (DOM mapping, must be correct)
computer-use → gemini-2.5-cup   (specialised model, vision)
```

The router lets me change the underlying model with a settings UI
toggle. Adding Sonnet 4.5 to the rotation was a 10-line patch.

### 2. Prompt caching across the cron fleet

Profile + rubric prefix is identical across every evaluation. The
Anthropic and Gemini providers both expose prompt-cache primitives,
and the worker reads `cacheControl: 'profile-rubric'` for the prefix
chunk. Cached reads are charged at ~10% of input rate. The first
evaluation of a session costs ~$0.07; the next 49 cost ~$0.01 each.
That's the difference between $15 and $4 a month.

### 3. Step-wise progress tracking through `worker_runs.payload.steps[]`

Long-running workers (Plan A apply, computer-use, evaluation) write
named step records to a JSONB column on the `worker_runs` table.
A live-status panel on the job-detail page polls that column every
2 seconds. The user sees `started → generating_draft → built_pdfs →
launching_browser → navigating → fields_filled → completed` as it
happens, including the LLM cost per step.

### 4. Soft delete + dedicated trash view + auto-clean

Nothing is hard-deleted from the UI. Every "remove" sets
`deleted_at = now()`. There's a `/trash` route showing every soft-
deleted posting with restore + delete-forever buttons; permanent
deletes cascade to evaluations and applications. An auto-clean
button hard-deletes anything older than 30 days. Standard pattern,
but I keep being surprised how many internal tools don't do it.

### 5. Bucket-based polling cadence

Companies are tagged with buckets — FAANG, MAANG, MAGMA, GAFAM,
WITCH, big-4 consulting, MBB, big-pharma, oil-majors, magic-circle
law, bulge-bracket banks, AI-native, sector-* and geo-* tags. Each
bucket has its own poll cadence (FAANG every 8h, AI-native every 4h,
oil-majors disabled by default). The user toggles buckets on/off
from a settings page; the cron worker reads the per-bucket schedule
and routes accordingly. A 41-bucket taxonomy + the company tags +
the bucket UI lets a single user steer thousands of monitored
companies without per-row clicks.

### 6. Plans as commodities, not as a single workflow

The four apply plans (A / B / C / E) are interchangeable on the
job-detail page. If Plan A fails on a Lumesse SPA, the user clicks
Plan B and the computer-use agent takes over with the same tailored
CV and cover letter. Same data, different driver. The plans share
nothing except the data contract (the tailored draft + the candidate
profile + the apply URL). That's been worth it: when Reed deployed a
new login flow that broke Plan A, Plan E (local headed) worked
unchanged because it just walks a real Chromium window.

## What I'd do differently

A few. Cleanly:

1. **I should have built the bucket-tag taxonomy on day one.** I started
   without it, the inbox grew to 2,800 companies, and only then did I
   stop and design the bucket system. Doing it first would have saved
   me re-tagging everything by regex later.
2. **The cross-source dedup should have been embedding-based from the
   start.** I shipped it as `(company_id, lower(title))` first, which
   missed near-duplicates ("Head of AI" vs "Head of AI / ML"). Adding
   pgvector embeddings on top is now on the roadmap — but I should
   have gone there first.
3. **I underestimated the value of step-wise progress tracking.** The
   first version of Plan A just wrote a single `status='running'` row.
   The user-facing experience went from confusing-and-silent to
   confidence-inspiring once each step was visible. That's a small
   change with a huge UX delta. I should have led with it.

## Why this is generalisable

Springboard is a job-search tool but the architecture is a template
for any agentic, always-on automation that:

- Pulls structured data from multiple imperfect sources
- Runs a stable evaluation pipeline against each item
- Generates tailored artefacts (documents, drafts, decisions)
- Drives a real workflow that ends in a human approval gate
- Maintains a CRM-like view of all the entities it touches

Substitute "job posting" with "RFP" and you've described an AI
sales-development platform. Substitute it with "regulatory filing"
and you have a compliance automation tool. The patterns —
multi-source discovery, structured rubric evaluation, prompt-cached
LLM calls in a multi-model router, step-wise progress through
JSONB, soft-delete + audit trail, plans as commodities, bucket-based
cadence control — port directly.

That portability is the actual lesson. AI-native architecture isn't
about which model you pick. It's about how you wire model calls
into a workflow that's auditable, restartable, cost-bound, and
ultimately human-approvable.

## Status

~15,000 lines of TypeScript, ~190 commits, one engineer, six weeks
end-to-end. Currently monitoring ~1,400 companies, evaluating ~50
roles a week, in production for my own use.

If you're working on something similar and want to compare notes,
get in touch.
