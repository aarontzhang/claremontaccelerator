import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

// Application form URLs
const FOUNDER_APPLICATION_URL = "https://docs.google.com/forms/d/1ODnyqt-Y0f1UXhx-2BRLloTDYEwGQIL-UJDZOqmDgA4/edit";
const STUDIO_APPLICATION_URL = "https://docs.google.com/forms/d/1BWg-0runr2VRAaaMXf554R0jLM80_S2Bj1qWApXZBps/edit";

export default function Apply() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/acceleratormeeting-11.jpg"
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
            Join a Startup Today
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Get paid to work at an early-stage startup, or get funding, mentorship, and talented students to join your team.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-black text-2xl md:text-3xl text-white mb-12 text-center">
              How It Works
            </h2>
          </ScrollReveal>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-[var(--border)]" />

            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {/* Step 1 - Info Session */}
              <ScrollReveal delay={0}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-white mt-4 mb-1">Info Session</h3>
                  <p className="text-[var(--muted)] text-sm">Learn about our programs</p>
                </div>
              </ScrollReveal>

              {/* Step 2 - Application */}
              <ScrollReveal delay={100}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-white mt-4 mb-1">Application</h3>
                  <p className="text-[var(--muted)] text-sm">Submit your application</p>
                </div>
              </ScrollReveal>

              {/* Step 3 - Interviews */}
              <ScrollReveal delay={200}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-white mt-4 mb-1">Interviews</h3>
                  <p className="text-[var(--muted)] text-sm">Meet the team</p>
                </div>
              </ScrollReveal>

              {/* Step 4 - Start Building */}
              <ScrollReveal delay={300}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 z-10 pulse-circle">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-white mt-4 mb-1">Start Building</h3>
                  <p className="text-[var(--muted)] text-sm">Join the program</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Program Sections */}
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-black text-3xl md:text-4xl text-white mb-12 text-center">
              Our Programs
            </h2>
          </ScrollReveal>

          {/* Program 1: Claremont Accelerator (Main) */}
          <ScrollReveal>
            <div className="mb-16 pb-16 border-b border-[var(--border)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full pulse-circle flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-2xl text-white">Claremont Accelerator</h3>
                  <p className="text-[#a5b4fc] font-medium">Main Program</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-3">What You Get</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Year-long cohort of dedicated support</li>
                    <li>• <span className="text-white font-medium">$5,000 - $15,000</span> in non-dilutive funding</li>
                    <li>• Mentorship from 40+ VCs and founders</li>
                    <li>• Paid interns matched to your startup</li>
                    <li>• Demo Day presentation to investors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3">Who Should Apply</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Startups with traction (users, revenue, or prior funding)</li>
                    <li>• Teams committed to building full-time or significant part-time</li>
                    <li>• At least one founder from the 5Cs</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <CTAButton href={FOUNDER_APPLICATION_URL} external>
                  Apply as a Founder
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Program 2: CA Studio */}
          <ScrollReveal>
            <div className="mb-16 pb-16 border-b border-[var(--border)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full pulse-circle flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-2xl text-white">CA Studio</h3>
                  <p className="text-[#a5b4fc] font-medium">Pre-Accelerator Program</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-3">What You Get</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Semester-long structured program</li>
                    <li>• <span className="text-white font-medium">$1,000</span> in funding</li>
                    <li>• Workshops and mentorship sessions</li>
                    <li>• Automatic final-round interview for main program</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3">Who Should Apply</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Individual founders (not teams)</li>
                    <li>• Early-stage or idea-stage</li>
                    <li>• Looking to validate and build your first MVP</li>
                    <li>• Want a pathway to the main accelerator</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <CTAButton href={STUDIO_APPLICATION_URL} external>
                  Apply to CA Studio
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Program 3: Intern Program */}
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full pulse-circle flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-2xl text-white">Intern Program</h3>
                  <p className="text-[#a5b4fc] font-medium">Work at a Startup</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-3">What You Get</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• <span className="text-white font-medium">Paid positions</span> at CA portfolio startups</li>
                    <li>• Real startup experience on your resume</li>
                    <li>• Work directly with founders on impactful projects</li>
                    <li>• Network with the 5C entrepreneurship community</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3">Who Should Apply</h4>
                  <ul className="text-[var(--muted-light)] space-y-2">
                    <li>• Students from any of the 5 Claremont Colleges</li>
                    <li>• Interested in engineering, design, marketing, or operations</li>
                    <li>• Want hands-on startup experience vs. corporate internship</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <CTAButton href="#" disabled>
                  Coming Soon
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
