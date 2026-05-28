---
title: "Event-driven architecture: when it adds value, and when it doesn't"
slug: event-driven-architecture-when-it-works
date: 2026-07-23
excerpt: "Event-driven architecture has become a default recommendation in modern technical practice. The reality across enterprise contexts is more nuanced. A practical framework for assessing when an event-driven approach genuinely adds value, and when it introduces complexity that a simpler synchronous design would have avoided."
source: own
---

## Executive summary

Event-driven architecture has become, over the past decade, one of
the more confidently recommended patterns in modern technical
practice. The general advice — that systems should communicate
through events rather than direct synchronous calls — is now widely
adopted and substantially codified in the technical literature.

The reality across enterprise contexts is more nuanced. Event-driven
architecture, applied with discipline in the right context, delivers
material benefits in decoupling, resilience, and scalability. Applied
without that discipline, or applied to contexts where it does not
fit, it introduces a category of complexity that organisations
underestimate at the outset and pay for over years.

This piece sets out a framework for assessing when an event-driven
approach genuinely adds value, when a simpler synchronous design
would have been the right choice, and what the architectural
indicators are for each. It is not an argument against event-driven
architecture; it is an argument for selecting it deliberately
rather than adopting it as the default.

## Where the pattern came from, and why it has been over-applied

Event-driven architecture, in its modern form, emerged from several
parallel developments. The growth of large-scale internet platforms
demonstrated the limits of tightly coupled synchronous architectures.
The emergence of mature message broker technology — Apache Kafka in
particular — made event streaming practical at enterprise scale. The
broader move to microservices created a category of inter-service
communication problems that event-driven patterns were well suited
to address. And the influential body of writing from companies that
had successfully scaled their architectures using event-driven
patterns established the credibility of the approach.

The result, by the mid-2020s, was a strong default in favour of
event-driven architecture in new system design. This default has
produced both genuine benefits and, in my observation, a substantial
amount of over-application.

The over-application is not surprising. The benefits of event-driven
architecture are visible in headline scenarios — the canonical case
studies from large-scale platforms — and the costs are diffused
across the operational lifecycle of the system. The right comparison
is rarely available at the design stage: a synchronous version of
the same system, running in the same context, with which the
event-driven version can be benchmarked. Without that comparison,
the recommendation to adopt the pattern looks costless. It is not.

## The five contexts where event-driven architecture adds value

The pattern adds genuine value in specific contexts. Five of them
that recur across the enterprises I have observed.

### 1. Asynchronous, long-running business processes

When a business process has steps that are inherently long-running
— typically because they depend on external systems, on human
action, or on temporal triggers — modelling the process as an
event-driven workflow is materially cleaner than the synchronous
alternative.

The architectural marker is a process where one or more steps may
take seconds to days, where the calling system has no reasonable
basis for blocking on the result, and where the eventual completion
needs to trigger downstream actions. A vendor onboarding workflow,
an insurance claim assessment, a customer credit check, a multi-stage
fulfillment process — each of these is a natural fit for an
event-driven design.

The wrong alternative in this context is typically a polling
approach, where the calling system repeatedly checks the status of
the long-running process. Polling is workable at small scale and
becomes operationally fragile at larger scale. The event-driven
alternative is cleaner.

### 2. Multi-consumer data distribution

When the same data needs to be distributed to multiple downstream
systems, each of which consumes it for different purposes and on
different cadences, an event-driven approach offers significant
architectural advantages over the alternative.

The architectural marker is a set of systems all dependent on a
common data source — typically a system of record, such as a
customer master, a product catalogue, an order book — where each
consuming system has its own data model, its own consumption
frequency, and its own latency tolerance.

The pattern that emerges in this context is the publication of
domain events from the system of record onto a durable event log,
with each downstream consumer subscribing to the events relevant
to its purpose. The system of record does not need to know about
the consumers. The consumers do not need to coordinate with each
other. New consumers can be added without changes to the producer.
This is a class of decoupling that synchronous architectures
genuinely cannot match.

### 3. Audit, observability and replay requirements

In contexts where the system needs to maintain a complete,
replayable history of significant events — for audit, for analytical
purposes, for the ability to reconstruct system state at a prior
point in time — an event-driven architecture using an immutable
event log is a natural fit.

