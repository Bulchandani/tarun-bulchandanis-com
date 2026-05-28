---
layout: layouts/page.njk
permalink: /services/energy/products/purchasing/
title: "AI-led purchasing products"
pageEyebrow: "AI-led products"
pageTitle: "AI-led purchasing products"
pageLede: "Four AI-led products covering the energy purchasing pillar: demand forecasting, market execution against OMIE and MIBEL, real-time guarantee monitoring, and invoice reconciliation. Built against a single reference architecture, deployed in your tenancy, designed for the regulatory posture an Iberian retailer actually needs."
description: "AI-led products for Iberian energy purchasing: demand forecasting, OMIE and MIBEL execution, MEFF and REE guarantee monitoring, and invoice reconciliation."
---

The advisory pillar covers what good looks like in
[energy purchasing](/services/energy/purchasing/). The
products on this page are the AI-led implementations
that deliver it. Four products, scoped tightly to the
sub-topics in the pillar.

## Product 1: Forecast

**AI-led hourly demand forecasting calibrated to the
Iberian retail context.**

Most retailers under 500 GWh forecast with a mix of
seasonal averages and last-week shape, with manual
overrides for known events. Forecast replaces this with
an hourly model that learns from the retailer's
customer mix, weather, calendar, tariff shape and
metered data, and that updates against the day-ahead
and intraday auction schedule.

What it does:

- Hourly demand forecast across the day-ahead and
  intraday horizons, calibrated to each DSO region in
  the retailer's footprint
- Customer-mix awareness (residential PVPC,
  free-market residential, SME bilateral, corporate
  structured) so the forecast is a weighted aggregate
  rather than a single shape applied to the whole book
- Weather feed at customer-postcode granularity, not
  city level
- Recalibration on metered data as it arrives from the
  DSOs, with automated drift detection
- Outputs in the shape the downstream purchasing
  workflow consumes: hourly granularity for day-ahead
  and intraday, daily for hedging

What it integrates with:

- The retailer's CRM for customer-mix data
- The DSO metered-data feeds (with their 30 to 60 day
  lag accounted for)
- Met Office and AEMET weather feeds
- The retailer's bid generation workflow downstream

**Engagement:** 6 to 10 weeks to build into your
tenancy. Optional 90-day support. Managed-service
retainer available afterwards.

**Best for:** Retailers with a residential PV-rooftop
share above 15%, or with material SME exposure to
heat-sensitive demand, or with a customer book spread
across multiple DSO regions.

Related reading: [Demand forecasting in an Iberian
retail
context](/services/energy/insights/demand-forecasting-iberian-retail/).

## Product 2: Execute

**Agent-mediated execution against OMIE day-ahead,
MIBEL intraday, MEFF futures and the GdO secondary
market.**

The execution workflow today, in most retailers, is a
small team running spreadsheets against the SIOM
platform, with limited validation and one or two named
people carrying the operational risk. Execute is the
working agent layer that runs the bid generation,
validation, submission and post-trade reconciliation,
with the trader in the loop for material decisions.

What it does:

- Bid generation from the Forecast output, the hedging
  position and the published price curves
- Pre-submission validation against the OMIE schema
  (catches the misformatted bids that get silently
  rejected today)
- Submission with hard cutoff discipline, secondary
  named operator on the workflow, alerting on system
  clock drift
- Intraday position management across the six MIBEL
  intraday auctions and the continuous platform
- MEFF futures execution on the hedging cadence the
  retailer defines
- GdO secondary market participation for green-tariff
  retailers

What it integrates with:

- OMIE SIOM platform via the documented connector
- MEFF / BME Clearing via the published interfaces
- MIBEL intraday platform
- The Forecast product (or any equivalent forecast)
- The retailer's position-tracking layer

**Engagement:** 10 to 16 weeks. Material customisation
to the retailer's specific risk policy. Managed-service
retainer covering ongoing operations strongly
recommended.

**Best for:** Retailers running 500 GWh or larger, or
smaller retailers running structured products that
benefit from active intraday participation.

