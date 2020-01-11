import React, { Component } from 'react'
import { Form, Input } from 'antd'

class EditForm extends Component {
  componentWillMount () {
    this.props.setForm(this.props.form)
    console.log(this.props)
  }
  render() {
    const {name} = this.props.categoryName
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="新名称">
          {getFieldDecorator('categoryName', {
            initialValue: name,
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}
const WrappedEditForm = Form.create()(EditForm)
export default WrappedEditForm
