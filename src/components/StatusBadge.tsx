import Pill from "@/components/Pill";

// Shared by the portfolio grid and the startup detail page. These were once two
// separate copies that drifted apart (one used the legacy `--border` token), so
// the same startup rendered a different badge on each page.
export default function StatusBadge({ status }: { status: string }) {
  const active = status === "active";
  return (
    <Pill tone={active ? "success" : "muted"}>
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          active ? "bg-emerald-400" : "bg-[var(--muted)]"
        }`}
      />
      {active ? "Active" : "Inactive"}
    </Pill>
  );
}
