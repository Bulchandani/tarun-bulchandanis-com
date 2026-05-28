---
layout: layouts/post.njk
title: "Non-human identity in the age of AI agents: an enterprise architecture pattern"
date: 2026-09-17
excerpt: "KPMG's 'invisible access, visible risk' piece gestures at the problem. None of the major firms has published a defensible architectural pattern. The non-human identity problem is now the most under-addressed gap in enterprise identity architecture."
author: "Tarun Bulchandani"
---

Non-human identity is the identity assigned to a system,
a service, an automated process or, increasingly, an AI
agent. The category has existed for decades; the
treatment in most enterprises has been informal. Service
accounts are created ad-hoc, shared across teams,
rotated rarely, and revoked when somebody remembers to
do so.

The agentic shift has made this informal treatment
untenable. An AI agent is, structurally, a non-human
identity. It needs to authenticate, it needs to be
authorised against specific resources, it needs to be
auditable, and it needs to be revocable. The legacy
service-account treatment does not deliver any of these
reliably.

This piece sets out the enterprise architecture pattern
I use for non-human identity in environments where AI
agents are deployed.

## The legacy problem

Five legacy patterns recur in most enterprise estates.

**Shared credentials.** A service account whose password
or API key is shared across multiple systems and teams.
When the credential is compromised or needs rotation,
identifying the dependent systems requires investigation.

**Long-lived credentials.** API keys that have not been
rotated in years. The owner has moved on, the team has
restructured, and the keys still grant production access.

**Over-privileged credentials.** A service account
created with broad access at the time of deployment
because narrowing the access was operationally
expensive. The broad access persists long after the
original need.

**Undocumented credentials.** Service accounts that
exist in production but do not appear in any inventory.
The accounts are discovered during audit and the
ownership is contested.

**Credentials without lifecycle.** No defined
creation process, no defined renewal cycle, no defined
revocation process. The credentials persist indefinitely
unless somebody actively removes them.

Each of these is a discrete control failure. Together
they create the conditions in which an AI agent
deployment can quietly accumulate authority well beyond
its operating need.

## The pattern for AI agents

Six components turn up in every working implementation.

**1. The agent is a first-class identity.** The agent
has its own identity in the identity provider, not a
shared service account. The identity is created
deliberately, scoped explicitly, and lifecycle-managed.

**2. The identity carries metadata.** The agent
identity record includes: the agent's purpose, its
authorisation policy, its accountable owner, its model
configuration, its lifecycle status. This metadata is
the source of truth referenced by the rest of the
control plane.

**3. The credentials are short-lived.** The agent
authenticates using short-lived tokens (typically 15
minutes to a few hours) issued against the agent's
identity. Long-lived API keys are rejected as a control
pattern.

**4. The authorisation is policy-driven.** The
agent's access to data, tools and systems is enforced
by a policy engine that reads from the agent identity
record. Changes to authorisation flow through the
identity record, not through ad-hoc grant changes on
the dependent systems.

**5. The lifecycle is automated.** Agent identity
creation follows a defined approval workflow. Renewal
is tied to the agent's lifecycle status. Revocation is
automated when the agent reaches end-of-life or is
flagged in incident response.

**6. The audit is end-to-end.** Every authentication,
every authorisation decision, every resource access is
logged against the agent identity. The audit trail is
retrievable for the regulatory retention period.

## The implementation pattern

The pattern lands in the architecture in three places.

**The identity provider.** The firm's existing IDP
(Entra ID, Okta, Auth0, etc.) extended to support
non-human principals with the metadata above. Most
mature IDPs support this; the work is in the
configuration and the discipline.

**The policy decision point.** A policy engine (OPA,
Cedar, a commercial equivalent) that consumes the agent
identity record and makes authorisation decisions. The
engine is auditable independently of the agent runtime.

**The agent platform.** The agent runtime acquires
short-lived tokens via the IDP, presents them at the
policy decision point, and operates within the
authorised envelope. The agent does not hold long-lived
credentials.

## The transition pattern

Most firms have legacy non-human identity that does not
conform to this pattern. The transition is operationally
heavy and usually staged.

**Stage 1: inventory.** Identify every non-human
identity in the estate. Most firms find more than
expected.

**Stage 2: classification.** Classify each identity by
risk and by amenability to the new pattern. Some legacy
identities will be replaced; some will be retired; some
will be wrapped.

**Stage 3: new identities use the new pattern.** From
a defined date, every new non-human identity is created
under the new pattern. This includes every new AI
agent.

**Stage 4: high-risk legacy identities migrate.** The
identities with the highest access privileges and the
largest blast radius are migrated first.

**Stage 5: the long tail migrates over an extended
timeline.** Most firms will have legacy non-human
identities in the estate for years. The discipline is
to prevent the legacy pattern from being extended into
new use cases.

## Where this leaves the firm

The non-human identity problem is one of the most
under-managed control gaps in most enterprise estates.
The agentic shift has elevated it from a hygiene issue
to a material control. The architecture function is
typically the right owner of the migration to a
deliberate pattern.

For firms doing this work in 2026, my recommendation is
to lock the new pattern for all new identities first,
then prioritise the migration of high-risk legacy
identities, and accept that the long tail will resolve
over multiple years.

Related reading: [Identity-first security: rethinking
the enterprise
perimeter](/blog/identity-first-security-perimeter/), [A
reference architecture for agentic AI in the regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[Cyber guardrails for AI agents in regulated
workflows](/blog/cyber-guardrails-ai-agents-regulated/),
[Model and agent registries: the missing governance
artefact](/blog/model-agent-registries-governance-artefact/).
