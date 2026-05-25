---
title: "Cursor in a regulated industry: the actual policy you need"
slug: cursor-regulated-policy
date: 2026-05-28
excerpt: "Most regulated companies have either banned AI coding tools entirely or quietly rubber-stamped them. Neither is right. Here is the policy I would write today, with the specific clauses, the vendor-specific configurations, and the audit trail it requires."
source: own
---

## TL;DR

There are now four serious AI coding tools in widespread enterprise
use: Cursor, Claude Code, GitHub Copilot, and Windsurf. Every
regulated company I have talked to is in one of two states with
respect to them. Either they have officially banned them (developers
use them anyway, on personal devices, with company code) or they
have rubber-stamped them under an "AI policy" written by someone
who has not actually used the tools. Both are worse than doing
nothing, because both produce the illusion of governance without
the substance.

This piece is the policy I would actually write today for a
regulated enterprise — a financial services firm, a healthcare
provider, a utility, a defence contractor. Six policy areas, each
one specific enough to enforce: data residency, prompt and code
logging, code-review attribution, intellectual property, secrets
handling, and third-party dependency exposure. For each area, the
question, the wrong answer, the right answer, and the enforcement
mechanism. Plus vendor-specific configurations for the four major
products and a note on what architecture owns versus what security
owns.

If you are about to publish your company's "AI coding policy" this
quarter, read this first.

## Why "ban it" and "approve it" both fail

The ban fails because developers use the tools anyway. They use them
on personal laptops, on personal accounts, with snippets of company
code pasted across. The code that gets pasted out is often the code
that is most in need of help — the stuck-debugging code, the
authentication module that has gone sideways, the SQL query the team
cannot get to perform. Exactly the wrong code to leak. The ban gives
the company plausible deniability while leaving every actual security
concern in place.

The rubber-stamp fails because it produces a policy that nobody can
actually comply with, because the people writing it have not used
the tools. The policy will say things like "developers must not paste
sensitive code into AI tools" — which is technically true and
operationally meaningless, because the whole point of the tool is to
read your code. It will say "AI-generated code must be reviewed for
quality" — true of all code; how does AI change the review standard?
It will say "do not use AI tools for production code" — fine, but
then what is the boundary between non-production and production in
a continuous-delivery shop where every commit might end up in
production within hours?

The result, in both cases, is that the actual governance question
goes unanswered. The actual governance question is: **what is the
specific set of conditions under which an AI coding tool can read,
write, or influence company code, in a way that is auditable, that
respects regulatory and contractual obligations, and that does not
require asking individual developers to make impossible judgment
calls?**

That is what a policy needs to answer. Here are the six clauses.

## Clause 1: data residency

**The question.** Where does the model that is reading or writing
my code physically run? Where does the data my code touches get
sent during inference? Whose jurisdiction has access to it under
what legal process?

**The wrong answer.** "The AI vendor says they are GDPR-compliant."
This is necessary but nowhere near sufficient. GDPR-compliance is
about handling personal data correctly. It does not say anything
about where the data is processed, which is the part that matters
under FCA outsourcing rules, under the EU AI Act's high-risk
provisions, under DORA's third-party risk requirements, and under
sector-specific rules for healthcare, defence, and critical
infrastructure.

**The right answer.** A specific residency requirement, stated as a
hard constraint. For an EU-headquartered company in financial
services, that looks like: "model inference must occur in an EU
member state. The model provider must be able to provide written
attestation of the inference region for any given request, on
demand. If the inference is routed through a cloud hyperscaler,
the cloud region must be EU. If the underlying inference cannot
be confirmed to occur within the EU, the tool is not approved for
use against company code."

For a US-headquartered company in healthcare with HIPAA exposure,
the constraint is different but the structure is the same: a hard
region constraint with an attestation requirement.

**The enforcement mechanism.** Procurement contracts include the
specific region clause. The architecture function reviews the
vendor's inference architecture annually. The security team has a
quarterly check that the configuration in use matches the contract.

