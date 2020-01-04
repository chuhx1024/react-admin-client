import React from 'react'
import ReactDOM from 'react-dom'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import App from './App'
const user = storageUtils.getUser()
if (user && user._id) {
  memoryUtils.user = user
}
if (storageUtils)
ReactDOM.render(<App/>, document.getElementById('root'))