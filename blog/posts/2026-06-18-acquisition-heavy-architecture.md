---
title: "What an acquisition-heavy company actually needs from its architects"
slug: acquisition-heavy-architecture
date: 2026-06-18
excerpt: "Textbook enterprise architecture practice is calibrated for stable enterprises. It doesn't fit roll-up companies acquiring three to ten businesses per year. A working framework for the architecture function inside a PE-style acquisition machine."
source: own
---

## TL;DR

There is a particular kind of company that the standard enterprise
architecture playbook does not fit. Private-equity-backed roll-ups
and other acquisition-heavy growth businesses acquire several small
companies per year and integrate them at varying degrees of depth.
The textbook EA function — the operating model, the Architecture
Governance Board, the capability model, the standards forum — is
calibrated for a stable enterprise where the underlying portfolio
changes slowly. In a roll-up, the portfolio changes by a third every
two years. The textbook function spends its first eighteen months
catching up to the perimeter and then never gets ahead of it.

This piece is what I think the architecture function actually owns
in an acquisition-heavy business, what it deliberately does not own,
and a working framework for the part it does own. It is opinionated
because the pattern is under-discussed; I have not seen good public
writing on it and I have made most of the mistakes I describe.

The argument in one sentence: in an acquisition-heavy company, the
architecture function's job is not to enforce a target end-state.
It is to make the next acquisition cheaper than the last one, the
one after cheaper still, and the seventh one cheap enough that
nobody asks architecture for permission.

## The pattern

An acquisition-heavy business is one where the company acquires
three to ten other businesses per year, each one small relative to
the parent, and integrates them at some level. The acquisitions
might be in the same business vertical (the classic roll-up: many
small dental practices, many small accounting firms, many small
HVAC companies, many small renewable-energy operators) or in
adjacent verticals (a platform business absorbing complementary
capabilities). The economic logic is different in each case but
the architecture problem is similar.

What is similar:

- The parent company starts with a single set of systems, usually
  decent quality, often standardised.
- Each acquisition arrives with its own stack. The stack is almost
  always a mix of: one or two SaaS products the team genuinely
  needs, several SaaS products they tolerate, a couple of internal
  applications that nobody understands, and a thick layer of
  spreadsheets that turn out to be load-bearing.
- The acquisition closes legally before the technology has been
  fully understood, let alone integrated.
- Operating leverage from the acquisition depends on integration
  happening, but the timeline pressure is intense and the
  integration team is small.
- The next acquisition arrives before the current one is fully
  integrated.

That last bullet is the one that makes this distinct from
single-large-acquisition integration work. A merger of equals or a
single-bet acquisition is a one-time event with a defined end. A
roll-up is a continuous flow. The architecture function is
running a pipeline, not delivering a project.

## Why textbook EA doesn't fit

A standard enterprise architecture function builds toward a steady
state. It defines the target operating model, populates the
capability model, sets standards, and runs a governance board that
keeps drift in check over time. The model assumes a portfolio that
is mostly stable and gradually evolved.

This doesn't survive contact with continuous acquisition. Three
things break:

**The target end-state assumption breaks.** Defining a target end
state requires that the inputs to the model are stable enough to
plan against. They are not. Six months into a target-state
definition, two new acquisitions have arrived with stacks that
weren't in the model. The target state has to be re-cut. After
three or four re-cuts, the team gives up on target-state work
and the operating model becomes "react to what's in front of us".

**The standards body breaks.** Standards are useful when they apply
to a long-lived portfolio. They are less useful when half the
portfolio has been part of the company for less than two years and
came in with a stack the standards never anticipated. The Architecture
Governance Board ends up either approving everything (rubber stamp)
or refusing everything (bottleneck). Neither produces useful
governance.

**The capability model breaks.** The capability model is supposed
to be a stable spine. Acquired businesses have capabilities that
overlap with the parent's but at different boundaries, different
granularities, different ownership patterns. Trying to force the
acquired business's capability map onto the parent's is the kind
of work that produces three months of consultancy fees and zero
business value. The opposite — keeping every acquisition's model
separate — produces a sprawl with no integration story.

The textbook function isn't wrong; it is calibrated for a different
problem. The problem an acquisition-heavy company actually has is
not "design the target state". It is "make the integration of
the next acquisition cheap, fast, and reversible".

## What architecture actually owns in this context

The architecture function in an acquisition-heavy business owns
three specific things and explicitly does not own several others.

