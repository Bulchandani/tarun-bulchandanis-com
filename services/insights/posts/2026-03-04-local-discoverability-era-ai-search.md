---
title: "Local discoverability in the era of AI search: considerations for businesses with a physical presence"
date: 2026-03-04
excerpt: "AI assistants handle local queries differently from classical search engines, and the divergence is sharper than the literature has yet caught up to. Considerations for firms whose business depends on being found in their local market — and where the conventional 'local SEO' toolkit now sits."
author: "Tarun Bulchandani"
---

The local-search market — the queries that drive footfall to
a physical location or surface a service provider serving a
specific town or region — has been served, for fifteen years,
by a mature set of conventions. Google Business Profile (or
its predecessors), local citations, NAP consistency, structured
`LocalBusiness` markup, and a handful of platform-specific
optimisations were the toolkit.

That toolkit is not obsolete. Most of its components still
matter. But it is no longer sufficient, and in a small number
of places it has become structurally misaligned with how AI
assistants handle local queries.

The intent of this note is to set out where the divergence
sits, what it means for firms whose business depends on local
discovery, and how the practical workplan should adjust.

## How local queries are now handled

A user asking ChatGPT, Claude, Perplexity or a Copilot
variant a local query — "good chartered accountant in
Hammersmith for a small consultancy", "family dentist near
Highgate that takes new NHS patients", "wills and probate
solicitor central Bristol" — is processed differently from a
user typing the same query into Google.

Three differences matter.

First, the assistant is more aggressive about parsing the
intent of the query. A query that uses approximate location
terms ("near", "central", "around"), or that mentions the
user's other constraints obliquely, is more likely to be
correctly resolved by an assistant than by a classical
search engine, which tends to default to a literal-keyword
match.

Second, the assistant is more selective about which sources
it cites. A classical Google query returns a list; the
assistant returns one to three recommendations. The
candidate set is smaller, and the cost of being outside it
is correspondingly higher.

Third, the assistant draws from a wider source pool than the
classical local-search index. Google Business Profile data
still matters, but the assistant is also pulling from
LinkedIn, Companies House, professional body listings, the
firm's own website, third-party review aggregators, local
press coverage and (where applicable) Wikipedia. A firm that
has invested heavily in Google Business Profile alone and
neglected the broader sources is, in this layer of the
market, materially worse off than the same investment would
have made them five years ago.

## Where the conventional toolkit still works

Most of the conventional local SEO discipline transfers
across cleanly.

**Google Business Profile remains foundational.** The
assistants pull from it directly. A complete profile, with
current hours, accurate categories, recent photos and a
substantive description, is still a baseline expectation.

**NAP consistency still matters.** Name, address and phone
number must be consistent across the firm's website, its
Google Business Profile, its Companies House listing, its
LinkedIn page, professional body directories, and the local
citation sources. Inconsistency is a corroboration failure
in the framework of [the six
signals](/services/insights/six-signals-ai-assistants-evaluate/).

**`LocalBusiness` schema is still the right markup type** for
firms with a single physical premises serving local
clients. The markup should include the full structured
address, hours, accepted payment types where relevant, and
service area declarations.

**Local citations on recognised directories** (Yell, FreeIndex,
Cylex in the UK; equivalents in other jurisdictions) still
function as corroboration sources, although the relative
weight of any individual directory is lower than it was a
decade ago.

**Reviews on the recognised platforms** (Google Reviews,
Trustpilot, sector-specific platforms like Doctify or Vouched
For) feed the model's selection. Volume matters, but
specificity matters more — a small number of detailed,
substantive reviews is, in our work, materially more useful
than a large number of one-line ratings.

## Where the conventional toolkit is now incomplete

Three categories of work were not, ten years ago, part of the
local SEO discipline but are now necessary.

**Substantive content that demonstrates the firm's actual
practice.** A solicitor whose website lists "wills and
probate" as a service line but has no underlying material on
the specifics of probate in their jurisdiction is materially
less likely to be recommended than a solicitor whose website
has 2,000 words on the practicalities. The model is, in
effect, asking the firm to demonstrate competence rather than
declare it. The implications are substantial; a firm that
treated its website as a digital business card now needs to
treat it as a publishing platform.

**A `llms.txt` that explicitly covers the firm's local
positioning.** The conventional `llms.txt` summary should
mention the firm's primary location, the area served, and the
specifics of its local practice. (See: [Understanding
llms.txt](/services/insights/understanding-llms-txt/).)

**Principal-level visibility.** The assistant's selection,
particularly in professional services, draws on the
principal's individual presence — LinkedIn, professional body
profiles, any publications, any teaching, any expert-witness
or commentary work. A firm whose principal has a strong
individual presence outperforms a firm of equivalent size
whose principal is invisible.

## A note on multi-location firms

For firms operating from multiple locations, the structural
question is whether each location is a distinct
`LocalBusiness` entity (with its own URL, its own
structured data, its own Google Business Profile) or
whether the firm is operated as a single entity with
multiple physical addresses. The right answer depends on the
firm's structure, but the wrong answer — a single page
listing all locations with no per-location URLs and no
per-location markup — is, in our work, a persistent source
of local-discoverability problems.

The recommended pattern: per-location pages, per-location
structured data, per-location Google Business Profile
linkage. The investment is higher, but the return is
proportionate.

## The practical workplan

For a firm whose business depends on local discoverability,
the recommended sequence is:

1. **Audit the conventional baseline.** Google Business
   Profile, NAP consistency, citations, `LocalBusiness`
   markup, reviews. The
   [audit
   framework](/services/insights/audit-framework-ai-search-readiness/)
   covers this, with the local-specific signals called out
   explicitly.
2. **Address the structural gaps.** Schema.org markup,
   `llms.txt`, FAQ markup, principal `Person` markup. The
   [Retrofit
   package](/services/) covers this work.
3. **Invest in content depth.** The firm's website should
   substantively demonstrate the practice. The
   [Authority
   package](/services/) covers the ongoing investment.
4. **Invest in principal-level visibility.** The principal's
   LinkedIn, professional body profile, any commentary or
   teaching work, any contributions to industry publications.
   This is outside the scope of any single website engagement;
   it is the firm's ongoing positioning work.

The order matters. A firm that invests in content depth
before addressing the structural gaps is, in practice,
publishing into a void that the model cannot read.

## Where this leaves the firm

The local-search market is still, in 2026, recognisable to
practitioners who worked in it in 2016. The conventions are
familiar; the tooling is mostly familiar; the underlying
question of who appears when a prospect asks for a local
recommendation is the same. The mechanism by which that
recommendation is generated has shifted, and the firm's
discoverability programme needs to shift with it. The shift
is, in our work, modest in cost relative to the cost of
being missed at the moment a prospect is researching.
