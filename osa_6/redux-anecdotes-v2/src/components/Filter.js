import React from 'react'
import { filter } from '../reducers/filterReducer'
import PropTypes from 'prop-types'

class Filter extends React.Component {
  handleChange = (event) => {
    let input = event.target.value
    this.context.store.dispatch(filter(input))
  }

  render () {
    const style = {
      marginBottom: 10
    }
    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

Filter.contextTypes = {
  store: PropTypes.object
}

export default Filter