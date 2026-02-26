# FanHearth Architecture Overview

## Guiding Principle

**Modular, scrappy MVP tech. Easy to replace any piece.**

Every technical decision is made with this in mind. We build fast, but we build with clean boundaries so nothing traps us later. See [ADR-0002](adr/0002-modular-replaceable-architecture-as-guiding-principle.md).

## How We Build Features

FanHearth uses an agent-based development pipeline. Features go from spec to PR through a series of specialized agents, each focused on a single concern.

```
/build-feature [issue or spec file]
        │
        ▼
  Feature Builder (orchestrator)
        │
        ├─ Test Writer        writes tests first, from the spec
        ├─ Coder              implements to pass tests
        ├─ Reviewers          each with a single lens:
        │   ├─ Refactorer       modularity & replaceability
        │   ├─ Security         vulnerabilities
        │   ├─ Readability      self-documenting code
        │   ├─ Brevity          no bloat
        │   └─ Accessibility    a11y
        ├─ Integration Tests  automated
        ├─ UI/UX Checker      human checklist
        └─ PR Agent           commits & opens PR
```

Agent prompts live in `agents/`. Each can be tuned independently. See [ADR-0003](adr/0003-agent-based-development-workflow.md).

## How We Specify Features

Features are specified as GitHub Issues using a mix of natural language and Gherkin scenarios. Use `/new-issue` to draft a spec conversationally. Use `/build-feature [issue-number]` to kick off the pipeline.

Issues are ephemeral — they close when the PR merges. The tests are the lasting spec. See [ADR-0004](adr/0004-github-issues-as-feature-specs.md).

## Architecture Decision Records

Technical decisions are recorded in `doc/adr/`. Use the `adr` CLI to create new records.

| ADR | Decision |
|-----|----------|
| [0001](adr/0001-record-architecture-decisions.md) | Use ADRs to record architecture decisions |
| [0002](adr/0002-modular-replaceable-architecture-as-guiding-principle.md) | Modular, replaceable architecture as guiding principle |
| [0003](adr/0003-agent-based-development-workflow.md) | Agent-based development workflow |
| [0004](adr/0004-github-issues-as-feature-specs.md) | GitHub Issues as feature specs |
| [0005](adr/0005-mvp-tech-stack.md) | MVP tech stack |
