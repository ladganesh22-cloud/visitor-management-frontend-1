import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/apiBase";

const API_PASS_URL = `${API_BASE_URL}/api/pass`;

const useFetchPassList = () => {
  const [passList, setPassList] = useState([])
  const [singlePass, setSinglePass] = useState(null)
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

  // Get All pass Lists
  const getAllPassList = async () => {
    try {
      startRequest();
      const res = await axios.get(API_PASS_URL, getAuthHeader());
      console.log(res, 'resspass');
      setPassList(res.data);
    } catch (err) {
      setError(err.error);
    } finally {
      setLoading(false);
    }
  };

  // get pass List BY ID
  const getPassListById = async (id) => {
    try {
      startRequest();
      const res = await axios.get(`${API_PASS_URL}/${id}`, getAuthHeader());
      setSinglePass(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getverifyVisitorQRCode = async (qrcodeimageData) => {
    try {
      startRequest();
      console.log(qrcodeimageData, 'qrcodeimageData');
      const res = await axios.post(
        `${API_PASS_URL}/verify-qr-image`,
        qrcodeimageData,
        getAuthHeader()
      );
      setSinglePass(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // get pass List BY ID
  const createPass = async (passData) => {
    try {
      startRequest();

      const res = await axios.post(
        API_PASS_URL,
        passData,
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
    getAllPassList();
  }, []);


  return {
    passList,
    singlePass,
    loading,
    error,
    getAllPassList,
    getPassListById,
    createPass,
    getverifyVisitorQRCode
  };
};

export default useFetchPassList;
