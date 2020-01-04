import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from "../../components/LeftNav/LeftNav"
import Header from "../../components/Header/Header"
const { Footer, Sider, Content } = Layout
const footerStyle = {
  textAlign: 'center'
}

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
          <Content style={{backgroundColor: '#FFF'}}>Content</Content>
          <Footer style={footerStyle}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
