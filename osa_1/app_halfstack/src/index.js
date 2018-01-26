import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  )
}

const Sisalto = (props) => {
  return (
    <div>
        <Osa osa = {props.osa1} tehtavia = {props.tehtavia1}/>
        <Osa osa = {props.osa2} tehtavia = {props.tehtavia2}/>
        <Osa osa = {props.osa3} tehtavia = {props.tehtavia3}/>
    </div>
      
  )

  function Osa (props) {
    return (
      <p>{props.osa} {props.tehtavia}</p>
    )
  }
}

const Yhteensa = (props) => {
  return (
    <p>yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} tehtävää</p> 
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin alkeet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi = {kurssi}/>
      <Sisalto osa1 = {osa1.nimi} tehtavia1 = {osa1.tehtavia} osa2 = {osa2.nimi} tehtavia2 = {osa2.tehtavia} osa3 = {osa3.nimi} tehtavia3 = {osa3.tehtavia}/>
      <Yhteensa tehtavia1 = {osa1.tehtavia} tehtavia2 = {osa2.tehtavia} tehtavia3 = {osa3.tehtavia}/>
      
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))