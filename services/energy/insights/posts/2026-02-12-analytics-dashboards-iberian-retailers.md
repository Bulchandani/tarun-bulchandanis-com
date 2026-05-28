---
title: "Building analytics dashboards for Iberian retailers"
date: 2026-02-12
excerpt: "Most retailers have a billing engine that produces reports, a CRM that produces reports, a trading desk that produces reports, and a regulatory function that produces reports. None of these report against each other without manual work, which means the management team makes decisions from partial visibility."
author: "Tarun Bulchandani"
---

Walk into any Iberian retailer under 1 TWh and you will
find the same pattern. The billing engine produces a
monthly report. The CRM produces a customer report. The
trading desk produces a P&L estimate. The regulatory
function produces a filing summary. Each one is internally
consistent. None of them reconcile against the others
without manual work.

The management team is making decisions from partial
visibility. The pricing committee is approving tariffs
without a live view of the trading position. The
operations team is closing the month without a clean
view of the regulatory exposure. The board is reading
quarterly reports that do not reconcile against the
monthly reports.

This note covers what a working analytical layer
actually has to do.

## The analytical data model

The analytical layer has to integrate four operational
domains.

**The customer book.** Each customer record with their
CUPS, tariff, contract terms, billing history, current
account balance and switching status.

**The purchasing book.** Day-ahead positions, intraday
positions, futures positions, bilateral positions, GdO
holdings.

**The regulatory cycle.** Filing status, dispute
status, sanction exposure.

**The financial P&L.** Revenue, cost of goods sold,
operating expense, working capital position, treasury
position.

The model has to bridge these four so that questions like
"what is the gross margin per CUPS over the last 12
months" or "what is the working capital implication of
the proposed tariff change" can be answered in seconds,
not days.

## The dashboards that matter

Most retailers ask for too many dashboards. The
management team has time for five to seven views,
updated regularly, that they look at often.

The five that matter:

**Gross margin per customer cohort.** Calculated against
the cost-to-supply at the CUPS level. Surfaces the
customer segments that are profitable and the segments
that are not.

**Operational variances.** Switching exception rate,
billing-cycle close status, regulatory filing status,
working-capital position. Surfaces the operational risks
before they become incidents.

**Wholesale position.** Open day-ahead, intraday and
futures positions, with the gross and net exposures.
Surfaces the trading risk in a form the management team
can act on.

**Customer book health.** Gross add, gross loss, net
position, time-in-switch, complaint volume, NPS where
measured. Surfaces the commercial health of the book.

**Cash and working capital.** Treasury position, margin
posted across counterparties, accounts receivable
ageing, accounts payable position.

Each dashboard should be updatable from automated data
pipelines, not from manual spreadsheets.

## The data pipeline

The dashboards are the visible layer; the data pipeline
is what makes them trustworthy. Most retailers under 1
TWh do not have a real data pipeline. They have a set of
extracts that one person runs at month end.

A working pipeline has:

- Source connectors to each operational system (billing
  engine, CRM, trading desk, regulatory)
- A landing layer that ingests data on a defined
  cadence (daily for trading, daily or weekly for
  customer and regulatory, monthly for financial close)
- A transformation layer that maps the source schemas
  into the analytical data model
- A presentation layer that serves the dashboards
- A monitoring layer that flags pipeline failures
  before they reach the dashboards

The technology choice matters less than the discipline.
A retailer running this on PostgreSQL and a small set
of well-written SQL views with a self-hosted BI tool can
deliver as much value as one running on a cloud data
warehouse with a commercial BI platform; the building
block that fails is usually the data discipline, not the
software.

## Where to spend and where not to

Spend on:

- Data quality at the source. A clean billing engine is
  worth more than a sophisticated downstream
  transformation.
- A small number of well-built dashboards used
  regularly.
- Documentation of the data model and the
  transformation logic.

Do not spend on:

- A dashboard for every conceivable question. Most of
  the dashboards built in the first 6 months are not
  used after month 9.
- A real-time data pipeline where a daily one would
  serve the same decisions.
- A machine learning layer until the underlying
  analytics layer is solid.

## How this lands in operations

The analytical layer is the layer that turns the
operational data into management decisions. A retailer
without a working analytical layer is running on
intuition; a retailer with one is running on data.

The [analysis and pricing
pillar](/services/energy/analysis/) covers analytics and
dashboards as workstream 3, with a 12 to 16 week build.

Related: [Pricing design for Iberian
retailers](/services/energy/insights/pricing-design-iberian-retailers/),
[Iberian wholesale market
reporting](/services/energy/insights/iberian-wholesale-market-reporting/),
[Regulatory monitoring for Iberian
retailers](/services/energy/insights/regulatory-monitoring-iberian-retailers/).
