import React, { Component } from 'react'

import { message, Button } from 'antd'

export default class App extends Component {
    
    render() {
        const success = () => {
            message.success('This is a success message');
          }
        return (
            <div>
                <Button type="primary" onClick={success}>Success</Button>
            </div>
        )
    }
}
