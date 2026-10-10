export default function CollectionStats({ passports }) {
  const collectedCount = passports.filter(
    (passport) => passport.status === "Collected",
  ).length;

  const notCollectedCount = passports.filter(
    (passport) => passport.status === "Not Collected",
  ).length;

  const stats = [
    {
      label: "Total Passports",
      value: passports.length,
      valueClass: "text-slate-900",
    },
    {
      label: "Collected",
      value: collectedCount,
      valueClass: "text-emerald-600",
    },
    {
      label: "Not Collected",
      value: notCollectedCount,
      valueClass: "text-amber-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-200 bg-white p-5"
        >
          <p className="text-sm text-slate-500">{stat.label}</p>

          <p className={`mt-1 text-2xl font-semibold ${stat.valueClass}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
