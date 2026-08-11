import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

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
  { value: "$40,000,000+", label: "Combined Enterprise Value" },
  { value: "100+", label: "Mentors & VCs" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      {/* pt here nudges every section down together; the navbar is a sibling
          of this wrapper (in layout.tsx) so it stays put. */}
      <div className="relative z-10 pt-0">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">

        {/* Team cutout — desktop only */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 z-0 justify-center translate-y-24">
          <Image
            src="/betterbg-transparent.png"
            alt="Claremont Accelerator team"
            width={6003}
            height={4131}
            className="w-[80%] h-auto"
            priority
          />
        </div>

        {/* Text — centered on mobile, top-aligned on desktop */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center md:justify-start text-center px-6 pt-0 md:pt-40">
          <h1 className="animate-fade-up opacity-0 font-black text-5xl md:text-7xl lg:text-8xl text-white mb-5 md:whitespace-nowrap">
            Claremont Accelerator
          </h1>

          <p className="animate-fade-up opacity-0 animation-delay-100 text-xl md:text-2xl text-white/75 max-w-2xl mx-auto mb-5 leading-snug tracking-tight">
            We help 5C student-founders start and scale their startups by providing them with{" "}
            <span className="text-white font-semibold">money</span>,{" "}
            <span className="text-white font-semibold">mentorship</span>, and{" "}
            <span className="text-white font-semibold">manpower</span>.
          </p>

          {/* Backed by */}
          <div className="animate-fade-up opacity-0 animation-delay-200 flex items-center gap-6 mb-11 flex-wrap justify-center">
            <p className="text-white/40 text-xs uppercase tracking-widest font-medium whitespace-nowrap">CA founders backed by</p>
            <div className="flex items-center gap-7 flex-wrap justify-center">
              {/* YC — square mark, keep orange */}
              <div className="relative w-7 h-7 opacity-80 hover:opacity-100 transition-opacity">
                <Image src="/logos/partners/y-combinator2.png" alt="Y Combinator" fill className="object-contain grayscale opacity-60 hover:opacity-90 transition-opacity" />
              </div>
              {/* a16z — wide emblem */}
              <div className="relative w-16 h-9 opacity-60 hover:opacity-90 transition-opacity">
                <Image src="/logos/partners/a16z.png" alt="Andreessen Horowitz" fill className="object-contain brightness-0 invert" />
              </div>
              {/* Entrepreneurs First — stacked wordmark */}
              <div className="relative w-16 h-9 opacity-60 hover:opacity-90 transition-opacity">
                <Image src="/logos/partners/ef_v4.png" alt="Entrepreneurs First" fill className="object-contain brightness-0 invert" />
              </div>
{/* Z Fellows — very wide raster logo */}
              <div className="relative w-28 h-6 opacity-60 hover:opacity-90 transition-opacity">
                <Image src="/logos/partners/zfellows.svg" alt="Z Fellows" fill className="object-contain brightness-0 invert" />
              </div>
              {/* Afore — horizontal wordmark */}
              <div className="relative w-20 h-6 opacity-60 hover:opacity-90 transition-opacity">
                <Image src="/logos/partners/afore.webp" alt="Afore Capital" fill className="object-contain brightness-0 invert" />
              </div>
              {/* 1517 — horizontal wordmark, dark red → invert to white */}
              <div className="relative w-14 h-6 opacity-60 hover:opacity-90 transition-opacity">
                <Image src="/logos/partners/1517.svg" alt="1517 Fund" fill className="object-contain brightness-0 invert" />
              </div>
            </div>
          </div>

          <div className="animate-fade-up opacity-0 animation-delay-300 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/found"
              className="sheen group inline-flex items-center gap-2 rounded-full bg-[#0165fc] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              style={{
                boxShadow:
                  "inset 0 1px 0 0 rgba(255,255,255,0.32), 0 12px 32px -8px rgba(1,101,252,0.7)",
              }}
            >
              Start a company
              <IconArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                stroke={2.2}
              />
            </Link>

            <Link
              href="/intern"
              className="glass glass-hover inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-medium text-white/85"
            >
              Intern at a startup
            </Link>
          </div>
        </div>

      </section>

      {/* Stats Section - Full Width Band */}
      <section className="py-8 bg-white/[0.025] border-y border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                Who We Are
              </h2>
              <p className="text-[var(--muted-light)] text-lg max-w-2xl mx-auto">
                Claremont Accelerator is the only school-sponsored startup accelerator supporting the five Claremont Colleges. We help student-founders start and scale their startups by providing them with mentorship, manpower, and money.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Program Cards */}
          <h3 className="font-bold text-2xl text-white mb-4">Our Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Claremont Accelerator (Main Program) */}
            <ScrollReveal delay={0}>
              <div className="glass glass-hover rounded-2xl p-6 h-full">
                <h3 className="font-black text-xl text-white mb-2">Claremont Accelerator</h3>
                <p className="text-[#3385fd] text-sm font-medium mb-3">Main Program</p>
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
              <div className="glass glass-hover rounded-2xl p-6 h-full">
                <h3 className="font-black text-xl text-white mb-2">CA Studio</h3>
                <p className="text-[#3385fd] text-sm font-medium mb-3">Pre-Accelerator</p>
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
              <div className="glass glass-hover rounded-2xl p-6 h-full">
                <h3 className="font-black text-xl text-white mb-2">Intern Program</h3>
                <p className="text-[#3385fd] text-sm font-medium mb-3">Work at a Startup</p>
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
              <Link
                href="/intern"
                className="sheen group inline-flex items-center gap-2 rounded-full bg-[#0165fc] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                style={{
                  boxShadow:
                    "inset 0 1px 0 0 rgba(255,255,255,0.32), 0 12px 32px -8px rgba(1,101,252,0.7)",
                }}
              >
                Learn More &amp; Apply
                <IconArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  stroke={2.2}
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="pt-8 pb-8 overflow-hidden">
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
          <div className="relative w-full overflow-hidden py-4">
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
                  className="flex-shrink-0 px-0.5 md:px-1 flex items-center justify-center"
                >
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    width={startup.size === "large" ? 360 : 280}
                    height={startup.size === "large" ? 180 : 140}
                    className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity ${
                      startup.size === "large" ? "max-h-[45px] md:max-h-[90px]" : "max-h-[35px] md:max-h-[70px]"
                    }`}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {startups.map((startup, index) => (
                <div
                  key={`dup-${index}`}
                  className="flex-shrink-0 px-0.5 md:px-1 flex items-center justify-center"
                >
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    width={startup.size === "large" ? 360 : 280}
                    height={startup.size === "large" ? 180 : 140}
                    className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity ${
                      startup.size === "large" ? "max-h-[45px] md:max-h-[90px]" : "max-h-[35px] md:max-h-[70px]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
      </div>
    </div>
  );
}
