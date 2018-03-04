import React from 'react'
import propTypes from 'prop-types'

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

Login.propTypes = {
  onSubmit: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired
}

export default Login