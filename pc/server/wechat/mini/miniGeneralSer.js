/**
 * Created by Administrator on 2019/5/25.
 */
const url = require('url');
const util = require('util');
const http = require('http');
const https = require('https');
const request = require('request');
const serverSerData = require('../../serverSerData');

/**
 * 获取access token数据
 * @param response
 * @param callback
 */
let getAccessToken = function (response, callback) {
    //当前时间戳
    let current = new Date();
    //判断上次获取时间是否小于间隔内
    console.log('距离上次获取间隔：', (current - serverSerData.overallData.mini.timestamp) / 1000, '过期间隔：', (serverSerData.overallData.mini.expire - 200));
    if ((current - serverSerData.overallData.mini.timestamp) / 1000 < (serverSerData.overallData.mini.expire - 200)) {
        console.log('直接从缓冲中获取access_token');
        callback();

    }
    //已过期，重新获取access_token
    else {
        let getAccessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
        let uri = util.format(getAccessTokenUrl, serverSerData.appConfig.appid, serverSerData.appConfig.secret);
        //用request方式请求
        request.get(uri, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                let data = JSON.parse(body);
                serverSerData.overallData.mini.access_token = data['access_token'];
                serverSerData.overallData.mini.expire = data['expires_in'];
                serverSerData.overallData.mini.timestamp = current;
                console.log('调用access_token接口后数据存储：', serverSerData.overallData.mini);
                callback();

            } else {
                console.error("获取access_token出错: ", err, '返回body是：', body);
                if (response != null) {
                    response.send('error');
                }
            }
        });
    }
};


module.exports = {
    getAccessToken: getAccessToken,
};