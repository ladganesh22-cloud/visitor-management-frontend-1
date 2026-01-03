import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/apiBase";

const API_VISITOR_URL = `${API_BASE_URL}/api/visitor`;

const useFetchVisitorList = () => {
  const [visitorList, setVisitorList] = useState([])
  const [singleVisitor, setSingleVisitor] = useState(null)
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

  // Get All visitor Lists
  const getAllVisitorList = async () => {
    try {
      startRequest();
      const res = await axios.get(API_VISITOR_URL, getAuthHeader());
      console.log(res, 'ressvisitor');
      setVisitorList(res.data);
    } catch (err) {
      setError(err.error);
    } finally {
      setLoading(false);
    }
  };

  // get visitor List BY ID
  const getVisitorListById = async (id) => {
    try {
      startRequest();
      const res = await axios.get(`${API_VISITOR_URL}/${id}`, getAuthHeader());
      setSingleVisitor(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // get Visitor List BY ID
  const createVisitor = async (visitorData) => {
    try {
      startRequest();

      const res = await axios.post(
        API_VISITOR_URL,
        visitorData,
        getAuthHeader()
      );

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVisitorList();
  }, []);


  return {
    visitorList,
    singleVisitor,
    loading,
    error,
    getAllVisitorList,
    getVisitorListById,
    createVisitor
  };
};

export default useFetchVisitorList;
