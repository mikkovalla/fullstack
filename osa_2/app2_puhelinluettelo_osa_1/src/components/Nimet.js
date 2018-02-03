import React from 'react'

const Nimet = ({ persons }) => {

  return (
    <div>
      {persons.map(person =>
      <p key = {person.name}> {person.name} {person.number}</p>
      )}
      </div>
  )
}

export default Nimet