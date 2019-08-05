// pages/sheet/sheet.js
let data = require('../../utils/data.js');
let util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheetUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    //scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene, scene包含该_id值
    let scene = decodeURIComponent(query.scene)
    console.log('场景值为：', scene);
    let that = this;
    // util.showInfoMessage('场景值为：'+ scene);
    //scene ='5cf2709bd927a5275473b52a';

    //判断场景值是否为空，若为空则进行统计页面，否则获取表单数据
    if (util.checkNotEmpty(scene)) {
      //异步获取openid数据
      util.getOpenid(function () {
        //获取场景参数对应的表单网页
        let sheetUrl = data.overallData.baseUrl + "src/mini/sheet/sheet.html?openid=" + data.overallData.user.openid + "&_id=" + scene;
        console.log('sheetUrl', sheetUrl);
        that.setData({
          sheetUrl: sheetUrl
        })
      });

      //保存页面场景值
      data.overallData.sheet.scene = scene;

      //获取该问卷内容，用于转发时标题、图片等使用
      util.httpPostJSON(data.overallData.baseUrl + "getTargetSheet", { '_id': scene }, result => {
        console.log("获取目标页面数据返回", result);
        if (result.data.status == 200) {
          data.overallData.sheet.data = result.data.data[0];
        }
      })
    }
    //若无场景值参数则跳转到对应开放的接口数据中
    else {
      util.getOpenid(function () { });
      wx.switchTab({
        url: '/pages/statistics/statistics'
      })
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('查看res.target:', res.target)
    }
    //赋值title值
    let titlePrefix = ''
    if (util.checkNotEmpty(data.overallData.sheet.data.title)) {
      titlePrefix = data.overallData.sheet.data.title
    }
    console.log('title', titlePrefix + '_问卷');
    return {
      title: titlePrefix + '问卷',
      path: '/pages/sheet/sheet?scene=' + data.overallData.sheet.scene
    }
  }

})