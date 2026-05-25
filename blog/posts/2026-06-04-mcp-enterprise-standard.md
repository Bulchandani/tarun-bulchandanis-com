---
title: "MCP is the most important enterprise standard nobody is implementing"
slug: mcp-enterprise-standard
date: 2026-06-04
excerpt: "Model Context Protocol is eighteen months old, supported by every major model vendor, and the cleanest answer to the integration sprawl that AI agents are creating. Enterprise adoption is poor. Here is why, and what to do about it."
source: own
---

## TL;DR

Anthropic introduced the Model Context Protocol in November 2024.
By mid-2026 it has been adopted, in some form, by OpenAI, Google,
the major IDE vendors (Cursor, Claude Code, VS Code via Copilot
Chat), the major productivity vendors (Notion, Linear, Atlassian,
Microsoft via M365 Copilot extensions), and a long tail of
infrastructure providers. The protocol does one specific thing
well: it standardises how an LLM gets access to external tools,
context, and data, with a security and discovery model that
generalises across vendors.

In consumer and developer-tooling contexts, MCP has won. In
enterprise contexts — by which I mean regulated companies running
agents in production over internal data — MCP adoption is poor.
Most internal agent builds I see in 2026 are still using
custom-per-vendor function calling, hand-rolled RAG pipelines,
direct API integrations with each downstream system, or some
proprietary middleware layer that the architecture function is
trying not to think about.

This is a missed opportunity. MCP is the right abstraction. It
is more secure than the bespoke alternatives most companies are
running. It removes a category of vendor lock-in. It standardises
the audit story for tool calls. And the cost of adopting it is
low and falling.

This piece is what MCP is, why enterprise adoption has lagged, the
arguments against and the answers to them, and three integration
patterns I would use today for a regulated enterprise.

## What MCP is, in one paragraph

Model Context Protocol is an open protocol — JSON-RPC over a few
transport options, with a small set of standardised methods — that
defines how an AI agent (the "client") connects to an external
data or capability provider (the "server"). The server exposes a
discoverable list of **tools** (callable functions), **resources**
(retrievable content), and optionally **prompts** (reusable
templates). The client connects, discovers what is available,
and calls into the server during the model's reasoning loop.
The protocol handles authentication, capability discovery,
streaming, error handling, and — critically — the audit-relevant
metadata around every call.

In effect, MCP is to AI tooling what LSP (the Language Server
Protocol) was to IDE tooling. LSP let any editor talk to any
language's tooling without each editor re-implementing the
intelligence for every language. MCP lets any model talk to any
data source or tool without each model vendor re-implementing
the connector for every system.

## Why this matters

The status quo without MCP is well-known to anyone who has built
an agent against multiple downstream systems. A typical internal
agent today reaches into Confluence for documentation, into Jira
for tickets, into Salesforce for customer records, into the
company data warehouse for analytics, into the CI system for
build status, into an internal directory for people lookups,
and into half a dozen smaller internal systems. Each of those
integrations is either:

- A bespoke OpenAPI-driven tool definition wrapped in a vendor-specific
  function-calling format (Anthropic's, OpenAI's, Google's — all
  similar but not identical).
- A retrieval pipeline that ingests data from the source, embeds it,
  stores it in a vector database, and surfaces it through RAG.
- A direct API call from the agent code, with the model's reasoning
  injecting parameters into the call.

Each of these is brittle in its own way. Bespoke tool definitions
break when the agent moves to a different model vendor; you re-write
the wrappers. RAG pipelines drift from the source data and require
re-ingestion every time the source schema changes; they also lose
the fine-grained permissions model of the source system. Direct
API calls couple the agent code tightly to the downstream system's
API surface; you re-write the integration every time the API changes.

MCP gives you a different shape. The downstream system exposes an
MCP server. The agent, regardless of model vendor, talks to that
server through the protocol. The server handles permissions, the
discovery, the streaming, the structured responses. The agent code
doesn't change when you switch models. The integration doesn't
change when you switch agents. The downstream system's API can
evolve independently of the agent layer.

There are several specific implementation wins:

- **Fine-grained permission delegation.** MCP servers receive the
  end-user's identity (via OAuth-style flows where the server is
  the resource server and the model client is the bearer). The
  permissions the server applies are the permissions of the actual
  user. This is the correct security model for an enterprise tool;
  the alternative is service-account-with-superset-permissions,
  which is the source of half the data-leak incidents I have seen
  with internal agents.
