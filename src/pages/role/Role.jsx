import React, { Component } from 'react'
import { Card, Button, Table, Modal, Message, } from 'antd'
import AddForm from './AddForm'
import { addRole, getRoleList} from '../../api'
import {formateDate} from '../../utils/dateUtils'
import SetRoleAuth from './SetRoleAuth'


export default class Role extends Component {
  state = {
    isShowAdd: false,
    isShowSet: false,
    roleList: [], // tabel的数据
    role:{} // 选中行的数据
  }
  // 初始化 table的列
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (create_time) => {
          return formateDate(create_time)
        }
      },
      {
        title: '授权时间',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '授权人',
        dataIndex: 'address1',
        key: 'address1',
      },
    ];
  }
  // 行操作
  onRow = (role) => {
    return {
      onClick: () => {
        console.log(role, 90)
        // this.setState({
        //   role
        // })
      }
    }
  }
  // 添加角色
  handleAddRole = (e) => {
    e.preventDefault()
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const { roleName } = values
        const result = await addRole(roleName)
        console.log(result)
        Message.success('添加成功!')
        this.setState(state => {
          return {
            isShowAdd: false,
            roleList: [...state.roleList, result.data]
          }
        })
      }
    });
  }
  // 获取角色列表
  getRoleList = async () => {
    const result = await getRoleList()
    console.log(result, 90)
    let roleList = result.data
    this.setState({
      roleList
    })

  }
  componentWillMount () {
    this.initColumns()
  }
  componentDidMount () {
    this.getRoleList()
  }
  render() {
    const { columns } =this
    const {isShowAdd, roleList, isShowSet, role} = this.state
    const title = (
      <>
        <Button type="primary" onClick={() => {this.setState({isShowAdd: true})}}>创建角色</Button>&nbsp;&nbsp;
        <Button type="primary" onClick={() => {this.setState({isShowSet: true})}} disabled={!role._id}>disabled设置角色权限</Button>
      </>
    )
    
    

    return (
      <Card title={title}>
        <Table 
          dataSource={roleList}
          columns={columns}
          rowSelection={{
            type: 'radio',
            // selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({
                role
              })
            }
          }}
          pagination={{defaultPageSize: 5}}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.handleAddRole}
          onCancel={() => {
            this.setState({
              isShowAdd: false
            })
          }}
        >
          <AddForm  
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowSet}
          onOk={this.handleAddRole}
          onCancel={() => {
            this.setState({
              isShowSet: false
            })
          }}
        >
          <SetRoleAuth  
            role={role}
          />
        </Modal>
      </Card>
    )
  }
}