This is particularly relevant in regulated industries, where the
audit story matters substantially. An event-sourced subsystem
provides a complete, append-only record of every change to its
state. The state itself is derivable from the event log at any
point. The audit requirement is satisfied as a property of the
architecture rather than as a separate logging concern.

The marker for this context is a regulatory or operational
requirement to demonstrate the complete history of a particular
domain — financial transactions, regulatory submissions, clinical
decisions, vendor risk assessments. In each case, the cost of the
event-sourcing pattern is justified by the audit story it provides.

### 4. Cross-organisational integration with limited coordination

When systems owned by different organisations need to exchange data
or trigger actions in each other's domains — partner APIs,
multi-enterprise supply chains, regulator-to-firm submissions,
inter-bank transactions — event-driven patterns reduce the
coordination cost meaningfully.

The synchronous alternative requires that each integration is
designed around the specifics of the partner system, with each
endpoint negotiated, each schema versioned bilaterally, and each
change managed through bilateral discussion. The event-driven
alternative, particularly using a published industry-standard
schema or a mediating event hub, allows each party to evolve
their internal systems with greater independence.

This is a context where the gain is largely organisational rather
than technical. The technical complexity of event-driven integration
is non-trivial. The reduction in coordination overhead is what
justifies it.

### 5. Genuine scale and throughput requirements

When the volume of inter-system communication is such that the
synchronous alternative would impose unsustainable operational
demands — typically measured in events per second rather than in
business transactions per day — event-driven architecture is the
appropriate response.

The architectural marker is a system whose throughput requirements
exceed what a synchronous design could comfortably sustain on the
available infrastructure. Telemetry pipelines, financial market
data, large-scale logistics tracking, IoT sensor data — each of
these is a context where the volume itself justifies the event-driven
design.

In these contexts the choice is not really event-driven versus
synchronous; it is which event-driven design to adopt. The
synchronous alternative is not viable at the required throughput.

## The three contexts where event-driven architecture is the wrong choice

Counterpart to the above. Three contexts where, in my observation,
the synchronous alternative would have been the better choice and
the event-driven design has caused problems that are still being
absorbed.

### 1. Simple request-response interactions

The most common over-application is the use of event-driven
patterns for what is, in essence, a simple request-response
interaction. The calling system needs the response of the downstream
system to proceed. The downstream system can respond synchronously
in a small number of milliseconds. The semantics of the interaction
are straightforward call-and-return.

In this context, modelling the interaction as an event-driven
exchange introduces several costs without commensurate benefit.
The latency increases, because the request has to traverse the
event bus rather than a direct call. The error handling becomes
more complex, because the caller now has to handle the possibility
that the response never arrives. The operational dependency on the
event broker becomes a single point of failure that the simpler
synchronous design would not have introduced.

The architectural marker for this anti-pattern is a system where
the calling code, in effect, has to wait for the response anyway —
either through correlation IDs and asynchronous waits, or through
explicit polling — and the event-driven nature has become a kind
of complication wrapped around a synchronous interaction.

The recommendation in this context is to use synchronous calls and
to accept the coupling. The coupling is real but typically modest
in this kind of interaction, and the operational cost of the
event-driven alternative substantially exceeds the cost of the
direct dependency.

### 2. Transactional consistency requirements

When the business semantics of an interaction require that multiple
state changes either all happen or none of them happen — the
classic atomic transaction — event-driven architecture introduces
a category of complexity that organisations consistently underestimate.

The synchronous alternative, particularly within a single database,
provides atomic transactions as a property of the underlying
system. Two updates within the same transaction either both commit
or both roll back. The application code does not need to model
the failure scenarios in detail; the database handles them.

The event-driven alternative replaces this with a saga pattern, in
which the equivalent atomicity is achieved through a sequence of
events with compensating actions. Saga patterns are well-documented
and well-understood as a concept. They are also operationally
demanding to implement correctly, and the failure scenarios they
need to model are numerous.

The architectural marker for this anti-pattern is a system where
the engineering team is spending substantial effort on the design,
testing, and operational handling of compensating actions to
maintain a property that a synchronous database transaction would
have provided as a baseline.

