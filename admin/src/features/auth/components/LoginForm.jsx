import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import LoginInput from "./LoginInput";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  error,
  loading,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <LoginInput
        id="email"
        label="Email address"
        type="email"
        icon={FiMail}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your official email"
        autoComplete="username"
      />

      <LoginInput
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        icon={FiLock}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
        autoComplete="current-password"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="text-slate-400 transition hover:text-[#17385f]"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        }
      />

      <div className="flex items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-[#0e9fb0]"
          />
          Remember me
        </label>

        <span className="text-xs text-slate-400">Authorized access only</span>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17385f] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#214a78] focus:outline-none focus:ring-4 focus:ring-[#0e9fb0]/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}

        {!loading && <FiArrowRight size={17} />}
      </button>

      <p className="border-t border-slate-200 pt-5 text-center text-xs leading-5 text-slate-500">
        This system is intended for authorized government personnel. Access and
        permissions are subject to your assigned role.
      </p>
    </form>
  );
}
