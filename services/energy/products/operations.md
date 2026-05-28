---
layout: layouts/page.njk
permalink: /services/energy/products/operations/
title: "AI-led operations products"
pageEyebrow: "AI-led products"
pageTitle: "AI-led operations products"
pageLede: "Four AI-led products covering the operational management pillar: switching and ATR validation, back-office automation, customer service co-pilot, and regulatory filing assistant. Built for the back-office reality of a small operations team carrying a large retail book."
description: "AI-led products for Iberian energy retail operations: SIPS switching and ATR validation, back-office automation, customer service co-pilot, regulatory filings for MITECO, CNMC, REE and OMIE."
---

The advisory pillar covers what good looks like in
[operational management](/services/energy/operations/).
The products on this page are the AI-led
implementations that make the back office viable at
a small team size.

## Product 5: Switch

**AI validation and exception handling on the SIPS data
exchange with the eight Spanish DSOs and Portuguese
e-Redes.**

The retailer's net position growth depends on
switching working cleanly. Most retailers lose 1 to 3
percent of their monthly switching volume to technical
rejections that nobody recovers. Switch is the
validation and exception-handling layer that runs
against each request before submission and works the
exception backlog after.

What it does:

- Pre-submission validation against the latest DSO
  data: CUPS, postal code, tariff eligibility, P1-P6
  period classification
- Retry logic for transient DSO failures with
  escalation for persistent ones
- Exception classification across the common rejection
  reasons: CUPS mismatch, postal code dispute, tariff
  code mismatch, period misclassification,
  cancellation race conditions
- Customer-facing notification: rejected switches
  surface to the customer service team within 48 hours,
  not on the next bill from the previous supplier
- Monthly switching analytics by DSO: gross add, gross
  loss, net position, time-in-switch, exception rate
- Reconciliation hook into the [Reconcile
  product](/services/energy/products/purchasing/) so
  the switching activity reconciles against the ATR
  settlement invoices

What it integrates with:

- The eight Spanish DSO SIPS endpoints
  (e-distribución, i-DE, UFD, Viesgo, Hidrocantábrico
  and the regional DSOs)
- Portuguese e-Redes
- The retailer's CRM
- The retailer's customer service workflow

**Engagement:** 8 to 12 weeks build. Strongly
recommended managed-service follow-on; the SIPS
formats are documented but not perfectly stable across
the DSOs, so ongoing maintenance is real.

**Best for:** Retailers operating nationally across
multiple DSOs, particularly those with monthly
switching volume above 1,000 supply points.

Related reading: [Switching and ATR with the Iberian
DSOs](/services/energy/insights/switching-atr-iberian-dsos/).

## Product 6: Office

**AI-augmented back-office covering invoice generation,
direct debit dunning, bad-debt management and CRM
hygiene.**

The back-office is the unsexy machinery that determines
the cost-to-serve. Office is the AI augmentation that
moves a typical retailer from €30 to €40 per customer
per year to €15 to €25, with materially better
operational discipline.

What it does:

- Invoice generation quality checks before dispatch:
  format compliance, calculation reconciliation,
  channel preference enforcement
- Direct debit failure handling: automated dunning
  cycle, escalation to customer service for resolution
  calls, defined write-off thresholds
- Bad-debt risk segmentation and collection workflow,
  with collection-agency hand-off for the right
  customers
- CRM hygiene: duplicate detection, address-change
  propagation to the DSO via the switching workflow,
  ownership transfer handling
- Document management: contract versioning, terms-of-
  service retrieval, marketing claims audit trail

What it integrates with:

- The retailer's billing engine
- The retailer's CRM
- SEPA direct debit infrastructure
- The Switch product (or any equivalent switching
  workflow)
- The retailer's customer service system

**Engagement:** Programme of 6 to 12 months, in phases.
Each phase covers a defined workstream (invoice
generation, then direct debit, then bad debt, then CRM
hygiene). Phased delivery so the retailer sees
operating-cost improvement at each milestone.

**Best for:** Retailers with cost-to-serve materially
above €25 per residential customer or €80 per SME
supply point per year. Also retailers with bad-debt
write-offs above 2 percent of revenue.

