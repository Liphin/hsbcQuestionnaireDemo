// pages/mine/hisdetail/history.js
let data = require('../../../utils/data.js');
let util = require('../../../utils/util.js');

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (param) {
    console.log('子页面获取参数值：', param)
    let historyUrl = data.overallData.baseUrl + "src/mini/mine/sub/history.html?openid=" + data.overallData.user.openid + "&_id=" + param._id;
    console.log('目标历史页面', historyUrl)
    this.setData({
      historyUrl: historyUrl
    })
  },

})