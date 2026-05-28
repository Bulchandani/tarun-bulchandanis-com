---
title: "FAQ schema for small businesses: the unsung hero of AI discoverability"
slug: faq-schema-small-business
date: 2026-09-24
excerpt: "The single most-cited piece of structured data in AI search responses is FAQ markup. Most small business websites either have no FAQ section or have one without the schema that makes it findable. A walkthrough of how to add FAQ schema, what to put in it, and why it works."
source: own
---

## The short answer

Of all the schema.org types you could add to a small business
website, FAQ markup (`FAQPage` schema) produces the biggest visible
return for the smallest amount of effort. The reason is simple: AI
assistants generate question-answer responses, and FAQ content
already in question-answer form is the easiest thing for them to
quote.

Most small business websites are missing this. They either don't
have an FAQ section at all, or have one written as a styled HTML
block with no underlying schema. The work to fix this is straightforward
and the payoff is meaningful.

This piece is the practical guide.

## Why FAQ markup specifically

AI assistants are answering questions. Their fundamental output is
a question-answer pair. When they search the web for information to
include in a response, the content they can most directly use is
already structured as a question-answer pair.

Schema.org's `FAQPage` markup formalises this. A block of `FAQPage`
schema declares: "this page contains a list of questions, and these
are the answers". The AI assistant reads the markup, extracts the
question-answer pairs, and can cite them directly in a response.

The signal works for traditional Google search too — `FAQPage`
markup is used to generate the expandable FAQ snippets in search
results — but the AI search benefit is larger.

## What FAQ schema looks like

