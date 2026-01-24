import CTAButton from "@/components/CTAButton";
import Image from "next/image";

// Replace these with your actual external application form URLs
const INTERN_APPLICATION_URL = "https://forms.google.com/intern-application";
const FOUNDER_APPLICATION_URL = "https://docs.google.com/forms/d/1ODnyqt-Y0f1UXhx-2BRLloTDYEwGQIL-UJDZOqmDgA4/edit";

export default function Apply() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/demo2.jpg"
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
            Join a Startup Today
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Get paid to work at an early-stage startup, or get funding, mentorship, and talented students to join your team.
          </p>
          <div className="animate-fade-up opacity-0 animation-delay-200 flex flex-wrap gap-4 justify-center">
            <CTAButton href={INTERN_APPLICATION_URL} external size="large">
              Apply as an Intern
            </CTAButton>
            <CTAButton href={FOUNDER_APPLICATION_URL} external variant="outline" size="large">
              Apply as a Founder
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-black text-2xl md:text-3xl text-white mb-12 text-center">
            Recruiting Timeline
          </h2>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-[var(--border)]" />

            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {/* Step 1 - Info Session */}
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Info Session</h3>
                <p className="text-[var(--muted)] text-sm font-medium">January 30th</p>
              </div>

              {/* Step 2 - Written Application */}
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle" style={{ animationDelay: '1s' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Written Application</h3>
                <p className="text-[var(--muted)] text-sm font-medium">February 9th</p>
              </div>

              {/* Step 3 - Founder Interviews */}
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle" style={{ animationDelay: '2s' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Founder Interviews</h3>
                <p className="text-[var(--muted)] text-sm font-medium">February 16th</p>
              </div>

              {/* Step 4 - Work at the Startup */}
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle" style={{ animationDelay: '3s' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-black text-white mt-4 mb-1">Work at the Startup</h3>
                <p className="text-[var(--muted)] text-sm">Start building</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Blurb */}
      <section className="py-10 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-white font-bold text-xl mb-4">Why Join?</h3>
          <p className="text-[var(--muted-light)] text-lg leading-relaxed mb-4">
            <span className="text-white font-medium">For Interns:</span> Skip the corporate internship and work on something real. You&apos;ll get paid to contribute directly to an early-stage startup, whether that&apos;s shipping code, talking to customers, or helping shape the product roadmap.
          </p>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            <span className="text-white font-medium">For Founders:</span> Stop doing everything yourself. We&apos;ll match you with motivated 5C students who want to help you build, and connect you with mentors who have scaled companies before. Plus, you&apos;ll get funding with no strings attached.
          </p>
        </div>
      </section>
    </div>
  );
}
