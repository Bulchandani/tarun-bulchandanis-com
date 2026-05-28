---
title: "Schema.org for small business websites: the markup that gets you found"
slug: schema-org-small-business
date: 2026-09-10
excerpt: "Schema.org structured data is the single highest-leverage technical change a small business website can make for AI discoverability. A practical, jargon-light guide to what it is, what to include, and how to validate it works."
source: own
---

## The short answer

Schema.org is a shared vocabulary of structured data tags that
search engines and AI assistants use to understand what's on your
page. It's the difference between a search engine seeing "We help
businesses with their compliance" and seeing `Service: "compliance
consulting"; provider: "Acme Ltd"; areaServed: "United Kingdom";
priceRange: "££"; offers: [...]`.

For a small business in 2026, adding properly structured schema
markup is the single biggest improvement you can make for both
traditional SEO and AI search discoverability. Most sites either
have no schema or have shallow auto-generated schema that barely
helps. The gap between "has schema" and "has good schema" is much
bigger than most operators realise.

This piece walks through what to include, with examples.

## What schema.org actually is

Schema.org was created in 2011 by Google, Bing, Yahoo, and Yandex
to define a common vocabulary that websites could use to mark up
their content. It is published as a public specification at
[schema.org](https://schema.org).

The vocabulary covers thousands of types of things — businesses,
people, products, services, events, articles, recipes, courses,
medical conditions, financial products, and so on. Each type has
properties (a `Person` has `name`, `jobTitle`, `email`; a
`LocalBusiness` has `address`, `telephone`, `openingHours`).

The structured data is embedded in your web page using one of
three formats: Microdata, RDFa, or JSON-LD. In 2026, JSON-LD is
the standard. It's a block of JavaScript Object Notation embedded
in your page's `<head>` that contains the structured data without
affecting how the page renders.

## Why it matters more in 2026 than ever before

Schema.org has been around for fifteen years. It was a "nice to
have" for most of that time — Google used it to generate rich
snippets in search results (the star ratings, the FAQ accordions
that appear under listings, the breadcrumb trails), but the
ranking impact was modest.

That has changed. AI search engines depend on structured data in a
way that traditional search engines never did. When ChatGPT,
Claude, or Perplexity needs to answer "who provides legal services
in Manchester specialising in employment law", they're not just
reading your homepage text. They're looking for structured signals
— `LegalService` schema, `address` properties, `serviceArea`
fields — that confirm the implicit claim with high confidence.

Sites with comprehensive schema get cited disproportionately.
Sites without get skipped over.

## The schema types that matter most for small businesses

Not every type matters for every business. The high-leverage set
for a typical small business website is short.

### Organization or LocalBusiness

The "this is my business as an entity" markup. Every site should
have one of these. If you have a physical premises, use
`LocalBusiness` (or one of its subtypes — `LegalService`,
`MedicalBusiness`, `AccountingService`, etc.). If you're purely
remote, use `Organization`.

Minimum properties to include:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Consulting Ltd",
  "url": "https://acme.co.uk",
  "logo": "https://acme.co.uk/logo.png",
  "description": "Boutique strategy consulting for mid-sized professional services firms in the UK.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10 King Street",
    "addressLocality": "Manchester",
    "postalCode": "M2 6AQ",
    "addressCountry": "GB"
  },
  "telephone": "+44 20 1234 5678",
  "email": "hello@acme.co.uk",
  "sameAs": [
    "https://www.linkedin.com/company/acme-consulting",
    "https://twitter.com/acmeconsulting"
  ]
}
```

The `sameAs` property is particularly important: it tells AI
assistants what your business's other public identities are. This
helps disambiguation when two organisations share a similar name.

### Service

Each service you offer should be marked up as a `Service` entity.
This is one of the most under-used schema types in 2026 and one
of the most impactful for AI search.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Operational Strategy Consulting",
  "description": "Six-week strategic operating-model review for professional services firms.",
  "provider": { "@id": "https://acme.co.uk/#organization" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "serviceType": "Management consulting",
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Professional services firms, 50-500 employees"
  }
}
```

You should have one of these per major service. Each one creates a
specific finding point for AI search.

### Person

Each named team member you want findable — the founder, the
partners, the senior consultants — should have `Person` markup,
ideally on their dedicated page or in the About page.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane Smith",
  "jobTitle": "Founder and Managing Director",
  "worksFor": { "@id": "https://acme.co.uk/#organization" },
  "url": "https://acme.co.uk/team/jane-smith/",
  "image": "https://acme.co.uk/headshots/jane.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/jane-smith-acme/"
  ]
}
```

### FAQPage

