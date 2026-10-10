import Field from "./Field";

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";

export default function ProfileSettings({ profile, on }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#0e9fb0] text-xl font-semibold text-white">
          AD
        </div>

        <div>
          <p className="font-semibold text-slate-900">{profile.name}</p>
          <p className="text-sm text-slate-500">Super Admin</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input
            className={inputCls}
            value={profile.name}
            onChange={on("profile")("name")}
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            className={inputCls}
            value={profile.email}
            onChange={on("profile")("email")}
          />
        </Field>

        <Field label="Phone">
          <input
            className={inputCls}
            value={profile.phone}
            onChange={on("profile")("phone")}
          />
        </Field>

        <Field label="Language">
          <select
            className={inputCls}
            value={profile.language}
            onChange={on("profile")("language")}
          >
            <option>English</option>
            <option>नेपाली</option>
          </select>
        </Field>
      </div>
    </div>
  );
}
