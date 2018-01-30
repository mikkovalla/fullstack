import React from 'react'
import Kurssi from './Kurssi'

const Kurssit = ({ kurssit }) => {

  return (
    <div>
      <h1>Opetusohjelma</h1>
        {kurssit.map(k => 
        <div key = {k.id}>
          <Kurssi kurssi = {k} />
        </div>)}

    </div>
  )
}

export default Kurssit