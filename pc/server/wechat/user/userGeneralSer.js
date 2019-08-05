/**
 * Created by Administrator on 2018/9/20.
 */
var url = require('url');
var util = require('util');
var http = require('http');
var https = require('https');
var request = require('request');
var serverSerData = require('../serverSerData');

/**
 * 企业微信的公用调用方法
 * @constructor
 */
function UserGeneralSer() {

    //获取access token的url数据
    var getAccessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
    //获取js_api_ticket数据的url
    //var getJsApiTicketUrl = 'https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=%s';


    /**
     * 获取access token数据
     * @param type
     * @param code
     * @param response
     * @param callback
     */
    this.getAccessToken = function (type, code, response, callback) {
        var current = new Date();
        //token获取
        var appid = serverSerData.instanceMapper[type]['appid'];
        var secret = serverSerData.instanceMapper[type]['secret'];
        //var code = serverSerData.instanceMapper[type]['code'];

        var uri = util.format(getAccessTokenUrl, appid, secret,code);
        //用request方式请求
        request.get(uri, function (err, res, body) {
            if (!err && res['statusCode'] == 200) {
                var userinfo= JSON.parse(body);
                //serverSerData.instanceMapper[type]['access_token'] = userinfo['access_token']; //赋值access_token
                //serverSerData.userWxInfo['openid'] = userinfo['openid'];
                //serverSerData.instanceMapper[type]['timestamp'] = new Date(); //设置新的插入记录时间
                callback(userinfo['openid'], userinfo['access_token']);   //调用callback函数

            } else {
                //调用出错
                console.error("getAccessToken error: ", err);
                if (response != null) {
                    response.send('error');
                }
            }
        });

    };


    /**
     * 获取js_api_ticket数据的api
     * @param type
     * @param response
     * @param callback
     */
    // this.getJsApiTicket = function (type, response, callback) {
    //     var current = new Date();
    //     //判断上次获取时间是否小于7000秒内
    //     if (current - serverSerData.instanceMapper[type]['js_api_timestamp'] < 7000000) {
    //         //直接进入callback函数，使用之前的缓存，无需再次获取
    //
    //         console.log('get from cache')
    //         callback();
    //
    //     } else {
    //         //js_api_ticket缓存超时则需再次获取
    //         this.getAccessToken(type, response, function () {
    //             console.log('get new')
    //
    //             var uri = util.format(getJsApiTicketUrl, serverSerData.instanceMapper[type]['access_token']);
    //             request.get(uri, function (err, res, body) {
    //                 if (!err && res['statusCode'] == 200) {
    //                     serverSerData.instanceMapper[type]['js_api_ticket'] = JSON.parse(body)['ticket']; //赋值access_token
    //                     serverSerData.instanceMapper[type]['js_api_timestamp'] = new Date(); //设置新的插入记录时间
    //                     callback();   //调用callback函数
    //
    //                 } else {
    //                     //调用出错
    //                     console.error("getJsApiTicket error: ", err);
    //                     if (response != null) {
    //                         response.send('error');
    //                     }
    //                 }
    //             });
    //         })
    //     }
    // };



    /**
     * post请求获取数据，发送数据到微信后台，需要传输json格式数据
     */
    // this.httpPostMethod = function (path, data, callback) {
    //     request.post({
    //         url: path,
    //         json: data,
    //     }, function (err, res, body) {
    //         if (!err) {
    //             callback(body);
    //
    //         } else {
    //             console.error(url, body, err)
    //         }
    //     });
    // };


}

module.exports = UserGeneralSer;