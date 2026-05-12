---
title: "Meridian: building the EA platform we couldn't buy"
slug: case-study-meridian
date: 2026-05-09
excerpt: "Why a small architecture team replaced commercial EA tooling with a system I designed and built myself, including the in-house approval workflow (CAVAS), and what the trade-offs were along the way."
source: own
---

## TL;DR

Three years ago I joined a fast-growing business to build the enterprise
architecture function from zero. Year one I ran the whole corpus in a
commercial work-tracking spreadsheet tool to learn what we actually
needed. Year two I brought in a major commercial enterprise-architecture
platform and tried for about a year to make it work, but the operational
overhead of a commercial EA tool needs a team the company does not have,
and even at full data quality these tools do not cover PMO, vendor due
diligence or workflow, which is where the architecture function actually
spends its time. Year three I dropped the commercial tool and built
Meridian myself, in evenings and weekends. It is a Next.js 15 plus
FastAPI plus PostgreSQL plus Microsoft Entra ID plus Gemini AI assistant
platform, with the Central Application and Vendor Approval System
(CAVAS, which I designed and named) folded in as the workflow surface.
Rolling out across the company in 2026, designed for the senior
leadership team and their direct lieutenants. Roughly $170K per year
saved at steady state. The biggest win is the conversational assistant
on top of the corpus, which flips the operational tax: instead of asking
stakeholders to maintain architecture data, they ask questions of it.

A short detour into an earlier role explains why I knew the
commercial-tool path worked there but not here.

## The full story

When I joined three years ago there was no enterprise architecture
function. No operating model, no Architecture Governance Board, no
application portfolio, no capability model. The company was scaling
fast, acquisition heavy, and the cultural pull was the usual one for a
growing business: short-term fixes per project, repeated solutions, no
shared language for what was being built or why. My brief was to build
the function from zero.

The textbook playbook says to put a commercial enterprise architecture
management product in early, populate it with the application portfolio
and the capability model, and bolt the architecture review board on
top. The market for these tools is well established and competitive,
and at a previous larger employer I had run an architecture governance
function with enough people to absorb the operational tax that comes
with one of these tools.

So I tried two things in sequence. In the first year I built the whole
architecture corpus in a commercial work-tracking spreadsheet tool (the
application portfolio, the capability model, the AGB tracker, the
simple workflow for vendor sign-off) because I wanted to understand
what we actually needed before spending money on a commercial product.
In the second year, with the shape of the work clearer, I brought in
a major commercial EA platform and migrated the spreadsheet content
into it.

Neither approach fit, and the rest of this piece is about why and what
I built instead.

## A brief detour about an earlier role, because the comparison matters

At a previous larger employer in regulated financial services, an
enterprise architecture platform was already in place when I arrived.
It was a perfectly good product, but my view was that we needed
something better integrated with our portfolio governance. I ran a
formal request for proposal across the major vendors, scored each on
capability fit, integration story and total cost of ownership over five
years, and selected a different commercial platform. It was the right
answer at the time. We had the team to maintain the meta-model, the
taxonomy governance, the role-based views and the integration into PMO
data. It paid back.

The learning I picked up in the current role, and had not needed to
confront before, is that an EA platform on its own can be the right
answer in one place and not enough in another. The previous employer
had the operational headcount to absorb a dedicated EA platform and
the bench to keep the threads to PMO, procurement and legal connected
by hand. The current company did not, and that gap turned out to
matter more than which platform we picked.

## Where an EA platform stops being enough

A note on the commercial EA platform before any of the rest. It is a
genuinely good product. The pre-sales engagement was thorough, the
post-sales team gave us real attention through onboarding and into
operation, and bringing it in at the start of year two was the right
call given what we knew at the time. None of what follows is a
criticism of the vendor. The story is about what an EA platform by
design does and does not cover, and what that means when the team
running it is small.

Every commercial EA tool has an operational floor. Schemas to
maintain, reference data to keep clean, user roles to provision,
integrations to keep up to date. The architecture team was small. We
spent the better part of a year working to bring the content up to the
quality threshold where stakeholders would trust it as a single
source. Some of the apps were in the EA platform, some were in
spreadsheets, some were still in the older work-tracking tool, and
the holding line was always "we are migrating", which is the worst of
both worlds: paying for the tool while still running the workarounds
it was meant to replace.

The other thing I had not appreciated about commercial EA tools when
the team is small is what they explicitly don't cover. They are
architecture inventories. They are not, and never claim to be, a place
where the rest of the business lives. PMO programme data lives in a
project portfolio tool, not in your EA platform. Vendor due diligence
(sanctions screening, counterparty KYC) lives in legal and procurement
systems, not in your EA platform. The application onboarding
governance flow (data privacy impact, technical risk, vendor screen,
architecture sign-off) is workflow, not architecture, and most EA
tools have the simplest possible imitation of a workflow engine, if
anything at all.

