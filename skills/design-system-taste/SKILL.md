---
name: design-system-taste
description: Applies Wei-Hsin Chen's portfolio brand character and design quality direction to UI work. Use when asked for stronger design direction, less-generic layouts, visual hierarchy decisions, section rhythm, art direction, or motion strategy. Also use when AI output looks too centered, too safe, or too generic. NOT for specific token lookups — use design-token-mapping for that.
---

# Skill: design-system-taste

## Overview

Applies the portfolio's brand character to layout proposals, component compositions, and motion strategy. Prevents generic AI-default output — centered heroes, equal three-card rows, soft palettes, decorative motion — by applying direction from `DESIGN.md`.

This skill produces a direction statement, layout choices, and motion strategy. It does not produce code. Hand off to the relevant implementation after direction is set.

## When to Use

- "Make this less generic"
- "Give this stronger design direction"
- "What layout should this section use?"
- "This feels too safe / too centered"
- "What motion fits here?"
- Reviewing AI-generated UI output before committing

Do NOT use when:
- The question is specifically about which SCSS token to use → `design-token-mapping`
- Implementing animation → `scroll-animation`
- Adding a case study → `case-study-content`

## Required Reading

Read `DESIGN.md` at the repo root first — §1 Visual theme, §2 Color, §3 Typography — for atmosphere, palette, type roles. This skill adds procedure and checklists. It does not duplicate `DESIGN.md`.

---

## Design Dials — Baseline

When the brief does not override:

| Dial | Default | Meaning |
|---|---|---|
| Design variance | 6 / 10 | Intentional asymmetry, alternating section composition |
| Motion intensity | 3 / 10 | Purposeful entry fade only — no scroll choreography by default |
| Visual density | 4 / 10 | Standard portfolio density — breathable but not sparse |

**Dial interpretation:**
- Variance 1–3: symmetrical, predictable. 4–7: offset, mild asymmetry. 8–10: editorial asymmetry (must still collapse cleanly on mobile).
- Motion 1–3: no animation or hover-only. 4–7: staggered reveals. 8–10: scroll choreography — explicit request + strict a11y/perf checks required.
- Density 1–3: spacious. 4–7: standard. 8–10: information-rich.

---

## Workflow

### Step 1 — Read the brief and current output

Identify:
- What is the section communicating?
- What is the current layout structure? (centered? equal columns? generic grid?)
- Where does it fall short of the brand character?

### Step 2 — Apply the anti-generic checklist

Flag any of these and propose the correction:

| Generic pattern | Brand-aligned alternative |
|---|---|
| Centered hero with equal-weight text and media | Hard split with dominant side, or full-bleed media with text overlay |
| Three equal feature cards | Staggered grid or alternating spotlight sections with hierarchy |
| Soft, low-contrast surface | `$color-background-default-dark` in dark mode — near-black, not charcoal grey |
| Sans-serif display heading | `$font-family-brand` (Paytone One) at display scale |
| Tracking-free label text | DM Sans uppercase with `$letter-spacing-loose` (0.75px) |
| Decorative motion on every element | 1–2 purposeful entry fades per section, or no motion |
| Accent color applied to multiple elements per section | Single accent — one element, one role |
| Case study grid without visual rhythm | Vary card weight by `featured` flag or alternate row composition |

### Step 3 — Propose layout direction

State the layout approach concretely.

**Section rhythm:**
- Alternate composition direction between sections (left-heavy → right-heavy → centered break)
- Use a minimal full-width break section as pacing between dense content sections
- Hero sections should breathe — do not follow immediately with another dense section

**Asymmetry:**
- Split layouts should feel weighted, not 50/50 — give text or media dominant space based on content priority
- Work/case study grid: use `featured` entries for visual hierarchy — featured items can span or lead

**Dark mode surfaces:**
- Dark mode background is near-black (`#212529`), not a soft dark grey
- High-contrast heading text (`$heading-text-color-reverse` = near-white)
- Accent colors lighten in dark mode via CSS custom properties automatically — do not manually override

### Step 4 — Confirm typography hierarchy

- Display headings: `$font-family-brand` (Paytone One) — page title, hero heading, section headline
- Eyebrows / labels: DM Sans uppercase, `$letter-spacing-loose`
- Body: DM Sans, `$font-family-base`, does not compete with display headings
- Never declare font properties ad hoc in component SCSS — use tokens

### Step 5 — Propose motion strategy

Default motion intensity is 3/10:

**Use entry fade when:**
- A section introduces new content on scroll
- Cards or list items benefit from staggered entry (max 3–4 items staggered)

**Do not add motion when:**
- The section is already visually dense
- The motion would be purely decorative
- The page already has 2+ animated sections

State the motion strategy explicitly: which sections animate, which don't, and why.

### Step 6 — Return direction statement

```
Direction statement
---
Atmosphere: [1-2 sentences on mood and surface approach]
Layout: [specific composition choices per section]
Typography: [hierarchy decisions — which scale, which family, where]
Motion: [which sections animate, which don't, and why]
Token anchors: [2-3 key token references — defer full lookup to design-token-mapping]
Anti-generic flags: [what was changed and why]
```

---

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The centered layout is neutral and works for everyone" | Neutral reads as generic. The brand is precise and craft-forward — centered equal-weight is the default AI output, not a deliberate choice. |
| "Adding a fade to every section feels polished" | Motion at 3/10 means 1–2 purposeful animations per page. Animating everything dilutes impact and adds noise. |
| "Sans-serif is fine for the heading here" | Display headings use Paytone One. Sans-serif at heading scale is a brand miss. |
| "I'll use the accent on the heading and the link" | Accent is a single element per section. Applying it broadly dilutes hierarchy. |
| "Three equal columns is a clean layout" | Equal columns signal equal importance — which is rarely true for portfolio work. Vary weight to establish hierarchy. |

---

## Red Flags

- Display headings in `$font-family-base` (DM Sans)
- Accent color applied to more than one element per section
- Every section on a page has an animation
- Centered layout with equal-weight split used as default for every section
- Low-contrast dark mode (soft grey background instead of near-black)
- Motion added without a stated rationale
- Case study grid with every item the same visual weight

---

## Verification

- [ ] Anti-generic checklist applied — at least one generic pattern identified and corrected
- [ ] Layout direction stated concretely
- [ ] Typography hierarchy confirmed: Paytone One for display, DM Sans for body/labels
- [ ] Motion strategy stated: which sections animate, which don't, why
- [ ] Accent scoped to one element per section
- [ ] Direction statement formatted and ready to hand off to implementation

---

## Cross-Skill References

- Specific token lookups → `design-token-mapping`
- Animation implementation → `scroll-animation`
- Adding a case study → `case-study-content`
