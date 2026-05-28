---
title: "How to audit your business website for AI discoverability"
slug: audit-website-ai-discoverability
date: 2026-10-15
excerpt: "A practical, step-by-step audit you can run on your own website in under an hour to find out how well it's set up to be cited by ChatGPT, Claude, and Perplexity. Plus the fixes for the most common issues."
source: own
---

## What this is

A self-serve audit of your business website for AI search
discoverability. Designed to be completed in under an hour by a
small business owner without a technical background. The output
is a clear picture of where your site stands and what to fix
first.

This is the same audit I run as the first step of any paid
engagement — distilled to its essentials and made self-serve. If
you do this audit and then decide you'd rather have the fixes
implemented for you, the [Audit tier](/services/) (£499) at the
end of the page is the formal version with prioritised
recommendations.

## Before you start

You'll need:

- Your business website URL
- A browser (any modern browser is fine)
- 45-60 minutes

The audit doesn't require any software you don't already have.
All the tools used are free and browser-based.

## Step 1: the AI search reality check (15 minutes)

The first thing to know is what AI assistants currently say about
your business, if anything.

Open ChatGPT (or Claude, or Perplexity — ideally all three) and
run five queries that a prospect would plausibly type when looking
for a business like yours. Be specific:

- "Find me a [your business type] in [your city] that specialises in [your specialism]"
- "What are the best [your service category] in [your area]?"
- "Recommend a [your business type] for [your target customer type]"
- "[Your specific service] near [landmark or area]"
- "Who provides [specific thing you do] in [your region]?"

For each query, note:

- Does the AI mention your business by name?
- Does it cite your website?
- What competitors does it mention?
- How specific and accurate is the information?

If your business doesn't appear in any of the five queries — and
the businesses that do appear aren't dramatically more
established than you — your site has a discoverability problem. If
your business appears in some but not all, the problem is more
targeted.

Either way, this baseline measurement is the starting point. Save
the AI responses; you'll want to compare against them in three
months.

## Step 2: check for structured data (10 minutes)

