import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected case studies covering context, constraints, approach, and outcomes.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Case studies"
        description="Each write-up covers the situation, the constraints, the decisions I made, and what actually changed as a result."
        width="wide"
      />

      <Section>
        <Container width="wide">
          {projects.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 70}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted">No case studies published yet.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
