// pages/mine/mine.js
let data = require('../../utils/data.js');
let util = require('../../utils/util.js');

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传递对应openid数据，加载我的所有内容表单页面
    this.setData({
      mineUrl: data.overallData.baseUrl + "src/mini/mine/mine.html?openid=" + data.overallData.user.openid
    })
  }
})