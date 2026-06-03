---
name: design-token-mapping
description: Quick reference for which SCSS token to use for any visual property in the portfolio. Use when writing component SCSS and unsure of the correct variable name. NOT for design direction — use design-system-taste for that.
---

# Skill: design-token-mapping

## Overview

Look up the correct SCSS token before writing any value. No hardcoded hex, px, rgb, or ms values in component styles — every visual property has a token.

## When to Use

- Writing component SCSS and need the right variable name
- Checking which color to use for a surface, text, or accent
- Looking up a spacing, radius, or z-index value
- Verifying the correct breakpoint key

Do NOT use when:
- Deciding *which* design direction to take → `design-system-taste`
- Implementing animation → `scroll-animation`

## How to Access Tokens

Every SCSS file must import abstracts at the top:

```scss
@use '../abstracts' as *; // adjust path depth as needed
```

This gives access to all tokens, mixins, and the `clr()` function.

---

## Colors

### Access pattern

```scss
clr(palette, variant)
// e.g. clr(primary, base)  →  #4A3379
// e.g. clr(neutral, dark)  →  #343A40
```

### Palettes and variants

| Palette | base | light | lighter | lightest | dark | darker |
|---|---|---|---|---|---|---|
| `primary` | `#4A3379` | `#563D91` | `#8B7CC1` | `#E9E5F6` | `#3E2A62` | `#32274A` |
| `secondary` | `#CB3A2A` | `#EF5543` | `#FF9185` | `#FFEBE9` | `#A72A1D` | `#831A10` |
| `tertiary` | `#FAB51D` | `#FAB81D` | `#FFD54F` | `#FFF8E1` | `#F57F17` | `#EB6600` |
| `quaternary` | `#F77B0F` | `#FF9038` | `#FFBA84` | `#FFF5EB` | `#E56600` | `#883300` |
| `neutral` | — | — | — | — | — | — |

Neutral variants: `black`, `white`, `base` (#495057), `dark` (#343A40), `darker` (#212529), `light` (#DEE2E6), `lighter` (#E9ECEF), `lightest` (#F8F9FA)

### Semantic tokens (use these in components)

| Token | Value | Use |
|---|---|---|
| `$color-background-default` | `clr(neutral, lightest)` | Light mode page background |
| `$color-background-default-dark` | `clr(neutral, darker)` | Dark mode page background |
| `$body-text-color` | `clr(neutral, dark)` | Light mode body text |
| `$body-text-color-reverse` | `clr(neutral, lighter)` | Dark mode body text |
| `$heading-text-color` | `clr(neutral, dark)` | Light mode heading |
| `$heading-text-color-reverse` | `clr(neutral, lightest)` | Dark mode heading |
| `$color-button-primary` | `clr(primary, base)` | Primary button background |
| `$color-tag-background` | `clr(secondary, lightest)` | Tag/badge background |
| `$color-callout-background` | `clr(primary, lightest)` | Callout/aside background |

### Highlight tokens (theme-aware, use via CSS vars)

In component SCSS use `var(--clr-highlight-primary)` etc. — these switch automatically between light/dark:

- `var(--clr-highlight-primary)` — purple
- `var(--clr-highlight-secondary)` — red/coral
- `var(--clr-highlight-tertiary)` — yellow
- `var(--clr-highlight-quaternary)` — orange

---

## Spacing

`$size-1` through `$size-15`. Formula: step × 4px up to step 8, then larger jumps.

| Token | Value | Common use |
|---|---|---|
| `$size-1` | 4px | Micro gaps, icon nudges |
| `$size-2` | 8px | Tight internal padding |
| `$size-3` | 12px | Small gaps |
| `$size-4` | 16px | Base unit, default padding |
| `$size-5` | 20px | |
| `$size-6` | 24px | Grid gap, standard internal padding |
| `$size-7` | 28px | |
| `$size-8` | 32px | Medium section padding |
| `$size-9` | 40px | |
| `$size-10` | 48px | Section title margin-bottom |
| `$size-11` | 64px | Section spacing |
| `$size-12` | 80px | |
| `$size-13` | 96px | Large section padding |
| `$size-14` | 128px | |
| `$size-15` | 160px | Hero padding |

Layout tokens built from sizes:
- `$grid-gap` = `$size-6` (24px)
- `$section-spacing` = `$size-11` (64px)
- `$section-title-padding-block-end` = `$size-4` (16px)
- `$section-title-margin-block-end` = `$size-10` (48px)

---

## Typography

| Token | Value | Use |
|---|---|---|
| `$font-family-brand` | Paytone One | Headings, display text |
| `$font-family-base` | DM Sans | Body, UI, labels |
| `$font-weight-default` | 400 | Normal |
| `$font-weight-medium` | 500 | Slightly emphasized |
| `$font-weight-bold` | 700 | Bold |
| `$font-size-default` | 16px | Body text |
| `$font-size-large` | 18px | Lead text |
| `$font-size-small` | 14px | Secondary text, metadata |
| `$font-size-tiny` | 12px | Captions, tags |
| `$letter-spacing-tight` | -0.02em | Large display headings |
| `$letter-spacing-loose` | 0.75px | Eyebrows / uppercase labels |
| `$heading-line-height` | 1.1 | All headings |
| `$body-line-height` | 1.5 | All body text |
| `$display-line-height-tight` | 0.9 | Very large display text |

---

## Border radius

| Token | Value | Use |
|---|---|---|
| `$border-radius-1` | `$size-3` (12px) | Small elements (tags, chips) |
| `$border-radius-2` | `$size-6` (24px) | Buttons, cards |
| `$border-radius-3` | `$size-9` (40px) | Pills, tags default |

Token aliases:
- `--border-radius-1` and `--border-radius-2` also available as CSS custom properties

---

## Z-index

Use `z(layer)` function:

```scss
z-index: z(header);  // 100
```

| Layer | Value |
|---|---|
| `below` | -1 |
| `base` | 1 |
| `header` | 100 |
| `modal` | 200 |
| `tooltip` | 300 |
| `topmost` | 1000 |

---

## Breakpoints

Use `@include mq(key)` for min-width, `@include mq-max(key)` for max-width:

```scss
@include mq(m) { ... }      // 768px and up
@include mq-max(m) { ... }  // below 768px
```

| Key | Value |
|---|---|
| `s` | 480px |
| `m` | 768px |
| `l` | 1024px |
| `xl` | 1440px |

---

## Easing

| Token | Value | Use |
|---|---|---|
| `$easeInOutQuart` | `cubic-bezier(0.76, 0, 0.24, 1)` | Smooth enter/exit |
| `$easeOutQuad` | `cubic-bezier(0.5, 1, 0.89, 1)` | Quick-out settle |

---

## Containers

| Token | Value |
|---|---|
| `$container-max-width` | 64rem (1024px) |
| `$container-max-width-narrow` | 40rem (640px) |
| `$container-max-width-wide` | 75rem (1200px) |
| `$container-min-margin-inline` | `$size-4` (16px) |
