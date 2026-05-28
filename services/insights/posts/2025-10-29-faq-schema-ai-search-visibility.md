---
title: "FAQ schema: an under-appreciated lever for AI search visibility"
date: 2025-10-29
excerpt: "FAQ markup is the structured-data intervention with the most consistent return in my work. The mechanism is simple, the implementation is short, and the impact on whether the firm's page is cited in a generative search answer is materially larger than its modest reputation suggests."
author: "Tarun Bulchandani"
---

If a firm has the budget for exactly one structured-data intervention beyond the foundational `Organization` and `Person` markup, the right one is FAQ schema. The returns, in my work, are more consistent than any other single addition to the markup stack.

The mechanism is intuitive once it is stated, but the practitioner literature hasn't given it the attention it deserves. This note sets out the mechanism, the implementation details that matter, the errors I see most often, and where the boundary of useful FAQ markup lies.

## The mechanism

Generative search interfaces construct answers by retrieving and synthesising material from candidate pages. The synthesis is easier when the candidate pages already contain the answer in a form the model can extract without ambiguity. A page that has an explicit question-and-answer structure, with a question, a clear answer, and proper markup labelling each, is materially easier for the model to use than a page that buries the same information in prose.

FAQ schema, in this sense, is a translation layer. It takes the firm's existing canonical answers (the things the firm would say if asked the question directly) and presents them to the model in the format the model is best equipped to extract.

There's a second consideration. The queries that generative search interfaces handle particularly well are, disproportionately, question-form queries. A user is asking the assistant rather than searching it. A site whose pages mirror the structure of the questions it expects to be asked is structurally well-aligned with how the assistant operates.

## Implementation

The recommended pattern is to add FAQ sections to the pages where they fit naturally (service pages, about pages, the homepage where appropriate) and to mark them up with either microdata or JSON-LD `FAQPage` schema.

The minimum useful structure:

```html
<div itemscope itemtype="https://schema.org/FAQPage">

  <div itemscope itemprop="mainEntity"
       itemtype="https://schema.org/Question">
    <h3 itemprop="name">{The question, verbatim}</h3>
    <div itemscope itemprop="acceptedAnswer"
         itemtype="https://schema.org/Answer">
      <div itemprop="text">
        {The answer, written as the firm would explain it.}
      </div>
    </div>
  </div>

  ... further Q+A blocks ...

</div>
```

The JSON-LD equivalent, served from the document head, is equally valid and is preferred when the markup is generated from a structured data source.

A few specifics matter.

**The question phrasing should match how a prospect would actually ask the question.** A FAQ on a tax-advisory firm's website should say "Do I need to file a self-assessment if I have a single PAYE income and a small rental property?", not "Self-assessment requirements". The model is looking for question-form queries; the literal phrasing matters.

**The answer should be self-contained.** A model that extracts the answer will not also extract surrounding context. The answer must be readable in isolation. Cross-references like "as discussed above" or "see the previous section" don't survive extraction.

**The answer should be specific.** A FAQ whose answer is "It depends on your circumstances; please contact us" is, to the model, useless. The model needs a substantive answer, even if it's partial.

**The number of questions matters less than the depth.** Six well-written, specific Q+A pairs are materially more useful than twenty thin ones.

## The common errors

Three errors account for most of the FAQ-schema problems I see in audits.

**FAQ markup applied to content that isn't actually a FAQ.** A page of generic marketing copy with a `FAQPage` schema wrapper is, in the medium term, likely to be down-weighted by the platforms that care about markup integrity. The markup must match the visible content.

**Generic, defensive answers.** A FAQ whose answers are written by the firm's legal team to avoid any specific commitment is unhelpful. The marketing department's instinct to over-qualify works against the discoverability goal.

**Markup that exists in the schema but not in the visible HTML.** Schema.org markup must reflect content that is actually present on the page. Adding schema for content the user cannot see is, in the platforms' guidance, prohibited. Models, increasingly, also down-weight pages where the markup and the visible content disagree.

## Where the boundary lies

There's a real risk of over-applying. FAQ schema should appear on pages where the firm has substantive Q+A content; it shouldn't appear on every page. A FAQ section glued onto the homepage with five generic questions is, in my experience, of limited value. A FAQ section properly written on a service page, with six to ten questions a prospect would actually ask, is the most impactful single piece of structured data the firm can ship.

A useful exercise: ask the firm's principal to list, from memory, the questions a prospect asks on the discovery call. Those questions are the FAQ. The answers are the canonical answers the firm would give. The markup is the translation of that material into a form the model can use.

## A note on Google's position

Google has, on different occasions, narrowed the conditions under which `FAQPage` markup is displayed as a rich result on the SERP. The display of rich results is, however, a separate question from whether the markup is useful for AI search. The model layer continues to use `FAQPage` markup regardless of whether Google chooses to display it prominently. Firms whose programme is calibrated to Google rich-result display alone have, in my observation, under-invested in this area as a consequence.

## Where this fits

In the [implementation roadmap](/services/insights/implementation-roadmap-ai-search-discoverability/), FAQ schema sits in the second wave of foundational work, after the core `Organization`, `Person`, `Service` and `WebSite` markup is in place. It's one of the highest-leverage items in that second wave.

In the [audit framework](/services/insights/audit-framework-ai-search-readiness/), the absence of FAQ markup is a near-universal finding on sites that haven't previously addressed AI discoverability.

In the [services line](/services/), the Retrofit package covers the addition of FAQ markup to the firm's existing service pages; the Build package ships with FAQ markup baked in from the first page.

The intervention is short, the implementation is direct, and the return is, in my work, consistent. For an SMB that wants a single, well-bounded place to start the AI-discoverability programme, this is it.
