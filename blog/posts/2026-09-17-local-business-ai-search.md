---
title: "Local business AI search: how customers find you on ChatGPT and Perplexity"
slug: local-business-ai-search
date: 2026-09-17
excerpt: "Local search used to mean Google Maps and a Google Business Profile. In 2026, an increasing share of local-intent queries go to AI assistants instead. What that means for any small business with a physical premises or a local service area."
source: own
---

## The short answer

When someone types "best accountant near me" or "physiotherapist in
Clapham who takes BUPA" into ChatGPT or Perplexity in 2026, the
answer they get is generated from a mix of signals: the AI's
training data, live web search results, structured data on
candidate websites, and information from third-party databases.

Your Google Business Profile, your Google Maps presence, your
TripAdvisor or Yelp listings — these still matter. But they no
longer determine the result. AI assistants are doing their own
research, using their own signals, and the businesses that come
out on top are not always the ones with the best Google Business
Profile.

For any small business with a local component — a physical premises,
a defined service area, a presence in a specific town or
neighbourhood — this is a meaningful shift. The local AI search
playbook is different from the classic local SEO playbook.

This piece walks through what's actually changing and what to do.

## How local AI search works

The mechanics behind a local-intent query in an AI assistant:

### Step 1: query understanding

The assistant parses what you're actually asking. "Best accountant
near me" is an underspecified query — what's "best", and what's
"near me" — and the assistant tries to fill in the gaps from
context (the user's location, prior conversation, any preferences
stated).

### Step 2: retrieval

The assistant triggers a search. This is usually a mix of:

- A web search call (the equivalent of a Google search behind the scenes)
- A structured-data lookup (querying knowledge graphs, mapping data, business directories)
- A direct retrieval from sites the model has indexed previously

### Step 3: scoring

Results are scored on relevance, credibility, and recency. The
specific signals weigh differently than they do in Google search:

- Schema.org markup, particularly `LocalBusiness` and `Service`, carries more weight
- The clarity and specificity of the business's own description carries more weight
- Reviews still matter, but the volume is less important than the substance
- The presence of an `llms.txt` and structured FAQ data is a positive signal
- The age and authority of the domain matters but less than for Google

### Step 4: response generation

The assistant generates an answer that typically names two to five
specific businesses, with brief descriptions of each. The exact
businesses cited vary across assistants and across days.

## What the AI assistant actually looks at

For a local-intent query, the assistant typically consults:

1. **The business's own website.** Particularly the homepage, the About page, the contact page, and any pages describing the specific services or specialities relevant to the query.
2. **Structured data.** Schema.org `LocalBusiness` and `Service` markup, `llms.txt`, FAQ schema. The richer this is, the more cleanly the assistant can confirm a specific match.
3. **Third-party listings.** Google Business Profile, Yelp, TripAdvisor, sector-specific directories.
4. **Review sites and ratings.** Aggregated review platforms, where they exist for the relevant sector.
5. **Recent press, blog posts, and external citations.** Mentions in news, industry publications, or other authoritative sites contribute to the credibility signal.

The first two are the ones you most directly control. The next
three are where third-party reputation lives. The mix of weights
varies by industry and by query, but in 2026 the first two
matter more than they ever have.

## The local AI search baseline

For any small business with a local presence, the baseline to hit
in 2026:

### LocalBusiness schema, properly populated

