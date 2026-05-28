---
layout: layouts/post.njk
title: "Data residency for AI workloads: a working pattern for UK and EU enterprises"
date: 2026-10-01
excerpt: "BCG's 'AI sovereignty is an illusion, resilience is real' piece reframes the debate well. The architecture function still has to translate the reframing into specific design choices. A working pattern for data residency in AI workloads for UK and EU enterprises."
author: "Tarun Bulchandani"
---

BCG published "for most countries, AI sovereignty is an
illusion. Resilience is real" earlier this year. The
piece is a useful reframing of the public debate: pure
sovereignty over AI infrastructure is, for most
countries, not achievable at any reasonable cost, but
operational resilience under foreign-vendor dependency
is achievable and is the real engineering question.

The reframing is correct at the level it operates. The
architecture function still has to translate it into
specific design choices for specific workloads. This
piece sets out the working pattern I use for UK and EU
enterprise AI workloads.

(For the political framing of the broader debate, see
my earlier piece on [why sovereign AI is mostly
theatre](/blog/sovereign-ai-theatre/).)

## The data flows that matter

Five data flows have to be modelled for any AI workload
in a UK or EU enterprise.

**1. Training data.** Data used to train or fine-tune
the model. In most regulated enterprises, this is the
firm's own customer or operational data, and the
residency requirements are explicit (GDPR, the FCA's
operational resilience rules, the EBA's outsourcing
guidance).

**2. Inference input.** Data sent to the model at
inference time. Customer queries, transaction details,
document content. The residency requirements that
apply to the training data typically apply here too;
the architecture sometimes forgets this.

**3. Inference output.** Data returned from the model.
For most use cases this is derivative of the input and
inherits the residency requirements, but for some use
cases (synthesised content, summarisation that
includes new material) the output deserves its own
residency analysis.

**4. Prompt and instruction data.** The system
prompts, the guardrail prompts, the example libraries.
These are the firm's intellectual property and the
firm's risk surface. They deserve their own residency
treatment.

**5. Audit and observability data.** Logs of model
calls, agent decisions, tool invocations, override
events. The residency for these is sometimes treated
as a technical concern; in regulated firms it is a
compliance concern.

## The residency decision matrix

For each of the five data flows, the firm has four
deployment options.

**Option A: Public API of the vendor's home region.**
The model runs on the vendor's infrastructure, in the
vendor's home country. Lowest cost, lowest control,
most permissive vendor terms.

**Option B: Public API in a vendor-managed regional
deployment.** The vendor runs the model in an EU or UK
region. Costs more, gives some residency control,
typically reasonable vendor terms.

**Option C: Private deployment in vendor-managed
infrastructure within the firm's residency
requirement.** The vendor provisions dedicated capacity
in the right jurisdiction. Higher cost, materially
better control, custom contractual terms.

**Option D: Firm-managed deployment.** The firm runs
the model itself, on its own infrastructure or on a
hyperscaler tenancy under its control. Highest cost,
highest control, full responsibility for the
operational characteristics.

The matrix is not "pick one"; it is "pick one per data
flow per workload". A typical regulated workload might
land at Option B for inference input, Option C for
training data and prompt configuration, and Option D
for audit data.

## The five design rules

Five rules I apply to every data residency design.

**1. Inference data follows the regulatory framework of
the customer, not the firm.** A UK firm serving an
Italian customer has to apply EU residency rules to
that customer's data flow, regardless of where the
firm is headquartered. The architecture has to be able
to discriminate.

**2. Audit data residency matches the regulatory
retention.** If the firm has to retain audit data for
seven years in a defined jurisdiction, the audit data
flow has to land in that jurisdiction. Vendor SLAs that
move audit data to other regions for "operational
purposes" are not acceptable.

**3. The exit path has to be tested.** Operational
resilience is not theoretical. The firm has to be able
to fail over from Option A to Option B, or from Option
B to Option C, within a defined RTO. This needs to be
exercised in production-like conditions.

**4. The prompt configuration is treated as
intellectual property.** Where the firm has invested in
prompt engineering, the prompts have to be protected as
firm IP. Vendor terms that grant the vendor rights to
use the prompts have to be negotiated out.

**5. The model substitution path is explicit.** If
the chosen model is no longer available (vendor
withdrawal, regulatory action, price change beyond
acceptable thresholds), the workload has to be
substitutable to an alternative. This is a design
constraint, not an afterthought.

## What the working pattern looks like

For a typical regulated UK or EU enterprise in 2026, the
working pattern I see deliver is:

- **Inference input and output:** Vendor-managed
  regional deployment (Option B) for the bulk of
  workloads, with private deployment (Option C) for the
  most sensitive use cases.
- **Training and fine-tuning data:** Private deployment
  (Option C) or firm-managed (Option D), depending on
  the sensitivity and the volume.
- **Prompt configuration:** Private deployment or
  firm-managed, with explicit IP protections.
- **Audit and observability data:** Firm-managed
  (Option D), in the jurisdiction of the regulatory
  retention requirement.

This is more expensive than the path-of-least-resistance
configuration (everything on the public API), and
materially less expensive than the maximalist
configuration (everything firm-managed). The trade-off
has to be deliberate.

## Where this leaves the firm

Data residency for AI workloads is an architectural
decision, not a policy decision. The architecture
function has to model the data flows, choose the
deployment options per flow, and design the operational
resilience.

For firms doing this work in 2026, my recommendation is
to model the data flows explicitly before any vendor
selection, to negotiate the vendor terms against the
flow analysis, and to budget for the higher-control
options for the data flows that actually need them.

Related reading: [Sovereign AI is mostly
theatre](/blog/sovereign-ai-theatre/), [A reference
architecture for agentic AI in the regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[What UK financial services regulation means for AI
architecture in
2026](/blog/uk-fs-regulation-ai-architecture-2026/),
[Identity-first security: rethinking the enterprise
perimeter](/blog/identity-first-security-perimeter/).
