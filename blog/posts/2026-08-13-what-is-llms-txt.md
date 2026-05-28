---
title: "What is llms.txt, and does your business website need one?"
slug: what-is-llms-txt
date: 2026-08-13
excerpt: "llms.txt is a small text file that tells AI assistants what's on your website and what matters most. Adoption is growing fast. Here's what it is, what it does, and how to add one to your site in under thirty minutes."
source: own
---

## The short answer

`llms.txt` is a Markdown file you put at the root of your domain
(e.g. `yourbusiness.com/llms.txt`) that gives AI assistants a
structured summary of your website, in a format they can read
cleanly. It is to AI search what `robots.txt` was to traditional
search engines, and what `sitemap.xml` was to crawlers — a small
file that costs nothing to add and makes your site materially
easier for AI to consume.

If you run a business website and you're not on `llms.txt` yet,
you're missing one of the simplest discoverability moves available
in 2026. This piece is the practical explanation and a working
template.

## Where llms.txt comes from

The proposal was published in late 2024 by Jeremy Howard (the
co-founder of fast.ai) as a response to a specific observation: AI
assistants increasingly need to consume the content of websites
quickly, and the standard structure of most websites — HTML
designed for human browsers, with navigation, scripts, advertising,
and tracking — makes that hard.

The proposed solution: a single Markdown file at a well-known path,
written specifically for AI consumption, that gives the model a
clean summary of the site and links to the most important content.

Through 2025 and into 2026, the standard has gained meaningful
adoption among AI assistants. Anthropic, OpenAI, Perplexity, and
several smaller providers have indicated they look for or consult
`llms.txt` when crawling sites. Adoption among websites themselves
is still very low — which is exactly why adding one now produces a
disproportionate benefit.

## What an llms.txt file looks like

The format is intentionally simple. Markdown, with a few conventions:

```markdown
# Your Business Name

> A one to three sentence summary of what your business does, who
> you serve, and where you operate. This is the part the AI assistant
> uses to answer "what does this business do".

## Services

- [Service one](https://yourbusiness.com/services/one/): one-sentence description.
- [Service two](https://yourbusiness.com/services/two/): one-sentence description.

## About

- [About the business](https://yourbusiness.com/about/): your founding story, team, credentials.
- [Contact](https://yourbusiness.com/contact/): how to get in touch.

## Recent writing

- [Article one](https://yourbusiness.com/blog/article-one/): one-sentence summary.
- [Article two](https://yourbusiness.com/blog/article-two/): one-sentence summary.

## Contact

- Email: hello@yourbusiness.com
- LinkedIn: https://www.linkedin.com/company/yourbusiness
- Office: 123 Example Street, London
```

That's the whole format. The blockquote summary at the top is the
key part. The sections that follow are linked references with brief
descriptions. AI assistants read this much more efficiently than
they read your homepage HTML.

## What it does, technically

When an AI assistant is given a query that might involve your
business, the modern retrieval pipeline now includes a check for
`llms.txt` on candidate domains. If the file exists, the assistant
reads it before (or alongside) the regular page content. This has
several practical effects:

- **The model gets a cleaner factual summary of your business.** Less noise, fewer marketing words, more directly extractable facts.
- **The model can navigate to specific pages without crawling everything.** If your page about "compliance services for medical device manufacturers" is in the `llms.txt`, the assistant can go straight to it rather than browsing your homepage and hoping to find it.
- **Citation accuracy improves.** When the assistant cites your business in an answer, it's citing structured information rather than guessed information.

## What llms.txt is NOT

A few clarifications because the standard is new and gets confused
with other things:

