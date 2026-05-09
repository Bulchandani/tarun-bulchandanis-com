---
title: "Meridian — building the EA platform we couldn't buy"
slug: case-study-meridian
date: 2026-05-09
excerpt: "How a five-person architecture team replaced ~$100K/yr of commercial EA tooling with one I built myself in production. The honest version: what worked, what I'd do differently, and why an AI-native rebuild was the right answer at our scale."
source: own
---

When I joined Sonnedix three years ago there was no enterprise architecture
function — no operating model, no governance forum, no application
portfolio, no capability model. Just a fast-moving renewables business
scaling through acquisitions, with the typical scale-up pull toward
short-term fixes per project.

The textbook playbook said: stand up an EA management platform like Ardoq
or LeanIX, populate it with the application portfolio, the capability
model, the PMO data, and bolt the architecture review board on top. I
brought Ardoq in because that's what had worked at Aviva.

It didn't fit. This piece is about why, and what I built instead.

## The Ardoq problem

Ardoq is a great product for the right team size. At Aviva I ran an
architecture function with enough people to absorb its operational tax —
model maintenance, taxonomy governance, role-based views, integration
into PMO data pipelines. At Sonnedix the architecture team was small.
The platform never reached the data-quality threshold where stakeholders
trusted it. We kept living in spreadsheets and Smartsheet alongside
Ardoq, which is the worst of both worlds: paying for the tool *and*
maintaining the workarounds.

The deeper issue was that even simple enterprise EA management platforms
have a steep operational tax — model maintenance, taxonomy governance,
role-based views, integration into PMO data pipelines. At Aviva I had a
team big enough to absorb it. At Sonnedix I didn't. After a year of
honest effort, I made the call to drop Ardoq and build the in-house
alternative myself.

## The decision: build vs. buy, scoped properly

The reframing that unlocked it: I didn't need 100% of what an Ardoq or
LeanIX provides. I needed the 30% that the architecture team at Sonnedix
actually uses every week. Specifically:

- An **application portfolio** (~120 apps, with criticality, data
  sensitivity, vendor, renewal lifecycle).
- A **capability model** anchored in business value streams (Meter-to-
  Cash, Customer Management, Procurement, etc).
- A **PMO substrate** linking initiatives to capabilities so investment
  decisions sit on architectural context, not just project plans.
