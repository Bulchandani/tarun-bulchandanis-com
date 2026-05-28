---
title: "Demand forecasting in an Iberian retail context"
date: 2024-08-10
excerpt: "Hourly demand forecasting for an Iberian retail book is a different problem from the forecasting most teams inherit from generation planning. Weather, calendar, tariff shape and CUPS mix interact in ways that simple seasonal models miss, and the cost of being wrong on a single afternoon shows up in margin within 48 hours."
author: "Tarun Bulchandani"
---

Demand forecasting in a retailer is a different problem
from demand forecasting in a generator. A generator
forecasts to dispatch. A retailer forecasts to price and
to purchase. The decision horizon is different, the data
sources are different, and the cost of error lands in a
different P&L line.

This note sets out how the forecasting problem actually
shapes up for an Iberian retailer, and what a working
model needs to cover.

## Why simple shape forecasts under-perform

Most retailers under 500 GWh inherit a forecasting
approach that is some combination of seasonal averages,
day-of-week shape and a manual override for known events.
This works in a stable book in a stable price environment.
It under-performs in two specific situations:

**High-PV residential books on cloudy afternoons.** A
Madrid retailer with 30% of its book on PV-rooftop
self-consumption tariffs has a demand shape that swings
materially with cloud cover. A simple shape forecast does
not capture this; the result is over-purchasing on cloudy
afternoons and a margin loss on the day-ahead clearing.

**Heat-sensitive SME books in a heatwave.** A retailer
with a 40% SME mix in Andalusia has a demand shape that
spikes 25-30% above the seasonal norm on a 38°C day. A
simple shape forecast under-purchases and the retailer
takes a settlement hit on the REE balancing market.

The combined effect of a few of these days in a year is
typically 200-400 bps of gross margin on a 500 GWh book.
That is real money.

## What a working model has to cover

Five inputs matter.

**The hourly weather forecast** at the customer-postcode
granularity, not the city level. A book spread across
Aragón needs different forecasts for Zaragoza, Huesca and
Teruel; aggregating to "Aragón" loses information.

**The customer-mix shape.** Residential PVPC, free-market
residential, SME on bilateral tariff, and corporate
structured products each have a different demand shape.
The forecast should be a weighted aggregate, not a single
shape applied to the whole book.

**The calendar.** Public holidays in Spain and Portugal
are regional. A national-holiday flag is necessary but
not sufficient.

**Tariff-shape effects.** Customers on time-of-use
tariffs (P1-P6 in the Spanish framework) have a different
response to price signals than customers on flat
tariffs. As the time-of-use share of the book grows, the
forecast needs to model this explicitly.

**Recent metered data.** Most retailers receive metered
data from the DSOs with a 30 to 60 day lag. The forecast
should use that data once it arrives to recalibrate; in
the interim, it relies on settlement estimates.

## What you do not need

A few patterns over-promise relative to what they deliver:

- A deep-learning model for a 500 GWh book. A
  well-specified linear model with proper feature
  engineering gets within 1-2% of what the more complex
  approaches deliver, at materially lower operational
  cost.
- Real-time weather updates faster than 6-hourly. The
  day-ahead market clears at 12:00 CET for next-day
  delivery; a weather update at 11:00 is useful, an
  update at 11:55 changes nothing.
- A forecast that updates every five minutes. The market
  cadence does not support sub-hourly action; an hourly
  granularity is what the downstream purchasing
  workflow can use.

## How this lands in operations

A working demand forecast feeds three downstream
workflows:

1. **The day-ahead purchasing decision** for OMIE.
   Hourly granularity, 24-36 hours ahead.
2. **The intraday purchasing decision** for MIBEL
   intraday auctions and continuous intraday. Hourly
   granularity, 0-12 hours ahead.
3. **The hedging decision** against MEFF futures. Daily
   or weekly granularity, 1-24 months ahead.

The model needs to deliver outputs in the right shape and
the right cadence for each. A single forecast that tries
to serve all three rarely serves any of them well.

## Where to start

For most retailers under 1 TWh, the right first
investment is a working hourly forecast for the
day-ahead and intraday horizon. The hedging horizon can
be served initially by a simpler quarterly model and
upgraded later.

The [purchasing pillar](/services/energy/purchasing/)
covers the forecasting deliverable as a 6 to 10 week
engagement. Related: [Operating against
OMIE](/services/energy/insights/operating-against-omie/),
[Purchasing in MIBEL intraday
markets](/services/energy/insights/purchasing-mibel-intraday/).