- **Discoverability over hand-wired configuration.** The agent
  discovers what tools and resources are available rather than
  having them baked into a config file. New capability becomes
  available without re-deploying the agent. Removed capability
  becomes unavailable without manual cleanup.
- **Standardised audit metadata.** Every MCP call has a request ID,
  a timestamp, a tool name, a parameter set, a return value. Same
  structure regardless of which server you are calling. The
  [audit framework I wrote about earlier](/blog/auditing-agent-decisions/)
  becomes much easier to implement uniformly.
- **Transport portability.** Stdio for local servers, HTTP+SSE for
  remote servers, WebSocket-style streaming where needed. The agent
  code doesn't care which.

## Where adoption actually is

The disconnect between MCP's design quality and enterprise adoption
is real and worth being specific about.

In **consumer tooling**, MCP has effectively won. Claude Desktop,
Cursor, Claude Code, Continue, Windsurf, and a growing set of other
editors all speak MCP natively. The ecosystem of public MCP servers
is in the hundreds and growing: GitHub, GitLab, Linear, Notion,
Slack, Sentry, every major SaaS vendor either has an official
server or a community one.

In **AI-first companies and developer-tooling startups**, MCP is
the default. The pattern is: build the product, expose an MCP
server, let the customer's agent connect.

In **regulated enterprise**, the picture is different. The architecture
functions I have talked to in financial services, healthcare,
utilities, and government are in some combination of these states:

- Aware of MCP but treating it as a "consumer thing".
- Concerned about the security model and waiting for "enterprise MCP".
- Running pilots but not in production.
- Building bespoke wrappers that solve the same problem badly.

The mismatch is striking. The protocol is more rigorous than what
most companies have built internally. The security model is better
than service-account-everything. The audit story is cleaner. And
yet the adoption curve is shallow in exactly the segment that would
benefit most.

## Why enterprise hasn't moved

The reasons I have actually heard, ranked roughly by how often I
hear them:

### "It feels too new"

The honest one. MCP is eighteen months old. Enterprise procurement
cycles do not move at eighteen-month tempo. The CISO will not sign
off on a protocol that doesn't yet have multiple cycles of
production deployment in regulated industries behind it.

This is a reasonable concern but it has gotten weaker over time.
By mid-2026, MCP has been deployed by enterprises including several
large banks, healthcare providers, and at least one defence
contractor I have seen reference for. The "too new" objection is
becoming "too new for our particular sector, where we want to see
two more reference customers first". That last layer of friction
peels off through 2026 and 2027.

### "It feels like vendor lock-in"

This one is wrong but understandable. The intuition is that MCP is
Anthropic's protocol and adopting it ties you to Anthropic. The
reality is the opposite: MCP is the thing that breaks the vendor
lock-in that bespoke tool wrappers were creating.

If your agent is built against Anthropic's function-calling API
specifically, you have an Anthropic-shaped integration that needs
rewriting if you ever move to a different model. If your agent
is built against MCP, the same MCP server works with any MCP-capable
client, regardless of which model vendor is behind it. Adopting
MCP is the un-locking move, not the locking move.

The protocol itself is open. The spec is on GitHub under an
MIT-style licence. Anthropic, OpenAI, Google, and the major IDE
vendors all participate in the spec. It is not Anthropic's
proprietary thing.

### "The security model is not enterprise-grade"

This is partially right and getting less right over time.

The MCP spec as initially shipped had some gaps from an
enterprise-security perspective. Specifically, the auth flow was
under-specified, the discovery layer didn't have a great answer
for "how does the client know which servers are approved", and
the per-tool permissions story was thin.

By mid-2026 most of these gaps have been addressed in the protocol
itself or in canonical patterns around it. OAuth 2.1 with PKCE is
now the standard auth flow for remote MCP servers. Server registries
let the enterprise control which servers a given client is allowed
to discover. Per-tool permission scoping is a standard pattern.
The remaining concerns are real but smaller, and most of them are
also concerns with the bespoke alternatives — they are just more
visible with MCP because the protocol is explicit about what is
happening.

### "We don't trust the auth flow"

Specific version of the above. The worry is that a malicious or
compromised MCP server could exfiltrate data by tricking the model
into calling it.

