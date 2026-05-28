---
layout: layouts/post.njk
title: "Agentic commerce: the integration architecture nobody is talking about"
date: 2026-08-13
excerpt: "Accenture has published 'the dawn of the agentic deal' and 'is your company ready for agentic commerce'. PwC has 'real change agents'. BCG has a $200B agentic AI opportunity piece. Every framing is at the value layer. The integration architecture underneath is where the real work sits."
author: "Tarun Bulchandani"
---

The consultancy discourse on agentic commerce has, in
the last twelve months, settled into a familiar shape.
Accenture's "dawn of the agentic deal" and "agentic
commerce" pieces. PwC's "real change agents". BCG's
$200 billion agentic AI opportunity for technology
service providers. McKinsey's banking and marketing
workflow pieces. Every framing is at the value layer:
what the agents will do, what the business model looks
like, how the firm captures the upside.

The integration architecture underneath this is where
the actual work sits. That layer is conspicuously absent
from the public commentary.

This piece is for the architects who have to build it.

## What agentic commerce actually requires

The shape is straightforward once you specify it. An
agentic commerce flow involves an agent (either acting
for the customer or acting for the firm) that:

1. Discovers what is available
2. Negotiates terms
3. Confirms intent
4. Triggers fulfilment
5. Settles payment

Each step has to interact with at least one back-office
system. In a regulated firm, each step also has to leave
an audit trail, has to respect customer consent, has to
support reversibility, and has to be observable in
production.

Most enterprise estates are not built to support this
flow.

## The five integration layers

Five layers turn up in every working agentic commerce
implementation.

**1. The catalogue layer.** Whatever the agent
discovers, it needs structured access to. For most
firms, this means an MCP-compliant catalogue server that
exposes products, prices, availability, terms and
constraints in a format agents can read directly. The
existing e-commerce APIs are usually not sufficient; they
are designed for browser-driven UI, not agent-driven
exploration.

**2. The negotiation layer.** Where the agent has
authority to negotiate (volume discounts, structured
terms, custom payment arrangements), the negotiation has
to be bounded. The boundaries are commercial decisions
the firm has to make explicitly and that the architecture
has to enforce. An agent that can offer arbitrary
discounts will, eventually, offer arbitrary discounts.

**3. The consent and confirmation layer.** Before the
transaction commits, the customer (or the customer's
agent, if delegated) has to have confirmed. The
confirmation has to be cryptographically auditable, has
to be linked to the specific transaction, and has to be
retrievable on demand for the regulatory retention
period.

**4. The fulfilment layer.** The transaction triggers
back-office processes. For physical goods, this means
the inventory and logistics systems. For services, this
means the service-provisioning systems. For financial
products, this means the booking and settlement systems.
Each of these has to accept agent-originated requests
and treat them with the same rigour as human-originated
requests.

**5. The settlement layer.** Payment has to settle. For
regulated firms, this includes KYC and AML checks even
where the customer is an existing customer. The
settlement has to be reversible during the regulatory
window for dispute, and the reversal has to flow back
through all four upstream layers cleanly.

## Where the architecture choices land

Three choices determine whether the implementation works
or breaks under load.

**Catalogue: MCP or custom?** The MCP standard is
maturing. A firm building a custom catalogue interface
for agents is building a bespoke layer that will need
revisiting in 12-18 months. A firm building against MCP
is betting on a standard that may or may not stick. The
defensible position, in my view, is to expose both: a
custom interface for the firm's own agent stack and an
MCP-compliant interface for third-party agents.

**Negotiation: in-band or out-of-band?** A negotiation
that happens inside the catalogue interaction is
operationally cleaner but commercially more constrained.
A negotiation that happens out-of-band (the agent
contacts a sales workflow that may include human
intervention) is commercially more flexible but
operationally harder to audit. The choice depends on the
firm's product mix and the regulatory envelope.

**Settlement: same-rails or new-rails?** Settling agent
transactions on the same rails as human transactions
keeps the back office consistent but inherits the
back-office's existing constraints. Building new rails
(agent-specific settlement) keeps the agent flow clean
but creates a second class of transaction that has to
be reconciled. Most firms should default to same-rails
with explicit agent-flag instrumentation.

## The audit trail problem

In a regulated firm, every step of an agentic commerce
flow has to be auditable. The trail has to capture:

- What the agent saw at each step (catalogue contents,
  terms, availability)
- What the agent recommended or attempted
- What the customer or principal confirmed
- What the back-office systems received and processed
- What the settlement layer cleared

Most existing systems do not log at the granularity this
requires. The architecture function has to specify the
logging contract before deployment, not retrofit it
afterwards.

## What this looks like in practice

I have been building a related system (CANVAS, the
internal application and vendor approval workflow at
Sonnedix) over the last 18 months. It is not exactly
agentic commerce but it shares the architectural shape:
agent-mediated decisions with full audit trails and
reversibility. See [the CANVAS case
study](/blog/case-study-canvas/) for the underlying
patterns.

## Where this leaves the firm

Agentic commerce is operationally heavier than the
consultancy framing implies. The value capture is real;
the integration work to get there is non-trivial; the
architecture choices have multi-year consequences.

For firms that are starting this work in 2026, my
recommendation is to invest in the catalogue layer first
(MCP-compliant where possible), to build the audit trail
contract before the first agent goes into production,
and to treat the negotiation layer as a deliberate
commercial decision rather than a default vendor
configuration.

Related reading: [MCP is the most important enterprise
standard nobody is
implementing](/blog/mcp-enterprise-standard/),
[Auditing agent decisions](/blog/auditing-agent-decisions/),
[CANVAS: the approval workflow no commercial product
covers](/blog/case-study-canvas/), [A reference
architecture for agentic AI in the regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/).
