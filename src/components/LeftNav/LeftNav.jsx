import React, { Component } from 'react'
import './LeftNav.less'
import logo from '../../assets/imgs/logo.png'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import menuList from "../../config/menuConfig"
const { SubMenu } = Menu

export default class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )

      }
    })

  }
  render() {
    return (
      <div className="left-nav">
        <header className="left-nav-header">
          <img src={logo} alt=""/>
          <h1>硅谷后台</h1>
        </header>
        <Menu
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['product']}
          mode="inline"
          theme="dark"
        >
          {/* <Menu.Item key="/home">
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
          </SubMenu> */}
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    )
  }
}

