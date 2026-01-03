import { createContext, useReducer } from "react";

export const PassContext = createContext();

const initialState = {
  passes: [],
};

export const passReducer = (state, action) => {
  switch (action.type) {
    case "ISSUE_PASS":
      return {
        passes: [...state.passes, action.payload],
      };

    default:
      return state;
  }
};

export const PassContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(passReducer, initialState);

  return (
    <PassContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PassContext.Provider>
  );
};
