import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchVisitorList from "../../hooks/useFetchVisitor";
import useFetchUserList from '../../hooks/useFetchUser';
import { useAuthContext } from '../../hooks/useAuthContext'
import { jwtDecode } from "jwt-decode";
import useFetchAppointmentList from "../../hooks/useFetchAppointment";

const CreateAppointment = () => {
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
    createAppointment } = useFetchAppointmentList()

  const { user } = useAuthContext()
  const [purpose, setPurpose] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [appointmentDate, setAppintmentDate] = useState("");

  // gor naviagate the page]
  const gblnavigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      const { userId } = jwtDecode(user.token);
      // getUserListById(userId);
      console.log(userId, 'userIduserId');
      setCreatedBy(userId)
    }
  }, [user]);

  const handleCreateAppointment = (e) => {
    e.preventDefault();

    const appointment = {
      visitorId: selectedVisitor._id,
      hostId: createdBy,
      approvalBy: createdBy,
      purpose,
      appointmentDate,
      notificationSent: "0",
      status: "pending",
    };
    console.log(appointment)
    createAppointment(appointment)
    // dispatch({ type: "CREATE_APPOINTMENT", payload: appointment });

    setPurpose("");
    setAppintmentDate("");
    setCreatedBy("");

    // after form submit page redirect to host-dashboard page
    gblnavigate("/host-dashboard");
  };
  console.log('visitor:', visitorList);
  console.log('selectedVisitor:', selectedVisitor);

  return (
    <div className="dashboard-panel-wrapper">
      <section className="create-appointment-section">
        <div className="row container">
          <div className="view-visitor-wrapper">
            <h2>Invites Created <ion-icon name="id-card-outline"></ion-icon></h2>
            <table className="visitor-table">
              <thead>
                <tr className="">
                  <th className="">Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visitorList && visitorList.map((visitor) => (
                  <tr key={visitor._id} className="">
                    <td className="">{visitor.name}</td>
                    <td>{visitor.email}</td>
                    <td>{visitor.phone}</td>
                    <td>
                      <button
                        className="invite-btn"
                        onClick={() => setSelectedVisitor(visitor)}
                      ><ion-icon name="duplicate-outline"></ion-icon>
                        Create Invite
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* Appointment Form */}
          {selectedVisitor && (
            <div className="select-create-appointment-wrapper">
              <div className="create-appointment-content">
                <p>Create Appointment for  </p>
                <h2>  {selectedVisitor.name}</h2>
              </div>
              <div className="form-content-wrapper">
                <input
                  type="text"
                  placeholder="Purpose of visit"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className=""
                />
              </div>


              <div className="form-content-wrapper">
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppintmentDate(e.target.value)}
                  className=""
                />
              </div>


              <button
                disabled={loading}
                onClick={handleCreateAppointment}
                className="btn"
              >
                {loading ? "Creating..." : "Create Appointment"}
              </button>
              {errorAppointment && <div className="error">{errorAppointment}</div>}
            </div>
          )}
        </div>
      </section>
    </div>

  );
};

export default CreateAppointment;
