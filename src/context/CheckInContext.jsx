import { createContext, useReducer } from "react";

export const CheckInContext = createContext();

const initialState = {
  visits: [],
};

export const checkInReducer = (state, action) => {
  switch (action.type) {
    case "CHECK_IN":
      return {
        visits: [...state.visits, action.payload],
      };

    case "CHECK_OUT":
      return {
        visits: state.visits.map((visit) =>
          visit.id === action.payload
            ? {
              ...visit,
              checkOutTime: new Date().toISOString(),
              status: "CHECKED_OUT",
            }
            : visit
        ),
      };

    default:
      return state;
  }
};

export const CheckInContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(checkInReducer, initialState);

  return (
    <CheckInContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CheckInContext.Provider>
  );
};
