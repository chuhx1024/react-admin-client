import React, { Component } from 'react'
import { Card, Button, Table } from 'antd'


export default class Role extends Component {
  render() {
    const title = (
      <>
        <Button type="primary">创建角色</Button>&nbsp;&nbsp;
        <Button type="primary" disabled>设置角色权限</Button>
      </>
    )
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
    ];
    
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '授权时间',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '授权人',
        dataIndex: 'address1',
        key: 'address',
      },
    ];

    return (
      <Card title={title}>
        <Table 
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: 'radio',
          }}
        />
      </Card>
    )
  }
}
