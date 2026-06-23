export function HeroDeviceMockup() {
  return (
    <div
      className="hero-mockup-float flex h-full items-center justify-end pr-6 pl-4 xl:pr-12"
      aria-hidden="true"
    >
      <div className="w-full max-w-[520px] rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,17,0.8)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 rounded-t-xl border-b border-[rgba(255,255,255,0.06)] bg-[#080808] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
          </div>
          <div className="h-6 flex-1 rounded-md border border-[rgba(255,255,255,0.06)] bg-[#111111]" />
        </div>

        {/* Dashboard preview — blurred skeleton */}
        <div className="hero-mockup-preview overflow-hidden rounded-b-xl bg-[#080808] p-4 opacity-90">
          <div className="flex gap-3">
            {/* Sidebar */}
            <div className="flex w-14 shrink-0 flex-col gap-2">
              <div className="h-8 rounded-md bg-[#111111]" />
              <div className="h-6 rounded bg-[rgba(255,255,255,0.04)]" />
              <div className="h-6 rounded bg-[rgba(255,255,255,0.04)]" />
              <div className="h-6 rounded bg-[rgba(37,99,235,0.15)]" />
              <div className="h-6 rounded bg-[rgba(255,255,255,0.04)]" />
              <div className="h-6 rounded bg-[rgba(255,255,255,0.04)]" />
            </div>

            {/* Main content */}
            <div className="min-w-0 flex-1 space-y-4">
              {/* Stat tiles */}
              <div className="grid grid-cols-3 gap-2">
                {[0.6, 0.45, 0.75].map((w, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111111] p-3"
                  >
                    <div
                      className="h-1.5 rounded-full bg-[rgba(37,99,235,0.35)]"
                      style={{ width: `${w * 100}%` }}
                    />
                    <div className="mt-3 h-5 w-2/3 rounded bg-[rgba(255,255,255,0.06)]" />
                    <div className="mt-2 h-2 w-1/2 rounded bg-[rgba(255,255,255,0.04)]" />
                  </div>
                ))}
              </div>

              {/* Chart bars */}
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111111] p-4">
                <div className="mb-4 h-2 w-1/4 rounded bg-[rgba(255,255,255,0.06)]" />
                <div className="flex h-24 items-end gap-1.5">
                  {[40, 65, 45, 80, 55, 70, 50, 90, 60, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-[rgba(37,99,235,0.25)]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Table rows */}
              <div className="space-y-2 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111111] p-3">
                {[0.9, 0.7, 0.85, 0.6].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-6 w-6 shrink-0 rounded bg-[rgba(255,255,255,0.04)]" />
                    <div
                      className="h-2 rounded bg-[rgba(255,255,255,0.06)]"
                      style={{ width: `${w * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
