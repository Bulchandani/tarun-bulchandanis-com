---
title: "CANVAS: building the approval workflow no commercial product covers"
slug: case-study-canvas
date: 2026-05-12
excerpt: "How I designed and built the Central Application and Vendor Approval System — a workflow engine, questionnaire layer and AI memo generator that replaced a chain of emails, spreadsheets and meetings. The bit of the architecture function that an EA platform was never going to solve."
source: own
---

## TL;DR

The architecture function spends most of its time not on architecture
inventories, but on the workflow that wraps them — onboarding new
applications and new vendors through privacy review, technical risk
assessment, sanctions screening, serviceability and architecture
sign-off. None of the commercial enterprise architecture tools we
looked at do that bit. So I built it. CANVAS is the Central Application
and Vendor Approval System I designed and named, originally as a
standalone product before folding it into Meridian. It is a Nuxt 3
plus Flask plus PostgreSQL plus Microsoft Entra ID plus Azure OpenAI
application that takes a request from initial intake through to
contract signing as a single auditable workflow. A modular monolith,
built by one full-stack developer to a 6-month MVP target. Twelve
notification trigger events. Five questionnaires with conditional
branching, autosave and per-version response storage. An append-only
audit log. SLT approval via a single-use email token so executives
don't have to log in. AI-generated architecture memos with the prompt
and raw response stored for every call.

This post is a follow-up to [Meridian](/blog/case-study-meridian/),
which covered the EA platform side. This one is about the workflow side.

## The problem

Before CANVAS the application and vendor onboarding process at the
company was a chain of disconnected systems, each one operating on a
slightly different data model, none of them sharing an audit trail.

A typical Buy decision for a new SaaS tool looked like this. The
business owner sent an email to IT describing what they wanted. An
architect picked it up and started a spreadsheet to track their own
notes. The Data Protection Impact Assessment was a Word document
emailed back and forth between the architect, the requester and the
data protection lead. The Technical Risk Assessment was a second Word
document, typically a slightly different version per architect because
nobody had agreed on a master. The vendor screening (sanctions, KYC,
counterparty due diligence) lived in legal's procurement workflow,
which architecture only ever saw the conclusion of, not the working.
The Architecture Governance Board reviewed the package in a fortnightly
meeting, looking at a deck the architect had pulled together by hand
the night before. The minute was a paragraph in a meeting notes
document. The "audit trail" was whatever people remembered to drop
into a SharePoint folder.

This is normal for an architecture function in a fast-growing company.
It is also unsustainable. The specific problems I wanted CANVAS to
solve:

- **No single record per request.** The same vendor proposal lived in
  six different places, each with its own copy of the data, none of
  them authoritative. Whatever any one person was looking at was
  probably stale.
- **No enforced gating.** Reviews could be skipped, accidentally or
  on purpose. The DPIA could go missing. The technical risk assessment
  could be approved before the cybersecurity questionnaire was even
  started. The AGB could sign off without knowing the vendor screen
  was still pending.
- **No status visibility.** "Where are we on the GreenSpark request?"
  was a question that took a thread of three emails to answer.
- **No SLA tracking.** Reviews drifted for weeks. Nobody knew which
  reviewer was the bottleneck. Nobody got reminded.
- **No audit-grade trail.** If General Counsel or the Chief
  Compliance Officer asked "show me the full record of how this app
  got approved", the answer was a frantic afternoon of email
  forwarding and folder hunting.
- **Memo generation was hours of architect time per request.** Pulling
  the structured data, the questionnaire outcomes, the financial
  case and the recommended decision into a clean memo took two to
  four hours every time. Most architects did it in the gap between
  other meetings.

Every commercial EA platform we evaluated did the inventory side
beautifully and the workflow side basically not at all. The gap was
the workflow.

## The scope I chose, and what I deliberately left out