- A **governance workflow** — what we call the Central Application and
  Vendor Approval System (CAVAS) — covering DPIA, technical risk
  assessment, vendor due-diligence (Dow Jones, Moody's), through to
  Architecture Governance Board sign-off.
- A **single query-able pane of glass** so the question "which apps in
  the Commercial domain are touching customer PII and have a renewal
  due before year-end" returns in five seconds, not five spreadsheets.

The 70% I deliberately skipped: meta-model versioning, custom
visualisations, multi-language taxonomy, OpenAPI exposure of every
artefact, the integrations marketplace. A 100-person EA team needs
those. A 5-person one doesn't.

## What I built — the Meridian stack

Meridian is a single TypeScript codebase running on Azure App Service.

| Layer | Technology | Why this choice |
|---|---|---|
| Frontend | Next.js 15 (App Router) | Server components, end-to-end TS, fast iteration |
| ORM | Prisma | Schema-first, deterministic migrations |
| DB | PostgreSQL on Azure (Flexible Server) | Boring, well-understood, full SQL when I need it |
| Auth | Microsoft Entra ID (OIDC) | Single sign-on with the rest of the Sonnedix estate, MFA inherited |
| AI | Vercel AI SDK + Google Gemini | Conversational assistant over portfolio context |
| Hosting | Docker on Azure App Service | Same deploy pipeline as our other internal apps |

The user-facing surfaces:

1. **Portfolio explorer** — every application with structured attributes,
   filters, and ad-hoc lists.
2. **Capability map** — value streams → capabilities → supporting apps,
   editable inline.
3. **PMO board** — initiatives linked to capabilities and apps, so the
   architecture review of a new programme is a click, not a meeting.
4. **CAVAS workflow** — multi-stage approval (request → DPIA →
   technical-risk assessment → vendor screen → AGB sign-off) with
   audit trail per stage.
5. **The conversational assistant** — the part that actually changed
   stakeholder behaviour.

## The AI bit, and why it's not a gimmick

The single biggest unlock isn't the data model. It's the conversational
assistant sitting on top of the data model.

Before Meridian, when a finance lead wanted to know which platforms had
EBITDA-impacting capability dependencies, that query was a Smartsheet
filter, then a spreadsheet pivot, then a question to me, then me
running the actual analysis. Now they ask Meridian:

> *"Which Commercial-domain apps support EBITDA reporting and have a
> contract renewal in the next six months?"*

The assistant has read access to the full architecture corpus — apps,
capabilities, value streams, PMO initiatives, CAVAS records — and
returns a structured answer with citations to the underlying records.
RAG with a tightly-scoped corpus, prompt-cached system context, and
guardrails that prevent it from inventing apps or capabilities that
don't exist.

This flips the operational tax. Instead of asking stakeholders to
maintain the architecture data, they're asking questions of it. People
who would never have opened Ardoq use Meridian weekly because the way
in is a chat, not a form.

## What it cost vs. what we eliminated

| Item | Annual cost |
|---|---|
| **Eliminated**: Ardoq enterprise licence | ~$100K |
| **Eliminated**: Smartsheet PMO subscription (replaced by integrated PMO board) | ~$15K |
| **Eliminated**: manual spreadsheet maintenance time (~0.5 FTE) | ~$60K |
| **Added**: Azure App Service + PostgreSQL hosting | ~$3K |
| **Added**: Gemini API calls (RAG + assistant queries) | ~$2K |
| **Net annualised saving** | **~$170K** |

That's after one engineer-year of build. The build was me, in evenings
and weekends — Ardoq was being paid for during that time anyway, so
there was no double-spend on the way. The team was running on Ardoq
+ spreadsheets while Meridian was being shaped.

## The bits I'd do differently

A few. Cleanly:

1. **I should have started with the assistant.** I built the data model
   first and bolted the assistant on at the end. The right order would
   have been: define the questions stakeholders actually want answered,
   work backwards to the minimum data shape that answers them, then
   build the UI. The product would have shipped faster and I'd have
   wasted less time on data attributes nobody queries.
2. **I underestimated the governance side.** CAVAS turned out to be the
   most-used surface — every new vendor or app comes through it — and I
   under-invested in its UX in the first cut. I rebuilt that part once.
3. **I should have written more architecture decision records (ADRs)
   *as code-level decisions*, not just enterprise-level decisions.**
   Mixing capital-A architecture with codebase architecture in one ADR
   stream made retrieval messy. Two streams now.

## Why this matters for AI-engineering practice

Meridian is not "AI-augmented" in the loose sense. It's AI-native by
intent: the data model assumes the assistant is the primary interface
for most users, so attribute design, taxonomy choices and governance
schemas are shaped by what the LLM needs to retrieve cleanly under
RAG, not just what fits in a relational schema. A few specific
practices that I'd carry into any equivalent build:

- **Tight, deterministic source-of-truth for retrieval.** No
  free-text fields where a structured one would do. Every fact the
  assistant might cite has a stable URL inside Meridian.
- **Prompt caching on the system prompt.** A non-trivial chunk of
  the corpus (capability glossary, value-stream definitions, app
  schema description) is identical across queries. Cache it.
- **Cost discipline as architecture, not an afterthought.** The
  assistant has hard wall-clock and token limits per query, with a
  daily budget that an admin can see.
- **Audit-grade transparency.** Every assistant response carries
  the IDs of the records it consulted. Click through, verify. No
  trust-by-default of anything LLM-generated.

If you're trying to ship AI-native enterprise systems in regulated or
financially material contexts, those four practices are non-optional.
They're how you go from a demo to something a CDO or auditor will
sign off on.

## Status

Meridian is live and is the single source of truth for Sonnedix EA.
Application count under structured governance: ~120 apps across 6
domains. Stakeholders include the CDO, the CIO, the Head of Finance
Systems, and the Architecture Governance Board itself.

If any of this is useful in your own context, my contact details are
in the footer.
