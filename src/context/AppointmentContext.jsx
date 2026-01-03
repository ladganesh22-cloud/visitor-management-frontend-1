import { createContext, useReducer } from "react";

export const AppointmentContext = createContext();

const initialState = {
  appointments: [],
};

export const appointmentReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_APPOINTMENT":
      return {
        appointments: [...state.appointments, action.payload],
      };

    case "SET_APPOINTMENTS":
      return {
        appointments: action.payload,
      };

    case "INVITE_APPOINTMENT":
      return {
        appointments: [...state.appointments, action.payload],
      };

    case "APPROVE_APPOINTMENT":
      return {
        appointments: state.appointments.map((appt) =>
          appt.id === action.payload
            ? { ...appt, status: "APPROVED" }
            : appt
        ),
      };

    case "REJECT_APPOINTMENT":
      return {
        appointments: state.appointments.map((appt) =>
          appt.id === action.payload
            ? { ...appt, status: "REJECTED" }
            : appt
        ),
      };

    case "NOTIFY_APPOINTMENT":
      return {
        appointments: state.appointments.map((appt) =>
          appt.id === action.payload
            ? { ...appt, notified: true, status: "NOTIFIED" }
            : appt
        ),
      };
    default:
      return state;
  }
};

export const AppointmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  return (
    <AppointmentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  );
};
