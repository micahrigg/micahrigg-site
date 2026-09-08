# micahriggenbach.com

Resume site and markdown blog. Next.js App Router, statically exported and deployed to
GitHub Pages.

## Commands

```bash
npm run dev     # local dev server
npm run build   # static export to ./out
npm run lint    # eslint
```

Preview the real export before deploying:

```bash
npm run build && npx serve out
```

## Where things live

| Path                            | Purpose                                                  |
| ------------------------------- | -------------------------------------------------------- |
| `src/lib/site.ts`               | Name, URL, email, social links, nav                       |
| `src/data/resume.ts`            | Resume content — drives the page, print view, and JSON-LD |
| `content/posts/*.mdx`           | Blog posts                                                |
| `content/projects/*.mdx`        | Project case studies                                      |
| `src/app/globals.css`           | Design tokens, dark mode, prose, print styles             |
| `src/lib/content.ts`            | Markdown reading and frontmatter parsing                  |
| `.github/workflows/deploy.yml`  | Build and deploy to GitHub Pages                          |
| `public/CNAME`                  | Custom domain                                             |
| `public/.nojekyll`              | Stops Pages from stripping `_next`                        |

## Adding a blog post

Create `content/posts/my-post.mdx`:

```mdx
---
title: "Post title"
description: "One or two sentences, also used for SEO and RSS."
date: "2026-09-03"
tags: ["Craft"]
---

Body content.
```

It appears automatically in the blog index, its tag pages, the RSS feed, and the sitemap.
Set `draft: true` to keep it out of production builds while still previewing it in `npm run dev`.

Project case studies work the same way in `content/projects/`, using the frontmatter
fields `title`, `description`, `role`, `period`, `stack`, `outcome`, `featured`, and `order`.

## Static export constraints

The site builds with `output: 'export'`, so there is no server at runtime:

- No API routes, Server Actions, middleware, rewrites, redirects, or header config
- Dynamic routes require `generateStaticParams()`
- Route handlers must set `export const dynamic = 'force-static'`
- Images use `unoptimized: true`
- `trailingSlash: true` so each route emits its own `index.html`

## Contact form

The form posts directly to Formspree from the browser. Set `NEXT_PUBLIC_FORMSPREE_ID` to
your form hash — locally in `.env.local`, and in CI as a GitHub Actions **repository
variable** of the same name. This value is public by design; never put a secret in a
`NEXT_PUBLIC_` variable, since everything in a static build ships to the browser.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`. One-time repository setup:

1. Settings → Pages → Source: **GitHub Actions**
2. Settings → Pages → Custom domain: the value in `public/CNAME`, then enable **Enforce HTTPS**
3. Settings → Secrets and variables → Actions → Variables: add `NEXT_PUBLIC_FORMSPREE_ID`

## Before launch

- Replace every `TODO:` in `src/data/resume.ts`, `src/lib/site.ts`, and the page copy
- Delete the placeholder files in `content/posts/` and `content/projects/`
- Confirm the domain in `public/CNAME` matches `site.url` in `src/lib/site.ts`
- Add `public/resume.pdf` if you want a designed PDF alongside the print stylesheet
- Add `src/app/opengraph-image.png` (1200×630) for social cards
- Replace `src/app/favicon.ico`