**Owns: the integration pattern.** The repeatable playbook for how
an acquired business connects to the parent's data, systems, and
processes. Not a one-off project plan; a pattern that can be
parameterised for each acquisition. The pattern includes the
sequence (what happens in days 30, 60, 90, 180), the technical
decisions (which acquired systems are kept, which are sunset, which
are migrated), the governance touchpoints (which integration decisions
require AGB sign-off and which are routine), and the rollback
posture (what to do if the integration uncovers problems that
weren't in due diligence).

**Owns: the federated data model.** A small, deliberately limited
data model at the parent level that lets the parent's systems talk
about acquired businesses without requiring every acquired business
to conform to a single master schema. The model captures the
minimum data the parent needs (legal entity, business unit, revenue
attribution, customer-of-record, employee count, financial
consolidation point) and lets each acquired business retain its
own operational schemas underneath. The architecture function is
the keeper of the federation, not the harmoniser.

**Owns: the vendor consolidation calendar.** The acquired businesses
arrive with overlapping vendor relationships. The parent has its
own. The right answer is rarely "consolidate everything to the
parent's vendors on day one"; the right answer is a calendar that
sequences vendor consolidation against renewal dates, integration
priorities, and the architecture function's own bandwidth. The
calendar is a living artefact, updated each quarter.

What architecture explicitly does not own in this context:

**Does not own: the target operating model.** That belongs to the
operating partners and the COO. Architecture is a contributor, not
the owner. Target operating models in roll-ups are political
artefacts as much as technical ones; the architecture function does
not have the authority or the visibility to drive them.

**Does not own: the integration project plan for any specific
acquisition.** That belongs to the integration project lead, who
is usually a programme manager attached to the M&A function.
Architecture provides the pattern; it does not execute every
instance.

**Does not own: the capability model in any strong sense.** The
capability model in an acquisition-heavy company is a useful
sketch, not a source of truth. Investing heavily in it produces
diminishing returns. Keep it lightweight.

**Does not own: standards enforcement on acquired companies during
their first year.** This is the most counter-cultural part of the
framework. Acquired companies should be left alone for their first
year on standards questions, with very specific exceptions
(security, data residency, regulatory compliance, identity
integration). The exceptions matter; the rest does not. The
architecture function that tries to enforce its standards on a
just-acquired business in month three loses both the trust of the
acquired team and the political capital it needs for the integration
that does matter.

## The 30-60-90-180 pattern

A repeatable acquisition-integration playbook, at the architecture
layer. The numbers are days from legal close.

### Days 1–30: Discover

What happens at the architecture layer: a 30-day discovery exercise
on the acquired stack. The output is a written assessment that goes
into the integration team's hands.

Specific things the discovery covers:

- **Identity and access.** What identity provider does the acquired
  business use? How many user accounts? Where are admin credentials
  held? What is the offboarding process for departing staff?
- **Data inventory.** What datasets does the acquired business
  produce, and which are now joint-ownership with the parent under
  the acquisition agreement? Where is this data physically stored?
  Is any of it subject to regulatory or contractual constraints?
- **Application portfolio.** What applications are in production?
  Who uses each? Which are SaaS, which are self-hosted, which are
  custom-built and unmaintained? Which have active vendor support?
- **Vendor relationships.** What contracts exist? When are renewals?
  What are the costs? Are any of the contracts inherited from a
  previous owner that we don't have visibility into?
- **The shadow stack.** The spreadsheets, the scripts, the
  developer-laptop tools that aren't on the official inventory but
  are load-bearing. These are usually 30% of the actual operation
  and 0% of the documented one.

The deliverable at day 30 is a written assessment, not a
recommendation. The recommendation comes after the integration team
has had its parallel commercial and operational reviews.

### Days 30–60: Decide

What happens at the architecture layer: a sequenced decision on
the acquired stack, with specific categorisation of each application.

The decision categories I have found useful:

- **Keep, integrate.** The acquired application is good enough that
  it stays, but it needs to be integrated with the parent's identity,
  data, and operational tooling. Most operational applications fall
  here.
- **Keep, federate.** The acquired application stays as a separate
  island, with a thin integration to the parent's federated data
  model but no deeper integration. Often the right answer for
  vertical-specific applications where the acquired business knows
  its own domain better than the parent does.
- **Migrate.** The acquired application is going away; users
  migrate to the parent's equivalent over a defined timeline. The
  parent's application must be capable enough to absorb the acquired
  use case.
- **Sunset.** The acquired application is going away with no direct
  replacement because it was solving a problem the parent solves
  differently or doesn't have. Usually a small minority of cases.
- **Conditional.** The application is on probation. Decision deferred
  for six months while the integration team learns whether the
  underlying business process needs to change.

Each application in the acquired stack gets one of these labels.
The label drives the integration plan. The labels are formally
signed off at the AGB.

### Days 60–90: Integrate the non-negotiables

What happens at the architecture layer: identity, data residency,
security baseline, financial consolidation. The minimum integration
required to run the acquired business as a subsidiary.

This is the part of integration that does not wait for the full
plan. Identity has to be unified within ninety days for offboarding
to work. Security baseline has to be hit so the acquired company
isn't a hole in the parent's posture. Financial consolidation has
to be wired so that month-end works. These are non-negotiable and
the timeline is tight.

The application-level integrations from the day-30 decisions come
later. Days 60–90 is about the floor, not the ceiling.

### Days 90–180: Execute the application plan

What happens at the architecture layer: the categorised application
decisions from day 60 are now project work. The architecture
function transitions from designer to consultant: the integration
team executes the plan; architecture is on call for the decisions
that come up during execution.

By day 180, most of the application-level integration work is
either complete or has a clear plan with named owners and timelines.
The acquired business is operating as a normal subsidiary, with
overlapping reporting lines into the parent, with the parent's
identity and security in place, and with a clear roadmap for the
remaining work.

Past day 180, the acquired business should be unremarkable from
an architecture perspective. The function's attention should be
on the next acquisition, not the previous one.

## Vendor consolidation: the actual mechanic

The single highest-value piece of work the architecture function
does in an acquisition-heavy business is vendor consolidation.
Not capability modelling, not target-state architecture, not
standards forums. Vendor consolidation. Because every acquired
business arrives with vendor contracts the parent is now paying
for, and the durable savings — the actual EBITDA contribution from
the M&A work — come from rationalising those contracts.

The mechanic, in detail:

- **A central register of every contract across every entity.**
  Updated within ninety days of each acquisition. The register
  records vendor, product, scope, value, renewal date, contractual
  notice period, and the named relationship owner. This sounds
  obvious. Most companies do not have it.
- **A renewal calendar that is the input to the consolidation
  pipeline.** Eight weeks before any contract renewal, the
  architecture function reviews whether the contract should be
  renewed as-is, renegotiated, consolidated with the parent's
  equivalent contract, or terminated. The decision is informed by
  the application-level decisions from day 60.
- **A consolidation pipeline that processes one to three contracts
  per quarter, on average.** Not all at once; in sequence. The
  pipeline is sized to the architecture function's bandwidth, not
  to the theoretical number of consolidations available. Trying
  to do twelve consolidations in a quarter produces zero
  consolidations and a lot of stalled work.
- **An EBITDA tracker that reports the saved cost back to the
  finance function quarterly.** This is the political win that
  buys the architecture function the credibility to keep doing
  the work. Without the tracker, the savings are invisible and
  the function's value is unmeasurable.

In the company contexts I have seen this work, the architecture
function delivers high-single-digit-percentage operating savings
per year from this work alone, year after year, indefinitely. It
is the most reliable value the function produces. It is also
mostly invisible from the outside, which is fine.

## The federated data model

The structurally hardest piece of architecture work in an
acquisition-heavy business is the data model. Two failure modes
sit on either side of the right answer.

**Failure mode 1: every acquired company conforms.** The parent
defines a master schema and every acquired business is required
to migrate onto it. This produces six- to eighteen-month migration
projects per acquisition, none of which deliver business value
during the migration, all of which produce friction with the
acquired teams, and many of which fail outright when the acquired
business's actual operational needs do not fit the master schema.

**Failure mode 2: no integration data model at all.** The parent
runs its own systems; each acquired company runs its own; nobody
attempts to harmonise. This makes consolidated reporting impossible,
makes financial close take three weeks instead of three days, and
makes any cross-business operational decision require manual
data wrangling.

The right answer is a deliberately small federated model. A
specific list of data entities that the parent needs to know about
at the corporate level, with a clean schema, and explicit federation
contracts with each acquired business. The acquired businesses keep
their operational schemas; they map them to the federated model on
a defined cadence (daily, weekly, monthly depending on the entity).

The entities I would include in a minimum federated model:

- **Legal entity.** Which legal company is each business operating
  under. Hierarchy of legal entities. Tax registrations.
- **Customer of record.** Unique customer identifier across the
  group, where the same customer exists in multiple businesses.
- **Employee.** Joint employees of any group company, mapped to the
  identity provider.
- **Application.** What applications exist across the group, with
  ownership.
- **Vendor.** What vendor contracts exist across the group, joined
  to applications.
- **Financial transaction (aggregated).** Revenue, cost, and
  EBITDA at the granularity the CFO needs for consolidation. Not
  individual line items.

That is roughly six entities. Most attempts at a federated model
go to twenty or thirty entities and collapse under the weight.
Six is enough for ninety percent of the consolidation use cases
and small enough to actually maintain.

## The cultural component

A short and important note. The acquired teams have feelings about
what is happening to them. The integration team — and the
architecture function specifically — is the visible face of the
parent's decisions about the acquired business's stack. Those
decisions feel personal because they often involve sunsetting a
system the acquired team built or stopping using a vendor the
acquired team chose.

The right posture is to listen first, make decisions second, and
communicate decisions transparently. Specifically:

- The day-30 discovery is a real conversation with the acquired
  team, not just a read of the documentation. The conversation is
  the input to the day-60 decision.
- The day-60 decision is communicated in writing, with reasons,
  and is open to challenge in a specified window before it becomes
  final. "Keep, federate" and "Conditional" are both used
  deliberately because they signal "we are not yet making the
  hard decision, and your input matters". "Sunset" is used
  sparingly and always with named replacement.
- The acquired team retains influence over their stack for at least
  the first ninety days, even where the parent's architecture
  team has views. The exceptions are the non-negotiables (security,
  identity, regulatory) where the parent's posture is final.

This is not soft-skills theatre. It is the durable mechanism by
which the integration succeeds. The acquired team's institutional
knowledge of why their stack looks the way it does is the most
valuable input the architecture function has. The function that
ignores that input makes worse decisions and loses the trust it
needs for the deeper integration work that comes later.

## What it means for the architecture function's structure

The function in an acquisition-heavy business looks different from
the textbook function.

- **Smaller standards forum.** The Architecture Governance Board
  meets monthly, not weekly, and focuses on the consequential
  decisions: the day-60 categorisations, the federation contracts,
  the security exceptions, the genuinely cross-business
  architectural choices. Not the everyday-application questions.
- **A dedicated acquisition architecture lead.** One person whose
  full-time job is the integration pattern: shepherding each
  acquisition through the 30-60-90-180 cycle. This role is the
  thing most acquisition-heavy companies are missing.
- **A vendor management partnership.** The architecture function
  and the procurement function are tightly partnered, not at
  arm's length. The contract register is co-owned. The consolidation
  pipeline is co-run.
- **Lightweight capability modelling.** A simple capability map
  exists at the corporate level — fewer than fifty top-level
  capabilities — and it is updated quarterly rather than as a
  major artefact. It serves as orientation, not as a planning tool.
- **A clear separation between architecture and integration
  execution.** Architecture is on the design and the pattern;
  integration is on the execution. Both functions exist; they are
  not the same team.

This shape is leaner than the textbook EA function and busier per
head. It is also the shape that actually fits the business model.

## What this looks like when it is working

A short picture of the steady-state, for what to aim at.

- Each acquisition closes legally, and within 30 days the
  architecture function has produced a written assessment of the
  acquired stack.
- Within 60 days the AGB has signed off on the application-level
  categorisations and the integration plan.
- Within 90 days the non-negotiables (identity, security,
  data residency, financial consolidation) are in place.
- Within 180 days the application-level integrations are on a
  named roadmap with owners.
- Vendor consolidation produces predictable EBITDA contribution
  quarterly.
- The federated data model is stable; the entities in it are
  unchanged from one year to the next.
- The architecture function is small relative to the size of the
  group, but the integration pattern works repeatably.
- Each acquisition is cheaper to integrate than the last, because
  the pattern is mature and the federation is established.

The signal that the function is working is not the absence of
incidents or the elegance of the target-state diagram. It is the
unit economics of integration. If the next acquisition costs less
to integrate than the previous one, the function is doing its
job. If not, the function is failing in some specific way that
the framework above lets you diagnose.

## Why this isn't written about

The framework is under-discussed because it does not fit the
prestige patterns of enterprise architecture practice. The
prestige patterns — TOGAF certifications, capability-model
deep-dives, the long-form ADRs that get praised on LinkedIn — are
calibrated for stable enterprises. Acquisition-heavy work is more
operational, more about pattern repetition than about elegant
single artefacts, and more about EBITDA than about elegance.

The people who do it well tend not to write about it. The architecture
press writes about the prestige patterns. The PE-backed roll-up
architects are heads-down doing the integration work and probably
not writing about it because the work itself is what they are
paid for.

I have been on the inside of this pattern. The framework above is
mine; if it is useful in your context, I would like to hear how
it lands. If you are reading this and you are the architecture
lead inside a roll-up business, please consider writing about the
pattern as well. The discipline benefits from more honest writing
about what actually works.

## Related

- [Meridian: building the EA platform we couldn't buy](/blog/case-study-meridian/)
  — describes the EA platform that was deliberately designed to
  cope with a fast-changing portfolio rather than a stable one.
- [CANVAS: building the approval workflow no commercial product
  covers](/blog/case-study-canvas/) — the workflow that wraps the
  acquisition-onboarding gate at the application level.
- [The commercial EA tool market has 18 months](/blog/ea-tool-market-18-months/)
  — the same shift, viewed from the vendor side.
