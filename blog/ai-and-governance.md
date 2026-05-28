---
layout: layouts/page.njk
permalink: /blog/ai-and-governance/
title: "AI and governance"
pageEyebrow: "Topic"
pageTitle: "AI and governance"
pageLede: "Pieces on the practicalities of deploying generative AI and agentic systems in regulated enterprises — governance, audit, evaluation, policy, and the standards quietly reshaping how AI integrates with the rest of the business."
description: "Curated writing by Tarun Bulchandani on AI in the enterprise — governance, audit, agentic systems, MCP, sovereign AI, regulated-industry policy."
---

This page collects the writing on AI in the enterprise. The pieces
read independently but build a coherent view: agentic systems can
be shipped responsibly in regulated environments if the
instrumentation discipline is right; the protocols are maturing
faster than the enterprise governance models around them; and the
political framing around AI sovereignty is usually less useful
than the underlying technical questions.

## Recent

### [How do you audit a decision an agent made? A working framework](/blog/auditing-agent-decisions/)

A concrete, code-level framework for making agentic systems
auditable in regulated environments. The four layers (request,
context, generation, action), the data structures, the failure
modes. This is the piece I would point any architecture leader
to when they ask "how do you actually do AI governance".

### [MCP is the most important enterprise standard nobody is implementing](/blog/mcp-enterprise-standard/)

The Model Context Protocol is eighteen months old, supported by
every major model vendor, and the cleanest answer to the
integration sprawl agents are creating. Enterprise adoption is
poor. Why, and what to do about it.

### [Sovereign AI is mostly theatre. The actual technical question is data residency](/blog/sovereign-ai-theatre/)

A practical separation of the political framing from the technical
questions. Where does inference run, where does data live, whose
jurisdiction is the operating company subject to — and a decision
framework by workload sensitivity.

### [Cursor in a regulated industry: the actual policy you need](/blog/cursor-regulated-policy/)

Six policy areas (data residency, prompt logging, code-review
attribution, IP terms, secrets handling, third-party dependency
exposure), each with the question, the wrong answer, the right
answer, and the enforcement mechanism. Plus vendor-specific
configurations for Cursor, Claude Code, Copilot and Windsurf.

## Background

### [The intersection of enterprise architecture and AI: a guide to successful integration](/blog/linkedin-the-intersection-of-enterprise-architecture-and-ai-a-guide-t/)

The earlier framing piece, from 2023. The case for treating AI
adoption as an enterprise architecture concern rather than a
point-solution decision.

### [The magnitude of upside in AI: implications for organisations and humans](/blog/linkedin-the-magnitude-of-upside-in-ai-implications-for-organizations/)

A reflective piece on the scope of the technology shift.

### [Determinism in AI workflows: we've come a long way](/blog/linkedin-determinism-in-ai-workflows-in-february-2026/)

The practical question of how to build dependably on top of
inherently non-deterministic systems.

## Related

The two deep technical case studies on AI-native systems Tarun has
built are at [Meridian](/blog/case-study-meridian/) and
[CANVAS](/blog/case-study-canvas/). The full chronological index
is at [/blog/](/blog/).
