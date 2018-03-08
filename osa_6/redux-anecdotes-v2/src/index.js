import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
//import { createLogger } from 'redux-logger'


const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)