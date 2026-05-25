---
title: "The commercial EA tool market has 18 months"
slug: ea-tool-market-18-months
date: 2026-05-14
excerpt: "Ardoq, LeanIX, Planview, MEGA, Alfabet, Avolution, Bizzdesign. The category was hard before AI-native tooling. Now it's nearly extinct. A market call on what happens next."
source: own
---

## TL;DR

The market for commercial enterprise architecture management products
is in trouble. Not because the products are bad — they are mostly
fine — but because the cost of building an internally-better
alternative has collapsed by an order of magnitude in the last
eighteen months, and the operational tax of running a commercial EA
tool has not come down at all. The maths has flipped for any team
under about thirty people. The big vendors will do three things in
response: bolt AI assistants onto existing products, consolidate,
and pivot to managed services. The first won't save them. The second
is already starting. The third is the survival play. By the end of
2027 the category will look very different than it does today, and
several of the names you read in the analyst quadrants will not be
operating as independent companies any more.

This is a market call. It is also a build-versus-buy piece for any
Chief Architect or CIO currently inside an Ardoq or LeanIX renewal
cycle. I have personally shipped one of these alternatives. The
piece that follows is what I learned in the process, applied to the
market rather than to my own context. The companion case study on
the platform I built ([Meridian](/blog/case-study-meridian/)) and
the workflow that wraps it ([CANVAS](/blog/case-study-canvas/)) goes
much deeper on the internal evidence.

## What changed

Twenty-four months ago, putting a commercial enterprise architecture
management product into a company was the obvious answer. The
canonical analyst playbook said pick one of the named vendors
(Ardoq, LeanIX, MEGA HOPEX, Planview Enterprise One, Avolution ABACUS,
Bizzdesign, Software AG Alfabet), put the application portfolio and
the capability model in, bolt the Architecture Governance Board on
top, run it for two to four years, and trust that the data quality
would eventually be good enough that stakeholders would use it as a
single source.

Three things have changed since.

The first is that **building a custom EA platform got an order of
magnitude cheaper**. The components that used to take a team a year
to build now take a single full-stack developer a weekend: a typed
data model from a schema, a CRUD API auto-generated from the schema,
SSO via the company's existing identity provider, file storage in a
managed blob store, and — the bit that actually changes everything —
a conversational interface over the corpus that is built in a few
hundred lines of code on top of any frontier model. The marginal cost
of an additional capability or attribute is close to zero.

The second is that **the operational tax of commercial EA tools has
not gotten lighter**. Every one of them still requires a meta-model,
a taxonomy governance forum, role provisioning, integration plumbing
into adjacent systems, and a non-trivial team to keep the data clean
enough to trust. The vendors will tell you that AI assistants reduce
this burden. They reduce a small part of it. They do not reduce the
operational floor.

The third is that **the categories adjacent to EA — workflow,
governance, PMO, vendor due diligence — have remained outside the
EA platform's scope and probably always will**. Every EA tool I have
worked with is, fundamentally, an architecture inventory. None of
them is a workflow engine. None of them is a compliance tracker.
None of them is a vendor onboarding platform. The architecture
function spends most of its time on those adjacent things. The EA
platform helps with maybe a third of what the team actually does in
a given week.

So the value proposition of a commercial EA tool is: it solves a third
of the job, requires a team to operate, and competes against an
in-house build that you could ship in six months by one developer.
That maths used to favour the commercial tool because the in-house
build was a year of work, three engineers, and probably mediocre. It
no longer does.

## What the vendors will try

Predicting what category-leading vendors will do is easier than it
looks because they tend to do the obvious thing in roughly the same
order.

### 1. Bolt an AI assistant onto the existing product

This has already happened. Every named vendor has shipped a
conversational interface over the past twelve months. Some are
genuinely useful; most are not. The reason most are not is that the
data model the assistant is operating over was designed for a tabular
admin UI, not for retrieval under RAG. The attributes are too free-text,
the taxonomy is too inconsistent, and the integrations carry too much
stale data. The assistant inherits all of that. It produces fluent
sentences that are wrong, which is worse than nothing.

The vendors that get this right will be the ones who reshape their
data model first and add the assistant second. Reshaping the data
model is a multi-quarter exercise that conflicts with every other
roadmap commitment. Most won't.

### 2. Consolidate

This will start by the end of 2026 if it has not already. The
mid-market vendors (Bizzdesign, Avolution, MEGA in some regions) are
the obvious acquisition targets. The big platform companies that
already touch adjacent categories — ServiceNow, Atlassian, Microsoft
via Power Platform, possibly Salesforce — are the obvious acquirers.
For these acquirers, a small EA capability is a useful add-on that
fills a gap in the broader enterprise platform play. For the
acquirees, the alternative is a slow margin compression as the
addressable market narrows.

