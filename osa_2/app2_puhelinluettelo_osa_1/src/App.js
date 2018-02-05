import React from 'react'
import FilleroidutNimet from './components/FilleroidutNimet'
import personService from './services/persons'
import Notifikaatio from './components/Notifikaatio'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumb: '',
      filter: '',
      notice: null
    }
  }

  componentDidMount () {
    //console.log('did mount')
    personService
    .getAll()
    .then(persons => {
      //console.log('vastaus', response)
      this.setState({persons})
    })   
  }
  
  handleDelete = (id) => {
    console.log('id', id)
    const hlo = this.state.persons.find(p => p.id === id)
    const nimi = hlo.name
    
    if(window.confirm("Haluatko poistaa henkilön " + nimi + " ?")){
      personService
      .poista(id)
      .then(poistettu => {
        const h = this.state.persons.filter(p => p.id !== id)
        console.log('poistettu', h)
        this.setState({
          persons:h,
          notice: nimi + ` on poistettu palvelusta`
        })
      },
      setTimeout(() => {
        this.setState({notice: null})
      }, 3000))
    }
  }

  lisaaHenkilo = (event) => {
    event.preventDefault()
    const uusin = this.state.newName
    const onkoListalla = this.state.persons.map(nimi => nimi.name.substring(0, uusin.length).toUpperCase()).includes(uusin.substring(0,uusin.length).toUpperCase())

    //console.log('löytyykö?', onkoListalla)

    if(!onkoListalla) {
        const uusiPersoona = {
          name: this.state.newName,
          number: this.state.newNumb
        }
        personService
        .create(uusiPersoona)
        .then(uusiPersoona => {
          console.log(uusiPersoona)
          this.setState({
            persons: this.state.persons.concat(uusiPersoona),
            newName: '',
            newNumb: '',
            notice: uusiPersoona.name + ' lisättiin palveluun'
          })
        },
        setTimeout(() => {
          this.setState({notice: null})
        }, 3000))
    } else {
      if(window.confirm(uusin + " on jo luettelossa, korvataanko vanha numero uudella?")){
        const hlo = this.state.persons.find(nimi => nimi.name.substring(0, uusin.length).toUpperCase() === uusin.substring(0,uusin.length).toUpperCase())
        const muutettu = {...hlo, number: this.state.newNumb}

        personService
        .update(hlo.id, muutettu)
        .then(muutettu => {
          console.log(muutettu)
          const persons = this.state.persons.filter(p => p.id !== hlo.id)
          this.setState({
            persons: persons.concat(muutettu),
            notice: hlo.name + ' puhelinnumero päivitetty'
          })
        },
        setTimeout(() => {
          this.setState({notice: null})
        }, 3000))
      }
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
        <Notifikaatio message = {this.state.notice} />       
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
        <div>
        <h4>Numerot</h4>
        <div>
          <FilleroidutNimet nimia = {this.state.persons} filtteri = {this.state.filter} handleClick = {(id) => this.handleDelete(id)} text = {"poista"}/>
        </div>
        </div>    
    </div>
    )
  }
}
export default App
