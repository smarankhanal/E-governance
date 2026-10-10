import {
  useStaff,
  StaffHeader,
  StaffStats,
  StaffRoleTabs,
  StaffTable,
  StaffFormModal,
} from "../features/staff";
export default function StaffManagement() {
  const {
    staff,
    activeRole,
    setActiveRole,
    showModal,
    form,
    error,
    filteredStaff,
    openModal,
    closeModal,
    updateForm,
    addStaff,
    getRoleCount,
  } = useStaff();

  return (
    <div className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <StaffHeader activeRole={activeRole} onAdd={openModal} />

        <StaffStats staff={staff} />

        <StaffRoleTabs
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          getRoleCount={getRoleCount}
        />

        <StaffTable
          activeRole={activeRole}
          staff={filteredStaff}
          onAdd={openModal}
        />
      </div>

      <StaffFormModal
        open={showModal}
        form={form}
        error={error}
        onClose={closeModal}
        onChange={updateForm}
        onSubmit={addStaff}
      />
    </div>
  );
}
