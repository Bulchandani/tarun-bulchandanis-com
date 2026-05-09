---
title: "Springboard: an AI-native job-search platform I built solo"
slug: case-study-springboard
date: 2026-05-09
excerpt: "An AI-native personal project. How it scans hundreds of company careers pages, evaluates roles against my profile, drafts tailored CVs and cover letters, and stops one click short of submitting. Built with Claude Code and Gemini Flash, around 15,000 lines of TypeScript, one engineer."
source: own
---

## TL;DR

A personal AI-native job search platform I built solo to run my own
search end to end. It does five things: discover open roles from about
ten sources, score each against my profile using a six-block rubric,
generate a tailored CV and cover letter and interview prep, drive the
application through one of five interchangeable plans, and track every
recruiter and follow-up alongside. The five apply plans are
interchangeable: a generic DOM filler on a CI runner, a Gemini
computer-use agent for SPA wizards, a Claude in Chrome side panel for
when I want eyes on the action, an Apply Pack zip with deep link for
portals where automation is forbidden, and a local headed Chromium
window for portals that need my logged-in session. None of them auto
submit. About 15,000 lines of TypeScript, six weeks, one engineer.
Around $4 per month total in LLM and infrastructure costs. The
patterns (multi-tier model routing, prompt caching across the cron
fleet, step-wise progress through JSONB, plans as commodities, bucket
based polling cadence) port to any agentic always-on workload.

## The full story

I built Springboard to do my own job search properly. It is a personal
project but it is also the most rigorous AI-native build I have shipped
outside an enterprise context, and the playbook generalises to any
agentic, always-on, mostly-autonomous workload. What follows is a
write-up of what it does, how it is put together, what it costs, and
what I would change if I started again.

## What it does

Springboard is a Next.js app together with a small fleet of GitHub
Actions cron workers that, between them, do five things end to end.

The first is **discovery**. Open roles are pulled from about ten
sources every few hours: Greenhouse, Ashby, Lever, Workday, Reed,
Indeed, LinkedIn, Jobserve, cwjobs, Adzuna. Each source has its own
parser. The discovery layer does not trust any single source: cross
source dedup runs daily and collapses near duplicates by company plus
normalised title, then by embedding similarity for the cases where the
title differs slightly between portals.

The second is **evaluation**. Every survivor is scored against my
profile using a six-block rubric (level fit, compensation signal,
location, skills and experience match, posting legitimacy,
recommendation). The language model does the analytical work, the
rubric is structured, and each evaluation finishes with a 0 to 5 score,
a short summary, and a Block A to G report in markdown. The whole
report is rendered side by side with the JD on the job detail page so
I can sanity check the model's reading.

The third is **tailoring**. A CV, a cover letter and an interview prep
brief are generated per role. The chain picks the best CV variant for
the archetype, rewrites the summary to match the role's framing, and
produces a cover letter plus eight to ten likely interview questions
with my STAR format answers.

The fourth is **applying**, via five interchangeable plans. More on
those below.

The fifth is **tracking**: recruiters, follow-ups, interview stages,
submission proofs, application timeline, weekly conversion funnel.
This is the CRM half: contacts, activities, tasks, recruiter contact
extraction from JDs, M365 and LinkedIn enrichment.

The whole thing runs autonomously between sessions. When I open the
inbox in the morning the new high-score evaluations are there. When I
click Apply, draft and submit are queued. When I go to bed the nightly
cron drains the discover queue and dedups duplicates.

## The five plans (and why they are letters, not steps)

The application flow is the bit that gets the most questions, so it is
worth being explicit about how it works. The five plans are alternatives
for a single role, not a sequence. I pick the one that suits the ATS
or portal in front of me and I can fall back to a different one if the
first does not work. They share the same tailored draft and candidate
profile, so switching from Plan A to Plan B is a button click rather
than a re-do.

**Plan A: generic DOM fill.** Headless Playwright on a GitHub Actions
runner. The language model is given the visible form fields plus my
candidate profile and asked to map every field to a value. Then
Playwright fills in the form. Cheap, fast, works on standard
Greenhouse, Ashby, Lever and Workday flows. Stops at Submit.

**Plan B: computer-use.** Gemini's computer-use preview model drives
a real browser visually rather than via the DOM. Slower, more
expensive, but handles the sites where DOM auto-fill breaks. Lumesse
SPAs, multi-step Workday wizards, Reed's modal flows. The agent loops:
take screenshot, pick one click or one keystroke, execute, repeat,
until the form is filled and ready for human review.

**Plan C: Claude in Chrome side panel.** This is the manual oversight
plan. A button copies a structured cockpit prompt to clipboard. I open
the apply page in my own browser, hit Cmd+E to open the side panel,
paste the prompt, and the side panel drives the form fill while I
watch. Best for the cases where I want eyes on every action, or where
the site has bot detection that would flag a headless run.

