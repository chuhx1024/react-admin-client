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
// 获取一级 二级分类列表 0 一级分类 一级分类ID 获取二级分类
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
// 添加分类
export const addCategorys = (parentId,categoryName) => ajax('manage/category/add',{parentId,categoryName},'POST')
// 更新分类
export const upDateCategorys= (categoryId,categoryName) => ajax('manage/category/update',{categoryId,categoryName},'POST')
// 获取商品分类列表
export const getProductList = (pageNum, pageSize) => ajax('manage/product/list',{pageNum, pageSize})
// 添加商品
export const addProduct = (categoryId, pCategoryId, name, desc, price, detail, imgs) => ajax('/manage/product/add',{categoryId, pCategoryId, name, desc, price, detail, imgs},'POST')
// 更新商品
export const updateProduct = (_id, categoryId, pCategoryId, name, desc, price, detail, imgs) => ajax('/manage/product/update',{_id, categoryId, pCategoryId, name, desc, price, detail, imgs},'POST')
// 删除图片
export const deleteImg = (name) => ajax('/manage/img/delete',{name},'POST')
// 添加角色
export const addRole = (roleName) => ajax('/manage/role/add',{roleName},'POST')
// 获取角色列表
export const getRoleList = () => ajax('/manage/role/list')