import Link from "next/link";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";

export const metadata = {
  title: "Apply — Claremont Accelerator",
};

const CONTACT_EMAIL = "cwitzansky29@cmc.edu";
const REPLY_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "I'm interested in being a CA founder"
)}`;

export default function CohortApply() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      <div className="relative z-10 pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/found"
            className="inline-flex items-center gap-1.5 text-[#3385fd] hover:text-white text-sm font-semibold transition-colors mb-8"
          >
            <IconArrowLeft className="w-4 h-4" stroke={2} />
            Back to Found a CA Startup
          </Link>

          {/* Email mockup */}
          <div className="glass rounded-2xl overflow-hidden">
            {/* Window chrome */}
            <div className="relative z-10 flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs font-semibold text-white/45 uppercase tracking-wider">
                Mail
              </span>
            </div>

            {/* Message header */}
            <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-6 pb-5 border-b border-white/[0.07]">
              <h1 className="font-black text-xl md:text-2xl text-white leading-snug mb-4">
                So you want to be a founder?
              </h1>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ background: "#0165fc" }}>
                  CW
                </div>
                <div className="min-w-0 text-sm">
                  <p className="text-white font-semibold">
                    Chase Witzansky
                    <span className="text-white/45 font-normal ml-1.5">&lt;{CONTACT_EMAIL}&gt;</span>
                  </p>
                  <p className="text-white/45">To: Future 5C founders</p>
                </div>
              </div>
            </div>

            {/* Message body */}
            <div className="relative z-10 bg-white text-[#1a1a1a] px-6 py-8 sm:px-12 sm:py-10 lg:px-16 space-y-5 text-[15px] leading-relaxed">
              <p>Hi all,</p>

              <p>
                My name is Chase Witzansky and, alongside Melanie Haro, I will be serving as
                Co-President of the Claremont Accelerator this year.
              </p>

              <p>
                Some of you may know what CA does for founders, but for those who don&rsquo;t, I
                will keep it brief: we provide 5C-student-founded companies with money
                (equity-free, up to $15k), mentorship, and manpower (internship program). In our
                short three-year history, we&rsquo;ve sent two companies to YC, one to a16z, and
                many more to other great firms like Afore, 1517, etc.
              </p>

              <p>
                It is part of our mission to ensure that all of you who are interested in these
                classic accelerators have every possible connection and advantage. Yes, this
                includes referrals. For those interested in other funding paths, including
                bootstrapping, we will also provide you with all of the advantages our network
                opens up.
              </p>

              <p>
                To put it simply: if you&rsquo;re interested in building a startup during your
                time at the 5Cs, this is the right place to do it.
              </p>

              <div>
                <p>Our application process is simple:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>a short, informal chat with me, Melanie, or another CA leadership team member</li>
                  <li>a longer meeting with Melanie and me, including a demo</li>
                  <li>feedback on the spot</li>
                  <li>a final decision around the first week of October</li>
                </ol>
              </div>

              <p className="font-bold">
                If you&rsquo;re thinking about building now, please email me ASAP with your
                name, graduation year, and a brief overview of what you&rsquo;re
                building/where you&rsquo;re at in the process. Please make the subject line
                &ldquo;I&rsquo;m interested in being a CA founder&rdquo;
              </p>

              <p>
                One of the most important parts of building is receiving feedback and iterating
                on it. If we aren&rsquo;t quite convinced of your idea after the first demo,
                that doesn&rsquo;t mean you&rsquo;ve been rejected! This is the perfect
                opportunity for you to demonstrate the quality and speed of your iteration
                process. We will take as many repeat meetings as we can until September 30th.
              </p>

              <p>
                Since you are all clever, you probably realize that this creates an incentive to
                meet sooner rather than later (as this gives you more &ldquo;chances&rdquo; to
                join the cohort). You are correct, and all of you should reach out for your
                preliminary chat as soon as possible.
              </p>

              <p>
                As for the size of our cohort: we are planning to support around four startups
                this year, but this is subject to increase depending on the quality of
                applications and the needs of the cohort, so do not let this discourage you from
                &ldquo;shooting your shot.&rdquo;
              </p>

              <p>I am so excited for an amazing year with you all. Let&rsquo;s do some cool shit!</p>

              <p>
                Best,
                <br />
                Chase Witzansky
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={REPLY_MAILTO}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-105"
              style={{ background: "#0165fc" }}
            >
              <IconMail className="w-4 h-4" stroke={2} />
              Reply to Chase
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
