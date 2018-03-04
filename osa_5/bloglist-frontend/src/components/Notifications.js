import React from 'react'

const Notifications = ({ message, success = true }) => (
//success = true
  <div style={{ border: success ? "2px solid green" : "2px solid red" , color: success ? "green" : "red"}}>
    {message}
  </div>
)

export default Notifications