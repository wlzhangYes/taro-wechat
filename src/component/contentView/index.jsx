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
  goToPage(pageUrl){
    const {globalData} = Taro.getApp().$app;
    globalData.pageUrl = pageUrl;
    Taro.navigateTo({
      url: `/pages/openPage/index`
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
              onClick={this.goToPage.bind(this, item.pageUrl)}
            ></View>
            <View className='content'>{item.content}</View>
          </View>
        ))}
      </ScrollView>
    )
  }
}

export default ContentView



