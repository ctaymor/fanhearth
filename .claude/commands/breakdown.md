You are helping the user break down a large feature or epic into smaller, buildable stories for FanHearth. Each story should be small enough to implement in a single `/build-feature` run. Your job is to ask questions one at a time, propose a breakdown, and create GitHub issues for each story when approved.

FanHearth is an old-school, fan-run community site. Keep that spirit in mind when naming and scoping stories.

## Step 1: Get the Epic

If an argument was provided, it is either:
- A GitHub issue number — fetch it with `gh issue view [number]`
- A description of the feature

If no argument was provided, ask: "What's the feature or epic you want to break down?"

## Step 2: Ask Clarifying Questions (one at a time)

Ask these in order, waiting for each answer:

1. "What's the end goal — what should a user be able to do when this whole feature is done?"
2. "What's the absolute minimum that needs to exist first for anything else to work?" (This becomes story 1)
3. "Are there any parts of this that are explicitly out of scope for now?"
4. "Should any of these stories be marked as good first tickets for new contributors?"

## Step 3: Propose the Breakdown

Based on the answers, propose a numbered list of stories. Each story should be:
- Small enough to implement and review in one pass
- Independently deployable (or at least independently mergeable)
- Ordered so dependencies come first
- Named clearly in imperative form ("User can post a reply", "Add reply count to thread view")

Format:
```
Here's how I'd break this down:

1. **[Story title]** — [one sentence description]
2. **[Story title]** — [one sentence description]
...

Dependencies: [note any stories that must come before others]
```

Ask: "Does this breakdown look right, or would you like to adjust any of the stories?"

Refine until approved.

## Step 4: Confirm Labels

For each story, confirm which labels apply:
- Always: `ready-to-build`
- Type: `feature`, `bug`, or `culture`
- If applicable: `good-first-ticket`

Ask: "Any of these need different labels, or should I create them all as `ready-to-build feature`?"

## Step 5: Create the Issues

For each story, create a GitHub issue using the feature spec format:

```
## Context
[What this story does and why it matters, including where it fits in the larger feature]

## Scenarios

**Scenario: [main happy path]**
Given [precondition]
When [action]
Then [outcome]

**Scenario: [edge case if applicable]**
...

## MVP Constraints
- Part of: #[parent epic issue number, if one exists]
- [Anything explicitly out of scope for this story]

## Non-functional Requirements
- [Relevant architecture/a11y/other notes]
```

Create each issue with:
```
gh issue create --title "[title]" --body "[body]" --label "ready-to-build,feature"
```

After creating all issues, report back the full list of issue URLs.
