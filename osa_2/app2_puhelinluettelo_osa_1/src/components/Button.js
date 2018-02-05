import React from 'react'

const Button = ({handleClick, text, id}) => {
  return (
    <button onClick = {() => handleClick(id)}>
      {text}
    </button>
  )
}

export default Button

