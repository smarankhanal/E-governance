import { FiShield, FiUser, FiUserCheck } from "react-icons/fi";

export const ROLES = [
  {
    id: "super-admin",
    label: "Super Admin",
    description: "Full system access",
    icon: FiShield,
  },
  {
    id: "admin",
    label: "Admin",
    description: "Manage passport services",
    icon: FiUser,
  },
  {
    id: "verifier",
    label: "Verifier",
    description: "Review and verify applications",
    icon: FiUserCheck,
  },
];
