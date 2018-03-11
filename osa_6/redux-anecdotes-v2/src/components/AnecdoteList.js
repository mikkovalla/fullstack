import React from 'react'
import { giveVote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  aanesta = (anecdote) => () => {
    this.props.giveVote(anecdote.id)
    const notice = `you voted ${anecdote.content}`
    this.props.notification(notice)
    setTimeout(() => {
      this.props.notification(null)
    }, 5000)

  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.filterAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={
                this.aanesta(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filteredAnecdotes = (anecdotes, filter) => {
  const anecs = anecdotes.filter(anec => anec.content.match(new RegExp(filter, 'gi'))).sort((a, b) => b.votes - a.votes)

  return anecs
}

const mapStateToProps = (state) => {
  return {
    filterAnecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  }
}
export default connect (
  mapStateToProps,
  { giveVote, notification }
)(AnecdoteList)
