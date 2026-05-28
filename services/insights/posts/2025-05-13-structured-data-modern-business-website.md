---
title: "Structured data for the modern business website: a practitioner's guide to Schema.org"
date: 2025-05-13
excerpt: "Schema.org has, in the AI-search era, moved from an optional optimisation to a foundational discoverability layer. A reference-grade walkthrough of the types every SMB website should implement, the common implementation errors I see in practice, and where the boundaries of useful markup actually lie."
author: "Tarun Bulchandani"
---

Schema.org has, until recently, sat in the corner of the website-marketing toolkit reserved for technical SEO specialists. It improved the appearance of search results in small but meaningful ways: review stars on a product listing, event details in a local search, the FAQ accordion in a Google SERP. Most SMBs could safely leave it to the template platform's defaults and feel they had not lost much.

That position is no longer tenable. Generative search interfaces use schema.org markup as a primary signal for understanding what a page is about, who the firm is, and what the firm's authoritative claims are. A site without structured data is, to the model, materially harder to read than a site with it. The cost of correct implementation is, in 2025, low enough that there's no longer a defensible reason for an SMB website to ship without it.

This guide sets out, in practitioner-grade detail, the schema.org types every professional services SMB should implement, the common errors that arise when they're implemented carelessly, and the boundary at which additional markup stops adding value.

## The core types

There are six core types every SMB website should implement. These are not optional; they're the foundation on which the rest of the discoverability programme is built.

### 1. `Organization` (or `ProfessionalService`, `LocalBusiness`)

The first piece of structured data is a declaration of what the firm is. For most SMBs, the right type is `ProfessionalService` (or `LocalBusiness` for firms with a physical premises that serves walk-in clients). For firms that straddle multiple service lines and locations, plain `Organization` is the safe fallback.

The minimum useful properties:

- `name`, `legalName`
- `url`
- `logo` (a URL to the firm's logo image)
- `description`
- `address` (full structured address: country, region, town, postcode, street)
- `telephone`, `email`
- `sameAs` (LinkedIn, Companies House profile, professional body listings)
- `founder` (linked to the `Person` markup for the principal)
- `areaServed`
- `serviceType`

The single most common error is omitting `sameAs`. The `sameAs` field is the model's primary mechanism for cross-referencing the firm against external sources. A firm that lists its LinkedIn and Companies House URLs in `sameAs` is materially easier for the model to verify than one that doesn't.

### 2. `Person` (for each principal whose reputation matters)

For SMBs in professional services, the firm's reputation is often the founder's reputation. A `Person` entity for the founder, with proper `worksFor` linkage to the `Organization`, makes that reputational graph machine-readable.

The minimum useful properties:

- `name`, `givenName`, `familyName`
- `url`
- `image`
- `jobTitle`
- `worksFor` (linked to the `Organization`)
- `sameAs` (LinkedIn, GitHub, professional body profiles, Wikipedia where applicable)
- `description`
- `knowsAbout` (the firm's areas of expertise, expressed as a list of topics or `Thing` references)

### 3. `Service`

Each substantive service line should have its own `Service` entity, with proper linkage back to the `Organization`. This is, in practice, where most SMB sites are weakest. The services pages are present, but they aren't marked up.

The minimum useful properties:

- `name`, `description`
- `provider` (linked to the `Organization`)
- `areaServed`
- `serviceType`
- `offers` (where the service is productised at a fixed price)

### 4. `WebSite`

A single `WebSite` entity at the site root, with `SearchAction` markup where the firm operates an on-site search, establishes the site as a recognised content property.

### 5. `BreadcrumbList`

Per-page breadcrumb markup gives the model a clear hierarchy of the site's information architecture. The cost of implementation is trivial; the benefit, in my work, is not.

### 6. `FAQPage`

FAQ sections on key pages, with proper `FAQPage` markup, are covered separately in [a dedicated piece](/services/insights/faq-schema-ai-search-visibility/). The short version: of all the structured-data interventions available, FAQ markup is the one that most reliably produces direct citations in generative search interfaces.

## The common implementation errors

Five errors account for the majority of the structured-data problems I see in audits.

**Markup that contradicts the visible page.** The schema says the firm has 50 employees; the about page says 5. Models, in this situation, will down-weight the firm's overall credibility. The schema must match the visible content.

**Markup that's incomplete or partial.** A `ProfessionalService` entity with only `name` and `url`, missing `address`, `description` and `sameAs`, is of limited use. Either implement the full minimum useful set, or don't implement at all. Partial markup is sometimes worse than none.

**Markup that uses the wrong type.** `Organization` when `ProfessionalService` would be more specific; `LocalBusiness` on a firm with no physical premises; `Article` on pages that aren't articles. The type system is precise. The practice of choosing the most specific applicable type should be followed.

**Markup applied as JSON-LD on a single page and missing elsewhere.** The `Organization` and `WebSite` markup should appear on every page, not only the homepage. Per-page markup (BlogPosting, FAQPage, BreadcrumbList) varies; the global markup does not.

**Markup that's never validated.** Schema.org markup that hasn't been run through the Google Rich Results Test, the Schema.org Validator, or both, is almost certainly broken in some non-obvious way. Validation is a five-minute task. It is, with depressing frequency, skipped.

## Where the boundary lies

There's a real risk of over-instrumenting. Schema.org has several hundred types, many of which are useful only in narrow contexts. The practice of marking up everything that admits a type is counter-productive; it raises the cost of maintaining the markup without proportional discoverability benefit.

The practical boundary is to mark up:

- The firm itself (the six core types above).
- Each substantive service.
- Each principal (`Person`).
- Each substantive piece of content (`Article` or `BlogPosting`, with proper `author` linkage).
- Each FAQ section.
- Breadcrumb hierarchies.
- Where applicable: `LocalBusiness` hours, `Event` listings, `Review` and `AggregateRating` for genuinely accumulated reviews.

The list stops there. `HowTo`, `Recipe`, `MedicalEntity`, `SoftwareApplication` and the other long-tail types are appropriate when the firm publishes that kind of content; otherwise they're out of scope.

## Implementation in practice

For a firm on a modern build (Eleventy, Astro, Next.js, SvelteKit, or any framework that supports proper template inheritance), the right pattern is to render the global markup (`Organization`, `WebSite`, `Person`) in a layout template, the per-page markup (`Article`, `FAQPage`, `BreadcrumbList`) in the page-specific template, and to keep the JSON-LD in the document `<head>`. The markup shouldn't duplicate visible content as plain text; it should reference the same underlying data.

For a firm on a template platform (Squarespace, Wix, Webflow), the situation is more constrained. Each platform allows some custom JSON-LD injection, but the depth of integration with the platform's own content model varies. The [template platform assessment](/services/insights/template-platforms-ai-discoverability-gap/) covers the trade-offs in detail.

## Where this fits

Schema.org markup is, in the [implementation roadmap](/services/insights/implementation-roadmap-ai-search-discoverability/), the first foundational workstream. It's the one that has to be in place before any of the content or authority work pays off in generative search. A site whose structured data is right is, in my work, materially more likely to be cited than a site whose content is excellent but whose markup is missing or broken.

The [Retrofit](/services/) package addresses the full structured-data implementation for an existing site; the [Build](/services/) package ships with it baked in.