**Practical complication.** Some of the tools (specifically Claude
Code and Copilot Enterprise) can route through a customer-owned
cloud endpoint — Amazon Bedrock, Azure OpenAI, Google Vertex AI.
This is the enterprise-grade answer. The tool runs against an
inference endpoint inside your own cloud account, in a region you
control, with logging you own. If the tool supports this and you
are in a regulated industry, this is the configuration to use. Do
not use the vendor's default consumer endpoint.

## Clause 2: prompt and code logging

**The question.** What record exists, after the fact, of what was
sent to the AI tool and what was returned? Where is that record
stored? Who can access it?

**The wrong answer.** Either "we don't log it, to protect developer
privacy" or "the vendor logs it for 30 days, we trust them".
Neither survives a serious audit. The first produces no evidence
at all. The second produces evidence that lives outside your
control, with a retention schedule the vendor sets, in a system
you cannot query.

**The right answer.** Customer-owned logging of every AI tool
interaction, stored in the company's own SIEM or equivalent log
infrastructure, with retention matching the company's broader log
retention policy (typically two to seven years in regulated
industries). The log captures: the prompt, the response, the model
identifier, the timestamp, the user identity, the project context,
the IDE session ID. Same audit-grade discipline as for any other
sensitive system.

**The enforcement mechanism.** Tool configuration that routes
logging to the company's infrastructure, not the vendor's.
Periodic audit that the configuration is in place. Sample queries
against the log to confirm prompts are actually being captured.
Disconnect from the tool any developer whose IDE session is not
logging properly.

**Practical complication.** Not all tools support customer-owned
logging at the granularity you need. Cursor's enterprise tier
supports prompt-level logging to a customer-owned destination.
Claude Code can be configured to log through the Anthropic API
with customer-managed logging if you proxy through your own
infrastructure. Copilot Enterprise supports audit log export.
Windsurf is more limited. The tool selection question and the
logging question are linked: pick a tool that supports the
logging discipline your audit requires.

This is essentially the same instrumentation discipline I described
in [how to audit a decision an agent made](/blog/auditing-agent-decisions/),
applied to a developer-facing tool.

## Clause 3: code-review attribution

**The question.** When AI generates or substantially modifies a
piece of code that lands in your repository, who is recorded as
the author, and how is that disclosed in code review?

**The wrong answer.** Either "treat AI-generated code as if a
human wrote it" or "require a separate label on every line of
AI-touched code".

The first is the path most teams default to. It produces
unaccountable code. A bug six months later cannot be traced back to
the prompt that produced it. A regulator asking "who wrote this"
gets a developer name and no record of the AI involvement.

The second is technically pure and practically unworkable. Modern
AI coding tools produce code in a continuous loop with the
developer. Pretending you can label every AI-influenced character
is silly. The label becomes either pervasive (every file is labelled
AI-touched, which conveys no information) or selective (the
developer decides what to label, which is exactly the judgment call
the policy was meant to remove).

**The right answer.** Two separate records, kept distinct.

First, a **commit-level co-author attribution**: every commit that
incorporates significant AI assistance is marked with a `Co-Authored-By`
trailer naming the AI tool and model version. This is the lightweight,
git-native disclosure. It does not claim to label every line; it
claims to label the commit as one where AI was substantially
involved. The threshold for "substantial" is a team norm, not a
policy clause — typically, "more than a single autocomplete suggestion".

Second, an **out-of-band session log**: the prompt-and-response log
from Clause 2 captures the full record. The git commit links back
to the relevant session via a session ID in the commit message. The
git history shows what was committed; the session log shows how it
got there.

**The enforcement mechanism.** Pre-commit hook that prompts the
developer if AI assistance was used and adds the `Co-Authored-By`
trailer if so. CI check that any commit marked as AI-assisted has
a corresponding session ID. Code review checklist item: "is the
session log linked, if AI was used".