The recommendation in this context is to keep the transactional
interaction within a single bounded context, served by a single
database with synchronous transactions, and to use event-driven
patterns only for the genuinely cross-context interactions where
the coupling cost would otherwise be high.

### 3. Small-team contexts with limited operational maturity

The third anti-pattern is less about the workload characteristics
and more about the organisational context. Event-driven architecture
requires a meaningful investment in the operational platform — the
event broker, the monitoring infrastructure, the schema registry,
the dead-letter queue handling, the replay tooling. The investment
is appropriate at sufficient scale and with sufficient organisational
maturity. It is disproportionate at smaller scale or in less mature
contexts.

The architectural marker for this anti-pattern is a small engineering
team, often early in its operational maturity, that has adopted
event-driven patterns by default and is spending a meaningful
proportion of its time on platform issues rather than on the
business problem the systems are meant to solve.

The recommendation in this context is to start with a synchronous
architecture, to maintain a clear set of internal interfaces along
domain boundaries, and to migrate to event-driven patterns only
when the specific need arises and the operational platform exists
to support it. Event-driven architecture is a destination some
systems should reach. It is rarely the right starting point.

## A practical assessment framework

For architecture leaders evaluating whether to adopt an event-driven
approach for a specific system or system boundary, a small set of
questions can structure the decision.

| Question | If "yes" | If "no" |
|---|---|---|
| Is the interaction inherently asynchronous, long-running, or temporally decoupled? | Event-driven design likely justified. | Synchronous likely simpler. |
| Are there multiple downstream consumers of the same data? | Event-driven enables decoupling benefit. | Synchronous typically adequate. |
| Is there a regulatory or audit requirement for a complete event history? | Event-sourcing pattern likely valuable. | Standard logging typically sufficient. |
| Does the throughput exceed what synchronous infrastructure can comfortably support? | Event-driven is required, not optional. | Synchronous remains viable. |
| Do you have the operational maturity to run an event-driven platform reliably? | Proceed if other answers warrant. | Defer event-driven adoption until the platform investment is justified. |
| Does the interaction require transactional consistency across the systems involved? | Be cautious of saga complexity. | Event-driven is likely a clean fit. |

A system that answers "yes" to multiple of the first four questions
and has the operational maturity for the fifth is likely a good
fit for an event-driven design. A system that answers "yes" to
the sixth and "no" to the others is likely better served by a
synchronous approach.

The framework is not a decision tree in any rigorous sense. It is
a structured way to surface the considerations that, in practice,
are too often skipped at the design stage.

## Implications for architecture leaders

Three broader implications.

**The architecture function should resist the default toward
event-driven patterns.** The general technical literature, the
vendor narratives, and the broader practitioner conversation all
tend toward recommending event-driven approaches. The architecture
function's role is to apply judgement to that recommendation in
the specific context of the organisation and the specific workload.
This is not a fashionable position, but it is, in my observation,
the position that produces better outcomes.

**The operational maturity question is more important than the
technical-fit question.** The technical fit for event-driven
architecture is generally easier to assess than the operational
maturity required to run it. The technical fit determines whether
the pattern can produce value. The operational maturity determines
whether it will. Organisations that adopt event-driven patterns
before establishing the operational platform consistently
underestimate the cost.

**The pattern should be revisited at major architectural milestones.**
Systems evolve. A system that did not warrant event-driven design
at inception may warrant it as it grows. A system that was designed
event-driven may be carrying complexity that is no longer
justified. The architecture function should treat the choice as
reversible at major milestones — at significant scale changes, at
major reorganisations, at the end of programme phases — and should
revisit it rather than treating it as a once-and-done decision.

## Closing

Event-driven architecture is a powerful tool when applied to
the right problem. It is also one of the patterns most prone to
over-application in current practice, and the operational cost
of that over-application accumulates across the lifecycle of the
systems it affects.

For architecture leaders, the recommendation is to retain the
pattern in the toolkit, to apply it where the context warrants,
and to maintain the discipline to choose a simpler synchronous
design where it does not. The choice between event-driven and
synchronous is not a question of which is better in the abstract.
It is a question of which is appropriate to the specific system,
the specific workload, and the specific organisation. The framework
above is one way of structuring that question.
