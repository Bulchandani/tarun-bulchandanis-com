---
title: "OpenClaw was too good to ignore and too risky to install. That changed yesterday & how to install nemoclaw"
slug: linkedin-openclaw-was-too-good-to-ignore-and-too-risky-to-install-tha
date: 2026-03-17
excerpt: "When OpenClaw launched weeks ago, I wanted to install it on my work machine immediately. The hype was everywhere, you couldn"
source: linkedin
external: "https://www.linkedin.com/pulse/openclaw-too-good-ignore-risky-install-changed-how-tarun-bulchandani-utble"
image: "https://media.licdn.com/dms/image/v2/D4E12AQFkMP6t-w915A/article-cover_image-shrink_720_1280/B4EZz9bimfGUAM-/0/1773778383275?e=2147483647&v=beta&t=pP2WYDTxBz3B3iInSk_gVVBfiWLcRp8ZsSVozP8Cfpg"
has_body: true
---
When OpenClaw launched weeks ago, I wanted to install it on my work machine immediately. The hype was everywhere, you couldn't ignore the topic if you tried... engineers were talking about it, reddit was full of screenshots of autonomous AI assistants doing genuinely useful things. But I held back. Not because anyone stopped me, but because I knew the security questions didn't have good answers yet.

What data was leaving the machine? What could the agent actually access? Could I honestly tell my team this was a responsible choice? I couldn't. So I watched from the sidelines, keeping an eye on it, waiting for the moment the trust gap closed.

> _OpenClaw became the fastest-growing open source project in history. And then the security researchers started asking exactly the hard questions I'd been sitting with._

That moment arrived this week. NVIDIA just announced [NemoClaw](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2FNVIDIA%2FNemoClaw&urlhash=8rir&trk=article-ssr-frontend-pulse_little-text-block) at GTC, and I installed it on my MacBook Pro tonight. Here's exactly what happened, including the bumps.

### Let's start with: What is NemoClaw?

[NemoClaw](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2FNVIDIA%2FNemoClaw&urlhash=8rir&trk=article-ssr-frontend-pulse_little-text-block) is [OpenClaw](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2Fopenclaw%2Fopenclaw&urlhash=ui-c&trk=article-ssr-frontend-pulse_little-text-block) with proper guardrails. NVIDIA built it as part of their new [Agent Toolkit / OpenShell runtime](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2FNVIDIA%2FopenShell&urlhash=YXgL&trk=article-ssr-frontend-pulse_little-text-block) — a security layer that enforces strict, declarative policies over everything the AI agent can and cannot do. Think of it as OpenClaw inside a glass-walled office where every network request, every file access, and every outbound call is logged, reviewed, and policy-governed before it happens.

### Why it finally answers the security questions

## NETWORK EGRESS

Every outbound connection blocked by default. Unauthorised calls surface for operator approval in real time.

## FILESYSTEM ISOLATION

Agent can only read/write inside /sandbox and /tmp. Locked at sandbox creation.

## SYSCALL RESTRICTIONS

Privilege escalation and dangerous syscalls blocked by seccomp policy. No exceptions.

## INFERENCE ROUTING

Model API calls intercepted by OpenShell and routed through approved backends only.

It's also fully open source (as is OpenClaw) you can read the policies, inspect the blueprint, and understand the constraints. That transparency is precisely what makes it a responsible choice rather than a leap of faith.

### Installing it on a MacBook Pro

The install command is one line:

curl -fsSL https://nvidia.com/nemoclaw.sh | bash 

It detected my Node.js straight away. Then it hit a wall — npm couldn't reach GitHub over SSH because I hadn't agreed to the Xcode license.

The fix is a single command — run it, scroll through the Apple SDK agreement, and type agree:

sudo xcodebuild -license 

With that resolved, I ran the install again and kicked off onboarding. Make sure Docker is running before you start the onboarding. (I hadn't, and had to rerun the onboarding)

All preflight checks passed. It detected my Apple M4 Pro (20 cores, 48 GB unified memory), noted that NIM requires an NVIDIA GPU so it would use cloud inference instead, auto-installed the [OpenShell CLI](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2FNVIDIA%2FopenShell&urlhash=YXgL&trk=article-ssr-frontend-pulse_little-text-block) (v0.0.7), and moved straight into spinning up the OpenShell gateway.

Total time from first command to a running sandbox: under 15 minutes, including the detours to accept Xcode license and get Docker running. If you accept the Xcode license and have Docker running in advance, you're probably looking at five.

### Quick-reference install guide

## 1 Accept the Xcode license if you haven't already: sudo xcodebuild -license

## 2 Start Docker Desktop and wait until it shows "running".

**3** Get a free NVIDIA API key from [build.nvidia.com](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fbuild%2Envidia%2Ecom%2F&urlhash=bIBT&trk=article-ssr-frontend-pulse_little-text-block).

## 4 Run the installer: curl -fsSL https://nvidia.com/nemoclaw.sh | bash

## 5 If onboarding didn't run automatically: nemoclaw onboard

**6** Once complete: nemoclaw my-assistant (or whatever name you chose during the onboarding process) connect

### How to actually use it

Once connected, the [OpenClaw](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2Fopenclaw%2Fopenclaw&urlhash=ui-c&trk=article-ssr-frontend-pulse_little-text-block) terminal interface opens and you interact in plain English. It plans and executes — it's not a chatbot. A few things worth knowing:

**→** Ask it to manage emails, summarise documents, or do web research -it runs tasks in the background and reports back.

**→** Every time it tries to reach a new external service, [OpenShell](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2FNVIDIA%2FopenShell&urlhash=YXgL&trk=article-ssr-frontend-pulse_little-text-block) intercepts the request and surfaces it for your approval. Nothing happens behind your back.

**→** On Apple Silicon it routes inference to NVIDIA's cloud (Nemotron 3 Super 120B). No local NVIDIA GPU required.

## → Useful commands: nemoclaw status, nemoclaw logs --follow, /help inside the TUI.

> _NemoClaw is an alpha release — expect rough edges. But the security questions I'd been sitting with for weeks finally have proper answers._

If you've been in the same position, watching OpenClaw with interest but holding back for the right reasons, I'd encourage you to take another look. The [official docs](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fdocs%2Envidia%2Ecom%2Fnemoclaw%2Flatest%2Findex%2Ehtml&urlhash=ZNZJ&trk=article-ssr-frontend-pulse_little-text-block) and [open source code](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2FNVIDIA%2FNemoClaw&urlhash=8rir&trk=article-ssr-frontend-pulse_little-text-block) give you and your team everything needed to evaluate it properly.

I will post my use-cases soon. Until then, have fun and comment what you've used OpenClaw for and where NemoClaw could fit into your workflows.

#AI #NemoClaw #OpenClaw #NVIDIA #Productivity #AgentAI #MacOS #EnterpriseAI
