import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const state = store.getState()
  const good = state.good
  const ok = state.ok
  const bad = state.bad
  const palautteet = good + ok + bad
  const keskiarvo = Math.round(((good - bad) / palautteet) * 10) / 10
  const positiiviset = Math.round(((good / palautteet) * 100) * 10) / 10

  if (palautteet === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta vielä</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiiviset} %</td>
          </tr>
        </tbody>
      </table>
    </div >
  )
}

class App extends React.Component {
  click = (action) => (event) => {
    event.preventDefault()

    store.dispatch({ type: action })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.click('GOOD')}>hyvä</button>
        <button onClick={this.click('OK')}>neutraali</button>
        <button onClick={this.click('BAD')}>huono</button>
        <Statistiikka />
        <button onClick={this.click('ZERO')}>nollaa tilasto</button>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)