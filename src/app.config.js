export default {
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/openPage/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#eeeeee'
  },
  tabBar: {
    "selectedColor":'#2d8cf0',
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath":"image/home.png",
      "selectedIconPath":"image/home-actived.png"
    }, {
      "pagePath": "pages/mine/index",
      "text": "我的",
      "iconPath":"image/mine.png",
      "selectedIconPath":"image/mine-actived.png"
    }]
  },
  networkTimeout: {
    "request": 10000,
    "downloadFile": 10000
  },
  debug: true,
}
