---
title: "AI search optimisation for small businesses: a 2026 primer"
slug: ai-search-optimisation-small-business
date: 2026-08-20
excerpt: "AI search is now where a meaningful share of buying-intent queries land. For a small business website, the rules of being found have changed. A practical primer on what AI search optimisation actually means in 2026, what's worth doing, and what to skip."
source: own
---

## The short answer

AI search optimisation — sometimes called AEO (AI Engine
Optimisation) or GEO (Generative Engine Optimisation) — is the
practice of making your website findable by AI assistants like
ChatGPT, Claude, Perplexity, Google's AI Overviews, and the
growing list of other assistant-style search interfaces.

For a small business in 2026, this matters because somewhere
between 20% and 40% of high-intent buying queries now go to an
AI assistant rather than to a traditional Google search. If your
website is invisible to AI search, you are missing that share of
the buying funnel entirely.

The good news: AI search optimisation is more accessible than
traditional SEO. The rules are clearer. The work that matters most
is technical and content-structural rather than link-building and
keyword-stuffing. A small business can move the needle in weeks,
not months.

This piece is the practical primer. What works, what doesn't, what
to do this quarter.

## What's actually changed

For about twenty years, getting found online meant ranking on
Google. The mechanics of that — keywords, backlinks, content
volume, page speed, mobile-friendliness — became their own
discipline. Many small businesses paid SEO agencies thousands of
pounds a month to play that game.

Through 2024 and 2025, two things happened in parallel.

First, AI assistants got good enough at answering questions
directly that users stopped clicking through to websites for
many query types. The "click-through rate" on Google search
results started falling as Google's own AI Overviews answered
questions in-place. Perplexity and ChatGPT search took growing
share of "search-the-web-for-me" queries from users who never
visited Google at all.

Second, the things that make a website findable by an AI
assistant turned out to be different from the things that made a
website rank on Google. The AI assistants reward different
signals — clarity, structure, factual density, technical
discoverability of structured data, machine-readability — that
classic SEO didn't optimise for directly.

The result: a small business with a Google-optimised website,
built five years ago, paying an SEO agency to keep it ranking, is
now finding that share of traffic flat or declining while AI
search traffic — which it isn't optimised for at all — is taking
the questions that used to drive customers to it.

This is the gap AI search optimisation addresses.

## What "AI search" actually means

A clarification because the term gets used loosely. When a small
business website needs to "be found by AI", there are four distinct
contexts:

| Context | What happens | What you optimise for |
|---|---|---|
| ChatGPT / Claude with web search | The assistant searches the web and cites pages in its answer | Clarity, factual density, schema markup, `llms.txt` |
| Perplexity | Same as above but with more aggressive citation behaviour | Same as above, plus particularly strong "About" page |
| Google AI Overviews | Google generates an answer at the top of a search result, citing 3-8 sources | Same as above, plus traditional SEO fundamentals |
| Long-term model training | Your content might be ingested into a future model's training data | Long-form authoritative content; this matters less than people think |

The first three are the ones to focus on. The fourth is a curiosity,
not a strategy.

## What works

The actions that move the needle, in order of effort-to-impact ratio:

### Schema.org structured data

The single highest-leverage thing. Properly implemented `Organization`,
`LocalBusiness`, `Service`, `FAQPage`, and `Person` schema gives
AI assistants the structured signals they look for. Most small
business websites either have none or have shallow schema that
their CMS auto-generated.

What this looks like in practice: JSON-LD blocks embedded in the
`<head>` of your key pages, with detailed properties (your services
described in `Service` markup, your team in `Person` markup, your
location and contact in `LocalBusiness` markup, your common
questions in `FAQPage` markup).

### `llms.txt`

A single Markdown file at the root of your domain that summarises
your business for AI assistants. Covered in detail in
[a separate piece](/blog/what-is-llms-txt/). The implementation is
under thirty minutes once you've written the content; the value
is meaningful and growing.

### FAQ blocks with proper markup

AI assistants pull from FAQ-formatted content disproportionately
because the question-answer structure maps cleanly to the kind of
queries the assistant is answering. Adding a properly marked-up
FAQ section to your homepage and your services pages — with the
real questions you get asked, answered in 2-4 sentences each —
materially increases your citation rate.

### A clear, factual About page

