---
layout: layouts/post.njk
title: "Top trends in enterprise architecture 2026"
date: 2026-11-05
excerpt: "Capgemini publishes top-trends pieces for banking, insurance and financial services. BCG runs its AI Radar. PwC publishes its UK economic predictions. Nobody publishes a working architect's top-trends for the enterprise architecture practice itself. This is mine."
author: "Tarun Bulchandani"
---

Capgemini publishes top-trends pieces for banking,
insurance and financial services each year. BCG runs
the AI Radar. PwC publishes its UK economic
predictions. McKinsey runs its State of AI series.
Nobody publishes a working architect's top-trends piece
for the enterprise architecture practice itself.

This is the first annual version of one. It is written
from the practitioner side and is calibrated against
what I see in my own work and in conversations with
peers in the function.

## Trend 1: the EA function carries more direct
delivery weight

In 2024, the EA function was largely a reviewing
function: standards, frameworks, governance reviews,
target-state architecture. By the end of 2026, the
firms taking AI seriously have moved the function into
direct delivery on platform components (agent
platform, identity platform, data platform).

The shift is real and not yet reflected in most EA
function staffing. The function that delivered well in
2024 is under-resourced for the 2026 demand.

## Trend 2: TOGAF and the equivalent frameworks need
adaptation, not replacement

TOGAF and the other established EA frameworks were
designed for an environment with slower change, more
deterministic workloads and clearer ownership
boundaries. The agentic era stretches all three. The
frameworks still work but they need adaptation: faster
iteration of the architecture position, explicit
treatment of stochastic workloads, clearer rules for
agent-driven integration.

The firms claiming TOGAF is dead are overstating the
case. The firms that ignore the adaptation question are
under-stating it.

## Trend 3: the commercial EA tool market is
restructuring

I wrote about this in [the EA tool market has 18
months](/blog/ea-tool-market-18-months/) and the
intervening twelve months have, if anything,
accelerated the shift. The major commercial EA tools
are absorbed into broader platforms or are losing
relevance to AI-augmented internal alternatives. The
EA function has to make a deliberate choice rather than
inherit one.

## Trend 4: architecture decision records become a
living practice again

ADRs were a 2010s discipline that decayed in many
firms. The agentic era has reinvigorated the
practice for a specific reason: AI agents can read ADRs
and use them to inform code generation, refactoring
recommendations, and integration design. ADRs that
were a documentation chore are becoming an operational
artefact.

See [The evolving role of architecture decision records
in the age of generative
AI](/blog/architecture-decision-records-generative-ai/).

## Trend 5: fitness functions become measurable

Architectural fitness functions have been a concept
since the early 2010s but were rarely measured in
practice. The observability investment around agent
platforms has, as a side effect, made many of the
fitness function metrics genuinely measurable. The EA
function can now operate against measured fitness
functions rather than asserted ones. See [Architectural
fitness functions: a practical
framework](/blog/architectural-fitness-functions-framework/).

## Trend 6: enterprise architecture and the regulatory
function move closer together

The convergence is structural. The regulatory function
has more direct dependency on architectural choices
(AI use cases, data residency, agent governance, model
inventory). The architecture function has more direct
exposure to regulatory enforcement (SS1/23, EU AI Act,
operational resilience). The two functions have to
work as one team, not as two adjacent functions.

Firms that have not made this organisational shift will
do so in 2026 or 2027.

## Trend 7: MCP and equivalent standards become the
operating norm

Twelve months ago, MCP was a curiosity. Twelve months
from now, it will be assumed. The firms that have not
adopted it will be the exception, and the cost of being
the exception will be measurable. See [MCP is the most
important enterprise standard nobody is
implementing](/blog/mcp-enterprise-standard/) for the
context.

## Trend 8: the platform-team-vs-product-team boundary
gets redrawn

The DevOps consolidation of the late 2010s blurred the
boundary between platform teams and product teams. The
agentic era has prompted a clearer redraw: platform
teams own the foundational components (model serving,
agent platform, observability, identity); product teams
own the use cases that consume them. The architecture
function has to be explicit about which is which.

## Trend 9: the architecture function develops a
buy-side discipline

The vendor selection decisions in 2026 are larger and
more consequential than in any previous EA cycle.
Foundation model vendors, agent platform vendors, SaaS
vendors with embedded AI. The architecture function has
to develop a buy-side discipline that operates at
the level the decisions require, with proper criteria,
proper diligence and proper negotiation support. Most
firms have not invested in this capability.

## Trend 10: the architect-as-builder model gains
traction

A small but growing number of architecture leaders are
shipping code, not just specifications. The Meridian
and CANVAS systems I built at Sonnedix sit in this
category. The pattern is not appropriate for every
firm or every architect, but where it works it
delivers materially faster than the
specification-driven model. See [the Meridian case
study](/blog/case-study-meridian/) and [the CANVAS case
study](/blog/case-study-canvas/).

## Where this leaves the function

The EA function in 2026 is materially different from
the function in 2022. More delivery weight, more
regulatory exposure, more direct ownership of platform
components, more accountability for vendor decisions.

The firms whose EA functions adapt to this carry the
agentic transition well. The firms whose EA functions
remain in the reviewing posture will struggle.

This piece will be revisited annually. The 2027 version
will mark which of these trends accelerated, which
plateaued, and which were overstated.

Related reading: [The CIO's AI agenda for
2026](/blog/cio-ai-agenda-2026/), [Banking and
financial services architecture top trends
2026](/blog/banking-fs-architecture-top-trends-2026/),
[A reference architecture for agentic AI in the
regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[The commercial EA tool market has 18
months](/blog/ea-tool-market-18-months/), [What an
acquisition-heavy company actually needs from its
architects](/blog/acquisition-heavy-architecture/).
