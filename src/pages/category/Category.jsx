import React, { Component } from 'react'
import { Card, Button, Table, Divider } from 'antd'
import { reqCategorys } from '../../api'

export default class Category extends Component {
  state = {
    category: []
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
    let res = await reqCategorys({parentId})
    console.log(res)
  } 

  componentWillMount () {
    this.initTableheader()
  }
  componentDidMount () {
    this.reqCategorys()
  }

  render() {
    // 读取状态数据
    const { category } = this.state
    // card 的左侧
    const title = '一级分类列表'
    // card 的右侧按钮
    const extra = (
      <Button type="primary" icon="plus">
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra} >
        <Table 
          dataSource={category} 
          columns={this.columns} 
          bordered
        />
      </Card>
    )
  }
}
