import Link from "next/link";
import { IconArrowNarrowRight } from "@tabler/icons-react";

// notFound() is reachable from /l/[slug] (unknown short link) and
// /startups/[slug]; without this the app fell through to Next's unstyled
// default page, with no navbar, footer or site chrome.
export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-black flat-cards">
      <div className="max-w-2xl mx-auto px-6 pt-48 pb-32 text-center">
        <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="font-black text-4xl md:text-5xl text-white mb-4">Page not found</h1>
        <p className="text-[var(--muted-light)] text-lg mb-10">
          That link may be out of date or mistyped.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-105"
            style={{ background: "var(--accent)" }}
          >
            Back home
          </Link>
          <Link
            href="/startups"
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-white text-sm font-medium transition-colors"
          >
            Browse the portfolio
            <IconArrowNarrowRight className="w-4 h-4" stroke={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
