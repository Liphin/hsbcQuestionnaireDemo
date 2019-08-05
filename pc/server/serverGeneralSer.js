/**
 * Created by Administrator on 2018/5/15.
 */
const url = require('url');
const util = require('util');
const request = require('request');
const serverSerData = require('./serverSerData');

/**
 * 设置异源访问策略
 * @param req
 * @param res
 * @param next
 */
let setCrossOrigin = function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', serverSerData.crossOrigin['allowedOrigin']);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', serverSerData.crossOrigin['methods']);
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', serverSerData.crossOrigin['headers']);
    // Set to true if you need the website to include cookies in the requests sent to the API
    res.setHeader('Access-Control-Allow-Credentials', serverSerData.crossOrigin['credentials']);
    // Pass to next layer of middleware
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200); //respond with 200
    } else {
        next(); //move on
    }
};

/**
 * 公用实用方法，统一判空检测
 * @param data
 * @returns {boolean}
 */
let checkDataNotEmpty = function (data) {
    let status = false;
    if (data != null && data != undefined) {
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
};


/**
 * 返回当前日期，格式为2018-01-01
 */
let getDateTime = function () {
    let date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds();
};

/**
 * 获取时间戳函数
 * @returns {string}
 */
let getTimestamp = function () {
    return new Date().getTime().toString();
};

/**
 * 获取字符串
 * @returns {string}
 */
let getRandomStr = function () {
    return Math.random().toString(36).substring(7);
};


module.exports = {
    checkDataNotEmpty: checkDataNotEmpty,
    getDateTime: getDateTime,
    getTimestamp: getTimestamp,
    getRandomStr: getRandomStr,
    setCrossOrigin: setCrossOrigin,
};