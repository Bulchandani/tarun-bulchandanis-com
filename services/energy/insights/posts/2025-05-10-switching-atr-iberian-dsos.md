---
title: "Switching and ATR with the Iberian DSOs"
date: 2025-05-10
excerpt: "Switching customers in and out of an Iberian retail book runs on the SIPS data exchange with the eight major Spanish DSOs and Portuguese e-Redes. The formats are documented; the operational realities are less so. A note on the patterns that determine whether a retailer's net position grows or quietly leaks."
author: "Tarun Bulchandani"
---

Every customer change of supplier in the Iberian retail
market is processed through the SIPS data exchange. The
retailer initiates a switching request, the DSO
validates it, the customer's previous supplier is
notified, and the change becomes effective on the next
billing cycle. The mechanism is well-documented in the
ITC/2724/2009 framework and updated through the more
recent CNMC resolutions.

The operational realities of running this at scale are
where retailers find their largest unrecognised losses.

## The eight Spanish DSOs

The retailer operating nationally exchanges with:

- e-distribución (Endesa)
- i-DE (Iberdrola)
- UFD (Naturgy)
- Viesgo Distribución
- Hidrocantábrico (EDP)
- Plus the smaller regional DSOs: Bassols, Solanell,
  Estabanell, Eléctrica del Maestrazgo, and others

Each DSO has its own implementation of the SIPS message
format. They are nominally identical; in practice each
has minor variations in how it validates incoming
requests, how it formats outgoing responses, and how
quickly it processes exceptions. A retailer with a
national book runs eight independent integrations.

## The Portuguese exchange

Portugal runs the equivalent exchange with e-Redes (the
national DSO operated by E-Redes Distribuição). The
format is documented; the cadence is similar to the
Spanish exchange. The cross-border retailer with
business in both markets runs two separate sets of
integrations.

## What goes wrong

Five patterns drive most of the operational losses.

**CUPS mismatches.** The customer's CUPS code (the
unique identifier of the supply point) is the primary
key for the switching request. A mistyped CUPS, a
CUPS that has been updated in the DSO registry but not
in the retailer's system, or a CUPS with an out-of-date
status results in a rejected switching request. The
customer thinks they have switched; they have not.

**Postal code disputes.** The DSO validates the
postal code against its registry. A new customer at an
address with a recently updated postal code (street
renaming, new development) generates a rejection.

**Tariff code mismatches.** The customer applies for a
tariff that does not match the DSO's record of the
supply point's tariff eligibility. The switching
request rejects.

**P1-P6 period misclassifications.** The supply point's
time-of-use eligibility is recorded by the DSO. A
retailer offering a time-of-use tariff against a supply
point not registered for time-of-use generates a
rejection.

**Cancellation race conditions.** A customer initiates a
switch to retailer A, then changes their mind and
initiates a switch to retailer B before A has processed
the first switch. The SIPS framework specifies how
this should resolve; the implementation across the
eight DSOs is not perfectly uniform.

The aggregate effect of these patterns is that a
typical national retailer has 1-3% of its monthly
switching volume rejected for technical reasons. Of
those, perhaps half are recovered through the exception
process; the rest are quiet losses.

## What a working switching operation covers

Six components.

1. **A validation layer** that runs against each
   switching request before submission, checking CUPS,
   postal code, tariff eligibility and period
   classification against the latest DSO data.
2. **A submission discipline** with retry logic for
   transient DSO failures and escalation for persistent
   ones.
3. **An exception handling workflow** covering the
   common rejection reasons, with documented resolution
   paths and target SLAs.
4. **Monthly switching analytics** covering gross add,
   gross loss, net position, time-in-switch and
   exception rate by DSO.
5. **Customer communication discipline.** A customer
   whose switching request has been rejected should be
   notified within 48 hours, not left to discover the
   problem on the next bill from the previous supplier.
6. **A reconciliation against the ATR settlement
   invoices.** The switching activity drives the
   underlying customer book; the ATR settlement
   invoices have to reconcile against it.

## How this lands in operations

A retailer with weak switching operations is losing
customers without seeing why and gaining customers it
cannot bill. The operational damage shows up in two
places: the gross-add to net-add ratio and the
unrecovered ATR settlement variance.

For most retailers, switching operations is the
single highest-impact workstream in the back office.
The [operational management
pillar](/services/energy/operations/) covers it as
workstream 1.

Related: [Back-office operations for Iberian
retailers](/services/energy/insights/back-office-iberian-retailers/),
[Billing management: DSO, REE, OMIE and
MEFF](/services/energy/insights/billing-management-dso-ree-omie-meff/),
[Customer service operations in Iberian energy
retail](/services/energy/insights/customer-service-iberian-retail/).