**Plan D: Apply Pack with deep link.** This is the no-automation plan,
and it is the original way Springboard worked before Plans A and B
existed. A button generates a zip containing the tailored CV PDF, the
cover letter, the markdown answers file, and a deep link to the apply
page. I download, open the deep link in my own browser, drive the
fill myself with the answers file alongside. It is the right fallback
for portals that explicitly forbid automation in their terms of
service: LinkedIn Easy Apply, Reed where the role lives behind a
recruiter wall, Jobserve direct-recruiter listings. No automation,
just acceleration.

**Plan E: local headed Playwright.** When I need a real Chromium
window on my own laptop, with my own logged in sessions, plus the
ability to pause for an interactive login and save the session for
next time. Best for portals that need a logged-in user (Reed, Indeed,
LinkedIn) and where the apply form lives behind that login. The
script auto-traverses from the JD viewer to the apply form, dismisses
the cookie banner, fills every field across the main page and any
iframes, uploads the CV and cover letter, and stops one click short
of Submit. It is the only plan that uses my own machine, and it is
the one I use most often for portal sites.

| Plan | Driver | Best for |
|---|---|---|
| A | GH-Actions Playwright + LLM-mapped DOM | Standard Greenhouse / Workday / Ashby / Lever |
| B | GH-Actions Gemini computer-use | SPA wizards (Lumesse, multi-step Workday) |
| C | Claude in Chrome side panel | When I want eyes on every action |
| D | Apply Pack zip + deep link | Portals that forbid automation in ToS |
| E | Local headed Chromium on my Mac | Portals needing my logged-in session (Reed, Indeed, LinkedIn) |

No plan auto-submits. They all stop one click short. I review the
screenshot, click Approve, and only then does the submit-application
worker fire. That is not a technical limitation, it is a deliberate
constraint: the human has to be in the loop on the final action.

## The stack

Springboard is a single TypeScript pnpm workspace.

| Layer | Tech | Why |
|---|---|---|
| Web | Next.js 15 App Router, React 19, TypeScript strict | Server actions, end-to-end TS, Vercel native |
| UI | Tailwind v4 with CSS variables for theming, plus shadcn/ui patterns | Light and dark mode swap with one cookie |
| ORM | Drizzle | Schema first, SQL first, no runtime overhead |
| DB | Supabase (Postgres, pgvector, Storage) | Embeddings for cross-source dedup, signed URLs for tailored PDFs |
| Hosting | Vercel for web, GitHub Actions for workers | Vercel for the cockpit, Actions for the cron fleet |
| Browser auto | Playwright (headless on GH runners, headed locally for Plan E) | Single API, works everywhere |
| LLMs | Multi-model router. Gemini 2.5 Pro for evaluation, Gemini 2.5 Flash for cheap enrichment, Anthropic Sonnet 4.5 if a key is present, Gemini Computer Use Preview for Plan B | Each task picks the cheapest model that gets the answer |
| Auth | Supabase magic-link, single email allow-list | One user, no signup flow needed |
| Encryption | libsodium AES-256-GCM with a key in GH and Vercel secrets | Playwright session blobs and credentials encrypted at rest |

The pnpm workspace splits into `apps/web` (the Next.js cockpit),
`apps/workers` (every cron worker), `packages/db` (Drizzle schema and
migrations), `packages/core` (pure logic: title filter, dedup, rubric),
`packages/llm` (LLM router with cost tally), and `packages/integrations`
(Telegram, Resend, Gmail, M365, Reed API, Adzuna, Workday).

## Costs, with actual numbers from a real month

| Line item | Monthly |
|---|---|
| Vercel Hobby | $0 |
| Supabase Free | $0 |
| Resend (3,000 emails free tier) | $0 |
| GitHub Actions, around 500 minutes used of 2,000 free | $0 |
| Gemini 2.5 Pro evaluations, around 50 per week | around $3 |
| Gemini Flash enrichment (careers URLs, contact lookup) | under $1 |
| Cross-source dedup embeddings (text-embedding-3-small) | around $0.05 |
| **Total** | **around $4 per month** |

The whole platform, discovery and evaluation and tailored-CV generation
and auto-apply across five plans, costs less than a coffee. The
deliberate architecture choice that makes this work is that every
workload picks the cheapest model that answers the question, every
cron batches work to amortise prompt-cache hits, and every Playwright
session blob is reused so we are not paying for redundant logins.

## Patterns that are worth lifting out

A few things that I would carry into any equivalent build, not just
this one.

