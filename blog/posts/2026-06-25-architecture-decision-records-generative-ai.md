---
title: "The evolving role of architecture decision records in the age of generative AI"
slug: architecture-decision-records-generative-ai
date: 2026-06-25
excerpt: "Architecture Decision Records have re-emerged as one of the most useful artefacts in the modern enterprise architecture practice. Generative AI has not replaced the discipline; it has changed its economics and, in doing so, its place in the operating model. A practical perspective for architecture leaders."
source: own
---

## Executive summary

Architecture Decision Records — short, structured documents capturing
why a particular design choice was made, what was considered, and
what was rejected — have been an established practice for the better
part of a decade. They have become, quietly, one of the most useful
artefacts in any mature architecture function. They are inexpensive
to write, easy to read, and hold their value across personnel
changes in a way that few other architecture deliverables do.

What has changed in the last eighteen months is the cost structure
of producing them. The combination of generative AI tooling, modern
source-control workflows, and the maturing ecosystem of architecture
linters means that the marginal cost of authoring an ADR has fallen
substantially. This has changed the economics of the practice and,
with it, the right operating model.

This piece sets out how I have seen ADR practice evolve, the five
considerations I would recommend any architecture leader work through
when reviewing their own approach, and the implications for the
broader architecture function.

## The state of ADR practice in 2026

The ADR pattern, in its simplest form, has not changed since
Michael Nygard's original write-up in 2011. A record captures a
decision title, the context in which it was made, the decision
itself, the alternatives considered, and the consequences. It is
stored alongside the code or configuration it relates to, typically
in a directory called `docs/adr` or equivalent, and is treated as
an immutable artefact: superseded decisions are replaced by new
records that reference the original, not by edits in place.

What has changed is the surrounding context. Three observations
that frame the rest of this piece.

First, **the volume of architecture decisions has increased
materially**. The combination of microservices proliferation, cloud
service sprawl, and the now-routine integration of generative AI
components into enterprise systems has multiplied the number of
choice points at which an ADR is the appropriate response. A
mid-sized enterprise that ten years ago might have produced a
dozen ADRs per year will, in a comparable function today, produce
many times that number.

Second, **the cost of producing each individual ADR has fallen**.
Modern coding assistants can draft a reasonable first version from
a short briefing, capable of producing the structural elements
(context, options, decision, consequences) in seconds. The
architect's time is no longer consumed by the structural drafting;
it is consumed by the substantive review and the judgement calls
that the assistant cannot make.

Third, **the readership has broadened**. ADRs were once read
primarily by other architects. The combination of expanded technical
literacy across product and engineering teams, the rise of internal
LLM-based knowledge tooling that surfaces ADRs in response to
natural-language questions, and the broader push for transparency
in technical decision-making means that the audience for an ADR
today extends well beyond the original architecture community.

The combined effect is a practice that is more valuable than it
has ever been and is being executed at greater scale and lower
unit cost. The risk is not that ADRs become irrelevant. The risk
is that they become voluminous, inconsistently authored, and
poorly governed — the same trap that documentation practices have
fallen into before.

## Five considerations for an evolving ADR practice

In conversations with architecture leaders across industries over
the past year, five considerations recur. Each merits an explicit
position in the architecture function's operating model.

### 1. The role of the LLM in the drafting process

There is no longer a question of whether generative AI tooling will
be involved in ADR authorship. It will. The question is at what
point in the drafting workflow, with what guardrails, and with
what attribution.

A workable pattern I have seen in practice is the following. The
architect, or the engineer making the decision, briefs the LLM on
the context — typically a short paragraph or a set of bullet points
describing what is being decided and why. The LLM produces a first
draft. The draft is reviewed, edited substantively, and signed off
by a named human author. The record is committed to source control
with a co-authorship attribution that makes the AI involvement
explicit. The reviewer in a subsequent ADR review process is aware
that the document originated as an AI draft.

The pitfalls to avoid in this pattern are familiar. The first is
under-editing — accepting the draft as written when it would not
have been accepted from a human contributor. The second is the
opposite: over-editing, which loses the time efficiency the
assistance was meant to provide. The third is the loss of decision
provenance, where the rationale captured in the ADR is the assistant's
plausible synthesis rather than the actual reasoning of the
decision-maker. All three are addressable through review discipline,
but they require explicit attention.

### 2. The standard template

Many organisations have evolved their ADR template over time, often
adding fields specific to their context. In an AI-assisted authorship
model, the consistency of the template matters more than it did,
because the assistant performs significantly better when working to
a well-defined structure.

I would recommend any architecture leader formally codify the
organisation's ADR template, publish it as a Markdown file in the
documentation repository, and ensure that the prompt used to brief
the AI assistant references that template explicitly. A template
that includes:

