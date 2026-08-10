import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { loadAllStartups } from "@/lib/startups";

export const metadata = {
  title: "Intern at a CA Startup",
  description:
    "Get paid to build alongside student founders. Real ownership, real users, real equity in your resume.",
};

export default function InternPage() {
  const startups = loadAllStartups().filter((s) => s.status !== "acquired");
  const activeStartups = startups.filter((s) => s.status === "active");
  const startupsWithJobs = activeStartups.filter((s) => s.jobs.length > 0);
  const totalOpenRoles = startupsWithJobs.reduce((n, s) => n + s.jobs.length, 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden mt-[72px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/acceleratormeeting-18.jpg"
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
          <h1 className="animate-fade-up opacity-0 font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.05]">
            Intern at a CA Startup
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 max-w-xl mx-auto">
            Ship real product to real users at a 5C-founded startup — during the
            semester, over breaks, or full-time.
          </p>
        </div>
      </section>

      {/* Why intern */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                Get real experience
              </h2>
              <p className="text-[var(--muted-light)] text-lg max-w-2xl mx-auto">
                Startup interns gain valuable experience that&apos;s highly
                applicable for consulting/tech recruiting, or for any other path
                you plan to pursue.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Get real experience",
                body: "Own features end-to-end, talk to users, and ship work that goes live the same week. The kind of story you can actually tell in an interview.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
              },
              {
                title: "Network with ambitious people",
                body: "Work alongside 5C founders backed by YC, a16z, Afore, 1517, EF, and Z Fellows. The intros compound long after the role ends.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ),
              },
              {
                title: "Earn money",
                body: "All roles are paid.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v18M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7"
                  />
                ),
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="h-full bg-[var(--surface-elevated)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all">
                  <div className="w-11 h-11 rounded-lg bg-[#0165fc]/15 border border-[#0165fc]/30 flex items-center justify-center mb-4">
                    <svg
                      className="w-5 h-5"
                      style={{ color: "#3385fd" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-[var(--muted-light)] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles / hiring startups */}
      <section id="roles" className="py-20 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <h2 className="font-black text-4xl md:text-5xl text-white mb-3">
                  {totalOpenRoles > 0 ? "Open roles" : "Where you could intern"}
                </h2>
                <p className="text-[var(--muted-light)] text-lg max-w-2xl">
                  {totalOpenRoles > 0
                    ? `${totalOpenRoles} open role${totalOpenRoles === 1 ? "" : "s"} across ${startupsWithJobs.length} portfolio startup${startupsWithJobs.length === 1 ? "" : "s"}.`
                    : "Roles for the coming cycle aren't posted yet. Here are the portfolio startups you'd be matched with."}
                </p>
              </div>
              <Link
                href="/startups"
                className="text-[#3385fd] hover:text-white text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                Browse the full portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          {totalOpenRoles > 0 ? (
            <div className="space-y-8">
              {startupsWithJobs.map((s) => (
                <ScrollReveal key={s.slug}>
                  <div className="bg-[var(--surface-elevated)] rounded-2xl border border-[var(--border)] overflow-hidden">
                    <div className="flex items-center gap-4 p-6 border-b border-[var(--border)]">
                      {s.logoExists ? (
                        <div className="w-14 h-14 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0 p-2">
                          <Image
                            src={s.logo}
                            alt={s.name}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-black text-lg">
                            {s.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/startups/${s.slug}`}
                          className="font-black text-xl text-white hover:text-[#3385fd] transition-colors"
                        >
                          {s.name}
                        </Link>
                        <p className="text-[var(--muted-light)] text-sm truncate">{s.tagline}</p>
                      </div>
                    </div>
                    <ul className="divide-y divide-[var(--border)]">
                      {s.jobs.map((job, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-4 p-5 hover:bg-white/[0.02] transition-colors">
                          <div className="min-w-0">
                            <p className="text-white font-semibold">{job.title}</p>
                            <p className="text-[var(--muted)] text-sm mt-0.5">
                              {[job.type, job.location].filter(Boolean).join(" · ")}
                            </p>
                          </div>
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3385fd] hover:text-white transition-colors flex-shrink-0"
                          >
                            Apply
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeStartups.map((s, i) => (
                <ScrollReveal key={s.slug} delay={i * 30}>
                  <Link
                    href={`/startups/${s.slug}`}
                    className="group block h-full bg-[var(--surface-elevated)] rounded-xl p-5 border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all"
                  >
                    <div className="h-14 flex items-center mb-4">
                      {s.logoExists ? (
                        <Image
                          src={s.logo}
                          alt={s.name}
                          width={140}
                          height={56}
                          className="object-contain max-h-14 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <span className="text-white font-black text-2xl">{s.name}</span>
                      )}
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{s.name}</p>
                    <p className="text-[var(--muted)] text-xs leading-snug line-clamp-2">
                      {s.tagline}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-black text-4xl md:text-5xl text-white mb-4">
                How it works
              </h2>
              <p className="text-[var(--muted-light)] text-lg max-w-2xl mx-auto">
                One application. We handle the matching.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Apply once",
                body: "Tell us your skills, interests, and what kind of startup you'd want to build at. Takes about 15 minutes.",
              },
              {
                step: "02",
                title: "Get matched",
                body: "We introduce you to founders whose roles fit. You interview with the teams you're excited about.",
              },
              {
                step: "03",
                title: "Sign & start",
                body: "Compensation and terms are handled between you and the startup. We stay hands-off after intros.",
              },
              {
                step: "04",
                title: "Ship",
                body: "Nights, weekends, or full-time. Some interns turn into founding engineers by graduation.",
              },
            ].map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 80}>
                <div className="relative h-full">
                  <div className="text-[#0165fc]/40 font-black text-5xl mb-3 leading-none">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{s.title}</h3>
                  <p className="text-[var(--muted-light)] text-sm leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-black text-4xl md:text-5xl text-white mb-10 text-center">
              Common questions
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {[
              {
                q: "Do I need to be a CS major?",
                a: "No. Startups hire for engineering, design, growth, ops, research, and community. If you're strong at something and want to ship it, we'll find you a fit.",
              },
              {
                q: "Do I have to be a 5C student?",
                a: "Yes. The program is exclusive to students at Pomona, CMC, Scripps, Harvey Mudd, and Pitzer. Alumni within one year of graduation are considered case-by-case.",
              },
              {
                q: "Is this full-time only?",
                a: "No. Roles range from ~10 hrs/week during the semester to full-time over the summer. You tell us your availability on the app.",
              },
              {
                q: "How much do interns get paid?",
                a: "Rates are set by the individual startup, typically $20–$40/hr depending on role and stage. Some early-stage teams offer equity in addition to cash.",
              },
              {
                q: "What if I want to found instead of intern?",
                a: (
                  <>
                    Head over to{" "}
                    <Link href="/found" className="text-[#3385fd] hover:text-white underline">
                      the founder track
                    </Link>{" "}
                    — same community, different door.
                  </>
                ),
              },
            ].map((item) => (
              <ScrollReveal key={item.q}>
                <details className="group bg-[var(--surface-elevated)] rounded-xl border border-[var(--border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-semibold text-white">{item.q}</span>
                    <svg
                      className="w-5 h-5 text-[var(--muted)] transition-transform group-open:rotate-180 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[var(--muted-light)] leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-black text-4xl md:text-5xl text-white mb-4 leading-tight">
              Ready to build with a startup?
            </h2>
            <p className="text-[var(--muted-light)] text-lg mb-8 max-w-xl mx-auto">
              Applications open each cycle. In the meantime, get to know the
              startups you could be building at.
            </p>
            <Link
              href="/startups"
              className="inline-flex items-center gap-2 text-white text-lg font-semibold border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Browse the portfolio
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