**Practical complication.** Developers will not voluntarily mark
every AI-assisted commit. The pre-commit hook can default-on if
the IDE indicates AI activity. Cursor, Claude Code, and Copilot
all expose enough telemetry to the local environment that this is
detectable. Pure mandatory self-disclosure does not work; auto-detection
with a manual override does.

## Clause 4: intellectual property

**The question.** Who owns the code that an AI tool produces? Under
what licence? With what indemnity if the output reproduces something
covered by a third-party copyright?

**The wrong answer.** "We accept the AI vendor's standard terms."
The standard terms vary widely between vendors and most of them
shift more risk to the customer than a careful read would suggest.
Some vendors offer indemnity for output reproducing copyrighted
training material; some don't. Some retain the right to train on
your code; some don't. Some grant a perpetual licence to all code
produced through their tool; some don't.

**The right answer.** A negotiated enterprise contract that explicitly
covers four things:

1. **IP ownership of outputs.** Customer owns all code produced
   through the tool against customer code. No exceptions.
2. **No training on customer code.** Vendor agrees not to use
   customer code (prompts or outputs) to train future models.
3. **Indemnity for output infringement.** If the tool's output
   reproduces copyrighted material that the customer subsequently
   ships and faces a claim on, the vendor indemnifies. Most major
   vendors now offer this (Copilot, Cursor, Claude Code, all have
   some form of it on enterprise tiers). Read the actual cap; the
   indemnity is often dollar-limited.
4. **Data-handling terms that match the company's standard data
   processing agreement.** If the vendor cannot meet the company's
   standard DPA, that is itself a signal.

**The enforcement mechanism.** Legal review of the contract before
deployment. Annual recertification. If the vendor terms change
materially, re-review.

**Practical complication.** Developers using personal accounts
against company code is the IP-leakage attack vector that the
policy needs to close. Even with the right contract for enterprise
licences, an individual developer using a free tier with company
code is operating outside the negotiated terms. Tool access has to
be SSO-enforced and personal accounts have to be blocked at the
network layer or the device-management layer.

## Clause 5: secrets handling

**The question.** What stops a developer from accidentally pasting
a production API key, a database password, or a customer record
into an AI tool?

**The wrong answer.** "We tell developers not to do this." The
training-and-awareness approach has a well-documented track record
of not working. Developers paste secrets into Stack Overflow. They
paste secrets into bug-tracker tickets. They paste secrets into AI
tools.

**The right answer.** A pre-flight scrubbing layer that intercepts
prompts before they leave the developer's machine. Specifically:

- A local-machine prompt-scanning hook integrated with the IDE.
  Scans for high-entropy strings, known credential formats (AWS
  keys, Azure connection strings, JWT tokens, OpenAI keys, etc.),
  PII patterns (NHS numbers, NI numbers, credit card numbers).
- If a secret is detected, the prompt is blocked from being sent.
  The developer sees a warning explaining what was caught.
- The blocked event is logged. The same audit framework as for
  successful prompts.

