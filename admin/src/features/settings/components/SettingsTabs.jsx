import { FiUser, FiLock, FiBell, FiSliders } from "react-icons/fi";

const TABS = [
  {
    key: "profile",
    label: "Profile",
    icon: FiUser,
  },
  {
    key: "security",
    label: "Security",
    icon: FiLock,
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: FiBell,
  },
  {
    key: "system",
    label: "System",
    icon: FiSliders,
  },
];

export default function SettingsTabs({ tab, setTab }) {
  return (
    <nav aria-label="Settings sections" className="lg:w-56 lg:shrink-0">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col">
        {TABS.map(({ key, label, icon: Icon }) => (
          <li key={key}>
            <button
              onClick={() => setTab(key)}
              aria-current={tab === key ? "page" : undefined}
              className={`flex w-full items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] ${
                tab === key
                  ? "bg-[#17385f] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
