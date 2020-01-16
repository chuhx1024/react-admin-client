import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEdit extends Component {
  render() {
    return (
      <div>
        <Editor
        />
      </div>
    )
  }
}
