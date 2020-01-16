import React, { Component } from 'react'
import { Upload, Icon, Modal } from 'antd'
import { deleteImg } from '../../api'
import PropTypes from 'prop-types';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default class PicturesWall extends Component {
  static propTypes= {
    imgs: PropTypes.array
  }
  
 
  constructor (props) {
    super(props)
    let fileList = []
    const { imgs } =this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((item, index) => {
        return {
          uid: -index,
          name: item,
          status: 'done',
          url: `http://localhost:5000/upload/${item}`
        }
      })
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList
    }
  }
  getImgsNameList = () => {
    return this.state.fileList.map(item => item.name)
  }
  // 取消预览
  handleCancel = () => {
    this.setState({ previewVisible: false })
  }
  // 预览图片
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }
  // 有文件上传时触发
  handleChange = async ({ file, fileList }) => {
    // 上传成功触发
    if (file.status === 'done') {
      file = fileList[fileList.length -1]
      file.name = file.response.data.name
    }
    // 删除时触发
    if (file.status === 'removed') {
      console.log(file, 995)
      console.log(fileList, 996)
      let res = await deleteImg(file.name)
      console.log(res)
    }
    this.setState({ fileList })
  }
  componentDidMount () {

  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          name="image"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
// PicturesWall.propTypes = {
//   imgs: PropTypes.bool
// }

