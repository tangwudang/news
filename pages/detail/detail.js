// pages/detail/detail.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_detail: "",
    detail_content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getNewsDetial("1583311539373") //just for test
    this.getNewsDetial(options.id)
  },

  getNewsDetial(id){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
      },
      success: res => {
        console.log("getNewsDetial", res)
        let result = res.data.result
        result.date = util.formatTime(result.date)
        this.setData({
          news_detail: result,
          detail_content: result.content
        })
      }
    })
  }
  
})