---
title: "Lessons from large-scale ERP transformation: an architect's perspective"
slug: large-scale-erp-transformation-lessons
date: 2026-07-16
excerpt: "Mega-scale ERP transformation programmes have a consistent set of architectural challenges that do not appear in the vendor narrative or the typical analyst commentary. Five lessons from leading the architecture for a multi-region S/4HANA programme of nine-figure scale, drawn from the experience of running the programme rather than from the post-completion case study."
source: own
---

## Executive summary

Large-scale ERP transformation — the multi-year, multi-region,
nine-figure programmes that migrate a global organisation to a
modern ERP platform — remains one of the most complex undertakings
an enterprise architecture function can lead. The published
commentary on these programmes tends to fall into two categories:
vendor narratives, which emphasise the destination at the expense
of the journey, and consultancy retrospectives, which emphasise
the methodology at the expense of the architectural detail.

What is rarely discussed in either category is what the architecture
function actually grapples with during the programme — the specific
decisions, the moments where the architectural posture matters most,
and the lessons that translate across organisations and across
ERP product lines. This piece is an attempt to fill that gap, drawn
from leading the global architecture for an S/4HANA transformation
of nine-figure scale across multiple regions.

Five lessons. None of them are surprises individually. The combination
is what produces the difference between a programme that delivers
the architectural foundation the organisation will use for fifteen
years and a programme that delivers a system that runs but does
not provide that foundation.

## Context

For the avoidance of doubt: the lessons that follow are drawn
from a programme that ran over multiple years, across more than
fifteen country deployments, with a total programme value in the
hundreds of millions, on SAP's S/4HANA platform. The specifics of
the organisation are not relevant to the lessons; the lessons
themselves are. Where the lesson is specific to SAP or to S/4HANA,
this is called out. Where it is more general, it generalises to
other large-scale ERP platforms (Oracle Cloud ERP, Workday for
finance, Microsoft Dynamics 365 for finance and operations) and
to the broader class of multi-year platform programmes.

## Lesson 1: The architectural foundations laid in the first six months determine the next ten years

The single most consequential set of decisions in a large-scale
ERP programme is the foundational architectural choices made
during the design and blueprinting phase, typically in the first
six months of the programme.

These decisions are well-rehearsed at the level of headline choices
— template versus country-by-country design, single instance versus
multiple instances, public versus private cloud, on-premise versus
hosted, the depth of the deployment model — and the programme
governance generally treats them as the major decision points they
are. What is less well-recognised is the long tail of architectural
decisions that follow from each headline choice, each of which
constrains the next decade of evolution.

The decision to deploy a global template, for instance, carries
with it implicit choices about the depth of the master data
hierarchy, the granularity of organisational units, the design of
the chart of accounts, the structure of material masters and
customer masters, and dozens of similar foundational data structures.
Each of these choices is technically reversible after go-live but
is, in practice, prohibitively expensive to change. The combined
set establishes the shape of the architectural ground on which the
organisation will build for the next decade.

The lesson is that the architectural rigour applied to these
foundational decisions needs to be substantially greater than the
rigour typically applied. Not in the sense of more meetings or
heavier documentation, but in the sense of explicit consideration
of the long-term consequences of each decision, articulated in a
form that is understandable to non-architects and that survives
the inevitable personnel changes through the programme's lifetime.

For architecture leaders entering a programme at this scale, the
recommendation is to establish, before the design phase begins, a
small set of architectural principles that the foundational
decisions will be tested against. These principles should be
written down, agreed at executive level, and revisited explicitly
at each foundational decision point. Principles that are obvious
in the abstract become decisive when applied to specific design
choices under time pressure.

## Lesson 2: The integration architecture is more important than the ERP itself

A consistent observation across large-scale ERP programmes is the
disproportionate amount of value, and the disproportionate amount
of risk, that sits in the integration architecture rather than in
the ERP itself.

The ERP is a packaged product. Its capabilities are largely defined
by the vendor's design. The organisation's design freedom is in
how it configures the product, not in what the product does. The
integration architecture, by contrast, is bespoke. It connects the
ERP to dozens, sometimes hundreds, of surrounding systems — the
CRM, the e-commerce platform, the manufacturing execution systems,
the customer-facing portals, the analytics platform, the regulatory
reporting systems, the data warehouses. The shape of these
integrations is the organisation's choice and the organisation's
responsibility.

In programmes that go well, the integration architecture is treated
as a first-class deliverable, with named ownership, formal
governance, explicit standards, and rigorous testing. In programmes
that go poorly, the integration architecture is treated as a series
of necessary plumbing exercises, delegated to the systems integrator,
and discovered to be the source of operational issues only after
go-live.

The lesson, in practical terms, is to invest disproportionately in
the integration architecture during the design phase, to maintain
a single integration architect of sufficient seniority across the
full programme lifecycle, and to ensure that the integration design
decisions are surfaced to the same governance forum as the ERP
design decisions. The integration architecture is not an
implementation detail.

For organisations on S/4HANA specifically, this lesson applies with
particular force because the move to S/4HANA from a prior ECC
environment typically requires meaningful redesign of the existing
integration pattern. The HANA-native database structures, the
adoption of CDS views as the data access pattern, the BTP-based
integration approach, and the broader move away from older
middleware patterns all combine to make the integration architecture
genuinely new rather than incrementally updated.

## Lesson 3: The data is harder than the process

In every large-scale ERP programme I have observed or been part of,
the data migration and the master data design have absorbed
significantly more effort, surfaced significantly more issues, and
created significantly more delay than the process design.

This is counter-intuitive at the outset. The headline framing of an
ERP programme is about business processes — order-to-cash,
procure-to-pay, record-to-report, hire-to-retire. The implication
is that the work is process design and configuration. In practice,
once the process design is settled, configuration is a comparatively
mechanical exercise. The difficult work is the data.

