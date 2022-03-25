import Taro from '@tarojs/taro'
import { ScrollView,Text, View, OpenData, Image } from '@tarojs/components';
import { Component } from 'react'
import './index.less'

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:{}
    };
  }
  // componentDidMount(){
  //   this.setUserInfoStorageTime();
  // }
  getUserProfile() {
    console.log('90909')
    var that = this;
    Taro.showModal({
      title: "提示",
      content: "是否允许获取微信昵称和头像？",
      success(suc) {
        if (suc.confirm) {
          Taro.getUserProfile({
            desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              const {globalData} = Taro.getApp().$app;
              globalData.userInfo = res.userInfo; //这个我有时候获取不到，所以没管它，但先写着
              that.setData({
                userInfo: res.userInfo
              });
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
      if (oldTime && nowTime < oldTime) {
        that.setData({
          userInfo:userInfo
        })
        return;
      } else {
        that.getUserProfile();
      }
    } else {
      that.getUserProfile();
    }
  }
  //打开公众号文章
  goToWechat(pageUrl){
    const {globalData} = Taro.getApp().$app;
    globalData.pageUrl = pageUrl;
    Taro.navigateTo({
      url: `/pages/openPage/index`
    })
  }
  goToPage(item){
    if(item.pageUrl){
      this.goToWechat(item.pageUrl)
    }else{
      this.openFile(item.fileUrl)
    }
  }
  openFile(fileUrl){
    Taro.showLoading({
      title: '加载中',
    })
    Taro.downloadFile({
      url: fileUrl,
      success (res) {
        Taro.hideLoading();
        if (res.statusCode === 200) {
          const filePath = res.tempFilePath;
          Taro.openDocument({
            filePath: filePath,
            success: function () {
              console.log('打开文档成功')
            }
          })
        }
      }
    })
  }
  render () {
    const {data} = this.props;
    return (
      <View
        className='content-list'
      >
        {data.map((item,index) => (
          <View key={index} className='main'>
            <View className='title'>
              <Text>{item.title}</Text>
              {/* <Text className='date'>{item.date}</Text> */}
              </View>
            <View
              style={{backgroundImage: `url(${item.imgSrc})`}}
              className='image'
              onClick={this.goToPage.bind(this, item)}
            ></View>
            <View className='content'>{item.content}</View>
          </View>
        ))}
      </View>
    )
  }
}

export default ContentView



