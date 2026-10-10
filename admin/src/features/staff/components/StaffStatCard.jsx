export default function StaffStatCard({ title, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17385f]/5 text-[#17385f]">
        <Icon size={23} />
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-bold text-[#17385f]">{value}</p>
      </div>
    </div>
  );
}
