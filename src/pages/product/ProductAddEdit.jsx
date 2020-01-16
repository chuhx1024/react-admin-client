import React, { Component } from 'react'
import { Card, Icon, Form, Input, Button , Cascader } from 'antd'
import { reqCategorys, addProduct, updateProduct } from '../../api'
import PicturesWall from './PicturesWall'
const { TextArea } = Input


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
  constructor (props) {
    super(props)
    this.pw = React.createRef()
  }
  // 获取品类级联选择器数据 
  getOptions = async (id) => {
    let res = await reqCategorys(id)
    let { data } = res
    if (id === '0') {  // 一级分类
      let options = data.map( item => {
        return ({
          value: item._id,
          label: item.name,
          isLeaf: false,
        })
      })
      let {isUpdata, product} = this
      if (isUpdata && product.pCategoryId !== '0') {
        let data = await this.getOptions(product.pCategoryId)
        let children = data.map(item => {
          return ({
            label: item.name,
            value: item._id,
          })
        })
        const targetOption = options.find( item => item.value === product.pCategoryId )
        targetOption.children = children
      }
      this.setState({
        options
      })
    } else {  // 二级列表
      return data
    }
  }
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    // load options lazily
    let {value} = targetOption
    let data = await this.getOptions(value)
    if (data.length > 0) {
      let children = data.map(item => {
        return ({
          label: item.name,
          value: item._id,
        })
      })
      targetOption.children = children
    } else {
      targetOption.isLeaf = true
    }
    targetOption.loading = false
    this.setState({
      options: [...this.state.options],
    })
  }
  // 提交事件
  commitBill = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {isUpdata, product} = this
        let {categoryIds:[pCategoryId, categoryId], name, desc, price, detail} = values
        // 整理级联的数据 
        if (!categoryId) {
          categoryId = pCategoryId
          pCategoryId = '0'
        }
        // 获取图片数据
        let imgs = this.pw.current.getImgsNameList()
        let result
        if (isUpdata) {
          result = await updateProduct(product._id, categoryId, pCategoryId, name, desc, price, detail, imgs)
        } else {
          result = await addProduct(categoryId, pCategoryId, name, desc, price, detail, imgs)
        }
        console.log(result)
      }
    })
  }
  componentWillMount () {
    // 取出路由带过来的信息
    const product = this.props.location.state
    this.isUpdata = !!product
    this.product = product || {}

  }
  componentDidMount () {
    this.getOptions('0')
  }
  render() {
    const {isUpdata, product} = this
    const categoryIds = []
    if (product.pCategoryId === '0') {
      categoryIds.push(product.categoryId)
    } else {
      categoryIds.push(product.pCategoryId)
      categoryIds.push(product.categoryId)
    }
    const title = (
      <>
        <Button onClick={this.props.history.goBack} type="link"><Icon type="arrow-left" /></Button>
        <span style={{marginLeft: 10}}>{isUpdata ? '修改商品' : '添加商品'}</span>
      </>
    )
    const { getFieldDecorator } = this.props.form
    return (
      <Card title={title}>
        <Form  className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [{ required: true, message: '请输入商品名称' }],
            })(
              <Input
                placeholder="请输入商品名称"
              />,
            )}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [{ required: true, message: '请输入商品描述' }],
            })(
              <TextArea rows={4} />
            )}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [{ required: true, message: '请输入商品价格' }],
            })(
              <Input type="number" addonAfter="元" />,
            )}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryIds', {
              initialValue: categoryIds,
              rules: [{ required: true, message: '请输入商品名称' }],
            })(
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
              />
            )}
          </Form.Item>
          <Form.Item label="商品图片">
            <PicturesWall
              ref={this.pw}
            />
          </Form.Item>
        </Form>
        <Button onClick={this.commitBill} type="primary">提交</Button>
      </Card>
    )
  }
}
export default Form.create()(ProductAddEdit)
 
