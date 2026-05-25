---
title: "How do you audit a decision an agent made? A working framework"
slug: auditing-agent-decisions
date: 2026-05-21
excerpt: "Most AI governance frameworks operate at the level of policies and intent. They don't survive contact with an actual regulator. Here is a concrete, code-level pattern for making agentic systems auditable in production, in regulated industries, with examples."
source: own
---

## TL;DR

The single hardest unsolved problem with deploying AI agents into
regulated enterprises is not capability, latency, hallucination, or
cost. It is auditability. When General Counsel, the Chief Compliance
Officer, or a regulator asks "show me, in full, what this system
told my employee on March 12 at 14:32, what data it looked at when
it produced that answer, and what action was taken as a result",
most agentic systems in production today cannot answer the question.
This is a design failure, not an inevitable one.

The framework that follows treats audit as four distinct layers
that must each be captured separately and verifiably: the **request**
(what was asked), the **context** (what the model was given), the
**generation** (what the model produced), and the **action** (what
the system did with the output). Each layer has a specific data
model, a specific storage discipline, and a specific failure mode.
This is the pattern I built into [Meridian](/blog/case-study-meridian/)
and into [CANVAS](/blog/case-study-canvas/), and it is the pattern
I would carry into any agent deployment in a regulated environment.

If you are running an agent in production right now and any of the
four layers is missing, your audit story does not actually work.
This piece walks through the implementation.

## Why most AI governance frameworks don't survive contact

There are now several reasonable-quality AI governance frameworks
in the public domain: the NIST AI RMF, the EU AI Act compliance
guidance, the various sector-specific overlays (FCA's discussion
papers on AI in financial services, the FDA's draft guidance on
AI/ML medical devices, the Bank of England's supervisory statements,
and the equivalents in other jurisdictions). They are useful. They
are also, mostly, written at the level of policies, principles,
and intended outcomes — not at the level of the data structures
and code paths that determine whether the policy is actually
implementable.

This produces a familiar pattern. The Risk function publishes a
sound-looking AI policy. Architecture nods along. Engineering ships
the agent. Six months later, the first proper audit happens. The
auditor asks for the records that the policy implies should exist.
The records don't exist, or they exist in five different systems,
or they exist but cannot be linked together because the system
that called the LLM didn't log the trace ID that the system that
took the action recorded.

Audit is not a policy problem. Audit is an instrumentation problem.
Instrumentation has to be designed in. Retrofitting it is expensive
and produces a worse result.

This piece is the instrumentation framework I would build into any
agentic system that needs to survive regulatory scrutiny.

## The four layers

Every agent decision sits on top of four distinct artefacts that
must be captured separately:

```
        ┌─────────────┐
        │   REQUEST   │ ← what the user asked, in what context, with what permissions
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │   CONTEXT   │ ← what the model was given to work with (retrieval, tools, system prompt)
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │  GENERATION │ ← what the model produced (raw output, structured parse, confidence)
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │    ACTION   │ ← what the system did as a result (writes, side effects, downstream calls)
        └─────────────┘
```

The auditor's question — "what happened on March 12" — is actually
four sub-questions:

1. **What was the user trying to do?** (request layer)
2. **What information did the model see when it decided?** (context layer)
3. **What did the model actually say?** (generation layer)
4. **What did the system then do?** (action layer)

If any of those four cannot be answered with high fidelity and
linked back to the others through a stable identifier, your audit
is broken. The instrumentation discipline is to instrument each
layer separately, capture it deterministically, and tie them
together with a trace ID that propagates end to end.

The rest of this piece walks through each layer in turn.

## Layer 1: the request

What needs to be captured:

- **Trace ID**. A UUID generated at the entry point of the request,
  propagated through every downstream call. This is the spine of
  the whole audit record. Without it, you can capture every layer
  perfectly and still not be able to link them.
- **Actor identity**. The authenticated user, including the
  identity-provider claims that were validated at the gateway. Not
  just "user X" but "user X, authenticated via OIDC against IdP Y,
  with claims {department: Z, role: W}, at 14:32:07 UTC".
