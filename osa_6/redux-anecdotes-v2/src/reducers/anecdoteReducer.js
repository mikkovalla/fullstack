
const reducer = (store = [], action) => {
  console.log('store', store)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecs = store
      const old = anecs.filter(a => a.id !== id)
      const voted = anecs.find(a => a.id === id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE':
      return [...store, action.content]
    case 'INIT':
      return action.content
    default:
      return store
  }
}

export const giveVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const initFromDb = (content) => {
  return {
    type: 'INIT',
    content
  }
}

export default reducer