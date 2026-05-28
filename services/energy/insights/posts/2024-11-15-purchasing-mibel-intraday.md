---
title: "Purchasing in MIBEL intraday markets"
date: 2024-11-15
excerpt: "The MIBEL intraday markets sit between OMIE day-ahead and the REE balancing platforms. They are how a retailer adjusts a position after the day-ahead clears, and they are where a meaningful share of the operational margin in a retail book is made or lost."
author: "Tarun Bulchandani"
---

The MIBEL intraday markets are the operational
adjustment layer between OMIE day-ahead and the REE
balancing platforms. They exist because no day-ahead
forecast is perfect: weather changes, demand surprises
arrive, generators have unplanned outages, and the
positions need adjusting before delivery.

For a retailer, the intraday markets are both the safety
net that absorbs forecast error and the opportunity layer
that can capture price swings. Most retailers use them
defensively. The ones that treat them as a deliberate
trading workflow do meaningfully better.

## The market structure

MIBEL intraday has two parts:

**The intraday auctions.** Six discrete auctions through
the day, each clearing a window of hours ahead of
physical delivery. The auctions follow the same
pay-as-clear mechanic as OMIE day-ahead. The format is
documented, the clearing is published, and the
counterparty exposure is the same as day-ahead.

**The continuous intraday market.** A continuous-trading
platform where participants can adjust positions up to
roughly an hour before physical delivery. The clearing
is bilateral against the order book. The platform is
operated under the SIDC (Single Intraday Coupling)
European framework.

A retailer can use either or both, depending on the size
of the position adjustment and the price signals.

## Patterns that matter

**The auctions have predictable liquidity.** The first
auction of the day (covering hours 04:00-23:00 of the
delivery day) is the most liquid. The later auctions are
thinner. A retailer covering a significant intraday
position should use the first auction in preference
where it can.

**Continuous intraday clears with persistent spread.**
The bid-offer spread on the continuous platform
widens materially in the off-peak hours and tightens
during the peak. A retailer with a large position to
cover in an off-peak hour either pays the spread or
splits the position across multiple smaller trades.

**Cross-border interconnection capacity matters.** The
continuous intraday platform is European; capacity flows
between Iberia, France and Northern Europe affect the
clearing. A position in Iberia at a time of constrained
interconnection capacity to France clears at a different
price than the same position when capacity is open.

**Imbalance settlement is the alternative.** A retailer
that does not adjust a position in intraday settles the
imbalance against REE's balancing market, at a price
that is systematically penal to the imbalanced party.
The decision between intraday adjustment and accepting
imbalance settlement is an explicit commercial decision
the desk should be making, not a default.

## What goes wrong

Three failure patterns turn up regularly.

**The intraday workflow runs from the same data as the
day-ahead workflow.** If the forecast that drove the
day-ahead bid has not been updated, the intraday
adjustment uses the same wrong forecast. The forecast
needs a refresh cadence aligned to the intraday auction
schedule.

**Position visibility is poor.** A retailer that does not
have a clear view of its current position by hour cannot
make intelligent intraday adjustments. Most retailers
under 1 TWh are running this on a spreadsheet that is
updated once a day.

**The continuous market is treated as too complex to
touch.** Most retailers under 1 TWh do not participate in
continuous intraday at all, accepting the imbalance
settlement cost instead. For some books this is a
defensible position; for many it is leaving margin on
the table.

## How this lands in the operating model

A working intraday desk has three components:

1. **An intraday forecast refresh** that updates after
   the OMIE day-ahead clears and refreshes again before
   each intraday auction.
2. **A position-tracking layer** that gives the desk a
   real-time view of the current position by hour
   against the demand forecast.
3. **A decision framework** that defines, for each
   intraday auction and continuous trade, whether the
   desk should adjust or accept imbalance.

This is operational work, not a system replatform. The
[purchasing pillar](/services/energy/purchasing/) covers
it as a 4 to 8 week engagement layered on top of the
day-ahead operations.

Related: [Operating against
OMIE](/services/energy/insights/operating-against-omie/),
[Demand forecasting in an Iberian retail
context](/services/energy/insights/demand-forecasting-iberian-retail/),
[Calculating and monitoring trading
guarantees](/services/energy/insights/trading-guarantees-monitoring/).