The full architecture lifecycle for a new application is roughly
nineteen steps from initial idea to post-go-live operational handover.
Trying to build all of that as an MVP would have killed the project
before it shipped.

So I scoped CANVAS down to Steps 1–10: intake, architect review,
Build/Buy/Extend decision, market research, RFI/RFP (when needed),
vendor evaluation, legal and compliance review, the three parallel
reviews (DPIA, Serviceability, Cybersecurity), AGB approval, SLT
approval (conditional), contract negotiation, contract signing. End
of MVP. Post-contract steps — CMDB onboarding, monitoring setup, full
operational handover — are a Phase 2 ambition, not an MVP requirement.

Two distinct tracks were modelled from the start:

| Track | Application type | Path |
|---|---|---|
| **End-User** | A piece of installable software for individual desktops (think Photoshop, Tableau Desktop). | Skips the full review cycle. Only the cybersecurity questionnaire is required. On approval, a structured email goes to the IT operations mailbox. |
| **Enterprise** | A new SaaS platform, a piece of infrastructure, a cybersecurity tool. | Full Steps 1–10. Build/Buy/Extend fork at Step 2, RFI/RFP skip if the vendor is already known, parallel reviews at Step 7. |

The two tracks share the same data model and the same workflow engine.
The only difference is which `WorkflowStage` records get created when
the request is submitted.

## Why a modular monolith, not microservices

This decision took an hour and saved me probably a month.

The team was me. One full-stack developer, evenings and weekends,
6-month target. Microservices would have meant a service mesh, four
or five separately deployed containers, distributed tracing, a service
discovery layer, careful management of which service held which slice
of the data model, eventual-consistency considerations on the joins.
All of that is fine if you have a platform team. Without one it would
have eaten the project.

So CANVAS is a modular monolith. A single Flask backend, a single
Nuxt 3 frontend, two Azure App Service instances. The Flask app is
internally organised into Blueprints:

```
/app
  /blueprints
    /requests        ← intake, request CRUD
    /workflow        ← state machine, stage transitions
    /questionnaires  ← templates and responses
    /notifications   ← email + Teams dispatch
    /memos           ← AI memo generation
    /auth            ← Entra ID OIDC, sessions
    /admin           ← user management, SLA config
  /models            ← SQLAlchemy ORM models
  /schemas           ← Pydantic validation
  /services          ← business logic (state machine, notifications)
  /jobs              ← Celery task definitions
```

The Blueprint boundaries mean that if at some point the questionnaire
engine or the notification dispatcher needs to be pulled out into a
separate service, the extraction is a clean cut along an already
defined module boundary. Until then everything is one deployable, one
test suite, one observability story.

## The tech stack

A short summary. Everything here is a deliberate match either to the
problem or to the engineering organisation's existing standards.

| Layer | Choice | Why |
|---|---|---|
| Frontend | Nuxt 3 (Vue 3) + TypeScript + Tailwind + Nuxt UI | The engineering org's Vue standard. Nuxt 3 is the Vue equivalent of Next.js: SSR, file-based routing, server-side rendering. Nuxt UI gives accessible components out of the box. |
| Backend | Flask (Python) with Blueprints | The engineering org's Python standard. Flask is intentionally minimal — pair it with SQLAlchemy, Pydantic, Celery and you have a complete API server in a few hundred lines of plumbing. |
| ORM | SQLAlchemy + Alembic | Mature, version-controlled migrations, first-class PostgreSQL support. |
| Validation | Pydantic v2 | Used at the route boundary for input validation and at the response boundary for serialisation. Pairs naturally with the auto-generated OpenAPI spec. |
| Auth | Authlib (Azure AD OIDC) | All users already have M365 accounts. SSO inherits MFA without me writing any of it. |
| Background jobs | Celery + Redis | Reminders, escalations, notification retries, the weekly digest. Same Redis instance as the session cache. |
| Notifications | msgraph-sdk-python | The Microsoft Graph API for email and Teams. Service-account authentication via Client Credentials flow. |
| AI | Azure OpenAI (`gpt-4o`, EEA region) via the `openai` SDK | Data stays within Azure. No separate DPA needed. Region is consistent with the company's data residency policy. |
| File storage | Azure Blob via `azure-storage-blob` | Pre-signed upload URLs, direct browser-to-Blob, time-limited downloads. |
| Database | PostgreSQL 15 (Azure Flexible Server) | Managed, point-in-time recoverable, JSONB for questionnaire schemas and responses. |
| PDF generation | WeasyPrint | HTML-to-PDF entirely in Python. No headless browser, no extra runtime, clean to containerise. |
| Hosting | Azure App Service (Linux), two instances | One Node.js runtime for Nuxt, one Python/Gunicorn for Flask. Staging slots for zero-downtime swaps. |

