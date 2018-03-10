const notificationReducer = (state = null, action) => {
  if (action.type === 'NOTIFY') {
    return state = action.notify
  }
  return state
}

export const notification = (notify) => {
  return {
    type: 'NOTIFY',
    notify
  }
}

export default notificationReducer