Not just the basic name-address-phone. The full set of relevant
properties for your sector:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://yourpractice.co.uk/#localbusiness",
  "name": "Smith & Partners Physiotherapy",
  "description": "Independent physiotherapy practice in Clapham. Specialists in sports injury rehabilitation and chronic-pain management. BUPA, AXA, and Vitality registered.",
  "image": "https://yourpractice.co.uk/clinic.jpg",
  "url": "https://yourpractice.co.uk/",
  "telephone": "+44 20 1234 5678",
  "priceRange": "£££",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 Clapham High Street",
    "addressLocality": "London",
    "postalCode": "SW4 7TS",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4625,
    "longitude": -0.1379
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "areaServed": ["Clapham", "Battersea", "Stockwell", "Brixton"],
  "paymentAccepted": "Cash, Card, BUPA, AXA, Vitality, Cigna",
  "sameAs": [
    "https://www.google.com/maps/place/Smith-Partners-Physio",
    "https://www.linkedin.com/company/smith-partners-physio"
  ]
}
```

The `areaServed`, `paymentAccepted`, and `openingHoursSpecification`
properties are particularly useful because they let the AI
assistant confirm specific matches to user constraints ("near
Clapham", "takes BUPA", "open Saturday").

### Service schema for each service you offer

If you're a physiotherapy practice, mark up each specific service —
sports injury rehabilitation, chronic pain management, pre- and
post-natal physiotherapy — as a separate `Service` entity. Each
one becomes a distinct finding point.

### FAQ schema covering local-specific questions

The local-intent FAQs are different from the generic ones. Include
questions like:

- "Where exactly are you located?"
- "What's the nearest tube station?"
- "Do you offer parking?"
- "Which insurance providers do you accept?"
- "Do you treat patients from outside the immediate area?"

Mark them up with `FAQPage` schema. AI assistants pull from these
heavily for local queries.

### Specific neighbourhood content

A page (or section of your About page) that explicitly mentions
the neighbourhood, the surrounding areas, the local landmarks, and
the catchment you serve. This is content-side, not schema-side.
The assistant reads it as text and uses it for local
disambiguation.

### Google Business Profile maintained

Still matters. Keep it current — photos, opening hours, services,
the description. The AI assistant cross-references this against
your own site's claims; consistency between the two boosts the
credibility signal.

### llms.txt with location and service area surfaced clearly

The `llms.txt` at the root of your domain should mention your
location and primary service area in the summary blockquote. This
is the cheapest possible signal to add and one of the most
directly used.

## Where local AI search differs from local SEO

A few things worth being explicit about.

### Reviews are still important but volume matters less

Classic local SEO heavily weighted review count. A business with
800 reviews would out-rank a business with 80, all else equal. AI
search weights review substance more than count. A business with
80 detailed, specific, recent reviews can out-cite a business with
800 generic ones.

### Backlinks matter less

The "links from local newspapers and community sites" play that
worked for classic local SEO is less impactful for AI search.
Direct mentions, citations, and consistent NAP (name, address,
phone) data across the web are more valuable than counting raw
inbound links.

### Speed to update is higher

A change to your services, your opening hours, or your service
area can be reflected in AI search results within days, where
classic SEO might take weeks or months. This cuts both ways — good
news for keeping current, but also means stale information surfaces
faster too.

### Aggregator dependency is lower

Classic local SEO put a lot of weight on aggregator sites (Yell,
Thomson Local, sector directories). AI search depends on these
less. The business's own website is increasingly the canonical
source.

## What to do this quarter

For a local small business looking to improve AI search visibility:

**Week 1: audit.** Run five typical queries through ChatGPT, Claude,
and Perplexity that should plausibly surface your business
(e.g. "best [your service] in [your area]", "[your service] near
[local landmark]", "[your speciality] for [your customer type] in
[your city]"). Note what shows up and what doesn't.

**Week 2-3: schema and content.** Implement `LocalBusiness`
schema with the full property set. Add `Service` schema for each
distinct offering. Add an FAQ section with local-specific
questions. Update your About page to include explicit neighbourhood
and service-area content.

**Week 4: llms.txt and Google Business Profile.** Add an `llms.txt`
at the root of your domain. Refresh your Google Business Profile
to ensure consistency with the site.

**Quarterly thereafter: tracking and tuning.** Re-run the AI queries.
Adjust based on what's surfacing and what isn't.

A focused four-week sprint of this kind, done well, produces
meaningful improvement. A small business that hits all four
quarters delivers a year of AI search work that compounds.

## Get help

The implementation is technical. The audit is something you can
do yourself (the AI queries are free; the assessment is
qualitative). The schema and content work is more demanding.

I build AI-discoverable websites for small and local businesses,
with a particular focus on professional services and specialist
practices where the local-search component is meaningful. The Audit
tier (£499) is the right entry point if you want a written
assessment of where you stand. Reach out via
[LinkedIn](https://www.linkedin.com/in/tarunbulchandani/) or the
[contact form](/#contact).

## Related

- [How to make your business website show up in ChatGPT](/blog/website-show-up-in-chatgpt/)
- [Schema.org for small business websites](/blog/schema-org-small-business/)
- [FAQ schema for small businesses](/blog/faq-schema-small-business/)
- [What is llms.txt](/blog/what-is-llms-txt/)
