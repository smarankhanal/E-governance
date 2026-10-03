import { useState } from "react";

import {
  NotificationSettings,
  ProfileSettings,
  SecuritySettings,
  SettingsFooter,
  SettingsTabs,
} from "../components";

const DEFAULTS = {
  profile: {
    name: "Administrator",
    email: "admin@passport.gov.np",
    phone: "01-4200000",
    language: "English",
  },

  security: {
    twoFactor: true,
    sessionTimeout: "30",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },

  notifications: {
    newApplication: true,
    statusChange: true,
    appointmentReminder: true,
    documentFlagged: true,
    weeklyDigest: false,
    smsAlerts: false,
  },

  system: {
    calendar: "Bikram Sambat (BS)",
    slotMinutes: "15",
    maxPerDay: "300",
    bookingWindowDays: "30",
    openTime: "10:00",
    closeTime: "17:00",
    maintenance: false,
  },
};

export default function Settings() {
  const [tab, setTab] = useState("profile");
  const [values, setValues] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const update = (section, key, value) => {
    setValues((v) => ({
      ...v,
      [section]: {
        ...v[section],
        [key]: value,
      },
    }));

    setSaved(false);
    setError("");
  };

  const on = (section) => (key) => (e) => update(section, key, e.target.value);

  const flip = (section, key) => () =>
    update(section, key, !values[section][key]);

  const changeTab = (key) => {
    setTab(key);
    setError("");
    setSaved(false);
  };

  const save = () => {
    if (tab === "security") {
      const { newPassword, confirmPassword, currentPassword } = values.security;

      if (newPassword || confirmPassword) {
        if (!currentPassword) {
          return setError("Enter your current password to change it.");
        }

        if (newPassword.length < 8) {
          return setError("New password must be at least 8 characters.");
        }

        if (newPassword !== confirmPassword) {
          return setError("New password and confirmation don't match.");
        }
      }
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const reset = () => {
    setValues((v) => ({
      ...v,
      [tab]: DEFAULTS[tab],
    }));

    setSaved(false);
    setError("");
  };

  const { profile, security, notifications, system } = values;

  const renderPanel = () => {
    switch (tab) {
      case "profile":
        return <ProfileSettings profile={profile} on={on} />;

      case "security":
        return <SecuritySettings security={security} on={on} flip={flip} />;

      case "notifications":
        return (
          <NotificationSettings notifications={notifications} flip={flip} />
        );

      case "system":
        return <SystemSettings system={system} on={on} flip={flip} />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account and how the portal behaves.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <SettingsTabs tab={tab} setTab={changeTab} />

        <section className="flex-1 rounded-xl border border-slate-200 bg-white">
          <div className="p-6">{renderPanel()}</div>

          <SettingsFooter
            error={error}
            saved={saved}
            onReset={reset}
            onSave={save}
          />
        </section>
      </div>
    </div>
  );
}
