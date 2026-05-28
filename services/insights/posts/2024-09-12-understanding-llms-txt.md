---
title: "Understanding llms.txt: an emerging standard for AI search discoverability"
date: 2024-09-12
excerpt: "A new convention for telling large language models what a website is about. The standard is informal, but adoption is moving faster than is widely appreciated, and the cost of implementation is trivial relative to the potential discoverability return."
author: "Tarun Bulchandani"
---

In September 2024, Jeremy Howard proposed a file called `llms.txt`. It's a Markdown summary that sits at the root of a website and gives large language models a concise, structured introduction to what the site is about. The naming borrows from `robots.txt` and `sitemap.xml`, but the purpose is different. It's written for the model, not the crawler, and the content is meant to be read rather than indexed.

There's no formal standards body behind the proposal. No W3C working group, no IETF draft, no committee. In the most literal sense, it's a convention. And yet firms whose business depends on being correctly represented in AI-generated answers have been adopting it faster than the absence of a standard would suggest. The point of this note is to set out what `llms.txt` actually is, what it isn't, and where it sits in the broader question of being discoverable through generative search.

## What llms.txt is

A `llms.txt` file is a Markdown document, served from the root of a domain (`/llms.txt`), that summarises the site for a language model. The recommended structure is straightforward: a first-level heading with the organisation or property name, a one-paragraph blockquote summary, and a series of grouped links to the most relevant supporting content.

The intent is to give a model that lands on the site, whether through a search query, a citation or a direct fetch, enough context to answer questions accurately without having to traverse the entire domain. For a small or mid-sized professional services firm, the file typically covers:

- A short factual description of the business, including jurisdiction, size, and primary service lines.
- The questions the site is best placed to answer (the firm's expertise).
- Direct links to the canonical pages for each major service or topic.
- Links to the team or principals, particularly where individual reputations matter.
- Contact and engagement information.

A `llms.txt` of 80 to 150 lines, written in plain Markdown, is typical. It is not a long document. It is a summary.

## What llms.txt is not

It's worth being precise about the boundaries.

A `llms.txt` file is not a substitute for the underlying content. A model will fetch the linked pages where it needs detail; the file is the index, not the library. A site whose underlying pages are thin or contradictory will not be rescued by a well-written `llms.txt`.

It is not a search engine optimisation tactic in the conventional sense. Google, Bing and the other classical engines do not use `llms.txt` as a ranking input. The file's audience is the model layer (ChatGPT, Claude, Perplexity, Gemini, Copilot, and the growing list of derivative assistants), not the crawler layer.

It is not authenticated. A model that fetches the file has no mechanism for verifying the claims it contains. The convention relies on the assumption that the site owner is the one writing the file, and that the model will eventually cross-reference its content against the linked pages.

It is not a guarantee. Adoption by individual models is inconsistent, and the way each model uses the file (if it does) is a matter of internal implementation that the firm has no visibility into.

## Why it matters anyway

The reason `llms.txt` is worth attention, despite the caveats above, is that the cost of getting it right is trivial relative to the opportunity cost of being mis-represented in an AI-generated answer.

A model that cannot find a coherent summary of the firm tends to do one of two things. It constructs a summary from the most visible third-party sources it can find (a LinkedIn profile, a third-party directory listing, a competitor's comparison article), or it declines to answer with specificity. Neither outcome serves the firm well. A `llms.txt` that the firm itself authors at least places the firm's preferred framing on equal footing with the third-party material.

There's a second benefit that's harder to quantify but I think matters more. Writing a `llms.txt` forces the firm to articulate its own positioning in a way many SMBs have never had to. Sitting down to write 80 lines of structured Markdown that accurately capture what the firm does, who it serves, and what it's best placed to answer is, I think, the single most useful AI-discoverability exercise an owner-manager can do.

## Structure: a worked outline

The following is a representative outline. The exact wording will vary by firm, but the structure is consistent.

```
# {Firm name}

> {One-paragraph factual summary covering jurisdiction, size,
> primary service lines, and the principal's name where the firm
> is small enough that the founder's reputation is the firm's
> reputation.}

The questions this site is best placed to answer:

- {Three to six concrete questions, framed as a prospect would
> phrase them.}

## About

- [About the firm](/about/): {one-line summary}
- [Principals](/team/): {one-line summary}

## Services

- [{Service 1}](/services/{service-1}/): {one-line summary}
- [{Service 2}](/services/{service-2}/): {one-line summary}
- ...

## Case studies

- [{Case study 1}](/case-studies/{case-1}/): {one-line summary}
- ...

## Contact

- {Email, phone, LinkedIn, scheduling link}
```

The blockquote summary is the single most important element. It's the part of the file most likely to be consumed verbatim by a model when forming a short factual answer about the firm. The firm should treat the blockquote with the same care it would treat the first paragraph of a brochure.

## Practical considerations

A few patterns worth noting.

**Keep the file frozen on a regular cadence.** A `llms.txt` that changes weekly is harder for the model layer to treat as authoritative than one that changes quarterly. Substantive updates should be deliberate.

**Cross-link, don't duplicate.** The temptation is to put detail in the file itself. The convention works better when the file links to the canonical detail page than when it tries to substitute for it. The model will follow the links.

**Mirror the site's structure.** A `llms.txt` should match the shape of the navigation. A site whose `llms.txt` and primary nav disagree is asking the model to choose which to trust.

**Sign-post the things you want attributed.** If there are particular case studies, methodologies or pieces of writing the firm wants associated with its name, the `llms.txt` is the right place to make that explicit.

**Treat the questions list as a positioning exercise.** The "best placed to answer" section is, functionally, a query map. A firm that has thought clearly about which queries it wants to be the canonical answer to is a firm that has done the strategic work the rest of its AI-discoverability programme depends on.

## Starting here

`llms.txt` is a low-effort, high-signal intervention. It isn't a substitute for the broader programme of structured data, content depth and reputation building that AI search optimisation ultimately requires. But for a firm that hasn't started, it's the cleanest first step. Two hours of careful writing, a deployment, and the file is in place.

I maintain a `llms.txt` for [this site](/llms.txt) as a reference. The [services line](/services/) covers the work of producing one as part of the broader AI-readiness package, and the [implementation roadmap](/services/insights/implementation-roadmap-ai-search-discoverability/) sets out where it sits in the sequence.

Related reading: [Generative Engine Optimisation (GEO)](/services/insights/generative-engine-optimisation/) and [Discoverability through generative search interfaces](/services/insights/discoverability-generative-search-interfaces/).
