import { Link } from "react-router-dom";
import { useAppointmentContext } from "../hooks/useAppointmentContext";
import { useVisitorContext } from "../hooks/useVisitorContext";

const AppointmentList = () => {
  const { appointments } = useAppointmentContext();
  const { visitors } = useVisitorContext();

  const getVisitorName = (visitorId) =>
    visitors.find((v) => v.id === visitorId)?.name || "Unknown";

  if (!appointments.length) {
    return <p>No appointments found.</p>;
  }

  return (
    <div>
      <h3>Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <Link to={`/appointments/${appt.id}`}>
              {getVisitorName(appt.visitorId)} — {appt.purpose} — {appt.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
