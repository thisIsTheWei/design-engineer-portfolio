---
name: scroll-animation
description: Implements animations for the portfolio using the CSS + Intersection Observer stack. Use when building entry reveals, staggered fades, or any scroll-triggered motion. Also use when deciding whether to escalate to Anime.js for scroll-progress-linked motion. NOT for hover effects or static CSS transitions.
---

# Skill: scroll-animation

## Overview

Selects the lowest-cost animation layer for the requirement, implements the correct pattern, enforces performance and accessibility requirements, and returns a verified implementation.

Always start at CSS. Escalate only when CSS genuinely cannot express the requirement.

## When to Use

- Building scroll-triggered entry reveals
- Staggering multiple elements on scroll enter
- Deciding between CSS and Anime.js
- Implementing scroll-progress-linked animation (parallax, sticky stacks) — escalation path below
- Debugging animation conflicts

Do NOT use when:
- Static CSS transitions or hover/focus states
- Infinite marquee loops
- Static layout or positioning

---

## Animation Layer Decision

```
Layer 1 — CSS keyframes / transitions (cheapest, default)
  ↓ needs scroll-position trigger?
Layer 2 — CSS + Intersection Observer (data-animation-fade-in pattern)
  ↓ needs continuous scroll-synced progress, spring physics, or complex choreography?
Layer 3 — Anime.js scroll-linked (NOT YET IN STACK — see escalation section)
```

| Use CSS only when | Use Intersection Observer when | Escalate to Anime.js when |
|---|---|---|
| Hover / focus state | Entry fade or slide on scroll into view | Scroll position drives animation progress |
| Infinite loop | Staggered entry for multiple items | Spring or bounce physics |
| Static layout | Simple in-view triggered reveal | Multi-element choreographed timeline |

---

## Layer 2 — CSS + Intersection Observer

### The `data-animation-fade-in` pattern

The site's built-in animation system. Zero JavaScript per-component — driven by a shared Intersection Observer in `src/scripts/`.

**Apply to any element:**

```html
<!-- Fade in on scroll enter -->
<div data-animation-fade-in>...</div>

<!-- Fade + slide up on scroll enter -->
<div data-animation-fade-in="from-bottom">...</div>
```

**Stagger multiple items** with `--animation-delay`:

```html
<ul>
  <li data-animation-fade-in="from-bottom" style="--animation-delay: 0s">...</li>
  <li data-animation-fade-in="from-bottom" style="--animation-delay: 0.1s">...</li>
  <li data-animation-fade-in="from-bottom" style="--animation-delay: 0.2s">...</li>
</ul>
```

**In Astro components:**

```astro
<div data-animation-fade-in="from-bottom">
  <slot />
</div>
```

### How it works

- `src/styles/animation/_fade.scss` — defines the initial hidden state and `.is-intersecting` active state
- `src/scripts/` — Intersection Observer adds `.is-intersecting` when the element enters the viewport
- Transition: `opacity 0.5s ease-in, transform 0.5s ease-in`
- Direction `from-bottom`: starts at `translateY(5%)`, settles to `translateY(0)`

### Rules

- Only animate `opacity` and `transform` — never layout properties (width, height, top, left)
- Maximum 3–4 staggered items per section at baseline motion intensity (3/10)
- Stagger delay increment: 0.1s per item is a natural rhythm — do not exceed 0.2s per step
- Do not apply `data-animation-fade-in` to every element in a section — select the 1–2 elements that benefit most

### Accessibility

Always verify that `prefers-reduced-motion` is respected. The global animation system should handle this — check `src/scripts/` to confirm the Intersection Observer respects it before adding new animated elements.

If adding a new animation outside the `data-animation-fade-in` system:

```scss
@media (prefers-reduced-motion: reduce) {
  [your-animated-element] {
    animation: none;
    transition: none;
  }
}
```

---

## Layer 3 — Anime.js (Future Escalation Path)

**Anime.js is not currently in the stack.** This section documents the escalation path for when CSS + Intersection Observer cannot express the requirement.

### When to escalate

Escalate from CSS to Anime.js only when:
- Animation progress must be continuously tied to scroll position (parallax, sticky stack, progress bar)
- Spring or bounce physics are required
- Multi-element choreographed timeline that cannot be expressed with stagger delays

Do not escalate for:
- Entry fades — use `data-animation-fade-in`
- Stagger up to 5 items — use CSS delay
- Hover/focus states — pure CSS

### How to add Anime.js (when needed)

1. Install: `npm install animejs`
2. Import via a wrapper hook — do not import `animejs` directly in components:
   ```ts
   // src/scripts/utils/useAnime.ts — create this wrapper
   import anime from 'animejs';
   export { anime };
   ```
3. Gate every animation block:
   ```ts
   import { prefersReducedMotion } from './utils/motion';
   if (!prefersReducedMotion()) {
     // anime setup here
   }
   ```
4. Apply static fallback positions before animating:
   ```ts
   // Set final/visible state on elements before anime runs
   // so reduced-motion users see the correct state
   ```
5. Only animate `transform` and `opacity` in scroll-linked loops

### Anime.js scroll pattern (reference, not active)

```ts
// When implemented, scroll-linked animation would follow this shape:
anime({
  targets: element,
  translateY: [50, 0],
  opacity: [0, 1],
  easing: 'easeOutQuad',
  // onScroll pattern ties progress to scroll position
});
```

See the work repo's `skills/scroll-animation/SKILL.md` for the full Anime.js contract — the `onScroll` enter/leave format, scroll-room rule, and `.link()` pattern apply when this stack is adopted here.

---

## Workflow

### Step 1 — Select the layer

State the selected layer and justification before writing any code.

- Entry fade on scroll → Layer 2 (`data-animation-fade-in`)
- Stagger on scroll → Layer 2 with `--animation-delay`
- Progress-linked / spring / choreography → Layer 3 (Anime.js, escalation)
- Hover / focus / loop → Layer 1 (pure CSS)

### Step 2 — Implement

For Layer 2: add `data-animation-fade-in` and `--animation-delay` attributes. No new SCSS or JS required — the system handles it.

For Layer 1: write CSS keyframes or transitions using token values only.

### Step 3 — Verify

- [ ] Only `opacity` and `transform` are animated
- [ ] `prefers-reduced-motion` respected
- [ ] Static state is correct without animation (fallback)
- [ ] No more than 3–4 animated elements per section
- [ ] Motion intensity matches baseline (3/10) unless brief specifies otherwise

---

## Cross-Skill References

- Design direction and motion strategy → `design-system-taste`
- Token values for durations and easing → `design-token-mapping`
