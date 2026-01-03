import { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);

  if (!context) {
    throw new Error(
      "useAppointmentContext must be used inside AppointmentContextProvider"
    );
  }

  return context;
};
