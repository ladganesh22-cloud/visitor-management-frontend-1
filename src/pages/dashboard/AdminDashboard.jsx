import { useState, useEffect, useMemo } from "react";
import useFetchUserList from "../../hooks/useFetchUser";
import useFetchVisitorList from "../../hooks/useFetchVisitor";
import useFetchAppointmentList from "../../hooks/useFetchAppointment";
import useFetchPassList from "../../hooks/useFetchPass";

function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const {
    userList,
    getUserListById,
  } = useFetchUserList();

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
    passList,
    getPassListById,
    getverifyVisitorQRCode,
  } = useFetchPassList();

  // get total visitors lists
  const totalVisitors = visitorList.length > 0 ? Number(visitorList.length) : 0

  // get total users lists
  const totalUsers = userList.length > 0 ? Number(userList.length) : 0

  // get total appointment lists
  const totalAppointments = appointmentList.length > 0 ? Number(appointmentList.length) : 0

  // get total pending appointments
  const pendingAppointments = appointmentList.filter(
    (a) => a.status === 'pending'
  );
  const totalPendingApprovals = pendingAppointments.length > 0 ? Number(pendingAppointments.length) : 0
  console.log(visitorList, 'visitorListAD');

  const topVisitors = [...visitorList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getHostNameById = (visitorId) => {
    console.log(visitorId, 'visitorIdvisitorId');
    const hostData = appointmentList.find(h => h.visitorId === visitorId);
    console.log(hostData, 'hostDatahostData');
    const hostIdData = hostData ? hostData.hostId : '';
    console.log(hostIdData, 'hostIdDatahostIdData');
    const hostDatails = userList.find(m => m._id === hostIdData);
    console.log(hostDatails, 'hostDatailshostDatails');
    return hostDatails ? hostDatails.name : "Host";
  };
  const mergedVisitors = useMemo(() => {
    return passList.map((pass) => {
      const visitor = visitorList.find(
        (v) => v._id === pass.visitorId
      );

      return {
        _id: pass._id,
        visitorId: pass.visitorId,
        name: visitor?.name || "",
        hostname: getHostNameById(pass.visitorId) || "",
        email: visitor?.email || "-",
        passId: pass.passId,
        status: pass.status,
      };
    });
  }, [passList, visitorList]);

  console.log(mergedVisitors, 'mergedVisitors');
  const filteredVisitors = mergedVisitors
    .filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((v) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "checkin") return v.status === "checked-in";
      if (statusFilter === "checkout") return v.status === "checked-out";
      return true;
    });
  console.log(filteredVisitors, 'filteredVisitors');
  return (
    <div className="dashboard-panel-wrapper">
      {/* Dashboard Cards */}
      <h1>System Administration</h1>
      <section className='card-section'>
        <div className="row container">
          <div className="dashboard-panel gr">
            <div className='total-content-wrapper'>
              <ion-icon name="shield-checkmark-outline"></ion-icon>
              <h2 className="dashboard-label">{totalVisitors}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-circle-outline"></ion-icon>
              <p className="dashboard-content">Total Visitors</p>
            </div>
          </div>
          <div className="dashboard-panel vo">
            <div className='total-content-wrapper'>
              <ion-icon name="happy-outline"></ion-icon>
              <h2 className="dashboard-label">{totalAppointments}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-outline"></ion-icon><p className="dashboard-content">Total Appointment</p>
            </div>
          </div>
          <div className="dashboard-panel yl">
            <div className='total-content-wrapper'>
              <ion-icon name="hand-left-outline"></ion-icon>
              <h2 className="dashboard-label">{totalPendingApprovals}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="person-add-outline"></ion-icon><p className="dashboard-content">Pending Approvals</p>
            </div>
          </div>
          <div className="dashboard-panel br">
            <div className='total-content-wrapper'>
              <ion-icon name="cellular-outline"></ion-icon>
              <h2 className="dashboard-label">{totalUsers}</h2>
            </div>
            <div className='total-content'>
              <ion-icon name="people-circle-outline"></ion-icon><p className="dashboard-content">Total Users</p>
            </div>
          </div>
        </div>
      </section>
      {/* Staff Section */}

      <section className='staff-section'>
        <div className='visitor-search-section'>
          <h3>Visitation Hisitory <ion-icon name="bar-chart-outline"></ion-icon></h3>
          <div className="visitor-search-bar">
            <input
              type="text"
              placeholder="Search visitor by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="visitor-content">
            <div className="visitor-filters">
              <h4>FILTER</h4>

              <label>
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === "all"}
                  onChange={() => setStatusFilter("all")}
                />
                All
              </label>

              <label>
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === "checkin"}
                  onChange={() => setStatusFilter("checkin")}
                />
                Checked In
              </label>

              <label>
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === "checkout"}
                  onChange={() => setStatusFilter("checkout")}
                />
                Checked Out
              </label>
            </div>
            <div className="visitor-table-wrapper">
              <table className="visitor-table">
                <thead>
                  <tr>
                    <th><ion-icon name="person-outline"></ion-icon>Visitor Name</th>
                    <th><ion-icon name="person-outline"></ion-icon>Host Name</th>
                    <th><ion-icon name="id-card-outline"></ion-icon>Pass ID</th>
                    <th><ion-icon name="stopwatch-outline"></ion-icon>Check-In</th>
                    <th><ion-icon name="stopwatch-outline"></ion-icon>Check-Out</th>
                    <th><ion-icon name="person-outline">E</ion-icon>Email</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVisitors.length > 0 ? (
                    filteredVisitors.map((v) => (
                      <tr key={v._id}>
                        <td>{v.name}</td>
                        <td>{v.hostname}</td>
                        <td>{v.passId}</td>
                        <td>{v.status === "checked-in" ? "Checked In" : "-"}</td>
                        <td>{v.status === "checked-out" ? "Checked Out" : "-"}</td>
                        <td>{v.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No visitors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='top-visitor-section'>
          <div className="row container">
            <h4 className="staff-panel-heading">
              Top Visitor<ion-icon name="man-outline"></ion-icon>
            </h4>
            <div className="staff-panel-container">
              {topVisitors.map((item) => (
                <div key={item._id} className="staff-panel-content">
                  <img
                    src={item.photo}
                    alt={item.name || "Visitor"}
                    className=""
                    onMouseEnter={() => setSelectedVisitor(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {selectedVisitor && (
        <div className="visitor-popup-overlay">
          <div className="visitor-popup">
            <button
              className="popup-close-btn"
              onClick={() => setSelectedVisitor(null)}
            >
              ✕
            </button>

            <img
              src={selectedVisitor.photo}
              alt={selectedVisitor.name}
              className="popup-photo"
            />

            <h3>{selectedVisitor.name}</h3>

            <p><b>Email:</b> {selectedVisitor.email}</p>
            <p><b>Phone:</b> {selectedVisitor.phone}</p>
            <p><b>Address:</b> {selectedVisitor.address}</p>
          </div>
        </div>
      )}
    </div>
  );

}

export default AdminDashboard
