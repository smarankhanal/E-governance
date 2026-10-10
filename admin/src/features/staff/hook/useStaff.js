import { useMemo, useState } from "react";
import { INITIAL_STAFF_FORM } from "../config/staffConfig";

export default function useStaff() {
  const [staff, setStaff] = useState([]);
  const [activeRole, setActiveRole] = useState("admin");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...INITIAL_STAFF_FORM });
  const [error, setError] = useState("");

  const filteredStaff = useMemo(
    () => staff.filter((member) => member.role === activeRole),
    [staff, activeRole],
  );

  const openModal = () => {
    setForm({
      ...INITIAL_STAFF_FORM,
      role: activeRole,
    });
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setError("");
  };

  const addStaff = (event) => {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setError("Please complete all required fields.");
      return;
    }

    const emailExists = staff.some(
      (member) => member.email.toLowerCase() === email,
    );

    if (emailExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newStaff = {
      id: crypto.randomUUID(),
      name,
      email,
      role: form.role,
      status: "Pending setup",
    };

    setStaff((current) => [...current, newStaff]);
    setActiveRole(form.role);
    closeModal();
  };

  const getRoleCount = (role) =>
    staff.filter((member) => member.role === role).length;

  return {
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
  };
}
