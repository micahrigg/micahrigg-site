import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { Card, Eyebrow } from "@/components/ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group relative flex flex-col overflow-hidden !p-0">
      {project.image ? (
        <div className="border-line bg-surface-sunken border-b">
          <Image
            src={project.image}
            alt=""
            width={640}
            height={400}
            className="aspect-[8/5] w-full object-cover object-top"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <Eyebrow>{project.period}</Eyebrow>

        <h3 className="mt-3 text-xl">
          <Link
            href={`/projects/${project.slug}`}
            className="group-hover:text-accent transition-colors"
          >
            <span className="absolute inset-0" />
            {project.title}
          </Link>
        </h3>

        <p className="text-ink-subtle mt-1 text-sm">{project.role}</p>
        <p className="text-ink-muted mt-3 flex-1 text-sm">{project.description}</p>

        {project.stack.length ? (
          <p className="text-ink-subtle mt-5 font-mono text-xs">{project.stack.join(" · ")}</p>
        ) : null}
      </div>
    </Card>
  );
}
