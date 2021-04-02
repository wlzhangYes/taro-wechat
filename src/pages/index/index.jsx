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
      activedTab:0,
      fixedNav:false,
      tabTop:0
    };
  }

  componentDidMount () {
    Taro.showLoading({
      title: '加载中',
    })
    this.getSwiperData()
    this.getDayData()
    setTimeout(() => {
      this.getTop()
    },2000)
  }
  getTop(){
    const _this = this;
    const query = Taro.createSelectorQuery();
    query.select('.tabs').boundingClientRect(function(rect){
      _this.setState({tabTop:rect.top})
    }).exec();
  }
  getSwiperData(){
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'swiper',
    })
    .then(res => {
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
      res.result && this.setState({
        dayList: res.result.data,
      })
      Taro.hideLoading()
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
  // 在H5或者其它端中，这个函数会被忽略
  onPageScroll (e) {
    if(e.scrollTop >= this.state.tabTop){
      this.setState({
        fixedNav:true
      })
    }else{
      this.setState({
        fixedNav:false
      })
    }
  }
  render () {
    const {swiperList, tabBar, activedTab, tabsData, fixedNav} = this.state;
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
        <View className={["tabs",fixedNav ? 'fixed-tab' : '']} id='tabs'>
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
        <View className={['contents', fixedNav ? 'sticky-content' : '']}>
          <ContentView data={tabsData} />
        </View>
      </View>
    )
  }
}

export default Index

