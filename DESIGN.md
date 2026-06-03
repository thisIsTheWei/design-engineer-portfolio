# DESIGN.md

Visual brand brief for Wei-Hsin Chen's portfolio.
Read this before any UI work — component composition, layout decisions, and motion strategy all flow from here.

---

## §1 Visual Theme

**Atmosphere:** Craft-forward and precise. The portfolio signals a design engineer who operates at the intersection of design systems and production code. The aesthetic should feel considered, not decorated — confident structure, purposeful restraint.

**Character:**
- Bold typographic hierarchy (Paytone One at display scale commands attention)
- Structured layouts with intentional asymmetry — not centered-everything
- Dark mode is the signature surface; light mode is equally resolved
- Accent color use is disciplined — one dominant accent per section

**Anti-patterns to avoid:**
- Centered hero with equal-weight text and media on every section
- Soft, low-contrast palettes in dark mode
- Motion for motion's sake — no entrance animations on every element
- Generic three-equal-column grids without hierarchy

**Design dials — baseline (override when brief specifies):**

| Dial | Default | Meaning |
|---|---|---|
| Design variance | 6 / 10 | Intentional asymmetry, section rhythm, not symmetric sameness |
| Motion intensity | 3 / 10 | Purposeful fade-in on content entry — no scroll choreography by default |
| Visual density | 4 / 10 | Standard portfolio density — breathable but not sparse |

---

## §2 Color

### Palette

| Role | SCSS variable | Light value | Dark value |
|---|---|---|---|
| Page background | `$color-background-default` / `$color-background-default-dark` | `#F8F9FA` (neutral-100) | `#212529` (neutral-900) |
| Body text | `$body-text-color` / `$body-text-color-reverse` | `#343A40` (neutral-800) | `#DEE2E6` (neutral-300) |
| Heading text | `$heading-text-color` / `$heading-text-color-reverse` | `#343A40` (neutral-800) | `#F8F9FA` (neutral-100) |
| Primary accent | `$primary-700` | `#4A3379` | same |
| Secondary accent | `$secondary-700` | `#CB3A2A` | same |
| Tertiary accent | `$tertiary-700` | `#FAB51D` | same |
| Quaternary accent | `$quaternary-700` | `#F77B0F` | same |

### Theme system

The site uses a CSS custom property theme system toggled via `.theme-dark` on `:root`. All colors reference `--clr-*` variables, not raw SCSS values in component styles.

Key CSS variables:
- `--clr-background` — page background
- `--clr-ff-body` — body text
- `--clr-ff-headline` — heading text
- `--clr-highlight-primary/secondary/tertiary/quaternary` — adaptive accent per theme

### Case study themes

Each work item declares a `theme` field (`primary` | `secondary` | `tertiary` | `quaternary`). Use `--clr-highlight-{theme}` for the accent color on that case study's page.

### Accent discipline

- One highlight color per section — do not layer multiple accents
- Use `clr(primary, base)` for interactive elements (links, buttons) by default
- Highlights (`$color-highlight-*`) are for emphasis text only — not backgrounds unless intentional

---

## §3 Typography

### Fonts

| Role | Font | SCSS variable |
|---|---|---|
| Display / headings | Paytone One | `$font-family-brand` / `--ff-headline` |
| Body / UI | DM Sans | `$font-family-base` / `--ff-body` |

### Hierarchy rules

- **Display headings** — `$font-family-brand` (Paytone One). Used for page titles, hero headings, case study titles. Avoid using it for subheadings or body-level labels.
- **Body and UI text** — `$font-family-base` (DM Sans). All prose, captions, navigation, metadata.
- **Eyebrows / labels** — DM Sans uppercase with `$letter-spacing-loose` (0.75px). Not a third typeface — just tracked-out DM Sans.

### Line heights

- Headings: `$heading-line-height` = 1.1
- Display: `$display-line-height` = 1.1, `$display-line-height-tight` = 0.9 (for very large display text)
- Body: `$body-line-height` = 1.5

### Font sizes

| Token | Value |
|---|---|
| `$font-size-default` | 16px |
| `$font-size-large` | 18px |
| `$font-size-small` | 14px |
| `$font-size-tiny` | 12px |

### Rules

- Never declare `font-family`, `font-size`, `font-weight`, `line-height`, or `letter-spacing` ad hoc in component SCSS. Use tokens.
- Heading elements (`h1`–`h4`) inherit `$font-family-brand` from global base styles — do not re-declare.

---

## §4 Spacing and Layout

### Size tokens

`$size-1` (4px) through `$size-15` (160px). Formula: `$size-N` = N steps, starting at 4px.

Common values:
- `$size-4` = 16px (base unit)
- `$size-6` = 24px (gap default)
- `$size-8` = 32px
- `$size-10` = 48px
- `$size-11` = 64px (section spacing)

### Containers

- Default max-width: `$container-max-width` = 64rem (1024px)
- Narrow: `$container-max-width-narrow` = 40rem (640px)
- Wide: `$container-max-width-wide` = 75rem (1200px)

### Breakpoints

| Key | Value | Usage |
|---|---|---|
| `s` | 480px | Small phones |
| `m` | 768px | Tablets / landscape phone |
| `l` | 1024px | Desktop |
| `xl` | 1440px | Wide desktop |

Usage: `@include mq(m)` (min-width) / `@include mq-max(m)` (max-width)

### Section rhythm

- `$section-spacing` = 64px — standard gap between sections
- Alternate compositional direction between sections (left-heavy → right-heavy → centered break) — avoid stacking same-structure sections
- Section titles: padding-bottom `$size-4`, margin-bottom `$size-10`, with a `1px solid` primary border underneath

---

## §5 Motion

### Philosophy

Motion intensity default is 3/10 — understated. The portfolio communicates quality through composition and craft, not animation volume.

### Current animation system

CSS-only with Intersection Observer via `data-animation-fade-in` attribute.

- Apply `data-animation-fade-in` to an element for a fade-in on scroll enter
- Apply `data-animation-fade-in="from-bottom"` for fade + upward slide (translateY 5%)
- Delay via `--animation-delay` CSS custom property
- Triggered by `.is-intersecting` class added by the Intersection Observer in `src/scripts/`

### Motion rules

- Fade-in on first scroll into view: appropriate and encouraged for content sections
- Do not animate more than 2–3 distinct elements per section
- Do not animate layout properties (width, height, top, left) — only `opacity` and `transform`
- Always respect `prefers-reduced-motion` — the animation system should respect this globally
- Scroll-progress-linked animation (parallax, sticky stacks): not currently in the stack — escalate to Anime.js when needed (see `skills/scroll-animation/`)

### Future: Anime.js

Not yet in the stack. See `skills/scroll-animation/SKILL.md` for the escalation path when CSS cannot express the requirement.

---

## §6 Component Patterns

### Existing component categories

- **Global** (`src/components/global/`) — Header, Footer, MainHead
- **Composable** (`src/components/composable/`) — reusable UI elements
- **Case study** — InfoTextColumns, FullSizeFeatureImage, etc.
- **Image/video** — optimized wrappers

### Selection order

1. Check if an existing composable component covers the need
2. Combine existing components
3. Last resort — create new; document why existing components didn't apply

### Astro Islands

Use `client:*` directives only when genuinely required (event handlers, browser APIs, stateful interactions). Static rendering is the default.
