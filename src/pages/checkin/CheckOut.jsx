import { useCheckInContext } from "../hooks/useCheckInContext";
import { useVisitorContext } from "../hooks/useVisitorContext";

const CheckOut = () => {
  const { visits, dispatch } = useCheckInContext();
  const { visitors } = useVisitorContext();

  const activeVisits = visits.filter(
    (v) => v.status === "CHECKED_IN"
  );

  const getVisitorName = (id) =>
    visitors.find((v) => v.id === id)?.name;

  return (
    <div>
      <h2>Visitor Check-Out</h2>

      {!activeVisits.length && <p>No active visitors</p>}

      <ul>
        {activeVisits.map((visit) => (
          <li key={visit.id}>
            {getVisitorName(visit.visitorId)} —
            Checked in at{" "}
            {new Date(visit.checkInTime).toLocaleTimeString()}
            <button
              onClick={() =>
                dispatch({
                  type: "CHECK_OUT",
                  payload: visit.id,
                })
              }
            >
              Check-Out
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckOut;
