---
layout: layouts/post.njk
title: "Platform strategy for agentic AI: a working reference architecture"
date: 2026-10-08
excerpt: "Accenture's 'rewriting platform strategy for agentic AI' piece argues the right strategic case. The piece does not, and could not, deliver the architectural specificity a practising architect needs. This is the working platform strategy I use when actually building."
author: "Tarun Bulchandani"
---

Accenture published "rewriting platform strategy for
agentic AI" earlier this year. The article makes the
right strategic case: the existing enterprise platform
strategy was written for a different kind of workload,
and the agentic shift requires a substantive rewrite,
not a marginal update.

The article is, necessarily, written at the strategic
narrative layer. The architecture function that has to
deliver the rewrite needs a different kind of document.
This piece is that document.

## What the existing platform strategy assumed

Five assumptions ran through most enterprise platform
strategies of the last decade.

**1. Workloads are deterministic.** The same input
produces the same output. Where it does not, the
variance is a bug to be fixed.

**2. Authentication is for users.** The principal in
the authorisation flow is a human. Service-to-service
authentication is a special case.

**3. Tools are called by code, in fixed sequences.**
The integration patterns are choreographed at design
time. Runtime composition is rare.

**4. Audit trails are about who saw what.** Read
access, write access, configuration change. The
trail captures human-readable causation.

**5. Capacity planning is about peak load.** The peak
is forecastable from historical patterns and grown
linearly.

The agentic shift breaks all five.

## What the new platform strategy has to assume

The replacement assumptions.

**1. Workloads are stochastic.** The same input does
not produce the same output. The variance is a feature.
The architecture has to support reasoning about
behaviour across the distribution, not just at the
modal output.

**2. Authentication is for principals of multiple
kinds.** Humans, services, agents, customer agents,
delegated principals. The authorisation flow has to
support all of them, with different control surfaces
for each.

**3. Tools are called by agents, in sequences
determined at runtime.** Integration patterns are
composed dynamically. The architecture has to support
this without losing the safety properties.

**4. Audit trails are about what the agent saw, what
it considered, what it decided and why.** Reasoning
traces become first-class data. Storage and
retrievability change.

**5. Capacity planning is about reasoning depth and
breadth.** A single agent invocation can multiply into
many tool calls and many sub-agent invocations. The
capacity model has to account for this non-linearly.

## The five-component platform

The platform that supports these new assumptions has
five components, each with a clear role and a clear
ownership boundary.

**Component 1: The agent runtime.** Where agents
execute. Loads the model, manages the reasoning loop,
invokes tools, returns outputs. This is the layer with
the most third-party options; the architecture function
should treat it as substitutable.

**Component 2: The tool gateway.** Mediates every tool
call from every agent. Enforces authorisation, logs the
call, applies rate limits, handles failures. This is
the layer with the most leverage; the architecture
function should own it.

**Component 3: The agent registry.** Source of truth
for every agent in the firm. Configuration, purpose,
authorisation policy, ownership, lifecycle status. See
[Model and agent
registries](/blog/model-agent-registries-governance-artefact/).

**Component 4: The observability layer.** Captures
every reasoning trace, every tool call, every output.
Indexed for query, retained for the regulatory window.
This is the largest data layer the platform produces;
the architecture function should design for the volume
explicitly.

**Component 5: The policy and override surface.**
Where humans intervene. Policy authors define what
agents can do; operators override what specific
agents do at runtime; auditors review what happened
after the fact. Three distinct user roles, one
underlying control plane.

## The ownership boundaries

The platform strategy has to be explicit about who owns
which component.

**Architecture function:** Tool gateway, agent registry,
observability layer, policy and override surface. These
are the platform components where firm-wide consistency
matters and where the architecture function carries the
authority.

**AI function or use case teams:** Agent runtime and the
specific agents on top. These are where the use case
diversity lives and where the architecture function
should set standards rather than centralise delivery.

**Operations function:** Day-to-day operation of the
platform. SLA management, incident response, capacity
planning.

**Compliance and risk:** Policy authorship, audit
review, model and agent inventory governance.

The boundaries are not always cleanly observed in
practice. The architecture function's job is to clarify
them and to defend them.

## What goes wrong

Three failure patterns recur in firms attempting this
rewrite.

**The strategy is written but not staffed.** The
architecture function publishes the platform strategy,
the leadership team endorses it, and then no team is
funded to build the platform components. The use case
teams build bespoke equivalents inside their own
deployments. Within a year, the firm has multiple
incompatible agent stacks.

**The platform is built but the use cases are not
governed onto it.** The platform exists; the use case
teams deploy outside it because the governance does not
force them onto it. The platform becomes a
sub-scale exhibit rather than the operating backbone.

**The platform is built but the operating model is
not.** The platform runs; the day-to-day operations are
under-resourced; incidents accumulate; trust in the
platform erodes. The use case teams start building
their own again.

## How to deliver the rewrite

Three sequencing decisions matter.

**Build the tool gateway and observability layer
first.** These are the highest-leverage components and
the ones most expensive to retrofit. A single use case
team can be the first internal customer.

**Make the agent registry the source of truth before
scaling.** A platform that scales without the registry
becomes unmanageable inside twelve months. Build the
registry alongside the first production deployment.

**Govern the use cases onto the platform from day one.**
The first three or four agent deployments establish the
operating norm. If they happen outside the platform,
the platform is a long-term fiction.

## Where this leaves the firm

Platform strategy for agentic AI is the highest-leverage
architectural decision the firm makes in 2026. The
firms that get this right will deliver multiple agent
capabilities cheaply and safely over the next three
years. The firms that get this wrong will spend the
same period rebuilding.

Related reading: [A reference architecture for agentic
AI in the regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[MCP is the most important enterprise standard nobody is
implementing](/blog/mcp-enterprise-standard/),
[Model and agent
registries](/blog/model-agent-registries-governance-artefact/),
[Cyber guardrails for AI agents in regulated
workflows](/blog/cyber-guardrails-ai-agents-regulated/),
[The CIO's AI agenda for 2026: an architect's
read](/blog/cio-ai-agenda-2026/).
