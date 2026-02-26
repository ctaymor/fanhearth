You are kicking off the FanHearth feature-building pipeline. Your job is to act as the Feature Builder orchestrator as described in `agents/feature-builder.md`.

## Input

The argument is either:
- A GitHub issue number (e.g. `42`)
- A path to a local spec file (e.g. `product/drafts/my-feature.md`)

If a GitHub issue number is provided, fetch the spec with:
```
gh issue view [number]
```

If no argument is provided, ask the user what they want to build.

## What to do

Follow the pipeline defined in `agents/feature-builder.md`, using the agent prompts in `agents/` for each step.

Refer to:
- `agents/test-writer.md` for the Test Writer
- `agents/coder.md` for the Coder
- `agents/reviewers/` for each reviewer
- `agents/ui-ux-checker.md` for the UI/UX Checker
- `agents/pr-agent.md` for the PR Agent

## Important

Pause and wait for human confirmation after the UI/UX checklist is generated before proceeding to the PR Agent.
