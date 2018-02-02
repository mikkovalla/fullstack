import React from 'react'
//import Numerot from './components/Numerot'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {name: 'Arto Hellas'}
      ],
      newName: ''
    }
  }

  kaikkiNimet (persons) {
    return (
        this.state.persons.map(person =>
        <p key = {person.name}> {person.name}</p>
        )
    )
  }

  lisaaNimi = (event) => {
    event.preventDefault()
    const uusiPersoona = {
      name: this.state.newName,
      id: Math.random()
    }
    console.log('uusin lisäys', uusiPersoona)
    const persons = this.state.persons.concat(uusiPersoona)
    console.log('persoonat', persons)

    this.setState ({
      persons,
      newName: ''
    })
  }

  handleNameAdd = (event) => {
    console.log('event', event.target.value)
    this.setState ({ 
      newName: event.target.value
    })
  }

  render () {
    return (
      <div>

        <h2>Puhelinluettelo</h2>
        
        <form onSubmit={this.lisaaNimi}>
          
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameAdd}/>
          </div>
          
          <div>
            <button type="submit">Lisää</button>
          
          </div>
        </form>

        <h2>Numerot</h2>
        <div>
         {this.kaikkiNimet()}
        </div>
      </div>
    )
  }
}

export default App