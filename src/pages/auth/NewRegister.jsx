import React, { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'


const NewRegister = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const { register, isLoading, error } = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, role);

    await register(name, email, password, role)
  }

  return (
    <div className='new-register-container'>
      <div className='row container'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <h1 className='signup-name'>Sign Up</h1>
          <p><ion-icon name="person-add-outline"></ion-icon> Please signup a new user!</p>
          <div className="singup-wrapper">
            <div className='form-content-wrapper'>
              <input
                placeholder='Name'
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
            <div className='form-content-wrapper'>
              <select onChange={(e) => setRole(e.target.value)} value={role}>
                <option value="_none">Select Role</option>
                <option value="security">Security</option>
                <option value="host">Host</option>
                <option value="admin">Admin</option>
                {/* <option value="visitor">Visitor</option> */}
              </select>
            </div>
            <div className='signup-btn-wrapper'><button disabled={isLoading} className='btn btn-primary' type='submit'>Sign Up</button></div>
            {error && <div className='error'>{error}</div>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewRegister
