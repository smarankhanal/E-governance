import { useState } from "react";
import { INITIAL_APPLICATIONS } from "../../../data/applicationData";

const SEED_STATUSES = [
  "Pending",
  "Approved",
  "Pending",
  "Rejected",
  "Approved",
  "Pending",
];

export default function useApplications() {
  const [applications, setApplications] = useState(() =>
    INITIAL_APPLICATIONS.map((application, index) => ({
      ...application,
      id: index + 1,
      status: SEED_STATUSES[index % SEED_STATUSES.length],
      submittedAt: "2026-10-01",
    })),
  );

  const updateApplication = (updatedApplication) => {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application,
      ),
    );
  };

  const removeApplication = (id) => {
    setApplications((previous) =>
      previous.filter((application) => application.id !== id),
    );
  };

  return {
    applications,
    updateApplication,
    removeApplication,
  };
}
