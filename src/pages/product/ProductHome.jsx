import React, { Component } from 'react'
import { Card, Button, Select, Input, Table, Divider, Tag  } from 'antd'
const { Option } = Select

export default class ProductHome extends Component {
  
  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '商品描述',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '价格',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '状态',
        key: 'tags',
        dataIndex: 'tags',
        render: () => (
          <>
            <div>
              <Button type="primary">下架</Button>
            </div>
            <div>
              <span>已上架</span>
            </div>
          </>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>详情</a>
            <Divider type="vertical" />
            <a>修改</a>
          </span>
        ),
      },
    ];
    
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
    const title = (
      <>
        <Select defaultValue="lucy" style={{ width: 120 }} >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Input placeholder="Basic usage" style={{ width: 150, margin: "0 10px" }} />
        <Button type="primary">搜索</Button>
      </>
    )
    const extra = (
      <Button type="primary" icon="plus">添加商品</Button>
    )
    return (
      <Card title={title} extra={extra} bordered={false} style={{ width: '100%' }}>
        <Table columns={columns} dataSource={data} bordered />
      </Card>
    )
  }
}