- **The literal request**. Whatever the user actually typed, asked,
  or submitted. Stored verbatim. Not summarised, not cleaned, not
  sanitised. If the user pasted an SSN into the chat by accident,
  you want to know that — both because you may need to scrub it
  downstream and because the question of "did the system handle a
  PII-bearing prompt" is itself an auditable event.
- **Request context that the system used**. Was this an authenticated
  API call, a chat session, a scheduled job? Was the user inside
  the company network, or remote? Which tenant, if you are multi-tenant?
- **Wall-clock timestamp**. UTC, to the millisecond. Plus the
  system's own monotonic clock if you have one. Wall clocks drift;
  monotonic clocks don't.
- **Permissions snapshot**. The set of permissions the user held at
  the moment of the request. Not "the user's current permissions" —
  permissions change — but the snapshot that was used to authorise
  the call. This is the protection against the "the user used to
  have access to that data" defence.

The request layer is the easiest of the four to capture well, and
the most commonly captured badly. The two failure modes I see most
often:

- **Trace ID is generated downstream**, not at the gateway. This
  means a system-internal failure (the LLM call timing out, a retry,
  a fallback path) produces a different trace ID than the original
  request. The audit log shows two trace IDs for what is, from the
  user's perspective, one event. Always generate the trace ID at the
  outermost entry point and propagate it.
- **The user's literal input is paraphrased or stripped of metadata
  before logging**. Often done with good intent — to remove PII or
  to compress the log. Bad practice. Capture the original; redact
  in views, not in storage. Storage redaction is a one-way operation
  that destroys evidence.

## Layer 2: the context

What needs to be captured:

- **The system prompt**, in full. Not just a reference to "system
  prompt v3" — the actual text that was sent to the model. System
  prompts change. Prompt-caching layers can in theory be replayed
  from a cache key, but in practice you want the full text in the
  audit record so the audit doesn't depend on the cache key still
  resolving in three years' time.
- **The retrieved context**. Whatever the RAG layer pulled in.
  Specifically: which documents were retrieved, with what IDs at
  what versions, in what order, with what similarity scores, and
  what the actual content of each retrieved chunk was. The chunk
  content matters because retrieved data can change underneath you
  — a document gets updated, a record gets soft-deleted, an embedding
  index is rebuilt. The audit record needs the data as the model
  saw it, not the data as it exists now.
- **Tool definitions**, if the model was given tools. The schema of
  every tool the model could have called. Tools change too. The set
  of tools available to the agent on March 12 may not be the set
  available today.
- **Conversation history**, if this was a multi-turn interaction.
  Captured turn by turn, with trace IDs linking back to earlier
  requests so the full thread can be reconstructed.
- **Model identifier**, including the exact version. "Claude" is
  not enough. "claude-opus-4-7" is enough. Model versions change.
  Behaviour changes with them. The audit record needs to know which
  version made the call.
- **Sampling parameters**. Temperature, top_p, top_k, max_tokens,
  any stop sequences, any structured-output schemas. Determinism
  isn't possible with most LLMs, but the parameters that influence
  the distribution of outputs are part of the audit story.

The two failure modes I see most often at this layer:

- **The retrieved context is referenced but not stored**. The audit
  log says "retrieved 3 documents, IDs 47, 92, 318" but doesn't
  include the content of those documents at the time of retrieval.
  Then the documents change. The audit record is now ambiguous —
  you cannot tell whether the model's response was reasonable
  given what it actually saw.
- **The system prompt is stored as a reference, not as text**. The
  audit log says "system prompt: meridian.v3", and meridian.v3 is a
  pointer to a config file that has since been updated. The audit
  is unreplayable. Always inline the system prompt text.

## Layer 3: the generation

What needs to be captured:

- **The raw model output**, verbatim. Whatever bytes came back from
  the model. No formatting, no cleaning, no post-processing applied
  yet.
- **The structured parse**, if the system extracted structured data
  from the output. Both the parsed structure and any validation
  errors that occurred during parsing.
