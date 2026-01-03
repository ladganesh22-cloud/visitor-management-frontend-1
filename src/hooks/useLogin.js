import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import API_BASE_URL from "../config/apiBase";

const API_URL = `${API_BASE_URL}/api/auth/login`;

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        API_URL,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      const json = res.data

      const userData = {
        token: json.token,
        role: json.role,
        email: json.email,
      };

      console.log(json, 'jssson')
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({
      //     token: json.token,
      //     role: json.role,
      //     email: json.email,
      //   })
      // );
      localStorage.setItem("user", JSON.stringify(userData));
      // localStorage.setItem('user', JSON.stringify(json))
      // update global data
      dispatch({ type: 'LOGIN', payload: userData })
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

  return { login, isLoading, error };
};
