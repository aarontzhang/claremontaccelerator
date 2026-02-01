import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

const startups = [
  { name: "Sokil", logo: "/logos/Sokil.webp", size: "large" },
  { name: "Exploravist", logo: "/logos/Exploravist.webp", size: "normal" },
  { name: "ArtHub", logo: "/logos/Arthub.webp", size: "normal" },
  { name: "GlamUp", logo: "/logos/Glam+up.webp", size: "large" },
  { name: "Pheratech", logo: "/logos/Pheratech.png", size: "normal" },
  { name: "Stag", logo: "/logos/Stag.png", size: "normal" },
];

const stats = [
  { value: "18", label: "Startups Supported" },
  { value: "$2.6M+", label: "Funding Raised" },
  { value: "41", label: "Mentors & VCs" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/acceleratormeeting.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Logo Overlay with Intro Animation */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
          <div className="relative animate-logo-intro">
            <Image
              src="/logo.png"
              alt=""
              width={1200}
              height={1200}
              className="w-[120vw] h-[120vw] min-w-[100vh] min-h-[100vh] object-contain"
              priority
            />
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl z-[2]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl z-[2]" />

        <div className="relative z-[10] max-w-5xl mx-auto px-6 text-center">
          {/* Main headline */}
          <h1 className="animate-fade-up opacity-0 animation-delay-intro font-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6">
            Claremont
            <br />
            <span className="text-white">Accelerator</span>
          </h1>

          {/* Mission statement */}
          <p className="animate-fade-up opacity-0 animation-delay-intro-100 text-xl md:text-2xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Helping founders start and scale startups by providing them with{" "}
            <span className="text-white font-semibold">mentorship</span>,{" "}
            <span className="text-white font-semibold">money</span>, and{" "}
            <span className="text-white font-semibold">manpower</span>.
          </p>

          {/* CTA */}
          <div className="animate-fade-up opacity-0 animation-delay-intro-200">
            <CTAButton href="/apply" size="large">
              Join a Startup Today
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Stats Section - Full Width Band */}
      <section className="py-8 bg-[var(--surface-elevated)] border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <p className="font-black text-2xl md:text-5xl text-white mb-1 md:mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[var(--muted-light)] text-xs md:text-base">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                Who We Are
              </h2>
              <p className="text-[var(--muted-light)] text-lg max-w-2xl mx-auto">
                The <span className="text-white font-medium">Claremont Accelerator</span> is the premier startup accelerator for the five Claremont Colleges. We help founders start and scale their startups by providing them with{" "}
                <span className="text-white font-semibold">mentorship</span>,{" "}
                <span className="text-white font-semibold">money</span>, and{" "}
                <span className="text-white font-semibold">manpower</span>.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Claremont Accelerator (Main Program) */}
            <ScrollReveal delay={0}>
              <div className="relative group bg-[var(--surface-elevated)] rounded-2xl p-6 border border-[var(--border)] hover:border-white/20 transition-all h-full">
                <div className="w-12 h-12 rounded-full pulse-circle flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-black text-xl text-white mb-2">Claremont Accelerator</h3>
                <p className="text-[#a5b4fc] text-sm font-medium mb-3">Main Program</p>
                <ul className="text-[var(--muted)] text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Year-long cohort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span><span className="text-white font-medium">$5K - $15K</span> in funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>For startups with traction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Matched with paid interns</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* CA Studio */}
            <ScrollReveal delay={100}>
              <div className="relative group bg-[var(--surface-elevated)] rounded-2xl p-6 border border-[var(--border)] hover:border-white/20 transition-all h-full">
                <div className="w-12 h-12 rounded-full pulse-circle flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-black text-xl text-white mb-2">CA Studio</h3>
                <p className="text-[#a5b4fc] text-sm font-medium mb-3">Pre-Accelerator</p>
                <ul className="text-[var(--muted)] text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Semester-long program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span><span className="text-white font-medium">$1K</span> funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Individual-level (not teams)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Early-stage / idea-stage founders</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Intern Program */}
            <ScrollReveal delay={200}>
              <div className="relative group bg-[var(--surface-elevated)] rounded-2xl p-6 border border-[var(--border)] hover:border-white/20 transition-all h-full">
                <div className="w-12 h-12 rounded-full pulse-circle flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-black text-xl text-white mb-2">Intern Program</h3>
                <p className="text-[#a5b4fc] text-sm font-medium mb-3">Work at a Startup</p>
                <ul className="text-[var(--muted)] text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Paid positions at CA startups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Real startup experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Work directly with founders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Build your portfolio</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div className="text-center mt-10">
              <CTAButton href="/apply" size="large">
                Learn More & Apply
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="pt-8 pb-16 bg-[var(--surface)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                Startups We&apos;ve Supported
              </h2>
              <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
                Join the ranks of innovative companies that got their start with us
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Scrolling Logo Marquee */}
        <ScrollReveal>
          <div className="relative w-full overflow-hidden">
            <div
              className="flex w-max"
              style={{
                animation: 'marquee 30s linear infinite',
              }}
            >
              {/* First set of logos */}
              {startups.map((startup, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 md:px-4 flex items-center justify-center"
                >
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    width={startup.size === "large" ? 360 : 280}
                    height={startup.size === "large" ? 180 : 140}
                    className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity ${
                      startup.size === "large" ? "max-h-[90px] md:max-h-[180px]" : "max-h-[70px] md:max-h-[140px]"
                    }`}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {startups.map((startup, index) => (
                <div
                  key={`dup-${index}`}
                  className="flex-shrink-0 px-2 md:px-4 flex items-center justify-center"
                >
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    width={startup.size === "large" ? 360 : 280}
                    height={startup.size === "large" ? 180 : 140}
                    className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity ${
                      startup.size === "large" ? "max-h-[90px] md:max-h-[180px]" : "max-h-[70px] md:max-h-[140px]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