- **Tool calls made by the model**, if applicable. Which tools the
  model called, with what arguments, in what order, and what each
  tool returned. Tool calls produce their own sub-audit records,
  linked by the trace ID and a sequence number.
- **Latency**. How long the model took. Not because latency is
  inherently auditable, but because a model call that took 30 seconds
  when it normally takes 3 is a signal that something was unusual
  about that particular generation.
- **Cost**, if you are tracking it. Input tokens, output tokens,
  cache reads, cache writes. The economic record is part of the
  audit record because cost is often the first place anomalies
  show up.

The failure modes here are mostly about post-processing:

- **The system stores the cleaned output instead of the raw output**.
  Markdown got rendered to HTML before logging. Citation markers
  got stripped. The output that an LLM was actually told to produce
  is no longer present in the audit record, only the version that
  the rendering layer produced. Always log raw first, render later.
- **Tool calls are logged as completed actions, not as model
  decisions**. The audit log shows "the system updated record 42",
  not "the model decided to call updateRecord(42) and the tool
  succeeded". For agent audit, the decision is the audit-relevant
  event, not just the outcome.

## Layer 4: the action

What needs to be captured:

- **What the system did with the output**. Did it write to a
  database? Send an email? Update a workflow stage? Call an external
  API? Each of these is an auditable event in its own right and
  needs to be captured with the same discipline as the LLM call.
- **The before-and-after state**, for any write. The audit_log table
  in CANVAS uses a JSONB column for `before_state` and another for
  `after_state`. The diff between them is the auditable change.
- **The human-in-the-loop record**, if there was one. Did a person
  review and approve the model's suggested action before it
  executed? If yes, capture who, when, and what they were shown.
  If no — if the action was fully automated — capture that fact
  explicitly. "Auto-executed" is a critical audit datum.
- **The downstream effects**, if any. If the action triggered
  notifications, scheduled jobs, or further agent calls, those
  effects are part of the audit chain. Trace ID continues to
  propagate.

The action layer is where most agentic systems either accept genuine
auditability or fail to. The failure modes are subtle:

- **Actions are logged in the application database but not linked
  to the trace ID**. The application says "record 42 was updated at
  14:32 by automation". The audit log says "trace ID abc made a
  model call at 14:32". Without a stable link between the two,
  you cannot prove which model call caused which database update.
- **The human-in-the-loop step exists but is not recorded as part
  of the agent decision chain**. There is a separate approval system
  that records human sign-offs, but it does not store the trace ID
  of the model call that produced the suggestion. So "the human
  approved this" exists in one log; "the model suggested this"
  exists in another; nothing links them.

## The append-only audit table

The architectural pattern that holds all four layers together is an
append-only audit table. Strictly: never updated, never deleted.
Insert-only privileges on the application database user. Indexed
heavily on `trace_id`, `actor_id`, `occurred_at`, and
`entity_id`.

A minimum-viable schema (PostgreSQL, but the structure is portable):

```sql
CREATE TABLE audit_log (
  id              UUID PRIMARY KEY,
  trace_id        UUID NOT NULL,
  layer           VARCHAR(20) NOT NULL,    -- REQUEST | CONTEXT | GENERATION | ACTION
  occurred_at     TIMESTAMPTZ NOT NULL,
  actor_id        UUID,                    -- nullable for SYSTEM actions
  actor_type      VARCHAR(20) NOT NULL,    -- USER | SYSTEM | MODEL
  action          VARCHAR(255) NOT NULL,
  entity_type     VARCHAR(100),
  entity_id       UUID,
  payload         JSONB NOT NULL,          -- layer-specific content
  ip_address      INET,
  user_agent      TEXT
);

CREATE INDEX idx_audit_trace ON audit_log (trace_id, occurred_at);
CREATE INDEX idx_audit_actor ON audit_log (actor_id, occurred_at);
CREATE INDEX idx_audit_entity ON audit_log (entity_type, entity_id);
```

The `payload` column is JSONB because each layer has a different
shape. Use a discriminated union in your application code:

