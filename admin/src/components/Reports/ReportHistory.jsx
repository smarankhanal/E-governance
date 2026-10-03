import { FiDownload } from "react-icons/fi";

export default function ReportHistory({ history }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <header className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">Recent reports</h2>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium text-slate-500">
            <tr>
              <th className="px-5 py-3">Report</th>
              <th className="px-5 py-3">Period</th>
              <th className="px-5 py-3">Office</th>
              <th className="px-5 py-3">Format</th>
              <th className="px-5 py-3">Generated</th>
              <th className="px-5 py-3 text-right">Download</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70">
                <td className="px-5 py-4 font-medium text-slate-900">
                  {item.name}
                </td>

                <td className="px-5 py-4 text-slate-600">{item.range}</td>

                <td className="px-5 py-4 text-slate-600">{item.office}</td>

                <td className="px-5 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {item.format}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {item.generated}

                  <span className="block text-xs text-slate-400">
                    by {item.by}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    aria-label={`Download ${item.name}`}
                    title="Download"
                    className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#17385f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0]"
                  >
                    <FiDownload size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
