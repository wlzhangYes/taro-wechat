import Taro from '@tarojs/taro'
import { Component } from 'react'
import {View, OpenData, Text, OfficialAccount} from '@tarojs/components'
import './index.less'

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null
    };
  }
  componentDidMount(){
    this.setUserInfoStorageTime();
  }
  getUserProfile() {
    let that = this;
    Taro.showModal({
      title: "提示",
      content: "是否允许获取微信昵称和头像？",
      success(data) {
        if (data.confirm) {
          Taro.getUserProfile({
            desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              Taro.setStorageSync("userInfo", res.userInfo);
              that.setState({
                userInfo: res.userInfo
              })
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
    let that = this;
    let nowTime = Date.now();
    let oldTime = Taro.getStorageSync("userInfoStorageTime");
    let userInfo = Taro.getStorageSync("userInfo");
    if (userInfo) {
      if (!(oldTime && nowTime < oldTime)) {
        that.getUserProfile();
      }else{
        that.setState({userInfo})
      }
    } else {
      that.getUserProfile();
    }
  }
  render () {
    const {userInfo} = this.state;
    return (
      // <WebView src='https://vip.kingdee.com' />
      <View className='mine-content'>
        <View className='mine-intro'>
          <View className='drag'>
            <View className='avatar'><image src={userInfo && userInfo.avatarUrl}></image></View>
            <view className='basic-flex'>
              <View className='name'><Text>{userInfo && userInfo.nickName}</Text></View>
              {/* <View className='gender'><Text>{userInfo.gender === 1 ? '男' : userInfo.gender === 2 ? '女' : ''}</Text></View> */}
            </view>
            <View className='city'><OpenData type='userCity' lang='zh_CN'></OpenData></View>
          </View>
        </View>
        {/* <View className='mine-file'>
          <View className='mine-file-view resume'>
            <Image src={resumeImg}></Image>
            <Text>我的简历</Text>
          </View>
          <View className='mine-file-view'>
            <Image src={resumeImg}></Image>
            <Text>我的作品</Text>
          </View>
        </View> */}
        <OfficialAccount></OfficialAccount>
      </View>
    )
  }
}

export default Mine



