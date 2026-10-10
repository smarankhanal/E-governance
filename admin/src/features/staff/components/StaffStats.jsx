import { FiShield, FiUserCheck, FiUsers } from "react-icons/fi";
import StaffStatCard from "./StaffStatCard";

export default function StaffStats({ staff }) {
  const administrators = staff.filter(
    (member) => member.role === "admin",
  ).length;

  const verifiers = staff.filter((member) => member.role === "verifier").length;

  return (
    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StaffStatCard title="Total Staff" value={staff.length} icon={FiUsers} />

      <StaffStatCard
        title="Administrators"
        value={administrators}
        icon={FiShield}
      />

      <StaffStatCard title="Verifiers" value={verifiers} icon={FiUserCheck} />
    </div>
  );
}
