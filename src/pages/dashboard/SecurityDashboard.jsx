import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCheckInContext } from "../../hooks/useCheckInContext";
import { useVisitorContext } from "../../hooks/useVisitorContext";
import { usePassContext } from "../../hooks/usePassContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetchVisitorList from "../../hooks/useFetchVisitor";
import useFetchAppointmentList from "../../hooks/useFetchAppointment";
import { jwtDecode } from "jwt-decode";
import useFetchUserList from "../../hooks/useFetchUser";
import useFetchPassList from "../../hooks/useFetchPass";
import useFetchCheckInOutList from "../../hooks/useFetchCheckInOut";

const SecurityDashboard = () => {
  const { visits, dispatch } = useCheckInContext();
  const { visitors } = useVisitorContext();
  const { passes } = usePassContext();
  const [createdBy, setCreatedBy] = useState("");
  const { user } = useAuthContext();
  const [checkInOpen, setcheckInOpen] = useState(false);
  const [passId, setPassId] = useState("");
  const [scanned, setScanned] = useState("");
  const [qrStatus, setQrStatus] = useState(null);

  const [checkInData, setCheckInData] = useState({
    passId: "",
    visitorId: "",
    checkDate: "",
    scanType: "",
    scannedBy: "",
  });


  const {
    visitorList,
    singleVisitor,
    loading,
    error,
    getAllVisitorList,
    getVisitorListById,
    createVisitor
  } = useFetchVisitorList();

  const { appointmentList,
    singleAppointment,
    loadingAppointment,
    errorAppointment,
    getAllAppointmentList,
    getAppointmentListById,
    createAppointment,
    rejectAppointment,
    approvedAppointment
  } = useFetchAppointmentList()

  const {
    userList,
    getUserListById,
  } = useFetchUserList();

  const {
    passList,
    getPassListById,
    getverifyVisitorQRCode,
  } = useFetchPassList();

  const {
    checkLogList,
    loadingCheckLog,
    errorCheckLog,
    getAllCheckLogList,
    createCheckIn,
    createCheckOut,
  } = useFetchCheckInOutList();

  useEffect(() => {
    if (user?.token) {
      const { userId } = jwtDecode(user.token);
      console.log(userId, 'userIduserId');
      setCreatedBy(userId)
    }
  }, [user]);

  console.log(visitorList, 'visitorList');
  // get total visitors lists
  const totalVisitors = visitorList.length > 0 ? Number(visitorList.length) : 0
  // get total appointment lists
  const totalAppointments = appointmentList.length > 0 ? Number(appointmentList.length) : 0

  console.log(appointmentList, 'appointmentList')
  // get total pending appointments
  const pendingAppointments = appointmentList.filter(
    (a) => a.status === 'pending'
  );
  const totalPendingApprovals = pendingAppointments.length > 0 ? Number(pendingAppointments.length) : 0

  // get total reject appointments
  const rejectAppointments = appointmentList.filter(
    (b) => b.status === 'rejected'
  );
  const totalRejectedApprovals = rejectAppointments.length > 0 ? Number(rejectAppointments.length) : 0

  // get total approval appointements
  const approvalAppointments = appointmentList.filter(
    (v) => v.status === "approved"
  );
  console.log(approvalAppointments, 'approvalAppointments');
  const totalApprovalAppointments = approvalAppointments.length > 0 ? Number(approvalAppointments.length) : 0

  const getVisitorNameById = (visitorId) => {
    const visitor = visitorList.find(v => v._id === visitorId);
    return visitor ? visitor.name : "Visitor";
  };

  const getHostNameById = (hostId) => {
    const host = userList.find(h => h._id === hostId);
    return host ? host.name : "Host";
  };

  const getPassIdById = (visitorId) => {
    const pass = passList.find(h => h.visitorId === visitorId);
    return pass ? pass.passId : "Pass";
  };

  const getPassModleIdById = (passId) => {
    const getpassId = passList.find(h => h.passId === passId);
    return getpassId ? getpassId._id : "Pass";
  };

  const getCheckLogModleIdById = (passId) => {
    const getcheckLogId = checkLogList.find(k => k.passId === passId);
    return getcheckLogId ? getcheckLogId._id : "Pass";
  };

  // const checkCheckInStatus = (visitorId) => {
  //   const checkCheckInStatus = passList.find(n => n.visitorId === visitorId && n.status === "active");
  //   return checkCheckInStatus ? "TRUE" : "FALSE";
  // };
  const checkCheckInStatus = (visitorId) => {
    return passList.some(
      n => n.visitorId === visitorId && n.status === "active"
    );
  };
  const activeVisits = passList.filter(
    (v) => v.status === "active"
  );

  const totalActiveVisitor = activeVisits.length > 0 ? Number(activeVisits.length) : 0

  const checkedIn = checkLogList.filter(
    (d) => d.scanType === "checkin"
  );
  console.log(checkedIn, 'checkedIn');
  console.log(checkLogList, 'checkLogListcheckLogList');

  const checkedOut = checkLogList.filter(
    (a) => a.scanType === "checkout"
  );
  console.log(checkedOut, 'checkedOutcheckedOutcheckedOut');

  // const handleCheckIn = async (id) => {
  // await axios.patch(`/api/checklog/checkin/${id}`);
  // getAppointments();
  // };

  // const handleCheckOut = async (id) => {
  //   await axios.patch(`/api/checklog/checkout/${id}`);
  //   getAppointments();
  // };

  const handleCheckOut = async (passId) => {
    const getPassModelID = getPassModleIdById(passId)
    console.log(getPassModelID);
    const checkOut = {
      passId: passId,
      id: getCheckLogModleIdById(getPassModelID),
    };
    console.log(checkOut, 'checkOutout')
    createCheckOut(checkOut)
    setcheckInOpen(false);
  };

  const handleCheckInOpen = (passID, visitorID, checkDates, scannBy) => {
    setCheckInData({
      passId: passID,
      visitorId: visitorID,
      checkDate: checkDates,
      scanType: "checkin",
      scannedBy: scannBy,
    });
    setQrStatus('');
    setcheckInOpen(true);
  };

  const handleCheckInSubmit = async () => {
    const checkIn = {
      passId: getPassModleIdById(checkInData.passId),
      visitorId: checkInData.visitorId,
      checkDate: checkInData.checkDate,
      scanType: "checkin",
      scannedBy: checkInData.scannedBy
    };
    console.log(checkIn, 'checkkkinnn')
    createCheckIn(checkIn)
    setcheckInOpen(false);
  };

  // const handleQrImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("qrImage", file);
  //   console.log(formData, 'formdateaa');
  //   const res = await getverifyVisitorQRCode(formData);
  //   console.log(res, 'reddd')
  //   const data = await res.json();

  //   if (data.valid) {
  //     setCheckInData({ passId: data.passId });
  //     setQrStatus("valid");
  //   } else {
  //     setQrStatus("invalid");
  //   }
  // };
  const handleQrImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append("qrImage", file);
    console.log(formData, 'formdataaa');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const data = await getverifyVisitorQRCode(formData);
      console.log(data, "response data");

      if (data.valid) {
        setCheckInData((prev) => ({
          ...prev,
          passId: data.passId,
        }));
        setQrStatus("valid");
      } else {
        setQrStatus("invalid");
      }
    } catch (err) {
      console.error(err);
      setQrStatus("invalid");
    }
  };

  return (
    <div className="dashboard-panel-wrapper">
      <h1>Visitor Check-In Dashboard</h1>
      <section className="check-link-section">
        {/* <Link to="/create-visitor">
          <button className="btn">Create Visitor</button>
        </Link> */}
        {/* <Link to="/check-in">
          <button className="btn">Visitor Check-In</button>
        </Link>
        <Link to="/check-out">
          <button className="btn">Visitor Check-Out</button>
        </Link> */}
      </section>
      <section className='card-section'>
        <div className="row container">
          <div className="dashboard-panel gr">
            <div className='total-content-wrapper'>
              <ion-icon name="people-circle-outline"></ion-icon>
              <h2 className="dashboard-label">{totalVisitors}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-add-outline"></ion-icon>
              <p className="dashboard-content">Total Visitors</p>
            </div>
          </div>
          <div className="dashboard-panel vo">
            <div className='total-content-wrapper'>
              <ion-icon name="hand-left-outline"></ion-icon>
              <h2 className="dashboard-label">{totalRejectedApprovals}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-add-outline"></ion-icon><p className="dashboard-content">Rejected Vistior</p>
            </div>
          </div>
          <div className="dashboard-panel yl">
            <div className='total-content-wrapper'>
              <ion-icon name="happy-outline"></ion-icon>
              <h2 className="dashboard-label">{totalApprovalAppointments}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-add-outline"></ion-icon><p className="dashboard-content">Approvals Visitor</p>
            </div>
          </div>
          <div className="dashboard-panel gr">
            <div className='total-content-wrapper'>
              <ion-icon name="cellular-outline"></ion-icon>
              <h2 className="dashboard-label">{totalActiveVisitor}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="people-circle-outline"></ion-icon><p className="dashboard-content">Total Active Visitor</p>
            </div>
          </div>
        </div>
      </section>
      <section className="security-visitor-section">
        <h1>Approved Visitors</h1>
        <table className="view-visitor-approved-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Host</th>
              <th>Date</th>
              <th>Check In</th>
            </tr>
          </thead>

          <tbody>
            {
              approvalAppointments.length > 0 ? (approvalAppointments.map((a, i) => (
                <tr key={a._id}>
                  <td>{i + 1}</td>
                  <td>{getVisitorNameById(a.visitorId)}</td>
                  <td>{getHostNameById(a.hostId)}</td>
                  <td>{new Date(a.appointmentDate).toDateString()}</td>
                  <td>
                    {(() => {
                      const isCheckedIn = checkCheckInStatus(a.visitorId);
                      console.log(isCheckedIn, 'isCheckedIn');
                      return isCheckedIn ? (
                        <button
                          className="check-in-btn btn"
                          onClick={() =>
                            handleCheckInOpen(
                              getPassIdById(a.visitorId),
                              a.visitorId,
                              a.appointmentDate,
                              createdBy
                            )
                          }
                        >
                          Check-In
                        </button>
                      ) : (
                        <button
                          className="check-out-btn btn"
                          onClick={() =>
                            handleCheckOut(
                              getPassIdById(a.visitorId),
                            )
                          }
                        >
                          Check-Out
                        </button>
                      );
                    })()}
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5" className="">
                    No Approved Visitor Items found.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
      {/* <section className="security-rejected-visitor-section">
        <h1>Rejected Visitors</h1>
        <table className="view-visitor-approved-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Check Out</th>
            </tr>
          </thead>

          <tbody>
            {
              rejectAppointments.length > 0 ? (rejectAppointments.map((a, i) => (
                <tr key={a._id}>
                  <td>{i + 1}</td>
                  <td>{getVisitorNameById(a.visitorId)}</td>
                  <td>{new Date(a.appointmentDate).toDateString()}</td>
                  <td>
                    <button className="check-in-btn btn" onClick={() => handleCheckInOpen(getPassIdById(a.visitorId), a.visitorId, a.appointmentDate, createdBy)}>
                      Check-Out
                    </button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5" className="">
                    No Rejected Visitor Items found.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table> */}
      {/* <ul>
          {rejectAppointments.length > 0 ? (rejectAppointments.map(a => (
            <li key={a._id}>
              {getVisitorNameById(a.visitorId)} requested on {new Date(a.appointmentDate).toDateString()}
            </li>
          ))
          ) : (
            <div className="no-rejected-found center"> No Rejected Visitor Items found.</div>
          )
          }
        </ul> */}
      {/* </section> */}
      {/* <section className="security-check-out-visitor-section">
        <h1>Visitors Inside</h1>
        <table className="view-visitor-approved-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              checkedIn.length > 0 ? (checkedIn.map((a, i) => (
                <tr key={a._id}>
                  <td>{i + 1}</td>
                  <td>{getVisitorNameById(a.visitorId)}</td>
                  <td>{new Date(a.checkDate).toDateString()}</td>
                  <td>
                    <button className="check-out-btn btn" onClick={() => handleCheckInOpen(getPassIdById(a.visitorId), a.visitorId, a.appointmentDate, createdBy)}>
                      Check-Out
                    </button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="4" className="">
                    No Visitor Inside Items found.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table> */}
      {/* {checkedIn.length > 0 ? (checkedIn.map(a => (
          <div key={a._id}>
            {getVisitorNameById(a.visitorId)} is inside since {new Date(a.updatedAt).toLocaleTimeString()}
            <button onClick={() => handleCheckOut(a._id)}>Checkout</button>
          </div>
        ))
        ) : (
          <div className="center">No Visitor Inside Items found.</div>
        )
        } */}
      {/* </section> */}
      <section className="security-checkout-logs-section">
        <div className="left-rejected-visitor-wrapper visitors-in-wrapper">
          <h4>Visitors Inside</h4>
          <ul className="rejected-visitor-lists lu-visitor-lists">
            {checkedIn.length > 0 ? (checkedIn.map(a => (
              <li key={a._id}>
                {getVisitorNameById(a.visitorId)} Check In on {new Date(a.checkDate).toDateString()}
              </li>
            ))
            ) : (
              <div className="no-rejected-found center"> No Visitor Insider Items found.</div>
            )
            }
          </ul>
        </div>
        <div className="center-checklog-wrapper visitors-in-wrapper">
          <h4>Checkout Logs</h4>
          <ul className="checklog-visitor-lists lu-visitor-lists">
            {checkedOut.length > 0 ? (checkedOut.map(a => (
              <li key={a._id}>
                {getVisitorNameById(a.visitorId)} checkOut on {new Date(a.checkDate).toDateString()}
              </li>
            ))
            ) : (
              <div className="no-rejected-found center"> No checklogs Items found.</div>
            )
            }
          </ul>
        </div>
        <div className="right-rejected-visitor-wrapper visitors-in-wrapper">
          <h4>Rejected Visitors</h4>
          <ul className="rejected-visitor-lists lu-visitor-lists">
            {rejectAppointments.length > 0 ? (rejectAppointments.map(a => (
              <li key={a._id}>
                {getVisitorNameById(a.visitorId)} rejected on {new Date(a.appointmentDate).toDateString()}
              </li>
            ))
            ) : (
              <div className="no-rejected-found center"> No Rejected Visitor Items found.</div>
            )
            }
          </ul>
        </div>
      </section>
      {checkInOpen && (
        <div className="checkinopen-section">
          <div className="checkinopen-wrapper">

            <h3 className="checkinopen-title">
              CheckIn PassId & QR code
            </h3>

            <input
              className="checkinopen-input"
              placeholder="Pass ID"
              value={checkInData.passId}
              onChange={(e) =>
                setCheckInData({ ...checkInData, passId: e.target.value })
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleQrImageUpload}
            />
            {qrStatus === "valid" && (
              <p className="qr-valid">✅ Pass Valid</p>
            )}
            {qrStatus === "invalid" && (
              <p className="qr-invalid">❌ Invalid or Expired Pass</p>
            )}
            <div className="checkinopen-btn-wrapper">
              <button
                className="btn-cancel"
                onClick={() => setcheckInOpen(false)}
              >
                Cancel
              </button>

              <button
                className="btn-submit"
                onClick={handleCheckInSubmit}
              >
                Check-In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityDashboard;
