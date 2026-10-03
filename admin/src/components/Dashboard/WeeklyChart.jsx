export default function WeeklyChart({ WEEKLY }) {
  const max = Math.max(...WEEKLY.map((d) => d.received));
  const ticks = [max, Math.round(max * 0.5), 0];

  return (
    <div>
      <div className="mb-4 flex gap-5 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#17385f]" /> Received
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#0e9fb0]" /> Approved
        </span>
      </div>

      <div className="flex gap-3">
        <div className="flex h-48 flex-col justify-between text-xs text-slate-400">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="relative flex-1">
          <div
            className="absolute inset-0 flex flex-col justify-between"
            aria-hidden="true"
          >
            {ticks.map((t) => (
              <div
                key={t}
                className="border-t border-dashed border-slate-100"
              />
            ))}
          </div>

          <div className="relative flex h-48 items-end justify-between gap-2">
            {WEEKLY.map((d) => (
              <div
                key={d.day}
                className="flex h-full flex-1 items-end justify-center gap-1"
              >
                <div
                  className="w-full max-w-4.5 rounded-t bg-[#17385f]"
                  style={{ height: `${(d.received / max) * 100}%` }}
                  title={`${d.day}: ${d.received} received`}
                />
                <div
                  className="w-full max-w-4.5 rounded-t bg-[#0e9fb0]"
                  style={{ height: `${(d.approved / max) * 100}%` }}
                  title={`${d.day}: ${d.approved} approved`}
                />
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-between gap-2 text-xs text-slate-500">
            {WEEKLY.map((d) => (
              <span key={d.day} className="flex-1 text-center">
                {d.day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
