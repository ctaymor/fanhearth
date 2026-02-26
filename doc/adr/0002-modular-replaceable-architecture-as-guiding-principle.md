# 2. Modular replaceable architecture as guiding principle

Date: 2026-02-26

## Status

Accepted

## Context

FanHearth is being built in phases: vibe fast to get a real community running, then rebuild properly piece by piece under a functioning community. This means the MVP will be deliberately scrappy — but it needs to be scrappy in a way that doesn't trap us later.

We need a guiding principle that shapes every technical decision, especially when there's a tradeoff between speed and quality.

## Decision

Every piece of the app should be easy to replace. We will build modular, scrappy MVP tech with clean interfaces between components, so any individual piece can be swapped out without cascading changes elsewhere.

In practice this means:
- Prefer clear boundaries over tight coupling
- Avoid deep vendor lock-in at the component level
- Use simple, battle-tested tech over novel solutions
- Design data layers, auth, file storage, and external services so they can be swapped independently
- Build exactly what is needed now — do not design for hypothetical future requirements

The Refactorer agent (see ADR-0003) enforces this principle in every feature build.

## Consequences

- We can move fast in the MVP phase without painting ourselves into a corner
- Individual pieces of the stack can be upgraded or replaced as the community grows
- Code review (via agents and humans) must actively check for coupling and replaceability
- Some upfront thought is required when introducing new dependencies or integrations
