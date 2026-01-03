import { createContext, useReducer } from "react";

// Create context
export const VisitorContext = createContext();

// Initial state
const initialState = {
  visitors: [],
};

export const visitorReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_VISITOR":
      return {
        visitors: [...state.visitors, action.payload],
      };

    case "SET_VISITORS":
      return {
        visitors: action.payload,
      };

    default:
      return state;
  }
};

// Provider
export const VisitorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(visitorReducer, initialState);

  return (
    <VisitorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VisitorContext.Provider>
  );
};
