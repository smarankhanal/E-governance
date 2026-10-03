import {
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

const SUMMARY = [
  {
    label: "Average processing time",
    value: "4.8 days",
    change: -0.6,
    unit: "days",
    icon: FiClock,
    goodWhenDown: true,
  },
  {
    label: "Approval rate",
    value: "94.2%",
    change: 1.3,
    unit: "pts",
    icon: FiCheckCircle,
  },
  {
    label: "Fees collected",
    value: "NPR 18.4M",
    change: 9.7,
    unit: "%",
    icon: FiDollarSign,
  },
];

function SummaryCard({ item }) {
  const { label, value, change, unit, icon: Icon, goodWhenDown } = item;

  const down = change < 0;
  const good = goodWhenDown ? down : !down;
  const Trend = down ? FiTrendingDown : FiTrendingUp;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#17385f]/10 text-[#17385f]">
        <Icon size={20} />
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>

        <p className="text-2xl font-semibold text-slate-900">{value}</p>

        <p
          className={`inline-flex items-center gap-1 text-sm ${
            good ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          <Trend size={13} />
          {Math.abs(change)} {unit}
          <span className="text-slate-400">vs previous period</span>
        </p>
      </div>
    </div>
  );
}

export default function ReportSummary() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {SUMMARY.map((item) => (
        <SummaryCard key={item.label} item={item} />
      ))}
    </div>
  );
}
