import anecdoteService from './../services/anecdotes'

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
      return [...store, action.uusi]
    case 'INIT':
      return action.content
    default:
      return store
  }
}

export const giveVote = (anectode) => {
  return async (dispatch) => {
    const uusin = await anecdoteService.update(anectode)
    dispatch({
      type: 'VOTE',
      data: {
        id: uusin.id
      }
    })
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const uusi = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      uusi
    })
  }
}

export const initFromDb = () => {
  return async (dispatch) => {
    const content = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      content
    })
  }
}

export default reducer