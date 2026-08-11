/**
 * Suspense fallback for the interactive portfolio list.
 *
 * StartupsClient calls useSearchParams(), which opts its whole subtree out of
 * prerendering — so without a fallback the filters and grid are simply absent
 * from the static HTML and pop in when JS hydrates. This holds their shape.
 *
 * Note: `animate-pulse` is on the inner placeholder bars, NOT on a wrapper.
 * An animating opacity on an ancestor creates a backdrop root and would kill
 * backdrop-filter on the .glass tiles below it.
 */
export default function StartupsSkeleton() {
  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="glass glass-flat h-[42px] w-full max-w-sm rounded-lg" />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass glass-flat h-[38px] w-[88px] rounded-lg" />
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="h-4 w-28 rounded bg-white/10 animate-pulse mb-6" />

      {/* Card grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass glass-flat rounded-xl p-5 flex flex-col gap-3">
            <div className="relative z-10 w-12 h-12 rounded-lg bg-white/[0.07]" />
            <div className="relative z-10 flex-1">
              <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
              <div className="mt-2 h-3 w-full rounded bg-white/[0.06] animate-pulse" />
              <div className="mt-1.5 h-3 w-4/5 rounded bg-white/[0.06] animate-pulse" />
            </div>
            <div className="relative z-10 flex gap-2">
              <div className="h-[18px] w-16 rounded bg-white/[0.06]" />
              <div className="h-[18px] w-14 rounded bg-white/[0.06]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
