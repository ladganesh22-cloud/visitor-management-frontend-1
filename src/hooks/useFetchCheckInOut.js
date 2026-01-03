import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/apiBase";

const API_URL = `${API_BASE_URL}/api/checklog`;
const CHECK_IN_API_URL = `${API_BASE_URL}/api/checklog/checkin`;
const CHECK_OUT_API_URL = `${API_BASE_URL}/api/checklog/checkout`;

const useFetchCheckInOutList = () => {
  const [checkLogList, setCheckLogList] = useState([])
  // const [singleCheckIn, setSingleCheckIn] = useState(null)
  const [loadingCheckLog, setCheckLogLoading] = useState(true)
  const [errorCheckLog, setCheckLogError] = useState(null)

  const startRequest = () => {
    setCheckLogError(null);
    setCheckLogLoading(true);
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

  // Get All Check Log Lists
  const getAllCheckLogList = async () => {
    try {
      startRequest();
      const res = await axios.get(API_URL, getAuthHeader());
      console.log(res, 'resssssschecklog');
      setCheckLogList(res.data);
    } catch (err) {
      setCheckLogError(err.error);
    } finally {
      setCheckLogLoading(false);
    }
  };

  // // get Appointment List BY ID
  // const getAppointmentListById = async (id) => {
  //   try {
  //     startRequest();
  //     const res = await axios.get(`${API_URL}/${id}`, getAuthHeader());
  //     setSingleAppointment(res.data);
  //     return res.data;
  //   } catch (err) {
  //     setAppointmentError(err.message);
  //   } finally {
  //     setAppointmentLoading(false);
  //   }
  // };

  // get Create Check IN
  const createCheckIn = async (checkInData) => {
    try {
      startRequest();
      console.log(checkInData, 'checkInData');
      const res = await axios.post(
        CHECK_IN_API_URL,
        checkInData,
        getAuthHeader()
      );

      return res.data;
    } catch (err) {
      setCheckLogError(err.response?.data?.message || err.message);
    } finally {
      setCheckLogLoading(false);
    }
  };

  // Create CheckOut
  const createCheckOut = async (checkOutData) => {
    try {
      startRequest();
      const id = checkOutData.id
      console.log(id, 'idididididid');
      const res = await axios.put(
        `${CHECK_OUT_API_URL}/${id}`,
        checkOutData,
        getAuthHeader()
      );
      return res.data;
    } catch (err) {
      setCheckLogError(err.response?.data?.message || err.message);
    } finally {
      setCheckLogLoading(false);
    }
  };

  // const rejectAppointment = async (appointmentData) => {
  //   try {
  //     startRequest();
  //     const id = appointmentData._id
  //     console.log(id);
  //     const res = await axios.put(
  //       `${API_URL}/${id}/reject`,
  //       appointmentData,
  //       getAuthHeader()
  //     );
  //     console.log(`${API_URL}/${id}/reject`);
  //     console.log(res);
  //     return res.data;
  //   } catch (err) {
  //     setAppointmentError(err.response?.data?.message || err.message);
  //   } finally {
  //     setAppointmentLoading(false);
  //   }
  // };

  // const approvedAppointment = async (appointmentData) => {
  //   try {
  //     startRequest();
  //     const id = appointmentData._id
  //     console.log(id, 'idddddd');
  //     console.log(`${API_URL}/${id}/approve`)
  //     const res = await axios.put(
  //       `${API_URL}/${id}/approve`,
  //       appointmentData,
  //       getAuthHeader()
  //     );

  //     console.log(res)
  //     return res.data;
  //   } catch (err) {
  //     setAppointmentError(err.response?.data?.message || err.message);
  //   } finally {
  //     setAppointmentLoading(false);
  //   }
  // };

  useEffect(() => {
    getAllCheckLogList();
  }, []);


  return {
    checkLogList,
    loadingCheckLog,
    errorCheckLog,
    getAllCheckLogList,
    createCheckIn,
    createCheckOut,
  };
};

export default useFetchCheckInOutList;