The difficulty arises from several sources. Historical data quality
is almost always worse than the legacy systems' apparent state
suggests. The reconciliation of master data across multiple legacy
systems, often each with its own slightly different version of the
same customer, product or supplier, is intricate and politically
fraught. The design of the new master data hierarchies is a place
where the organisational politics of how the business is structured
become visible, and where the architectural decision is constrained
by the operating model decision. And the migration itself, when
it finally happens, requires sustained attention to quality at a
level that few programmes plan for adequately.

The lesson is that data should be treated as a first-class workstream
from the beginning of the programme, with its own architect, its
own governance, and its own quality measurement. The data workstream
is not a sub-task of the process workstream. The relative weighting
of effort, in a well-run programme, is closer to a 60-40 split
between data and process than the 20-80 split that the early
programme planning typically assumes.

For SAP S/4HANA programmes specifically, this lesson is compounded
by the discipline that S/4HANA's data model imposes — the move from
the more permissive ECC data model to the stricter S/4HANA structures
means that data quality issues which were tolerable in the legacy
estate become blocking issues in the new platform. Programmes that
underestimate this typically discover it during the first cutover,
which is the worst possible moment to discover it.

## Lesson 4: The governance model has to be designed for years, not for the programme

Large-scale ERP programmes are typically governed through a programme
structure — a steering committee, a programme board, workstream
leads, design authorities — that is appropriate for the programme's
duration but is rarely fit for the post-programme operating model.
When the programme concludes, the governance structure dissolves,
and the architecture function is left with an inadequately designed
ongoing model.

This is the source of a familiar pattern: the platform is delivered
to a high standard, the organisation goes live successfully, and
within eighteen months the platform begins to accumulate decisions
that do not fit the original architectural intent because the
governance forum that would have prevented them no longer exists
in its programme form.

The lesson is that the programme governance model must be designed
with the post-programme operating model in mind. The Design Authority
that governs decisions during the programme should evolve into the
Architecture Governance Board that governs decisions after the
programme. The standards and patterns established during the
programme should be documented in a form that survives the programme's
conclusion and is maintained by a named function.

In a programme I led, this transition was planned eighteen months
before go-live, with the post-programme governance structure
explicitly designed and the transition of named roles into the
post-programme model documented as part of the programme closure.
The pattern proved durable. The platform's architectural integrity
was preserved through the first three years of operation under the
governance model that the programme had established. This is not
the typical outcome.

The recommendation for architecture leaders is to make the
post-programme operating model an explicit programme deliverable,
to design it with the same rigour as any other architectural design,
and to ensure that the transition is treated as a critical milestone
in the programme plan, not as a clean-up activity after go-live.

## Lesson 5: The change management story is an architectural concern

The framing of change management as a separate workstream from
architecture is, in my view, increasingly unhelpful. The two are
deeply intertwined and the architectural decisions made during the
programme have direct implications for the change management
challenge.

A platform that adopts the vendor's standard process where the
organisation's current process is materially different will require
a much larger change management effort than a platform that has
been configured to accommodate the existing process. The architectural
choice between standardising on the vendor's process and customising
to the existing process is, in part, a change management choice
disguised as an architectural one.

The lesson is that the architecture function should be involved in
the change management strategy, not as a peripheral input but as a
central voice. The architectural choices about template adherence,
configuration depth, the degree of process harmonisation, and the
phasing of country deployments each have direct implications for
the magnitude of the change management challenge and the likelihood
of successful adoption.

A practical pattern that works well is the establishment of a joint
architecture-and-change forum, meeting on a defined cadence during
the programme, where the architectural decisions are tested against
their change management implications and vice versa. This forum
serves as a check on the natural tendency of the architecture
function to favour cleaner technical designs at the expense of
adoption, and on the natural tendency of the change management
function to favour minimal disruption at the expense of long-term
technical health.

## Implications for transformation leaders

Three broader implications for executives sponsoring or leading
transformation programmes of this scale.

**The architecture function's role is not a supporting function in
these programmes.** It is the function that determines whether the
investment produces the foundation the organisation will operate
on for the next decade. The seniority, the authority, and the
durability of the architecture function across the programme
lifecycle are not implementation details; they are programme
success factors.

**The selection of the systems integrator should be informed by
their architecture leadership, not by their workforce capacity.**
The systems integrator's commercial proposition is typically
framed around capacity — the number of consultants, the day rates,
the project management methodology. The actual differentiator
across systems integrators in large-scale ERP work is the calibre
of their lead architects and the depth of their architectural
practice. This should be weighted heavily in the selection process.

**The programme should expect to revisit foundational decisions at
defined points.** Some of the foundational decisions made in the
first six months will look incorrect with the benefit of two years
of programme experience. The governance model should include
defined review points at which the foundational decisions are
re-examined and, where appropriate, formally revised before the
cost of the original decision compounds further. This is
counter-cultural in programmes that are pressured to maintain
forward momentum, but the cost of revisiting a foundational
decision at month eighteen is, in almost every case, smaller than
the cost of carrying it through to go-live and beyond.

## Closing

Large-scale ERP transformation remains, in 2026, one of the most
demanding undertakings an enterprise will take on. The vendor
products have matured; the implementation methodologies have
become more disciplined; the cloud-based delivery patterns have
removed some of the historical friction. The fundamental challenges
— the foundational decisions, the integration architecture, the
data, the governance model, the change management — remain.

The lessons above are not the only ones I would draw from leading
work at this scale. They are the ones that I have not seen written
about with the directness that, in my view, they merit. For
architecture leaders entering or running programmes of this kind,
I hope they are useful. The work is hard and the published
guidance is, in places, less honest about the difficulty than
the work itself deserves.
