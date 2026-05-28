---
title: "Billing management: DSO, REE, OMIE and MEFF"
date: 2025-02-05
excerpt: "An Iberian retailer receives between five and twelve material invoices a month from the system operators, the DSOs and the market operators. The reconciliation cycle against these invoices is where most retailers find their largest month-on-month variances, and where the operational discipline is most often weak."
author: "Tarun Bulchandani"
---

Every month, an Iberian retailer reconciles its internal
book against a small but operationally heavy collection
of external invoices. The DSOs send ATR settlement
invoices for the network access charges. REE sends
balancing market settlement invoices. OMIE sends
day-ahead and intraday settlement invoices. MEFF
clearing sends mark-to-market settlement reports and
margin statements. Each has its own format, its own
cadence, and its own dispute timeline.

The reconciliation cycle against these is the
single most important monthly process in the back
office. It is also the process where the operational
discipline is weakest in most retailers under 1 TWh.

## What the invoice landscape looks like

**DSO ATR settlements.** One invoice per month per DSO,
covering the network access charges for the retailer's
customer book served by that DSO. A retailer operating
nationally receives invoices from eight major Spanish
DSOs plus the smaller regional ones, plus the Portuguese
e-Redes equivalent. Total: 10-12 monthly invoices.

**REE balancing settlement.** Monthly invoice covering
the retailer's imbalance positions during the month.
Net of the retailer's REE guarantees position.

**OMIE day-ahead and intraday settlement.** Weekly
invoices covering the cleared positions in the previous
week.

**MEFF clearing.** Daily mark-to-market statements
covering open futures positions, plus periodic margin
calls. Settled through BME Clearing.

**Social bond and miscellaneous regulatory levies.**
Quarterly returns to the CNMC.

The aggregate monthly flow for a 500 GWh retailer is
typically €15-30 million across these invoices. Errors
of 1-2% on the monthly flow are the largest single
margin leak in the back office.

## Where the variances come from

Five patterns drive most of the variances.

**Meter reading disputes with the DSO.** The DSO meter
reading drives the ATR settlement. A residential
customer with a partial reading or an estimated reading
generates an invoice line that does not match the
retailer's internal billing record. The variance
typically takes 30-90 days to clear through the dispute
process.

**Balancing curve disputes with REE.** The REE
balancing settlement uses the published balancing prices
for each settlement period. A retailer with a different
view of the imbalance volume or the applicable price
opens a dispute. The dispute process is documented but
slow.

**Clearing price disputes with OMIE.** Rare but real;
typically arises when a retailer's bidding system
disagrees with the OMIE clearing engine on the accepted
volume. Resolution is via the OMIE customer service
process.

**Mark-to-market timing mismatches with MEFF.** The
MEFF mark-to-market is settled daily. The retailer's
internal accounting may be on a different cadence,
which creates a temporary variance that closes at month
end.

**P1-P6 period misclassifications.** The Spanish
time-of-use tariff structure has six periods. A meter
reading classified into the wrong period generates an
invoice line that does not match the retailer's
expected tariff revenue. Resolution involves the DSO
and is often slow.

## What a working reconciliation function looks like

Six components.

1. **A canonical book of record.** A single system
   that holds the retailer's expected position for each
   invoice category. Built once, updated by the
   purchasing, billing and switching workflows.
2. **An invoice ingestion layer.** Each invoice arrives
   in a different format; the layer normalises them
   into a common structure for reconciliation.
3. **A reconciliation engine.** Compares the canonical
   book against the ingested invoice, flagging
   variances above defined thresholds.
4. **A dispute workflow.** A documented process for
   logging variances, raising disputes with the
   counterparty, tracking resolution and closing out.
5. **A monthly close discipline.** A defined date by
   which the previous month's invoices are reconciled,
   disputes raised and the financial close completed.
6. **A monthly review with finance and the trading
   desk.** Variances are reviewed; recurring patterns
   are escalated; root cause is addressed.

## What the payback looks like

A working reconciliation function typically reduces the
unrecovered variance from 1.5-2.5% of the monthly flow
to under 0.5%. On a €25 million monthly flow, that is
€2.5-5 million a year of recovered margin. The build
typically pays back inside 4-6 months.

The [purchasing pillar](/services/energy/purchasing/)
covers this as workstream 5.

Related: [Operating against
OMIE](/services/energy/insights/operating-against-omie/),
[Calculating and monitoring trading
guarantees](/services/energy/insights/trading-guarantees-monitoring/),
[Switching and ATR with the Iberian
DSOs](/services/energy/insights/switching-atr-iberian-dsos/),
[Back-office operations for Iberian
retailers](/services/energy/insights/back-office-iberian-retailers/).
