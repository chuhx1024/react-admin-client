import React, { Component } from 'react'
import { Card, Button, Table, Divider } from 'antd'

export default class Category extends Component {
  render() {
    // card 的左侧
    const title = '一级分类列表'
    // card 的右侧按钮
    const extra = (
      <Button type="primary" icon="plus">
        添加
      </Button>
    )
    const dataSource = [
      {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed647f352726338607047",
        "name": "分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed64cf352726338607048",
        "name": "1分类3",
        "__v": 0
      }
    ];
    
    const columns = [
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
    return (
      <Card title={title} extra={extra} >
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
        />
      </Card>
    )
  }
}
