# 4. GitHub Issues as feature specs

Date: 2026-02-26

## Status

Accepted

## Context

We need a way to specify features before building them. Feature specs are workflow inputs — they should produce tests and working code, not accumulate as long-lived documentation. The lasting artifact of a spec is the tests, not the spec itself.

We also want a way to draft specs conversationally (with Claude) before they're ready to hand to the build pipeline.

## Decision

GitHub Issues are the feature spec format. Each issue contains:
- Natural language context (who this is for, why it matters)
- Gherkin scenarios (Given/When/Then) for behavior and acceptance criteria
- MVP constraints (what this explicitly should NOT do in v1)
- Non-functional requirements (architecture, accessibility, etc.)

Issues are created via the `/new-issue` command, which guides the author through the spec conversationally and creates the issue with appropriate labels (`ready-to-build`, `feature`/`bug`/`culture`, optionally `good-first-ticket`).

The `/build-feature` command takes an issue number as input, fetching the spec with `gh issue view`. Issues are closed when the implementing PR merges.

## Consequences

- Specs are ephemeral — they live as open issues and close when built
- No accumulation of stale spec documents
- GitHub provides natural linking between specs, PRs, and commits
- Drafting happens in conversation (via `/new-issue`) rather than in files
- If we outgrow GitHub Issues (e.g. need more drafting workflow), we will migrate to a dedicated product management tool
