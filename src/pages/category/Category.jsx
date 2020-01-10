import React, { Component } from 'react'
import { Card, Button, Table, Divider, Modal } from 'antd'
import { reqCategorys, addCategorys } from '../../api'
import AddForm from './addForm'

export default class Category extends Component {
  state = {
    category: [],
    visible: false, // 控制模态框的显示和隐藏
    loading: false
  }
  // 定义分类列表的子项
  initTableheader = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'age',
        width: 300,
        align: 'center',
        render: () => (
          <div>
            <Button type="link">修改分类</Button>
            <Divider type="vertical" />
            <Button type="link">查看子分类</Button>
          </div>
        ),
      },
    ];
  }
  
  // 获取分类数据
  reqCategorys = async () => {
    let parentId = 0
    this.setState({loading: true})
    let res = await reqCategorys(parentId)
    this.setState({loading: false})
    console.log(res)
  } 
  // 添加分类
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 添加分类
  handleOk = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {parentId,categoryName} = values
        addCategorys(parentId,categoryName)
      }
    });
  }

  componentWillMount () {
    this.initTableheader()
  }
  componentDidMount () {
    this.reqCategorys()
  }

  render() {
    // 读取状态数据
    const { category, loading } = this.state
    // card 的左侧
    const title = '一级分类列表'
    // card 的右侧按钮
    const extra = (
      <Button type="primary" icon="plus" onClick={this.showModal}>
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra} >
        <Table 
          dataSource={category} 
          columns={this.columns} 
          loading={loading}
          bordered
        />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddForm 
            setForm={(form) => { this.form = form}}
          >
          </AddForm>
        </Modal>
      </Card>
    )
  }
}
