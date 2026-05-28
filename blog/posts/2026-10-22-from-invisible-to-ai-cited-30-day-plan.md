---
title: "From invisible to AI-cited: a 30-day plan for small business websites"
slug: from-invisible-to-ai-cited-30-day-plan
date: 2026-10-22
excerpt: "A specific, week-by-week plan to take a small business website from not appearing in AI search results to being routinely cited by ChatGPT, Claude, and Perplexity. Designed for owners who want to do the work themselves, with clear hand-off points if they prefer to delegate."
source: own
---

## The proposition

In thirty days of focused work, the typical small business
website can move from "not cited in AI search at all" to "cited
consistently for relevant queries". The work is concrete, the
sequence matters, and the maintenance afterwards is modest.

This piece is the day-by-day plan. It's calibrated for a small
business owner with a typical 5-10 page website who can dedicate
half a day per week to this work, or who is briefing someone else
to do it. The total effort is approximately 15-20 hours over four
weeks.

The plan is structured so that each week delivers a meaningful
improvement on its own. If you complete only week 1, you're
materially better off. If you complete all four, you're in the
top 10% of small business sites on AI search discoverability.

## Week 1: foundations and quick wins

The goal of week 1 is to get the technical baseline in place and
to capture the easy wins. Approximately four hours of work.

**Day 1: baseline measurement.** Run five test queries through
ChatGPT, Claude, and Perplexity to see what currently shows up.
Document the results. This is your before-and-after marker. Time: 30 minutes.