| Layer | Payload schema |
|---|---|
| REQUEST | `{ request_text, request_context, permissions_snapshot, idp_claims }` |
| CONTEXT | `{ system_prompt, retrieved_chunks: [...], tools: [...], model: "claude-opus-4-7", parameters: {...} }` |
| GENERATION | `{ raw_output, parsed_structure, tool_calls: [...], latency_ms, input_tokens, output_tokens }` |
| ACTION | `{ action_type, target, before_state, after_state, automated: bool, approved_by_id?, approval_trace_id? }` |

The discipline is that **every layer for every request produces at
least one audit row**, and every row carries the trace_id that
threads them together.

## The eval question, which is also an audit question

Evals are usually framed as a quality concern. They are also an
audit concern, and the audit framing changes how you design them.

The standard eval setup runs a test suite against the model on a
schedule and produces a quality score. The audit framing asks a
different question: when the regulator asks "how do you know your
agent was performing within spec on March 12", what is your
evidence?

The answer is the eval log. For every production deployment of a
model, you should have:

- An eval suite that runs against the model version currently in
  production.
- A schedule (typically nightly) that runs the suite and records
  results.
- A persistent record of every run, including the eval suite version,
  the model version, the prompts, the expected outputs, and the
  actual outputs.
- An alert that fires when scores drop below a threshold.

When the regulator asks about March 12, the answer is: "on March 12,
the eval suite was at version 1.4.2, the model was claude-opus-4-7,
the suite ran at 02:00 UTC and scored 94.7% against a 90% threshold,
no alerts fired, and the previous seven days of results were
between 93.1% and 95.4%". That is an audit-grade answer to a
quality question.

The eval log lives in the same kind of append-only structure as the
production audit log, with cross-references where useful (a sampled
production query can be added to the eval set; the eval set can
reference production failures).

## What to redact, when, and where

A common worry: "if I store the literal user input and the full
model output, am I now sitting on a pile of PII that is itself an
audit liability?"

Yes. This is real and it has to be designed for.

The principle: **redact at the view, not at the store**. The audit
log stores raw. Views over the audit log apply role-based redaction:
the application UI shows the user a summarised version; the internal
operations dashboard shows authorised staff a more complete version;
the regulator-facing export, on request, shows the full record with
appropriate access controls.

The redaction logic lives in the view layer and is itself auditable.
"User X viewed audit record Y on date Z" is an audit event. The
record of who has accessed sensitive parts of the audit log is itself
audit-grade.

The reason this matters: if your application logs are themselves
redacted at the point of storage, you cannot un-redact them later
when, for example, a different regulator asks a different question
with a wider remit. View-time redaction preserves the option;
storage-time redaction destroys it.

## A worked example

Imagine an agent that helps an internal user query the application
portfolio. The user asks: "which apps in the Finance domain process
European personal data and have a contract renewal due before
year end?"

A complete audit record for this single interaction looks like
this:

```
trace_id: 7f3a8c2e-...

[14:32:07.123] REQUEST
  actor_id: tarun-...
  actor_type: USER
  payload:
    request_text: "which apps in the Finance domain ..."
    permissions_snapshot: ["portfolio:read", "ai_assistant:use"]
    idp_claims: { tenant: "main", department: "Architecture" }

[14:32:07.456] CONTEXT
  payload:
    system_prompt: "You are an enterprise architecture assistant ..."
    model: "claude-opus-4-7"
    parameters: { effort: "high", thinking: { type: "adaptive" } }
    retrieved_chunks:
      - { id: "app-042", title: "...", content: "...", score: 0.92 }
      - { id: "app-119", title: "...", content: "...", score: 0.88 }
      - { id: "app-208", title: "...", content: "...", score: 0.84 }
    tools: ["search_portfolio", "filter_by_attributes"]

[14:32:11.892] GENERATION
  payload:
    raw_output: "Three apps match your criteria: ..."
    parsed_structure: { matches: ["app-042", "app-119", "app-208"], reasoning: "..." }
    latency_ms: 4436
    input_tokens: 1247
    output_tokens: 312
    tool_calls: []

[14:32:12.001] ACTION
  payload:
    action_type: "render_response"
    target: "chat_session_..."
    automated: true
```

