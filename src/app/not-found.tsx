import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-28">
      <Container width="narrow" className="text-center">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl">This page has moved on</h1>
        <p className="text-ink-muted mt-5">
          The page you were looking for does not exist. It may have been renamed or retired.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/blog" variant="secondary">
            Read the blog
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
