import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAdjacentPosts, getAllPosts, getPost, slugifyTag } from "@/lib/content";
import { site } from "@/lib/site";
import { Container, Section, Tag } from "@/components/ui";
import { CodeCopyButtons } from "@/components/code-copy-buttons";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      url: `/blog/${slug}`,
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updated ?? post.meta.date,
      authors: [site.name],
      tags: post.meta.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const { newer, older } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    keywords: meta.tags.join(", "),
    url: `${site.url}/blog/${slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${slug}` },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="border-line border-b">
        <Container width="narrow">
          <div className="py-14 sm:py-20">
            <Link href="/blog" className="text-ink-muted hover:text-accent text-sm">
              &larr; All posts
            </Link>

            <div className="text-ink-subtle mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{meta.readingMinutes} min read</span>
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl">{meta.title}</h1>
            <p className="text-ink-muted mt-5 text-lg">{meta.description}</p>

            {meta.tags.length ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <li key={tag} className="group">
                    <Link href={`/blog/tags/${slugifyTag(tag)}`}>
                      <Tag>{tag}</Tag>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </div>

      <Section>
        <Container width="narrow">
          <CodeCopyButtons>{content}</CodeCopyButtons>

          {newer || older ? (
            <nav
              aria-label="More posts"
              className="border-line mt-16 grid gap-6 border-t pt-8 sm:grid-cols-2"
            >
              {older ? (
                <Link href={`/blog/${older.slug}`} className="group">
                  <span className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">
                    Older
                  </span>
                  <span className="group-hover:text-accent mt-2 block font-serif text-lg transition-colors">
                    {older.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {newer ? (
                <Link href={`/blog/${newer.slug}`} className="group sm:text-right">
                  <span className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">
                    Newer
                  </span>
                  <span className="group-hover:text-accent mt-2 block font-serif text-lg transition-colors">
                    {newer.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
