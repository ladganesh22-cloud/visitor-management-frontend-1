import { useContext } from "react";
import { CheckInContext } from "../context/CheckInContext";

export const useCheckInContext = () => {
  const context = useContext(CheckInContext);

  if (!context) {
    throw new Error(
      "useCheckInContext must be used inside CheckInContextProvider"
    );
  }

  return context;
};
