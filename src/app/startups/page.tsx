import { Suspense } from "react";
import { loadAllStartups, COHORT_ORDER, LATEST_COHORT } from "@/lib/startups";
import PageAtmosphere from "@/components/PageAtmosphere";
import StartupsClient from "./StartupsClient";
import StartupsSkeleton from "./StartupsSkeleton";

export const metadata = {
  title: "Startups — Claremont Accelerator",
  description: "Every startup that has gone through the Claremont Accelerator.",
};

export default function StartupsPage() {
  const startups = loadAllStartups();

  // Page chrome lives here, in the server component, so it ships in the static
  // HTML and paints immediately. Only the interactive list sits behind Suspense
  // — StartupsClient calls useSearchParams(), which would otherwise defer this
  // entire page to client render and leave a blank screen on a cold cache.
  return (
    <div className="relative min-h-screen pt-[179px] pb-20 bg-[#06070c]">
      <PageAtmosphere />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="font-black text-5xl md:text-7xl text-white mb-4">Our Startups</h1>
          <p className="text-[var(--muted-light)] text-lg max-w-2xl">
            {startups.length} companies across {COHORT_ORDER.length} cohorts — all built by students at the Claremont Colleges.
          </p>
        </div>

        <Suspense fallback={<StartupsSkeleton />}>
          <StartupsClient
            startups={startups}
            latestCohort={LATEST_COHORT}
            allCohorts={COHORT_ORDER}
          />
        </Suspense>
      </div>
    </div>
  );
}
