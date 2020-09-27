// pages/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取接口轮播图数据
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result);
      }
    })
  }
})