The split between two App Service instances means the two repositories
can deploy independently. The OpenAPI spec generated by Flask is
consumed by Nuxt to generate a typed API client, so both sides stay
in sync without manual coordination.

## The workflow engine

I considered using a workflow DSL — Temporal, AWS Step Functions, an
embedded BPMN engine — and rejected all of them. The workflows are
not that complex (a directed graph with a handful of forks), the
deployment overhead of a workflow engine for a single-developer project
is high, and most importantly the workflow itself was still being
shaped as the product was being built. A DSL would have meant freezing
the workflow into a separate language and re-learning it every time
something changed.

So the workflow engine is an explicit state machine in pure Python,
in one file: `/app/services/workflow/state_machine.py`. It defines:

1. **States** — the set of valid statuses (`DRAFT`, `SUBMITTED`,
   `ARCHITECT_REVIEW`, `MARKET_RESEARCH`, `RFI_RFP`,
   `VENDOR_EVALUATION`, `LEGAL_COMPLIANCE_REVIEW`,
   `PARALLEL_REVIEWS_IN_PROGRESS`, `APPROVAL_PENDING`,
   `SLT_APPROVAL_PENDING`, `CONTRACT_NEGOTIATION`, `CONTRACT_SIGNED`,
   `REJECTED`, `WITHDRAWN`).
2. **Transitions** — which actions are valid from each state and
   what the resulting state is.
3. **Guards** — conditions that must hold for a transition to fire.
   The interesting one is `parallel_reviews_complete`, which checks
   that all applicable Step 7 stages have reached a terminal status
   before allowing the transition to `APPROVAL_PENDING`:
   ```python
   def parallel_reviews_complete(request_id):
       stages = get_parallel_stages(request_id)  # 7a, 7b, 7c
       applicable = [s for s in stages if s.is_applicable]
       return all(s.status in ('COMPLETED', 'SKIPPED') for s in applicable)
   ```
4. **Side effects** — actions triggered on a successful transition.
   Notifications. Stage creation. Flag setting.

The state machine is just functions. They are pure (no I/O, no
side-effects baked in), which makes them trivially testable. The whole
file is under 600 lines and can be read in a sitting by a new
developer.

The Enterprise track's state machine, illustrated:

```
SUBMITTED → ARCHITECT_REVIEW (Step 2: Build/Buy/Extend)
   │
   ├── BUILD → notify Legal, Cybersec, Service Mgmt → APPROVAL_PENDING
   │
   └── BUY or EXTEND → MARKET_RESEARCH (Step 3)
        │
        ├── known_vendor=true → VENDOR_EVALUATION (Step 5)
        └── known_vendor=false → RFI_RFP (Step 4) → VENDOR_EVALUATION

   VENDOR_EVALUATION → LEGAL_COMPLIANCE_REVIEW (Step 6)
        │
        ▼
   PARALLEL_REVIEWS (Step 7a DPIA, 7b Serviceability, 7c Cybersecurity)
        │
        ▼ [guard: all applicable stages terminal]
   APPROVAL_PENDING (Step 8)
        │
        ├── slt_approval_required → SLT_APPROVAL_PENDING → ...
        └── no SLT → CONTRACT_NEGOTIATION (Step 9) → CONTRACT_SIGNED (Step 10)
```

