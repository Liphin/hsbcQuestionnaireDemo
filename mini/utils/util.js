let data = require('./data.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 返回时间戳
 */
const getTimestamp = function () {
  return new Date().getTime();
}

/**
 * 判空函数
 */
const checkNotEmpty = function (data) {
  let status = false;
  if (data != null && data != undefined && data != 'undefined') {
    //根据变量的不同类型进行判空处理
    switch (Object.prototype.toString.call(data)) {
      /*String类型数据*/
      case '[object String]': {
        if (data.trim() != '') {
          status = true;
        }
        break;
      }
      /*Array类型*/
      case '[object Array]': {
        if (data.length > 0) {
          status = true;
        }
        break;
      }
      /*Object类型*/
      case '[object Object]': {
        if (Object.keys(data).length > 0) {
          status = true;
        }
        break;
      }
      /*其他类型状态默认设置为true，分别为Number和Boolean类型*/
      default: {
        status = true;
        break;
      }
    }
  }
  return status;
}


/**
 * 模态框系统出错提醒消息
 */
const showSysErrorModal = function (callback) {
  wx.showModal({
    title: '提示',
    content: '很抱歉，系统发生错误，请稍后重试',
    showCancel: false,
    success(res) {
      if (res.confirm) {
        callback();
      }
    }
  })
}

/**
 * 模态框消息提醒
 */
const showInfoMessage = function (content) {
  wx.showModal({
    title: '消息提示',
    content: content,
    showCancel: false,
  })
}


/**
 * http的POST请求数据方法封装
 */
const httpPostJSON = function (url, data, callback) {
  wx.request({
    url: url, // 仅为示例，并非真实的接口地址
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      callback(res)
    }
  })
}


/**
 * 通过http请求获取openid
 */
const httpGetOpenid = function (callback) {
  wx.login({
    success(res) {
      if (res.code) {
        //发起网络请求获取用户openid
        wx.request({
          url: data.overallData.baseUrl + 'getUserOpenId',
          data: {
            js_code: res.code
          },
          success(response) {
            wx.setStorageSync('openid', response.data);
            data.overallData.user.openid = response.data;
            console.log('网络请求重新获取openid', response.data, ' and res.code is', res.code)
            if (callback != undefined) {
              callback();
            }
          },
          fail(err) {
            console.log("网络请求openid失败", err)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}


/**
 * 获取openid操作
 */
const getOpenid = function (callback) {
  //查看系统环境，若为开发者工具则进行相应操作
  const sysInfo = wx.getSystemInfoSync();
  console.log('系统环境', sysInfo.platform);
  if (sysInfo.platform == 'devtools') {
    //data.overallData.baseUrl = 'http://127.0.0.1:3301/';
    httpGetOpenid(callback);
    return
  }

  //查看本地存储是否有openid，若有则直接加载无需登录请求，若无则登录请求
  wx.getStorage({
    key: 'openid',
    success(res) {
      //赋值到用户全局属性变量中
      data.overallData.user.openid = res.data;
      console.log('从缓存中获取openid', res.data)
      if (callback != undefined) {
        callback();
      }
    },
    fail() {
      //如果本地无该用户数据则网络登录加载获取
      httpGetOpenid(callback);
    },
  })
}



module.exports = {
  getOpenid: getOpenid,
  formatTime: formatTime,
  getTimestamp: getTimestamp,
  checkNotEmpty: checkNotEmpty,
  showSysErrorModal: showSysErrorModal,
  showInfoMessage: showInfoMessage,
  httpPostJSON: httpPostJSON,
}