- **It is not robots.txt.** `robots.txt` tells crawlers what they may and may not visit. `llms.txt` tells AI assistants what's worth looking at.
- **It is not a substitute for schema.org markup.** They are complementary. Schema.org is structured data embedded in the HTML of individual pages, used for rich snippets and detailed factual claims. `llms.txt` is a site-level summary.
- **It is not a sitemap.xml replacement.** Sitemap is for search-engine crawlers indexing every URL. `llms.txt` is a curated subset of the most important content, with descriptions.
- **It is not a privacy or AI-training opt-out.** Several emerging proposals try to do that (`ai.txt`, `tdmrep.json`); `llms.txt` is the opposite — it actively invites AI consumption.

## How to add llms.txt to your website

Three steps.

### Step 1: write the file

Open a text editor. Use the template above as a starting point.
Customise:

- The **summary blockquote** is the most important paragraph on the file. Spend ten minutes on it. Write it as a clear, factual statement of what your business does.
- The **services section** lists what you sell. Each item should be a link to the page that describes that service, with a one-sentence description.
- The **about section** points to your About page, your contact page, and any other "who we are" content.
- The **recent writing section** lists your most important content. Don't include everything; include the things you want cited.
- The **contact section** is direct contact information.

Aim for under 300 lines. Curate. The whole point is high signal-to-noise.

### Step 2: put it at the root of your domain

The file needs to live at `https://yourbusiness.com/llms.txt`. Exactly that
path. Not `/files/llms.txt`. Not `/info/llms.txt`. Root.

How you do this depends on your hosting:

- **Static-site hosting (Cloudflare Pages, Netlify, Vercel):** drop the file at the root of your published directory. Done.
- **WordPress:** depending on your hosting setup, this may require FTP access or a plugin. The exact mechanism varies.
- **Squarespace, Wix:** at the time of writing (2026), neither of these platforms supports placing arbitrary text files at the root of the domain. This is one of several reasons their AI-discoverability posture is weak.
- **Webflow:** custom code injection at the project level can be configured to serve `llms.txt`, though it's an indirect path.

If your platform doesn't support root-level file placement, this
is a meaningful gap and worth thinking about as part of a broader
hosting review.

### Step 3: verify it loads

Visit `https://yourbusiness.com/llms.txt` in a browser. It should
display the Markdown file directly (or with minimal formatting,
depending on your hosting). If it 404s, the placement is wrong;
fix the placement.

## Maintenance

Keep the file current. As you publish new things — new services,
new important pages, significant new content — update the relevant
section. The whole file is small enough that this is a five-minute
update each time, not a meaningful maintenance burden.

A useful rule: review the `llms.txt` whenever you'd review your
site's headline navigation. The two things tend to need updating
at the same cadence.

## A working example

For a working reference, the `llms.txt` on this site is at
[/llms.txt](/llms.txt). It's the format above, applied to a
personal site with a writing focus rather than a service business.
The structure transfers cleanly.

## What this gets you

In the short term, modest but real. AI assistants that consult
`llms.txt` will have a cleaner mental model of your business. Your
citations in AI-generated answers will be more accurate. Your
chances of being included in an AI response to a relevant query
will go up.

In the medium term, more significant. As `llms.txt` adoption
increases on the AI-assistant side, the gap between sites that
have it and sites that don't will widen. The early adopters will
have a compounding advantage; the late adopters will be catching
up.

In the long term, it'll become a baseline expectation, the same
way `robots.txt` is today. The only question is when you do it.

## What about the rest

`llms.txt` is one piece of a broader AI-discoverability stack.
The other big ones are schema.org structured data, FAQ markup,
topic clustering, and clean semantic HTML. The next pieces in this
series cover [schema.org for small businesses](/blog/schema-org-small-business/),
[FAQ schema specifically](/blog/faq-schema-small-business/), and
[the broader question of why some platforms perform poorly on AI
search](/blog/squarespace-wix-webflow-ai-search/).

If you want the whole stack built for you — properly, by someone
who has implemented it on real production sites — get in touch via
[LinkedIn](https://www.linkedin.com/in/tarunbulchandani/) or the
[contact form](/#contact).
