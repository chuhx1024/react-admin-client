import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from "../../components/LeftNav/LeftNav"
import Header from "../../components/Header/Header"
const { Footer, Sider, Content } = Layout

export default class admin extends Component {
  render() {
    const user = memoryUtils.user
    if (!user._id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header></Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
