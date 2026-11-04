import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Soli Deo Gloria",
  description: "Soli Deo Gloria: to God alone be the glory.",
  alternates: { canonical: "/soli-deo-gloria" },
};

export default function SoliDeoGloriaPage() {
  return (
    <>
      <PageHeader title="Soli Deo Gloria" width="narrow" />

      <Section>
        <Container width="narrow">
          <div className="space-y-5 text-lg">
            <p>
              <em>Soli Deo Gloria</em> is Latin for &ldquo;to God alone be the
              glory.&rdquo;
            </p>
            <p>
              In this world of constant distractions, it is easy to lose focus on what matters most. No matter our station in life we are called to glorify God. What will truly last is what we do for God and His kingdom. Everything else will fade away and trying to hold on to temporal things as our source of meaning will only lead to emptiness in the end. This is just as true in the digital world as it is in the physical one. I find my worth in knowing that I have been adopted into God&apos;s family through the work of Jesus Christ. What I do is a daily thank you to my Lord and savior and not an attempt to earn His favor. 
            </p>
            <p>
              If you have come across this page I would encourage you to repent and turn to God, finding your true worth and purpose in Him.
            </p>
            <hr />
            <p>
              <em>
              For no one can lay a foundation other than that which is laid, which is Jesus Christ. Now if anyone builds on the foundation with gold, silver, precious stones, wood, hay, straw— each one&apos;s work will become manifest, for the Day will disclose it, because it will be revealed by fire, and the fire will test what sort of work each one has done.<br /><br />
              </em>
              1 Corinthians 3:11-13 (ESV)
            </p>
            <hr />
            <p>
              <em>
              For God so loved the world,that he gave his only Son, that whoever believes in him should not perish but have eternal life. For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him. Whoever believes in him is not condemned, but whoever does not believe is condemned already, because he has not believed in the name of the only Son of God.<br /><br />
              </em>
              John 3:16-18 (ESV)
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
