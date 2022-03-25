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
  componentDidMount(){
    this.setUserInfoStorageTime();
  }
  getUserProfile() {
    Taro.showModal({
      title: "提示",
      content: "是否允许获取微信昵称和头像？",
      success(data) {
        if (data.confirm) {
          Taro.getUserProfile({
            desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              debugger
              const {globalData} = Taro.getApp().$app;
              globalData.userInfo = res.userInfo; //这个我有时候获取不到，所以没管它，但先写着
              Taro.setStorageSync("userInfo", res.userInfo);
              let setNowTime = Date.now() + 3600 * 1000 * 24 * 30;  // 我设置了30天有效期，你们可以自己改
              Taro.setStorageSync("userInfoStorageTime", setNowTime);
            },
            fail: function (err) {
              console.log(err);
            },
          });
        }
      },
    });
  }
  setUserInfoStorageTime() {
    var that = this;
    let nowTime = Date.now();
    let oldTime = Taro.getStorageSync("userInfoStorageTime");
    let userInfo = Taro.getStorageSync("userInfo");
    if ( userInfo.nickName != undefined && userInfo.nickName != null && userInfo.nickName != "" ) {
      if (!(oldTime && nowTime < oldTime)) {
        that.getUserProfile();
      }
    } else {
      that.getUserProfile();
    }
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
