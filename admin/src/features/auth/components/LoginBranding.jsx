import { FiShield } from "react-icons/fi";
import { Logo } from "../../../components";

export default function LoginBranding({ variant = "desktop" }) {
  if (variant === "mobile") {
    return (
      <div className="mb-9 flex items-center gap-3 lg:hidden">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#17385f] text-white">
          <Logo />
        </div>

        <div>
          <h1 className="text-sm font-bold tracking-wide text-[#17385f]">
            PASSPORT SERVICES
          </h1>
          <p className="mt-1 text-xs text-slate-500">Administration Portal</p>
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden w-5/12 flex-col justify-between bg-[#17385f] p-10 text-white lg:flex xl:p-14">
      <div>
        <div className="inline-flex max-w-full rounded-xl bg-white p-3">
          <Logo />
        </div>
      </div>

      <div className="max-w-md">
        <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
          Passport Services
        </h1>

        <p className="mt-5 text-base leading-7 text-slate-300">
          A secure administration portal for managing passport applications,
          appointments, document verification, and passport collection.
        </p>

        <div className="mt-8 space-y-3 text-sm text-slate-200">
          <p className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#0e9fb0]" />
            Centralized passport application management
          </p>

          <p className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#0e9fb0]" />
            Secure role-based access
          </p>

          <p className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#0e9fb0]" />
            Efficient document verification
          </p>
        </div>
      </div>

      <p className="text-xs leading-5 text-slate-300">
        Authorized Government Personnel Only
      </p>
    </aside>
  );
}
