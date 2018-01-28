import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Nappula = ({ klikki, teksti }) => (
      <button onClick={klikki}>
          {teksti}
        </button>
)

const Otsikko = (props) => {
  return <h1>{props.otsikko}</h1>
}

const Statistiikka = (props) => {
  if(props.nimi === "keskiarvo"){ 
    const posit = props.tilat.statPos
    const kaikki = props.tilat.statAll
    if(props.tilat.statAll === 0) {
      return (
        <tr>
          <td>{props.nimi}: </td>
          <td>{props.tila}</td>
        </tr>
      )
    }
    const keska = Math.round((posit / kaikki) * 10) / 10   
    return (
      <tr>
        <td>{props.nimi}: </td>
        <td>{keska}</td>
      </tr>
    )
  } else if(props.nimi === "positiivisia"){
        
    if(props.tilat.statAll === 0) {
          return (
            <tr>
              <td>{props.nimi}: </td>
              <td>{props.tila}</td>
            </tr>
          )
        }

    const pos = Math.round(((props.tilat.statPos / props.tilat.statAll) * 100) * 10) / 10    
    return (
      <tr>
        <td>{props.nimi}: </td>
        <td>{pos} %</td>
      </tr>
    )
  }
  return (
        <tr>
          <td>{props.nimi}: </td>
          <td>{props.tila}</td>
        </tr>
  )
}

const Statistiikat = (props) => {
    if(props.state.statAll > 0){
      return (
        <table>
          <tbody>
            <Statistiikka nimi = {props.tiedot.hyva} tila = {props.state.hyva} />
            <Statistiikka nimi = {props.tiedot.huono} tila = {props.state.huono} />
            <Statistiikka nimi = {props.tiedot.neutraali} tila = {props.state.neutraali} />
            <Statistiikka nimi = {props.tiedot.keskiarvo} tila = {props.state.keskiarvo} tilat = {props.state}/>
            <Statistiikka nimi = {props.tiedot.positiivisia} tila = {props.state.positiivisia} tilat = {props.state}/>
          </tbody>
        </table>
      )
    } else {
      return (
        <p>Ei yhtään palautetta annettu</p>
      )
    }
}

class App extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      hyva: 0,
      huono: 0,
      neutraali: 0,
      keskiarvo: 0,
      positiivisia: 0,
      statPos: 0,
      statAll: 0
    } 

    this.otsikko = {
      otsikko1: "anna palautetta",
      otsikko2: "statistiikka"
    }

    this.tiedot = {
      hyva: "hyvä",
      huono: "huono",
      neutraali: "neutraali",
      keskiarvo: "keskiarvo",
      positiivisia: "positiivisia"
    }

    this.hyvaPal = this.hyvaPal.bind(this)
    this.huonoPal = this.huonoPal.bind(this)
    this.neutralPal = this.neutralPal.bind(this)    
  }

  hyvaPal = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      statPos: this.state.statPos + 1,
      statAll: this.state.statAll + 1
    })
  }

  huonoPal = () => {
    this.setState({
      huono: this.state.huono + 1,
      statPos: this.state.statPos - 1,
      statAll: this.state.statAll + 1
    })
  }

  neutralPal = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
      statAll: this.state.statAll + 1
    })
  }

  render (){
    return (
        <div>
          <Otsikko otsikko = {this.otsikko.otsikko1}/>
          <Nappula klikki = {this.hyvaPal} teksti = {this.tiedot.hyva}/>
          <Nappula klikki = {this.huonoPal} teksti = {this.tiedot.huono} />
          <Nappula klikki = {this.neutralPal} teksti = {this.tiedot.neutraali} />
          <Otsikko otsikko = {this.otsikko.otsikko2}/>
          <Statistiikat tiedot = {this.tiedot} state = {this.state}/>
        </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
