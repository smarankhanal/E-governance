import { useState } from "react";

import {
  ReportBuilder,
  ReportHistory,
  ReportTrend,
  ReportSummary,
} from "../components";

const INITIAL_HISTORY = [
  {
    id: 1,
    name: "Applications summary",
    range: "Last 30 days",
    office: "All offices",
    format: "PDF",
    generated: "2083-06-14 09:30",
    by: "Administrator",
  },
  {
    id: 2,
    name: "Fee collection",
    range: "This quarter",
    office: "Kathmandu",
    format: "Excel",
    generated: "2083-06-13 15:10",
    by: "Sunita Poudel",
  },
  {
    id: 3,
    name: "Office performance",
    range: "Last 7 days",
    office: "All offices",
    format: "PDF",
    generated: "2083-06-12 11:45",
    by: "Administrator",
  },
  {
    id: 4,
    name: "Document verification",
    range: "Last 30 days",
    office: "Pokhara",
    format: "CSV",
    generated: "2083-06-10 14:02",
    by: "Rajesh Khadka",
  },
];

export default function Reports() {
  const [selected, setSelected] = useState("applications");

  const [range, setRange] = useState("Last 30 days");

  const [office, setOffice] = useState("All offices");

  const [format, setFormat] = useState("PDF");

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [busy, setBusy] = useState(false);

  const [history, setHistory] = useState(INITIAL_HISTORY);

  const [notice, setNotice] = useState("");

  const reportTitles = {
    applications: "Applications summary",
    appointments: "Appointments",
    documents: "Document verification",
    offices: "Office performance",
    revenue: "Fee collection",
  };

  const currentTitle = reportTitles[selected];

  const needsDates = range === "Custom range";

  const datesMissing = needsDates && (!from || !to);

  const generate = () => {
    setBusy(true);
    setNotice("");

    setTimeout(() => {
      setHistory((items) => [
        {
          id: Date.now(),
          name: currentTitle,
          range: needsDates ? `${from} → ${to}` : range,
          office,
          format,
          generated: new Date().toISOString().slice(0, 16).replace("T", " "),
          by: "Administrator",
        },
        ...items,
      ]);

      setBusy(false);

      setNotice(`${currentTitle} report generated as ${format}.`);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Reports</h1>

        <p className="mt-1 text-sm text-slate-500">
          Generate and download reports for any office and period.
        </p>
      </div>

      <ReportSummary />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <ReportBuilder
          selected={selected}
          setSelected={setSelected}
          range={range}
          setRange={setRange}
          office={office}
          setOffice={setOffice}
          format={format}
          setFormat={setFormat}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          busy={busy}
          datesMissing={datesMissing}
          generate={generate}
          notice={notice}
        />

        <ReportTrend />
      </div>

      <ReportHistory history={history} />
    </div>
  );
}
