import React from 'react'
import Filtteri from './Filtteri'
import Nimet from './Nimet'


const FilleroidutNimet = ({ nimia, filtteri }) => {
    
    const rajattu =
    filtteri !== '' ?
    <Filtteri persons = {nimia} filtteri = {filtteri} /> :
    <Nimet persons = {nimia} />
  
    console.log('nimia', nimia)      
    console.log('filsu', filtteri)

    return (
      <div>
        <h4>Numerot</h4>
        <div>
         {rajattu}
        </div>
      </div>
    )
}
export default FilleroidutNimet