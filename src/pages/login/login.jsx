import React, { Component } from 'react'
import './login.less'
import logo from "./imgs/logo.png"
import { Form, Icon, Input, Button } from 'antd'

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
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
                rules: [{ required: true, message: '请输入密码!' }],
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
                Log in
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
