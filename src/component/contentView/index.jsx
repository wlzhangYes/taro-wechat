import Taro from '@tarojs/taro'
import { ScrollView,Text, View, OpenData, Image } from '@tarojs/components';
import { Component } from 'react'
import './index.less'

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      title: '下载中,请稍等...',
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
      <ScrollView
        className='content-list'
        scrollY
        scrollWithAnimation
        lowerThreshold={20}
        upperThreshold={20}
      >
        {data.map((item,index) => (
          <View key={index} className='main'>
            <View className='des'>
              <OpenData type='userAvatarUrl'className='avatar'></OpenData>
              <Text>{item.date}</Text>
            </View>
            <View className='title'>{item.title}</View>
            <View
              style={{backgroundImage: `url(${item.imgSrc})`}}
              className='image'
              onClick={this.goToPage.bind(this, item)}
            ></View>
            <View className='content'>{item.content}</View>
          </View>
        ))}
      </ScrollView>
    )
  }
}

export default ContentView



