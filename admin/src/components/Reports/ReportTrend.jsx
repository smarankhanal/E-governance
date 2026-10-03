const PROCESSING_TREND = [
  { month: "Baisakh", days: 6.1 },
  { month: "Jestha", days: 5.8 },
  { month: "Asar", days: 5.6 },
  { month: "Shrawan", days: 5.4 },
  { month: "Bhadra", days: 5.4 },
  { month: "Ashwin", days: 4.8 },
];

export default function ReportTrend() {
  const W = 560;
  const H = 190;
  const P = {
    t: 16,
    r: 16,
    b: 28,
    l: 34,
  };

  const min = 4;
  const max = 7;

  const x = (i) => P.l + (i * (W - P.l - P.r)) / (PROCESSING_TREND.length - 1);

  const y = (value) => P.t + ((max - value) / (max - min)) * (H - P.t - P.b);

  const line = PROCESSING_TREND.map(
    (item, i) => `${i ? "L" : "M"}${x(i)},${y(item.days)}`,
  ).join(" ");

  const area = `${line} L${x(
    PROCESSING_TREND.length - 1,
  )},${H - P.b} L${x(0)},${H - P.b} Z`;

  return (
    <section className="rounded-xl border border-slate-200 bg-white xl:col-span-2">
      <header className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">
          Average processing time
        </h2>

        <p className="text-sm text-slate-500">
          Days from submission to decision, by month
        </p>
      </header>

      <div className="p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Average processing time by month"
        >
          {[4, 5, 6, 7].map((t) => (
            <g key={t}>
              <line
                x1={P.l}
                x2={W - P.r}
                y1={y(t)}
                y2={y(t)}
                stroke="#e2e8f0"
                strokeDasharray="3 4"
              />

              <text
                x={P.l - 8}
                y={y(t) + 4}
                textAnchor="end"
                fontSize="11"
                fill="#94a3b8"
              >
                {t}
              </text>
            </g>
          ))}

          <path d={area} fill="#0e9fb0" opacity="0.1" />

          <path
            d={line}
            fill="none"
            stroke="#0e9fb0"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {PROCESSING_TREND.map((item, i) => (
            <g key={item.month}>
              <circle
                cx={x(i)}
                cy={y(item.days)}
                r="4"
                fill="#fff"
                stroke="#0e9fb0"
                strokeWidth="2.5"
              />

              <text
                x={x(i)}
                y={y(item.days) - 10}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#17385f"
              >
                {item.days}
              </text>

              <text
                x={x(i)}
                y={H - 8}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                {item.month}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
