---
title: "You can build it with AI. You can fix it with AI too. Here is the proof."
slug: linkedin-you-can-build-it-with-ai-you-can-fix-it-with-ai-too-here-is-
date: 2026-03-29
excerpt: "story time.."
source: linkedin
external: "https://www.linkedin.com/pulse/you-can-build-ai-fix-too-here-proof-tarun-bulchandani-3qoue"
image: "https://media.licdn.com/dms/image/v2/D4E12AQFeUugIoJUI7A/article-cover_image-shrink_720_1280/B4EZ06XKULGwAI-/0/1774800647839?e=2147483647&v=beta&t=dozgowNoo2wWJCPJf5AsPPV3X7ArZP90cnLXbxlZs8c"
has_body: true
---
story time...

I had a website that needed rebuilding. A compliance consultancy, niche audience, no dev budget to speak of.

So I built it with AI.

Claude Code, running in my terminal. Five pages, custom CSS, vanilla JavaScript, GitHub Pages, Google Analytics with proper consent gating. No framework, no build tool.

Two sessions. About six hours total across two days.

The build was fast. What followed was more instructive.

## 23 bugs.

Not all critical. Not all obvious. Some were visual. Some were compliance gaps. One required writing a Python script to process an image. Each one had a root cause worth understanding, not just a fix worth applying.

The standard story about AI coding tools is speed of creation. That story is true. But it is only half of it. The part that scares everyone is what happens after you ship. Let's dive into some bug fixes to understand what happened and how I fixed them and then we talk about the experience... Get straight to the last bit if you want the TL;DR

## A few stories worth telling...

## The Safari menu that showed one word

The hamburger menu worked perfectly on desktop. On Safari on iPhone, clicking it showed exactly one link floating in the middle of the screen. The other four had vanished.

Root cause: the nav bar had backdrop-filter: blur(20px) for a frosted glass effect. Per the CSS specification, any element with backdrop-filter creates a new containing block for position: fixed descendants. The menu panel was position: fixed; top: var(--nav-height); bottom: 0 but those coordinates were now measured against the 72px nav wrapper, not the viewport.

top: 72px to bottom: 0 of a 72px parent equals zero height. The panel existed in the DOM and rendered nothing. Only the first link had enough intrinsic line height to barely escape.

Fix:

.nav-wrap.nav-open { height: 100dvh; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } .nav-wrap.nav-open .nav-links { position: absolute; top: var(--nav-height); bottom: 0; } 

Switch from position: fixed to position: absolute. Absolute children are not subject to the backdrop-filter containing block rule. Clear the filter when the menu is open so the white overlay replaces it. Three declarations, one spec reference.

This is documented behaviour. It is completely invisible to anyone testing only on Chrome.

## One button breaking the layout of every page

A horizontal scrollbar appeared on mobile. Every card on every page was clipped on the right edge. The hero paragraph was cut off mid word: "formulators ge...", "your Onl...".

The cause was a chain of four CSS behaviours interacting:

.btn has white-space: nowrap. A certain text field has a minimum content width of around 380px. That button sat inside .hero-content, which is a grid item inside .hero-inner. CSS Grid's default min-width: auto on grid items means a 1fr track cannot shrink below its items' minimum content size. The track resolved to roughly 380px on a 375px iPhone. That inflated .container. That inflated <body>. That inflated the scroll width. Every section on every page inherited the overflow.

The visual symptom was cards and text being cut off. The actual cause was a single button in a completely different section of the page, two levels up in the layout hierarchy.

Fix:

html { overflow-x: clip; } .hero-inner > \* { min-width: 0; } .hero-ctas .btn { width: 100%; justify-content: center; } 

overflow-x: clip rather than overflow-x: hidden is deliberate. hidden establishes a new block formatting context and breaks position: sticky elements further down the page. clip does not. min-width: 0 on grid children is the standard defensive pattern that allows items to shrink below their content size. Making the buttons width: 100% means they expand to fill the available container rather than force the container wider.

## Analytics running without consent

GA4 was implemented the standard way: a <script async src="gtag/js"> tag in <head>, firing on every page load before any user interaction.

Under UK GDPR, analytics cookies require explicit prior consent. The ICO guidance is specific on this. The site had a cookie banner that looked compliant. It was not. The script had already executed by the time the banner rendered.

Fix: remove the script tag from <head> entirely. Write a loadGA4() function that injects it dynamically and only on consent:

function loadGA4() { if (window.\_ga4Loaded) return; window.\_ga4Loaded = true; const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX'; document.head.appendChild(s); window.gtag = function() { window.dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-XXXXXXXX'); } 

Two buttons on the banner: "Accept analytics" calls loadGA4() and writes rc-cookies-analytics to localStorage. "Essential only" writes rc-cookies-essential and exits. On return visits the stored key is read before the banner renders. Previous visitors who accepted under the old single-button banner are handled via a legacy key check so they are not re-prompted.

This would not have appeared in any visual browser test. It was a compliance gap, and for a consultancy that exists to help clients with regulatory compliance, getting it wrong would have been a problem.

## The full list

These three are a sample. Across the project we found and fixed 23 bugs in total:

1.  Nav bar rendering in the middle of the page due to a CSS positioning conflict
2.  Git push rejected because the remote had conflicting files from an older template
3.  Cookie learn more link doing nothing because element IDs in HTML and JavaScript did not match
4.  Service cards titled Service 1 through Service 6 from placeholder text that was never updated
5.  Mobile hamburger button not appearing because a media query was hiding its parent container
6.  A single banner with rounded corners when everything else on the page was rectangular
7.  A single banner using a different colour gradient to the rest of the page
8.  Hero headline invisible after switching to a light background due to a CSS specificity conflict
9.  Inner page heroes CSS inconsistent after the home page was updated to the new light style
10.  Call to action sections still inconsistent after the same update
11.  About page still containing old template content that had to be fixed
12.  Another section still inconsistent while everything else had been converted to light
13.  Orphan analytics config scripts left in page headers after a partial cleanup script ran
14.  Logo appearing with a solid near white background instead of transparent, despite being in a format that supports transparency
15.  Python image processing failing because the operating system blocked direct package installation
16.  A second package missing from the processing environment requiring a separate install
17.  Logo appearing distorted in the nav because the original canvas was not square
18.  Two conflicting CSS definitions for the same button style, with the wrong one winning
19.  Analytics firing before consent, the compliance gap described above
20.  Safari mobile menu collapsing to zero height due to the backdrop filter containing block issue
21.  Mobile menu links appearing as narrow centred pills instead of full width rows due to an alignment property persisting from the desktop layout
22.  Page cards overflowing the right edge of the screen because the hero flex container had no explicit width
23.  A single button forcing the entire page body wider than the viewport through a chain of CSS grid minimum width behaviour

## What the numbers actually show

23 bugs across six hours of work. Some were in the generated code. Some were in decisions I made. Most were interactions between the two.

The pattern across all of them: the AI did not just produce a fix. It produced an explanation of the mechanism. Why the backdrop filter rule exists in the CSS spec and why it only shows up in Safari. Why two different overflow properties behave differently in scroll contexts. Why grid tracks have a minimum width default and what that means when a button has long text.

That explanation is what makes the fix reusable. A patch you apply without understanding is a patch you will need to apply again.

The "built it in a weekend" version of this story is accurate. The build phase is fast. But most projects do not stall in the build phase. They stall after launch, when something breaks on a device you did not test, or a regulation you did not know applied turns out to matter.

and that is what I want to share here... that phase works too! Six hours, two sessions, 23 bugs found and resolved with documented root causes for each one.

That is the part of the story worth telling.
