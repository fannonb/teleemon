import { AppointmentForm } from "@/components/AppointmentForm";
import { SiteShell } from "@/components/SiteShell";

export const metadata = { title: "Request an Appointment" };

export default function RequestAppointmentPage() {
  return (
    <SiteShell bg="appointment">
      <header className="mb-4">
        <h1 className="heading-level-1">Request an Appointment</h1>
        <p className="body-text mb-2">
          Please complete this brief form. A member of our team will contact you regarding services
          and appointment availability. Fields marked with an asterisk (<span className="req">*</span>
          ) are required.
        </p>
      </header>

      <div className="appointment-alert" role="note">
        <span className="appointment-alert-mark" aria-hidden="true">
          !
        </span>
        <p className="m-0">
          <strong>This form is not for emergencies.</strong> If you are experiencing a medical or
          psychiatric emergency, call 911, call or text 988, or go to the nearest emergency
          department.
        </p>
      </div>

      <AppointmentForm />
    </SiteShell>
  );
}