This is the audit-grade view of one interaction. When the regulator
asks about it three years later, every layer can be reconstructed.
The system prompt is inlined. The retrieved chunks are inlined. The
raw output is inlined. The action is recorded. The trace ID threads
everything together.

The cost of this is storage and a small amount of write-time latency.
For a typical enterprise agent, audit log volume is on the order of
single-digit megabytes per day. Cheap relative to the value of
being able to answer the regulator's question.

## Failure modes I have seen in production

A short list of things that look like they work and don't:

- **Audit logs in the application's main database with the same
  privileges as the application user.** A bug in the application
  layer that updates audit rows defeats the whole point. The audit
  log table needs `INSERT`-only grants. If you can do this with a
  separate database role on the same database, that's fine; better
  is a separate write-only log destination (a dedicated event store,
  an append-only message log, a write-once-read-many store) that
  the application cannot delete from.

- **A reasonable audit log for the LLM layer but no link to the
  database writes the agent caused.** The model side is fine. The
  database side is fine. They are not linked. Always propagate the
  trace ID into the database writes.

- **Conversation history stored only on the client side.** A web
  chat that retains conversation in the browser, sends the history
  to the model with each turn, but does not store the history
  server-side. When the regulator asks "what was the model told",
  the answer is "ask the user, they have it in their browser cache".
  This does not work. Server-side conversation storage is the audit
  trail.

- **Citations in the model's response that point to documents the
  model didn't actually see.** This is a hallucination class. It
  happens. The defence is in the context layer: every citation in
  the output must be verifiable against the retrieved chunks
  captured at the context layer. If a citation references a document
  not present in the context, that is itself an auditable anomaly
  and should be flagged.

- **Tool calls treated as part of "the response" rather than as
  separate audit events.** The model's tool calls are decisions.
  Each one has its own arguments, its own response, its own latency,
  its own success/failure status. Treating them as opaque steps
  inside the generation collapses the audit chain. Each tool call
  needs its own audit row.

- **The "automated vs human-approved" flag is missing.** When the
  regulator asks "did a human approve this action", the answer
  needs to be recoverable from the audit log alone. Adding the
  `automated: bool` and `approved_by_id` fields to every action row
  is cheap and pays for itself the first time anyone asks.

## What this gets you, in practice

When the framework above is implemented properly, three things
become trivial that were previously hard.

**Replayability.** Any past decision can be reconstructed. You can
re-show, exactly, what the model saw and what it produced. Useful
for debugging, useful for retrospective evals, useful when defending
the system to an auditor.

**Anomaly detection.** Anomalies in any of the four layers are
detectable. A spike in retrieval-confidence variance. A latency
outlier. A tool call with unusual arguments. A run of automated
actions without human approval where there usually is one. These
are all queryable on the audit log.

**Regulatory defensibility.** When the regulator arrives, the answer
to "show me how this works" is not a slide deck. It is a query
against the audit log that produces an exact, timestamped, sourced
record. The regulator does not need to trust the policy document;
they can read the data.

This last point is the actual goal. Most AI governance work is
producing assurance through documentation. Audit instrumentation
produces assurance through evidence. Evidence is what gets you
through a real audit; documentation is what gets you through a
desk-side review.

## Where this fits

Two related pieces on this site:

- [Meridian: building the EA platform we couldn't buy](/blog/case-study-meridian/) —
  describes the broader context and the conversational assistant
  the audit framework was designed around.
- [CANVAS: building the approval workflow no commercial product
  covers](/blog/case-study-canvas/) — describes the workflow side
  of the same system, where the action layer of the audit framework
  is wired into the application workflow.

If you are starting an agent build today and any of the four layers
above is missing from your design, stop and add it before you write
more application code. Retrofitting audit is more expensive than
designing it in. The instrumentation discipline is also the
discipline that makes the system itself better — every layer of
the audit story is also a layer of the system that can be tested,
observed, and improved.
