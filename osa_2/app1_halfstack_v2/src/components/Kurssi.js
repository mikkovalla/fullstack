import React from 'react'

const Kurssi = ({ kurssi }) => {

  const yht = kurssi.osat.reduce((edel, e) => edel + e.tehtavia, 0)
  console.log("tehtavia yhteensä", yht)
  return (
    <div>
      <h3>{kurssi.nimi}</h3>
      <div>
          {kurssi.osat.map(o => 
            <p key = {o.id}>
              {o.nimi} {o.tehtavia}
            </p>
          )}
      </div>
      <div>Tehtäviä yhteensä: {yht}</div>
    </div>
  )
}

export default Kurssi