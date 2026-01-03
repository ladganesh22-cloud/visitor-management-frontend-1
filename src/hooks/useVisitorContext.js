import { useContext } from "react";
import { VisitorContext } from "../context/VisitorContext";

export const useVisitorContext = () => {
  const context = useContext(VisitorContext);

  if (!context) {
    throw new Error(
      "useVisitorContext must be used inside VisitorContextProvider"
    );
  }

  return context;
};
