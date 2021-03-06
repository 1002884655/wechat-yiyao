
export default {
  pages: [
    'pages/Index/index', // 首页
    'pages/Index/Search/index', // 搜索页
    'pages/Index/BookDetail/index', // 详情
    'pages/Index/BookAnswer/index', // 答题

    'pages/Study/index', // 学习天地

    'pages/Mine/index', // 我的
    'pages/Mine/MyCollected/index', // 我的收藏
    'pages/Mine/MyReaded/index', // 我的阅读
    'pages/Mine/MyDoctorVisit/index', // 我的就诊
    'pages/Mine/MyBodyCheck/index', // 我的体检
    'pages/Mine/MyInfo/index', // 基础信息
  ],
  tabBar: {
    color: '#666666',
    selectedColor: '#f4c819',
    list: [
      {
        iconPath: 'assets/img/tabicon1.png',
        selectedIconPath: 'assets/img/tabicon1-.png',
        pagePath: 'pages/Index/index',
        text: '首页推荐'
      },
      {
        iconPath: 'assets/img/tabicon2.png',
        selectedIconPath: 'assets/img/tabicon2-.png',
        pagePath: 'pages/Study/index',
        text: '学习天地'
      },
      {
        iconPath: 'assets/img/tabicon5.png',
        selectedIconPath: 'assets/img/tabicon5-.png',
        pagePath: 'pages/Mine/index',
        text: '我的'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: {
    'towxml': '/towxml/towxml'
  }
}
