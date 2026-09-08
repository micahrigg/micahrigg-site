import { Container, Eyebrow } from "@/components/ui";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  width = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <div className="border-line border-b">
      <Container width={width}>
        <div className="py-14 sm:py-20">
          {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          {description ? (
            <p className="text-ink-muted mt-5 max-w-2xl text-lg">{description}</p>
          ) : null}
          {children}
        </div>
      </Container>
    </div>
  );
}