Open Google's Rich Results Test:
[search.google.com/test/rich-results](https://search.google.com/test/rich-results).

Paste your homepage URL. Run the test. Look at the results.

What you're checking:

- **What schema types are detected?** You should see at least `Organization` (or `LocalBusiness`) and ideally `WebSite`. If you see "No items detected", that's the worst case.
- **Are there errors?** Errors are typically flagged in red.
- **How deep are the property sets?** Click into each detected item. Are there a meaningful number of properties populated, or just two or three?

Now repeat the test for these specific pages on your site:

- Your About page
- Your main services page (or one of your service pages)
- One of your blog posts, if you have any
- Your contact page

What you're checking on each:

- Is there a `BreadcrumbList` schema? (should be on every non-home page)
- On the services page, is there `Service` schema?
- On blog posts, is there `BlogPosting` schema?
- On any page, is there `FAQPage` schema if there's a visible FAQ section?

**Common findings:** most small business sites have only the
auto-generated `Organization` or `WebSite` schema. Service-level
markup, FAQ markup, and Person markup are usually absent. This is
the most common gap.

**Fix priority:** high. Add `Organization`, `Service`, `Person`,
and `FAQPage` schema (where applicable). Validate. Deploy.

## Step 3: check for llms.txt (2 minutes)

In your browser address bar, type your domain followed by `/llms.txt`:

`https://yourbusiness.com/llms.txt`

What you're checking:

- Does it return a Markdown file with a summary of your business?
- Does it return a 404 (the most common case)?

If it 404s, this is one of the lowest-cost-highest-leverage fixes
available in 2026. Adding an `llms.txt` is straightforward and
provides a meaningful AI-discoverability signal. Covered in detail
in [What is llms.txt](/blog/what-is-llms-txt/).

**Fix priority:** high. Easy to do, growing payoff.

## Step 4: assess your homepage content (10 minutes)

Read your homepage carefully. Note:

- **The first 200 words.** Do they contain specific factual claims about who you are, what you do, where you're based, and who you serve? Or are they marketing language ("we're passionate", "world-class", "innovative")?
- **The headings.** Are they descriptive (h2 reading "Strategy consulting for mid-market law firms") or generic (h2 reading "What we do")?
- **The presence of an FAQ section.** Is there one? Does it have substantive question-answer pairs?
- **The presence of named entities.** Do you name specific clients, locations, partners, qualifications, certifications?
- **The contact information.** Is it visible, specific, and direct?

**Common findings:** most small business homepages are marketing
copy. The fix is unglamorous but high-impact: rewrite for factual
density.

**Fix priority:** high, but more time-consuming than the technical
fixes. Plan a day for this work.

## Step 5: assess your About page (10 minutes)

The About page is disproportionately important. Run through the
following:

- **Length.** Is the page substantive (500+ words) or thin (a few paragraphs)?
- **Specifics.** Does it name the founder, the team, the founding year, the location?
- **Credentials.** Are qualifications, certifications, or relevant prior experience explicitly listed?
- **Clients or industries.** Is there a named-clients section or sector list (where contractually possible)?
- **Tone.** Does it read like a reference document or a mood piece?
- **Schema.** When you re-ran the Rich Results Test on this page, was there `Organization` or `Person` schema?

**Common findings:** About pages are usually mood pieces. The fix
is to rewrite as a reference. Covered in
[Six things ChatGPT and Claude check when finding your business](/blog/six-things-chatgpt-claude-check/).

**Fix priority:** high. The About page is consulted heavily by AI
assistants.

## Step 6: check the technical basics (5 minutes)

A few quick checks:

- **Sitemap.** Visit `https://yourbusiness.com/sitemap.xml`. Does it return a list of URLs? Or 404?
- **Robots.txt.** Visit `https://yourbusiness.com/robots.txt`. Does it explicitly allow major AI crawlers (GPTBot, ClaudeBot, PerplexityBot)? Or does it block them inadvertently?
- **Page speed.** Use [PageSpeed Insights](https://pagespeed.web.dev/). Score below 70 on mobile is a meaningful problem.
- **Mobile responsiveness.** Open your site on a phone. Does it work?
- **HTTPS.** Is your site served over HTTPS? Should be in 2026.

**Common findings:** sitemap usually exists if the site is on a
modern platform. Robots.txt is often misconfigured. Page speed
varies wildly. HTTPS is generally fine.

**Fix priority:** varies. Sitemap and HTTPS are usually quick.
Page speed can be a longer project.

## Step 7: check your content depth (5 minutes)

How many substantive pages does your site have?

- Pages of more than 800 words: how many?
- Pages with a publication date in the last 12 months: how many?
- Pages cross-linking to other pages on your site: how many?

**Common findings:** most small business sites are 5-8 pages total
with little content depth. AI assistants struggle to demonstrate
topical authority signals on these sites because the depth simply
isn't there.

**Fix priority:** medium. This is ongoing work, not a one-time fix.

## Step 8: compare to competitors (5 minutes)

Pick three of your competitors. Run them through the same Rich
Results Test. Check for `llms.txt` on each. Compare to your own
findings.

Where you're behind your competitors, you have a near-term
priority. Where you're ahead, you have a competitive moat to
maintain.

If all your competitors are at a similar baseline (no schema, no
`llms.txt`, no FAQ markup), the opportunity is asymmetric: small
investment in your own site delivers a meaningful competitive
lead.

## Putting it together

After the audit you'll have a clearer picture. The honest categorisation:

**Strong (above the curve):**
- Multiple schema types detected, with depth
- `llms.txt` present and current
- FAQ schema implemented
- Specific factual homepage
- Substantive About page
- Sitemap, robots.txt, HTTPS in order
- Content depth across multiple substantive pages

**Workable (typical):**
- Some auto-generated schema
- No `llms.txt`
- Marketing-style homepage
- Mood-piece About page
- Technical basics mostly fine
- Limited content depth

**Weak (below the curve):**
- No schema detected
- No `llms.txt`
- Heavy JavaScript rendering
- Generic homepage and About page
- Sitemap or robots.txt issues
- Less than five pages of content

If you scored "strong" across most categories, you're well-placed.
Maintain the discipline.

If you scored "workable", you have 4-6 weeks of focused work to
move into "strong". The work is straightforward but requires either
your time or someone else's.

If you scored "weak", the right move is probably a rebuild rather
than a retrofit. The cost of building forward from where you are
is approaching the cost of starting fresh, and a clean build
preserves your operational simplicity going forward.

## The next step

If you want me to do this audit professionally and give you a
written report with prioritised fixes, the Audit tier is £499. It
includes the full audit, a written report covering each of the
signals checked above, the prioritised fix list, and a 30-minute
call to walk through findings.

If you want the fixes implemented after the audit, the Upgrade
tier (£2,495) covers most retrofits. The Build tier (£4,995) is a
ground-up rebuild.

Reach out via [LinkedIn](https://www.linkedin.com/in/tarunbulchandani/)
or the [contact form](/#contact).

## Related

- [How to make your business website show up in ChatGPT](/blog/website-show-up-in-chatgpt/)
- [Six things ChatGPT and Claude check when finding your business](/blog/six-things-chatgpt-claude-check/)
- [Schema.org for small business websites](/blog/schema-org-small-business/)
- [What is llms.txt](/blog/what-is-llms-txt/)
- [Why your Squarespace/Wix/Webflow site is invisible to AI](/blog/squarespace-wix-webflow-ai-search/)
