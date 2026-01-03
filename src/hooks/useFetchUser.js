import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/apiBase";

const API_URL = `${API_BASE_URL}/api/user`;

const useFetchUserList = () => {
  const [userList, setUserList] = useState([])
  const [singleToDo, setSingleToDo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const startRequest = () => {
    setError(null);
    setLoading(true);
  };

  const getAuthHeader = () => {
    const localValue = localStorage.getItem("user");
    const parsedUser = JSON.parse(localValue);
    const token = parsedUser.token;
    console.log(token, 'tokennn');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Get All User Lists
  const getAllUserList = async () => {
    try {
      startRequest();
      const res = await axios.get(API_URL, getAuthHeader());
      setUserList(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // get User List BY ID
  const getUserListById = async (id) => {
    try {
      startRequest();
      const res = await axios.get(`${API_URL}/${id}`, getAuthHeader());
      setSingleToDo(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUserList();
  }, []);


  return {
    userList,
    singleToDo,
    loading,
    error,
    getAllUserList,
    getUserListById
  };
};

export default useFetchUserList;
