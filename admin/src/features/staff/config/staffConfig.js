import { FiShield, FiUserCheck } from "react-icons/fi";

export const STAFF_ROLES = [
  {
    id: "admin",
    label: "Admin",
    icon: FiShield,
  },
  {
    id: "verifier",
    label: "Verifier",
    icon: FiUserCheck,
  },
];

export const INITIAL_STAFF_FORM = {
  name: "",
  email: "",
  role: "admin",
};
