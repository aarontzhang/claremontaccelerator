import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { DONATION_URL } from "@/lib/links";
import PageHero from "@/components/PageHero";

export default function Donate() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      {/* Hero Section */}
      <PageHero
        image="/acceleratormeeting-18.webp"
        title="Invest in the Next Generation"
        subtitle="Your support helps student founders build companies that matter."
        paddingTop={79}
        spacedSubtitle
      >
        <div className="flex flex-col items-center gap-3">
          <CTAButton href={DONATION_URL} external size="large">
            Make a Donation
          </CTAButton>
          <Link
            href="/mentor"
            className="inline-flex items-center gap-1 text-white/50 text-sm hover:text-white/80 transition-colors"
          >
            I&apos;d like to donate my time
            <IconArrowNarrowRight className="w-3 h-3" stroke={2} />
          </Link>
        </div>
      </PageHero>

      {/* Where Funds Go */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-black text-2xl md:text-3xl text-white mb-12 text-center">
              Where Your Donation Goes
            </h2>
          </ScrollReveal>

          {/* Horizontal Layout */}
          <div>
            {/* Badge row — line centered through badges */}
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/[0.07] -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                <ScrollReveal delay={0}>
                  <div className="flex justify-center">
                    <span className="relative z-10 inline-flex px-5 py-2 rounded-lg text-white font-black text-base" style={{ background: "var(--accent)" }}>80%</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <div className="flex justify-center">
                    <span className="relative z-10 inline-flex px-5 py-2 rounded-lg text-white font-black text-base" style={{ background: "var(--accent)" }}>10%</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="flex justify-center">
                    <span className="relative z-10 inline-flex px-5 py-2 rounded-lg text-white font-black text-base" style={{ background: "var(--accent)" }}>10%</span>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Label row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mt-6">
              <ScrollReveal delay={0}>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-black text-white mb-1">Startup Grants</h3>
                  <p className="text-[var(--muted)] text-sm">Direct funding for early-stage expenses</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-black text-white mb-1">Resources</h3>
                  <p className="text-[var(--muted)] text-sm">Software, cloud credits, and tools</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-black text-white mb-1">Events</h3>
                  <p className="text-[var(--muted)] text-sm">Workshops, networking, and Demo Day</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* About Blurb */}
      <section className="py-10 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h3 className="text-white font-bold text-xl mb-4">Your Impact</h3>
            <p className="text-[var(--muted-light)] text-lg leading-relaxed mb-4">
              Student founders often have the skills and ambition to build great companies, but lack the capital to get started. Your donation changes that. We give <span className="text-white font-medium">grants directly to startups</span> so they can afford their first prototype, hire their first teammate, or reach their first customers.
            </p>
            <p className="text-[var(--muted)] text-lg leading-relaxed">
              We also invest in the infrastructure that makes entrepreneurship accessible: cloud credits so students can build without worrying about server costs, software subscriptions for design and development tools, and events that bring founders, mentors, and investors together in one room.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
