export default function Card({ title, action, children, className = "" }) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white ${className}`}
    >
      <header className="flex items-center justify-between px-5 pt-5">
        <h2 className="font-semibold text-slate-900">{title}</h2>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
