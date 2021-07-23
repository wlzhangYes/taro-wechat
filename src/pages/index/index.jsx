import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View,Swiper,SwiperItem,Text} from '@tarojs/components'
import ContentView from '../../component/contentView/index'
import './index.less'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperList:[],//轮播图
      dayList:[],
      learnList:[],
      tabsData:[],
      tabBar:['进化中','每日一题','学习成长'],
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
    this.getLearnCenter()
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
  //获取轮播列表
  getSwiperData(){
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'swiper',
    })
    .then(res => {
      Taro.hideLoading();
      res.result && this.setState({
        swiperList: res.result.data,
        tabsData: res.result.data
      })
    })
    .catch(console.error)
  }
  //获取每日一题列表
  getDayData(){
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'daylist',
    })
    .then(res => {
      res.result && this.setState({
        dayList: res.result.data,
      })
    })
    .catch(console.error)
  }
  getLearnCenter(){
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'learnCenter',
    })
    .then(res => {
      res.result && this.setState({
        learnList: res.result.data,
      })
    })
    .catch(console.error)
  }
  //打开公众号文章
  goToPage(item){
    if(item.pageUrl){
      this.goToWechat(item.pageUrl)
    }else{
      this.openFile(item.fileUrl)
    }
  }
  openFile(fileUrl){
    Taro.downloadFile({
      url: fileUrl,
      success (res) {
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
  goToWechat(pageUrl){
    const {globalData} = Taro.getApp().$app;
    globalData.pageUrl = pageUrl;
    Taro.navigateTo({
      url: `/pages/openPage/index`
    })
  }
  changeTab(index){
    debugger
    this.setState({
      activedTab: index
    })
    if(index === 2){
      this.setState({tabsData:this.state.learnList})
    }else if(index === 1){
      this.setState({tabsData:this.state.dayList})
    }else{
      this.setState({tabsData:this.state.swiperList})
    }
  }
  // 在H5或者其它端中，这个函数会被忽略
  onPageScroll (e) {
    this.setState({
      fixedNav:e.scrollTop >= this.state.tabTop
    })
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
                  <View style={{backgroundImage:`url(${item.imgSrc})`}} className='swiper-img' onClick={this.goToPage.bind(this, item)} />
              </SwiperItem>
            ))
          }
        </Swiper>
        <View className={["tabs",fixedNav && 'fixed-tab']} id='tabs'>
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

