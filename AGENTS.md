# AGENTS.md

Agent instructions for Wei-Hsin Chen's portfolio site.
Read by Claude Code, Cursor, Codex, and any agent that supports AGENTS.md.

Tool-specific additions:
- **Claude Code:** `CLAUDE.md` — commands, architecture detail, routing patterns
- **Design brief:** `DESIGN.md` — atmosphere, color, typography, motion — read before any UI work

---

## Stack

- Astro 5.1.8 — SSG, content collections, MDX
- TypeScript — strict mode, no `any`
- SCSS — custom design system, no Tailwind, no Bootstrap
- MDX — content authoring for case studies and blog posts
- Netlify — deployment, 404 handling
- npm — never suggest pnpm or yarn

## Repo structure

```
src/
  components/
    global/       ← Header, Footer, MainHead
    composable/   ← Reusable UI elements
  content/
    work/         ← Case study MDX files
    blog/         ← Blog post MDX files
  pages/
    work/[...slug].astro   ← Dynamic case study pages
    blog/[...slug].astro   ← Dynamic blog pages
  scripts/
    utils/        ← Navigation, theme toggle, scroll, Intersection Observer
  styles/
    abstracts/    ← Tokens: colors, sizes, typography, mixins, breakpoints
    base/         ← Reset, root CSS vars, global styles
    animation/    ← Fade, slide, scale, pop keyframes
    utilities/    ← Container, spacing, flow, etc.
    composible/   ← Composable SCSS patterns
public/
  assets/         ← Case study assets, resume PDF, favicon
```

## Policy ownership

| Concern | File |
|---|---|
| Visual and brand brief | `DESIGN.md` — read before any UI work |
| Architecture and commands | `CLAUDE.md` |
| Repeatable skill procedures | `skills/*/SKILL.md` |
| Agent behavior | `AGENTS.md` (this file) |

## Core guardrails

### Package manager
- `npm` only — never pnpm or yarn

### TypeScript
- Strict mode — no `any`, no implicit types
- Named exports preferred

### SCSS and tokens
- No hardcoded hex, rgb, px, or ms values — always use design tokens from `src/styles/abstracts/`
- No ad hoc `font-family`, `font-size`, `font-weight`, `line-height`, or `letter-spacing` in component SCSS — use token variables
- No Tailwind, no Bootstrap, no inline styles
- Every SCSS file that needs tokens: `@use '../abstracts' as *;` (adjust path depth)
- Color access via `clr(palette, variant)` function — e.g. `clr(primary, base)`

### Astro Islands
- `client:*` directives only when genuinely required (event handlers, browser APIs, stateful interactions)
- Static rendering is the default

### Animation
- CSS-first — use `data-animation-fade-in` + Intersection Observer for entry reveals
- Escalate to Anime.js only when CSS cannot express the requirement (scroll-progress-linked motion, spring physics)
- Only animate `transform` and `opacity` — never layout properties
- Always provide static fallback for animated elements

### Content generation
- Never invent URLs, image paths, or asset filenames — ask the user
- Never add sections or copy not present in source material
- Content collection frontmatter must match the schema in `src/content.config.ts` exactly

### Git
- Conventional commits: `feat`, `fix`, `refactor`, `perf`, `test`, `chore`, `docs`

## Skills

Skills are step-by-step execution procedures for repeatable tasks. They live in `skills/` at the repo root.

| Skill | Path | Activates when |
|---|---|---|
| Design token mapping | `skills/design-token-mapping/SKILL.md` | Looking up which SCSS token to use for a visual property |
| Design system taste | `skills/design-system-taste/SKILL.md` | Art direction, anti-generic layouts, brand direction |
| Scroll animation | `skills/scroll-animation/SKILL.md` | Implementing entry animations, scroll-linked motion, Anime.js escalation |
| Case study content | `skills/case-study-content/SKILL.md` | Adding or editing a case study — schema, assets, MDX patterns |

## Specialist agents

| Agent | File | Use when |
|---|---|---|
| Code reviewer | `agents/code-reviewer.md` | Reviewing code changes against this site's conventions |

## Session starter prompts

Default:
`Read AGENTS.md and DESIGN.md. Prioritize repo rules, then skill procedures.`

Implementation + validation:
`Make changes in-repo, run npm run build to validate, return file paths and next actions.`
