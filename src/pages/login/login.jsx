import React, { Component } from 'react'
import './login.less'
import logo from "./imgs/logo.png"
import { Form, Icon, Input, Button, message } from 'antd'
import { reqLogin } from '../../api'
import  memoryUtils  from '../../utils/memoryUtils'
import  storageUtils  from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'


class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let { username, password } = values
        const res = await reqLogin( username, password )
        if (res.status === 0) { // 登录成功
          message.success('登录成功!!!')
          memoryUtils.user = res.data
          storageUtils.saveUser(res.data)
          console.log(memoryUtils.user)
          // 跳转到管理界面  这里使用 replace  而不适用 push  因为 我不用返回了
          this.props.history.replace('/admin')
        } else { // 登录失败
          message.error(res.msg)
        }
      } else {
        console.log('校验失败')
      }
    })
  }
  // 对密码进行验证
  validatorPwd = (rule, value, callback) => {
    if (!value) {
      callback('密码必须输入')
    } else if (value.length > 12) {
      callback('密码不能超过12')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    
    if (memoryUtils.user && memoryUtils.user._id) {
      return <Redirect to="/admin"></Redirect>
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt=""/>
          <h1> React: 后台管理项目</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入用户名!' },
                  { max: 12, message: '不能超过12!' },
                  { min: 4, message: '不能小于4!' },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ validator:  this.validatorPwd}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
const WrappedLogin = Form.create()(Login)
export default WrappedLogin