Build path is interesting. When the architect records `BUILD` at
Step 2, the system creates `WorkflowStage` records for the skipped
steps with `status = NOTIFICATION_ONLY` and `is_applicable = false`,
fires notification emails to the teams that would have been involved,
and jumps straight to Step 8. The stages exist in the audit log
(so the trail shows the path the request took), but the workflow
doesn't gate on them.

## The questionnaire engine

There are four questionnaires in scope for MVP: Cybersecurity (14
sections), DPIA (6 sections), TRA (decision-tree with conditional
branching), and Serviceability (a lightweight pre-contract checklist).
The questionnaires are not the architecture function's choice — they
are mandated by legal, compliance and cybersecurity. They will change.

So I built the questionnaire engine to be content-driven. Each
template is a JSON schema in the `questionnaire_templates` table.
Responses are JSONB in `questionnaire_responses`. The frontend has
one rendering component that walks any schema and renders any
template. Adding a new questionnaire is a row insert, not a code
change. Updating an existing one is a version bump (responses link
to the version active at submission, so old responses never break).

The schema supports:

| Question type | Use |
|---|---|
| `YES_NO_COMMENT` | Yes/No/Partial/Unknown with an optional comment that becomes required on No/Partial. The default type for the cybersecurity questionnaire. |
| `TEXT` / `TEXTAREA` | Free-text fields with `maxLength` enforcement. |
| `SELECT` / `MULTISELECT` | Single or multi-choice from a defined options list. |
| `DATE` / `BOOLEAN` | Standard form primitives. |
| `CONDITIONAL_BLOCK` | A sub-section that shows or hides based on a parent answer. Used for the Legitimate Interests Assessment annex in the DPIA (only shown when LI is selected as the lawful basis) and for the branching in the TRA. |

Autosave fires every 30 seconds and on each field blur — every patch
merges into the existing JSONB rather than replacing it, so a partial
fill on a slow connection is robust. Progress is calculated client-side
from the schema, so the user always sees a completion percentage
without a server round-trip.

The TRA questionnaire is the most interesting. It is triggered
automatically only when `data_outside_eea = true` is set on the
original intake form. The TRA has eight reference tables that don't
need to be filled in — they're instructional content. The schema
supports that via a content-only block alongside the interactive ones.

## The audit trail

Auditability was a constraint from day one. The architecture function
sits in front of regulators, internal audit, the Chief Compliance
Officer, and General Counsel. If any of them ask "show me how this
application got approved", the answer needs to be a single page that
shows the entire history of the request.

The `audit_log` table is append-only. No record is ever updated or
deleted. Every row captures:

- The actor (`actor_id` for a user; `actor_type = SYSTEM` for
  automated transitions)
- The action (e.g. `REQUEST_SUBMITTED`, `STAGE_ADVANCED`,
  `QUESTIONNAIRE_SUBMITTED`, `MEMO_FINALISED`, `SLT_TOKEN_USED`)
- The entity affected (entity type + entity ID)
- Before and after state, captured as JSONB
- IP address and user agent
- Timestamp

The database user has only `SELECT`, `INSERT`, `UPDATE` privileges on
the main tables — no `DROP`, `TRUNCATE` or `ALTER`. The audit_log
table specifically has `INSERT`-only privileges from the application.
This is a defence in depth against an accidental or hostile
modification.

The full audit log for a request is available at
`GET /api/v1/requests/:id/audit` — visible to architects and admin.
The request-level timeline (a friendlier view) is at
`GET /api/v1/requests/:id/timeline` and is visible to the requester
too, so they can see exactly where their request is and what happened
before they look it up.

## SLT approval via single-use email token

