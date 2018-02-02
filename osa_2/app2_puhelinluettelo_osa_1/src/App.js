import React from 'react'
//import Numerot from './components/Numerot'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {name: 'Arto Hellas', number: '03300456'}
      ],
      newName: '',
      newNumb: ''
    }
  }

  kaikkiNimet (persons) {
    return (
        this.state.persons.map(person =>
        <p key = {person.name}> {person.name} {person.number}</p>
        )
    )
  }

  lisaaHenkilo = (event) => {
    event.preventDefault()
    const uusin = this.state.newName
    const onkoListalla = this.state.persons.map(nimi => nimi.name).includes(uusin)
    //console.log('löytyykö?', onkoListalla)

    if(!onkoListalla) {
        const uusiPersoona = {
          name: this.state.newName,
          number: this.state.newNumb
          //id: Math.random()
        }
       // console.log('uusin lisäys', uusiPersoona)
        const persons = this.state.persons.concat(uusiPersoona)
        //console.log('persoonat', persons)  
        
        this.setState ({
          persons,
          newName: '',
          newNumb: ''
        }) 
    } else {
      alert("Nimi on jo listalla!!!")
    }
  }

  handleNameAdd = (event) => {
    //console.log('event', event.target.value)
    this.setState ({ 
      newName: event.target.value
    })
  }

  handleNumbAdd = (event) => {
    this.setState ({
      newNumb: event.target.value
    })
  }

  render () {
    return (
      <div>

        <h2>Puhelinluettelo</h2>
        
        <form onSubmit={this.lisaaHenkilo}>
          
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameAdd}/>
          </div>
          <div>
            numero: <input value={this.state.newNumb} onChange={this.handleNumbAdd}/>
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