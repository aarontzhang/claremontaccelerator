import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

const MENTOR_FORM_URL = "mailto:claremontaccelerator@gmail.com?subject=Mentor%20Interest";

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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden mt-[72px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/acceleratormeeting-11.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="animate-fade-up opacity-0 font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Become a Mentor
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Share your experience with the next generation of student founders. Your time is the most valuable thing you can give.
          </p>
          <div className="animate-fade-up opacity-0 animation-delay-200">
            <a
              href={MENTOR_FORM_URL}
              className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all hover:scale-105 px-8 py-4 text-lg text-white"
              style={{ background: "#0165fc" }}
            >
              Get Involved
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* What you'll do */}
      <section className="py-16 bg-[var(--surface)]">
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
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#0165fc] flex-shrink-0" />
                  <span className="text-[var(--muted-light)] text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-black text-2xl md:text-3xl text-white mb-4">Ready to give back?</h2>
            <p className="text-[var(--muted)] text-lg mb-8">
              Reach out and we&apos;ll connect you with a cohort that fits your background.
            </p>
            <a
              href={MENTOR_FORM_URL}
              className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all hover:scale-105 px-8 py-4 text-lg text-white"
              style={{ background: "#0165fc" }}
            >
              Get Involved
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
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
