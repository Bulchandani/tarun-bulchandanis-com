---
title: "Discoverability through generative search interfaces: a practical primer"
date: 2024-11-20
excerpt: "Generative search interfaces — ChatGPT search, Perplexity, Claude, Copilot and Gemini — are converging on a single mode of answer construction. The implications for SMB websites are concrete, but the literature has not yet caught up. A short orientation."
author: "Tarun Bulchandani"
---

A pattern is now stable enough to talk about cleanly. The
generative search interfaces — ChatGPT search, Perplexity, the
search modes of Claude, Microsoft Copilot, Google's AI Overviews
and Gemini — have converged on a similar approach to answer
construction. They retrieve, they read, they reason, and they
cite. The cited sources are surfaced to the user, in some cases
as inline footnotes, in others as a panel beside the answer.

For a small or mid-sized professional services firm, the
practical question is not whether to engage with this layer of
the search market. It is whether the firm is currently
discoverable in it, and if not, what to do.

The intent of this primer is to set out, in plain terms, how
generative search interfaces actually construct answers, where
the SMB website fits in that process, and which characteristics
of a site materially affect the firm's chances of being included
in the cited material.

## The shape of a generative search answer

A generative search answer is, in broad terms, the output of a
retrieval-augmented generation pipeline. The user's query is
parsed and rewritten — often into multiple sub-queries — and
those queries are issued against a search index or a live web
fetch. The retrieved material is then summarised and synthesised
into a natural-language answer by a language model, with citations
inserted to support specific claims.

Three properties of that pipeline matter for the SMB.

First, the model is selecting from a candidate set, not from the
entire web. The candidate set is, in practice, a few dozen pages
at most. A firm whose pages are not in that candidate set will
not be cited, regardless of the quality of its content. The
question of whether the firm is in the candidate set is the
question of whether the firm has been indexed and surfaced by the
underlying search layer.

Second, the model prefers material it can quote. Pages that
contain clear, declarative sentences with specific facts are
materially more useful to the model than pages that hedge,
qualify, or generalise. The model is looking for a sentence it
can pull into the answer without the user having to question it.

Third, the model prefers material that is internally consistent
with the other candidates. A firm whose own pages contradict
each other, or whose own claims contradict third-party sources,
is harder to cite. The model would rather cite a page whose
claims are corroborated than a page whose claims are contested.

## What the model looks for, in practice

Three signal categories drive inclusion in the cited material.

**Authority signals.** The model is, in effect, looking for
evidence that the firm is the kind of source a trained
researcher would cite. The supporting signals are the usual ones
— a credible domain, an author with verifiable expertise,
backlinks from other recognised sites, structured data declaring
who the firm is — but the weighting is different from classical
search. The presence or absence of `schema.org/Organization` or
`schema.org/ProfessionalService` markup, in our work, is
materially correlated with whether a firm is cited.

**Topical depth signals.** The model is looking for a site that
clearly does this work, not a site that mentions this work. A
firm whose homepage lists eight services but whose underlying
pages are 200-word marketing summaries is, in practice, harder
to cite than a firm whose service pages are 1,500 words each,
written with specificity. The model needs material to quote.

**Recency signals.** The model is, in most cases, biased toward
recent material — particularly for queries that touch on
regulation, market conditions or fast-moving technology. A firm
that last updated its blog in 2022 is, in this layer of the
search market, structurally disadvantaged.

The first two categories are addressable in a single engagement.
The third requires a sustained publishing cadence; this is the
reason the
[Authority package](/services/) exists, and the reason an
[implementation roadmap](/services/insights/implementation-roadmap-ai-search-discoverability/)
treats publishing cadence as a separate workstream from the
foundational structured-data work.

## Why most SMB websites are not in the candidate set

A common observation, on starting an engagement, is that the
firm's website is structurally invisible to the generative
search layer for reasons that have nothing to do with content
quality. The most frequent causes:

- **The site is built on a template platform** that does not
  expose schema.org markup, or that exposes it in a way that is
  inconsistent with the firm's actual positioning. (See
  [the vendor-by-vendor
  assessment](/services/insights/template-platforms-ai-discoverability-gap/).)
- **The content is too thin.** Pages average 250-400 words and
  contain no quotable, specific claims.
- **The site has no published canonical answers** to the
  questions a prospect would ask. The FAQ page is absent or
  generic.
- **The site has no `llms.txt`**, leaving the model to construct
  a summary from whatever it can find. (See [Understanding
  llms.txt](/services/insights/understanding-llms-txt/).)
- **There is no FAQ schema** on the pages that do answer
  questions, which makes those answers hard for the model to
  extract reliably. (See [FAQ
  schema](/services/insights/faq-schema-ai-search-visibility/).)

Each of these is independently addressable. None requires a
rebuild of the site, though in some cases a rebuild is the
faster route.

## The longer-term consideration

The generative search layer is, at the time of writing, still
maturing. The mechanisms by which individual models select and
weight sources will continue to change. Any specific tactic
described in this note is, accordingly, subject to revision as
the field develops.

The underlying observation, however, is stable: the search
market is shifting from a model in which the user picks from a
list of links to a model in which the AI picks one or two
sources to cite. For a firm whose business depends on being
found at the moment a prospect is researching, the implication
is that the firm now has to be the kind of source the AI will
choose.

That is, in many ways, a higher bar than being the tenth result
on a Google search results page. But it is also a more durable
position: a firm that is cited as the canonical source on a
question is, in practice, the firm the prospect contacts.

The work of getting there is, in our experience, methodical
rather than mysterious. The next pieces in this series cover
the [audit
framework](/services/insights/audit-framework-ai-search-readiness/),
the [six signals AI assistants
evaluate](/services/insights/six-signals-ai-assistants-evaluate/),
and the [implementation
roadmap](/services/insights/implementation-roadmap-ai-search-discoverability/).
The [services line](/services/) covers delivery.
