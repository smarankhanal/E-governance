import { useMemo, useState } from "react";

import {
  useApplications,
  updateApplication,
} from "../features/applications/applicationsStore/applicationsStore";

import {
  ApplicationModal,
  applicationType,
} from "../features/applications/applicationUtils/applicationUi";

import { UserFilters, UserHeader, UserStats, UsersTable } from "../components";

const userCode = (id) => `USR-${String(id).padStart(4, "0")}`;

export default function Users() {
  const applications = useApplications();

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const users = useMemo(
    () =>
      applications.filter((application) => application.status === "Approved"),
    [applications],
  );

  const rows = useMemo(() => {
    const search = query.toLowerCase();

    return users.filter((user) => {
      const personal = user.personalDetails.personal;

      const haystack = `
        ${userCode(user.id)}
        ${personal.givenName}
        ${personal.surname}
        ${user.contact.email}
        ${user.contact.phoneNumber}
        ${user.appointment.locationName}
        ${personal.nin}
      `.toLowerCase();

      return (
        (typeFilter === "All" || applicationType(user) === typeFilter) &&
        haystack.includes(search)
      );
    });
  }, [users, query, typeFilter]);

  const active = modal ? users.find((user) => user.id === modal.id) : null;

  const handleView = (user) => {
    setModal({
      id: user.id,
      edit: false,
    });
  };

  const handleEdit = (user) => {
    setModal({
      id: user.id,
      edit: true,
    });
  };

  return (
    <div className="space-y-6">
      <UserHeader />

      <UserStats users={users} />

      <div className="rounded-xl border border-slate-200 bg-white">
        <UserFilters
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          query={query}
          setQuery={setQuery}
        />

        <UsersTable
          rows={rows}
          total={users.length}
          onView={handleView}
          onEdit={handleEdit}
        />
      </div>

      {active && (
        <ApplicationModal
          key={`${active.id}-${modal.edit}`}
          application={active}
          startInEdit={modal.edit}
          idLabel={`User ID ${userCode(active.id)}`}
          canChangeStatus={false}
          onClose={() => setModal(null)}
          onSave={updateApplication}
        />
      )}
    </div>
  );
}
