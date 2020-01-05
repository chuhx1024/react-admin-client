import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'
// 登陆的接口
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
// 获取天气信息
export const reqWeather = (cityName) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${cityName}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      const { weather, dayPictureUrl } =  data.results[0].weather_data[0]
      if (!err) {
        resolve({weather, dayPictureUrl})
      } else {
        message.error('获取天气数据失败')
      }
    })
  })
}