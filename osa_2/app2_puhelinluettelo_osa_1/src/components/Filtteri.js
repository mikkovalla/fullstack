import React from 'react'
import Button from './Button'

const Filtteri = ({ persons, filtteri, handleClick, text }) => {

  const filterPeople = persons.filter(nimi => nimi.name.substring(0, filtteri.length).toUpperCase() === filtteri.substring(0, filtteri.length).toUpperCase())    

    return (      
      filterPeople.map(person =>
        <p key = {person.id}> {person.name} {person.number} {<Button handleClick = {handleClick} text = {text} id = {person.id}/>}</p>
        )
    )
}

export default Filtteri