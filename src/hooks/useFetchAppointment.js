import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/apiBase";
const API_URL = `${API_BASE_URL}/api/appointment`;

const useFetchAppointmentList = () => {
  const [appointmentList, setAppointmentList] = useState([])
  const [singleAppointment, setSingleAppointment] = useState(null)
  const [loadingAppointment, setAppointmentLoading] = useState(true)
  const [errorAppointment, setAppointmentError] = useState(null)

  const startRequest = () => {
    setAppointmentError(null);
    setAppointmentLoading(true);
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

  // Get All Appointment Lists
  const getAllAppointmentList = async () => {
    try {
      startRequest();
      const res = await axios.get(API_URL, getAuthHeader());
      setAppointmentList(res.data);
    } catch (err) {
      setAppointmentError(err.error);
    } finally {
      setAppointmentLoading(false);
    }
  };

  // get Appointment List BY ID
  const getAppointmentListById = async (id) => {
    try {
      startRequest();
      const res = await axios.get(`${API_URL}/${id}`, getAuthHeader());
      setSingleAppointment(res.data);
      return res.data;
    } catch (err) {
      setAppointmentError(err.message);
    } finally {
      setAppointmentLoading(false);
    }
  };

  // get Appointment List BY ID
  const createAppointment = async (appointmentData) => {
    try {
      startRequest();

      const res = await axios.post(
        API_URL,
        appointmentData,
        getAuthHeader()
      );

      return res.data;
    } catch (err) {
      setAppointmentError(err.response?.data?.message || err.message);
    } finally {
      setAppointmentLoading(false);
    }
  };

  const rejectAppointment = async (appointmentData) => {
    try {
      startRequest();
      const id = appointmentData._id
      console.log(id);
      const res = await axios.put(
        `${API_URL}/${id}/reject`,
        appointmentData,
        getAuthHeader()
      );
      console.log(`${API_URL}/${id}/reject`);
      console.log(res);
      return res.data;
    } catch (err) {
      setAppointmentError(err.response?.data?.message || err.message);
    } finally {
      setAppointmentLoading(false);
    }
  };

  const approvedAppointment = async (appointmentData) => {
    try {
      startRequest();
      const id = appointmentData._id
      console.log(id, 'idddddd');
      console.log(`${API_URL}/${id}/approve`)
      const res = await axios.put(
        `${API_URL}/${id}/approve`,
        appointmentData,
        getAuthHeader()
      );

      console.log(res)
      return res.data;
    } catch (err) {
      setAppointmentError(err.response?.data?.message || err.message);
    } finally {
      setAppointmentLoading(false);
    }
  };

  useEffect(() => {
    getAllAppointmentList();
  }, []);


  return {
    appointmentList,
    singleAppointment,
    loadingAppointment,
    errorAppointment,
    getAllAppointmentList,
    getAppointmentListById,
    createAppointment,
    rejectAppointment,
    approvedAppointment
  };
};

export default useFetchAppointmentList;
