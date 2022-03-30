import Taro from '@tarojs/taro'
import { Component } from 'react'
import {View, OpenData, Image, Text, OfficialAccount} from '@tarojs/components'
import './index.less'

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // resumeImg:require('../../image/resume.png')
    };
  }
  render () {
    let userInfo = Taro.getStorageSync("userInfo");
    return (
      // <WebView src='https://vip.kingdee.com' />
      <View className='mine-content'>
        <View className='mine-intro'>
          <View className='drag'>
            <View className='avatar'><image src={userInfo.avatarUrl}></image></View>
            <view className='basic-flex'>
              <View className='name'><Text>{userInfo.nickName}</Text></View>
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



