import React, { Component } from 'react'
import { Card, Button, Select, Input, Table, Divider } from 'antd'
import { getProductList } from '../../api'
import {Link} from 'react-router-dom'
const { Option } = Select 

export default class ProductHome extends Component {
  // 获取商品列表
  getProductList = async () => {
   let res = await getProductList(1, 10)
   console.log(res)
  }
  // 触发添加商品
  handleAddProduct = () => {

  }
  componentDidMount () {
    this.getProductList()
  }
  
  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
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
            <Button type="link">详情</Button>
            <Divider type="vertical" />
            <Button type="link">修改</Button>
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
        <Select defaultValue="0" style={{ width: 150 }} >
          <Option value="0">按名称搜索</Option>
          <Option value="1">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 250, margin: "0 10px" }} />
        <Button type="primary">搜索</Button>
      </>
    )
    const extra = (
      <Link to="/product/add-edit">
       <Button type="primary" icon="plus">添加商品</Button>
      </Link>
    )
    return (
      <Card title={title} extra={extra} bordered={false} style={{ width: '100%' }}>
        <Table columns={columns} dataSource={data} bordered />
      </Card>
    )
  }
}
