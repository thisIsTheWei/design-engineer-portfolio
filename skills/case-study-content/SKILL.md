---
name: case-study-content
description: Step-by-step procedure for adding or editing a case study in the portfolio. Covers frontmatter schema, asset structure, MDX component patterns, and collection registration. Use whenever creating or updating a work case study.
---

# Skill: case-study-content

## Overview

Adds a new case study or edits an existing one. Covers the full path: frontmatter, assets, MDX content, and validation.

## When to Use

- Adding a new project to the work collection
- Editing frontmatter or content of an existing case study
- Checking the correct schema before making changes

Do NOT use when:
- Working on blog posts — the blog collection has a different schema
- Adding new MDX components to the system — that's a component architecture task

---

## Workflow

### Step 1 — Create the MDX file

Create a new file in `src/content/work/`:

```
src/content/work/[project-slug].mdx
```

Naming: use kebab-case, descriptive, matches the project's public identity.

---

### Step 2 — Write the frontmatter

All fields must match `src/content.config.ts` exactly. Required fields are marked.

```yaml
---
eyebrow: "Short phrase describing the project type"  # required
meta_data:                                            # required
  title: "SEO page title"
  description: "SEO meta description — 1–2 sentences"
title: "The display title — can include <span> for highlights"  # required
description: "1–2 sentence summary shown on the work index"     # required
featured: true                                        # optional — true for hero-weight items
feature_image:                                        # required
  src: "/assets/[project-slug]/featured-hero.jpg"
  alt: "Descriptive alt text for the feature image"
urls:                                                 # required — at least one
  - label: "Live site name"
    url: https://example.com
  # OR a plain string for a single unlabeled URL:
  # - https://example.com
keywords:                                             # optional — displayed as tags
  - Web
  - Design System
theme: primary                                        # required — primary | secondary | tertiary | quaternary
enable_case_study: true                               # optional — false hides the full case study page
order: 5                                              # required — controls display sort order (lower = earlier)
asset_folder: "/assets/[project-slug]/"              # optional — used by image components in MDX
---
```

**Theme assignment guide:**
- `primary` — purple tones (most prominent projects)
- `secondary` — red/coral
- `tertiary` — yellow
- `quaternary` — orange

Pick based on which color feels right for the project's identity — no strict rule, but avoid assigning the same theme to adjacent items in the `order` sequence.

---

### Step 3 — Set up the asset folder

Create the asset folder under `public/assets/`:

```
public/assets/[project-slug]/
  featured-hero.jpg     ← feature_image.src points here
  [other-images].jpg
  [videos].mp4
```

Rules:
- Image filenames: kebab-case, descriptive
- Feature hero: minimum 1200px wide, 16:9 or 4:3 ratio works well
- Never invent asset filenames — use only files that exist or that the user provides

---

### Step 4 — Write the MDX body

After the frontmatter, the MDX body is the case study content. Available components:

#### `<InfoTextColumns>`

Displays the project metadata row (Role, Company, Tools, Year).

```mdx
<InfoTextColumns data={{
  ROLE: "Your role",
  COMPANY: "Client / Company",
  TOOL: "Tools, comma-separated",
  YEAR: "2023",
}} />
```

#### `<FullSizeFeatureImage>`

Full-width image section.

```mdx
<FullSizeFeatureImage
  src="/assets/[project-slug]/image.jpg"
  alt="Descriptive alt text"
/>
```

#### Standard MDX prose

Regular markdown headings, paragraphs, lists, and blockquotes work as expected. The global SCSS styles apply via `src/styles/base/`.

Heading hierarchy within a case study body:
- `##` — major section (renders as h2)
- `###` — subsection (renders as h3)
- Do not use `#` (h1) inside the body — the page title is already h1

#### Images and videos

For case study images not wrapped in a component, use standard MDX image syntax or the available image/video wrapper components. Never use hardcoded paths — all asset paths must be under `public/assets/[project-slug]/`.

---

### Step 5 — Assign `order`

Check existing case studies to pick the right order value:

```
src/content/work/
  chrome-enterprise-redesign.mdx      → order: 1
  graphite-studio-visual-rebirth.mdx  → order: 2
  (check others for current values)
```

Lower number = appears earlier on the work index. Insert the new case study at the appropriate position and renumber others only if sequence matters.

---

### Step 6 — Validate

Run the build to check for schema errors and content collection issues:

```bash
npm run build
```

Common errors:
- Missing required frontmatter field → add it
- Wrong `theme` value → must be `primary | secondary | tertiary | quaternary`
- Image `src` path that doesn't match a file in `public/assets/` → verify the file exists or ask the user for it

---

## Schema Quick Reference

```ts
// From src/content.config.ts
{
  eyebrow: string                          // required
  meta_data: { title: string, description: string }  // required
  title: string                            // required — HTML allowed via <span>
  description: string                      // required
  featured?: boolean                       // optional
  feature_image: { src: string, alt: string }  // required
  urls: Array<string | { label: string, url: string }>  // required
  keywords?: string[]                      // optional
  theme: "primary" | "secondary" | "tertiary" | "quaternary"  // required
  order: number                            // required
  enable_case_study?: boolean              // optional — defaults to showing page
  asset_folder?: string                   // optional
}
```

---

## Existing Case Studies Reference

| File | Theme | Order | Featured |
|---|---|---|---|
| `chrome-enterprise-redesign.mdx` | primary | 1 | true |
| `graphite-studio-visual-rebirth.mdx` | (check) | (check) | (check) |
| `chromebook-10th-birthday.mdx` | (check) | (check) | (check) |
| `chromebook-news-service.mdx` | (check) | (check) | (check) |
| `reimaging-arcadyan.mdx` | (check) | (check) | (check) |
| `transforming-chrome-product-stribution.mdx` | (check) | (check) | (check) |

Run `grep -l "order:" src/content/work/*.mdx` or read individual files for current values.

---

## Cross-Skill References

- Visual direction for the case study page layout → `design-system-taste`
- Token lookups for any custom styling → `design-token-mapping`
