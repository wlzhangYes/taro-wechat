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
    "selectedColor":'#055AF5',
    "list": [{
      "pagePath": "pages/index/index",
      "text": "้ฆ้กต",
      "iconPath":"image/home.png",
      "selectedIconPath":"image/home-actived.png"
    }, {
      "pagePath": "pages/mine/index",
      "text": "ๆ็",
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
