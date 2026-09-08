import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProject } from "@/lib/content";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.meta.title,
    description: project.meta.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: project.meta.title,
      description: project.meta.description,
      url: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { meta, content } = project;

  return (
    <>
      <div className="border-line border-b">
        <Container width="default">
          <div className="py-14 sm:py-20">
            <Link href="/projects" className="text-ink-muted hover:text-accent text-sm">
              &larr; All projects
            </Link>
            <Eyebrow className="mt-6">{meta.period}</Eyebrow>
            <h1 className="mt-4 text-4xl sm:text-5xl">{meta.title}</h1>
            <p className="text-ink-muted mt-5 max-w-2xl text-lg">{meta.description}</p>

            <dl className="border-line mt-10 grid gap-6 border-t pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">
                  Role
                </dt>
                <dd className="mt-2 text-sm">{meta.role}</dd>
              </div>
              {meta.stack.length ? (
                <div>
                  <dt className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">
                    Stack
                  </dt>
                  <dd className="mt-2 text-sm">{meta.stack.join(" · ")}</dd>
                </div>
              ) : null}
              {meta.outcome ? (
                <div>
                  <dt className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">
                    Outcome
                  </dt>
                  <dd className="mt-2 text-sm">{meta.outcome}</dd>
                </div>
              ) : null}
            </dl>

            {meta.liveUrl || meta.repoUrl ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {meta.liveUrl ? (
                  <ButtonLink href={meta.liveUrl} size="sm" external>
                    Visit site
                  </ButtonLink>
                ) : null}
                {meta.repoUrl ? (
                  <ButtonLink href={meta.repoUrl} size="sm" variant="secondary" external>
                    View code
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </div>

      {meta.image ? (
        <Container width="default" className="mt-10 sm:mt-14">
          <Image
            src={meta.image}
            alt={`Screenshot of ${meta.title}`}
            width={1600}
            height={1000}
            priority
            className="border-line w-full rounded-lg border"
          />
        </Container>
      ) : null}

      <Section>
        <Container width="default">
          <div className="prose">{content}</div>
        </Container>
      </Section>
    </>
  );
}