The About page is the page AI assistants disproportionately
consult to understand who you are. Most About pages are written
as a narrative ("Founded in 2014, we believe in delivering...");
the ones that get cited are written as references ("We are a
fifteen-person consultancy based in Bristol, specialising in
regulatory affairs for medical-device manufacturers since 2014.
Our partners are X, Y, and Z. Notable clients include A, B, and
C, where contractually permitted.").

### Clean semantic HTML

A surprisingly important factor. AI assistants read your pages as
text. If your page renders mostly through JavaScript, or if your
content is buried inside images, or if your headings don't follow
a sensible h1 → h2 → h3 hierarchy, the assistant has trouble
extracting the content. The fix is usually to move from a
template-platform site to a properly built static or server-rendered
site.

### Content depth and topic clustering

AI assistants reward topical authority. Five clear pages on your
core specialism are more valuable than one big page covering
everything. Linking those pages together, and writing supporting
blog content that references them, builds the topical authority
signal that AI assistants treat as a credibility indicator.

## What doesn't work

The things that get pitched as AI search optimisation but don't
actually do much:

### Keyword stuffing

Putting "AI search optimisation London" forty times across your
homepage will not help. The pattern that worked for early Google
SEO does not transfer; AI assistants weight semantic understanding
much more heavily than keyword density.

### Backlink farms and PBNs

The link-building economy that drove much of classic SEO has
limited application to AI search. Genuine inbound links from
respected sources still help (they're a credibility signal that
the AI assistant picks up on indirectly via Google), but
manufactured link networks are at best neutral and often actively
harmful.

### Generic content marketing

Publishing a hundred shallow blog posts to "build content
authority" doesn't move AI search results. AI assistants reward
depth and factual density, not volume. A small number of
substantive, well-structured posts beat a large number of fluff
posts every time.

### Submitting to AI search engines

Several products in 2025 and 2026 have pitched "we'll submit your
business to ChatGPT" or similar. These services do not work.
There is no submission interface to AI assistants. The right
optimisations make your site findable through the assistant's
existing retrieval pipeline; nothing else does.

### Buying schema markup as a service for £49

Schema markup is the right move; "buying" it as a one-time fix
isn't. The schema has to fit your actual business, has to be kept
current, has to be cross-linked correctly. A £49 generic schema
template usually contains incorrect or obsolete properties and is
worse than nothing.

## What to do this quarter

If you're a small business owner with an existing website, the
right sequence:

**Month 1: audit and quick wins.** Look at your site honestly. Is
there any schema markup? Is there an `llms.txt`? Does the homepage
contain specific factual claims? Is there an FAQ section? The
audit takes an hour. The first round of fixes takes a day or two
of work.

**Month 2: structural fixes.** If your platform supports it, add
proper schema markup, an `llms.txt`, FAQ blocks. If it doesn't,
this is the point at which it's worth thinking about a rebuild on
a platform that does.

**Month 3: content depth.** Write three to five pieces of
substantive, factual content on your core specialism. Each piece
should be at least 1,200 words, written for a reader, structured
with clear headings, linking to each other and to your services
pages.

After three months you'll be ahead of most of your competitors on
this dimension. After six months you'll start seeing AI-search
traffic appear in your analytics. After twelve months you'll have
a meaningful AI-search inbound channel as part of your overall
marketing mix.

## When to get professional help

The honest test: if you've spent more than two hours trying to
add schema markup to your site and it isn't working, the cost of
professional help is materially less than the cost of doing it
badly. Most small business owners are not the right people to
write JSON-LD by hand or to evaluate whether their CMS's
auto-generated schema is correct.

I build AI-ready websites and audit existing sites for AI
discoverability. The Audit tier (£499) is the right starting
point if you're not sure where you stand. Get in touch via
[LinkedIn](https://www.linkedin.com/in/tarunbulchandani/) or the
[contact form](/#contact).

## Related

- [How to make your business website show up in ChatGPT](/blog/website-show-up-in-chatgpt/) — the foundational piece
- [What is llms.txt](/blog/what-is-llms-txt/) — the single highest-leverage technical change
- [Schema.org for small businesses](/blog/schema-org-small-business/) — the markup that gets you found
- [Why your Squarespace/Wix/Webflow site is invisible to AI](/blog/squarespace-wix-webflow-ai-search/) — the platform question
