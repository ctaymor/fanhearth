# 3. Agent-based development workflow

Date: 2026-02-26

## Status

Accepted

## Context

FanHearth is an experiment in sub-agent vibe coding. Rather than a traditional write-review-merge workflow, we want to use specialized AI agents to handle different concerns in the development pipeline — with humans reviewing PRs at the end.

We want each agent to have a single responsibility and a clear scope, so they can be tuned and improved independently over time.

## Decision

We will use a pipeline of role-based agents orchestrated by a Feature Builder. Each agent has a prompt file in `agents/` that defines its role, responsibilities, and output format.

The pipeline:
1. **Feature Builder** — orchestrator, coordinates all other agents
2. **Test Writer** — writes tests from the spec before any implementation
3. **Coder** — implements to make tests pass
4. **Reviewers** (each focused on a single lens):
   - Refactorer — modularity and replaceability
   - Security — vulnerabilities and attack vectors
   - Readability — self-documenting code, minimal comments
   - Brevity — no bloat, no verbosity
   - Accessibility — a11y for all users
5. **Integration Tests** — automated test run
6. **UI/UX Checker** — generates a human testing checklist
7. **PR Agent** — commits and opens the pull request

Reviewers pass issues back to the Coder rather than fixing code directly. Maximum 2-3 feedback loops before escalating to human review. Humans review all PRs.

Each build run writes ephemeral output to `.build/[issue]-[date]/` (gitignored).

The pipeline is triggered via `/build-feature [issue-number or spec-file]`.

## Consequences

- Each agent can be tuned independently by editing its prompt file
- The pipeline will improve over time as we identify gaps and add or refine agents
- Playwright/browser-based UI testing is a planned addition in a future iteration (v1 uses a human checklist)
- This workflow assumes GitHub Issues as the primary spec format (see ADR-0004)
- Human review remains required — agents are not autonomous enough to merge without oversight
