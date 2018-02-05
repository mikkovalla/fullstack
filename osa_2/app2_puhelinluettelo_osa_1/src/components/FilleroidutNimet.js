import React from 'react'
import Filtteri from './Filtteri'
import Nimet from './Nimet'


const FilleroidutNimet = ({ nimia, filtteri, handleClick, text}) => {
    
    const rajattu =
    filtteri !== '' ?
    <Filtteri persons = {nimia} filtteri = {filtteri} handleClick = {handleClick} text = {text}/> :
    <Nimet persons = {nimia} handleClick = {handleClick} text = {text}/>
  
    //console.log('nimia', nimia)      
    //console.log('filsu', filtteri)

    return (
      <div>
        {rajattu}
      </div>         
    )
}
export default FilleroidutNimet