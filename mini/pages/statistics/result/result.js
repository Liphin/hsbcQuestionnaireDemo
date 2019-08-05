// pages/statistics/analyse/analyse.js
let data = require('../../../utils/data.js');
let util = require('../../../utils/util.js');

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (param) {
    console.log('analyse 页面获取参数值：', param)
    let analyseUrl = data.overallData.baseUrl + "src/mini/statistic/sub/result.html?openid=" + data.overallData.user.openid + "&_id=" + param._id;
    console.log('查看统计结果路由地址：', analyseUrl);
    this.setData({
      analyseUrl: analyseUrl,
    })
  }
})