The minimal structure:

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
        "text": "Yes. While our primary client base is UK-headquartered, we have delivered engagements across the EU and the United States for clients with international footprints."
      }
    },
    {
      "@type": "Question",
      "name": "What is your typical engagement length?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engagements typically run from six to fourteen weeks, with the average around ten."
      }
    }
  ]
}
```

That goes in a `<script type="application/ld+json">` block in the
`<head>` of the page that contains the FAQ section visible to
users. The schema mirrors the visible content; the two should
always say the same thing.

## What questions to include

A small business website typically benefits from FAQ blocks on
three places: the homepage, the main services page (or each
individual service page), and the contact page. The questions are
different on each.

### Homepage FAQ — discovery questions

Questions a prospect asks before they engage. The kind of question
they might type into ChatGPT directly.

- "What does [your business] do?"
- "Who is [your business] for?"
- "Where is [your business] based?"
- "How is [your business] different from competitors?"
- "What is your pricing approach?"

Five to seven questions. Direct, factual answers in 2-4 sentences
each.

### Services-page FAQ — qualification questions

Questions a prospect asks once they're interested in the specific
service.

- "What's included in this engagement?"
- "How long does it take?"
- "Who delivers the work?"
- "What's the deliverable?"
- "What's the price range?"
- "How do you measure success?"
- "What if I'm not happy with the outcome?"

Six to nine questions. More detail than the homepage FAQ.

### Contact-page FAQ — logistics questions

Questions about engaging with you.

- "How do I get a quote?"
- "What information do you need from me?"
- "Do you offer initial calls?"
- "What's your turnaround?"
- "How do I pay?"
- "Do you have a satisfaction guarantee?"

Four to six questions. Specifically logistical.

## The questions that work, and the ones that don't

After implementing FAQ schema on a few small business sites, a
pattern is visible.

### Works well

- **Specific, factual questions with specific factual answers.** "What is your typical engagement length?" with "Six to fourteen weeks" works. The model can cite both the question and the answer cleanly.
- **Questions that match how users actually ask.** "How much does it cost?" works better than "What is your pricing model?" because real users phrase it the first way.
- **Comparison questions, when answered honestly.** "How are you different from [competitor type]?" answered with a specific contrast works very well in AI responses because the model is often asked the same comparison question by the user.
- **Geographic and capability questions.** "Do you work with [type of customer]?" or "Do you handle [type of work]?" — the answer becomes a direct match to a user's intent.

### Works less well

- **Open-ended philosophical questions.** "What is your approach?" answered with a paragraph of marketing copy gets parsed but not cited usefully.
- **Generic questions with generic answers.** "What makes you the best?" — the answer is rarely cited because the assistant doesn't know how to use it.
- **Questions where the answer is "it depends".** AI assistants struggle to cite hedged answers. If your honest answer is "it depends", consider rephrasing the question to be more specific.

## Common mistakes

Five things that go wrong, ranked by frequency.

### 1. Visible FAQ section exists, but no schema

The most common mistake. A nicely-formatted FAQ on the page,
styled as expandable accordions, with no underlying `FAQPage`
schema. The user can read it; the AI cannot extract it cleanly.

Fix: add the `<script type="application/ld+json">` block with the
FAQ content marked up as `FAQPage`.

### 2. Schema and visible content don't match

The schema says one thing, the visible page says another. This
happens when content is updated but the schema isn't. Search
engines and AI assistants both penalise this — the schema gets
marked as untrustworthy.

Fix: maintain schema as content. Generate it from the same source
where possible.

### 3. Too many questions

A page with 25 FAQ items in the schema feels like spam. Both
Google's documentation and observed AI behaviour suggest a
reasonable cap of around 10 questions per page.

Fix: prioritise the highest-value questions. Move the rest to a
dedicated FAQ page or remove them.

### 4. Promotional questions and answers

"What makes [business] the best choice?" answered with "Our team
of award-winning experts..." is treated as marketing copy, not
substantive Q&A.

Fix: write questions and answers as a journalist would ask and
answer, not as a marketer would.

### 5. Answers that don't actually answer

The answer references the question without answering it. "Q: How
much does it cost? A: Our pricing depends on your specific needs.
Get in touch to discuss." This answer is not cited because there's
nothing to cite.

Fix: answer the question. Specific number, range, or qualified
answer. "We typically charge £4,000-£10,000 per engagement, with
the majority falling between £5,000 and £7,500. We provide a fixed
quote after a 30-minute discovery call."

## How to implement it

If you're on a static site or a developer-managed site:

1. Write the FAQ content (the visible part).
2. Generate the matching schema (either by hand or with a template).
3. Validate the schema with Google's Rich Results Test.
4. Deploy and monitor.

If you're on Squarespace, Wix, or another template platform:

The visible FAQ part is easy — there's a block type for it on every
platform. The schema part is harder. You generally need to use the
platform's "custom code" or "code injection" feature to add the
JSON-LD block to the page's `<head>`. This is possible on Squarespace
(via per-page code injection) and Webflow (via the page settings
custom code). Wix is more limited but improving.

If your platform makes this genuinely hard, this is one of several
indicators that the platform is constraining your AI search
ceiling.

## How to validate it

Two tools.

**Google's Rich Results Test** ([search.google.com/test/rich-results](https://search.google.com/test/rich-results)):
paste your page URL. Look for "FAQ" in the detected results. The
tool will flag any errors in your markup.

**Schema Markup Validator** ([validator.schema.org](https://validator.schema.org)):
checks the schema itself against the specification.

Run both before you push the FAQ live. Run them periodically to
catch drift.

## A worked example

Here's a complete `FAQPage` block for a small consultancy's
homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What kind of clients do you work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work primarily with mid-sized professional services firms in the UK — typically 50 to 250 employees, in sectors including law, accountancy, management consulting, and specialist B2B advisory. We are not a fit for very small businesses or large enterprises."
      }
    },
    {
      "@type": "Question",
      "name": "What is your typical engagement length?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most engagements run six to fourteen weeks. The average is ten. We do not take on engagements shorter than four weeks because the discovery work doesn't pay back in that timeframe."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a typical engagement cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engagements range from £18,000 to £80,000, with the median around £35,000. We provide a fixed-fee quote after a 30-minute discovery call and a one-page brief."
      }
    },
    {
      "@type": "Question",
      "name": "How are you different from larger consulting firms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are a six-person practice. Engagements are delivered by partner-level consultants only — no analysts on slides, no junior teams. This means smaller engagements, more concentrated expertise, faster delivery, and substantially lower cost than the large-firm equivalent."
      }
    },
    {
      "@type": "Question",
      "name": "Where are you based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our office is in central Manchester. We work with clients across the UK; site visits are included in all engagements, and we travel routinely. Remote-friendly when the engagement structure supports it."
      }
    }
  ]
}
```

This block is short enough to maintain, specific enough to be
useful, and structured cleanly for AI extraction. It would
materially improve the citation rate of this consultancy's site.

## Get help if you need it

FAQ schema is one of the more straightforward things to add. If
your site is built on a platform that supports custom code, you
can do this yourself in an afternoon.

If you'd rather not, or if you want the broader AI-discoverability
work done in one go, the Build (£4,995) or Authority (£9,995)
package includes all of this and more. The Audit tier (£499) will
tell you what's missing on your current site.

Reach out via [LinkedIn](https://www.linkedin.com/in/tarunbulchandani/)
or the [contact form](/#contact).

## Related

- [Schema.org for small business websites](/blog/schema-org-small-business/) — the broader schema set
- [How to make your business website show up in ChatGPT](/blog/website-show-up-in-chatgpt/)
- [What is llms.txt](/blog/what-is-llms-txt/)
- [AI search optimisation for small businesses](/blog/ai-search-optimisation-small-business/)
