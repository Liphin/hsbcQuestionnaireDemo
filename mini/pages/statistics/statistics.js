// pages/statistics/statistics.js
let data = require('../../utils/data.js');
let util = require('../../utils/util.js');

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传递对应openid数据，加载我的所有内容表单页面
    this.setData({
      statisitcUrl: data.overallData.baseUrl + "src/mini/statistic/statistic.html"
    })
    console.log('get statistic url', data.overallData.baseUrl + "src/mini/statistic.html")
  }
})