import { useAppointmentContext } from "../hooks/useAppointmentContext";
import { useVisitorContext } from "../hooks/useVisitorContext";

const AppointmentApprove = () => {
  const { appointments, dispatch } = useAppointmentContext();
  const { visitors } = useVisitorContext();

  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "INVITED"
  );

  const getVisitor = (visitorId) =>
    visitors.find((v) => v.id === visitorId);

  const approveAppointment = (id) => {
    dispatch({
      type: "APPROVE_APPOINTMENT",
      payload: id,
    });
  };

  const rejectAppointment = (id) => {
    dispatch({
      type: "REJECT_APPOINTMENT",
      payload: id,
    });
  };

  return (
    <div>
      <h2>Approve Appointments</h2>

      {pendingAppointments.length === 0 && (
        <p>No pending appointments</p>
      )}

      {pendingAppointments.map((appt) => {
        const visitor = getVisitor(appt.visitorId);

        return (
          <div
            key={appt.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Visitor:</strong> {visitor?.name}
            </p>
            <p>
              <strong>Email:</strong> {visitor?.email}
            </p>
            <p>
              <strong>Purpose:</strong> {appt.purpose}
            </p>
            <p>
              <strong>Date & Time:</strong> {appt.date} at {appt.time}
            </p>

            <div>
              <button
                onClick={() => approveAppointment(appt.id)}
                style={{ marginRight: "10px" }}
              >
                Approve
              </button>

              <button
                onClick={() => rejectAppointment(appt.id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentApprove;