This is a real risk class but the answer is the same as for any
tool-calling architecture: server allowlist at the client level
(the agent will only talk to MCP servers on its approved list),
content security policies on tool returns (the model cannot exfil
data through a tool that does not have a permitted destination),
and prompt-injection mitigation at the model layer (which is an
unsolved problem for tool calling generally, not specifically for
MCP).

The protocol does not solve prompt injection. Nothing does, yet.
But MCP does not make it worse than the bespoke alternatives, and
in some specific ways it makes it better — the structured nature
of MCP calls gives you more places to enforce policy than free-form
agent-API calls do.

### "We can build it ourselves"

The most expensive of the objections. The architecture function or
the AI platform team has built a bespoke internal protocol that
looks a lot like MCP but predates it, or that the team finds easier
to reason about, or that integrates better with the company's
existing identity infrastructure.

The cost of this is the same as any custom-protocol cost: every
new tool integration, every new model client, every new vendor
relationship goes through the custom layer. The team is now
maintaining a small specification, a client library, a server SDK,
and the integrations between them. None of that produces business
value. All of it is reinvention.

The right move for a team in this position is usually a graceful
migration: keep the existing protocol for the existing integrations,
adopt MCP for new ones, deprecate the custom layer over a year.
The cost of running two protocols for a year is much smaller than
the cost of running a custom protocol forever.

## Three integration patterns for regulated enterprises

The framework for adopting MCP at an enterprise scale comes down
to three patterns, depending on what is being integrated. These
are the patterns I would use if I were running this build today.

### Pattern 1: First-party MCP servers for internal systems

For internal systems that the architecture function controls or
has influence over — the EA platform, the application portfolio,
the capability model, the PMO data, internal documentation — build
a first-party MCP server that exposes those systems through the
protocol.

Why first-party: the team that knows the data model is the right
team to define what gets exposed. The permissions model can be
faithful to the source system's permissions. The tool definitions
can be precise rather than approximate. Audit logging can be
co-located with the system itself.

What this looks like in practice: an MCP server that runs alongside
your internal application, exposing a small number of tools (typically
five to twenty per system, not hundreds), each one mapped to a
specific use case. Not every API endpoint becomes an MCP tool —
that produces an unusable surface area for the model. Curate.

The internal-systems-first pattern is exactly what I would do for
the [Meridian](/blog/case-study-meridian/) platform: expose an MCP
server that lets any other internal agent query the application
portfolio, the capability model, and the [CANVAS](/blog/case-study-canvas/)
workflow records, with permissions enforced by the same identity
gateway the application already uses.

### Pattern 2: Vendor-provided MCP servers for SaaS systems

For SaaS systems your company already uses (Salesforce, Atlassian,
Linear, Slack, your data warehouse, your CI system), use the
vendor's official MCP server if they have one. Most major SaaS
vendors do by mid-2026; the rest will within a year.

Why vendor-provided: the vendor maintains the integration, including
keeping it in sync with their own API evolution. You inherit their
permissions model, their rate limiting, their authentication. You
do not write integration code.

What to validate before deploying: the vendor's MCP server runs in
a region consistent with your data residency requirements, the auth
flow is OAuth 2.1 with PKCE (or stronger), the tool returns can be
constrained to specific scopes, the audit log is exportable to your
own infrastructure. Same diligence as for any third-party SaaS
integration.

Where the vendor doesn't have an MCP server: assess whether the
community has built one with quality you can rely on (the GitHub
MCP servers list is the de-facto registry), and if not, either
build your own thin wrapper around the vendor's API or wait. Do
not adopt low-quality community servers into a regulated production
environment without your own audit pass.

### Pattern 3: A central MCP gateway

For the architecture function's overall posture, run an internal
MCP gateway that sits between agents and downstream servers. The
gateway provides:

- A registry of approved MCP servers. Agents discover capability
  through the gateway, not through ad-hoc server lists.
- Auth proxying. The gateway holds the OAuth tokens for downstream
  servers and exchanges them for short-lived credentials per agent
  call. The agent never holds long-lived tokens.
- Audit logging. Every call through the gateway is logged centrally,
  in the company's SIEM. This is the implementation point for the
  [audit framework](/blog/auditing-agent-decisions/).
- Policy enforcement. The gateway can block tool calls that violate
  policy (e.g., a tool that would exfiltrate PII to an external
  destination, a tool from an un-approved server, a call with
  parameters outside an allowed range).

