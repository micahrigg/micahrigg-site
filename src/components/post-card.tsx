import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/content";
import { Tag } from "@/components/ui";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border-line border-b py-8 first:pt-0 last:border-b-0">
      <div className="text-ink-subtle flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h2 className="mt-3 text-2xl">
        <Link href={`/blog/${post.slug}`} className="group-hover:text-accent transition-colors">
          {/* Stretches the click target across the card without nesting interactive elements. */}
          <span className="absolute inset-0 hidden" aria-hidden="true" />
          {post.title}
        </Link>
      </h2>

      <p className="text-ink-muted mt-3 max-w-2xl">{post.description}</p>

      {post.tags.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
