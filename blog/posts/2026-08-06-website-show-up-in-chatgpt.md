---
title: "How to make your business website show up in ChatGPT"
slug: website-show-up-in-chatgpt
date: 2026-08-06
excerpt: "When someone asks ChatGPT to recommend a business like yours, why isn't your website being cited? A practical explanation of how AI assistants find businesses online, and what you can do this week to be one of the businesses they surface."
source: own
---

## The short answer

When ChatGPT, Claude, or Perplexity answers a question like "find me
a boutique consultancy in London that specialises in operational
strategy", they don't pick a website at random. They retrieve from
the open web, score what they find, and cite the sites that look
most credible and most clearly relevant to the question.

If your business website isn't being cited, the reason is almost
always one of three things:

1. **The AI assistant can't read your site cleanly.** Your content is locked behind JavaScript, or hidden inside images, or buried under marketing fluff that doesn't make a clear factual claim about what you do.
2. **The structure isn't there.** No schema markup, no FAQ section, no `llms.txt`, no clear "About" page with concrete information. The model has nothing to ground a citation on.
3. **The content itself is too generic.** "We are passionate about delivering excellence" is invisible to AI search. "We help mid-sized law firms in the UK reduce their compliance reporting time by approximately 40%" is exactly the kind of statement an AI will quote.

This piece is the practical walkthrough of what's actually happening
under the hood, and what to do about it.

## How AI assistants actually find your business

There are three pipelines that put your website in front of an AI
assistant, and each one rewards different things.

### Pipeline 1: pre-trained knowledge

The model has been trained on a large slice of the public web up to
some cut-off date. If your site existed before the cut-off and had
enough inbound links and content authority, the model may have
absorbed information about you. This pipeline is mostly out of your
control after the fact, and is being de-emphasised in newer model
behaviour anyway.

What this means for you: don't optimise for this pipeline. It's
historical and will only matter less over time.

### Pipeline 2: live web search inside the assistant

When you ask ChatGPT a question that the model can't answer from
its pre-training (or that's clearly time-sensitive), it triggers a
search tool. Behind the scenes, the assistant does something
between a Google search and a structured retrieval call, looks at
the top results, and synthesises an answer that often includes
citations.

This pipeline rewards the same things classic SEO rewards, plus
several new ones:

- Your site has to be **crawlable** (a normal site usually is)
- The page that answers the question has to be **indexable** (no `noindex` meta tag)
- The content has to be **scannable in text** (heavy JavaScript-rendered content is often invisible to the search step)
- The page has to **directly answer the implicit question** of the user's prompt

What this means for you: the modern AI search step uses live web
crawls, so the same basic technical hygiene that helped you with
Google still applies. But it weights the directness of the answer
more heavily than Google ever did.

### Pipeline 3: structured-data lookup and tool-augmented retrieval

The newest layer, and the one that almost nobody is optimising for
yet. AI assistants increasingly consult structured-data signals on
your site — schema.org markup, `llms.txt`, FAQ-formatted blocks,
explicit headings — to confirm what your business does and to
generate citations.

This pipeline rewards:

- **Schema.org structured data** (`Organization`, `LocalBusiness`, `Service`, `FAQPage`, `Person`)
- **`llms.txt`** at the root of your domain
- **Clear FAQ sections** with proper markup (`FAQPage` schema)
- **An "About" page** that contains specific, factual claims
- **Topic clustering** — multiple pages on related themes that link to each other

What this means for you: this is where the biggest gains are, and
where the smallest amount of work currently produces the largest
improvement.

## What you can do this week

If you want your business to start showing up in AI search results,
the practical to-do list:

### 1. Audit your homepage for direct factual claims

Open your homepage. Read it. Ask yourself: if someone read only
this page, could they tell exactly what your business does, where
you are based, who you serve, and what makes you specifically
findable? If you find phrases like "we're passionate about" or
"world-class solutions", you have a problem. Replace with
specifics: location, services, target customer, distinguishing
facts.

### 2. Add schema.org markup

The single highest-leverage technical change. At minimum you
should have:

- **Organization** schema with your name, location, contact information
- **LocalBusiness** schema if you have a physical presence
- **Service** schema for each thing you sell
- **FAQPage** schema for the common questions you answer

This is JSON-LD inserted in the `<head>` of your page. If your
site is on Squarespace, Wix, Webflow, or another platform, the
support for this varies considerably and is usually shallower than
what's needed.

### 3. Add an `llms.txt` file

A `/llms.txt` file at the root of your domain (e.g.
`yourbusiness.com/llms.txt`) is a structured Markdown file that
tells AI assistants directly what's on your site and what matters.
It's an emerging standard. Adoption among major AI assistants is
growing through 2026. The cost of having one is approximately zero;
the upside is meaningful.

A minimal example:

```
# Your Business Name

> A one-paragraph summary of what your business does, who you serve, and where you operate.

## Services
- [Service 1](https://yourbusiness.com/services/one/)
- [Service 2](https://yourbusiness.com/services/two/)

## About
- [About the business](https://yourbusiness.com/about/)
- [How to contact us](https://yourbusiness.com/contact/)
```

### 4. Add an FAQ section to your homepage

Take the five most common questions a prospect asks you in a sales
conversation. Write the answers in plain language. Add them to your
homepage in a properly marked-up `FAQPage` block. AI assistants
pull from FAQ markup more heavily than almost any other signal.

### 5. Strengthen your "About" page

The "About" page is disproportionately important to AI assistants
because it's the page they look at to understand who you are. It
should contain:

- Specific facts (years in business, founder name, qualifications, location)
- A clear statement of what you do and don't do
- Named clients or industries (if you can mention them)
- A short FAQ
- Contact information

Avoid the temptation to write a beautiful narrative. Write a
factual reference.

## What requires professional work

A few things in this space are genuinely technical and either
benefit from or require professional implementation:

- **Schema.org markup at the depth that actually moves the needle.** Basic schema is available in most CMSes; depth-of-coverage schema (everything inter-linked properly, with the right `sameAs` references, with the right entity relationships) is rare.
- **Speakable specification markup** for voice and AI assistant queries.
- **Topic-cluster page architecture** that builds topical authority.
- **Technical SEO** that lets the AI search step actually see your content (server-side rendering, clean URLs, proper canonical handling).
- **AI-result monitoring** — tracking whether your site is being cited in AI responses to relevant queries, and what's improving or degrading over time.

## What to do next

If you implement the five steps above, you'll be ahead of more than
90% of small business websites today. If you want to go further,
the next two pieces in this series cover [what `llms.txt` actually
is and does](/blog/what-is-llms-txt/), and [why most Squarespace,
Wix, and Webflow sites are invisible to AI assistants](/blog/squarespace-wix-webflow-ai-search/).

If you'd rather not figure this out yourself, I build AI-ready
websites for small and mid-sized businesses — sites engineered to
be found by ChatGPT, Claude, and Perplexity, not just by Google.
Get in touch via [LinkedIn](https://www.linkedin.com/in/tarunbulchandani/)
or the [contact form](/#contact) if that would be useful.
