import { FiCheck } from "react-icons/fi";

export default function SettingsFooter({ error, saved, onReset, onSave }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
      <div className="min-h-5 text-sm" role="status">
        {error && <span className="text-rose-600">{error}</span>}

        {saved && (
          <span className="inline-flex items-center gap-1.5 text-emerald-600">
            <FiCheck size={15} />
            Changes saved
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>

        <button
          onClick={onSave}
          className="rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] focus-visible:ring-offset-2"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
