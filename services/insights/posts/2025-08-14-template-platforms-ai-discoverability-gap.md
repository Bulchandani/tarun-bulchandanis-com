---
title: "Template platforms and the AI discoverability gap: a vendor-by-vendor assessment"
date: 2025-08-14
excerpt: "Squarespace, Wix, Webflow, WordPress and Shopify cover the overwhelming majority of SMB websites in the UK and US. Each platform has a different position on AI-search readiness. A frank, non-affiliated comparison."
author: "Tarun Bulchandani"
---

The question we are most often asked, on the first call of a
new engagement, is whether the firm's existing template
platform is good enough or whether a rebuild is warranted. The
answer, in most cases, is platform-specific. Each major
template platform has a different position on AI-search
readiness, and the gap between what the platform exposes by
default and what the discipline now requires varies materially.

The intent of this assessment is to give a frank, vendor-neutral
view of where the major platforms stand. The author has no
commercial relationship with any of the platforms named below
and no affiliate revenue from any link. The assessment reflects
work done across client engagements over the past eighteen
months.

The assessment criteria are the same for each platform:

1. **Schema.org coverage** — does the platform render the core
   types (`Organization`, `Service`, `Person`, `WebSite`,
   `BreadcrumbList`, `FAQPage`) by default, with the right
   level of completeness?
2. **`llms.txt` support** — does the platform let the firm
   serve a `llms.txt` at the domain root?
3. **Content depth tolerance** — does the platform's editor
   make it easy or hard to publish 1,500-word pieces with
   structured headings, citations and internal links?
4. **Custom code access** — can the firm add custom JSON-LD,
   custom meta tags, custom robots directives, and custom head
   content where the defaults are inadequate?
5. **Indexability discipline** — does the platform produce
   clean URLs, sensible canonicals, and a properly structured
   sitemap.xml?

The assessment is current at the time of writing. Platform
features change; an annual revisit is warranted.

## Squarespace

**Schema.org coverage.** Squarespace renders a baseline
`Organization` and `WebSite` markup on most templates, with a
modest set of properties. `LocalBusiness` markup is exposed
where the site has a configured business address. The
platform does not expose `Person`, per-service `Service`
entities, or `FAQPage` markup by default. Custom JSON-LD can
be injected via the Code Injection feature, but the work has
to be done by hand for each page that needs it.

**`llms.txt` support.** Squarespace does not natively support
serving a `llms.txt`. The available workarounds (a workaround
URL on a subdomain, a hosted static file via Cloudflare, an
unsightly `/llms-txt/` page) are all imperfect.

**Content depth tolerance.** The blog editor handles
long-form content acceptably. The page editor is harder
for non-blog content over 1,000 words; the section-based
layout system makes it awkward to flow large amounts of
prose.

**Custom code access.** Available on Business and higher
plans. The Personal plan does not include it, which is a
material limitation.

**Indexability discipline.** URLs are reasonably clean.
Sitemap is auto-generated. Canonicals are present but, on
some templates, point to URLs the firm did not intend.

**Verdict.** Acceptable for firms that have already chosen
Squarespace and are not willing to migrate, provided they
are on Business plan or higher and willing to do meaningful
custom work. Not the platform we would recommend for a new
build that takes AI discoverability seriously.

## Wix

**Schema.org coverage.** Wix has, in the last two years,
materially improved its structured-data defaults. `Organization`,
`WebSite` and (where appropriate) `LocalBusiness` markup is
rendered automatically. The Wix Editor exposes some
schema.org settings through its SEO panel, but the
properties exposed are a subset of the useful set. Custom
JSON-LD can be injected through the SEO panel's advanced
section.

**`llms.txt` support.** Wix added basic `llms.txt` support
in 2025 through its SEO settings. The implementation is
limited — the firm can supply the content but the file is
generated and served by Wix rather than directly editable as
a Markdown file — and the workflow is awkward, but it
exists.

**Content depth tolerance.** The Wix editor is structurally
hostile to long-form. The editor is built around drag-and-drop
section blocks rather than flowing text, and pages over 1,500
words become difficult to edit. The Wix Blog editor is more
forgiving but limited in formatting options.

**Custom code access.** Available on the Business and higher
plans. The editing workflow is, by template-platform
standards, reasonable.

**Indexability discipline.** URLs are clean, sitemap is
auto-generated, canonicals are present.

