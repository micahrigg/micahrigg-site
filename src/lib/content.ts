import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import { rehypePlugins, remarkPlugins } from "@/lib/mdx";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
  draft?: boolean;
};

export type ProjectFrontmatter = {
  title: string;
  description: string;
  role: string;
  period: string;
  stack?: string[];
  outcome?: string;
  featured?: boolean;
  order?: number;
  liveUrl?: string;
  repoUrl?: string;
  /** Path under /public, e.g. "/projects/my-project.jpg". */
  image?: string;
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  tags: string[];
  readingMinutes: number;
};

export type Project = ProjectFrontmatter & {
  slug: string;
  stack: string[];
};

function readCollection(dir: string) {
  const fullPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullPath, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx?$/, ""), data, content };
    });
}

const isPublished = (draft?: boolean) => process.env.NODE_ENV === "development" || !draft;

export function getAllPosts(): Post[] {
  return readCollection("posts")
    .map(({ slug, data, content }) => {
      const frontmatter = data as PostFrontmatter;
      return {
        ...frontmatter,
        slug,
        tags: frontmatter.tags ?? [],
        readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      };
    })
    .filter((post) => isPublished(post.draft))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export async function getPost(slug: string) {
  const file = ["mdx", "md"]
    .map((ext) => path.join(CONTENT_DIR, "posts", `${slug}.${ext}`))
    .find((candidate) => fs.existsSync(candidate));

  if (!file) return null;

  const source = fs.readFileSync(file, "utf8");
  const { content: body } = matter(source);

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins, rehypePlugins } },
  });

  if (!isPublished(frontmatter.draft)) return null;

  return {
    content,
    meta: {
      ...frontmatter,
      slug,
      tags: frontmatter.tags ?? [],
      readingMinutes: Math.max(1, Math.round(readingTime(body).minutes)),
    } satisfies Post,
  };
}

export function getAllTags() {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: slugifyTag(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getPostsByTag(tagSlug: string) {
  return getAllPosts().filter((post) => post.tags.some((tag) => slugifyTag(tag) === tagSlug));
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    // Posts are newest-first, so the previous entry is the newer one.
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getAllProjects(): Project[] {
  return readCollection("projects")
    .map(({ slug, data }) => {
      const frontmatter = data as ProjectFrontmatter;
      return { ...frontmatter, slug, stack: frontmatter.stack ?? [] };
    })
    .filter((project) => isPublished(project.draft))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getFeaturedProjects(limit = 3) {
  const projects = getAllProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

export async function getProject(slug: string) {
  const file = ["mdx", "md"]
    .map((ext) => path.join(CONTENT_DIR, "projects", `${slug}.${ext}`))
    .find((candidate) => fs.existsSync(candidate));

  if (!file) return null;

  const source = fs.readFileSync(file, "utf8");

  const { content, frontmatter } = await compileMDX<ProjectFrontmatter>({
    source,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins, rehypePlugins } },
  });

  if (!isPublished(frontmatter.draft)) return null;

  return { content, meta: { ...frontmatter, slug, stack: frontmatter.stack ?? [] } as Project };
}

export function formatDate(value: string) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