- Title and unique identifier
- Status (Proposed, Accepted, Superseded, Deprecated)
- Date and author(s)
- Context (the situation requiring the decision)
- Decision (the position taken)
- Options considered (with a brief assessment of each)
- Consequences (positive and negative)
- Related records (links to relevant prior ADRs)

provides sufficient structure for an LLM to produce useful drafts,
and is parseable by tooling for downstream uses such as automated
dashboards or compliance reporting.

### 3. The review and approval workflow

The review process is where the practice most often breaks down at
scale. Two common patterns are worth being explicit about.

The first is **decision-level review**, where every ADR is reviewed
by an Architecture Governance Board or equivalent. This works well
at low volumes but becomes a bottleneck at scale. It also tends to
shift the centre of gravity in the practice from "documenting
decisions made by the team" to "decisions made by the AGB and
documented retrospectively", which is a subtle but meaningful
inversion.

The second is **categorical review**, where ADRs are classified at
authorship into tiers — typically something like "team-level"
(merged with code review), "domain-level" (reviewed by the relevant
domain architect), and "enterprise-level" (reviewed by the AGB).
This pattern scales more comfortably and preserves the principle
that the team closest to the decision is the one capturing it. It
requires a clear classification rubric, which should itself be
published.

For organisations adopting AI-assisted authorship at scale, I
would expect categorical review to become the more common pattern.
The volume of ADRs that the function will need to handle is
unlikely to be sustainable under decision-level review.

### 4. ADRs as a queryable corpus

Once an organisation has a meaningful body of ADRs in source
control — say, a hundred or more across the architecture function
— the corpus itself becomes a valuable asset. A common use case
emerging in practice is the integration of the ADR corpus with an
internal LLM-based assistant, allowing architects and engineers to
ask natural-language questions such as "what is our position on
microservices boundaries for transaction-processing workloads" or
"have we previously rejected the use of a particular technology,
and on what grounds".

This use case is straightforward to implement with current
retrieval-augmented generation tooling. The architectural
requirements are modest: a consistent metadata schema across ADRs,
a well-defined storage layout, an indexing pipeline (which can be
as simple as a nightly job), and an integration point with the
organisation's preferred internal assistant platform.

The benefit, in my observation, is twofold. First, decisions are
re-applied consistently across teams, reducing the rate at which
the same question is debated repeatedly in different contexts.
Second, new architects joining the function have a much faster
on-ramp to the organisation's established positions, which would
otherwise be tribal knowledge.

### 5. The retention and supersession policy

ADRs are immutable, but they are not eternal. An ADR that
established the organisation's position on a now-obsolete
technology is a historical record, not a current standard. The
architecture function needs a clear policy on supersession — when
a new ADR supersedes an older one, the older record is updated
with a status change to "Superseded by ADR-NNN" but is not deleted.

Less commonly discussed but equally important is the retention
policy for ADRs that have been superseded for a long time. The
straightforward answer is that ADRs are kept indefinitely. Source
control storage is inexpensive, and the historical value of being
able to trace the evolution of the organisation's architecture
position over time is meaningful, particularly in regulated
contexts where post-hoc audit may require reconstructing the
reasoning behind a decision made some years prior.

The architecture function should publish its supersession and
retention policy as part of the ADR practice documentation.

## Implications for the architecture function

Three broader implications for architecture leaders.

**The architecture function's documentation discipline is becoming
a competitive advantage.** In a context where decision velocity is
high and the cost of capturing decisions has fallen, the
organisations that have established robust documentation practices
will accumulate a strategic asset over time — a queryable record
of why their architecture is what it is. The organisations that
have not will increasingly struggle with consistency, with
on-boarding, and with the regulatory expectations that are
emerging in several sectors.

**The skills profile of architects is shifting.** The skill of
producing a clean ADR draft has been substantially commoditised
by AI tooling. The skill of recognising when an ADR is required,
of asking the right questions to surface the actual decision
context, and of facilitating a substantive review discussion has
become correspondingly more important. Architecture leaders
should consider this shift in their hiring and development plans.

**The relationship between the architecture function and
engineering teams is changing.** ADRs that are written by engineering
teams with AI assistance, reviewed by domain architects, and
escalated to the AGB only for genuinely cross-cutting decisions,
represent a meaningful redistribution of architectural authorship
across the organisation. This is, in my view, a positive evolution.
The architecture function's role becomes more about facilitation
and curation than about authorship, which is a better use of senior
architectural expertise.

## A note on related practice

Architecture Decision Records sit alongside several other
documentation practices that have evolved in parallel over the past
decade — capability models, value stream maps, technology radars,
and the broader category of internal technical writing. The
considerations above apply, with appropriate adjustments, to each
of these. The opportunity for architecture leaders is to take a
coherent view across the whole documentation practice rather than
treating ADRs as a standalone discipline.

The pieces that follow in this series will examine that broader
practice — including the role of fitness functions in measuring
architectural health, and the changing shape of identity and
security architecture — through the same lens of considered,
practical evolution.