**Verdict.** Acceptable for service firms whose content
strategy is centred on shorter-form pages and a modest blog
cadence. Not appropriate for firms that intend to publish
substantively long-form content.

## Webflow

**Schema.org coverage.** Webflow's default schema.org
coverage is, frankly, thin. The platform does not render
`Organization`, `WebSite` or any other core markup by
default. The firm must hand-author all JSON-LD and inject it
via the per-page or site-wide custom code fields.

**`llms.txt` support.** Webflow does not provide a native
`llms.txt` mechanism. A `llms.txt` can be served by hosting
it through the platform's static assets feature, with some
workaround on the build configuration. Not a clean solution.

**Content depth tolerance.** The CMS is, for blog and
article content, one of the better template platforms.
Collection-based content allows for long-form pieces with
proper structure.

**Custom code access.** Excellent. Per-page and site-wide
custom code is exposed, with no plan-tier restrictions on
content-modifying access. The CMS allows custom embeds and
rich text with fewer restrictions than competitors.

**Indexability discipline.** URLs are clean, sitemap is
auto-generated, canonicals are exposed.

**Verdict.** A platform that requires the firm to do almost
all the structured-data work by hand, but rewards that work
with broad customisation. Acceptable for firms with a
designer-developer on hand or with the budget to retain one.
Not appropriate for firms that need the platform to ship
sensible defaults.

## WordPress

**Schema.org coverage.** Varies entirely with the theme and
plugins in use. The base WordPress install ships almost no
structured data. A site running Yoast SEO or Rank Math will
have meaningful `Organization`, `WebSite` and (with
configuration) `Person` and `LocalBusiness` markup. A site
on a poorly configured commercial theme can have markup that
is partial, contradictory or, in some cases, actively
wrong.

**`llms.txt` support.** Available through several
specialist plugins as of 2025. The implementations vary in
quality; manual hosting via the theme's static assets is
also viable.

**Content depth tolerance.** Excellent for long-form. The
Gutenberg editor is, in its mature form, a workable
long-form environment.

**Custom code access.** Full. The platform is open-source
and exposes every layer.

**Indexability discipline.** Varies with theme and plugins.
A properly configured site is excellent; a misconfigured
site can be a discoverability disaster.

**Verdict.** With the right plugin stack and a careful
configuration, WordPress is fully capable. The variance in
practice is enormous, and a meaningful share of audited
WordPress sites have non-trivial discoverability problems.

## Shopify

**Schema.org coverage.** Strong on `Product`, `Offer`,
`Review` and `AggregateRating` — Shopify's commercial focus
shows. Weaker on `Organization`, `ProfessionalService` and
the firm-as-a-source markup that matters for service
businesses. Acceptable for product businesses; suboptimal
for service businesses using Shopify as a general website.

**`llms.txt` support.** Not natively supported. Workarounds
through theme files exist but are awkward.

**Content depth tolerance.** Adequate for blog content.
Not designed for long-form non-commerce content.

**Custom code access.** Available on the Basic plan and
above for theme code. Liquid template language requires some
familiarity.

**Indexability discipline.** Strong on the commerce side.
Acceptable elsewhere.

**Verdict.** The right choice for commerce businesses
exclusively. Not the platform a professional services firm
should be on, regardless of the AI-discoverability question.

## The summary

For a professional services SMB choosing a platform today:

- The cleanest position is a modern static site (Eleventy,
  Astro, Next.js) custom-built and hosted on a CDN. This is
  the position the
  [Build package](/services/) delivers.
- WordPress with a careful plugin stack is the second-best
  position for firms that need a CMS-driven workflow.
- Wix and Squarespace are acceptable for firms on those
  platforms today, with meaningful custom work.
- Webflow is acceptable for firms with design-development
  capacity in house.
- Shopify is, for service firms, the wrong tool.

The
[audit
framework](/services/insights/audit-framework-ai-search-readiness/)
covers the specific signals to test on whichever platform
the firm is on. The
[retrofit](/services/) work, where a rebuild is not
warranted, focuses on the cost-effective interventions
within the constraints of the existing platform.

The decision of whether to rebuild is, ultimately, a
strategic one rather than a technical one. A firm whose
website is otherwise serving its commercial purposes well
should not rebuild lightly. A firm whose website is already
under-performing and whose platform actively constrains
discoverability has a clearer case to act.
