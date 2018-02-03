import React from 'react'

const Filtteri = ({ persons, filtteri }) => {

  const filterPeople = persons.filter(nimi => nimi.name.substring(0, filtteri.length).toUpperCase() === filtteri.substring(0, filtteri.length).toUpperCase())    

    return (
      
      filterPeople.map(person =>
        <p key = {person.name}> {person.name} {person.number}</p>
        )
    )
}

export default Filtteri