import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Container, Section, Tag } from "@/components/ui";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on web development — architecture, accessibility, performance, and craft.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Writing"
        description="Notes from the work — architecture decisions, accessibility, performance, and lessons that took years to learn."
      >
        {tags.length ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag.slug} className="group">
                <Link href={`/blog/tags/${tag.slug}`}>
                  <Tag>
                    {tag.tag} <span className="text-ink-subtle ml-1">{tag.count}</span>
                  </Tag>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </PageHeader>

      <Section>
        <Container>
          {posts.length ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-ink-muted">No posts published yet.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
