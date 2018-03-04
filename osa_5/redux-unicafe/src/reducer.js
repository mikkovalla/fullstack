const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
      case 'GOOD':
          state = {
              good: state.good + 1,
              ok: state.ok,
              bad: state.bad
          }
          break
      case 'OK':
          state = {
              good: state.good,
              ok: state.ok + 1,
              bad: state.bad
          }
          break
      case 'BAD':
          state = {
              good: state.good,
              ok: state.ok,
              bad: state.bad + 1
          }
          break
      case 'ZERO':
          state = {
              good: 0,
              ok: 0,
              bad: 0
          }
          break
      default:

  }
  return state
}

export default counterReducer