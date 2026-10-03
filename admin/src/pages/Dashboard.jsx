import {
  FiClipboard,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";
import {
  Card,
  StatCard,
  StatusDonut,
  ViewAll,
  WeeklyChart,
} from "../components";
const STATS = [
  {
    label: "Total applications",
    value: 1482,
    change: 8.2,
    icon: FiClipboard,
    tone: "bg-[#17385f]/10 text-[#17385f]",
  },
  {
    label: "Pending review",
    value: 214,
    change: -3.1,
    icon: FiClock,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    label: "Approved this month",
    value: 876,
    change: 12.4,
    icon: FiCheckCircle,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Rejected this month",
    value: 43,
    change: 1.5,
    icon: FiXCircle,
    tone: "bg-rose-50 text-rose-600",
    badWhenUp: true,
  },
];

const WEEKLY = [
  { day: "Sun", received: 182, approved: 140 },
  { day: "Mon", received: 241, approved: 198 },
  { day: "Tue", received: 226, approved: 187 },
  { day: "Wed", received: 258, approved: 205 },
  { day: "Thu", received: 237, approved: 192 },
  { day: "Fri", received: 201, approved: 168 },
  { day: "Sat", received: 64, approved: 52 },
];

const STATUS_BREAKDOWN = [
  { label: "Approved", value: 876, color: "#10b981" },
  { label: "Pending", value: 214, color: "#f59e0b" },
  { label: "In review", value: 349, color: "#0e9fb0" },
  { label: "Rejected", value: 43, color: "#f43f5e" },
];

const RECENT = [
  {
    id: "PA-2083-01482",
    name: "Sita Kumari Shrestha",
    type: "New Passport",
    status: "Pending",
  },
  {
    id: "PA-2083-01477",
    name: "Ram Bahadur Thapa",
    type: "Renewal",
    status: "Approved",
  },
  {
    id: "PA-2083-01469",
    name: "Anita Gurung",
    type: "Lost / Damaged",
    status: "In Review",
  },
  {
    id: "PA-2083-01455",
    name: "Bikash Karki",
    type: "New Passport",
    status: "Rejected",
  },
  {
    id: "PA-2083-01441",
    name: "Mina Tamang",
    type: "Renewal",
    status: "Approved",
  },
];

const TODAY = [
  {
    time: "10:00 AM",
    name: "Sita Kumari Shrestha",
    purpose: "Biometric capture",
    office: "Kathmandu",
  },
  {
    time: "11:30 AM",
    name: "Anita Gurung",
    purpose: "Document verification",
    office: "Kathmandu",
  },
  {
    time: "02:00 PM",
    name: "Suresh Adhikari",
    purpose: "Interview",
    office: "Butwal",
  },
  {
    time: "03:30 PM",
    name: "Mina Tamang",
    purpose: "Passport collection",
    office: "Lalitpur",
  },
];

const OFFICE_LOAD = [
  { name: "Kathmandu", used: 540, capacity: 600 },
  { name: "Lalitpur", used: 241, capacity: 350 },
  { name: "Pokhara", used: 198, capacity: 300 },
  { name: "Biratnagar", used: 120, capacity: 280 },
  { name: "Butwal", used: 74, capacity: 250 },
];

const ATTENTION = [
  { text: "38 applications waiting more than 5 days", icon: FiClock },
  { text: "12 documents flagged for re-upload", icon: FiFileText },
  { text: "3 appointments need rescheduling", icon: FiCalendar },
];

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  "In Review": "bg-sky-50 text-sky-700 ring-sky-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export default function Dashboard({ onNavigate = () => {} }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {greeting}, Administrator
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening across all passport offices today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Applications this week" className="lg:col-span-2">
          <WeeklyChart WEEKLY={WEEKLY} />
        </Card>
        <Card title="Applications by status">
          <StatusDonut STATUS_BREAKDOWN={STATUS_BREAKDOWN} />
        </Card>
      </div>

      {/* Needs attention */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
        <div className="mb-3 flex items-center gap-2 font-semibold text-amber-900">
          <FiAlertCircle size={18} /> Needs attention
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {ATTENTION.map(({ text, icon: Icon }) => (
            <li
              key={text}
              className="flex items-start gap-3 rounded-lg bg-white/80 p-3 text-sm text-amber-900"
            >
              <Icon className="mt-0.5 shrink-0" size={16} />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          title="Recent applications"
          action={<ViewAll onClick={() => onNavigate("applications")} />}
        >
          <ul className="-my-2 divide-y divide-slate-100">
            {RECENT.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {a.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {a.id} · {a.type}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[a.status]}`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Today's appointments"
          action={<ViewAll onClick={() => onNavigate("appointments")} />}
        >
          <ul className="-my-2 divide-y divide-slate-100">
            {TODAY.map((a) => (
              <li key={a.time} className="flex items-center gap-4 py-3">
                <span className="w-20 shrink-0 text-sm font-medium text-[#17385f]">
                  {a.time}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">
                    {a.name}
                  </p>
                  <p className="text-sm text-slate-500">{a.purpose}</p>
                </div>
                <span className="shrink-0 text-sm text-slate-500">
                  {a.office}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Office load */}
      <Card
        title="Office workload today"
        action={<ViewAll onClick={() => onNavigate("offices")} />}
      >
        <ul className="space-y-4">
          {OFFICE_LOAD.map((o) => {
            const pct = Math.round((o.used / o.capacity) * 100);
            const bar =
              pct >= 90
                ? "bg-rose-500"
                : pct >= 70
                  ? "bg-amber-500"
                  : "bg-[#0e9fb0]";
            return (
              <li key={o.name}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{o.name}</span>
                  <span className="text-slate-500">
                    {o.used} / {o.capacity} · {pct}%
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${o.name} capacity used`}
                >
                  <div
                    className={`h-full rounded-full ${bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
