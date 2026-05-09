---
title: "Meridian: building the EA platform we couldn't buy"
slug: case-study-meridian
date: 2026-05-09
excerpt: "Why a small architecture team at Sonnedix is replacing commercial EA tooling with a system I designed and built myself, including the Central Application and Vendor Approval System (CAVAS), and what the trade-offs were along the way."
source: own
---

When I joined Sonnedix three years ago there was no enterprise architecture
function. No operating model, no Architecture Governance Board, no
application portfolio, no capability model. Sonnedix was scaling fast,
acquisition heavy, and the cultural pull was the usual one for a growing
business: short-term fixes per project, repeated solutions, no shared
language for what was being built or why. My brief was to build the
function from zero.

The textbook playbook says to put a commercial enterprise architecture
management product in early, populate it with the application portfolio
and the capability model, and bolt the architecture review board on top.
The market for these is well established
([Planview Enterprise One](https://www.planview.com/products/enterprise-one/),
[LeanIX](https://www.leanix.net/),
[Ardoq](https://www.ardoq.com/),
[Avolution ABACUS](https://www.avolutionsoftware.com/),
[Bizzdesign](https://bizzdesign.com/),
[MEGA HOPEX](https://www.mega.com/en/product/hopex),
[Software AG Alfabet](https://www.softwareag.com/en_corporate/platform/alfabet.html)),
and at Aviva I had run an architecture governance function with enough
people to absorb the operational tax that comes with one of these tools.

So at Sonnedix I tried two things in sequence. In the first year I built
the whole architecture corpus in Smartsheet (the application portfolio,
the capability model, the AGB tracker, the simple workflow for vendor
sign-off) because I wanted to understand what we actually needed before
spending money on a commercial product. In the second year, with the
shape of the work clearer, I brought in
[Ardoq](https://www.ardoq.com/) and migrated the Smartsheet content
into it.

Neither approach fit, and the rest of this piece is about why and what
I built instead.

## A brief detour about Aviva, because the comparison matters

At Aviva, [Avolution ABACUS](https://www.avolutionsoftware.com/) was
already in place when I arrived. It is a perfectly good product, but my
view was that we needed something better integrated with our portfolio
governance. I ran a formal request for proposal across the major
vendors, scored each on capability fit, integration story and total cost
of ownership over five years, and selected
[Planview Enterprise One](https://www.planview.com/products/enterprise-one/).
It was the right answer for Aviva at the time. We had the team to
maintain the meta-model, the taxonomy governance, the role-based views
and the integration into PMO data. It paid back.

The learning I should have absorbed earlier than I did is that the same
product is not necessarily the right answer somewhere else. Aviva had
the operational headcount. Sonnedix did not.

## The Ardoq problem at Sonnedix

Even the simplest enterprise EA management tool has a steep operational
overhead. Schemas to maintain, reference data to keep clean, user roles
to provision, integrations to keep up. At Sonnedix the architecture team
was small. We tried for the better part of a year to bring Ardoq up to a
quality threshold where stakeholders would trust the data, and we never
got there. Some of the apps were in Ardoq, some were in spreadsheets,
some were still in Smartsheet, and the rationalisation was that "we are
migrating", which is the worst of both worlds: we were paying for a tool
we were not yet getting the benefit from, while also still maintaining
the workarounds it was supposed to replace.

The other thing I had not appreciated about commercial EA tools when
the team is small is what they explicitly don't cover. They are
architecture inventories. They are not, and never claim to be, a place
where the rest of the business lives. PMO programme data lives in
Smartsheet or a project portfolio tool, not in your EA platform.
Vendor due diligence (Dow Jones, Moody's, KYC) lives in legal and
procurement systems, not in your EA platform. The application onboarding
governance flow (data privacy impact, technical risk, vendor screen,
architecture sign-off) is workflow, not architecture, and most EA tools
have the simplest possible imitation of a workflow engine, if anything
at all.

So even if Ardoq had been delivering perfect EA data, it would still
have been only one of three or four systems that the architecture
function had to look at to do its actual job, which is helping the
business make better decisions about what to build and what to buy.
At a 5,000 person company that is still operationally fine. At
Sonnedix's size it is, frankly, ridiculous.

## The decision to build, and how I scoped it

After the second-year experience with Ardoq I made the call to drop
the commercial tool and build the in-house alternative myself. The
reframing that unlocked it: I did not need 100% of what Ardoq provides.
I needed the 30% that the team at Sonnedix actually uses every week,
plus the 30% that no commercial EA tool covers (the workflow, the PMO
substrate, the vendor due diligence, the audit trail). The remaining
40% I could leave behind without anyone missing it.

What I needed:

- An application portfolio with the structured attributes that matter
  to us (criticality, data sensitivity, vendor, contract renewal date,
  domain, owner). About 120 apps.
- A capability model anchored in our value streams (Meter to Cash,
  Customer Management, Procurement, and so on), editable inline,
  rather than maintained in a separate modelling tool.
- A PMO substrate so initiatives sit alongside the architecture rather
  than off in another system. This is the bit an Ardoq or a Planview cannot do.
- A governance workflow, which I will describe properly below, called
  CAVAS (the Central Application and Vendor Approval System, which is
  what I named it).
- A single query-able pane of glass so the question "which Commercial
  domain apps touch customer PII and have a contract renewal due
  before year end" returns in five seconds instead of five spreadsheet
  filters.

What I deliberately skipped: meta-model versioning, custom diagram
notations, multi-language taxonomy, an OpenAPI surface for every
artefact, a partner-integration marketplace. A 100 person EA team
needs those. A small one does not.

## The stack

Meridian is a TypeScript codebase. Next.js 15 on the App Router for the
front end. PostgreSQL on Azure Flexible Server for the database, Prisma
for the ORM. Microsoft Entra ID for SSO, so it inherits the rest of the
estate's identity and MFA without me writing any of it. Vercel AI SDK
on top of Google Gemini for the conversational assistant. Docker on
Azure App Service for hosting.

There is also a FastAPI layer (Python) that I built deliberately,
because the next thing I want to do with Meridian is integrate it with
the rest of the systems landscape (SAP, Salesforce, the procurement
system, the document repository), and a clean REST surface with
auto-generated OpenAPI documentation makes that an afternoon of work
per integration rather than a week. The FastAPI layer also handles the
heavier server-side work that doesn't belong in the Next.js process,
and its security model (token-scoped access, request rate limits,
explicit per-route auth) is easier to reason about for the things
that need to be reasoned about clearly.

## CANVAS, which is now part of Meridian

CANVAS, the Central Application and Vendor Approval System, was
originally a standalone application. I built it first, as a separate
codebase, because the governance workflow was the most painful gap in
our day to day operation. New apps and new vendors were being on-boarded
in a sequence of disconnected steps: a Smartsheet here, an email chain
there, an Excel sheet for the DPIA, another spreadsheet for the
technical risk assessment, a Word document for the vendor screening
results, a meeting for the AGB sign off. The audit trail was whatever
people remembered to put in a folder.

CANVAS as a standalone product solved that. A request comes in, the
data privacy impact assessment runs against the right template, the
technical risk assessment against another, the vendor screen pulls
from Dow Jones and Moody's, and the Architecture Governance Board sees
the whole package in one view when it comes time to sign off. Every
stage has explicit owners, explicit timeouts, and explicit escalation.

After about three months of CANVAS running alongside Meridian, it
became obvious that the two should be one product. They were sharing a
data model anyway (you cannot do governance against an application that
does not exist yet in the portfolio, and you cannot run the portfolio
without an audit trail of how each app got there). The migration was a
deliberate exercise: move CANVAS into the Meridian codebase, share the
Prisma schema, share the Entra ID auth, share the Gemini assistant so
that questions like "which open CAVAS requests are blocked on a vendor
screen" can be answered in the same pane as "show me all Commercial
domain apps". I did the migration over a series of weekends in early
2026 and it has paid for itself already in maintenance time saved.

CANVAS now sits inside Meridian as a first-class surface. When this
goes fully live, the Sonnedix application and vendor onboarding flow
will be one continuous, auditable, searchable system instead of half a
dozen disconnected ones, and the AGB will see a complete request from
inside the same tool the architects already use.

## The audit story

Auditability was a deliberate design constraint from day one. I am not
going to ship a system that I cannot explain to General Counsel or the
Chief Compliance Officer if they ask. So:

- Every edit to a portfolio record, capability, value stream or CAVAS
  request is captured with the user identity, the timestamp, the before
  and after values, and the reason text the user provided.
- Every login is logged, including the SSO claims that were validated
  at the gateway.
- Every assistant query is logged with the question, the records the
  assistant retrieved, and the response text, so a regulator can ask
  "what did Tarun's tool tell him on March 12" and we have the answer.
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

Before Meridian, when a finance lead wanted to know which platforms had
EBITDA-impacting capability dependencies, the answer involved a
Smartsheet filter, a spreadsheet pivot, a question to me, and me
running the actual analysis. Meridian gives them a chat box. The
assistant has read access to the full architecture corpus (apps,
capabilities, value streams, PMO initiatives, CAVAS records) and
returns a structured answer with citations to the underlying records.
There is RAG with a tightly scoped corpus, prompt-cached system
context, and guardrails that prevent it from inventing apps or
capabilities that do not exist.

This will, I think, flip the operational tax that commercial EA tools
imposed. Stakeholders are not asked to maintain the architecture data,
they are asking questions of it. People who would never have opened
Ardoq will use Meridian regularly because the way in is a chat rather
than a form.

The list of stakeholders that Meridian is being designed for is, in
practice, the senior leadership team and their direct lieutenants:
the CDO, the CIO, the General Counsel and the legal operations team,
the Chief Compliance Officer, the heads of Finance Systems, Commercial,
Operations, Growth and Legal, and the technology and process owners
who report into each of those. Every one of those people has a
different question of the same underlying architecture corpus. The
assistant is the bit that lets a single dataset serve all of them.

## What it costs and what it eliminates

Once Meridian is fully live (this is happening over the course of
2026), the picture, on a steady-state annualised basis, looks
roughly like this:

| Item | Annual |
|---|---|
| Eliminated, Ardoq licence | around $100K |
| Eliminated, Smartsheet PMO subscription, replaced by integrated PMO board | around $15K |
| Eliminated, recovered time on manual spreadsheet maintenance, roughly half an FTE | around $60K |
| Added, Azure App Service plus PostgreSQL hosting | around $3K |
| Added, Gemini API calls for RAG and the assistant | around $2K |
| Net annualised | roughly $170K saved per year |

The build itself was me, in evenings and weekends. Ardoq was being
paid for during that period regardless, so the build did not introduce
double-spend on the way through. The team was running on Ardoq plus
spreadsheets while Meridian was being shaped and is now switching over.

## What I would do differently

Two things.

The first is that I should have started with the assistant rather than
ending with it. I built the data model first and bolted the assistant
on at the end. The right order would have been to define the questions
stakeholders actually want answered, work backwards to the minimum data
shape that answers them, and only then build the user interface. The
product would have shipped sooner and I would have spent less time on
data attributes nobody queries.

The second is that I should have taken CAVAS into the Meridian codebase
from the start, rather than building it standalone and migrating
afterwards. The migration went smoothly enough, but in retrospect the
right call would have been to commit to the unified codebase the
moment it was clear the data models overlapped, which was within a few
weeks. I lost two or three weekends I did not need to lose to the
migration.

## Why this matters beyond Sonnedix

Meridian is not "AI-augmented" in the loose sense, where someone has
added a copilot to an existing product. It is AI-native by intent. The
data model assumes the assistant is the primary interface for most
users, so attribute design, taxonomy choices and governance schemas
are shaped by what the language model needs to retrieve cleanly under
RAG, not just by what fits in a relational schema.

A few specific practices I would carry into any equivalent build, not
just an EA platform:

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

If you are trying to ship AI-native enterprise systems in regulated or
financially material contexts, those four practices are not optional.
They are how you get from a demo to something a CDO or an auditor
will sign off on.

## Status

Meridian is rolling out across Sonnedix in 2026. CANVAS, which I
built first as a separate product and then folded into Meridian, is
the most-active surface during the rollout. The application portfolio
is around 120 apps across six domains, all with structured attributes,
all governed through the AGB in the same tool. The list of designed
stakeholders is the SLT and their direct lieutenants.

If any of this is useful in your own context, my contact details are
in the footer.