This gateway pattern is the missing piece in most enterprise MCP
deployments. It is also the piece that turns MCP from "a protocol
the developers use" into "a governed enterprise capability". Without
it, every agent makes its own decisions about which servers to
talk to and how. With it, the architecture function has a single
control point.

The gateway is build-yourself work today. By 2027 there will be
commercial gateway products. By 2028 the gateway will be a standard
piece of the AI platform stack alongside the LLM proxy and the
prompt registry.

## What to implement first

If the architecture function is starting MCP adoption from zero
today, the order of operations:

1. **Month one: build one first-party MCP server for an internal
   system you control.** Pick the system with the highest agent-query
   volume in your existing setup. Expose it via MCP. Wire up one
   agent (Claude Code in the development environment is the easiest
   first client). Validate the auth flow, the audit logging, and
   the permission delegation. This is the proof-of-life.

2. **Months two and three: deploy the central gateway.** Build it
   yourself if there is nothing on the market that fits your
   requirements. Migrate the first-party server from month one
   behind the gateway. Migrate one or two vendor MCP servers
   (Atlassian, GitHub, your CI system) behind the gateway.

3. **Months four to six: standardise on MCP for new integrations.**
   Any new agent-to-system integration is required to go through
   MCP. Architectural exception process for cases where it is not
   yet possible. The architectural drift cost of this constraint
   is small; the long-term simplification is significant.

4. **Month six onwards: migrate the legacy.** Deprecate the existing
   bespoke integration layer. Pick the top three highest-traffic
   custom integrations; rewrite them as MCP servers. Stop maintaining
   the old layer.

By the end of the year you have an MCP-first agent platform. The
new integration cost has dropped. The vendor-lock-in surface has
shrunk. The audit posture is uniform across agents and tools. The
architecture function has a clean abstraction to reason about.

## The honest limitations

To be balanced about it: MCP is not a complete answer to every
agent-integration problem.

The protocol does not solve prompt injection. An MCP-mediated tool
call is as exposed to malicious prompts as a direct API call. The
defences are at the model layer (prompt-injection-resistant system
prompts, output validation, sandboxing of high-risk tools) and at
the gateway layer (policy enforcement on tool calls), not at the
protocol layer.

The protocol does not specify a great answer for **long-running
operations**. A tool call that takes minutes (a complex database
query, a large analytics job, an external system that's slow to
respond) is awkward in MCP today. There are extension patterns
emerging (async tool calls with callbacks, polling endpoints, job
handles) but they are not universal. For workloads that require
long-running operations, you will need an extension or a workaround.

The protocol does not specify a great answer for **bidirectional
streaming inside a tool call**. Pure unidirectional streaming
(server to client) is well-supported. Mid-call user prompts, agent
clarifications, or interactive flows inside a tool call are not
fully standard.

The **vendor-implementation maturity varies**. Some MCP servers
are excellent (the major vendor-provided ones tend to be good).
Some are early-stage and not production-quality. The "is this
server production-ready" assessment is not standardised; you have
to do your own diligence.

These limitations are real. None of them is a reason to ignore
the protocol. All of them are addressable in the integration
pattern you choose.

## Where this is going

A short prediction. By the end of 2027:

- MCP is the default protocol for new agent-to-system integrations
  in the enterprise. The number of teams writing bespoke function-calling
  wrappers will be small and shrinking.
- A handful of commercial MCP gateway products will exist, with
  meaningful market share. The build-yourself gateway becomes a
  niche choice rather than the only choice.
- Most major SaaS vendors will have an official MCP server. The
  ones that don't will be at a competitive disadvantage in AI-augmented
  workflows.
- The protocol itself will have stabilised. The 1.x to 2.x transition
  will have happened with reasonable backward compatibility. The
  specification will look more like LSP does today — boring, mature,
  reliable.

The companies that adopt MCP in 2026 will benefit from being
ahead of the curve when the gateway market matures and the SaaS
ecosystem fills out. The companies that wait until 2028 will be
re-architecting then.

If you are running an agent program in a regulated company right
now and you do not have an MCP strategy, you have a strategy gap
that is going to cost you. The pieces are there to adopt today.
The adoption cost is low and falling. The integration surface
area you are currently building bespoke is going to be the thing
you regret most when MCP becomes the default. Move now.
