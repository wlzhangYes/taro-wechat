import Taro from '@tarojs/taro'
import { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store'
import './app.less'

const store = configStore()

class App extends Component {
  constructor(props) {
    super(props);
    this.globalData = {
      pageUrl:''
    };
  }

  onLaunch () {
    if (!Taro.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      Taro.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'lin-h098p',
        traceUser: true,
      })
    }
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
