import React from 'react'

const Notifikaatio = ({ message }) => {

  if(message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notifikaatio