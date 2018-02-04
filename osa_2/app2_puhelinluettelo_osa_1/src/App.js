import React from 'react'
import FilleroidutNimet from './components/FilleroidutNimet'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumb: '',
      filter: ''
    }
  }

  componentDidMount () {
    console.log('did mount')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('vastaus', response)
      this.setState({
        persons: response.data
      })
    })
    
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

  handleFiltering = (event) => {
    this.setState ({
      filter: event.target.value
    })
  }

  render () {

    return (
      <div>
        <h2>Puhelinluettelo</h2>        
        <div>
          rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFiltering}/>
        </div>
        <h4>Lisää uusi</h4>
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
        <FilleroidutNimet nimia = {this.state.persons} filtteri = {this.state.filter} />
      </div>
    )
  }
}

export default App