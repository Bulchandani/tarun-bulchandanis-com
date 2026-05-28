---
layout: layouts/post.njk
title: "How AI is reshaping the compliance function: an architect's view"
date: 2026-08-27
excerpt: "KPMG's 'AI is poised to reshape compliance functions' piece sketches the strategic direction. The architecture function's read is more specific: which compliance workflows are amenable to agent support, which require explicit guardrails, and where the audit-trail design choices land."
author: "Tarun Bulchandani"
---

KPMG published "how AI is poised to reshape compliance
functions" earlier this year. The piece argues that the
compliance function is one of the highest-value
candidates for agentic AI augmentation: high volume of
structured work, clear rules, auditable outcomes, and
acute pressure on cost.

The argument is correct at the level the article
operates. The architecture function's read of the same
material is more specific: which compliance workflows
are genuinely amenable to agent support, which require
explicit guardrails, and where the audit-trail design
choices land.

## The workflows that are obvious candidates

Three workflow shapes show up well.

**Document review against a policy.** The agent reads a
document (a contract, a marketing claim, a customer
communication, a transaction record), compares it
against a defined policy, and flags compliance issues.
The agent's output is a recommendation; the human
compliance officer signs off. This shape is broadly
mature; multiple production deployments exist.

**Filing preparation.** The agent assembles a regulatory
filing from underlying data sources, formats it
according to the regulator's published rules, and
prepares it for human review. The human reviews,
adjusts where needed, and submits. Most of the heavy
lift sits in the data assembly and the format
compliance; the agent does well on both.

**Customer complaint triage.** The agent reads a
customer complaint, classifies it against the firm's
complaint taxonomy, routes it to the appropriate
handler and drafts an initial response. The human
handler reviews the draft and sends. This shape is
operationally mature in retail financial services.

## The workflows that require explicit guardrails

Three workflow shapes are more delicate.

**Final-decision workflows.** Where the compliance
function makes a final decision (a suspicious activity
report determination, a sanctions screening match
adjudication, a regulatory breach finding), the agent
should support but not decide. The architecture has to
make this distinction explicit: the human signs the
decision, the agent provides the reasoning trail, and
the audit log records both.

**Investigation workflows.** The agent assembles
material relevant to a compliance investigation. The
risk is that the agent's selection biases the
investigation. The mitigation is in the audit log: the
investigator can see exactly what the agent considered
and what it did not.

**Cross-customer pattern detection.** Where the agent
operates across customer data (transaction monitoring,
market abuse detection), the data residency and access
controls become more demanding. The architecture has to
respect the data segregation the firm has committed to
in its regulatory filings.

## The workflows the architecture function should resist

Two workflow shapes I would currently keep agents out
of in regulated firms.

**Sanctions list matching.** The downside of a false
negative is large; the matching rules are precise; the
existing systems already perform well. The marginal
value of an agent layer is small and the risk of
introducing soft errors is real. Stay with
rule-based systems with human review on close matches.

**Senior management attestation.** Where SMCR or
equivalent regulation requires named senior manager
attestation, an agent should not be drafting that
attestation. The attestation is the named manager's
direct statement; tooling can support the data
gathering but should not draft the statement itself.

## The audit-trail problem

The single largest architecture decision is the audit
trail. In a compliance workflow, the trail has to
support three audiences over the regulatory retention
period:

- The internal audit function, reviewing periodically
- The external auditor, reviewing annually
- The regulator, reviewing on inspection or after an
  incident

The trail has to capture what the agent saw, what it
recommended, what the human reviewed, what the human
decided, and any divergence between the recommendation
and the decision. The retention period is typically
five to seven years and may extend to ten in some
regulatory contexts.

Most existing systems do not log at this granularity.
The architecture function has to specify the logging
contract before deployment, and the operational
discipline to maintain it has to be funded.

## The operating model implication

A working AI-augmented compliance function has three
roles the firm may not currently have.

**Agent operator.** The human in the loop. Reviews
recommendations, decides outcomes, captures rationale.
This is an evolved compliance officer role, not a new
one.

**Agent supervisor.** Reviews agent performance,
identifies systematic errors, manages the model and
prompt configuration. This is closer to a quant role
than a compliance role; the firm has to source it
carefully.

**Accountable senior manager.** SMCR or equivalent
already requires this. The named senior manager has to
have visibility of how the AI-augmented workflows
operate and has to be able to defend the design
choices in front of the regulator.

The architecture function should be designing the
operating model alongside the technical architecture,
not afterwards.

## Where this leaves the firm

AI in compliance is a real opportunity. The architecture
choices determine whether it lands as a productivity
gain or as a regulatory exposure. The firms that get
this right are the ones where the architecture function
treats the compliance use case with the same rigour as
any other regulated workflow: explicit guardrails,
defensible audit trails, named accountabilities and
deliberate operating model design.

Related reading: [Auditing agent
decisions](/blog/auditing-agent-decisions/), [Cyber
guardrails for AI agents in regulated
workflows](/blog/cyber-guardrails-ai-agents-regulated/),
[What UK financial services regulation means for AI
architecture in
2026](/blog/uk-fs-regulation-ai-architecture-2026/),
[Non-human identity in the age of AI
agents](/blog/non-human-identity-ai-agents-ea-pattern/).
