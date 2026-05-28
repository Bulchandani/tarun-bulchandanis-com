---
layout: layouts/post.njk
title: "Integrated reporting and the enterprise architecture function"
date: 2026-10-22
excerpt: "EY's 'how integrated reporting can give you the whole story' piece sets the case from the CFO's vantage. The architecture function carries more of the delivery than that framing implies, particularly as ESG and operational data become integrated reporting inputs."
author: "Tarun Bulchandani"
---

EY published "how integrated reporting can give you the
whole story" earlier this year. The piece argues that
the conventional separation between financial reporting,
ESG reporting, operational reporting and strategic
narrative no longer serves the audiences that consume
them. The integrated reporting concept (financial,
non-financial, narrative woven together) is the
proposed response.

The piece is written for the CFO and the audit
committee. The architecture function carries more of
the delivery than that framing implies, particularly
as ESG and operational data move from manual
spreadsheet collection to machine-readable, auditable,
real-time feeds.

This piece sets out what the architecture function has
to deliver to make integrated reporting genuinely
useful.

## What integrated reporting actually requires

Three categories of data have to flow into the same
canonical reporting layer.

**1. Financial data.** The general ledger, the
sub-ledgers, the consolidation engine. This is well-
established in the existing finance estate.

**2. ESG and sustainability data.** Emissions data
(Scope 1, 2 and 3), energy consumption, water,
diversity metrics, governance metrics, supply chain
visibility. In most firms, this data is collected
through annual surveys, manual spreadsheets and
opportunistic systems. The CSRD, ISSB and SEC climate
disclosure frameworks have made the requirement firmer;
the underlying data discipline is often still weak.

**3. Operational and strategic data.** Customer
metrics, employee metrics, operational KPIs, strategic
programme status. Scattered across CRM, HR systems,
operational dashboards and the strategy team's
spreadsheets.

The integrated reporting frame requires these to
reconcile against each other, to be retrievable on the
same cadence, and to support the same audit standards.

## The architecture problems

Four problems show up in every implementation.

**The data dictionary is inconsistent.** The same
concept is named differently in different systems.
"Active customer" in CRM does not match "billed
customer" in the billing engine which does not match
"recognised revenue customer" in the general ledger.
Without a defined data dictionary, the reports do not
reconcile.

**The cadence does not align.** Financial close is
monthly; ESG data collection is annual; operational
data is daily. Integrated reporting requires a common
cadence at least for the periods being reported, which
forces investment in the slower data streams.

**The audit standards differ.** Financial data has
been audited to a clear standard for decades. ESG data
is moving toward audit, but the standards are still
evolving. Operational data is rarely audited. The
integrated report has to handle the variation
explicitly rather than gloss it.

**The system boundaries do not match the reporting
boundaries.** The financial entity structure, the
operational footprint, the legal entity structure and
the ESG reporting boundary are all different. The
data layer has to support translation between them.

## What the architecture function has to deliver

Five components.

**A common data dictionary.** The architecture function
defines, and the data governance function maintains, a
common dictionary of concepts used in reporting.
Includes financial concepts (revenue, EBITDA),
operational concepts (active customers, churn), and
ESG concepts (emissions intensity, water withdrawal).
The dictionary is authoritative; the source systems
reconcile to it, not the other way around.

**An integrated data fabric.** A data layer that
exposes the dictionary concepts across the source
systems. The implementation varies (warehouse,
lakehouse, mesh) but the requirement is the same:
auditable, queryable, versioned, governed.

**A reporting cadence calendar.** The defined cadence
for each concept (daily, monthly, quarterly, annually)
and the dependencies between them (operational data
feeds quarterly reporting, financial close feeds
annual reporting).

**An audit trail.** Every figure in the integrated
report has to be traceable to its underlying data with
the relevant audit evidence. The architecture function
has to build this traceability into the data fabric;
retrofitting it during the audit cycle is materially
more expensive.

**A change governance layer.** Reporting concepts will
change (new ESG standards, new operational metrics,
new strategic programmes). The architecture function
has to manage these changes without breaking
year-over-year comparability or audit trail
continuity.

## Where firms underspend

Two areas.

**The ESG data fabric.** Most firms are still treating
ESG data as a separate workstream with its own systems
and its own annual cadence. The integrated reporting
frame requires it to land in the same data fabric as
the financial data, with the same governance. Few
firms have made this investment.

**The traceability layer.** Most firms can produce the
integrated report; few can defend the specific numbers
in it to the granularity an integrated audit will
require. The architecture function should be
investing in traceability before the audit pressure
arrives.

## Where this leaves the firm

Integrated reporting is, at the executive layer, a
narrative project. At the architecture layer, it is a
data platform project with specific governance
requirements. The firms that get it right invest in
the data platform first and the narrative second.

For firms doing this work in 2026, my recommendation is
to start with the common data dictionary, then invest
in the ESG data fabric, then build the traceability
layer. The integrated report itself follows from those
three.

Related reading: [Architectural fitness functions: a
practical
framework](/blog/architectural-fitness-functions-framework/),
[A reference architecture for agentic AI in the
regulated
enterprise](/blog/reference-architecture-agentic-ai-regulated/),
[Top trends in enterprise architecture
2026](/blog/top-trends-enterprise-architecture-2026/),
[Lessons from large-scale ERP
transformation](/blog/large-scale-erp-transformation-lessons/).
