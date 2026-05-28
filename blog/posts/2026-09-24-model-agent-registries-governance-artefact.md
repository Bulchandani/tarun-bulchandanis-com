---
layout: layouts/post.njk
title: "Model and agent registries: the missing governance artefact"
date: 2026-09-24
excerpt: "Every regulated firm needs a model inventory under SS1/23. Most build one. Few build it well. The next layer up, the agent registry, is barely discussed in the public commentary. A practitioner's view on what both should contain and why neither is optional."
author: "Tarun Bulchandani"
---

SS1/23 is explicit: a regulated UK financial services
firm must maintain a model inventory covering its
material model use. The EBA guidance and the Federal
Reserve's SR 11-7 say substantively the same thing in
the EU and US frameworks. The model risk management
function in every regulated firm now has a regulatory
obligation to keep this artefact current.

In most firms, the artefact exists in some form. In few
firms is it built to a standard that genuinely supports
the governance the regulators expect. And in almost no
firms is there an equivalent registry for agents.

This piece sets out what both registers should contain
and why neither is optional in 2026.

## The model registry

The model registry is the catalogue of every material
model in production use. The contents the regulator
expects, in my reading of the supervisory statements
and the equivalent guidance:

**Identification.** Each model has a unique identifier,
a version, and a lineage trail showing where it came
from. Foundation models are identified by vendor and
version; bespoke models are identified by the firm's
internal versioning scheme.

**Purpose and use case.** What is the model used for?
What decision does it support? Where in the firm's
operating model does it sit?

**Risk classification.** What is the materiality of the
model's use? What are the downside scenarios if it
fails? How is the failure caught?

**Validation status.** Has the model been validated?
When? Against what? Who signed off?

**Performance monitoring.** What metrics are tracked?
What thresholds trigger review? What is the cadence?

**Accountable senior manager.** Named, in the SMCR sense
or equivalent. The person who carries the regulatory
accountability for this model.

**Lifecycle status.** In development, in pilot, in
production, in deprecation, retired. Each transition
has a defined approval workflow.

This list is not exhaustive. The point is that the
registry is operational, not documentary. It supports
ongoing governance, not just an annual exercise.

## What goes wrong

Three patterns recur in firms that have built a model
registry but built it poorly.

**The registry is a snapshot.** It is updated annually
as part of the audit cycle. By the time the audit team
reads it, the firm has changed model versions, deployed
new use cases and retired old ones. The snapshot does
not match the reality.

**The registry has no policy enforcement.** Adding a
new model to production does not require updating the
registry. The discipline relies on people remembering;
in busy delivery cycles, people forget.

**The registry has no observability.** The registry
records the metadata; the live model performance lives
in operational systems and is not connected back to the
registry. The accountable senior manager has no
real-time view of what the registry says they own.

A registry with these characteristics is a compliance
artefact, not a governance artefact. The regulators are
increasingly attentive to the difference.

## The agent registry

An agent registry extends the model registry pattern to
cover AI agents. An agent is more than a model: it has
a prompt configuration, an authorisation policy, a tool
inventory and an operating envelope. Each of these is
material to the agent's behaviour and material to the
governance.

The agent registry contents I have settled on, beyond
the model registry fields:

**Authorisation policy.** What is the agent allowed to
read, call and write? What data sources, what tools,
what systems?

**Prompt configuration.** The system prompt, the
guardrail prompts, the example library. Versioned;
changes flow through change control.

**Tool inventory.** The specific tools the agent has
access to. Mapped to the underlying systems and the
policy engine entries.

**Operating envelope.** The volume the agent is
authorised to handle, the budget cap if applicable, the
escalation thresholds.

**Override interface.** How a human operator overrides
the agent. Named operators, audit trail, escalation
path.

**Incident history.** Every incident attributed to the
agent. Material for trend analysis and for governance
review.

## Why the registry is the source of truth, not a copy

The single most important architectural decision is to
make the registry the source of truth. Not a copy of
data that lives elsewhere; the authoritative record
that the rest of the control plane reads from.

When the policy engine makes an authorisation decision,
it reads from the agent registry, not from a
synchronised copy. When the audit log records an action,
it tags the action against the registry entry, not
against a denormalised label. When the override
interface acts, it acts against the registry entry, not
a copy.

This design decision sounds technical but it is the
single most consequential governance decision. A
registry that is a copy is a record-keeping exercise. A
registry that is the source of truth is the operating
backbone.

## The implementation pattern

Five components.

**The registry data store.** Persistent, queryable,
versioned. Supports atomic updates. Audited.

**The registry API.** Read and write access for the
control plane components, the operations team, and the
audit function. Authentication is non-negotiable.

**The change control workflow.** Updates to the registry
flow through a defined approval process. Some changes
are routine (incident logging); some require senior
management sign-off (authorisation policy changes, new
agents into production).

**The synchronisation pattern.** Where downstream
systems need a local cache of registry data (for
performance reasons), the synchronisation is one-way
from the registry, and the local cache has a defined
freshness expectation.

**The audit and review function.** The registry contents
are reviewed periodically: monthly for lifecycle
transitions, quarterly for risk-classified changes,
annually for the full estate.

## Where this leaves the firm

The model registry is a regulatory obligation. The
agent registry will be, soon. Building either properly
costs less than building it poorly and recovering
later. The architecture function is typically the right
owner.

For firms that have a thin model registry today, my
recommendation is to invest in making the existing
registry the source of truth before extending into the
agent registry. The two layers have different content
but share the same architectural pattern.

Related reading: [A reference architecture for agentic
AI in the regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[Non-human identity in the age of AI
agents](/blog/non-human-identity-ai-agents-ea-pattern/),
[Cyber guardrails for AI agents in regulated
workflows](/blog/cyber-guardrails-ai-agents-regulated/),
[Architectural fitness functions: a practical
framework](/blog/architectural-fitness-functions-framework/),
[Auditing agent decisions](/blog/auditing-agent-decisions/).
