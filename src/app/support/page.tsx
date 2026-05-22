import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

const DONATION_URL = "https://www.cmc.edu/giving/institutes/rlcie";

export default function Donate() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden mt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/acceleratormeeting-18.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="animate-fade-up opacity-0 font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Invest in the Next Generation
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Your support helps student founders build companies that matter.
          </p>
          <div className="animate-fade-up opacity-0 animation-delay-200 flex flex-col items-center gap-3">
            <CTAButton href={DONATION_URL} external size="large">
              Make a Donation
            </CTAButton>
            <Link
              href="/mentor"
              className="inline-flex items-center gap-1 text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              I&apos;d like to donate my time
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Where Funds Go */}
      <section className="py-16 bg-[var(--surface)]">
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
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--border)] -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                <ScrollReveal delay={0}>
                  <div className="flex justify-center">
                    <span className="relative z-10 inline-flex px-5 py-2 rounded-lg text-white font-black text-base" style={{ background: "#0165fc" }}>80%</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <div className="flex justify-center">
                    <span className="relative z-10 inline-flex px-5 py-2 rounded-lg text-white font-black text-base" style={{ background: "#0165fc" }}>10%</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="flex justify-center">
                    <span className="relative z-10 inline-flex px-5 py-2 rounded-lg text-white font-black text-base" style={{ background: "#0165fc" }}>10%</span>
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