Related reading: [Back-office operations for Iberian
retailers](/services/energy/insights/back-office-iberian-retailers/).

## Product 7: Serve

**Customer service co-pilot tuned to the three Iberian
retail customer populations: residential PVPC and
free-market, SME bilateral, corporate structured.**

Customer service is operationally fragile in most
retailers: high volume, low value per call, tight
CNMC complaint-handling timeframes, three distinct
customer populations with different needs. Serve is
the agent layer that handles the routine queries
directly and supports the human agent on the queries
that need escalation.

What it does:

- Self-service for the routine queries (bill
  explanation, consumption history, switching status,
  tariff comparison)
- Triage and routing for queries that need human
  service, with proper segmentation by population
- Human-agent co-pilot: surfaces the customer
  history, the open issues, the relevant tariff terms,
  the regulatory complaint window
- Complaint root-cause feedback into the back office:
  recurring complaint patterns surface to operations
  for systemic fixes rather than being handled one at
  a time
- CNMC complaint pipeline management: escalations
  routed through the right path with the SLA tracking
  the regulator expects

What it integrates with:

- The retailer's CRM
- The retailer's billing engine
- The retailer's complaint-handling system
- The Switch product (or any equivalent switching
  workflow)
- The Office product (or any equivalent back-office)

**Engagement:** 8 to 16 weeks build. Optional
managed-service operating-model takeover for
retailers that prefer to outsource the function.

**Best for:** Retailers with high residential volume
(above 30,000 customers), or retailers with material
SME or corporate customer bases where the cost-to-
serve has to absorb more sophisticated service
delivery.

Related reading: [Customer service operations in
Iberian energy
retail](/services/energy/insights/customer-service-iberian-retail/).

## Product 8: File

**Regulatory filing assistant covering the MITECO,
CNMC, REE and OMIE submission calendar, plus the DGEG
and ERSE equivalents.**

The retail licence depends on the regulatory filings
landing on time and in the right form. File is the
agent layer that runs the filing calendar, prepares
the submissions from canonical data sources, validates
them against the regulator's published rules, and
maintains the audit trail.

What it does:

- Filing calendar covering all mandatory submissions
  with named accountabilities, target delivery dates
  and upstream data dependencies
- Submission preparation from canonical data, with
  automated validation against the previous
  submission and the relevant financial statements
- Pre-submission review workflow with sign-off by the
  regulatory function and the finance function
- Versioned audit trail preserving the submission,
  the underlying data, and the methodology applied
- Exception handling for the cases where a filing
  cannot be made on time, with documented escalation
  paths
- Sanction-response playbook for the cases where a
  sanction notice arrives

What it integrates with:

- MITECO submission portals
- CNMC submission portals
- REE and OMIE settlement and reporting interfaces
- DGEG and ERSE for Portugal
- The retailer's billing engine and CRM (data sources)
- The retailer's finance close (data dependency)

**Engagement:** 6 to 10 weeks build. Strongly
recommended ongoing managed-service support given the
calendar weight and the sanction exposure.

**Best for:** Every retailer with an active Iberian
licence. Sanction exposure is universal; the
discipline of getting filings right pays back across
the licence lifecycle.

Related reading: [Submitting regulatory reports in
Iberian energy
retail](/services/energy/insights/regulatory-reports-iberian-retail/).

## Where these products sit together

The four operations products are designed to be
implemented together but each can run standalone. The
most common sequence:

1. **File first.** Regulatory exposure is the largest
   immediate risk and the filing assistant pays back
   quickly.
2. **Switch next.** Net position growth depends on
   this; the operational analytics feed the rest of
   the suite.
3. **Office third.** Back-office cost-to-serve
   improvement, phased over 6 to 12 months.
4. **Serve last.** Builds on the three above; the
   customer service function needs the other three
   to be solid before it can be augmented usefully.

## Related

- [Operational management advisory pillar](/services/energy/operations/) (what good operations look like)
- [AI-led purchasing products](/services/energy/products/purchasing/)
- [AI-led analytics products](/services/energy/products/analysis/)
- [Products hub](/services/energy/products/)
- [Cyber guardrails for AI agents in regulated workflows](/blog/cyber-guardrails-ai-agents-regulated/)
