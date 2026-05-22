import { loadAllStartups, COHORT_ORDER, LATEST_COHORT } from "@/lib/startups";
import StartupsClient from "./StartupsClient";

export const metadata = {
  title: "Startups — Claremont Accelerator",
  description: "Every startup that has gone through the Claremont Accelerator.",
};

export default function StartupsPage() {
  const startups = loadAllStartups();
  return (
    <StartupsClient
      startups={startups}
      latestCohort={LATEST_COHORT}
      allCohorts={COHORT_ORDER}
    />
  );
}
