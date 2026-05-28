---
layout: layouts/post.njk
title: "Cyber guardrails for AI agents in regulated workflows: a reference architecture"
date: 2026-08-20
excerpt: "EY's 'reimagine your cyber guardrails to accelerate AI value' piece sets the right strategic direction. The architecture function still has to translate that into specific controls. A practitioner's reference architecture for AI agents operating inside regulated workflows."
author: "Tarun Bulchandani"
---

EY published "reimagine your cyber guardrails to
accelerate AI value" in early 2026. The piece argues
that conventional cyber controls were designed for
human-driven workflows and need adaptation for the
agentic era. The strategic argument is correct. The
architecture function still has to translate that into
specific controls.

This piece sets out the reference architecture I use for
AI agents operating inside regulated workflows. The
focus is on the layer where the architecture function
actually has design choice: not the model itself, not
the business process, but the control surface in
between.

## The four guardrail categories

Every agent in a regulated workflow needs controls in
four categories. The categories are not independent;
they reinforce each other and have to be designed
together.

**1. Identity guardrails.** The agent has to have a
distinct identity, separate from the human operator
who configured it or the customer it acts for. The
identity has to be auditable, has to support
authorisation policy, and has to support revocation. See
[Non-human identity in the age of AI
agents](/blog/non-human-identity-ai-agents-ea-pattern/).

**2. Authority guardrails.** The agent's authority has
to be bounded. It can read from a defined set of data
sources. It can call a defined set of APIs. It can
write to a defined set of systems. It can spend a
defined budget. Each of these has to be explicit in the
authorisation policy and enforced at the runtime
boundary, not just at the agent configuration layer.

**3. Observation guardrails.** Every action the agent
takes has to be observable. The observation has to be
sufficient to reconstruct the agent's reasoning, not
just its output. This is where the audit trail design
sits.

**4. Reversal guardrails.** Where the agent's actions
can be reversed (financial transactions, customer
communications, system changes), the reversal path has
to be designed alongside the forward path. Where the
actions cannot be reversed (cryptographic operations,
external API calls, regulatory submissions), the agent
should not be allowed to take them without explicit
human-in-the-loop confirmation.

## The runtime architecture

Six components turn up in every working implementation.

**Agent registry.** Each agent has a record. The record
includes the agent's purpose, its authorisation policy,
its accountable senior manager, its model and prompt
configuration, its lifecycle status, and its incident
history.

**Policy engine.** Authorisation decisions are made by
the policy engine, not by the agent itself. The agent
makes a request; the policy engine returns allow or
deny. The policy engine is auditable independently of
the agent.

**Tool gateway.** Agents do not call tools directly.
They call the tool gateway, which enforces the policy,
logs the call and forwards to the underlying tool if
allowed. This is where MCP integrations land in
practice.

**Audit log.** Every action, every decision, every tool
call lands in an immutable audit log. The log is
queryable, retrievable for the regulatory retention
period, and tamper-evident.

**Override interface.** Human operators can override
agent decisions. The override is logged, named, and
auditable as a first-class event.

**Incident workflow.** When an agent does something
unexpected (a tool call denied, an unusual reasoning
trace, a quality threshold breach), the incident
workflow notifies the accountable senior manager and
captures the root cause.

## The threat model

Three threats matter and have to be designed against.

**Prompt injection.** An agent reading customer-provided
content (an email, a document, a chat message) can be
manipulated by carefully crafted content into taking
actions the operator did not intend. The mitigation is
in the authority guardrail (the agent does not have
authority to do dangerous things in the first place) and
in the observation guardrail (unusual actions trigger
review before completion).

**Tool confusion.** An agent in a complex environment
with many tools can call the wrong tool against the
wrong data. The mitigation is in the policy engine
(strict scope enforcement) and in the tool gateway
(per-tool monitoring for anomalous call patterns).

**Cascading agent calls.** Agents calling other agents
can create dependency chains that are hard to audit.
The mitigation is in the audit log (the full chain has
to be reconstructable) and in the policy engine (chain
depth is bounded).

## Where this lands in delivery

A reference architecture is only useful if it can be
delivered. The architectures I see working in practice
share three characteristics.

**The architecture is platformised.** The agent
registry, policy engine, tool gateway and audit log are
shared services across the firm's agents, not bespoke
to each use case. The cost-to-build of the first agent
is high; the cost-to-build of the tenth agent is
modest.

**The threat model is documented.** The threats above
and the firm-specific additions are explicit. Each
guardrail control is mapped to the threats it
addresses. The mapping is reviewed periodically.

**The accountability is named.** Each agent has an
accountable senior manager. The SMCR framework already
requires this for regulated UK firms; the architecture
should reinforce it rather than work around it.

## Related work

For more on the broader operating model, see [A
reference architecture for agentic AI in the regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[Auditing agent decisions](/blog/auditing-agent-decisions/),
[Identity-first security: rethinking the enterprise
perimeter](/blog/identity-first-security-perimeter/),
[How AI is reshaping the compliance function: an
architect's view](/blog/ai-compliance-function-architects-view/).
