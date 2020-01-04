import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'

export default class admin extends Component {
  render() {
    const user = memoryUtils.user
    if (!user._id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <div>
        Admin
        {user.name}
      </div>
    )
  }
}
