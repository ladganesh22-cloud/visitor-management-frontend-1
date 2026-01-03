import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Import Pages and Components
import Navbar from './components/Navbar'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import NewRegister from './pages/auth/NewRegister'
import Login from './pages/auth/Login'
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from './hooks/useAuthContext'
import CreateVisitor from './pages/visitors/VisitorCreate'
import SecurityDashboard from './pages/dashboard/SecurityDashboard'
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import HostDashboard from "./pages/dashboard/HostDashboard";
import { getDashboardPath } from "./utils/getDashboardPath";
import useFetchUserList from './hooks/useFetchUser'
import CreateAppointment from './pages/appointments/AppointmentCreate'


function App() {
  const { user, authReady } = useAuthContext()

  const {
    getUserListById,
    singleToDo
  } = useFetchUserList();

  useEffect(() => {
    if (user?.token) {
      const { userId } = jwtDecode(user.token);
      getUserListById(userId);
    }
  }, [user]);

  return (
    <div className="vistor-app">
      <BrowserRouter>
        <Navbar />
        <div className='visitor-pages'>
          <Routes>
            <Route
              path="/"
              element={
                !authReady
                  ? null
                  : !user
                    ? <Navigate to="/login" replace />
                    : <Navigate to={getDashboardPath(user.role)} replace />
              }
            />
            <Route
              path="/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/create-visitor"
              element={
                <RoleProtectedRoute allowedRoles={["security", "host"]}>
                  <CreateVisitor />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/create-appointment"
              element={
                <RoleProtectedRoute allowedRoles={["host"]}>
                  <CreateAppointment />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/security-dashboard"
              element={
                <RoleProtectedRoute allowedRoles={["security"]}>
                  <SecurityDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/host-dashboard"
              element={
                <RoleProtectedRoute allowedRoles={["host"]}>
                  <HostDashboard />
                </RoleProtectedRoute>
              }
            />
            {/* Login */}
            <Route
              path="/login"
              element={
                !user
                  ? <Login />
                  : <Navigate to={getDashboardPath(user.role)} replace />
              }
            />

            {/* Signup */}
            <Route
              path="/signup"
              element={
                !user
                  ? <NewRegister />
                  : <Navigate to={getDashboardPath(user.role)} replace />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div >
  )
}

export default App