Watch for one of two things specifically. Either a marquee EA-pure-play
gets bought (the most likely single event) or a workflow platform
company quietly absorbs the capability through a series of smaller
acquisitions (the slower, more probable trajectory).

### 3. Pivot to managed services

This is the survival play for the EA-pure-play vendors that don't
get bought. The pitch will be: "you can't build and operate this
yourself; we'll do it for you, with our team running the meta-model
and the data integrations, and our assistant pre-trained on your
portfolio." Effectively it is an architecture-as-a-service model
where the customer is buying the team and the tooling together,
not just the tooling.

This is a genuinely defensible play because it converts the
operational tax — the thing that used to be the customer's problem —
into the vendor's value-add. It also moves the buyer from VP of
Architecture to CFO, because the conversation becomes about an
ongoing service fee rather than a software licence. The vendors that
can credibly staff this transition will survive. The vendors that
try to do it without staffing it will lose customers faster than
they would have under the previous model.

## Three signals that the timeline is real

Predictions are cheap. Here are three specific things I would watch
in the next eighteen months that would either confirm the timeline
or push it back.

**Signal 1: Analyst quadrant churn.** The Gartner and Forrester
quadrants for EA tools have been roughly stable for five years. If
two or more named vendors move significantly within an eighteen-month
window — either upward into the leader quadrant or off the chart
entirely — that is the canary. Analysts move late, and they move
when the underlying market structure has already shifted.

**Signal 2: A high-profile incumbent customer publicly switching off
their commercial EA tool.** This is the equivalent of the early
Slack-to-Teams migrations: one prestige logo gives the rest of the
market permission. I would expect this in the next twelve months.
Look for a large bank, a global insurer, or a hyperscaler announcing
they have moved off their EA platform and onto an internal build.
When you read it, it will sound like a routine procurement
announcement. It will not be.

**Signal 3: A new entrant designed AI-native from the start.** The
existing vendors are retrofitting AI onto a 2015-era data model. A
new entrant designing the whole thing from a 2026-era retrieval and
agentic-workflow perspective would not need a meta-model in the
traditional sense, would not need taxonomy governance in the
traditional sense, and would not need a separate workflow product.
If this entrant has a credible founder and a marquee early customer,
the existing vendors have a problem they cannot patch.

None of these signals require an EA tool to "fail" in any spectacular
way. They are quiet structural shifts. The shift is what compresses
the timeline, not any single dramatic event.

## What CIOs and Chief Architects should do

Concretely, three things.

### Renegotiate any renewal happening in the next twelve months on a one-year term

Multi-year renewals look like cost savings on paper. They are cost
savings on paper. They also remove your optionality at exactly the
moment when the market is most likely to give you better options.
The right negotiating posture for a renewal in 2026 is one-year
extensions with a sharper-than-usual focus on price, because you do
not want to be locked into the current product when the alternative
gets meaningfully better twelve months from now.

### Inventory what your EA tool is actually used for, not what it could be used for

Most EA platforms have hundreds of features. Most teams use about
fifteen. The fifteen are usually: application inventory list view,
capability model browser, a couple of dashboards, the impact-analysis
view, and the exports. If your team's actual usage is concentrated
in a small set of features, the gap between what the commercial tool
delivers and what an in-house build delivers is small. If your team
is using thirty or forty features, the gap is meaningful and the
build case is harder.

The team I worked with in the small-company case was using under
fifteen features of a major commercial EA tool. The build replaced
those fifteen, added five that the commercial tool did not have
(the workflow surface, the PMO substrate, the vendor due-diligence
folding, the audit trail, the AI assistant), and left the remaining
hundred-and-some unbuilt and unmissed.

### Plan the workflow side at the same time

If you are going to look at building an internal alternative, do not
just plan to replace the EA tool. Plan to replace the EA tool plus
the workflow surface that wraps the application onboarding process.
The EA-only build is half a product. The EA-plus-workflow build is
a complete product. The complete product is what justifies the
investment and what closes the maths on switching off the licence.

This is the lesson from the [Meridian](/blog/case-study-meridian/)
build and the [CANVAS](/blog/case-study-canvas/) build that wrapped
it: the value is in folding the two together, not in replicating
either one of them in isolation.

## Where commercial EA tools still make sense

I am bearish on the category, but not on every individual deployment.
There are two contexts where the commercial product is still the
right answer.

The first is **large architecture teams in stable enterprises**.
If you have thirty or more people in the EA function, a deep
investment in meta-model governance, and a stable taxonomy that
multiple business units have agreed on, the operational tax of the
commercial tool is a small fraction of your total cost base and the
build alternative offers proportionally less upside. You should keep
buying.

