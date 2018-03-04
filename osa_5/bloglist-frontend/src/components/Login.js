import React from 'react'

const Login = ({ onSubmit, error, username, password, onValueChange }) => (
  <form onSubmit={onSubmit}>
    <h2>Log in to application</h2>
    
    {error && <div>
      {error}
    </div>}

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