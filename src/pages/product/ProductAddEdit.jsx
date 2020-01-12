import React, { Component } from 'react'
import { Card, Icon, Form, Input, Select, Button} from 'antd'
const { Option } = Select

class ProductAddEdit extends Component {
  render() {
    const title = (
      <>
        <Button onClick={this.props.history.goBack} type="link"><Icon type="arrow-left" /></Button>
        <span style={{marginLeft: 10}}>添加商品</span>
      </>
    )
    const { getFieldDecorator } = this.props.form
    return (
      <Card title={title}>
        <Form  className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="商品名称">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input type="number" addonAfter="元" />,
            )}
          </Form.Item>
          <Form.Item label="所属分类">
          {getFieldDecorator('parentId', {
            initialValue: '0',
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
            >
              <Option value="0">一级分类</Option>
              <Option value="1">一级分类</Option>
              <Option value="2">一级分类</Option>
              
            </Select>,
          )}
        </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(ProductAddEdit)
 
