import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.context.store.dispatch(newAnecdote(content))
    const notice = `you added ${content}`
    this.context.store.dispatch(notification(notice))
    setTimeout(() => {
      this.context.store.dispatch(notification(null))
    }, 5000)

    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}
export default AnecdoteForm
