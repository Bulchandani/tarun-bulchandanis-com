---
title: "Submitting regulatory reports in Iberian energy retail"
date: 2025-10-05
excerpt: "The Iberian retail licence carries a calendar of mandatory submissions to the Ministerio, the CNMC, REE and OMIE. The cadence ranges from daily settlement reports to annual operating returns, and each filing has its own sanction exposure for misses or errors."
author: "Tarun Bulchandani"
---

The retail licence in Spain and Portugal carries a
calendar of mandatory regulatory submissions. The
submissions feed multiple authorities: the Ministerio
para la Transición Ecológica (MITECO), the CNMC, REE
(the Spanish system operator), OMIE (the market
operator), and the Portuguese equivalents (DGEG, ERSE,
REN). Each filing has its own format, its own validation
rules, and its own sanction exposure for misses or
errors.

This note covers the calendar, the patterns that turn up
in audit, and what a working filing function actually
needs.

## The calendar at a glance

**Daily.** Settlement files to OMIE and REE covering the
retailer's positions. These are produced automatically
by most billing engines, but the validation discipline
matters.

**Weekly.** OMIE settlement reconciliation. REE
balancing position reconciliation.

**Monthly.** CNMC customer-position returns (number of
customers by tariff segment). MITECO renewable-energy
returns for retailers offering green tariffs.
ATR settlement reconciliation across DSOs.

**Quarterly.** CNMC complaint statistics. Bono Social
(social bond) returns. Quality-of-supply returns.

**Annually.** CNMC annual operating return. MITECO
annual renewables return. GdO cancellation returns.
Audited financial statements.

**Ad-hoc.** Each new CNMC resolution typically
triggers a specific reporting obligation. The
regulator publishes these continuously; the retailer's
regulatory function tracks them and responds.

A retailer operating in both Spain and Portugal runs the
equivalent calendar against DGEG and ERSE in parallel.

## Where retailers struggle

Five patterns.

**The calendar lives in one person's head.** The
regulatory function has one person who knows what is due
when. When that person leaves or takes holiday, filings
slip.

**The submission depends on data that arrives late.**
The customer position return depends on the billing
engine being closed for the month. If the close runs
late, the submission runs late. The CNMC typically
allows a short extension; repeated extensions generate
attention.

**The validation is weak.** The submission is in the
right format but contains data that does not
reconcile against the previous month's submission or
against the retailer's audited financial statements.
The variance is found later, in audit, after the
submission has been accepted.

**The audit trail is thin.** The retailer submits the
return; six months later the CNMC opens a query about
the submission. The retailer has to reconstruct the
inputs from operational data; the reconstruction is
slow and the answer is uncertain.

**The sanction exposure is under-managed.** A missed
filing or an error in a filing triggers a sanction
process. The sanction is typically negotiable in scope
but only if the retailer engages quickly and credibly.
The first response to a sanction notice is often
defensive and slow, which costs.

## What a working filing function looks like

Six components.

1. **A filing calendar** covering all mandatory
   submissions, with named accountabilities, target
   delivery dates and dependency on upstream data
   close.
2. **A submission engine** that produces each return
   from a canonical data source, with automated
   validation against the previous submission and the
   relevant financial statements.
3. **A versioned audit trail** preserving the
   submission, the underlying data, and the
   methodology applied.
4. **A pre-submission review process** with sign-off
   by the regulatory function and the finance function.
5. **An exception handling workflow** for the cases
   where the filing cannot be made on time, with
   documented escalation to the relevant authority.
6. **A sanction-response playbook** for the cases
   where a sanction notice arrives.

## How this lands in operations

The regulatory function is the part of the retailer
that protects the operating licence. A retailer with
weak regulatory operations is one missed filing or one
material error from a sanction process that
materially affects the cost of doing business.

For most retailers under 1 TWh, the right operating
model is a small dedicated function (2-4 people) with
strong process discipline and a managed-service
relationship with an external advisor for the larger
filings and the sanction-response workstream.

The [operational management
pillar](/services/energy/operations/) covers
regulatory submissions as workstream 4.

Related: [Back-office operations for Iberian
retailers](/services/energy/insights/back-office-iberian-retailers/),
[Regulatory monitoring for Iberian
retailers](/services/energy/insights/regulatory-monitoring-iberian-retailers/),
[Customer service operations in Iberian energy
retail](/services/energy/insights/customer-service-iberian-retail/).
