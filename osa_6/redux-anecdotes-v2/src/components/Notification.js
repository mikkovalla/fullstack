import React from 'react'
import PropTypes from 'prop-types'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    }
    const notifications = this.context.store.getState().notification

    if(notifications){

      return (
        <div style={style}>
          {notifications}
        </div>
      )
    }
    return (
      <div></div>
    )
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

export default Notification
