import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from "../../components/LeftNav/LeftNav"
import Header from "../../components/Header/Header"
import Home from "../home/Home"
import Category from "../category/Category"
import Product01 from "../product01/Product01"
import Product02 from "../product02/Product02"
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
          <Content style={{margin: '20px',backgroundColor: '#FFF'}}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product01" component={Product01}></Route>
              <Route path="/product02" component={Product02}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer style={footerStyle}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
