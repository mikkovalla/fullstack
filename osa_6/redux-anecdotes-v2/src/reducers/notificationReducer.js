const notificationReducer = (state = null, action) => {
  if (action.type === 'NOTIFY') {
    return state = action.notify
  }
  return state
}

export const notification = (notify, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      notify
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        notify: null
      })
    }, time * 1000)
  }
}

export default notificationReducer