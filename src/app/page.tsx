import Link from "next/link";
import { getFeaturedProjects, getAllPosts } from "@/lib/content";
import { competencies } from "@/data/resume";
import { site } from "@/lib/site";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const projects = getFeaturedProjects(3);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <Container width="wide">
          <Reveal>
            <Eyebrow>{site.role}</Eyebrow>
            <h1 className="text-display mt-5 max-w-4xl">
              Gladly serving teams and individuals for over <span className="text-accent">eighteen years</span> with a focus on front-end development.
            </h1>
            <p className="text-ink-muted mt-7 max-w-2xl text-lg sm:text-xl">
              As a front-end developer, I help teams ship accessible, performant, and maintainable web applications. I work with product managers, designers, and back-end developers to build experiences that delight users and meet business goals.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/resume">View resume</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* <div className="border-line border-y">
        <Container width="wide">
          <dl className="divide-line grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {credibility.map((item) => (
              <div key={item.label} className="px-0 py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <dt className="text-ink-muted text-sm">{item.label}</dt>
                <dd className="mt-2 font-serif text-4xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div> */}

      <Section>
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Selected work"
              title="Case studies"
              description="A few engagements that show how I think about scope, tradeoffs, and outcomes."
            />
            <Link href="/projects" className="text-accent hover:text-accent-hover text-sm">
              All projects &rarr;
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface-sunken border-line border-y">
        <Container width="wide">
          <SectionHeading
            eyebrow="Capabilities"
            title="What I work with"
            description="Depth across the stack, with a bias toward accessible, fast, maintainable front ends."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((group) => (
              <div key={group.group}>
                <h3 className="text-ink text-base font-semibold">{group.group}</h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Writing"
              title="From the blog"
              description="Notes on the craft of web development."
            />
            <Link href="/blog" className="text-accent hover:text-accent-hover text-sm">
              All posts &rarr;
            </Link>
          </div>

          <div className="mt-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-line border-t">
        <Container width="narrow" className="text-center">
          <h2 className="text-3xl sm:text-4xl">How can I help you?</h2>
          <p className="text-ink-muted mx-auto mt-4 max-w-xl text-lg">
            Think I would be a good fit for your team? I&apos;m currently available for contract and full-time work. I&apos;d love to talk about your project and how I can help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
