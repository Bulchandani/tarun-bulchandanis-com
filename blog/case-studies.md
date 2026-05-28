---
layout: layouts/page.njk
permalink: /blog/case-studies/
title: "Case studies"
pageEyebrow: "Topic"
pageTitle: "Case studies"
pageLede: "Deep technical case studies on systems I have designed, built, or led end-to-end. The architectural decisions, the trade-offs, the failure modes, and the lessons I would carry forward."
description: "In-depth case studies by Tarun Bulchandani — Meridian (AI-native EA platform), CANVAS (approval workflow), Springboard (AI job-search platform), large-scale ERP transformation."
---

The case-study cluster. These are the longest and most technical
pieces — they sit at four to seven thousand words each and are
written for an architect or senior engineering audience that
wants to understand the actual decisions, not just the headline
outcome.

## Platforms I have built end-to-end

### [Meridian: building the EA platform we couldn't buy](/blog/case-study-meridian/)

A case study in replacing a stack of licensed enterprise SaaS with
one custom-built, AI-native platform. Next.js 15 + FastAPI +
PostgreSQL on Azure + Microsoft Entra ID + Google Gemini.
Architected, designed and personally built end-to-end. Approximately
$170K/year saved at steady state. Includes the
[CANVAS](/blog/case-study-canvas/) approval workflow as a first-class
surface.

### [CANVAS: building the approval workflow no commercial product covers](/blog/case-study-canvas/)

The companion to Meridian. A Nuxt 3 + Flask + PostgreSQL + Microsoft
Entra ID + Azure OpenAI workflow engine that takes a new application
or vendor from intake through to contract signing as one continuous,
auditable system. Modular monolith, built by one full-stack developer
to a six-month MVP target. Append-only audit log, single-use SLT
email tokens, AI-generated architecture memos.

### [Springboard: AI-native job-search platform](/blog/case-study-springboard/)

A solo-built Next.js + Drizzle + Supabase platform with a fleet of
GitHub Actions cron workers. Monitors approximately 1,400 companies,
evaluates roles against a six-block rubric, generates tailored CVs
and interview prep, auto-fills applications across four
interchangeable plans. Approximately fifteen thousand lines, one
engineer, around four dollars a month in total LLM and infrastructure
cost.

## Programmes architected

### [Lessons from large-scale ERP transformation](/blog/large-scale-erp-transformation-lessons/)

Drawn from leading the architecture for a CHF 350M+ multi-region
SAP S/4HANA transformation programme. Five lessons that don't
appear in the vendor narrative or the typical analyst commentary.

## Shorter pieces from the field

These are not full case studies, but read alongside the longer
pieces they give additional texture on what working on these
systems was actually like.

### [You can build it with AI. You can fix it with AI too. Here is the proof.](/blog/linkedin-you-can-build-it-with-ai-you-can-fix-it-with-ai-too-here-is-/)

The 23-bugs story from an early Springboard iteration — what
happens after you ship with AI assistance and the real bugs start
arriving.

### [OpenClaw: too good to ignore, too risky to install — that's what changed](/blog/linkedin-openclaw-was-too-good-to-ignore-and-too-risky-to-install-tha/)

A specific tooling decision and the architectural reasoning around
it.

## Related

The architecture practice cluster
([/blog/architecture-practice/](/blog/architecture-practice/)) and
the AI and governance cluster
([/blog/ai-and-governance/](/blog/ai-and-governance/)) provide the
conceptual framing for many of the decisions made in these case
studies. The full chronological index is at [/blog/](/blog/).
