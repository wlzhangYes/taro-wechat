import Taro from '@tarojs/taro'
import { Component } from 'react'
import { connect } from 'react-redux'
import { View,Swiper,SwiperItem,Text,ScrollView} from '@tarojs/components'
import { add, minus, asyncAdd } from '../../actions/counter'
import SpaceLine from '../../component/spacelIne/index'
import Tab from '../../component/Tab/index'
import './index.less'


// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperData:[],
      tabBar:[
        '金蝶云社区','金蝶云社区','金蝶云社区','金蝶云社区','金蝶云社区','金蝶云社区','金蝶云社区',
      ]
    };
  }
  componentDidMount () {
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'swiper',
    })
    .then(res => {
      res.result && this.setState({swiperData: res.result.data})
    })
    .catch(console.error)
  }
  goToPage(pageUrl){
    const {globalData} = Taro.getApp().$app;
    globalData.pageUrl = pageUrl;
    Taro.navigateTo({
      url: `/pages/openPage/index`
    })
  }
  render () {
    const {swiperData, tabBar} = this.state;
    return (
      <View className='home'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {
            swiperData.map(item => (
              <SwiperItem key={item._id}>
                  <View style={{backgroundImage:`url(${item.imgSrc})`}} className='swiper-img' onClick={this.goToPage.bind(this, item.pageUrl)} />
              </SwiperItem>
            ))
          }
        </Swiper>
        {/* <Tab tabBar={tabBar} /> */}
        {/* <SpaceLine /> */}
      </View>
    )
  }
}

export default Index

