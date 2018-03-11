import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const uusin = await anecdoteService.create(content)
    this.props.newAnecdote(uusin)
    const notice = `you added ${content}`
    this.props.notification(notice)
    setTimeout(() => {
      this.props.notification(null)
    }, 5000)
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

export default connect(
  null,
  { newAnecdote, notification }
)(AnecdoteForm)
