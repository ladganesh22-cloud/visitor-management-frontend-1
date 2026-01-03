import { useContext } from "react";
import { PassContext } from "../context/PassContext";

export const usePassContext = () => {

  const context = useContext(PassContext)

  if (!context) {
    throw error("usePassContext must be used inside PassContextProvider")
  }
  return context
}
