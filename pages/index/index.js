const util = require('../../utils/util.js')

const news_tabs = [
  {
    position: 0,
    title: "国内",
    type: "gn"
  },
  {
    position: 1,
    title: "国际",
    type: "gj"
  },
  {
    position: 2,
    title: "财经",
    type: "cj"
  },
  {
    position: 3,
    title: "娱乐",
    type: "yl"
  },
  {
    position: 4,
    title: "军事",
    type: "js"
  },
  {
    position: 5,
    title: "体育",
    type: "ty"
  },
  {
    postion: 6,
    title: "其他",
    type: "other"
  }
]

const defaultBanner = {
  firstImage: '/images/default_banner.jpeg',
  title: '新冠堪比二战，世界格局重塑，小国任人摆布',
  source: '东方资讯',
  date: '20:08'
}

Page({
  data: {
    defaultBanner: defaultBanner,
    news_tabs: news_tabs,
    cur_tab: 0,
    news_banner: defaultBanner,
    news_items : []
  },
  
  onLoad: function () {
    this.getNewsList()
  },

  onPullDownRefresh(){
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },

  getNewsList(callBack){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: news_tabs[this.data.cur_tab].type
      },
      success: res => {
        console.log("getNewsList", res)
        let result = res.data.result
        for (let i = 0; i < result.length; i++){
          result[i].date = util.formatTime(result[i].date)
        }
      
        this.setData({
          news_banner: result[0],
          news_items: result.slice(1)    
        })
      },
      complete: () => {
          callBack && callBack()
      }
    })
  },

  onTitleClick: function (event){
    console.log("onTitleClick", event)
    let id = event.currentTarget.id
    this.setData({
      cur_tab : id
    })
    this.getNewsList()
  }
})
