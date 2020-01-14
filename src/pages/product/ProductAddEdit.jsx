import React, { Component } from 'react'
import { Card, Icon, Form, Input, Button , Cascader } from 'antd'
// const { Option } = Select
import { reqCategorys } from '../../api'

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];

class ProductAddEdit extends Component {
  state = {
    options,
  }
  // 获取品类级联选择器数据 
  getOptions = async (id) => {
    let res = await reqCategorys(id)
    console.log(res, 12388)
    let { data } = res
    let options = data.map( item => {
      return ({
        value: item._id,
        label: item.name,
        isLeaf: false,
      })
    })
    this.setState({
      options
    })
  }
  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  }
  componentDidMount () {
    this.getOptions('0')
  }
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
          <Cascader
            options={this.state.options}
            loadData={this.loadData}
          />
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(ProductAddEdit)
 
