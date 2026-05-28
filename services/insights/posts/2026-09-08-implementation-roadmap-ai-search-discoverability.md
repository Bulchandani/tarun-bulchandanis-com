---
title: "A 30-day implementation roadmap for AI search discoverability"
date: 2026-09-08
excerpt: "A sequenced four-week plan for an SMB that has decided to address AI search discoverability seriously. Written for the operator delivering the work, with sufficient detail for an owner-manager to commission and supervise it competently."
author: "Tarun Bulchandani"
---

The intent of this roadmap is to set out, in week-by-week
detail, what a competent operator delivering the first
foundational engagement on an SMB website should do, in what
order, and to what standard. The sequencing matters: a number
of items depend on others being in place first, and getting
the order wrong adds cost without proportionate benefit.

The roadmap is calibrated to a typical professional services
SMB with an existing website that has not previously
addressed AI search. It is approximately the scope of the
[Retrofit
package](/services/) — a two-week implementation engagement
preceded by a one-week audit and followed by a one-week
review and refinement window.

The roadmap is also a useful template for an owner-manager
commissioning the work from a third party. Each phase is
self-contained enough that progress can be reviewed, and the
deliverables for each phase are explicit.

## Week 1 — audit and baseline

The first week is exclusively diagnostic. No structural
changes are made to the site until the audit is complete.

**Day 1-2: structured audit.** Run the [audit
framework](/services/insights/audit-framework-ai-search-readiness/)
in full. The output is a written assessment across the six
categories, with each item scored.

**Day 3: external corroboration audit.** Pull the firm's
LinkedIn, Companies House, professional body listings, review
profiles, and any other third-party presence. Assess
consistency with the website. Note any contradictions for
remediation.

**Day 4: test-query work.** Run a curated set of 20-30
queries against ChatGPT, Claude, Perplexity, Microsoft
Copilot, Google's AI Overviews and Gemini. The queries should
be the ones the firm wants to be cited on. Note which
assistants cite the firm, which cite competitors, and which
decline to recommend anyone. The baseline is the reference
against which the post-engagement work will be measured.

**Day 5: written report and remediation plan.** Synthesise
the audit into a single document — the firm's starting
position, the priority remediation list, the effort estimates
for each, and the recommended sequencing.

**Deliverable at end of week 1:** A written audit report
(8-12 pages), a prioritised remediation list, and a baseline
test-query result set.

## Week 2 — foundational structured data

The first week of implementation work addresses the
structural items. These are the foundational layer on which
everything else depends.

**Day 6-7: schema.org `Organization` and `WebSite`.** Add or
correct the site-wide markup. This includes `Organization`
(or `ProfessionalService`, or `LocalBusiness`), the principal
`Person` entities, and `WebSite` at the site root. The markup
should be implemented in the layout template so it renders on
every page; for template platforms, the appropriate
per-platform mechanism is used. (See the [practitioner's
guide to
Schema.org](/services/insights/structured-data-modern-business-website/)
for the specifics.)

**Day 8: per-page `Service` and `BreadcrumbList`.** Each
substantive service page gets its own `Service` markup. Every
non-root page gets `BreadcrumbList` markup.

**Day 9: validation.** Run every page with structured data
through the Google Rich Results Test and the Schema.org
Validator. Fix any validation errors before proceeding.

**Day 10: `llms.txt`.** Draft and publish the `llms.txt` at
the domain root. (See: [Understanding
llms.txt](/services/insights/understanding-llms-txt/) for
the structure and contents.) The draft should be reviewed by
the firm's principal before publication.

**Deliverable at end of week 2:** All foundational
structured data in place, validating cleanly. `llms.txt`
published.

## Week 3 — content density and FAQ markup

The third week addresses the content-layer interventions.
These are not a full content programme — that is the
ongoing investment — but the targeted interventions that
make the foundational work pay off.