This is not a perfect defence — context-dependent secrets (an
internal hostname, a customer's company name) are not scannable —
but it eliminates the catastrophic-and-common case of an actual API
key going to a vendor.

**The enforcement mechanism.** Mandatory installation of the
scrubbing hook on every developer machine running an approved AI
tool. Periodic check that it is running. Alerts on bypass attempts.

**Practical complication.** The scrubbing layer adds latency to
every prompt. Developers will work around it if the latency is bad.
Tune for sub-100ms scrubbing time. Most current scanners can hit
this if the regex library is reasonable.

## Clause 6: third-party dependency exposure

**The question.** When the AI tool suggests using a third-party
library, what stops it from suggesting a malicious or vulnerable
one?

**The wrong answer.** "The developer will check." Developers do not
check. Developers check less when the suggestion looks confident.
A library suggestion that comes wrapped in a fluent explanation of
why it is the right choice gets less scrutiny than a library
suggestion they found themselves.

**The right answer.** The same software supply chain controls that
should already exist, with the AI tool's suggestions explicitly in
scope:

- An allowlist or denylist of permitted package sources. The AI tool
  cannot suggest a library not on the allowlist; if it does, the
  suggestion is blocked at IDE level.
- A vulnerability scanner that runs on every dependency added,
  whether suggested by AI or by a human. CVE thresholds match the
  company's broader vulnerability policy.
- A typosquatting check: a library name that is very close to but
  not exactly a popular package name is flagged. This is the attack
  vector where AI tools have been most often documented producing
  vulnerable suggestions.
- A "hallucinated package" check: if the AI suggests a library that
  does not exist in the company's package registry mirror, the
  suggestion is blocked. Hallucinated packages have been an emerging
  vector for supply-chain attacks specifically because they pre-create
  the demand that an attacker can then satisfy with a malicious
  package of the same name.

**The enforcement mechanism.** The package allowlist is maintained
by the security team and consumed by the IDE plugin. The scanner is
part of the CI pipeline. The typosquatting check is in the IDE
plugin.

**Practical complication.** New legitimate libraries are added to
ecosystems daily. The allowlist needs an expedited approval path
or it will be ignored. Plan for that.

## Vendor-specific configurations

The six clauses above are tool-agnostic. The configurations to
implement them vary. A quick reference for the four major tools as
of mid-2026:

### Cursor

| Clause | Configuration |
|---|---|
| Residency | Cursor Business / Enterprise plans support routing inference to customer-owned LLM endpoints (Bedrock, Azure OpenAI, Vertex AI). Use that. The default consumer endpoint routes through the vendor's infrastructure with less control. |
| Logging | Enterprise tier supports logging to a customer-owned destination. The logs include the prompt, the response, the file context, and the user identity. Confirm during contract that this can be exported to your SIEM. |
| IP terms | Enterprise contract includes indemnity for output infringement and no-training-on-customer-data terms. Free tier does not. Block free tier at the SSO layer. |
| SSO | Cursor supports SCIM provisioning and SAML SSO on enterprise. Required. |

### Claude Code

| Clause | Configuration |
|---|---|
| Residency | Claude Code can run against the Anthropic API directly or through Amazon Bedrock or Google Vertex AI. The Bedrock and Vertex options give you the customer-owned inference region. Use those for regulated workloads. |
| Logging | Anthropic offers enterprise audit logging. Bedrock and Vertex give you CloudTrail-equivalent logging. Both are workable; the Bedrock/Vertex path is more aligned with existing enterprise log discipline. |
| IP terms | Anthropic enterprise contract offers output indemnity and no-training commitment. Read the indemnity cap; it is non-trivial but bounded. |
| SSO | Required on enterprise tier. |

### GitHub Copilot Enterprise

| Clause | Configuration |
|---|---|
| Residency | Microsoft routes Copilot inference through Azure OpenAI infrastructure. The customer can request a specific region. EU customers should specify an EU region in the contract. |
| Logging | Copilot Enterprise has audit log export. The grain is per-suggestion rather than per-prompt; the model context the suggestion was based on is captured. Sufficient for most audit purposes. |
| IP terms | Microsoft indemnity is the most generous in the market and the most extensively litigated. Read the carve-outs (notably for "duplicate detection turned off"). Leave duplicate detection on. |
| SSO | Enterprise tier requires GitHub Enterprise. Required. |

### Windsurf

| Clause | Configuration |
|---|---|
| Residency | Less mature in this area as of mid-2026. Limited customer-owned-endpoint options. For regulated workloads, treat as conditional approval at best. |
| Logging | Limited enterprise logging options. |
| IP terms | Newer to enterprise contracting; terms are less standardised. |
| SSO | Available on enterprise tier. |

The pattern: for serious regulated workloads, Cursor (with a
customer-owned LLM endpoint), Claude Code (via Bedrock or Vertex),
or Copilot Enterprise are the workable choices. Windsurf is fine
for non-regulated workloads but does not yet have the enterprise
controls the other three have.

## What architecture owns vs what security owns

A short note on the politics of this, because every regulated company
I have worked with has the same conversation about who owns the
policy.

**Security owns** the enforcement layer: the SSO configuration, the
network blocks on personal accounts, the prompt-scrubbing hooks, the
vulnerability scanners, the SIEM integration. They are the
operational owner of "is the policy actually being followed".

**Architecture owns** the policy itself: what the clauses are, what
tools are approved, what configurations are required, what trade-offs
are acceptable. They are the technical authority on "what should
the policy say".

**Legal and procurement own** the contract: the IP terms, the
indemnity, the data-handling clauses, the residency commitments.

**The Chief Risk Officer or equivalent owns** the residual risk
acceptance: signs off that the policy as written is consistent with
the company's risk appetite.

When this is unclear, the policy drifts. Security writes a policy
that is too restrictive because they cannot model the development
workflow. Architecture writes a policy that is too permissive
because they cannot model the residual risk. Legal writes a policy
that is unimplementable because they cannot model the tool's
actual capability. The four functions need to be in the same room
when the policy is written.

## A transition plan

If your company is currently in one of the two failure states (ban
or rubber-stamp), here is how to get to a working policy in roughly
ninety days.

**Days 1–14: Inventory the actual usage.**
Survey developers anonymously about which AI tools they are using,
on which devices, with what data. Most companies are shocked by the
results. The right baseline is honesty about what is already
happening, not what the policy nominally allows.

**Days 14–30: Draft the six clauses against your context.**
Use the framework above as a starting point. Specifics vary by
industry, by jurisdiction, by sensitivity of code base. Convene
architecture, security, legal, procurement, and risk in the same
room. Write the policy in language your developers can understand.

**Days 30–60: Negotiate the enterprise contract for one tool.**
Pick one tool to standardise on first. Multiple tools is fine
later; one is enough to begin. Negotiate the enterprise contract
to match the clauses. Be willing to walk away from a vendor that
will not meet the data residency or logging requirements.

**Days 60–75: Deploy the enforcement layer.**
SSO configuration. Network blocks on free tiers. Pre-commit hooks.
Prompt scrubbing. SIEM integration. The plumbing.

**Days 75–90: Roll out, observe, iterate.**
Phased deployment to one engineering team, then the rest. The first
team is the canary; observe what breaks. The policy will need
adjustment in the first month. Plan for that.

After ninety days you will have a working policy, an enforcement
layer, an audit trail, and a defensible position when the next
regulatory cycle starts.

## What this is, and what it is not

This is a policy framework. It is not a security strategy. It is
not an AI strategy. It is a specific governance layer aimed at one
specific question: how does this company use AI coding tools in a
way that is auditable, contractually sound, and consistent with the
regulatory environment.

It assumes a regulated context. If you are running a B2B SaaS with
no regulated customer base, several of these clauses are overkill.
If you are running a defence contractor or a systemically important
financial institution, several of these clauses are not strict
enough. Calibrate to context.

It also assumes the tools will get better. They will. The policy
needs to be revisable. Quarterly review of the approved-tools list,
annual review of the contract terms, periodic spot-checks on the
enforcement layer. Treat it as a living document.

The point is not to slow down AI adoption. The point is the
opposite: a working policy lets a company adopt AI coding tools at
scale with the regulatory exposure controlled. Companies without a
working policy slow down anyway, because every team makes the
governance decision individually and badly. A working policy
removes the ambiguity and lets the development organisation actually
get on with it.

If you are about to publish your "AI policy" this quarter and have
not yet written the six clauses with the specificity above, push
the publish date.
