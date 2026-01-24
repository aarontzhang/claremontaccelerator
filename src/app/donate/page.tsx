import CTAButton from "@/components/CTAButton";
import Image from "next/image";

const DONATION_URL = "https://www.cmc.edu/giving/institutes/rlcie";

export default function Donate() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/levy.jpg"
            alt=""
            fill
            className="object-cover object-top brightness-110 saturate-110 blur-[2px]"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="animate-fade-up opacity-0 font-black text-4xl md:text-5xl text-white mb-4">
            Invest in the Next Generation
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Your support helps student founders build companies that matter.
          </p>
          <div className="animate-fade-up opacity-0 animation-delay-200">
            <CTAButton href={DONATION_URL} external size="large">
              Make a Donation
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Where Funds Go */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-black text-2xl md:text-3xl text-white mb-12 text-center">
            Where Your Donation Goes
          </h2>

          {/* Horizontal Layout */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-[var(--border)]" />

            {/* Items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle">
                  <span className="font-black text-sm">70%</span>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Startup Grants</h3>
                <p className="text-[var(--muted)] text-sm">Direct funding for early-stage expenses</p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle" style={{ animationDelay: '1s' }}>
                  <span className="font-black text-sm">10%</span>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Resources</h3>
                <p className="text-[var(--muted)] text-sm">Software, cloud credits, and tools</p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle" style={{ animationDelay: '2s' }}>
                  <span className="font-black text-sm">10%</span>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Events</h3>
                <p className="text-[var(--muted)] text-sm">Workshops, networking, and Demo Day</p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle" style={{ animationDelay: '3s' }}>
                  <span className="font-black text-sm">10%</span>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Operations</h3>
                <p className="text-[var(--muted)] text-sm">Running the accelerator program</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Blurb */}
      <section className="py-10 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-white font-bold text-xl mb-4">Your Impact</h3>
          <p className="text-[var(--muted-light)] text-lg leading-relaxed mb-4">
            Student founders often have the skills and ambition to build great companies, but lack the capital to get started. Your donation changes that. We give <span className="text-white font-medium">grants directly to startups</span> so they can afford their first prototype, hire their first teammate, or reach their first customers.
          </p>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            We also invest in the infrastructure that makes entrepreneurship accessible: cloud credits so students can build without worrying about server costs, software subscriptions for design and development tools, and events that bring founders, mentors, and investors together in one room.
          </p>
        </div>
      </section>
    </div>
  );
}