**Day 11-12: FAQ schema on service pages.** For each
substantive service page, draft a FAQ section of 6-10
questions, with substantive specific answers. Mark up with
`FAQPage` schema. (See: [FAQ
schema](/services/insights/faq-schema-ai-search-visibility/).)
The questions should be the ones the firm's principal
genuinely hears on discovery calls.

**Day 13: principal biography page.** Draft or refine the
principal's biography to be substantive and consistent with
LinkedIn and professional body listings. Mark up with
`Person` schema.

**Day 14: content review on existing pages.** Read every
page on the site. Flag any pages whose content is thin
(under 400 words), generic, or contradicts other claims on
the site. Where possible, expand or rewrite. Where a full
rewrite is out of scope for the engagement, flag for the
follow-on content programme.

**Day 15: canonical-answer pieces.** Where the firm has
positioning questions that are not yet substantively
answered anywhere on the site, draft canonical-answer
pieces. Typically 800-1,500 words each. These become
permanent reference pages, not blog posts.

**Deliverable at end of week 3:** FAQ schema on all
substantive pages. Principal biographies in place. Content
density addressed on existing pages, with any out-of-scope
items flagged for the follow-on programme.

## Week 4 — classical hygiene and review

The final week addresses the classical SEO hygiene that the
generative search layer also depends on, and reviews the
work against the baseline.

**Day 16: robots.txt and sitemap.** Confirm robots.txt
explicitly allows the AI crawlers (GPTBot, ClaudeBot,
PerplexityBot, CCBot, Google-Extended, Applebot, Amazonbot,
Bytespider, cohere-ai). Confirm sitemap.xml is current and
properly structured. Submit to Google Search Console and
Bing Webmaster Tools.

**Day 17: canonical URLs and meta.** Check canonical tags
on every page. Verify meta titles and descriptions are
unique, substantive, and accurate. Fix any duplicate or
missing canonicals.

**Day 18: page speed and accessibility.** Run Lighthouse on
the firm's primary pages. Address any accessibility
violations and any Core Web Vitals failures.

**Day 19: test-query re-baseline.** Run the same 20-30
queries from week 1 against the same six assistants. Note
changes. The full effect of the engagement is unlikely to
appear within the engagement window — the search interfaces
typically take 4-8 weeks to fully re-index — but early
signals are usually visible.

**Day 20: handover.** Written summary of the work, with
before/after structured data, before/after test-query
results, the canonical-answer list, the content programme
recommendations, and the maintenance commitments going
forward.

**Deliverable at end of week 4:** Engagement complete. Site
is in the AI-search-ready state. Handover document is in the
firm's hands.

## Beyond the engagement

The foundational work is, by design, finite. Once it is
done, the firm's ongoing commitment is the content
investment — the sustained publishing cadence that the
[Authority
package](/services/) productises — and a periodic
maintenance review.

The recommended maintenance cadence:

- **Monthly:** Test-query check against the tracked query
  set. Note any changes.
- **Quarterly:** Review the `llms.txt`. Update if the firm's
  positioning or service lines have materially changed.
- **Annually:** Full structured-data audit. Confirm the
  schema.org work is still validating, that AI crawler
  allowances are still appropriate, that the principal
  biographies are still current.

The
[Authority Maintenance Retainer](/services/) productises
this ongoing cadence for firms that prefer to delegate it.

## A note on expectations

The work described in this roadmap reliably moves a firm
from "structurally invisible" to "competitively visible" in
AI search. It does not, and cannot, guarantee that the firm
will be the top recommendation for every query in its
category. The selection of which firm is recommended depends
on factors — principal-level reputation, third-party
citations, sustained content investment — that no four-week
engagement can fully address.

The work also takes time to fully propagate. The major
generative search interfaces typically take four to eight
weeks to fully re-index the firm's pages after substantial
structural changes. The firm should expect to see partial
results within the engagement window and the full effect
within two to three months.

The [state of AI-driven search in
2026](/services/insights/state-ai-driven-search-2026/) note
covers the broader market context for the work.