**Multi-tier model routing as a first-class concern.** The LLM router
lives at `packages/llm/src/providers.ts` and resolves a `(taskName) →
ModelChoice` mapping per call. Today's mapping has `evaluate` going to
Gemini 2.5 Pro because the analytical work needs structured output,
`coverLetter` going to Gemini 2.5 Pro because writing quality matters,
`careersDiscover` going to Flash because it is high volume and low
precision, `generic-fill` going to 2.5 Pro because DOM mapping has to
be correct, and `computer-use` going to the dedicated computer-use
preview model. The router lets me change the underlying model with a
settings UI toggle. Adding Sonnet 4.5 to the rotation was a 10-line
patch.

**Prompt caching across the cron fleet.** The profile and rubric
prefix is identical across every evaluation. Both Anthropic and Gemini
expose prompt-cache primitives, and the worker reads
`cacheControl: 'profile-rubric'` for the prefix chunk. Cached reads
are charged at around 10% of input rate. The first evaluation of a
session costs around $0.07, the next 49 cost around $0.01 each. That
is the difference between fifteen dollars a month and four.

**Step-wise progress tracking through `worker_runs.payload.steps[]`.**
Long-running workers (Plan A apply, computer-use, evaluation) write
named step records into a JSONB column on the `worker_runs` table.
A live-status panel on the job detail page polls that column every
two seconds. The user sees `started → generating_draft → built_pdfs →
launching_browser → navigating → fields_filled → completed` as it
happens, including the LLM cost per step.

**Soft delete with a dedicated trash view and auto-clean.** Nothing
is hard deleted from the UI. Every "remove" sets `deleted_at = now()`.
There is a `/trash` route showing every soft deleted posting with
restore plus delete forever buttons. Permanent deletes cascade to
evaluations and applications. An auto-clean button hard deletes
anything older than 30 days. Standard pattern, but I keep being
surprised how many internal tools do not do it.

**Bucket-based polling cadence.** Companies are tagged with buckets:
FAANG, MAANG, MAGMA, GAFAM, WITCH, big-4 consulting, MBB, big pharma,
oil majors, magic-circle law, bulge-bracket banks, AI-native, plus
sector and geo tags. Each bucket has its own poll cadence (FAANG
every 8 hours, AI-native every 4 hours, oil majors disabled by
default). The user toggles buckets on or off from a settings page.
The cron worker reads the per-bucket schedule and routes accordingly.
A 41-bucket taxonomy plus the company tags plus the bucket UI lets a
single user steer thousands of monitored companies without per-row
clicks.

**Plans as commodities, not as a single workflow.** The five apply
plans are interchangeable on the job detail page. If Plan A fails on
a Lumesse SPA, I click Plan B and the computer-use agent takes over
with the same tailored CV and cover letter. Same data, different
driver. The plans share nothing except the data contract (the tailored
draft, the candidate profile, the apply URL). That separation has paid
off: when Reed deployed a new login flow that broke Plan A, Plan E
(local headed) worked unchanged because it just walks a real
Chromium window.

## What I would do differently

Two things, if I started again.

I should have built the bucket-tag taxonomy on day one. I started
without it, the inbox grew to about 2,800 companies, and only then
did I stop and design the bucket system. Doing it first would have
saved me re-tagging everything by regex later.

The cross-source dedup should have been embedding-based from the
start. I shipped it as `(company_id, lower(title))` first, which
missed near duplicates ("Head of AI" versus "Head of AI / ML"). Adding
pgvector embeddings on top is on the roadmap, but I should have gone
there first.

A third thing, less of a regret and more an observation: I
underestimated the value of step-wise progress tracking. The first
version of Plan A wrote a single `status='running'` row. The user
experience went from confusing-and-silent to confidence-inspiring once
each step was visible. That is a small change with a large UX delta.
I should have led with it.

## Why this generalises

Springboard is a job-search tool but the architecture is a template
for any agentic, always-on automation that pulls structured data from
multiple imperfect sources, runs a stable evaluation pipeline against
each item, generates tailored artefacts (documents, drafts, decisions),
drives a real workflow that ends in a human approval gate, and
maintains a CRM-like view of all the entities it touches.

Substitute "job posting" with "RFP" and you have an AI sales-development
platform. Substitute it with "regulatory filing" and you have a
compliance automation tool. The patterns port directly: multi-source
discovery, structured rubric evaluation, prompt-cached LLM calls in a
multi-model router, step-wise progress through JSONB, soft-delete
with audit trail, plans as commodities, bucket-based cadence control.

That portability is the actual learning. AI-native architecture is not
about which model you pick. It is about how you wire model calls into
a workflow that is auditable, restartable, cost-bound, and ultimately
human-approvable.

## Status

Around 15,000 lines of TypeScript, around 190 commits, one engineer,
six weeks end to end. Currently monitoring around 1,400 companies,
evaluating around 50 roles a week, in production for my own use.

If you are working on something similar and want to compare notes, my
contact details are in the footer.
