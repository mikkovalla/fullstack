import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  )
}

const Sisalto = (props) => {
  return (
      <text>{props.sisalto}</text>
  )
}

const Yhteensa = (props) => {
  return (
      <text>{props.tehtavia}</text>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi = {kurssi}/>
      <p><Sisalto sisalto = {osa1}/> <Yhteensa tehtavia = {tehtavia1}/></p>
      <p><Sisalto sisalto = {osa2}/> <Yhteensa tehtavia = {tehtavia2}/></p>
      <p><Sisalto sisalto = {osa3}/> <Yhteensa tehtavia = {tehtavia3}/></p>
      <p>yhteensä <Yhteensa tehtavia = {tehtavia1 + tehtavia2 + tehtavia3}/>tehtävää</p> 
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))