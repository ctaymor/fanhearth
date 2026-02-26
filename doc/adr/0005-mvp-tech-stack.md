# 5. MVP tech stack

Date: 2026-02-26

## Status

Accepted

## Context

We need to choose a tech stack for FanHearth's MVP. The constraints we're optimizing for:

- **Speed**: Get something real up fast so we can build an actual community
- **Familiarity**: The founding developer knows Ruby on Rails and Go; strongly prefers no JS backend
- **Modular and replaceable**: Per ADR-0002, any piece should be swappable without cascading rewrites
- **Managed hosting for now**: Running solo, want to move fast without ops overhead, but need a clean migration path to self-hosted infrastructure later
- **Community site data model**: Many overlapping fan communities with shared user accounts (Reddit-style, not isolated multi-tenant). Fully relational data.
- **Frontend simplicity**: Want JS interactivity without the complexity of a separate JS application

This decision is made at MVP stage with a small user base. It is explicitly not intended to be permanent. The goal is to ship, learn, and replace pieces as the community and requirements become clearer.

## Decision

**Backend**: Ruby on Rails
**Frontend**: Hotwire (Turbo + Stimulus)
**Database**: PostgreSQL
**Background jobs**: Sidekiq + Redis
**Search**: PostgreSQL full-text search
**Hosting**: Fly.io

### Why Rails

Rails is the right tool for this phase because:
- The founding developer knows it well, which matters enormously for solo vibe-coding speed
- Convention over configuration means fewer architectural decisions to make upfront
- The many-overlapping-communities data model is pure relational CRUD — Rails' home turf
- The "Rails doesn't scale" reputation is largely a myth. GitHub, Shopify, and Discourse (a direct analogue to FanHearth) run Rails at massive scale. Real scaling bottlenecks for a community site are almost always the database and caching layer, not the web framework.
- If hot paths need to be extracted later, the founding developer knows Go and can build targeted services without a full rewrite.

### Why Hotwire (Turbo + Stimulus)

- Server-rendered HTML with sprinkles of interactivity — no separate JS application to maintain
- Familiar mental model for someone coming from Rails + HTML/HAML
- The "frontend" is mostly HTML + CSS, which is easy to throw together quickly and easy to replace
- Clean exit path: if a real frontend team joins later, add an API layer and let them build separately. Nothing is trapped.

### Why PostgreSQL

- Rails' de facto default; excellent ecosystem support
- Full-text search, JSONB columns, and advanced indexing options suit a community site's query patterns better than MySQL
- Industry standard; rarely the thing that needs replacing
- Fly.io offers managed Postgres, keeping ops overhead low at MVP stage

### Why Sidekiq + Redis

A community site needs background jobs quickly: feed generation, notifications, moderation queues, email. Sidekiq is the Rails standard. Redis doubles as a cache layer.

**Note**: Rails 8 ships with Solid Queue (database-backed job queue, no Redis required). If simplicity is ever more important than throughput, dropping Redis and switching to Solid Queue is a reasonable future move.

### Why Fly.io

- Docker-based deployments mean the exit path is clean: run the same image on any VPS
- No proprietary lock-in
- Good Rails support, managed Postgres, reasonable cost at low scale
- The founding developer is an infrastructure engineer who could run this on their own hardware — but not yet, because managed ops overhead is too costly at MVP stage

## Consequences

### What becomes easier
- Moving fast: Rails conventions eliminate hundreds of small decisions
- Frontend iteration: changing HTML templates is cheap and fast
- Future self-hosting: Fly.io's Docker model means migration is straightforward

### What becomes harder
- Extreme concurrency: Rails' threading model has limits at very high request volume
- Replacing the backend entirely: switching from Rails to Go (or anything else) is expensive even with LLMs. This is the highest-cost replacement in the stack.
- Frontend ambition: Hotwire has limits. Complex real-time UI (think live collaborative editing) would push against it.

### Trade-offs we're accepting
- We're accepting that if FanHearth grows to hundreds of thousands of active concurrent users, we will likely need to do meaningful engineering work on the backend — possibly including partial rewrites
- We're accepting Hotwire's constraints on frontend interactivity in exchange for simplicity now
- We're accepting Fly.io's pricing scaling with us rather than being fixed-cost

## When to reconsider

**Reconsider the web framework (Rails)** when:
- Response times are degrading under load and horizontal scaling + caching isn't enough
- You're hiring backend engineers who don't know Rails and the onboarding cost becomes real
- A specific high-traffic feature (e.g. live feed updates) would be dramatically better as a standalone Go service

**Reconsider the frontend (Hotwire)** when:
- You have a frontend engineer or team who want to own a proper JS application
- A feature requires real-time collaborative UI that Turbo can't handle cleanly
- User experience research shows the server-rendering latency is a real problem

**Reconsider PostgreSQL** when:
- Almost never. Postgres scales extremely far. If anything, add read replicas before considering a switch.
- Exception: if you need purpose-built search, add Meilisearch or Elasticsearch *alongside* Postgres rather than replacing it.

**Reconsider Fly.io** when:
- Monthly costs become significant relative to revenue and self-hosting would be meaningfully cheaper
- You need infrastructure control that a managed platform can't provide (e.g. specific compliance requirements)
- The founding developer has ops bandwidth to spare

**Reconsider Sidekiq + Redis** when:
- You want to simplify the stack and job throughput isn't a bottleneck — switch to Solid Queue and drop Redis
- Job volume is high enough that a dedicated queue service (e.g. AWS SQS) makes more sense
