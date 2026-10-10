import { Card, ViewAll } from "../index";

export default function OfficeBreakdown({ offices, onNavigate }) {
  const maxValue = Math.max(...offices.map((item) => item.value), 1);

  return (
    <Card
      title="Applications by office"
      action={<ViewAll onClick={() => onNavigate("offices")} />}
    >
      {offices.length > 0 ? (
        <div className="space-y-5">
          {offices.map((office) => {
            const percentage = Math.round((office.value / maxValue) * 100);

            return (
              <div key={office.name}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium text-slate-700">
                    {office.name}
                  </span>

                  <span className="shrink-0 text-sm text-slate-500">
                    {office.value}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#0e9fb0] transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center text-sm text-slate-500">
          No office data available.
        </div>
      )}
    </Card>
  );
}
