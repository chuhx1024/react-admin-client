import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
const { Option } = Select;

class AddForm extends Component {
  componentWillMount () {
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const {category} = this.props
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="所属分类">
          {getFieldDecorator('parentId', {
            initialValue: '0',
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
            >
              <Option value="0">一级分类</Option>
              {
                category.map(item => {
                  return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })
              }
              
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="分类名称">
          {getFieldDecorator('categoryName', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
       
      </Form>
    )
  }
}
const WrappedAddForm = Form.create()(AddForm)
export default WrappedAddForm

