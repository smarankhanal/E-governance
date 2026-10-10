export default function ApplicationSection({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200">
      {" "}
      <h3 className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-[#17385f]">
        {title}{" "}
      </h3>
      <div className="p-5">{children}</div>
    </section>
  );
}
