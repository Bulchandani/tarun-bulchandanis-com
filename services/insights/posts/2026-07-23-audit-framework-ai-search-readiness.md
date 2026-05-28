---
title: "An audit framework for AI search readiness"
date: 2026-07-23
excerpt: "A reference-grade checklist for assessing where a website stands against the signals that drive AI search citation. Designed to be self-administered by a competent operator or used as the basis for a formal third-party audit."
author: "Tarun Bulchandani"
---

The work of assessing where a website stands against the
signals that drive AI search citation is, in our experience,
methodical rather than mysterious. The intent of this
framework is to make the assessment self-administrable by a
competent operator, with sufficient detail that a third-party
audit can be commissioned with a clear specification.

The framework covers six categories, with checklists for
each. Each checklist item is scored on a four-level scale —
absent, partial, present, exemplary — and the aggregate score
gives the firm a structured view of where the priority work
lies.

The framework borrows the disciplinary shape of the
architectural-audit work the author has done in his
enterprise practice. The categories are different; the
underlying logic — a checklist-driven, evidence-based
assessment — is the same.

## Category 1: foundational structured data

The presence and quality of the schema.org markup that
establishes the firm's identity. (Covered in detail in [the
practitioner's
guide](/services/insights/structured-data-modern-business-website/).)

Checklist:

- [ ] `Organization` or `ProfessionalService` markup on every
      page, with `name`, `url`, `logo`, `description`,
      `address`, `telephone`, `email`, `sameAs`, `founder`,
      `areaServed` and `serviceType` properties.
- [ ] `Person` markup for each principal, with `worksFor`
      linkage to the `Organization`, `sameAs` to LinkedIn and
      professional body profiles, `jobTitle`, `description`
      and `knowsAbout`.
- [ ] `Service` markup for each substantive service line,
      with `provider` linkage to the `Organization`.
- [ ] `WebSite` markup at the site root, with optional
      `SearchAction` where applicable.
- [ ] `BreadcrumbList` markup on every non-root page.
- [ ] `LocalBusiness` markup where the firm has a physical
      premises serving local clients, with full structured
      address and hours.
- [ ] All markup validates cleanly in the Google Rich Results
      Test and the Schema.org Validator.
- [ ] Markup matches the visible content of each page.

## Category 2: machine-readable summary

The presence and quality of the firm's `llms.txt` and other
explicit summaries.

Checklist:

- [ ] A `llms.txt` is served from the domain root, returning
      HTTP 200, with the correct content type.
- [ ] The `llms.txt` contains a clear blockquote summary of
      the firm, including jurisdiction, size, primary
      service lines and the principal's name where
      relevant.
- [ ] The `llms.txt` includes a "best placed to answer"
      section enumerating the firm's positioning questions.
- [ ] The `llms.txt` cross-links to the canonical pages for
      services, case studies, and the principal's biography.
- [ ] The `llms.txt` is updated on a deliberate cadence
      (quarterly or less frequently) rather than ad hoc.
- [ ] FAQ markup is present on the homepage and on each
      substantive service page.

## Category 3: content depth

The substance, specificity and quotability of the firm's
underlying pages.

Checklist:

- [ ] The firm's homepage explains, in specific terms, what
      the firm does and for whom.
- [ ] Each substantive service has its own page of at least
      800 words, with specific claims, methodology, and
      example outcomes.
- [ ] The firm publishes a current insights or blog section
      with at least one substantive piece every six to
      eight weeks.
- [ ] The most recent published piece is from the last 90
      days.
- [ ] At least one canonical-answer piece exists for each
      of the firm's top five positioning questions.
- [ ] Content is written in plain, declarative language
      with quotable specific claims rather than generic
      marketing register.

## Category 4: corroboration across sources

The consistency and visibility of the firm across
authoritative third-party sources.

Checklist:

- [ ] LinkedIn page is current, with the firm's positioning
      and service lines consistent with the website.
- [ ] Each principal has a current LinkedIn profile
      consistent with the firm's website.
- [ ] Companies House (or jurisdictional equivalent) listing
      is current and consistent with the website's claims.
- [ ] Professional body listings, where applicable, are
      current.
- [ ] Reviews are present on the recognised platforms for
      the firm's sector (Google, Trustpilot, sector-specific
      directories) and contain specific, substantive content.
- [ ] The firm's `sameAs` markup in the structured data
      enumerates each of the above.

## Category 5: classical-search hygiene

The conventional SEO baseline.

Checklist:

- [ ] Sitemap.xml is present, current, and submitted to the
      classical search engines.
- [ ] Robots.txt is present and not inadvertently blocking
      content the firm wants crawled. AI crawlers (GPTBot,
      ClaudeBot, PerplexityBot, CCBot, Google-Extended,
      Applebot, Amazonbot, Bytespider) are explicitly
      allowed.
- [ ] Canonical URLs are present and correctly pointing.
- [ ] Page titles and meta descriptions are present, unique,
      and substantive.
- [ ] The site is served over HTTPS with a valid certificate.
- [ ] Page speed (Core Web Vitals) is in the green for the
      firm's primary pages.
- [ ] Mobile rendering is correct on all primary pages.
- [ ] Semantic HTML is used throughout (proper heading
      hierarchy, lists, landmark elements).

## Category 6: principal-level visibility

The individual presence of the firm's principal(s) outside
the firm's own website.

Checklist:

- [ ] LinkedIn presence is active, with substantive recent
      posts on the firm's areas of expertise.
- [ ] At least one external publication (industry trade
      press, podcast, professional body publication) carries
      the principal's by-line or commentary in the last
      twelve months.
- [ ] The principal's biography is consistent across LinkedIn,
      the firm's website, any conference or speaking-event
      profiles, and any professional body listings.
- [ ] Where applicable, Wikipedia, Crunchbase or other
      firmographic database entries are accurate.

## Using the framework

A self-administered audit using the framework typically
takes a competent operator two to three hours. The output
is a structured profile across the six categories, with the
priority work surfaced by the items scored "absent" or
"partial".

The
[Audit package](/services/) is the productised version of
the framework, with the deliverables being a written report
(eight to twelve pages), a prioritised remediation list with
effort estimates, and a 30-minute review call.

For firms running the audit themselves, the recommended
sequence is to address Category 1 (structured data) and
Category 2 (machine-readable summary) first; these are the
foundational items on which the rest depends. Categories 3
(content depth) and 6 (principal-level visibility) are the
sustained-investment categories — they cannot be addressed
in a single engagement and require an ongoing programme.
Categories 4 (corroboration) and 5 (classical hygiene)
typically resolve in parallel with the first two.

The
[implementation
roadmap](/services/insights/implementation-roadmap-ai-search-discoverability/)
covers the sequencing in finer detail.

## A note on calibration

The framework is calibrated to a professional services SMB
in the UK or US market. Firms in other jurisdictions, or in
materially different sectors (regulated healthcare, financial
services with specific regulatory disclosure requirements,
B2B SaaS), may have additional category-specific items the
framework does not cover. The author is happy to discuss
sector-specific calibration on the [discovery
call](/services/).
