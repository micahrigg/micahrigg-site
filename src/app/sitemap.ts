import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects, getAllTags } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/resume", "/projects", "/blog", "/contact"].map(
    (route) => ({
      url: `${site.url}${route}/`.replace(/\/+$/, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const projects = getAllProjects().map((project) => ({
    url: `${site.url}/projects/${project.slug}/`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const tags = getAllTags().map((tag) => ({
    url: `${site.url}/blog/tags/${tag.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...posts, ...projects, ...tags];
}