Related reading: [Operating against
OMIE](/services/energy/insights/operating-against-omie/),
[Purchasing in MIBEL intraday
markets](/services/energy/insights/purchasing-mibel-intraday/).

## Product 3: Margin

**Real-time trading guarantee monitoring across OMIE,
MEFF, REE and any cross-border CCP positions.**

The guarantee position is one of the largest
working-capital items on a retailer's balance sheet
and one of the most operationally fragile. Margin
replaces the spreadsheet that runs the calculation
today with a live engine that recomputes against each
position change, reconciles against the counterparty's
published statement daily, and escalates margin events
inside the counterparty SLA.

What it does:

- Live calculation of the guarantee requirement against
  OMIE, MEFF, REE and the SIDC infrastructure
- Daily reconciliation against the published
  counterparty statements
- Working-capital optimisation across cash, bank
  guarantee and insurance-policy instruments
- Margin call escalation with named accountabilities
  and explicit SLAs
- Pre-agreed credit-line check for the default
  scenario, with monthly review at the treasury level

What it integrates with:

- OMIE position feeds
- MEFF / BME Clearing statements
- REE balancing position
- The retailer's treasury system

**Engagement:** 8 to 12 weeks. Strongly recommended
ongoing managed-service support given the
working-capital weight.

**Best for:** Every retailer running active positions
in OMIE, MEFF or REE. Single most common starting
point for the suite.

Related reading: [Calculating and monitoring trading
guarantees](/services/energy/insights/trading-guarantees-monitoring/).

## Product 4: Reconcile

**AI-led invoice reconciliation against DSO ATR
settlements, REE balancing, OMIE clearing and MEFF
mark-to-market.**

The monthly reconciliation cycle against the system
operators, DSOs and market operators is where most
retailers find their largest month-on-month variances.
Reconcile is the working engine that ingests each
invoice in its native format, normalises against the
retailer's canonical book of record, and surfaces the
variances against defined materiality thresholds.

What it does:

- Invoice ingestion across the 10 to 12 monthly
  invoices a typical national retailer receives,
  each in its native format
- Normalisation against the canonical book of record
- Variance detection against materiality thresholds,
  by line item and by counterparty
- Dispute workflow with documented resolution paths
  and target SLAs
- Monthly close discipline with named accountabilities
- Recurring-pattern detection so root causes are
  surfaced rather than recurring variances repeatedly

What it integrates with:

- The retailer's billing engine (canonical book of
  record)
- DSO ATR settlement feeds
- REE balancing settlement
- OMIE settlement reports
- MEFF clearing daily and weekly reports

**Engagement:** 8 to 12 weeks to build. Ongoing
managed support strongly recommended (the monthly
close is operationally weighty).

**Best for:** Every retailer with material monthly
flow. Payback typically inside 4 to 6 months on the
unrecovered variance reduction.

Related reading: [Billing management: DSO, REE, OMIE
and
MEFF](/services/energy/insights/billing-management-dso-ree-omie-meff/).

## Where these products sit together

The four products are designed to be implemented
together, but each can run standalone. The most
common sequence:

1. **Margin first.** Working capital weight, payback in
   weeks rather than months, sets the operational
   discipline the rest of the suite relies on.
2. **Reconcile next.** Largest single margin recovery,
   forces the canonical book of record to be in
   place, which the rest of the products use.
3. **Forecast third.** Foundation for any improvement
   in the purchasing decision quality.
4. **Execute last.** Builds on the three above and
   needs them to be operationally clean.

The diagnostic engagement covered in the [products
hub](/services/energy/products/) sets the actual
sequence based on the retailer's specific operational
position.

## Related

- [Energy purchasing advisory pillar](/services/energy/purchasing/) (what good operations look like)
- [AI-led operations products](/services/energy/products/operations/)
- [AI-led analytics products](/services/energy/products/analysis/)
- [Products hub](/services/energy/products/)
- [A reference architecture for agentic AI in the regulated enterprise](/blog/reference-architecture-agentic-ai-regulated/)
