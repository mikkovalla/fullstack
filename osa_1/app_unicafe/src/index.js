import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor () {
    super ()
    this.state = {
      hyva: 0,
      huono: 0,
      neutraali: 0,
      keskiarvo: 0,
      positiivisia: 0,
      statPos: 0,
      statKes: 0,
      statAll: 0
    } 
  }

  render (){
    return (
    <div>
      <h1>Anna palautetta</h1>
      <button onClick={() => this.setState({hyva: this.state.hyva + 1, statPos: this.state.statPos + 1, statAll: this.state.statAll + 1})}>hyva</button> 
      <button onClick={() => this.setState({huono: this.state.huono + 1, statPos: this.state.statPos - 1, statAll: this.state.statAll + 1})}>neutraali</button> 
      <button onClick={() => this.setState({neutraali: this.state.neutraali + 1, statAll: this.state.statAll + 1})}>huono</button> 
      <h1>Statistiikka</h1>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{this.state.hyva}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{this.state.huono}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{this.state.neutraali}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{Math.round((this.state.statPos / this.state.statAll) * 10) / 10}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{Math.round(((this.state.statPos / this.state.statAll) * 100) * 10) / 10} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
