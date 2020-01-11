import React, { Component } from 'react'
import { Card, Button, Table, Divider, Modal } from 'antd'
import { reqCategorys, addCategorys, upDateCategorys } from '../../api'
import AddForm from './addForm'
import EditForm from './editForm'

export default class Category extends Component {
  state = {
    category: [],
    showStatus: 0, // 控制模态框的显示和隐藏 0 都不显示 1 显示添加 2 显示 修改
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
        render: (item) => (
          <div>
            <Button type="link" onClick= {()=>{this.showUpDataModal(item)}}>修改分类</Button>
            <Divider type="vertical" />
            <Button type="link" onClick = {()=>{this.showTwoList(item._id)}}>查看子分类</Button>
          </div>
        ),
      },
    ];
  }
  
  // 获取分类数据
  reqCategorys = async (parentId) => {
    this.setState({loading: true})
    let res = await reqCategorys(parentId)
    this.setState({
      loading: false,
      category: res.data
    })
    console.log(res)
  } 
  // 关闭模态框模态框
  hideModal = () => {
    this.setState({
      showStatus: 0,
    });
  }
  // 显示添加分类的模态框
  showAddModal = () => {
    this.setState({
      showStatus: 1,
    });
  }
  // 显示修改分类的模态框
  showUpDataModal = (item) => {
    console.log(item)
    this.categoryItem = item
    this.setState({
      showStatus: 2,
    });
  }
  // 添加分类
  handleAdd = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const {parentId,categoryName} = values
        let res = await addCategorys(parentId,categoryName)
        let {parentId: sp} = res.data
        console.log(res, 123)
        this.reqCategorys(sp)
        this.hideModal()

      }
    });
  }
  // 修改分类
  handleUpData = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let res = await upDateCategorys(this.categoryItem._id,values.categoryName)
        console.log(res)
        this.reqCategorys(0)
        this.hideModal()
      }
    });
  }
  // 查看子分类
  showTwoList = (id) => {
    this.reqCategorys(id)
  }

  componentWillMount () {
    this.initTableheader()
  }
  componentDidMount () {
    this.reqCategorys(0)
  }

  render() {
    // 读取状态数据
    const { category, loading, showStatus } = this.state
    // card 的左侧
    const title = '一级分类列表'
    // card 的右侧按钮
    const extra = (
      <Button type="primary" icon="plus" onClick={this.showAddModal}>
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra} >
        <Table 
          dataSource={category} 
          columns={this.columns} 
          loading={loading}
          rowKey={record=> record._id}
          bordered
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.handleAdd}
          onCancel={this.hideModal}
        >
          <AddForm 
            setForm={(form) => { this.form = form}}
            category={category}
          >
          </AddForm>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.handleUpData}
          onCancel={this.hideModal}
        >
          <EditForm 
            categoryItem= {this.categoryItem}
            setForm={form=> this.form = form}
          >
          </EditForm>
        </Modal>
      </Card>
    )
  }
}
