---
title: "Operating against OMIE: a practitioner's note"
date: 2024-09-25
excerpt: "OMIE day-ahead is the central settlement layer of the Iberian wholesale market. The market design is well documented; the operational realities of running a book against it are less so. A note on the patterns that matter for a retailer or aggregator."
author: "Tarun Bulchandani"
---

OMIE day-ahead clears at 12:00 CET each working day for
the following calendar day, with the auction closing at
11:00 CET. It is the central settlement layer for the
Iberian wholesale market: most of the underlying physical
energy in MIBEL flows through this auction. The market
design is well documented (the OMIE rule book is public,
and the official OMIE training material is available
free); the operational realities of running a book against
it are less so.

This note covers the patterns that turn up reliably in
the operations of Iberian retailers and aggregators.

## The clearing mechanic, briefly

OMIE day-ahead is a pay-as-clear auction. Generators
submit ascending offers, retailers submit descending bids,
and the auction clears at the marginal price. The
Iberian zone (Spain + Portugal) clears as a single price
unless there is congestion at the cross-border
interconnections, in which case it splits.

Most retailers price into the auction as price-takers
(they bid at a very high cap price for the volumes they
need, accepting the clearing price). A smaller number
bid more strategically, using shape forecasts and
expected price curves to decide where to place bids.

## What the operational discipline looks like

Three patterns matter.

**The bidding cutoff is hard.** 11:00 CET. A retailer
that has not submitted its bids by then has no day-ahead
position and has to cover its book in the intraday
markets at whatever they clear at. Once or twice a year,
an operations team misses the cutoff for a non-trivial
reason (a system outage, a network failure, a holiday
that nobody flagged). The cost is real: intraday
typically clears at a premium to day-ahead when the
market knows a participant is short.

**The bidding format is unforgiving.** OMIE accepts bids
via the SIOM platform in a specific format. A misformatted
bid is silently rejected. Most retailers have at least
one historic incident where a misformatted bid resulted
in a missed position; the discipline is to validate every
bid against the OMIE schema before submission.

**The settlement reconciliation is non-trivial.** OMIE
publishes the daily clearing report by 16:00 CET. The
retailer receives a settlement invoice covering the
week's positions on a separate cadence. Reconciling the
intraday positions across the auction, the continuous
market and the settlement invoice is where most
retailers find the largest unrecognised variances.

## The interaction with MIBEL intraday

OMIE day-ahead is not the only market. After the day-ahead
clears, MIBEL runs a series of intraday auctions and a
continuous intraday market for adjustments. A retailer
with a poorly forecast position covers the gap in
intraday. A retailer with a well-forecast position uses
intraday opportunistically to capture price swings.

The patterns that matter:

- Intraday cleared prices are systematically more volatile
  than day-ahead. The volatility is exploitable in both
  directions.
- The continuous intraday market has thin liquidity in
  some hours (typically 03:00-05:00). Bidding aggressively
  in those hours can move the clearing price.
- The intraday auction format gives a clear price signal
  at the close; the continuous market does not.

A retailer running a structured book benefits from
treating intraday as a deliberate trading workflow rather
than a residual error correction.

## What goes wrong

Five failure patterns turn up regularly.

1. **The bidding system depends on a single person.**
   One holiday season, one off-sick week, and the desk
   is exposed.
2. **The reconciliation runs in a spreadsheet.** The
   spreadsheet has 50,000 rows by the end of the year and
   nobody trusts it.
3. **The intraday workflow is treated as residual.**
   Margin is left on the table; counterparty positions
   are not reconciled.
4. **The system clocks drift.** A submission timestamp
   off by 90 seconds is the difference between accepted
   and rejected.
5. **The post-trade flow into the billing engine is
   manual.** Reconciling against the OMIE settlement
   invoice becomes a multi-day exercise.

Each of these is fixable. None is structural.

## How this lands in the operating model

The minimum viable purchasing function covers:

- A bid generation workflow that runs from the demand
  forecast, the hedging position and the day-ahead price
  curve.
- A validation step that checks bids against the OMIE
  schema before submission.
- A submission discipline with a hard deadline at 10:45
  CET (15 minutes before the cutoff) and a secondary
  responsible person.
- A daily reconciliation workflow against the OMIE
  clearing report.
- A weekly reconciliation against the OMIE settlement
  invoice.

The [purchasing pillar](/services/energy/purchasing/)
covers this as a 4 to 8 week engagement.

Related: [Demand forecasting in an Iberian retail
context](/services/energy/insights/demand-forecasting-iberian-retail/),
[Purchasing in MIBEL intraday
markets](/services/energy/insights/purchasing-mibel-intraday/),
[Billing management: DSO, REE, OMIE and
MEFF](/services/energy/insights/billing-management-dso-ree-omie-meff/).
