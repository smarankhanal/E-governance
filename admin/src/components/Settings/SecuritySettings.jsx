import Field from "./Field";
import SwitchRow from "./SwitchRow";
import PasswordInput from "./PasswordInput";

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";

export default function SecuritySettings({ security, on, flip }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 font-semibold text-slate-900">Change password</h2>

        <div className="grid max-w-md gap-4">
          <Field label="Current password">
            <PasswordInput
              value={security.currentPassword}
              onChange={on("security")("currentPassword")}
            />
          </Field>

          <Field label="New password" hint="At least 8 characters.">
            <PasswordInput
              value={security.newPassword}
              onChange={on("security")("newPassword")}
            />
          </Field>

          <Field label="Confirm new password">
            <PasswordInput
              value={security.confirmPassword}
              onChange={on("security")("confirmPassword")}
            />
          </Field>
        </div>
      </div>

      <div className="divide-y divide-slate-100 border-t border-slate-100">
        <SwitchRow
          title="Two-factor authentication"
          desc="Ask for a one-time code from your phone when signing in."
          checked={security.twoFactor}
          onChange={flip("security", "twoFactor")}
        />

        <div className="flex items-center justify-between gap-6 py-4">
          <div>
            <p className="font-medium text-slate-900">
              Sign out after inactivity
            </p>

            <p className="text-sm text-slate-500">
              Automatically end idle sessions.
            </p>
          </div>

          <select
            aria-label="Session timeout"
            className={`${inputCls} w-36`}
            value={security.sessionTimeout}
            onChange={on("security")("sessionTimeout")}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>
      </div>
    </div>
  );
}
