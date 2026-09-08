import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui";
import { PostCard } from "@/components/post-card";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const match = getAllTags().find((item) => item.slug === tag);
  if (!match) return {};

  return {
    title: `${match.tag} posts`,
    description: `Posts tagged ${match.tag}.`,
    alternates: { canonical: `/blog/tags/${tag}` },
  };
}

export default async function TagPage({ params }: PageProps<"/blog/tags/[tag]">) {
  const { tag } = await params;
  const match = getAllTags().find((item) => item.slug === tag);
  if (!match) notFound();

  const posts = getPostsByTag(tag);

  return (
    <>
      <PageHeader
        eyebrow="Tag"
        title={match.tag}
        description={`${match.count} ${match.count === 1 ? "post" : "posts"} tagged ${match.tag}.`}
      >
        <p className="mt-8">
          <Link href="/blog" className="text-ink-muted hover:text-accent text-sm">
            &larr; All posts
          </Link>
        </p>
      </PageHeader>

      <Section>
        <Container>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Container>
      </Section>
    </>
  );
}
