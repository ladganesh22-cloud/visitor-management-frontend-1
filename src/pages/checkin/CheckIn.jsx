import { useState } from "react";
import { useCheckInContext } from "../hooks/useCheckInContext";
import { usePassContext } from "../hooks/usePassContext";
import { useVisitorContext } from "../hooks/useVisitorContext";

const CheckIn = () => {
  const [passNumber, setPassNumber] = useState("");
  const { passes } = usePassContext();
  const { visitors } = useVisitorContext();
  const { dispatch } = useCheckInContext();

  const handleCheckIn = () => {
    const pass = passes.find((p) => p.passNumber === passNumber);

    if (!pass) {
      alert("Invalid Pass");
      return;
    }

    const visit = {
      id: Date.now(),
      passId: pass.id,
      visitorId: pass.visitorId,
      appointmentId: pass.appointmentId,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      status: "CHECKED_IN",
    };

    dispatch({ type: "CHECK_IN", payload: visit });
    setPassNumber("");
  };

  return (
    <div>
      <h2>Visitor Check-In</h2>

      <input
        placeholder="Scan QR or Enter Pass Number"
        value={passNumber}
        onChange={(e) => setPassNumber(e.target.value)}
      />

      <button onClick={handleCheckIn}>Check-In</button>
    </div>
  );
};

export default CheckIn;
