import React, { Component } from 'react'
import './Header.less'
import { Button } from 'antd'
import { reqWeather } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'



export default class Header extends Component {
  state = {
    weather: '',
    dayPictureUrl: '',
    time: formateDate(Date.now())
  }
  // 获取天气的数据
  getWeather = async () => {
    const { weather, dayPictureUrl } = await reqWeather('北京')
    this.setState({weather, dayPictureUrl})
  }
  // 创建时间的定时器
  getDate = () => {
    setInterval(() => {
      this.setState({
        time: formateDate(Date.now())
      })
    }, 1000)

  }
  componentDidMount () {
    this.getWeather()
    this.getDate()
  }
  render() {
    const {weather, dayPictureUrl, time} = this.state
    return ( 
      <div className="header">
        <div className="header-top">
          <span>欢迎, admin</span>
          <Button type="link">退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>{time}</span>
            <img src={dayPictureUrl} alt=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
