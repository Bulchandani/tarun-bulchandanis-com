---
layout: layouts/post.njk
title: "What UK financial services regulation means for AI architecture in 2026"
date: 2026-07-30
excerpt: "The UK financial services regulators have moved noticeably faster on AI in the last 18 months than the consensus expected. The FCA, PRA and Bank of England statements landed in a usable shape; the practical implications for the architecture function are concrete."
author: "Tarun Bulchandani"
---

The UK financial services regulators have moved
noticeably faster on AI in the last 18 months than the
consensus expected. The FCA's Discussion Paper 5/22
posture has firmed up through the joint Bank of England /
PRA AI Discussion Paper, the SS1/23 model risk
management supervisory statement, and the FCA's
2025-26 AI strategy. Most of the EY, KPMG, Deloitte and
PwC commentary on this is calibrated to the advisor's
audience: the board, the executive committee, the chief
risk officer.

The architecture function lives one layer further in.
The architects building the systems that will or will
not be compliant with this regulatory envelope need a
different read of the same material. This piece is for
that audience.

## What the regulators have actually said

Three things have crystallised.

**Model risk management applies to AI.** SS1/23 confirms
that machine learning models, including generative AI
where used in regulated activities, fall within the
scope of model risk management. The implications are
specific: model inventory, model validation, model
performance monitoring and governance escalation all
apply, and the firm's three lines of defence have to
adjust.

**Outsourcing rules apply to AI vendors.** The FCA and
PRA are explicit that an AI service provider (whether
that is a foundation model API, a vertical AI tool, or
an embedded AI feature in a SaaS product) is an
operational outsource arrangement. The firm has to do
the same vendor due diligence, the same exit planning
and the same operational resilience analysis it does
for any other material outsource.

**Senior management responsibility is named.** SMCR
already places accountability with named senior managers
for material risks. The regulator has been clear that AI
risk is a material risk; the accountability is
allocated, and the architecture function's design
choices are auditable against that accountability.

These three together set the operating envelope for any
AI deployment in a regulated UK firm.

## What the architecture function has to do

Six implications.

**1. Maintain a live model inventory.** Every AI system
in the firm has to be in a register. The register has
to include the model, the use case, the data sources,
the human-in-the-loop arrangements, the validation
status and the named senior manager accountable. This
isn't a one-off document; it is a continuously
maintained artefact, and the architecture function is
typically the owner.

**2. Design for auditable decision trails.** Where an AI
system contributes to a regulated decision (customer
onboarding, credit, suitability, complaints handling,
trading), the trail of inputs, model outputs and human
override has to be auditable for the regulatory
retention period. This sits on top of conventional
logging and requires deliberate design.

**3. Treat AI vendor selection as an outsource
decision.** Foundation model APIs are operational
outsources. The architecture function should be running
them through the firm's outsource framework rather than
the technology procurement framework. The two have
materially different gates.

**4. Build exit paths.** The outsource framework
requires demonstrable exit paths. For a foundation model
provider that means an alternative provider has to be
viable, the firm's prompts and data sets have to be
portable, and the operational continuity in a
provider-failure scenario has to be tested. Most firms
have not done this work.

**5. Plan for the EU AI Act overlap.** UK firms with EU
customers operate in two regulatory envelopes. The EU
AI Act's high-risk system requirements apply where the
firm's AI system is used to deliver services to EU
customers. The architecture function has to design for
the more demanding of the two regimes, not the easier
one. See [Data residency for AI workloads](/blog/data-residency-ai-workloads-uk-eu/).

**6. Get ahead of MCP and agent governance.** Agent
interoperability standards (MCP in particular) are
maturing faster than the regulatory commentary. A firm
that deploys agents without explicit governance over
which tools they can call, against which data, with
what authority, is exposed. The architecture function
should be the source of this governance, not the legal
function. See [Auditing agent
decisions](/blog/auditing-agent-decisions/) and [MCP is
the most important enterprise standard nobody is
implementing](/blog/mcp-enterprise-standard/).

## What this looks like in delivery

In practice, the firms doing this well share four
characteristics.

A senior architect with explicit accountability for the
AI risk envelope. Not a chief AI officer; a chief
architect who treats AI risk as part of the broader
architecture remit.

A model inventory that is updated as part of the change
process, not as a standalone exercise. The change
control workflow refuses to release a system that
changes the AI use case without an updated register
entry.

An outsource gate that AI vendors actually pass through.
The technology team can recommend; the outsource
committee approves; the architecture function provides
the technical assessment.

A regulatory radar wired into the architecture function.
When the FCA publishes a new portfolio letter or the
PRA issues a new supervisory statement, the architecture
function reads it, assesses it against the firm's
estate, and tables an impact paper to the relevant
committee.

## Where this leaves the firm

The UK regulatory posture on AI is, on the whole,
proportionate. It is not designed to prevent firms
from deploying AI; it is designed to make them deploy
it carefully. The architecture function is the part of
the firm best placed to deliver that carefulness in
practice.

For more on the broader operating model implications,
see also [A reference architecture for agentic AI in the
regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[How AI is reshaping the compliance function: an
architect's view](/blog/ai-compliance-function-architects-view/),
and the existing pieces on [auditing agent
decisions](/blog/auditing-agent-decisions/) and [cursor
in a regulated industry](/blog/cursor-regulated-policy/).
