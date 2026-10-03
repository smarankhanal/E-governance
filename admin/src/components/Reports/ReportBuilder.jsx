import {
  FiClipboard,
  FiCalendar,
  FiFileText,
  FiHome,
  FiDollarSign,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";

const REPORT_TYPES = [
  {
    key: "applications",
    title: "Applications summary",
    desc: "Volume, status and processing time by application type.",
    icon: FiClipboard,
  },
  {
    key: "appointments",
    title: "Appointments",
    desc: "Bookings, no-shows and cancellations per office.",
    icon: FiCalendar,
  },
  {
    key: "documents",
    title: "Document verification",
    desc: "Verified, rejected and pending supporting documents.",
    icon: FiFileText,
  },
  {
    key: "offices",
    title: "Office performance",
    desc: "Throughput and capacity use for each office.",
    icon: FiHome,
  },
  {
    key: "revenue",
    title: "Fee collection",
    desc: "Passport fees collected by office and payment method.",
    icon: FiDollarSign,
  },
];

const OFFICES = [
  "All offices",
  "Head Office",
  "Kathmandu",
  "Lalitpur",
  "Pokhara",
  "Biratnagar",
  "Butwal",
];

const RANGES = [
  "Last 7 days",
  "Last 30 days",
  "This quarter",
  "This fiscal year",
  "Custom range",
];

const FORMATS = ["PDF", "Excel", "CSV"];

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";

export default function ReportBuilder({
  selected,
  setSelected,
  range,
  setRange,
  office,
  setOffice,
  format,
  setFormat,
  from,
  setFrom,
  to,
  setTo,
  busy,
  datesMissing,
  generate,
  notice,
}) {
  const needsDates = range === "Custom range";

  return (
    <section className="rounded-xl border border-slate-200 bg-white xl:col-span-3">
      <header className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">Create a report</h2>
      </header>

      <div className="space-y-5 p-5">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">
            Report type
          </legend>

          <div className="grid gap-2 sm:grid-cols-2">
            {REPORT_TYPES.map(({ key, title, desc, icon: Icon }) => {
              const active = selected === key;

              return (
                <label
                  key={key}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition focus-within:ring-2 focus-within:ring-[#0e9fb0] ${
                    active
                      ? "border-[#17385f] bg-[#17385f]/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="report-type"
                    className="sr-only"
                    checked={active}
                    onChange={() => setSelected(key)}
                  />

                  <Icon
                    className={`mt-0.5 shrink-0 ${
                      active ? "text-[#17385f]" : "text-slate-400"
                    }`}
                    size={18}
                  />

                  <span>
                    <span className="block text-sm font-medium text-slate-900">
                      {title}
                    </span>

                    <span className="block text-xs text-slate-500">{desc}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Period
            </span>

            <select
              className={inputCls}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              {RANGES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Office
            </span>

            <select
              className={inputCls}
              value={office}
              onChange={(e) => setOffice(e.target.value)}
            >
              {OFFICES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          {needsDates && (
            <>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  From
                </span>

                <input
                  type="date"
                  className={inputCls}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  To
                </span>

                <input
                  type="date"
                  className={inputCls}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </label>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-slate-700">Format</p>

            <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
              {FORMATS.map((item) => (
                <button
                  key={item}
                  onClick={() => setFormat(item)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                    format === item
                      ? "bg-white text-[#17385f] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={busy || datesMissing}
            className="inline-flex items-center gap-2 rounded-lg bg-[#17385f] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? (
              <FiRefreshCw className="animate-spin" size={16} />
            ) : (
              <FiDownload size={16} />
            )}

            {busy ? "Generating…" : "Generate report"}
          </button>
        </div>

        {datesMissing && (
          <p className="text-sm text-amber-700">
            Choose both a start and end date.
          </p>
        )}

        {notice && (
          <p
            role="status"
            className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            {notice}
          </p>
        )}
      </div>
    </section>
  );
}
