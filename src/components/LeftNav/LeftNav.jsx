import React, { Component } from 'react'
import './LeftNav.less'
import logo from '../../assets/imgs/logo.png'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
const { SubMenu } = Menu

export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <header className="left-nav-header">
          <img src={logo} alt=""/>
          <h1>硅谷后台</h1>
        </header>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/home">
            <Link to="/home">
              <Icon type="bank" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="shop" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to="/category">
                <Icon type="bank" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to="/product">
                <Icon type="tool" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

