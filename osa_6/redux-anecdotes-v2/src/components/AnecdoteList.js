import React from 'react'
import { giveVote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import Filter from './Filter'
import PropTypes from 'prop-types'

class AnecdoteList extends React.Component {

  aanesta = (anecdote) => () => {
    this.context.store.dispatch(giveVote(anecdote.id))
    const notice = `you voted ${anecdote.content}`
    this.context.store.dispatch(notification(notice))
    setTimeout(() => {
      this.context.store.dispatch(notification(null))
    }, 5000)

  }
  render() {
    const { anecdotes, filter } = this.context.store.getState()
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.match(
      new RegExp(filter, 'gi')
    ))
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={filter}/>
        {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
AnecdoteList.contextTypes = {
  store: PropTypes.object
}
export default AnecdoteList
