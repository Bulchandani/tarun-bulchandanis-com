---
title: "Back-office operations for Iberian retailers"
date: 2025-06-25
excerpt: "The back office is the part of the retailer that most CEOs do not understand in detail and that determines whether the business is commercially viable. Invoice generation, direct debit collection, dunning, customer data management. A note on what good looks like."
author: "Tarun Bulchandani"
---

The back office of an energy retailer is the unsexy
machinery that sits between purchasing, switching,
customer service and the financial close. It is also
where the difference between a viable business and a
loss-making one shows up most clearly.

A retailer with strong back-office operations runs at a
cost-to-serve in the €15-25 per customer per year range
on residential and €40-80 per supply point on SME. A
retailer with weak back-office operations runs at twice
that, with significantly higher write-offs.

This note covers the workstreams that determine which
side of that line the retailer sits on.

## Invoice generation and dispatch

The retailer issues monthly or bi-monthly invoices
covering the customer's consumption, applicable tariff
components and adjustments. The invoice has to comply
with the CNMC regulated format, has to be issued within
the regulatory window, and has to dispatch through the
customer's preferred channel.

What goes wrong:

- Invoice runs fail mid-cycle and require manual
  intervention to restart.
- Invoices reach the customer with errors that the
  customer service team then has to handle.
- Customers on electronic-invoice opt-in receive paper
  invoices anyway, or the reverse.
- The invoice format does not match the regulated
  format, which generates customer disputes and CNMC
  complaints.

A working invoice generation function has automated
quality checks before dispatch, a clear escalation
process for failures, and a monthly review of
invoice-related complaint volumes.

## Direct debit collection

Most Iberian residential customers pay by direct debit.
The collection cycle runs against the SEPA payment
infrastructure. The fail rate is meaningful (typically
2-5% of attempted collections on a residential book),
and the cost of unrecovered collections lands directly
in margin.

What goes wrong:

- Failed collections retry with no escalation, building
  up arrears.
- Customers with refused direct debits do not move to
  an alternative payment method promptly.
- The dunning process is informal; some customers
  receive too many letters, others receive none.

A working collection function has a documented dunning
cycle, automated escalation through the cycle, clear
hand-off to the customer service team for resolution
calls, and a defined write-off threshold.

## Bad debt management and write-off

Some customers cannot or will not pay. The retailer has
to manage the bad-debt cycle: identify the at-risk
customers early, work the collection cycle, escalate
to a collections agency if appropriate, write off when
the collection cost exceeds the recoverable value.

What goes wrong:

- The retailer keeps unrecoverable debts on the books
  because nobody owns the write-off decision.
- The retailer writes off too aggressively because the
  bad-debt sits visibly on the financial close.
- The retailer's collection agency relationship is not
  managed, with poor recovery rates.

A working bad-debt function has a clear customer
risk-segmentation, defined collection workflows by
segment, and a quarterly review of the
collection-vs-write-off economics.

## Customer data management

The retailer's CRM is the source of truth for the
customer book. Address changes, ownership transfers,
tariff changes, communication preferences. The data
quality determines whether the rest of the back office
works.

What goes wrong:

- Duplicate customer records accumulate over time.
- Address changes do not propagate to the DSO via the
  switching exchange, generating switching exceptions
  later.
- Ownership transfers (a customer moves out, a new
  customer moves in at the same CUPS) are mishandled,
  generating billing disputes.
- Communication preferences are not respected,
  generating complaints to the CNMC.

A working CRM operation has data-quality monitoring,
automated deduplication checks, defined ownership
of master-data updates, and a regular cleansing
cadence.

## Document management

Contracts, terms of service, marketing claims, customer
correspondence, regulatory filings. The retailer has
to keep these in an auditable, retrievable form for
the regulatory retention period.

What goes wrong:

- Customer contracts are not accessible at the speed the
  customer service team needs them.
- Terms-of-service updates are not properly versioned,
  generating disputes about which terms apply to which
  customer.
- Marketing claims audit trails are weak, generating
  CNMC complaints when claims and reality diverge.

A working document management function has versioned
contracts, retrievable in real-time by the customer
service and legal functions.

## How this lands in operations

The back office is not a glamorous workstream. It is
also the workstream where the difference between a
viable retailer and a loss-making one is made.

For most retailers under 500 GWh, the back office runs
on a combination of off-the-shelf software (billing
engine, CRM, document management) and bespoke
integration. The operational discipline matters more
than the choice of software.

The [operational management
pillar](/services/energy/operations/) covers
back-office operations as workstream 2, with a
diagnostic engagement that surfaces the priority
remediation.

Related: [Switching and ATR with the Iberian
DSOs](/services/energy/insights/switching-atr-iberian-dsos/),
[Customer service operations in Iberian energy
retail](/services/energy/insights/customer-service-iberian-retail/),
[Billing management: DSO, REE, OMIE and
MEFF](/services/energy/insights/billing-management-dso-ree-omie-meff/).
