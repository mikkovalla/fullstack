import React from 'react'
import './App.css'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount () {
    //console.log('did mount')
    axios
    .get('https://restcountries.eu/rest/v2/all?fields=name;flag;capital;population')
    .then(response => {
      //console.log('response', response.data)
      this.setState ({
        countries: response.data
      })
    })
  }

  handleInput = (event) => {
    //console.log('input', event.target.value)
    this.setState({
      filter: event.target.value
    })
  }

  countryInfo (countries) {    
    return (
      countries.map(maa =>
        <div key = {maa.name}>
        <h5>{maa.name}</h5>
          <div>
            <p>capital: {maa.capital}</p>
            <br/>
            <p>population: {maa.population}</p>
            <br/>
            <img src={maa.flag} alt="maan lippu"/>
          </div>
        </div>
      )
    )
   }

   oneCountry (id) {
    //console.log('klikattu', id)
    this.setState({
      filter: id
    })
   }

  handleFiltering (countries) {

    const filterCountries = this.state.countries.filter(maa => maa.name.substring(0, this.state.filter.length).toUpperCase() === this.state.filter.substring(0, this.state.filter.length).toUpperCase())
    //console.log('maita', filterCountries)
    //console.log('pituus', filterCountries.length)
    
    if(filterCountries.length < 10) {
      if(filterCountries.length === 1) {
        return (
          this.countryInfo(filterCountries)
        )
      }
      return (
        filterCountries.map(maa => 
        <p key = {maa.name} onClick={() => this.oneCountry(maa.name)}>{maa.name}</p> 
        )
      )        
    } else {
      return (
        <p>Too many matches, please add another letter</p>
      )
    }      
  }

  render () {
    //console.log('maa', this.state.maa)
    return (
      <div>
        <div>
          Find countries: <input value={this.state.filter} onChange={this.handleInput} />
        </div>
        <h4>Countries</h4>
        <div>
          {this.handleFiltering()}
        </div>
      </div>
    )
  }
}

export default App;
