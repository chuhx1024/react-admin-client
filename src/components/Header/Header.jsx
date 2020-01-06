import React, { Component } from 'react'
import './Header.less'
import { Button } from 'antd'
import { reqWeather } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'



class Header extends Component {
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
      // this.setState({
      //   time: formateDate(Date.now())
      // })
    }, 1000)

  }
  // 获取title
  getTitle = () => {
    // 获取当前的请求路径
    const {pathname} = this.props.location
    let title
    console.log(pathname, 909090909)
    if ( pathname === '/') {
      title = '首页'
    } else {
      menuList.forEach(item => {
        if (item.key === pathname) {
          title = item.title
        } else if (item.children) {
          const cItem = item.children.find(item => {
            console.log(item)
            console.log(item.key)
            return (item.key === pathname)
          })
          if (cItem) {

            title = cItem.title
          }
        }
      })
    }
    return title 
  }
  componentDidMount () {
    this.getWeather()
    this.getDate()
    this.getTitle()
  }
  render() {
    const {weather, dayPictureUrl, time} = this.state
    const title = this.getTitle()
    return ( 
      <div className="header">
        <div className="header-top">
          <span>欢迎, admin</span>
          <Button type="link">退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
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
 export default withRouter(Header)