
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, authReady: true }
    // return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case "AUTH_READY":
      return { ...state, authReady: true };
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    // role: '',
    authReady: false,
  })
  console.log('Authcontext State:', state)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user, 'uurr');
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
    dispatch({ type: "AUTH_READY" });
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