The second is **regulated environments where the commercial tool is
already accredited**. If your auditor or regulator has signed off
on the commercial product and the data flows and security controls
within it, switching to a custom build means re-doing the accreditation.
That work is not impossible but it is meaningful. For a bank or
insurer where the EA tool is already inside the regulatory perimeter,
the right time to switch is at the next regulatory cycle, not in
the middle of one.

Outside those two contexts, the build case is increasingly the right
answer for small architecture teams, fast-growing companies, and any
organisation where the EA function spends most of its time on
workflow rather than inventory.

## What this means for the vendors

I have been talking about commercial vendors as if they are
homogeneous. They are not. A rough taxonomy of where the named
players land:

| Vendor type | Likely trajectory |
|---|---|
| Mature EA-pure-play with workflow ambitions (e.g. Ardoq, LeanIX) | The most exposed. They are competing on EA-platform-plus-workflow, which is exactly the build case. Survival depends on the managed-services pivot. |
| Mature EA-pure-play, no workflow story (e.g. MEGA HOPEX, Avolution ABACUS, Bizzdesign) | Probably acquired into a larger enterprise platform within two years. The technology has value but the standalone business is harder to sustain. |
| Project portfolio management vendor with EA capability (e.g. Planview) | The PPM side of the product is the durable revenue. EA is an add-on that may get de-prioritised internally. |
| Wider enterprise platform (e.g. Software AG Alfabet) | The EA part is small relative to the parent. May get absorbed into the parent's broader integration story. |

I am not claiming any individual vendor will fail. I am claiming the
category structure will shift, the standalone EA-pure-play model is
becoming hard to sustain economically, and the most useful future
for these companies looks more like Mendix-style consultancy-attached
SaaS than like the pure software model they grew up on.

## What I would build instead, if I were starting today

If I were standing up a new EA capability in a small or fast-growing
company today and had to choose between buying a commercial product
and building, this is the build I would scope. Specific enough to be
useful, generic enough to apply across contexts:

- **Data model.** TypeScript schemas in source control. A few hundred
  lines. Defines Applications, Capabilities, Value Streams, Initiatives,
  Vendors, Documents, Approvals. Type-safe, code-reviewable, diffable
  in git. Migrations via your ORM of choice (Prisma or SQLAlchemy
  depending on your language).
- **Storage.** Postgres on whatever managed service you already use.
  Don't innovate here.
- **Identity.** Your existing corporate SSO. No new identity provider.
- **API layer.** A modern web framework (Next.js, FastAPI, whatever
  the team knows). Auto-generated OpenAPI spec. Typed client.
- **Conversational assistant.** RAG over the structured data, with
  the system prompt prompt-cached, citations on every response,
  hard token budgets, and audit logging of every query.
- **Workflow surface.** A simple state machine in plain code. Don't
  use a workflow DSL unless the workflows are complex enough to
  justify learning one. Most aren't.
- **Audit log.** Append-only table, captured at every transition.
  Insert-only privileges on the application user.
- **Hosting.** Whatever managed container platform your company
  already uses. Don't build a new deployment pattern for this.

That stack is one developer for six months. It is not a thirty-engineer
team for three years. It will not have every feature in the analyst
quadrant. It will have every feature your team actually uses, plus
the ones the commercial tools never offered, plus an audit story
that is genuinely better.

If you are in the position of evaluating a commercial EA tool right
now, sit with that for a minute before you sign the contract.

## The honest caveats

Three things I want to be honest about before closing.

First, **I am biased**. I built one of these systems myself, and the
case I am making is partially a case for the work I did. The maths
holds independently of my involvement, but you should weight the
opinion appropriately.

Second, **the timeline is uncertain**. Eighteen months is a market
call, not a forecast. The category could compress faster (if a
high-profile incumbent switch happens early) or slower (if the
analyst quadrants and procurement habits keep the existing vendors
alive longer than the underlying economics warrant). I think eighteen
months is the centre of the distribution. It could be twelve. It
could be thirty.

Third, **I am not claiming the existing products are bad**. Most of
them are well-engineered, well-supported, and have credible roadmaps.
The argument is not about quality. It is about whether the category
itself can sustain its current shape when the alternative has gotten
this much cheaper to build.

If you are a vendor reading this and you disagree, I would genuinely
like to hear the counter-argument. The case for "commercial EA tools
will remain the default for the next decade" is not a case I have
heard made well, and I am open to changing my mind on the timeline
if there is one.

If you are a Chief Architect reading this and you are about to sign
a multi-year renewal, please re-read the section on one-year
extensions before you do.