If your homepage or service page includes an FAQ section, mark it
up as `FAQPage`. This is the schema type most often cited by AI
assistants in their generated responses.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you work with businesses outside the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While our primary client base is UK-headquartered, we have delivered engagements across the EU and US for clients with international footprints."
      }
    },
    {
      "@type": "Question",
      "name": "What is your typical engagement length?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engagements typically run from six to fourteen weeks, depending on scope."
      }
    }
  ]
}
```

The next piece in this series goes deep on [FAQ schema specifically](/blog/faq-schema-small-business/).

### Article or BlogPosting

For every blog post or article, mark it up as `BlogPosting`.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How we approach operational reviews",
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-15",
  "author": { "@id": "https://acme.co.uk/team/jane-smith/#person" },
  "publisher": { "@id": "https://acme.co.uk/#organization" },
  "image": "https://acme.co.uk/articles/operational-reviews.jpg"
}
```

### BreadcrumbList

The navigation trail showing where the current page sits in your
site hierarchy. Helps AI assistants understand your site structure.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://acme.co.uk/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://acme.co.uk/services/" },
    { "@type": "ListItem", "position": 3, "name": "Operational Strategy", "item": "https://acme.co.uk/services/operational-strategy/" }
  ]
}
```

## Common mistakes

Five things that go wrong, ranked by frequency.

### 1. Mismatched @id references

When your `Service` markup references `provider` as
`{"@id": "https://acme.co.uk/#organization"}`, the `Organization`
markup elsewhere on your site has to have a matching `@id`. If the
two don't match, the entity graph is broken and AI assistants
can't link the service to the organisation. This is the single
most common error.

### 2. Schema that contradicts the visible content

If your structured data says you have five employees but your
About page says "we're a team of twelve", the structured data is
demoted. Schema needs to be true to what's on the page.

### 3. Stale schema after content updates

Schema is content. When you update your team page, your team
schema needs to update. When you launch a new service, its `Service`
markup needs to be added. Sites that don't maintain their schema
end up with outdated structured data that actively misleads.

### 4. Excessive or padded schema

Adding schema types that don't apply to your business — `Recipe`,
`Course`, `Product` when you don't have any — is treated as spam.
Stick to types that fit your actual content.

### 5. Schema that the CMS auto-generated badly

Many CMSes generate shallow schema automatically. The basic types
are there but with missing properties, generic descriptions, and
no entity relationships. This is often worse than no schema at all
because the model treats the auto-generated junk as your
authoritative claim.

## How to validate it

Two tools you should use whenever you change schema:

**Google's Rich Results Test** ([search.google.com/test/rich-results](https://search.google.com/test/rich-results)):
paste your URL, see what Google detects, see what errors come up.
This is the closest-to-ground-truth validator.

**Schema Markup Validator** ([validator.schema.org](https://validator.schema.org)):
validates the schema specification itself, regardless of whether
Google generates a rich result from it.

Both tools surface errors that would otherwise sit silently in
your structured data. Run them before pushing changes; run them
quarterly to catch drift.

## How much schema is enough

A reasonable target for a small business website:

- 1 × `Organization` (or `LocalBusiness`) on the homepage
- 1 × `WebSite` on the homepage
- 1 × `BreadcrumbList` per non-home page
- 1 × `Service` per major service offering
- 1 × `Person` per named team member
- 1 × `FAQPage` on the homepage and on each major service page
- 1 × `BlogPosting` per blog post
- 1 × `ContactPage` markup on the contact page

For a typical 8-page small business site, that's roughly 20-30
schema blocks across the site. Plenty for AI search; not so much
that it becomes a maintenance burden.

## What this gets you

In the short term: more accurate citations when an AI assistant
references your business. Cleaner rich snippets in Google search
results. Faster understanding by Google's AI Overviews.

In the medium term: a meaningfully higher share of AI search
responses that include your business as a source. The compounding
benefit of structured data is genuine.

## Get help if you need it

Schema is technical. Writing it by hand requires understanding the
type hierarchy and the property semantics; it's not difficult, but
it's not five-minutes-of-Googling either.

I build AI-discoverable websites and audit existing sites for
schema coverage. If you'd like a written assessment of where your
site stands and what to fix first, the Audit tier (£499) is the
right starting point. Reach out via
[LinkedIn](https://www.linkedin.com/in/tarunbulchandani/) or the
[contact form](/#contact).

## Related

- [How to make your business website show up in ChatGPT](/blog/website-show-up-in-chatgpt/)
- [FAQ schema for small businesses](/blog/faq-schema-small-business/)
- [What is llms.txt](/blog/what-is-llms-txt/)
- [Generative Engine Optimisation explained](/blog/geo-generative-engine-optimisation-explained/)
