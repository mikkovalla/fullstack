const notification = 'NONE'

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return `You added ${action.data.content} to anecdotes list!`
    case 'VOTED':
      return `You voted '${action.data.content}'`
    case 'DELETED':
      return `You deleted '${action.data.content}'`
    default:
      return state
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content
    }
  }
}

export const votedAnecdote = (id) => {
  return {
    type: 'VOTED',
    data: {
      id
    }
  }
}

export const deletedAnecdote = (id) => {
  return {
    type: 'DELETED',
    data: {
      id
    }
  }
}

export default notificationReducer