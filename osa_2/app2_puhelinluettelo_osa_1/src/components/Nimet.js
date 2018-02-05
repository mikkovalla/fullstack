import React from 'react'
import Button from './Button'

const Nimet = ({ persons, handleClick, text }) => {

    return (
      <div>
        {persons.map(person =>
        <p key = {person.id}> {person.name} {person.number} {<Button handleClick = {handleClick} text = {text} id = {person.id}/>}</p>
        )}
        </div>
    )
}

export default Nimet