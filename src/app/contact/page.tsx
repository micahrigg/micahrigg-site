import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about projects, roles, or collaboration.`,
  alternates: { canonical: "/contact" },
};

const elsewhere = [
  { label: "GitHub", value: "See what I build on Github", href: site.links.github },
  {
    label: "Codepen",
    value: "See what I build on CodePen",
    href: "https://codepen.io/micahrigg/pens/showcase",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Please reach out with any inquiries. I will respond as soon as possible. I look forward to hearing from you!"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_16rem]">
            <ContactForm />

            <aside>
              <h2 className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">
                Elsewhere
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                {elsewhere.map((item) => (
                  <li key={item.label}>
                    <p className="text-ink-subtle text-xs">{item.label}</p>
                    <a
                      href={item.href}
                      className="text-accent hover:text-accent-hover break-words"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
