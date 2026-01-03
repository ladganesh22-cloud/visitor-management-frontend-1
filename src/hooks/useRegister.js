import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import Login from "../pages/auth/Login";
import API_BASE_URL from "../config/apiBase";

const API_URL = `${API_BASE_URL}/api/auth/register`;

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext()

  const register = async (name, email, password, role) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        API_URL,
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      const json = res.data
      console.log(json)
      localStorage.setItem('user', JSON.stringify(json))
      // update global data
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
      // return res.data;
    } catch (err) {
      console.log(err)
      setIsLoading(false);
      setError(
        err.response?.data?.error || "Registration failed"
      );
    }
  };

  return { register, isLoading, error };
};
