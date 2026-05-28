---
title: "Understanding llms.txt: an emerging standard for AI search discoverability"
date: 2024-09-12
excerpt: "A new convention for telling large language models what a website is about. The standard is informal, but adoption is moving faster than is widely appreciated, and the cost of implementation is trivial relative to the potential discoverability return."
author: "Tarun Bulchandani"
---

In September 2024, Jeremy Howard published a short proposal for a
file called `llms.txt` — a Markdown summary that sits at the root
of a website and gives large language models a concise, structured
introduction to what the site is about. The convention borrows the
naming pattern of `robots.txt` and `sitemap.xml` but the purpose is
different: it is written for the model, not the crawler, and the
content is intended to be read rather than indexed.

The proposal has no formal standards body behind it. There is no
W3C working group, no IETF draft, no committee. It is, in the most
literal sense, a convention. And yet the firms whose business model
depends on being correctly represented in AI-generated answers have
been adopting it faster than the absence of a formal standard would
suggest. The intent of this note is to set out what `llms.txt`
actually is, what it is not, and where it sits in the broader
question of being discoverable through generative search.

## What llms.txt is

A `llms.txt` file is a Markdown document, served from the root of
a domain (`/llms.txt`), that summarises the site for a language
model. The recommended structure is straightforward: a first-level
heading with the organisation or property name, a one-paragraph
blockquote summary, and a series of grouped links to the most
relevant supporting content.

The intent is to give a model that lands on the site — through a
search query, a citation, or a direct fetch — enough context to
answer questions accurately without having to traverse the entire
domain. For a small or mid-sized professional services firm,
that means the file typically covers:

- A short factual description of the business, including
  jurisdiction, size, and primary service lines.
- The questions the site is best placed to answer (the firm's
  expertise).
- Direct links to the canonical pages for each major service or
  topic.
- Links to the team or principals, particularly where individual
  reputations matter.
- Contact and engagement information.

A `llms.txt` of 80 to 150 lines, written in plain Markdown, is
typical. It is not a long document. It is a summary.

## What llms.txt is not

It is worth being precise about the boundaries.

A `llms.txt` file is not a substitute for the underlying content.
A model will, in practice, fetch the linked pages where it needs
detail; the file is the index, not the library. A site whose
underlying pages are thin or contradictory will not be rescued by
a well-written `llms.txt`.

It is not a search engine optimisation tactic in the conventional
sense. Google, Bing and the other classical engines do not use
`llms.txt` as a ranking input. The file's audience is the model
layer — ChatGPT, Claude, Perplexity, Gemini, Copilot, and the
growing list of derivative assistants — not the crawler layer.

It is not authenticated. A model that fetches the file has no
mechanism for verifying the claims it contains. The convention
relies on the assumption that the site owner is the one writing
the file and that the model will eventually cross-reference its
content against the linked pages.

It is not a guarantee. Adoption by individual models is
inconsistent, and the way each model uses the file (if it does) is
a matter of internal implementation that the firm has no
visibility into.

## Why it matters anyway

The reason `llms.txt` is worth attention, despite the caveats
above, is that the cost of getting it right is trivial relative to
the opportunity cost of being mis-represented in an AI-generated
answer.

A model that cannot find a coherent summary of the firm will, in
practice, do one of two things. It will construct a summary from
the most visible third-party sources it can find — a LinkedIn
profile, a third-party directory listing, a competitor's
comparison article — or it will decline to answer with specificity.
Neither outcome serves the firm well. A `llms.txt` that the
firm itself authors at least places the firm's preferred framing
on equal footing with the third-party material.

The further consideration is that the practice of writing a
`llms.txt` forces the firm to articulate its own positioning in a
way many SMBs have never had to do for the model layer. The
exercise of writing 80 lines of structured Markdown that
accurately captures what the firm does, who it serves, and what
it is best placed to answer is, in our observation, the single
most useful AI-discoverability exercise an owner-manager can do.

## Structure: a worked outline

The following is a representative outline. The exact wording will
vary by firm, but the structure is consistent.

```
# {Firm name}

> {One-paragraph factual summary — jurisdiction, size, primary
> service lines, the principal's name where the firm is small
> enough that the founder's reputation is the firm's reputation.}

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

The blockquote summary is the single most important element. It
is the part of the file that, in practice, is most likely to be
consumed verbatim by a model when forming a short factual answer
about the firm. The firm should treat the blockquote with the same
care it would treat the first paragraph of a brochure.

## Practical considerations

A few patterns worth noting from the work we have done in this
area.

**Keep the file frozen on a regular cadence.** A `llms.txt` that
changes weekly is harder for the model layer to treat as
authoritative than one that changes quarterly. Substantive updates
should be deliberate.

**Cross-link, do not duplicate.** The temptation is to put detail
in the file itself. The convention works better when the file
links to the canonical detail page than when it tries to
substitute for it. The model will follow the links.

**Mirror the site's structure.** A `llms.txt` should match the
shape of the navigation. A site whose `llms.txt` and primary nav
disagree is asking the model to choose which to trust.

**Sign-post the things the firm wants attributed.** If there are
particular case studies, methodologies or pieces of writing the
firm wants associated with its name, the `llms.txt` is the right
place to make that explicit.

**Treat the questions list as a positioning exercise.** The "best
placed to answer" section is, functionally, a query map. A firm
that has thought clearly about which queries it wants to be the
canonical answer to is a firm that has done the strategic work the
rest of its AI-discoverability programme depends on.

## Where this leaves the firm

`llms.txt` is a low-effort, high-signal intervention. It does not
substitute for the broader programme of structured data,
content depth and reputation building that AI search optimisation
ultimately requires. But for a firm that has not yet started, it
is the cleanest first step. Two hours of careful writing, a
deployment, and the file is in place.

The author maintains a `llms.txt` for [this
site](/llms.txt) as a reference. The
[services line](/services/) covers the work of producing one as
part of the broader AI-readiness package; the
[implementation roadmap](/services/insights/implementation-roadmap-ai-search-discoverability/)
sets out where it sits in the sequence.

---

*This note is part of an ongoing series on AI search and
discoverability for small and mid-sized businesses. Related
reading: [Generative Engine Optimisation
(GEO)](/services/insights/generative-engine-optimisation/) and
[Discoverability through generative search
interfaces](/services/insights/discoverability-generative-search-interfaces/).*
