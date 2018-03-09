import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const notifications = this.props.store.getState().notification
    console.log('list component', notifications)
    console.log('tyyppi', typeof(notifications))
    return (
      <div style={style}>
        {notifications}
      </div>
    )
  }
}

export default Notification