So even if the EA platform had been delivering perfect EA data, it
would still have been only one of three or four systems that the
architecture function had to look at to do its actual job, which is
helping the business make better decisions about what to build and
what to buy. At a 5,000-person company that is still operationally
fine. At a smaller company it is, frankly, ridiculous.

## The decision to build, and how I scoped it

After the second-year experience with the commercial tool I made the
call to drop it and build the in-house alternative myself. The
reframing that unlocked it: I did not need 100% of what the commercial
EA platform provides. I needed the 30% that the team actually uses
every week, plus the 30% that no commercial EA tool covers (the
workflow, the PMO substrate, the vendor due diligence, the audit
trail). The remaining 40% I could leave behind without anyone missing
it.

What I needed:

- An application portfolio with the structured attributes that matter
  to us (criticality, data sensitivity, vendor, contract renewal date,
  domain, owner). About 120 apps.
- A capability model anchored in our value streams (Meter to Cash,
  Customer Management, Procurement, and so on), editable inline,
  rather than maintained in a separate modelling tool.
- A PMO substrate so initiatives sit alongside the architecture rather
  than off in another system. This is the bit a commercial EA platform
  cannot do.
- A governance workflow, which I will describe properly below, called
  CAVAS (the Central Application and Vendor Approval System, which is
  what I named it).
- A single query-able pane of glass so the question "which Commercial
  domain apps touch customer PII and have a contract renewal due
  before year end" returns in five seconds instead of five spreadsheet
  filters.

What I deliberately skipped: meta-model versioning, custom diagram
notations, multi-language taxonomy, an OpenAPI surface for every
artefact, a partner-integration marketplace. A 100-person EA team
needs those. A small one does not.

## The stack

Meridian is a TypeScript codebase. Next.js 15 on the App Router for
the front end. PostgreSQL on Azure Flexible Server for the database,
Prisma for the ORM. Microsoft Entra ID for SSO, so it inherits the
rest of the estate's identity and MFA without me writing any of it.
Vercel AI SDK on top of Google Gemini for the conversational
assistant. Docker on Azure App Service for hosting.

There is also a FastAPI layer (Python) that I built deliberately,
because the next thing I want to do with Meridian is integrate it
with the rest of the systems landscape (the ERP, the CRM, the
procurement system, the document repository), and a clean REST
surface with auto-generated OpenAPI documentation makes that an
afternoon of work per integration rather than a week. The FastAPI
layer also handles the heavier server-side work that doesn't belong
in the Next.js process, and its security model (token-scoped access,
request rate limits, explicit per-route auth) is easier to reason
about for the things that need to be reasoned about clearly.

## CAVAS, which is now part of Meridian

CAVAS, the Central Application and Vendor Approval System, was
originally a standalone application. I built it first, as a separate
codebase, because the governance workflow was the most painful gap in
our day-to-day operation. New apps and new vendors were being
on-boarded in a sequence of disconnected steps: a spreadsheet here,
an email chain there, an Excel sheet for the DPIA, another
spreadsheet for the technical risk assessment, a Word document for
the vendor screening results, a meeting for the AGB sign off. The
audit trail was whatever people remembered to put in a folder.

CAVAS as a standalone product solved that. A request comes in, the
data privacy impact assessment runs against the right template, the
technical risk assessment against another, the vendor screen pulls
from the relevant sanctions and counterparty data sources, and the
Architecture Governance Board sees the whole package in one view
when it comes time to sign off. Every stage has explicit owners,
explicit timeouts, and explicit escalation.

After about three months of CAVAS running alongside Meridian, it
became obvious that the two should be one product. They were sharing
a data model anyway (you cannot do governance against an application
that does not exist yet in the portfolio, and you cannot run the
portfolio without an audit trail of how each app got there). The
migration was a deliberate exercise: move CAVAS into the Meridian
codebase, share the Prisma schema, share the Entra ID auth, share
the Gemini assistant so that questions like "which open CAVAS
requests are blocked on a vendor screen" can be answered in the same
pane as "show me all Commercial domain apps". I did the migration
over a series of weekends in early 2026 and it has paid for itself
already in maintenance time saved.

CAVAS now sits inside Meridian as a first-class surface. When this
goes fully live, the application and vendor onboarding flow will be
one continuous, auditable, searchable system instead of half a dozen
disconnected ones, and the AGB will see a complete request from
inside the same tool the architects already use.

## The audit story

Auditability was a deliberate design constraint from day one. I was
not going to ship a system that I could not explain to General
Counsel or the Chief Compliance Officer if they asked. So:

- Every edit to a portfolio record, capability, value stream or CAVAS
  request is captured with the user identity, the timestamp, the
  before and after values, and the reason text the user provided.
- Every login is logged, including the SSO claims that were validated
  at the gateway.
- Every assistant query is logged with the question, the records the
  assistant retrieved, and the response text, so a regulator can ask
  "what did this tool tell me on March 12" and we have the answer.