Senior leadership team members are time-poor. Asking them to log in to
a new internal application to approve or reject a vendor request is a
recipe for missed SLAs. So the SLT approval flow uses a single-use
email token instead.

When a request reaches `SLT_APPROVAL_PENDING`:

1. A 128-bit UUID is generated, hashed (SHA-256) and stored in the
   `slt_approval_tokens` table with a 30-day expiry and a foreign key
   to the request.
2. An email goes to the designated SLT member containing two links:
   `/api/v1/slt/approve/:token` and `/api/v1/slt/reject/:token`.
3. The SLT member clicks the link. The handler:
   - Verifies the token hasn't expired and hasn't been used.
   - Verifies the rate limit (max 3 attempts per token per hour).
   - Renders a minimal confirmation page summarising the request
     (no login required).
4. The SLT member confirms the decision. The token is invalidated
   immediately on use, the decision is recorded with `actor_id` set
   to the SLT user and `actor_type = USER`, and the workflow advances.

There is also a fallback: SLT members can log into CANVAS directly
and approve through the normal interface. The token flow is the
default because in practice nobody logs in.

The 30-day expiry was deliberate. SLT members do not always check
email daily. A 7-day window would have meant tokens expiring before
they were used. The token is single-use, hashed at rest, and
rate-limited, so the longer expiry doesn't widen the attack surface
meaningfully.

## The AI memo generator

Memo generation is the single highest-value piece of automation in
CANVAS, by a margin. The architecture memo is the document the AGB
reads at sign-off. Before CANVAS it was hours of architect time per
request to assemble. Now it is a single click.

From Step 5 onwards the architect can trigger memo generation from
the request detail page. The system collects:

- Structured intake form data (application name, vendor, business
  problem, ideal solution, user count, locations, timeline, financial
  benefits)
- The Build/Buy/Extend decision
- The status and outcome of every completed workflow stage
- The cybersecurity, DPIA and serviceability outcomes
- The list of attached document names
- The names of the assigned architect, reviewers and SLT approver

It constructs a prompt with:

- A system prompt that establishes the tone (professional, concise,
  factual, active voice, no jargon), the rule against inventing
  information (use `[TO BE CONFIRMED]` for missing fields), and the
  exact memo structure (Header, Executive Summary 100–150 words,
  Problem / Solution / Rationale, Implementation & Impact,
  Architectural Risks & Mitigations, Decision & Next Steps).
- A user message with all the structured data fields labelled.

It calls Azure OpenAI (`gpt-4o`, EEA region) synchronously with a
20-second timeout. Latency is 3–8 seconds, input around 600–900
tokens, output around 600–900 tokens. The raw response is stored in
`memos.llm_raw_response` for audit. The formatted Markdown is stored
in `memos.content`. The architect sees a split-pane editor: editable
Markdown on the left, rendered preview on the right.

When the architect finalises the memo, the system locks it (no
further edits without creating a new version), renders the Markdown
to HTML, runs it through WeasyPrint to produce a PDF, and stores the
PDF in Azure Blob with a reference in the `documents` table.

Three things are deliberate about this design:

1. **The model is given the data, not a draft of the memo.** The
   structured data goes in, the memo comes out. The architect's
   value-add is reviewing the output for accuracy, not assembling
   the data.
2. **The prompt and the raw response are persisted for every call.**
   If a regulator ever asks "what did the model see and what did it
   say?", the answer is in the database. The same audit principle as
   the rest of CANVAS, applied to the generative bit.
3. **There is a fallback to a hand-written template if the LLM call
   fails.** No request is blocked because the AI is slow or down.

Cost at the expected volume (around 200 requests a year) is
negligible — a few dollars a year. The unlock is hours of architect
time per request, multiplied across the portfolio.

## Notifications

All notifications go through Celery → Microsoft Graph API. The
workflow engine never blocks on a notification — events enqueue tasks,
workers send them, failures retry with exponential backoff (1 min →
5 min → 15 min), final failures land in a dead-letter queue and
alert the admin via fallback SMTP.

