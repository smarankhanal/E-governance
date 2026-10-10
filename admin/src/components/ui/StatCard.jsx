import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export default function StatCard({ stat }) {
  const { label, value, change, icon: Icon, tone, badWhenUp } = stat;
  const up = change >= 0;
  const good = badWhenUp ? !up : up;
  const Trend = up ? FiTrendingUp : FiTrendingDown;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${tone}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-2 text-3xl font-semibold text-slate-900">
        {value.toLocaleString()}
      </p>
      <p
        className={`mt-2 inline-flex items-center gap-1 text-sm ${good ? "text-emerald-600" : "text-rose-600"}`}
      >
        <Trend size={14} />
        {Math.abs(change)}%{" "}
        <span className="text-slate-400">vs last month</span>
      </p>
    </div>
  );
}
