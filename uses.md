---
layout: layouts/page.njk
permalink: /uses/
title: "Uses"
pageEyebrow: "Tools"
pageTitle: "What I use"
pageLede: "The hardware, software, and services I rely on to do the work I do. Updated as things change."
description: "Tarun Bulchandani's tools, hardware, and software stack — the practical setup behind the architecture work and the writing."
---

*Last updated: May 2026. In the [`/uses/`](https://uses.tech/)
tradition of personal-site references for the tools people actually
rely on.*

## Hardware

- **Apple MacBook Pro 14-inch** (M-series) as the main work machine.
  Day to day this is where the writing, the architecture work, the
  development on Meridian and Springboard, and the everyday browser
  work all happen.
- **External 27-inch display** for the second monitor at home.
- **Logitech MX Master mouse**, MX Mechanical keyboard.
- **iPhone** for the obvious things, and as the secondary device
  for testing mobile layouts of the various sites.

## Editor and shell

- **Cursor** as the primary editor. Set up against an internal LLM
  endpoint for the regulated work; default Claude / GPT for the
  personal work.
- **Claude Code** in the terminal for substantial refactoring or
  cross-file work. The two tools complement each other; Cursor for
  the inline assist, Claude Code for the multi-step changes.
- **zsh** with **Oh My Zsh** for the shell. Nothing exotic.
- **iTerm2** for the terminal.

## Languages and frameworks

The stacks I actually use day to day vary by project. The current
mix:

- **TypeScript** and **Next.js** — Meridian, Springboard, the personal site.
- **Python** (FastAPI, Flask, SQLAlchemy, Pydantic) — Meridian's
  integration layer, CANVAS, anything that touches the heavier
  server-side processing.
- **Vue 3** (Nuxt 3) — CANVAS's frontend.
- **PostgreSQL** as the default relational database for everything
  serious. SQLite for prototypes and tiny tools.
- **Markdown + git** for almost all writing.

## Cloud and infrastructure

- **Azure** for the regulated work. Specifically App Service, PostgreSQL
  Flexible Server, Blob Storage, Entra ID for SSO, Key Vault for
  secrets, Application Insights for telemetry. Azure OpenAI for any
  AI workloads that need EEA residency.
- **Cloudflare** for the personal sites (Workers with assets, Pages
  Functions where useful, R2 occasionally, Web Analytics for visit
  tracking).
- **GitHub** for source control on everything personal and
  organisation-controlled.
- **GitHub Actions** for the personal-site CI/CD and for the cron
  workers on Springboard.

## AI and LLM tooling

- **Anthropic Claude** as the daily-driver LLM. Both directly via
  claude.ai and through Claude Code.
- **OpenAI** for occasional comparison and for the production AI
  workloads on Azure OpenAI.
- **Google Gemini** specifically for the Meridian conversational
  assistant — the long-context window and the EEA region availability
  through Vertex AI both made it the right choice for that specific
  use case.
- **Mistral** keeping on the radar for regulated workloads.

## Productivity

- **Notion** for personal notes, drafts, project plans.
- **Linear** for any work that needs proper tracking.
- **Things 3** for tasks and reminders.
- **Cron** as a calendar client.
- **Spark** for email.

## Architecture-specific tools

These come up enough to be worth listing.

- **Excalidraw** for whiteboard-style architecture diagrams. The
  hand-drawn aesthetic survives screenshots much better than the
  cleaner vector tools.
- **Mermaid** for diagrams that need to live in source control
  alongside ADRs and documentation.
- **dbdiagram.io** for ERD work.
- **C4 model** at the conceptual level — Container and Component
  diagrams when they help, skipped when they don't.

## Personal site stack

- **11ty (Eleventy)** as the static site generator. Markdown source,
  Nunjucks templates.
- **Cloudflare Workers** with static assets for hosting. Pages
  Functions pattern for the OAuth flow that secures the Decap CMS
  editor at /studio/.
- **Decap CMS** for the in-browser editor, with a separate GitHub
  account (`tarun-blog-bot`) holding the OAuth identity for the CMS.

## Notebooks and writing

- **Field Notes** notebooks for the genuinely paper-bound thinking.
- **Obsidian** when I want a graph view over my notes; the markdown
  files live in iCloud.

## What I don't use

- No social-media management tools. The accounts are deliberately
  minimal.
- No project management software beyond Linear for the work that
  needs it. Most of the architecture work lives in markdown and
  diagrams.
- No paid writing tools. The blog flow is markdown → 11ty → git push.
