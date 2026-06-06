# Portfolio Case Studies — Roblox Work
## Planning Doc for weidesign.engineer

---

## Context & Priority

Your current portfolio has 6 case studies, all from Huge/Google.
For the Anthropic Design Engineer role — and design engineering roles generally —
you need at least 1–2 Roblox case studies that show:

- Design + engineering ownership (not just implementation)
- Interactive / motion work
- AI-augmented workflow
- Systems thinking at scale

Recommended: add 2 case studies. One focused on interactive design engineering,
one focused on AI workflow tooling. Both exist in your 2025–2026 Roblox work.

---

## Case Study 1 — Roblox Corporate Web Platform Migration
**Priority: High**
**Angle: Design engineering at scale — performance, systems, craft**

### Why this case study
This is your proof of design-engineering ownership at the platform level.
It shows you can architect a system, ship it under deadline, and measure results.
Directly mirrors what Anthropic's Brand Web team does.

### Suggested title
"Rebuilding Roblox's Web Platform — From Legacy Angular to a Modern Design System"

### Narrative arc
Problem → Architecture decisions → Design system build → Results

### Key story beats
1. The problem: 4 corporate sites on aging AngularJS, inconsistent components,
   no shared design language, slow content team workflows
2. The decisions: Next.js + Turborepo monorepo, SSR/ISR, cms-transformers
   abstraction layer, Payload CMS
3. The design system: component library, design token migration, Figma sync
4. The results: ship in 4 months, Core Web Vitals all green

### Metrics to feature
- LCP: 3.99s → 2.32s (42% faster)
- INP: 298ms → 129ms (57% faster)
- CLS: 0.11 → 0.00 (eliminated)
- 60+ components migrated across 4 properties
- 16 → 24 locales via DeepL AI pipeline

### Visuals to prepare
- Before/after Core Web Vitals screenshots (PageSpeed Insights)
- Component library overview / Storybook screenshots
- Architecture diagram: monorepo structure, CMS adapter layer
- Live site screenshots: Brand, Corp, Careers, Engineer sites

### Tags (matching your existing portfolio style)
- Next.js / React
- Design System
- Performance Optimization
- CMS Architecture
- Localization
- Turborepo

---

## Case Study 2 — Roblox AI Workflow System
**Priority: High**
**Angle: Internal tooling + AI-assisted design engineering**
**This is your differentiator — no one else on the market has this**

### Why this case study
The Anthropic Creative Studio explicitly calls out "internal tools that help teams
author, manage, and publish content" and "AI-assisted development workflows" as
qualifications. This case study answers both directly.

### Suggested title
"Building an AI Workflow System — How We Gave Designers a Coding Superpower"

### Narrative arc
Problem → System design → Key capabilities → Impact

### Key story beats
1. The problem: designers had ideas, developers had backlog, AI tools produced
   inconsistent output that drifted from the design system
2. The insight: AI needs structure to produce trustworthy output — rules,
   playbooks, a canonical brand spec
3. The system: 3-layer architecture (Rules → Skills → Agents), 64-component
   registry, DESIGN.md brand spec, confidence-gated selection
4. The impact: designers can brief a page and get near-production code;
   developers review rather than build from scratch; design system compliance
   is structural, not person-dependent

### Metrics / evidence to feature
- 14 always-on Cursor rules
- 8 execution playbooks
- 64-component registry with confidence-gated selection (< 0.80 = ask user)
- 3 scoped AGENTS.md levels (monorepo, playground app, UI package)
- Works across Cursor, Claude Code, Codex, Gemini — not vendor-locked

### Visuals to prepare
- System architecture diagram (3 layers: Rules / Skills / Agents)
- Screenshot or screen recording of a design brief → prototype output
- DESIGN.md excerpt showing the machine-readable brand spec structure
- Component registry visual (categories: Heroes, Features, Panels, etc.)
- Before/after: what AI-generated code looked like without the system vs. with

### Tags
- AI Workflow Engineering
- Internal Tooling
- Rapid Prototyping
- Design System
- Developer Experience
- Claude Code / Cursor

---

## Case Study 3 (Optional) — Cube AI Landing Page
**Priority: Medium**
**Angle: Interactive design engineering, 3D, motion**
**Add this if you want a third case study focused purely on craft**

### Why this case study
Shows your motion and interactive design capabilities — scroll-driven UX,
Three.js 3D model player, taking a project from design concept to production.
Most relevant for roles that specifically want interactive/animation experience.

### Suggested title
"Cube AI — Designing an Interactive 3D Experience for a New AI Product"

### Narrative arc
Brief → Design prototype → Engineering → Production

### Key story beats
1. The brief: launch page for Roblox's Cube AI product, needs to explain
   what it is and let users experience the models
2. The design decisions: scroll-driven layout to pace the storytelling,
   Three.js model player for hands-on exploration
3. The engineering: building the player (zoom, rotate controls), performance
   considerations for 3D on web, taking it from prototype to production
4. The CubeGenerator prototype: connecting to Hugging Face via Gradio for
   real-time AI model generation (note: prototype, not shipped)

### Metrics / evidence to feature
- Scroll-driven landing page explaining Cube AI
- Interactive Three.js model player with zoom and rotate
- Taken from early design prototype to production
- CubeGenerator prototype (Hugging Face / Gradio integration)

### Visuals to prepare
- Screen recording of the scroll-driven page in action
- Screen recording of the Three.js model player (zoom/rotate)
- Design prototype screenshots showing the concept stage
- Code snippets showing Three.js implementation (optional)

### Tags
- Three.js
- Interactive Design
- Motion / Animation
- Scroll-driven UX
- Rapid Prototyping
- 3D Web

---

## Recommended Order to Build

| Priority | Case Study | Effort | Impact for Anthropic |
|----------|-----------|--------|---------------------|
| 1st | AI Workflow System | Medium | Very High |
| 2nd | Web Platform Migration | Medium | High |
| 3rd | Cube AI Landing Page | Low | Medium |

Build the AI Workflow System case study first — it's your biggest differentiator
and nothing in your current portfolio touches it. The migration case study
is strong but more conventional. Cube AI is the quickest to produce if you
have screen recordings ready.

---

## Structural Notes for Your Astro Site

Your existing case studies follow a consistent pattern. Match it:

- **Hero image**: 2-monitor mockup or full-bleed screenshot
- **Tags**: 5–8 short labels matching the work
- **Featured section**: 1-line hook + tags (shown on homepage)
- **Case study page**: Problem → Approach → Results structure
- **Live link**: Link to the live site or a demo where possible

For the AI Workflow System, since it's internal tooling with no public URL,
consider linking to a short Loom screen recording or a GitHub repo instead
of a live site.

---

## Homepage Hero Copy Update

Current: "crafting seamless user experiences that bring brands to life"
— this reads like a brand agency, not a design engineer at a Creative Studio

Suggested update:
"Building at the intersection of design and engineering — interactive experiences,
design systems, and AI-augmented workflows that help teams ship better work faster."

Also update the About section — it still doesn't mention Roblox or any of
your 2025–2026 work.
