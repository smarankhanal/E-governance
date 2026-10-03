import Toggle from "./Toggle";

export default function SwitchRow({ title, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>

      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
