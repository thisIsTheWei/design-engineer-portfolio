import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { features } from "process";

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    codepen: z.boolean(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    hero_image: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    meta_data: z.object({
      title: z.string(),
      description: z.string(),
    }),
    description: z.string(),
    featured: z.boolean().optional(),
    feature_image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    urls: z.array(z.string()),
    keywords: z.array(z.string()).optional(),
    theme: z.enum(["primary", "secondary", "tertiary", "quaternary"]),
    order: z.number(),
    enable_case_study: z.boolean().optional(),
    asset_folder: z.string().optional(),
  }),
})

export const collections = { blog, work };