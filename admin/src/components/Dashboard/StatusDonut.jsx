export default function StatusDonut({ STATUS_BREAKDOWN }) {
  const total = STATUS_BREAKDOWN.reduce((sum, item) => sum + item.value, 0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-40 w-40 shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full -rotate-90"
          role="img"
          aria-label="Applications by status"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="12"
          />

          {STATUS_BREAKDOWN.map((item) => {
            const length = total > 0 ? (item.value / total) * circumference : 0;

            const circle = (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="12"
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
              />
            );

            offset += length;

            return circle;
          })}
        </svg>

        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              {total.toLocaleString()}
            </p>

            <p className="text-xs text-slate-500">applications</p>
          </div>
        </div>
      </div>

      <ul className="w-full space-y-3 border-t border-slate-100 pt-5 text-sm">
        {STATUS_BREAKDOWN.map((item) => {
          const percentage =
            total > 0 ? Math.round((item.value / total) * 100) : 0;

          return (
            <li
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="inline-flex items-center gap-2 text-slate-600">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                {item.label}
              </span>

              <span className="font-medium text-slate-900">
                {item.value.toLocaleString()}

                <span className="ml-2 font-normal text-slate-400">
                  {percentage}%
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
