---
title: "Six things ChatGPT and Claude check when finding your business"
slug: six-things-chatgpt-claude-check
date: 2026-10-08
excerpt: "A concise breakdown of the specific signals AI assistants check before citing a business in a response. If your site is invisible in AI search, it's almost certainly missing on three or more of these. A short, practical reference."
source: own
---

## The short answer

When you ask ChatGPT or Claude something like "find me a boutique
accountancy in Bristol that specialises in tech-sector clients",
the assistant doesn't conjure the answer from nothing. It scores
candidate websites against a fairly consistent set of signals, and
the businesses that score well get cited.

There are six signals that matter most. They are not secrets and
they are not difficult to understand. Most small business
websites miss three or more of them. The ones that don't, win.

This piece is the short, practical reference.

## Signal 1: structured data depth

What the AI checks: does this site have schema.org markup, and how
detailed is it?

What it looks at:

- Presence of `Organization` or `LocalBusiness` markup
- Whether `Service` entities are defined for what the business offers
- Whether `Person` markup identifies the team
- Whether `FAQPage` markup exists on relevant pages
- Whether entity relationships are explicit (the `Service`'s `provider` references the `Organization`'s `@id`)
- Whether the depth of properties is meaningful or shallow

What sites get wrong: most have either no schema or shallow
auto-generated schema. The depth of properties matters. A
`LocalBusiness` block with just name, address, and phone gives the
AI almost nothing to ground a citation on. The same block with
`description`, `priceRange`, `paymentAccepted`, `areaServed`,
`openingHours`, `sameAs` references, and `serviceType` gives the
AI five or six different ways to confirm a match.

What to do: add full-depth schema, properly cross-linked. Validate
with [Google's Rich Results Test](https://search.google.com/test/rich-results).
Covered in detail in [Schema.org for small businesses](/blog/schema-org-small-business/).

## Signal 2: factual density on the page

What the AI checks: how specific are the claims on the page, and
how easy is it to extract them?

What it looks at:

- Are there specific numbers, dates, locations, named entities?
- Are claims made in declarative form, or hedged with marketing language?
- Are there comparisons or contrasts to anchor what the business specifically does?
- Is the language direct, or buried under abstraction?

What sites get wrong: most homepages and About pages are written
as marketing copy. "We help businesses transform their operations
with innovative solutions" tells the AI nothing. "We are a
seven-person consultancy in Manchester that has delivered
operating-model reviews to 38 UK-based professional services
firms since 2017" tells the AI everything.

What to do: rewrite the marketing copy as a factual reference.
Specifics over abstractions. Comparisons over claims of
excellence. The exercise is uncomfortable for many businesses
because it strips out language they have been using for years; do
it anyway.

## Signal 3: question-answer structured content

What the AI checks: is there content on this site that's already
formatted as questions and answers?

What it looks at:

- Presence of an FAQ section on the homepage and key pages
- Use of `FAQPage` schema markup
- Quality of the questions (do they match what users actually ask?)
- Quality of the answers (are they specific and direct?)

What sites get wrong: many sites either have no FAQ section, or
have one that's written for SEO ("What is the best way to..."
followed by promotional answers) rather than for genuine question-
answering. The schema markup is often missing even when the content
is there.

What to do: add genuine FAQ content covering the specific questions
your prospects actually ask. Mark it up with `FAQPage` schema.
Covered in [FAQ schema for small businesses](/blog/faq-schema-small-business/).

## Signal 4: the About page

What the AI checks: is there a substantive About page, and what
does it actually say?

What it looks at:

- Existence of a clear About page
- Specifics: founding year, location, team size, named people
- Credentials and qualifications mentioned explicitly
- Specific clients or industries named (where contractually possible)
- Length and substance (not just two paragraphs of "we believe in")

What sites get wrong: many About pages are mood pieces — a couple
of paragraphs about passion and values, a team photo, a vague
mission statement. The AI gets nothing specific to anchor on.

What to do: rewrite the About page as a reference document.
Sections covering "who we are", "what we do", "how we work", "who
we work with", with specific factual claims throughout. The About
page should read more like a Wikipedia article than a brochure.

## Signal 5: discoverability surface (llms.txt, sitemap, semantic HTML)

What the AI checks: can the assistant access and parse the site
cleanly?

What it looks at:

- Presence of `llms.txt` at the domain root
- Presence of a proper `sitemap.xml`
- Semantic HTML structure (real headings, real paragraphs, real lists)
- No JavaScript-rendered content critical to the page
- Clean, indexable URLs
- Reasonable page load time

What sites get wrong: heavy JavaScript rendering hiding content,
no `llms.txt`, sitemap missing or generated incorrectly, headings
styled as divs, lists implemented as styled paragraphs.

What to do: the static-site stack solves all of this by default.
Template platforms struggle with parts of it. Covered in
[Why your Squarespace/Wix/Webflow site is invisible to AI](/blog/squarespace-wix-webflow-ai-search/)
and [What is llms.txt](/blog/what-is-llms-txt/).

## Signal 6: topical authority and content depth

What the AI checks: does this site know what it's talking about?

What it looks at:

- Multiple pages on related themes, linked together
- Long-form content (1,200+ words) on the core specialism
- Use of specific terminology accurately
- External references and citations to authoritative sources
- Recent activity (the site is being maintained, not abandoned)

What sites get wrong: many small business sites are five pages
total — home, about, services, contact, and one shallow blog post
written in 2019. There's no depth for the AI to assess. The site
might be excellent operationally but it's invisible because there
isn't enough to read.

What to do: publish substantive content. Not volume; depth. Five
strong pieces on your core specialism out-perform fifty shallow
ones. Link them together. Update them when relevant. The work is
ongoing but the compounding return is meaningful.

## The summary table

| Signal | What to check | Most common failure |
|---|---|---|
| Structured data depth | Full schema with cross-linked entities | Shallow auto-generated schema |
| Factual density | Specific claims, named entities, comparisons | Marketing copy with abstractions |
| Question-answer content | FAQPage schema with genuine questions | No FAQ or no schema markup |
| About page | Substantive, factual, reference-style | Mood piece with mission statement |
| Discoverability surface | llms.txt, sitemap, semantic HTML, fast load | JS-heavy, no llms.txt, weak HTML |
| Topical authority | Depth, cross-linked content, recency | Five-page brochure site |

## What this gets you in practice

A site that hits all six signals consistently appears in AI search
responses for relevant queries. A site that hits four of six
sometimes appears. A site that hits two or fewer almost never
appears. The thresholds are not linear — there's a meaningful step
function between the four-of-six tier and the all-six tier.

The work to move from "hits none" to "hits all six" is real but
finite. For a typical small business website, it's six to eight
weeks of focused effort, after which the maintenance is modest.

## Get help

If you want a written assessment of how your site scores against
these six signals, the Audit tier (£499) provides exactly that — a
report covering each signal, where your site stands, and a
prioritised fix list.

If you want the full retrofit done for you, the Upgrade tier
(£2,495) is the right level. If you want a ground-up rebuild that
hits all six from day one, the Build tier (£4,995).

Reach out via [LinkedIn](https://www.linkedin.com/in/tarunbulchandani/)
or the [contact form](/#contact).

## Related

- [How to make your business website show up in ChatGPT](/blog/website-show-up-in-chatgpt/)
- [Schema.org for small business websites](/blog/schema-org-small-business/)
- [FAQ schema for small businesses](/blog/faq-schema-small-business/)
- [What is llms.txt](/blog/what-is-llms-txt/)
