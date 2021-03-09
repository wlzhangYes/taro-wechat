import Taro from '@tarojs/taro'
import { Component } from 'react'
import {WebView} from '@tarojs/components'

class OpenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    const {pageUrl} = Taro.getApp().$app.globalData;
    return (
      <WebView src={pageUrl} />
    )
  }
}

export default OpenPage



