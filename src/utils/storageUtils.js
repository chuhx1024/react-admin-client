import store from 'store'

const USER_KEY = 'user_key'

export default {
  // 保存 localStorage 
  saveUser (user) {
    store.set(USER_KEY, user)
  },
  // 读取 localStorage
  getUser: () => store.get(USER_KEY) || {},
  // 移除 localStorage
  removeUser () {
    store.remove(USER_KEY)
  }
}