# FanHearth mockup structure

This describes the page structure and feed architecture reflected in the mockups. For the *why* behind these choices, see [`product/user_experience.md`](../product/user_experience.md).

## Navigation (sidebar)

- **My Profile**
- **Following** — main feed of people you follow
- **The Third Place** — discovery destination
- **Pods** (section) — your pods listed individually
- **Fandoms** (section) — fandoms you've joined, listed individually

For the mockup, fandom and pod sections each show a fixed handful. How the nav handles a user with many fandoms/pods (dropdown, scroll, collapse) is a build-time decision.

## Following page

The main feed. Shows posts from everyone you follow.

- **Moots filter toggle**: on the page itself (not the nav). When on, the feed narrows to mutuals only. Same feed, subset view — not a separate destination.

## The Third Place

Discovery destination. Named after Ray Oldenburg's concept of informal gathering spots (cafés, barbershops) that aren't home or work — where community forms through casual encounter. First-time visitors get a short tooltip or intro explaining the name.

Discovery here is **graph-rooted**: every surfaced post should be traceable to a choice the user has made. No global "for you" algorithm, no engagement-velocity ranking.

Signals we draw on (not the full algorithm, just the shape):

- Active-but-unfollowed people posting in fandoms you follow
- Posts your moots have interacted with
- Cross-fandom overlap — posts that bridge two of your fandoms
- Moot drift — multiple moots picking up a new fandom
- Serendipity — random-from-your-fandoms surface

Posts in this feed should carry a **visible hook** indicating why they're there ("from [fandom you follow]", "3 moots liked this", etc.), so the surfacing is transparent.

## Fandom page

Each fandom has its own page.

- **Main fandom feed** — posts tagged to this fandom
- **"New voices here" module** (sidebar) — active-but-unfollowed people in this fandom, to help discovery stay scoped to opt-in spaces

## Guiding principles

- **No global algorithm.** Every post in any feed is traceable to a choice the user made.
- **Person-first matters too, not just post-first.** Discovery surfaces should sometimes highlight *people* with multiple overlaps, not only posts. Bio + pinned + recent posts do the heavy lifting once attention is hooked.
- **Strangers are gated by fandom opt-in.** Someone you've never met can only reach you by opting into a fandom you're posting in. This keeps discovery warm and removes the stranger-audience that drives loyalty-test posting.
