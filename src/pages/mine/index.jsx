import { Component } from 'react'
import {WebView} from '@tarojs/components'

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render () {
    return (
      <WebView src='https://vip.kingdee.com' />
    )
  }
}

export default Mine