Twelve trigger events are wired up. The most common are
`REQUEST_SUBMITTED` (to all architects), `REVIEW_ASSIGNED` (to the
named reviewer), `STAGE_OVERDUE_REMINDER` (3 days after the SLA),
`STAGE_OVERDUE_ESCALATION` (7 days after the SLA, also to the
architect), and `SLT_APPROVAL_REQUIRED` (with the email token).

Reminders and escalations are scheduled at stage creation using
Celery's `apply_async(eta=...)` and revoked immediately when the
stage reaches a terminal status, so the queue doesn't fill up with
stale tasks. SLAs are hardcoded for MVP (3 days for the Build/Buy
decision, 7 days for DPIA, 5 for Serviceability, 10 for Cybersecurity,
5 for SLT) and will move to a configurable admin panel in Phase 4.

Teams notifications use both channel posts (for general updates like
"new request submitted") and direct messages (for personal
assignments). The split keeps the channel useful without flooding
people with assignment noise. The IT operations team set up the
dedicated Teams channel before notification work began.

## What I would do differently

Three things.

The first is that I built the data model before the workflow engine.
The right order would have been the workflow first. The workflow is
the thing that makes CANVAS feel like a product rather than a database
with a UI on top. Once I sat down to wire the workflow engine I found
several places where the data model needed an extra field to express
the transition cleanly — a couple of small migrations that wouldn't
have been needed if I'd built the engine first.

The second is the questionnaire engine. The JSON schema approach is
genuinely good and I would do it again, but I should have stress-tested
it earlier against the actual cybersecurity questionnaire. The
cybersecurity team have a 14-section template with very specific
conditional logic, and there were two cases where I had to extend the
schema (a new question type and a new validation rule) once we tried
to load their real template. Both extensions were small but they
broke the rhythm of the build. A two-hour conversation with the
cybersecurity reviewer in Week 1, walking through their template
section by section, would have caught both.

The third is around the AI memo. I built it as a single synchronous
LLM call. It works fine at the current volume, but a more interesting
design would have been to model the memo as a structured plan first —
have the model produce a plan ("here are the sections, here are the
key points in each, here's what data feeds each"), and then expand
the plan into prose in a second pass. Two-pass would give the
architect more leverage to course-correct early without re-running
the whole generation. I'll do that in the next iteration.

## Where CANVAS ended up

CANVAS shipped as a standalone product in early 2026. It ran alongside
Meridian for about three months. They were sharing a data model
anyway — you cannot do governance against an application that doesn't
exist yet in the portfolio, and you cannot run the portfolio without
an audit trail of how each app got there. The split between them was
operational fiction.

In April I moved CANVAS into the Meridian codebase. Shared Prisma
schema, shared Entra ID auth, shared Gemini assistant so that
questions like "which open CAVAS requests are blocked on a vendor
screen" can be answered in the same pane as "show me all Commercial
domain apps". The cost of running it as a separate product had been
operationally invisible at first and gradually became obvious.

That migration is described in more detail in
[the Meridian case study](/blog/case-study-meridian/). The short
version: it was the right call, and the right time to make it was
three months earlier than I made it.

CANVAS now sits inside Meridian as a first-class surface. The
application and vendor onboarding flow is one continuous, auditable,
searchable system. The AGB sees a complete request from inside the
same tool the architects already use. The architects can ask the
conversational assistant questions about CAVAS requests in the same
chat as questions about the portfolio. Twelve months ago this was
six disconnected systems with a SharePoint folder at the end.

If you are running an architecture function in a fast-growing company
and you are looking at a commercial EA tool as the answer to the
workflow problem — it isn't. The workflow problem and the inventory
problem are two different problems and they need two different
products. Or one product that does both. I built one that does both.

If any of this is useful in your own context, my contact details are
in the footer.
