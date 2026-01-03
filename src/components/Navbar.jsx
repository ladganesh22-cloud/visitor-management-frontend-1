import { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { jwtDecode } from "jwt-decode";
import useFetchUserList from '../hooks/useFetchUser';
import { useState } from "react";

const Navbar = () => {
  const [userName, setUserName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const { logout } = useLogout()
  const { user } = useAuthContext()

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

  useEffect(() => {
    if (singleToDo) {
      console.log(singleToDo, 'singleToDo')
      setUserName(singleToDo.name);
      setRole(singleToDo.role);
      setEmail(singleToDo.email);
    }
  }, [singleToDo]);

  const handleClick = () => {
    logout()
  }
  return (
    <header>
      <div className='row container'>
        <div className='logo-container'>
          <ion-icon name="compass-outline"></ion-icon>
          <Link to='/dashboard'>
            <h1>GBLPASS</h1>
          </Link>
        </div>
        <nav>
          {
            user && (
              <div className="dashboard-header">
                <h2 className="dashboard-title">
                  Welcome, <span className="user-name">{userName}</span>
                </h2>

                {/* <div className="user-meta">
                  <span className="user-role"><img src="./../public/man.png" />{role}</span>
                  <span className="user-email">{email}</span>
                </div> */}
                <div className="user-meta">
                  <img src="../man.png" alt="User" className="user-avatar" />

                  <div className="user-info">
                    <span className="user-role">{role}</span>
                    <span className="user-email">{email}</span>
                  </div>
                </div>
                <button onClick={handleClick}>Log Out</button>
              </div>
            )
          }
          {
            !user && (
              <div className="login-content-wrapper">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )
          }
        </nav>
      </div>
    </header>
  )
}

export default Navbar
