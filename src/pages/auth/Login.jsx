import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await login(email, password)
  }

  return (
    <div className='new-register-container'>
      <div className='row container'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <h1 className='signup-name'>Login</h1>
          <p><ion-icon name="person-add-outline"></ion-icon> Enter your email and password</p>
          <div className='login-wrapper-container'>
            <div className='left-sign-wrapper'><img src='../public/login-left-bg-2.jpg' /></div>
            <div className="singup-wrapper right">
              <div className='form-content-wrapper'>
                <input
                  placeholder='Email'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='form-content-wrapper'>
                <input
                  placeholder='Password'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='signup-btn-wrapper'><button disabled={isLoading} className='btn btn-primary' type='submit'>Login</button></div>
              {error && <div className='error'>{error}</div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
