---
title: "Architectural fitness functions: a practical framework for measuring enterprise architecture health"
slug: architectural-fitness-functions-framework
date: 2026-07-02
excerpt: "Enterprise architecture has long been criticised for the difficulty of measuring its impact. Architectural fitness functions offer a structured approach to this challenge. A working framework, with examples across six categories, for leaders looking to bring measurement discipline to their architecture practice."
source: own
---

## Executive summary

The persistent challenge facing enterprise architecture functions
is not the absence of strategy or the absence of documentation, but
the difficulty of demonstrating measurable impact. A capability
model is not a metric. A target operating model is not a measurement.
A roadmap is a plan, not an outcome.

Architectural fitness functions — a concept introduced by Neal Ford,
Rebecca Parsons and Patrick Kua in their work on evolutionary
architecture — provide a structured response to this challenge. A
fitness function is a measurable, ideally automated indicator of
whether a given architectural property is being preserved or
improved over time. The concept is not new; the practice, in most
organisations I have observed, remains immature.

This piece sets out a practical framework, organised across six
categories, that an architecture leader can adopt to bring
measurement discipline to their function. Each category includes
specific example metrics, the data sources required to compute
them, and a brief commentary on common pitfalls.

## The case for fitness functions

The traditional measurements applied to architecture functions —
project delivery times, system uptime, vendor consolidation
savings — have several shortcomings. They are outcome measures of
the broader IT function rather than of the architectural choices
specifically. They are often lagging indicators by some margin.
And they tend to reward stability over improvement, which is the
inverse of what an architecture function ought to be incentivised
to deliver.

Fitness functions, by contrast, are designed to be leading
indicators of architectural health. They measure properties that
the architecture function has direct influence over, on a cadence
short enough to drive corrective action, and in a form that can be
discussed productively with non-architects.

The implementation requirement is modest. Most fitness functions
can be computed from data the organisation already produces: source
control activity, deployment logs, system metadata, cost dashboards,
and security scans. The marginal cost of producing the measurements
is small. The marginal benefit, particularly when the measurements
are tracked over time and shared with the broader leadership team,
is substantial.

What follows is a framework of six categories, each with three or
four illustrative fitness functions. The framework is intended as
a starting point; organisations should adapt and extend it to their
specific context.

## Category 1: Architectural alignment

Measurements of the degree to which the actual estate corresponds
to the stated architecture.

| Fitness function | Description | Data source |
|---|---|---|
| **Standards conformance rate** | The proportion of applications or services in the portfolio that conform to the published architectural standards (cloud-only deployment, container-based runtime, mandatory observability instrumentation, and similar). | Application portfolio metadata; CMDB; infrastructure tagging. |
| **Capability coverage** | The proportion of the published capability model that has at least one named owning application or service. | Capability model; portfolio mapping. |
| **Reference architecture adoption** | The proportion of new applications shipped in a given quarter that follow the published reference architecture, weighted by complexity. | Architecture review records; deployment metadata. |
| **Exception backlog** | The number of approved architectural exceptions currently active, and the median age of an open exception. | Exception register; AGB records. |

The objective in this category is not to drive every metric to
100%. Some level of deviation from the standard is healthy — it
reflects the architecture function's response to genuine business
need rather than rigid enforcement. The objective is to surface
the trend. A standards conformance rate that has been declining
for three quarters is a signal that warrants investigation,
regardless of the absolute level.

## Category 2: Operational characteristics

Measurements of the system properties that the architecture is
intended to produce.

| Fitness function | Description | Data source |
|---|---|---|
| **Deployment frequency** | The median number of production deployments per service per week, across the portfolio. | CI/CD pipeline logs. |
| **Lead time for change** | The median elapsed time from code commit to production deployment, across the portfolio. | Source control; deployment pipeline. |
| **Mean time to recover** | The median time from incident detection to incident resolution, weighted by severity. | Incident management system. |
| **Change failure rate** | The proportion of production deployments that result in a degraded customer experience or a rollback. | Deployment pipeline; incident records. |

These four are the DORA metrics, well-established and widely
adopted. They are operational measures rather than purely
architectural ones, but the architecture function has substantial
influence over each: deployment frequency is constrained by the
architecture's ability to be deployed independently, lead time is
constrained by coupling and integration complexity, and so on.

The architecture function should track these metrics not as a
substitute for the engineering organisation tracking them, but as
a leading indicator of where architectural intervention may be
warranted. A persistent low deployment frequency in a particular
domain is often a symptom of an architectural problem the team
has stopped trying to fix.

## Category 3: Technical debt and modernisation

Measurements of the estate's evolution toward, or away from, a
modern technical baseline.

| Fitness function | Description | Data source |
|---|---|---|
| **End-of-life exposure** | The number of production services running on technology versions that are within twelve months of vendor end-of-life. | Vulnerability scanning; CMDB. |
| **Security patch latency** | The median time between a critical security advisory being published and the patched version being deployed to production, across the portfolio. | Vulnerability management system. |
| **Dependency currency** | The median age of the dependencies used across the portfolio, relative to the latest stable releases. | Software bill of materials; dependency scanning. |
| **Modernisation rate** | The proportion of the legacy application portfolio that has been retired, replaced, or substantially modernised in the trailing twelve months. | Application portfolio; project records. |

This category is often the most politically charged. End-of-life
exposure in particular is a measure that frequently surfaces
uncomfortable realities. The discipline is to publish the
measurement, agree the threshold above which intervention is
required, and track progress against it. The measurement itself
does not produce the modernisation; it produces the conversation
that funds the modernisation.

