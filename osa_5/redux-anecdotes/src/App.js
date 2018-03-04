import React from 'react';

class App extends React.Component {

  voteFor = (id) => (event) => {
    event.preventDefault()

    this.props.store.dispatch({
      type: 'VOTE',
      id: id
    })
  }

  sortByVotes = (a, b) => {
    return b.votes - a.votes
  }

  render() {
    const anecdotes = this.props.store.getState().sort(this.sortByVotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteFor(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addNew}>
          <div><input name="anecdote" /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App