import { useMemo, useState } from "react";

import {
  useApplications,
  updateApplication,
  removeApplication,
} from "../features/applications/applicationsStore/applicationsStore";

import {
  ApplicationModal,
  applicationType,
  fullName,
} from "../features/applications/applicationUtils/applicationUi";
import {
  ApplicationHeader,
  ApplicationFilters,
  ApplicationStats,
  ApplicationsTable,
} from "../components";

export default function Applications() {
  const applications = useApplications();

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const rows = useMemo(() => {
    const search = query.toLowerCase();

    return applications.filter((application) => {
      const personal = application.personalDetails.personal;

      const haystack = `
        ${personal.givenName}
        ${personal.surname}
        ${application.contact.email}
        ${application.contact.phoneNumber}
        ${application.appointment.locationName}
        ${personal.nin}
      `.toLowerCase();

      return (
        (typeFilter === "All" || applicationType(application) === typeFilter) &&
        haystack.includes(search)
      );
    });
  }, [applications, query, typeFilter]);

  const active = modal
    ? applications.find((application) => application.id === modal.id)
    : null;

  const handleDelete = (application) => {
    if (
      window.confirm(
        `Delete ${fullName(application)}'s application? This can't be undone.`,
      )
    ) {
      removeApplication(application.id);
    }
  };

  return (
    <div className="space-y-6">
      <ApplicationHeader />

      <ApplicationStats applications={applications} />

      <ApplicationFilters
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        query={query}
        setQuery={setQuery}
      />

      <ApplicationsTable
        rows={rows}
        total={applications.length}
        onView={(application) =>
          setModal({
            id: application.id,
            edit: false,
          })
        }
        onEdit={(application) =>
          setModal({
            id: application.id,
            edit: true,
          })
        }
        onDelete={handleDelete}
      />

      {active && (
        <ApplicationModal
          key={`${active.id}-${modal.edit}`}
          application={active}
          startInEdit={modal.edit}
          idLabel={`Application #${active.id}`}
          onClose={() => setModal(null)}
          onSave={updateApplication}
        />
      )}
    </div>
  );
}
