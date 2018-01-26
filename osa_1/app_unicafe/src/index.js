import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = (props) => {

  return (
    <div>
      <h1>Anna palautetta</h1>
      <button value="hyva">hyva</button> 
      <button value="neutraali">neutraali</button> 
      <button value="huono">huono</button> 
      <h1>Statistiikka</h1>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>6</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>3</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'));
