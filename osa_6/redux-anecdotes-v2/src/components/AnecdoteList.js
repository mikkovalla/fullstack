import React from 'react'
import { giveVote, initFromDb } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  aanesta = (anecdote) => async () => {
    const updateAnec = await anecdoteService.update(anecdote)
    this.props.giveVote(updateAnec.id)
    const notice = `you voted ${updateAnec.content}`
    this.props.notification(notice)
    setTimeout(() => {
      this.props.notification(null)
    }, 5000)
  }

  componentDidMount = async () => {
    const anecdotes = await anecdoteService.getAll()
    this.props.initFromDb(anecdotes)
    console.log('anecit', anecdotes)
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
  console.log('toot',anecdotes)
  return anecdotes.filter(anec => anec.content.match(new RegExp(filter, 'gi'))).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    filterAnecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  }
}
export default connect (
  mapStateToProps,
  { giveVote, notification, initFromDb }
)(AnecdoteList)
