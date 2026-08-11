import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { loadAllStartups } from "@/lib/startups";
import {
  IconArrowNarrowRight,
  IconChevronDown,
  IconCurrencyDollar,
  IconExternalLink,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";

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
    <div className="relative min-h-screen bg-black flat-cards">
      <div className="relative z-10">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[79px] border-b border-white/[0.13]">
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
      <section className="py-20">
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
                Icon: IconShieldCheck,
              },
              {
                title: "Network with ambitious people",
                body: "Work alongside 5C founders backed by YC, a16z, Afore, 1517, EF, and Z Fellows. The intros compound long after the role ends.",
                Icon: IconUsers,
              },
              {
                title: "Earn money",
                body: "All roles are paid.",
                Icon: IconCurrencyDollar,
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center mb-4">
                    <item.Icon className="w-5 h-5 text-slate-700" stroke={2} />
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
      <section id="roles" className="py-20 border-y border-white/[0.07]">
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
                <IconArrowNarrowRight className="w-4 h-4" stroke={2} />
              </Link>
            </div>
          </ScrollReveal>

          {totalOpenRoles > 0 ? (
            <div className="space-y-8">
              {startupsWithJobs.map((s) => (
                <ScrollReveal key={s.slug}>
                  <div className="glass rounded-2xl overflow-hidden">
                    <div className="relative z-10 flex items-center gap-4 p-6 border-b border-white/[0.07]">
                      {s.logoExists ? (
                        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 p-2">
                          <Image
                            src={s.logo}
                            alt={s.name}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
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
                    <ul className="relative z-10 divide-y divide-white/[0.07]">
                      {s.jobs.map((job, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-4 p-5 hover:bg-white/[0.04] transition-colors">
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
                            <IconExternalLink className="w-4 h-4" stroke={2} />
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
              {activeStartups.filter((s) => ["kandor-ai", "flash-biometrics", "openflow", "lintel"].includes(s.slug)).map((s, i) => (
                <ScrollReveal key={s.slug} delay={i * 30}>
                  <Link
                    href={`/startups/${s.slug}`}
                    className="glass glass-flat glass-hover group block h-full rounded-xl p-5"
                  >
                    <div className={`relative z-10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden mb-4 ${s.cohort >= 4 ? "bg-white" : "bg-white/5"}`}>
                      {s.logoExists ? (
                        <Image
                          src={s.logo}
                          alt={s.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-0.5 rounded-md"
                        />
                      ) : (
                        <span className="text-white font-black text-lg">{s.name.charAt(0)}</span>
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

      {/* FAQ */}
      <section className="py-20 border-t border-white/[0.07]">
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
                <details className="glass glass-flat group rounded-xl overflow-hidden">
                  <summary className="relative z-10 flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-semibold text-white">{item.q}</span>
                    <IconChevronDown
                      className="w-5 h-5 text-[var(--muted)] transition-transform group-open:rotate-180 flex-shrink-0"
                      stroke={2}
                    />
                  </summary>
                  <div className="relative z-10 px-5 pb-5 text-[var(--muted-light)] leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
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
              <IconArrowNarrowRight className="w-5 h-5" stroke={2} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
      </div>
    </div>
  );
}
