import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html' // 把富文本的格式转换为 html标签 用于收集 富文本的数据
import htmlToDraft from 'html-to-draftjs' // 把已有的html标签转换为富文本 用于编辑时的回显数据
import PropTypes from 'prop-types'


export default class RichTextEdit extends Component {
  static propTypes= {
    detail: PropTypes.string
  }
  state = {
    editorState: EditorState.createEmpty(),
  }
  constructor (props) {
    super(props)
    const html = this.props.detail
    let editorState
    if (html) {
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      editorState = EditorState.createWithContent(contentState)
    } else {
      editorState = EditorState.createEmpty() 
    }
    this.state = {
      editorState
    }
  }
  // 获取富文本框内的数据
  getDetail = () => {
    const { editorState } = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }
  // 图片上传的功能
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response)
          // resolve({data: {link: response.data.url}})
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border: '1px solid #000', minHight: 400, padding: '0 10px'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
      
    )
  }
}
