import Taro from '@tarojs/taro'
import { Component } from 'react'
// import { connect } from 'react-redux'
import { View,Swiper,SwiperItem,Text} from '@tarojs/components'
// import { add, minus, asyncAdd } from '../../actions/counter'
// import SpaceLine from '../../component/spacelIne/index'
import ContentView from '../../component/contentView/index'
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
      swiperList:[],
      dayList:[],
      tabsData:[],
      tabBar:['进化中','每日一题'],
      activedTab:0
    };
  }
  componentDidMount () {
    Taro.showLoading({
      title: '加载中',
    })
    this.getSwiperData()
    this.getDayData()
    const tabsDom = document.getElementsByClassName('tabs')[0];
    tabsDom.addEventListener('scroll',function(){
      console.log(tabsDom)
    })
  }
  getSwiperData(){
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'swiper',
    })
    .then(res => {
      Taro.hideLoading()
      res.result && this.setState({
        swiperList: res.result.data,
        tabsData: res.result.data
      })
    })
    .catch(console.error)
  }
  getDayData(){
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'daylist',
    })
    .then(res => {
      Taro.hideLoading()
      res.result && this.setState({
        dayList: res.result.data,
      })
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
  changeTab(index){
    this.setState({
      activedTab: index
    })
    if(index){
      this.setState({tabsData:this.state.dayList})
    }else{
      this.setState({tabsData:this.state.swiperList})
    }
  }
  render () {
    const {swiperList, tabBar, activedTab, tabsData} = this.state;
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
            swiperList.map(item => (
              <SwiperItem key={item._id}>
                  <View style={{backgroundImage:`url(${item.imgSrc})`}} className='swiper-img' onClick={this.goToPage.bind(this, item.pageUrl)} />
              </SwiperItem>
            ))
          }
        </Swiper>
        <View className='tabs'>
          {tabBar.map((item,index) => (
             <Text
               key={index}
               className={index === activedTab ? "active-tab" : ""}
               onClick={this.changeTab.bind(this,index)}
             >
              {item}
            </Text>
          ))}
        </View>
        <View className='contents'>
          <ContentView data={tabsData} />
        </View>
      </View>
    )
  }
}

export default Index

