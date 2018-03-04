import React from 'react'

const Login = ({ onSubmit, username, password, onValueChange }) => (
  <form onSubmit={onSubmit}>
    <h2>Log in to application</h2>
    <div>
      Username: <input type='text' name='username' value={username} onChange={onValueChange}/>
    </div>
    <div>
      Password: <input type='password' name='password' value={password} onChange={onValueChange}/>
    </div>
    <button type='submit'>Login</button>
  </form>
)

export default Login