**Day 2: structured-data audit.** Open Google's Rich Results Test
([search.google.com/test/rich-results](https://search.google.com/test/rich-results)). 
Run your homepage, About page, services page, and one blog post
through it. Note what schema is present and what's missing. Time: 45 minutes.

**Day 3: add llms.txt.** Write an `llms.txt` for your business
using the template in [the llms.txt piece](/blog/what-is-llms-txt/).
Deploy it to your domain root. Verify it loads at
`yourbusiness.com/llms.txt`. Time: 1 hour.

**Day 4: robots.txt and sitemap check.** Ensure your `robots.txt`
explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
and that your sitemap is current. Most platforms auto-generate the
sitemap; check yours is at `/sitemap.xml`. Time: 30 minutes.

**Day 5: organisation schema.** Add full `Organization` (or
`LocalBusiness`) schema to your homepage. If your platform requires
custom code injection, use that. Validate with Rich Results Test.
Time: 1.5 hours.

By end of week 1: you have an `llms.txt`, your robots.txt is
correct, your sitemap is current, and your homepage has proper
`Organization` schema. This alone moves you ahead of most small
business sites.

## Week 2: structured content

The goal of week 2 is to add the structured content that AI
assistants actually pull from. Approximately five hours of work.

**Day 6: write the homepage FAQ.** Identify the five to seven
questions prospects most often ask you. Write specific, factual
answers in 2-4 sentences each. Add the FAQ section to your
homepage. Time: 2 hours.

**Day 7: add FAQ schema.** Add `FAQPage` schema markup matching
the visible FAQ content. Validate. Detailed walkthrough in
[FAQ schema for small businesses](/blog/faq-schema-small-business/). 
Time: 45 minutes.

**Day 8: write the About page FAQ.** Three or four questions
specific to your business's history, team, and approach. Add to
the About page with schema. Time: 1.25 hours.

**Day 9: services pages — schema.** Each of your major service
pages should have `Service` schema with full properties
(description, provider, areaServed, audience, serviceType). Add it
to each. Time: 1 hour per service page.

**Day 10: Person schema.** Add `Person` schema for each named
team member on your About or Team page. Cross-link with the
`Organization` schema's `@id`. Time: 30 minutes.

By end of week 2: you have FAQ schema on three pages, Service
schema on your services, Person schema on team members, and the
schema graph is cross-linked. This is materially above the typical
small business standard.

## Week 3: content depth and authority

The goal of week 3 is to address the depth side — making sure
there's substantive content for AI assistants to reward you for.
Approximately six hours of work.

**Day 11: rewrite the homepage.** Re-read the homepage with the
factual-density lens. Identify every place where marketing
language can be replaced with specifics. Rewrite. Aim for the
first 200 words to be entirely substantive. Time: 2 hours.

**Day 12: rewrite the About page.** The same exercise, applied to
the About page. Aim for the page to read as a reference rather
than a mood piece. Specific years, named people, concrete
achievements, clear positioning. Time: 2 hours.

**Day 13: services pages — content rewrite.** Each service page
should answer specifically: what is included, who is it for, what's
the deliverable, what's the typical timeline, what's the price
range. Add an FAQ section to each services page. Time: 2 hours.

**Day 14-15: write a substantive new piece of content.** Choose
a topic that's central to your specialism. Write 1,200-1,800
words of substantive content, with proper headings, a few
external citations, and clear cross-linking to your services
pages. This is the seed for ongoing content marketing. Time:
3-4 hours.

By end of week 3: the homepage and About page are reference
documents, the services pages have factual depth and FAQs, and
you have one new substantive piece of content. The topical
authority signals are now visible to AI assistants.

## Week 4: topic clustering and validation

The goal of week 4 is to wire everything together and verify
it's working. Approximately four hours of work.

**Day 16: topic-cluster planning.** Sketch out the topic-cluster
structure for your site. Each major service is a pillar; supporting
content links to it. Plan the next three to five pieces of content
you'd write to build the cluster. Time: 1 hour.

**Day 17: internal linking pass.** Go through every page on your
site and add internal links where they make sense. Service pages
should link to relevant blog content. Blog content should link to
relevant service pages. The About page should link to team-member
pages. Time: 1.5 hours.

**Day 18: re-validate.** Run every page through Google's Rich
Results Test again. Fix any errors that emerge. Verify the
schema is properly cross-linked (provider references match,
authors match). Time: 45 minutes.

**Day 19: re-measure AI search.** Re-run the five queries from
day 1. Compare results. Note which ones now surface your business
and which ones don't yet. The full effect of the work takes 2-6
weeks to be visible in AI search; not all results will have
changed immediately. Time: 30 minutes.

**Day 20: maintenance schedule.** Set up a recurring calendar
reminder for monthly maintenance: re-run the AI queries, check
schema validation, identify one piece of content to publish.
Time: 15 minutes.

By end of week 4: the site is well-structured, the schema is
comprehensive, the content has factual density, and a maintenance
discipline is in place. You're now in the top 10% of small business
websites on AI search discoverability.

## After the 30 days

The work continues. The ongoing rhythm:

**Monthly:**
- Re-run the five test queries through AI assistants
- Note what's changing
- Publish one substantive new piece of content
- Cross-link the new content into the existing structure

**Quarterly:**
- Re-validate all schema with Rich Results Test
- Review the `llms.txt` and update if anything's changed
- Refresh the FAQ content if your prospect questions have evolved

**Annually:**
- Full content audit
- Refresh the About page
- Review pricing and positioning on services pages

The maintenance is approximately 3-5 hours per month at steady
state. The compounding return is meaningful — by month six, the
site is materially harder to dislodge from AI search results than
sites built without this discipline.

## Where this typically goes wrong

A few patterns I see in self-directed 30-day plans of this kind:

**The schema work gets skipped.** It feels intimidating relative
to the content work. The schema is actually the highest-leverage
part. Don't skip it. The Rich Results Test makes validation
straightforward.

**Content rewriting gets rushed.** The temptation is to "lightly
edit" rather than to genuinely rewrite for factual density. Allow
the time. The factual rewrite is what separates "okay site" from
"AI-cited site".

**Topic clustering gets ignored.** It's easy to write one new piece
of content and forget the internal linking work. The cross-linking
is what builds the topical-authority signal.

**Maintenance doesn't happen.** The 30 days produce a baseline.
Without monthly maintenance, the baseline degrades over time as
content goes stale and schema drifts out of sync with content.

## When to hand off

The plan above is doable by a determined small business owner. It
is not always doable well. The judgement call is whether the time
required is better spent here or elsewhere in your business.

A rough heuristic: if your time is worth more than £100/hour and
the 30-day plan would take you 25 hours including the inefficiency
of learning as you go, the implementation cost is around £2,500
of your time. The professional [Upgrade tier](/services/) is £2,495.
The maths favours handing off.

The other consideration is quality. The first time someone implements
schema is the most error-prone. The hundredth time is consistent.
For a small business that's been struggling with discoverability
for years, paying for a clean implementation by someone who has
done it many times produces a better result than the DIY route.

## The professional version

If you want this 30-day plan delivered for you, the
[Upgrade tier](/services/) at £2,495 covers it: full audit, schema
implementation, llms.txt deployment, content rewriting, FAQ
implementation, topic clustering, and a maintenance plan. Typical
turnaround is two weeks for the implementation, with the longer
content rewriting on a slightly extended timeline if needed.

If you want a ground-up rebuild with all of this baked in from day
one, the [Build tier](/services/) at £4,995 is the right level.

Reach out via [LinkedIn](https://www.linkedin.com/in/tarunbulchandani/)
or the [contact form](/#contact).

## Related

- [How to audit your business website for AI discoverability](/blog/audit-website-ai-discoverability/)
- [How to make your business website show up in ChatGPT](/blog/website-show-up-in-chatgpt/)
- [Schema.org for small business websites](/blog/schema-org-small-business/)
- [FAQ schema for small businesses](/blog/faq-schema-small-business/)
- [What is llms.txt](/blog/what-is-llms-txt/)
- [The 2026 state of AI search for small business owners](/blog/state-ai-search-small-business-2026/)
