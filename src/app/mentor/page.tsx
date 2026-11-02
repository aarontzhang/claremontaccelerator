import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { MENTOR_FORM_URL } from "@/lib/links";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";

const whatYouDo = [
  {
    title: "1-on-1 Sessions",
    description: "Meet with a founder team once or twice a semester to share your expertise and perspective.",
  },
  {
    title: "Office Hours",
    description: "Drop into occasional office hours to field questions from multiple teams at once.",
  },
  {
    title: "Demo Day",
    description: "Attend our end-of-semester Demo Day and celebrate what our founders have built.",
  },
];

const whatYouBring = [
  "Industry expertise in any domain — tech, finance, consumer, healthcare, or beyond",
  "Startup experience as a founder, operator, or investor",
  "A genuine interest in helping the next generation of entrepreneurs",
  "A few hours per semester — we respect your time",
];

export default function Mentor() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      {/* Hero */}
      <PageHero
        image="/acceleratormeeting-11.webp"
        title="Become a Mentor"
        subtitle="Share your experience with the next generation of student founders. Your time is the most valuable thing you can give."
        paddingTop={79}
        spacedSubtitle
      >
        <CTAButton
          href={MENTOR_FORM_URL}
          external
          size="large"
          icon={<IconArrowNarrowRight className="w-4 h-4" stroke={2} />}
        >
          Get Involved
        </CTAButton>
      </PageHero>

      {/* What you'll do */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-black text-2xl md:text-3xl text-white mb-12 text-center">
              What You&apos;ll Do
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatYouDo.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center z-10 pulse-circle mb-4" />
                  <h3 className="font-black text-white mb-2">{item.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you bring */}
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-black text-2xl md:text-3xl text-white mb-8 text-center">
              What We&apos;re Looking For
            </h2>
            <ul className="space-y-4">
              {whatYouBring.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                  <span className="text-[var(--muted-light)] text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-black text-2xl md:text-3xl text-white mb-4">Ready to give back?</h2>
            <p className="text-[var(--muted)] text-lg mb-8">
              Reach out and we&apos;ll connect you with a cohort that fits your background.
            </p>
            <CTAButton
              href={MENTOR_FORM_URL}
              external
              size="large"
              icon={<IconArrowNarrowRight className="w-4 h-4" stroke={2} />}
            >
              Get Involved
            </CTAButton>
            <p className="mt-6 text-[var(--muted)] text-sm">
              Prefer to support financially?{" "}
              <Link href="/support" className="text-white underline underline-offset-2 hover:text-white/80 transition-colors">
                Make a donation instead
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
