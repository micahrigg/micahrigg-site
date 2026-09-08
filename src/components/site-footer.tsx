import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Container } from "@/components/ui";

const social = [
  { href: site.links.github, label: "GitHub" },
  { href: "/rss.xml", label: "RSS" },
];

export function SiteFooter() {
  return (
    <footer data-print="hide" className="border-line mt-auto border-t">
      <Container width="wide">
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg">{site.name}</p>
            <p className="text-ink-muted mt-2 text-sm">{site.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:gap-16">
            <div>
              <p className="text-ink-subtle mb-3 font-mono text-xs tracking-[0.18em] uppercase">
                Site
              </p>
              <ul className="space-y-2">
                {nav.slice(1).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-ink-muted hover:text-accent">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-ink-subtle mb-3 font-mono text-xs tracking-[0.18em] uppercase">
                Elsewhere
              </p>
              <ul className="space-y-2">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-ink-muted hover:text-accent"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "me noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-line text-ink-subtle flex flex-col gap-2 border-t py-6 text-xs sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
