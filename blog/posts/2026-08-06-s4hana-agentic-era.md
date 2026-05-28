---
layout: layouts/post.njk
title: "S/4HANA in the agentic era: where the enterprise architecture function sits"
date: 2026-08-06
excerpt: "McKinsey's S/4HANA alliance, BCG's partnership with Conduct, Accenture's SAP practice, EY's S/4HANA transformation work. Everyone is publishing on ERP modernisation in the agentic era from the advisor's vantage. The architecture function's read of the same shift is different and operationally more specific."
author: "Tarun Bulchandani"
---

The major consultancies have, over the last twelve
months, all converged on the same theme. McKinsey
formalised its SAP alliance and ran the Value Finder
work; BCG announced its Conduct partnership in May 2026
specifically targeted at AI-driven ERP transformation;
Accenture continues to run the largest SAP practice in
the world; EY published the "S/4HANA transformation
success: the human factor" piece a few months back.

The collective message: ERP transformation is being
reshaped by the agentic AI shift, and the firms that get
this right will do meaningfully better than the firms
that treat the AI layer and the ERP layer as separate
programmes.

The architecture function's read of the same shift is
different. This piece sets out where the EA function sits
when an S/4HANA programme has to land in an agentic
environment.

## What the consultancy framing gets right

Two things, in my reading.

**The integration layer is the leverage point.** The
single biggest mistake in a legacy ERP estate is to
treat the ERP as a black box that exposes a small set of
interfaces and otherwise stays untouched. The agentic
shift makes this position untenable: agents need to
read from and write to the ERP in ways the original
integration design never anticipated. The firms that
will deliver the value are the ones that re-architect
the integration layer deliberately.

**The data layer is the second leverage point.** S/4HANA
moves the firm to a single in-memory data platform. The
firms that deliver the value treat this as the
foundation for the analytical layer, not just the
operational one. The agentic shift compounds the value:
agents reading from a clean canonical data layer
operate noticeably better than agents reading from a
fragmented one.

## What the consultancy framing misses

Three things, in my experience having delivered the
architecture of a CHF 350M+ S/4HANA programme.

**The change control layer is structurally
underweighted.** Most S/4HANA programmes treat change
control as a project-phase concern. In the agentic era,
change control becomes a steady-state concern: every
model update, every agent capability change, every
integration change has to flow through governance that
accounts for the AI-specific risks. The firms that will
get this right are building this discipline into the
operating model from day one, not retrofitting it.

**The exit path is rarely modelled.** A firm that
deploys agents against S/4HANA has, in practice,
chosen a coupling between the SAP estate, the chosen
model provider and the chosen agent framework. The cost
of switching any of those after the fact is non-trivial.
The architecture function should be modelling the exit
paths during design, not after.

**The lights-on cost of the agentic layer is missing.**
The consultancy commentary covers the value capture
from agents; it is largely silent on the operating
cost. In a regulated firm, the agentic layer adds:
ongoing model inventory maintenance, ongoing prompt
governance, ongoing exit path testing, ongoing model
performance monitoring, ongoing audit trail review.
These are non-trivial steady-state costs the EA function
has to budget for.

## Where the EA function sits in the programme

Four explicit responsibilities.

**1. The integration architecture.** The EA function
owns the design choice between embedded SAP agents,
agents that call into S/4HANA via the SAP-published
APIs, and agents that read from a derived data layer.
The trade-offs are real and they affect the operating
model for years.

**2. The data model.** The S/4HANA data model becomes
the operational data model. The EA function owns the
question of what gets canonical status, what gets
derived, what gets duplicated and what gets archived.
The agentic layer compounds the importance of this
choice.

**3. The agent capability boundary.** Which business
processes does the firm allow agents to operate
against? Which require human-in-the-loop? Which are
agent-blocked entirely? The EA function should be
authoring this, not inheriting it from the AI vendor's
default configuration.

**4. The vendor lock-in posture.** The S/4HANA programme
locks the firm to SAP. The agentic layer can either
compound that lock-in or partially offset it depending
on where the integration sits and which standards the
agentic layer uses (MCP being the most relevant). The
EA function should be running this trade-off explicitly.

## What the right operating model looks like

The S/4HANA programmes that land well in the agentic era
share three characteristics.

A small architecture cell embedded in the programme,
with explicit authority over the integration, data and
agent boundary decisions. Not a steering committee; a
working group with delivery authority.

A documented architecture position that the programme
delivers against. Updated periodically, but not
re-litigated continuously. Most programmes underweight
this.

A regulatory and risk function that engages with the
architecture position rather than reviewing it at end
of phase. The agentic layer makes after-the-fact review
materially worse than concurrent engagement.

## Where this leaves the firm

ERP transformation in the agentic era is a meaningfully
different programme from ERP transformation five years
ago. The EA function has more weight to carry; the
integration and data choices have larger downstream
implications; the steady-state cost of governance is
higher.

For the firms doing this work now, my recommendation is
to invest disproportionately in the architecture cell
during the design phase, document the position
carefully, and budget for the steady-state cost of
agentic governance from day one.

Related reading: [Lessons from large-scale ERP
transformation](/blog/large-scale-erp-transformation-lessons/),
[A reference architecture for agentic AI in the
regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[MCP is the most important enterprise standard nobody is
implementing](/blog/mcp-enterprise-standard/),
[Architectural fitness functions: a practical
framework](/blog/architectural-fitness-functions-framework/).
