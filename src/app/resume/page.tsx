import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  // awards,
  // certifications,
  community,
  competencies,
  earlierExperience,
  education,
  experience,
  resumeSections,
  // speaking,
  summary,
} from "@/data/resume";
import { Container, Eyebrow, Section } from "@/components/ui";
import { PrintButton } from "@/components/print-button";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resume",
  description: `The professional resume of ${site.name}, ${site.role.toLowerCase()} with eighteen years of experience.`,
  alternates: { canonical: "/resume" },
};

function ResumeSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-line scroll-mt-24 border-t pt-10">
      <h2 className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    sameAs: [site.links.github],
    address: { "@type": "PostalAddress", addressLocality: site.location },
    alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: item.school })),
    knowsAbout: competencies.flatMap((group) => group.items),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="border-line border-b" data-print="hide">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6 py-14 sm:py-20">
            <div>
              <Eyebrow>Resume</Eyebrow>
              <h1 className="mt-4 text-4xl sm:text-5xl">{site.name}</h1>
              <p className="text-ink-muted mt-3 text-lg">
                {site.role} &middot; {site.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <PrintButton />
            </div>
          </div>
        </Container>
      </div>

      {/* Print-only header, since the screen header is suppressed on paper. */}
      <div className="hidden print:block">
        <h1 className="text-3xl">{site.name}</h1>
        <p className="mt-1 text-sm">{site.role} &middot; {site.location}</p>
        <p className="mt-1 text-sm">
          {site.url.replace("https://", "")} &middot; {site.links.github.replace("https://", "")}
        </p>
      </div>

      <Section className="print:py-0">
        <Container width="wide" className="print:max-w-none print:px-0">
          <div className="grid gap-12 lg:grid-cols-[12rem_1fr]" data-print="full">
            <nav aria-label="Resume sections" className="hidden lg:block" data-print="hide">
              <ul className="sticky top-24 space-y-2 text-sm">
                {resumeSections.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-ink-muted hover:text-accent">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12 print:space-y-6">
              <ResumeSection id="summary" title="Professional Summary">
                <p className="text-ink-muted leading-relaxed">{summary}</p>
              </ResumeSection>

              <ResumeSection id="skills" title="Core Competencies">
                <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {competencies.map((group) => (
                    <div key={group.group}>
                      <dt className="text-sm font-semibold">{group.group}</dt>
                      <dd className="text-ink-muted mt-1 text-sm leading-relaxed">
                        {group.items.join(", ")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ResumeSection>

              <ResumeSection id="experience" title="Professional Experience">
                <div className="space-y-10 print:space-y-6">
                  {experience.map((role) => (
                    <article key={`${role.company}-${role.start}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <h3 className="text-lg">{role.title}</h3>
                        <p className="text-ink-subtle font-mono text-xs">
                          {role.start} &ndash; {role.end}
                        </p>
                      </div>
                      <p className="text-accent text-sm">
                        {role.company} &middot;{" "}
                        <span className="text-ink-subtle">{role.location}</span>
                      </p>

                      {role.summary ? (
                        <p className="text-ink-muted mt-3 text-sm">{role.summary}</p>
                      ) : null}

                      <ul className="text-ink-muted mt-3 space-y-2 text-sm">
                        {role.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="text-accent mt-2 h-1 w-1 shrink-0 rounded-full bg-current"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {role.stack?.length ? (
                        <p className="text-ink-subtle mt-3 font-mono text-xs">
                          {role.stack.join(" · ")}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>

                {earlierExperience.length ? (
                  <div className="border-line mt-10 border-t pt-6">
                    <h3 className="text-sm font-semibold">Earlier Experience</h3>
                    <ul className="text-ink-muted mt-3 space-y-1 text-sm">
                      {earlierExperience.map((role) => (
                        <li key={role.company} className="flex flex-wrap justify-between gap-x-4">
                          <span>
                            {role.title}, {role.company}
                          </span>
                          <span className="text-ink-subtle font-mono text-xs">{role.period}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </ResumeSection>

              <ResumeSection id="education" title="Education">
                <ul className="space-y-4">
                  {education.map((item) => (
                    <li key={item.school} className="flex flex-wrap justify-between gap-x-4">
                      <div>
                        <p className="font-medium">{item.credential}</p>
                        <p className="text-ink-muted text-sm">
                          {item.school}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                      </div>
                      {item.year ? (
                        <p className="text-ink-subtle font-mono text-xs">{item.year}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </ResumeSection>

              <ResumeSection id="community" title="Community">
                <ul className="space-y-3">
                  {community.map((item) => (
                    <li
                      key={item.organization}
                      className="flex flex-wrap justify-between gap-x-4 text-sm"
                    >
                      <span>
                        {item.role} &middot;{" "}
                        <span className="text-ink-muted">{item.organization}</span>
                      </span>
                      <span className="text-ink-subtle font-mono text-xs">{item.period}</span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>

              {/* Commented out for now — re-enable once there's real content for these.
              <ResumeSection id="certifications" title="Certifications">
                <ul className="space-y-3">
                  {certifications.map((item) => (
                    <li key={item.name} className="flex flex-wrap justify-between gap-x-4 text-sm">
                      <span>
                        {item.name} &middot; <span className="text-ink-muted">{item.issuer}</span>
                      </span>
                      <span className="text-ink-subtle font-mono text-xs">{item.year}</span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>

              <ResumeSection id="speaking" title="Speaking & Writing">
                <ul className="space-y-3">
                  {speaking.map((item) => (
                    <li key={item.title} className="flex flex-wrap justify-between gap-x-4 text-sm">
                      <span>
                        {item.title} &middot; <span className="text-ink-muted">{item.venue}</span>
                      </span>
                      <span className="text-ink-subtle font-mono text-xs">{item.year}</span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>

              <ResumeSection id="recognition" title="Recognition">
                <ul className="space-y-3">
                  {awards.map((item) => (
                    <li key={item.name} className="flex flex-wrap justify-between gap-x-4 text-sm">
                      <span>
                        {item.name} &middot; <span className="text-ink-muted">{item.issuer}</span>
                      </span>
                      <span className="text-ink-subtle font-mono text-xs">{item.year}</span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>
              */}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
