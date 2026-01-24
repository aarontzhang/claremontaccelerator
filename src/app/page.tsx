import CTAButton from "@/components/CTAButton";
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
  { value: "$2.5M+", label: "Funding Raised" },
  { value: "41", label: "Mentors & VCs" },
  { value: "5", label: "Colleges United" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/CA.jpg"
            alt=""
            fill
            className="object-cover blur-sm"
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
              className="w-[120vw] h-[120vw] min-w-[100vh] min-h-[100vh] object-contain bubble-logo"
              priority
            />
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl z-[2]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl z-[2]" />

        <div className="relative z-[10] max-w-5xl mx-auto px-6 text-center">
          {/* Main headline */}
          <h1 className="animate-fade-up opacity-0 animation-delay-intro font-black text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
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

      {/* Stats Section */}
      <section className="pt-16 pb-8 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-black text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Blurb */}
      <section className="py-10 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-white font-bold text-xl mb-4">Who We Are</h3>
          <p className="text-[var(--muted-light)] text-lg leading-relaxed mb-4">
            The <span className="text-white font-medium">Claremont Accelerator</span> is the premier startup accelerator for the five Claremont Colleges. We believe that the best time to start a company is while you're still in school, surrounded by talented peers and with the freedom to take risks.
          </p>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            Each semester, we select a cohort of promising startups and match them with students eager to gain real-world experience. Our program bridges the gap between the classroom and the startup world, giving students the opportunity to build something meaningful before they graduate.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="pt-8 pb-16 bg-[var(--surface)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-black text-4xl md:text-5xl font-bold text-white mb-4">
              Startups We&apos;ve Supported
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              Join the ranks of innovative companies that got their start with us
            </p>
          </div>
        </div>

        {/* Scrolling Logo Marquee */}
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
                className="flex-shrink-0 px-8 flex items-center justify-center"
              >
                <Image
                  src={startup.logo}
                  alt={startup.name}
                  width={startup.size === "large" ? 360 : 280}
                  height={startup.size === "large" ? 180 : 140}
                  className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity bubble-logo ${
                    startup.size === "large" ? "max-h-[180px]" : "max-h-[140px]"
                  }`}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {startups.map((startup, index) => (
              <div
                key={`dup-${index}`}
                className="flex-shrink-0 px-8 flex items-center justify-center"
              >
                <Image
                  src={startup.logo}
                  alt={startup.name}
                  width={startup.size === "large" ? 360 : 280}
                  height={startup.size === "large" ? 180 : 140}
                  className={`object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity bubble-logo ${
                    startup.size === "large" ? "max-h-[180px]" : "max-h-[140px]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
