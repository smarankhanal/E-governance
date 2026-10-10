import { FiPlus } from "react-icons/fi";
import { PageHeader, PrimaryButton } from "../components";
import { APPOINTMENTS } from "../data/applicationData";
import { AppointmentListByDate } from "../features/appointments";
export default function Appointments() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        subtitle="Manage biometric capture appointments across passport offices."
        action={
          <PrimaryButton icon={FiPlus}>Schedule appointment</PrimaryButton>
        }
      />

      <AppointmentListByDate APPOINTMENTS={APPOINTMENTS} />
    </div>
  );
}