## Category 4: Cost and resource efficiency

Measurements of the architecture's economic characteristics.

| Fitness function | Description | Data source |
|---|---|---|
| **Cost per business transaction** | The total infrastructure and operating cost attributed to a defined business transaction (a customer onboarding, an order processed, a report generated), measured monthly. | Cloud billing; transaction logging. |
| **Cloud utilisation** | The proportion of provisioned cloud capacity that is meaningfully utilised in a given month. | Cloud monitoring. |
| **Vendor concentration** | The number of distinct vendors providing comparable capabilities across the portfolio, and the cost weighting across them. | Contract register; cost allocation. |
| **AI workload economics** | For organisations with significant generative AI workloads, the cost per inference, the prompt-cache hit rate, and the percentage of cost attributable to retries. | LLM gateway logs; cost allocation. |

The last of these four is increasingly relevant. Generative AI
workloads have a cost profile that is unusually sensitive to small
architectural decisions — the discipline around prompt caching, the
choice of model for a given task, the design of retrieval — and
these decisions are the architecture function's territory. A fitness
function focused on AI workload economics provides the visibility
that lets the architecture function intervene before costs become
material.

## Category 5: Security and compliance posture

Measurements of the estate's security and regulatory standing.

| Fitness function | Description | Data source |
|---|---|---|
| **Identity coverage** | The proportion of production systems integrated with the organisation's enterprise identity provider, as opposed to maintaining local user accounts. | Identity provider; CMDB. |
| **Secrets sprawl** | The number of secrets in the secrets management system, the number found outside it (in environment files, configuration repositories, etc.), and the ratio between the two. | Secrets scanner; vault audit logs. |
| **Audit log completeness** | The proportion of production systems producing audit logs that meet the organisation's published retention and detail requirements. | Logging infrastructure. |
| **Privileged access exposure** | The number of standing privileged access grants across the production estate, and the proportion of privileged access activity that is just-in-time provisioned. | Identity provider; PAM solution. |

For organisations subject to material regulatory oversight, these
measurements are independently useful as inputs to the regulatory
reporting and audit cycle. The architecture function's responsibility
here is to set the target, not necessarily to operate the
measurement infrastructure, which generally sits with the security
function.

## Category 6: Knowledge and decision quality

Measurements of the architecture function's documentation and
decision-making practice itself.

| Fitness function | Description | Data source |
|---|---|---|
| **Decision throughput** | The number of Architecture Decision Records authored per quarter, normalised by the size of the architecture function. | Documentation repository. |
| **Decision lead time** | The median elapsed time from a decision being proposed to being formally accepted. | ADR metadata. |
| **Knowledge accessibility** | The proportion of architecture documentation that has been queried via the internal knowledge system in the trailing month. | Documentation analytics; LLM assistant logs. |
| **Onboarding effectiveness** | A periodic survey-based measure of how quickly new architects feel productive after joining the function, with a target benchmark. | Internal survey. |

These measurements address the architecture function's own
operating model, which is rarely measured but is materially
important. An architecture function with a slow decision lead time
becomes the bottleneck it was supposed to alleviate. An architecture
function whose knowledge base is not being consulted is not earning
its keep as a custodian of organisational memory.

## Implementation considerations

Five practical points for organisations adopting this framework.

**Begin with a small set.** Six categories with three to four
metrics each is fifteen to twenty-four measurements. That is too
many to operationalise at once. I would recommend selecting one
metric from each category as the initial set, establishing the
data pipeline and the publication cadence, and then extending
once the practice is established.

**Publish the measurements visibly.** The benefit of fitness
functions accrues from the conversation they generate, not from
the measurement itself. The measurements should be visible to the
leadership team, ideally as a standing item on the relevant
governance forum. A dashboard that exists but is not reviewed has
no effect.

**Establish thresholds, not just measurements.** Each fitness
function should have a target threshold — the level above which
the architecture function considers the property to be in a healthy
state — and a trigger threshold, below which intervention is
required. Without thresholds, the measurements become decorative.

**Treat the measurements as inputs to decisions, not as performance
indicators of individuals.** The temptation to use fitness functions
as performance management indicators for engineers or architects
should be resisted. The measurements are diagnostic; they identify
where the architecture needs attention, not who is to blame for it
needing attention. Using them as individual performance metrics
will produce the predictable behavioural distortions and will
degrade the quality of the measurement over time.

**Review the framework annually.** The set of fitness functions
that matters to an organisation evolves as the organisation
evolves. A measurement that was critical eighteen months ago may
have served its purpose. A new measurement may now be needed.
The architecture leadership should review the framework on a
defined cadence, retiring measurements that have ceased to provide
value and adding new ones as needed.

## Implications for architecture leaders

The broader implication of adopting a fitness functions framework
is that the architecture function moves from a function defined by
its deliverables — the artefacts it produces — to a function
defined by its measurable outcomes. This is, in my view, a
necessary evolution for the discipline.

The architecture function that can demonstrate, with data, that
the estate's standards conformance is improving, that technical
debt is being addressed at a defined rate, that cloud utilisation
is rising and unit costs are falling, that the security posture
is strengthening, and that the function's own decision throughput
is healthy, has a fundamentally different conversation with the
executive team than the function that produces an annual capability
model refresh and a target operating model that nobody reads.

For architecture leaders considering this shift, the recommendation
is to begin small, to publish openly, and to allow the measurements
to drive the conversation rather than to dictate the conclusions.
The framework above is one starting point. The work of adapting
it to a specific organisational context is itself a useful exercise
in articulating what the architecture function is for.
