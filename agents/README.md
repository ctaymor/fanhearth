# FanHearth Agent Pipeline

This directory contains prompt files for each agent in the feature-building pipeline.

## Pipeline Overview

```
/build-feature [issue-number or spec-file]
        │
        ▼
  Feature Builder (orchestrator)
        │
        ▼
  Test Writer ──────────────────── writes tests first
        │
        ▼
  Coder ────────────────────────── implements to pass tests
        │
        ▼
  Reviewers (in parallel):
    - Refactorer              modularity & replaceability
    - Security Reviewer       security lens
    - Readability Reviewer    human-readable code & outputs
    - Brevity Reviewer        not too verbose
    - Accessibility Reviewer  a11y
        │
        ▼
  Integration Tests ────────────── automated test run
        │
        ▼
  UI/UX Checker ────────────────── generates human checklist
        │     (human tests here)
        ▼
  PR Agent ─────────────────────── commits & opens PR
```

## Feedback Loops

Reviewers pass issues back to Coder rather than fixing directly. Max 2-3 loops before escalating to human review.

## Build Output

Each run writes to `.build/[issue]-[date]/` (gitignored):
- `test-writer.md` — test plan
- `[reviewer]-review.md` — reviewer feedback
- `ui-ux-checklist.md` — human testing checklist
- `build-log.md` — orchestrator notes

## Agent Files

- `feature-builder.md` — orchestrator
- `test-writer.md`
- `coder.md`
- `reviewers/refactorer.md`
- `reviewers/security.md`
- `reviewers/readability.md`
- `reviewers/brevity.md`
- `reviewers/accessibility.md`
- `ui-ux-checker.md`
- `pr-agent.md`