- Every CAVAS approval has an immutable record of who signed off,
  what they saw at the time of sign off, and what changed afterwards
  (the system shows you "the data has changed since this approval"
  when relevant).
- The database itself is point-in-time recoverable to a clean state
  at any moment in the last 30 days.

These are not exotic patterns, but they are easier to design in from
the start than to retrofit. None of the commercial EA tools we looked
at had the workflow audit trail at this granularity, because they are
not workflow products.

## The conversational assistant, and why it actually matters

The single biggest unlock of the AI side is not the data model. It is
the conversational assistant sitting on top of the data model.

Before Meridian, when a finance lead wanted to know which platforms
had EBITDA-impacting capability dependencies, the answer involved a
spreadsheet filter, a pivot, a question to me, and me running the
actual analysis. Meridian gives them a chat box. The assistant has
read access to the full architecture corpus (apps, capabilities,
value streams, PMO initiatives, CAVAS records) and returns a
structured answer with citations to the underlying records. There is
RAG with a tightly scoped corpus, prompt-cached system context, and
guardrails that prevent it from inventing apps or capabilities that
do not exist.

This will, I think, flip the operational tax that commercial EA tools
imposed. Stakeholders are not asked to maintain the architecture
data, they are asking questions of it. People who would never have
opened the previous EA tool will use Meridian regularly because the
way in is a chat rather than a form.

The list of stakeholders that Meridian is being designed for is, in
practice, the senior leadership team and their direct lieutenants:
the CDO, the CIO, the General Counsel and the legal operations team,
the Chief Compliance Officer, the heads of Finance Systems,
Commercial, Operations, Growth and Legal, and the technology and
process owners who report into each of those. Every one of those
people has a different question of the same underlying architecture
corpus. The assistant is the bit that lets a single dataset serve all
of them.

## What it costs and what it eliminates

Once Meridian is fully live (this is happening over the course of
2026), the picture, on a steady-state annualised basis, looks
roughly like this:

| Item | Annual |
|---|---|
| Eliminated, commercial EA platform licence | around $100K |
| Eliminated, work-tracking PMO subscription, replaced by integrated PMO board | around $15K |
| Eliminated, recovered time on manual spreadsheet maintenance, roughly half an FTE | around $60K |
| Added, Azure App Service plus PostgreSQL hosting | around $3K |
| Added, Gemini API calls for RAG and the assistant | around $2K |
| Net annualised | roughly $170K saved per year |

The build itself was me, in evenings and weekends. The commercial EA
platform was being paid for during that period regardless, so the
build did not introduce double-spend on the way through. The team was
running on the commercial tool plus spreadsheets while Meridian was
being shaped and is now switching over.

## What I would do differently

Two things.

The first is that I should have started with the assistant rather than
ending with it. I built the data model first and bolted the assistant
on at the end. The right order would have been to define the questions
stakeholders actually want answered, work backwards to the minimum
data shape that answers them, and only then build the user interface.
The product would have shipped sooner and I would have spent less
time on data attributes nobody queries.

The second is that I should have taken CAVAS into the Meridian
codebase from the start, rather than building it standalone and
migrating afterwards. The migration went smoothly enough, but in
retrospect the right call would have been to commit to the unified
codebase the moment it was clear the data models overlapped, which
was within a few weeks. I lost two or three weekends I did not need
to lose to the migration.

## Why this matters beyond one company

Meridian is not "AI-augmented" in the loose sense, where someone has
added a copilot to an existing product. It is AI-native by intent.
The data model assumes the assistant is the primary interface for
most users, so attribute design, taxonomy choices and governance
schemas are shaped by what the language model needs to retrieve
cleanly under RAG, not just by what fits in a relational schema.

A few specific practices I would carry into any equivalent build,
not just an EA platform:

- Tight, deterministic source of truth for retrieval. No free-text
  fields where a structured one would do. Every fact the assistant
  might cite has a stable URL inside Meridian.
- Prompt caching on the system prompt. A non-trivial chunk of the
  corpus, including the capability glossary, the value stream
  definitions and the application schema description, is identical
  across queries. Cache it.
- Cost discipline as architecture, rather than an afterthought. The
  assistant has hard wall-clock and token limits per query, with a
  daily budget that an admin can see.
- Audit-grade transparency. Every assistant response carries the IDs
  of the records it consulted. Click through and verify. No
  trust-by-default of anything the model has generated.

If you are trying to ship AI-native enterprise systems in regulated
or financially material contexts, those four practices are not
optional. They are how you get from a demo to something a CDO or an
auditor will sign off on.

## Status

Meridian is rolling out across the company in 2026. CAVAS, which I
built first as a separate product and then folded into Meridian, is
the most-active surface during the rollout. The application portfolio
is around 120 apps across six domains, all with structured attributes,
all governed through the AGB in the same tool. The list of designed
stakeholders is the senior leadership team and their direct
lieutenants.

If any of this is useful in your own context, my contact details are
in the footer.
