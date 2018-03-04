import React from 'react'

class Togglable extends React.Component {
  state = {
    nayta: false
  }

  toggleShow = () => {
    this.setState(vanhaTila => ({
      nayta: !vanhaTila.nayta
    }))
  }

  render () {
    return (
      <div>
        {this.state.nayta && this.props.children}
        <button type='button' onClick={this.toggleShow}>
          {this.state.nayta ? this.props.piilota : this.props.nayta}
        </button>
      </div>
    )
  }
}
export default Togglable