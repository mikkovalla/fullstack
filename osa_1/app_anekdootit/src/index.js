import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          selected: 0,
        }

        this.aanet = [
          0, 0, 0, 0, 0, 0
        ]

       this.arvoSeur = this.arvoSeur.bind(this)
       this.aanesta = this.aanesta.bind(this)
    }
    
    arvoSeur = () => {
      this.setState ({
        selected: satLuku()
      })
    }

    aanesta = () => {
      this.aanet[this.state.selected] += 1
      console.log(this.aanet)
    }

    render () {
      return (
        <div>
          <div className="anekki">
           {this.props.anecdotes[this.state.selected]}
           </div> 
          <AnnaAani aanet = {this.aanet[this.state.selected]} />
          <div>
            <Button handleClick = {this.arvoSeur} text = "seuraava" />
            <Button handleClick = {this.aanesta} text = "Äänestä" />
          </div>        
        </div>
      )
    }
}

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const AnnaAani = ({ aanet }) => <div className="votes">has received {aanet} votes</div>

const satLuku = () => {
  return Math.floor((Math.random() * 6) + 0)
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
