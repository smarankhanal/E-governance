import { useState } from "react";
import { LoginBranding, RoleSelector, LoginForm } from "../features/auth";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!onLogin) {
      setError("Authentication service is not configured yet.");
      return;
    }

    try {
      setLoading(true);

      await onLogin({
        email: email.trim(),
        password,
        role,
        rememberMe,
      });
    } catch (err) {
      setError(
        err?.message || "Unable to sign in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-slate-50">
      <LoginBranding variant="desktop" />

      <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-lg">
          <LoginBranding variant="mobile" />

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0e9fb0]">
              Welcome back
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#17385f]">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Select your account role and enter your credentials to continue.
            </p>
          </div>

          <RoleSelector role={role} onRoleChange={handleRoleChange} />

          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </main>
  );
}
