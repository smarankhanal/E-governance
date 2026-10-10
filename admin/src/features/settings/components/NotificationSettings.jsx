import SwitchRow from "./SwitchRow";

const NOTIFICATION_ITEMS = [
  [
    "newApplication",
    "New application submitted",
    "Email me when an applicant submits a new application.",
  ],
  [
    "statusChange",
    "Application status changes",
    "Email me when an application is approved or rejected.",
  ],
  [
    "appointmentReminder",
    "Appointment reminders",
    "Send a reminder the day before each appointment.",
  ],
  [
    "documentFlagged",
    "Document flagged",
    "Alert me when a document needs re-upload.",
  ],
  [
    "weeklyDigest",
    "Weekly summary",
    "A digest of activity every Sunday morning.",
  ],
  ["smsAlerts", "SMS alerts", "Also send urgent alerts by text message."],
];

export default function NotificationSettings({ notifications, flip }) {
  return (
    <div className="divide-y divide-slate-100">
      {NOTIFICATION_ITEMS.map(([key, title, desc]) => (
        <SwitchRow
          key={key}
          title={title}
          desc={desc}
          checked={notifications[key]}
          onChange={flip("notifications", key)}
        />
      ))}
    </div>
  );
}
