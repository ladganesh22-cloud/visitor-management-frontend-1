import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppointmentContext } from "../../hooks/useAppointmentContext";
import { useVisitorContext } from "../../hooks/useVisitorContext";
import { useCheckInContext } from "../../hooks/useCheckInContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetchVisitorList from "../../hooks/useFetchVisitor";
import useFetchAppointmentList from "../../hooks/useFetchAppointment";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const HostDashboard = () => {
  const [createdBy, setCreatedBy] = useState("");
  const { user } = useAuthContext();
  const { appointments, dispatch } = useAppointmentContext();
  const { visitors } = useVisitorContext();
  const { visits } = useCheckInContext();

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

  useEffect(() => {
    if (user?.token) {
      const { userId } = jwtDecode(user.token);
      // getUserListById(userId);
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
  const handleRejectSubmit = async (appointmentDate) => {
    try {
      rejectAppointment(appointmentDate)
      // await sendAppointmentEmail({
      //   title: 'Your GBLPASS Visitor Access Has Been Rejected',
      //   top_description: 'Thank you for submitting your visitor request through the GBLPASS Visitor App. After review, we regret to inform you that your visit request has been declined by the host at this time.',
      //   to_email: 'ladganesh22@gmail.com',
      //   visitor_name: 'Deevan Kumar',
      //   status: "Rejected",
      //   appointment_date: dayjs(appointmentData.appointmentDate).format("M/D/YYYY"),
      //   description_1: 'This decision may be due to scheduling constraints or other internal considerations.',
      //   description_2: 'You may contact your host directly for further clarification or submit a new request for a different date.',
      //   description_3: 'Thank you for your understanding.'

      // });
      alert("Appointment rejected. SMS & Email sent.");
      getAllAppointmentList();
    } catch (err) {
      console.error(err);
      alert("Failed to reject appointment");
    }
  }

  const handleApprovedSubmit = async (appointmentData) => {
    try {
      console.log(appointmentData, 'appointmentDataappointmentDatassssss');
      approvedAppointment(appointmentData)
      // await sendAppointmentEmail({
      //   title: 'Your GBLPASS Visitor Access Has Been Approved',
      //   top_description: 'We’re pleased to inform you that your visitor request submitted through the GBLPASS Visitor App has been approved by your host.',
      //   to_email: 'ladganesh22@gmail.com',
      //   visitor_name: 'Deevan Kumar',
      //   status: "APPROVED",
      //   appointment_date: dayjs(appointmentData.appointmentDate).format("M/D/YYYY"),
      //   description_1: 'Please ensure you carry a valid government-issued ID and show your digital visitor pass at the security desk upon arrival.',
      //   description_2: 'If you have any questions or need assistance, feel free to contact your host directly.',
      //   description_3: 'We look forward to welcoming you.'
      // });
      alert("Appointment approved. SMS & Email sent.");
      getAllAppointmentList();
    } catch (e) {
      console.log(e);
      alert("Failed to approve appointment");
    }
  }
  return (
    <div className="dashboard-panel-wrapper">
      <h1>Appointment Dashboard</h1>
      <section className="host-link-section">
        <Link to="/create-visitor">
          <button className="btn">Create Visitor</button>
        </Link>
        <Link to="/create-appointment">
          <button className="btn">Create Appointment</button>
        </Link>
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
              <h2 className="dashboard-label">{totalPendingApprovals}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-add-outline"></ion-icon><p className="dashboard-content">Pending Approvals</p>
            </div>
          </div>
          <div className="dashboard-panel yl">
            <div className='total-content-wrapper'>
              <ion-icon name="happy-outline"></ion-icon>

              <h2 className="dashboard-label">{totalApprovalAppointments}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-add-outline"></ion-icon><p className="dashboard-content">Total Approvals</p>
            </div>
          </div>
          <div className="dashboard-panel br">
            <div className='total-content-wrapper'>
              <ion-icon name="cellular-outline"></ion-icon>
              <h2 className="dashboard-label">{totalAppointments}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="people-circle-outline"></ion-icon><p className="dashboard-content">Total Appointments</p>
            </div>
          </div>
        </div>
      </section>
      <section className="view-all-appointments-wrapper">
        <h1>Views Appointments</h1>
        <div className="row container">
          <table className="view-appointments-table">
            <thead className="">
              <tr>
                <th className="">Visitor Name</th>
                <th className="">Purpose</th>
                <th className="">Appointment Date</th>
                <th className="">Status</th>
                <th className="">Notification Status</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                appointmentList.length > 0 ? (
                  appointmentList.map((each) => (
                    <tr key={each._id}>
                      <td className="">{getVisitorNameById(each.visitorId)}</td>
                      <td className="">{each.purpose}</td>
                      <td className="">{each.appointmentDate ? dayjs(each.appointmentDate).format("M/D/YYYY") : ''}</td>
                      <td className="">{each.status}</td>
                      <td className="">{each.notificationSent ? 'Yes' : 'No'}</td>
                      <td className="">
                        {!each.notificationSent && (
                          <>
                            <button
                              className="reject-btn btn"
                              onClick={() => handleRejectSubmit(each)}
                            >
                              Reject
                            </button>

                            <button
                              className="approved-btn btn"
                              onClick={() => handleApprovedSubmit(each)}
                            >
                              Approved
                            </button>
                          </>
                        )}

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="">
                      No Appointments Items found.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </section >
    </div >
  );
};

export default HostDashboard;
