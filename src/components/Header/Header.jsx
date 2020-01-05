import React, { Component } from 'react'
import './Header.less'
import { Button } from 'antd'
import { reqWeather } from '../../api/index'



export default class Header extends Component {
  // 获取天气的数据
  getWeather = async () => {
    const res = await reqWeather('北京')
    console.log(res)
  }
  componentDidMount () {
    this.getWeather()
  }
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, admin</span>
          <Button type="link">退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>2020-05-29</span>
          </div>
        </div>
      </div>
    )
  }
}
