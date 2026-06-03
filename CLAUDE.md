# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (localhost:4321)
- `npm run build` - Build production site with type checking (`astro check && astro build`)
- `npm run preview` - Preview production build locally
- `npm run astro` - Direct Astro CLI access

## Architecture Overview

This is an Astro 5.1.8-based portfolio site for Wei-Hsin Chen using TypeScript, SCSS, and MDX. It leverages Astro's content collections for structured content management and is deployed on Netlify.

### Content Collections System

The site uses two main content collections defined in `src/content.config.ts`:

**Work Collection** (`src/content/work/`):
- Case studies with comprehensive frontmatter schema
- Theme variants (primary, secondary, tertiary, quaternary)
- Multiple URL support (single strings or labeled objects)
- Feature images, order, and case study enablement flags

**Blog Collection** (`src/content/blog/`):
- MDX blog posts with standard metadata (title, description, pubDate, tags)

### Component Architecture

**Global Components** (`src/components/global/`):
- Header, Footer, MainHead for site-wide elements

**Composable Components** (`src/components/composable/`):
- Reusable UI elements shared across pages

**Specialized Components**:
- Case study components (InfoTextColumns, FullSizeFeatureImage, etc.)
- Image and video components with optimization

**Layout System**:
- BaseLayout as the main wrapper for all pages

### Styling Architecture

**SCSS Structure** (`src/styles/`):
- `abstracts/` - Variables, mixins, tokens, breakpoints
- `base/` - Reset, typography, global styles
- `layout/` - Layout-specific styles
- `utilities/` - Utility classes
- `animations/` - Animation definitions

**Design System Features**:
- CSS Custom Properties for theming
- Comprehensive token system (colors, typography, spacing)
- Mobile-first responsive design with breakpoint mixins
- Z-index management system

### Dynamic Routing

- `src/pages/work/[...slug].astro` - Dynamic case study pages
- `src/pages/blog/[...slug].astro` - Blog post pages
- Content rendered from collections with custom component mapping

### JavaScript/TypeScript Patterns

**Scripts Organization** (`src/scripts/`):
- `utils/` - Navigation, theme toggle, scroll effects
- Intersection Observer system for fade-in animations
- Mobile menu management with overlay functionality

**Key Features**:
- Theme toggle with localStorage persistence
- Smooth scroll navigation with active highlighting
- Custom fade-in animations using data attributes
- Astro's client-side navigation handling

### Configuration

**Astro Config** (`astro.config.mjs`):
- Site URL: `https://weidesign.engineer/`
- Integrations: MDX, Sitemap, Robots.txt, Partytown (analytics)
- Netlify adapter for deployment

**Deployment** (`netlify.toml`):
- Build command: `npm run build`
- Publish directory: `dist`
- 404 handling with redirect configuration

### Asset Management

**Public Assets** (`public/`):
- Resume PDF in `assets/Resume_Wei_Hsin_Chen.pdf`
- Case study assets organized by project folders
- Favicon and social media images

**Source Assets** (`src/assets/`):
- SVG logos (name logo, W logo)
- Profile images

### Development Patterns

- Full TypeScript integration with strict configuration
- MDX content with custom component mapping
- Intersection Observer-based animations
- Mobile-first responsive design approach
- Astro Islands for minimal JavaScript hydration
- Partytown integration for non-blocking analytics

### Content Management

When adding new case studies to `src/content/work/`, ensure frontmatter includes:
- `title`, `description`, `eyebrow`
- `featureImage` and `featureImageAlt`
- `url` (string or labeled object array)
- `theme` (primary/secondary/tertiary/quaternary)
- `order` for sorting
- `featured` and `caseStudyEnabled` flags

The site automatically generates navigation and displays content based on collection metadata and order values.