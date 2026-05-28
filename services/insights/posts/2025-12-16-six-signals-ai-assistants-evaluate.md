---
title: "Six signals AI assistants evaluate when identifying business recommendations"
date: 2025-12-16
excerpt: "Across the major generative search interfaces, six characteristics emerge consistently as the signals that drive citation. The list is not exhaustive, but a firm that has not addressed these six is, in our work, materially less likely to be recommended. A framework for assessing where the firm stands."
author: "Tarun Bulchandani"
---

Across the engagements we have run in the last twelve months,
and across the test-query work the author has done against
ChatGPT, Claude, Perplexity, Microsoft Copilot, Google's AI
Overviews and Gemini, six signals emerge consistently as the
characteristics that drive a firm's inclusion in a generative
search recommendation.

The list below is not derived from formal academic research;
the underlying models are closed, and the precise weighting
the platforms apply is not disclosed. The signals are derived
from observed behaviour across hundreds of test queries and
from triangulating against the firm characteristics that
correlate, in our work, with citation.

The intent of the framework is to give a firm a structured
way of assessing where it stands. A firm that scores well on
five of six is, in practice, materially more likely to be
recommended than a firm that scores well on two.

## Signal 1: declared identity

The most fundamental signal is whether the firm has a clear,
machine-readable declaration of what it is. This is the
foundational schema.org work — `Organization` or
`ProfessionalService` markup, with a complete property set, on
every page. (Covered in detail in [the practitioner's
guide](/services/insights/structured-data-modern-business-website/).)

What the model checks for, in effect:

- Does the firm have a stable, declared name?
- Does the firm declare what it does, in plain language, in a
  way that matches the visible content of the homepage?
- Does the firm declare its jurisdiction and area served?
- Does the firm declare a principal whose reputation
  corroborates the firm's claim of expertise?

The absence of structured-data identity is, in our experience,
the single most common reason a firm is invisible to AI
search. The fix is well-bounded.

## Signal 2: corroboration across sources

The model wants to verify the firm's claims against
independent sources. The mechanism is the `sameAs` linkages
from the firm's structured data to its presence on:

- LinkedIn (firm page and principal profiles)
- Companies House (or the jurisdiction's equivalent)
- Recognised professional body directories (ICAEW, RICS,
  Law Society, SRA, ICAEW, accredited body listings)
- Crunchbase or other firmographic databases
- Wikipedia, where applicable
- Industry publications and trade press listings

A firm that has a clean LinkedIn presence and is registered
with Companies House but has not declared either in its
`sameAs` is making the model do more work than necessary.
The model may or may not bridge the gap; declaring it
removes the uncertainty.

## Signal 3: content depth and specificity

The model needs material to quote. A firm whose pages are
all 400-word marketing summaries is harder to cite than a
firm whose service pages average 1,500 words and contain
specific, quotable claims.

What the model checks for, in effect:

- Are the firm's service pages substantive?
- Do the pages contain specific claims (numbers, dates,
  outcomes, methodology) the model can extract?
- Are there canonical-answer pages (FAQs, glossaries,
  explainer pieces) the model can use to answer specific
  queries?
- Is there a current blog or insights section with material
  the model can use to assess the firm's current thinking?

The cost of meeting this signal is, in our experience,
where firms most often resist. The work is not technical;
it is editorial. The
[Authority package](/services/) is the productised version
of the sustained content investment this signal requires.

## Signal 4: consistency

The model down-weights sources whose claims contradict each
other or whose claims contradict other sources the model
trusts. The internal-consistency check is straightforward:

- Does the firm's website say the same thing as its
  LinkedIn?
- Does the firm's website say the same thing as its
  third-party directory listings?
- Do the firm's pages say the same thing as each other?
- Are the principal's biographical claims (years of
  experience, credentials, prior firms) consistent across
  the firm's website and the principal's other
  professional listings?

The most common failure on this signal is, in our
experience, the principal's LinkedIn profile being more
detailed than the firm's website, with material the website
omits or, worse, contradicts. The fix is to align the two.

## Signal 5: recency

The model materially prefers recent material on most
topical questions. The bias is particularly strong for:

- Regulatory or compliance topics
- Topics that involve technology or tools that are
  themselves moving quickly
- Market commentary
- Pricing and commercial structure

The implication for the firm is that a sustained publishing
cadence is not optional. A firm whose last published piece
is from two years ago is, on most queries, structurally
disadvantaged against a competitor publishing monthly.

The bar is not high. A firm that publishes a substantive
piece every six to eight weeks, on the topics it wants to
be associated with, will, in our work, materially out-perform
a firm publishing only sporadically.

## Signal 6: explicit machine-readable summaries

This is the signal where the firm's `llms.txt` and its
FAQ markup interact. The model is looking for a place where
the firm has, in effect, written down the canonical answers
to the questions a prospect would ask.

The firm that has both:

- A `llms.txt` covering the firm at the level of the
  organisation. (See: [Understanding
  llms.txt](/services/insights/understanding-llms-txt/).)
- FAQ markup covering the canonical questions on each
  major service page. (See: [FAQ
  schema](/services/insights/faq-schema-ai-search-visibility/).)

is, in our work, materially more likely to be cited than a
firm with only one or neither. The two signals are
complementary; they cover different scales of summary.

## How to use the framework

The framework is most useful as a structured audit. A firm
can be scored, signal-by-signal, on a four-level scale —
absent, partial, present, exemplary — and the resulting
profile makes it immediately obvious where the priority
work lies.

The
[audit
framework](/services/insights/audit-framework-ai-search-readiness/)
piece sets out the full assessment criteria, with checklists
for each signal. The
[Audit package](/services/) is the productised version of
that exercise.

## Where this leaves the firm

Most SMBs we audit score well on one or two signals and
materially under-perform on three or four. The Pareto
position is to address the structural signals first
(Signals 1, 2, 6) and then the content signals (Signals 3
and 5). Consistency (Signal 4) tends to resolve itself once
the other work is done.

A firm that addresses all six is, in our observation, a
firm that is more likely than not to appear in the cited
material for the queries it is positioned to answer. That
is the underlying objective of the discipline.
