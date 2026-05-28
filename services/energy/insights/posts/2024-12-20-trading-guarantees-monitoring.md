---
title: "Calculating and monitoring trading guarantees"
date: 2024-12-20
excerpt: "Trading guarantees are one of the largest line items on an Iberian retailer's working-capital position, and one of the most operationally fragile. A note on what a working guarantee monitoring function actually has to cover."
author: "Tarun Bulchandani"
---

A retailer running positions against OMIE, MEFF and the
REE balancing platforms has to post guarantees against
each counterparty. The guarantees protect the market
operator and the system operator from the retailer's
default. They are not optional, they scale with the
size of the book, and they are recalculated daily.

The discipline of calculating these correctly and
monitoring them in near-real-time is, in our experience,
one of the most operationally fragile pieces of a
typical retailer's back office.

## The mechanics

**OMIE guarantee.** Calculated against the retailer's
open day-ahead position. Posted in cash or as a bank
guarantee. Recalculated daily; margin calls issued same
day if the position moves against the retailer.

**MEFF guarantee.** Calculated against the retailer's
open futures position. Posted with the clearing house
(BME Clearing). Initial margin plus daily
mark-to-market variation margin. Margin calls within
24 hours.

**REE guarantee.** Calculated against the retailer's
balancing market exposure. Posted in cash, bank
guarantee or insurance policy. Recalculated monthly with
ad-hoc adjustments if the exposure moves materially.

**Cross-border guarantees.** Where the retailer
participates in the SIDC continuous intraday platform,
additional guarantees may apply against the European CCP
infrastructure.

The aggregate guarantee position for a 500 GWh retailer
typically sits in the €5-15 million range. For a 2 TWh
retailer, €25-50 million. These are real working-capital
commitments.

## What goes wrong

Five patterns turn up.

**The calculation runs in a spreadsheet maintained by
one person.** When that person is on holiday, the
calculation either does not run or runs incorrectly. The
spreadsheet is also frequently a snapshot rather than a
live calculation, which means it lags the actual
position.

**The margin call escalation is informal.** A margin call
arrives by email; the email goes to a generic inbox;
nobody acts on it within the SLA; the next day the
counterparty escalates. The retailer is now on the
counterparty's risk-committee radar.

**The instruments are not optimised.** A retailer
posting all guarantees in cash is paying the full
opportunity cost of the capital. Bank guarantees or
insurance policies are typically cheaper for the
retailer; the trade-off is the haircut the counterparty
applies and the documentation overhead.

**The reconciliation against the counterparty report is
weak.** The counterparty publishes a daily statement of
the retailer's position and the guarantee requirement.
Reconciling the retailer's internal calculation against
this statement is often manual and skipped on busy
days.

**The default playbook does not exist.** A retailer that
hits an unexpected margin call does not have a documented
process for sourcing the additional collateral within
the counterparty SLA. The improvisation in this
situation is expensive.

## What a working monitoring function covers

Six components.

1. **A live calculation engine** that recomputes the
   guarantee requirement against each counterparty as
   positions change, not at end of day.
2. **A reconciliation layer** that compares the internal
   calculation against the counterparty's published
   statement daily.
3. **Working-capital optimisation** across cash, bank
   guarantee and insurance policy instruments, with a
   periodic review of the mix.
4. **A margin call escalation playbook** with named
   accountabilities and explicit SLAs.
5. **A default playbook** documenting how the retailer
   sources additional collateral inside the counterparty
   SLA, including pre-agreed credit lines with the
   primary banks.
6. **A monthly review with the treasury function** to
   keep the working-capital position visible at the
   leadership level.

## What this costs to put right

For a typical 500-2,000 GWh retailer, the build of a
working guarantee monitoring function is an 8 to 12 week
engagement. The ongoing operation is well-suited to a
managed-service model for retailers that do not have the
in-house treasury or trading-operations capacity.

The [purchasing
pillar](/services/energy/purchasing/) covers this as
workstream 3.

Related: [Operating against
OMIE](/services/energy/insights/operating-against-omie/),
[Billing management: DSO, REE, OMIE and
MEFF](/services/energy/insights/billing-management-dso-ree-omie-meff/),
[Iberian wholesale market
reporting](/services/energy/insights/iberian-wholesale-market-reporting/).
