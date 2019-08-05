/**
 * Created by Administrator on 2018/9/20.
 */
var url = require('url');
var util = require('util');
var http = require('http');
var https = require('https');
var crypto = require('crypto');
var request = require('request');
var serverSerData = require('../serverSerData');
var ServerGeneralSer = require('../serverGeneralSer');
var serverGeneralSer = new ServerGeneralSer();

/**
 * 调用jssdk进行配置操作
 * @constructor
 */
function JSSDKConfig() {

    //进行jssdk的签名url
    var jsSdkSignUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi";


    /**
     * 进行jssdk的签名方法
     * @param req
     * @param response
     */
    this.signJsSdk = function (req, response) {
        //解析url参数
        var arg = url.parse(req.url, true).query;
        var webUrl = decodeURIComponent(arg['url']);
        console.log('get Param: ', arg, 'after decode', webUrl);

        //获取js_ticket数据
        getJsApiTicket(response, function () {
            //原始数据准备
            var type = 2;
            var getSignConcat = 'jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s';
            var js_api_ticket = serverSerData.instanceMapper[type]['js_api_ticket'];
            var noncestr = serverGeneralSer.getRandomStr();
            var timestamp = serverGeneralSer.getTimestamp();

            //获取ticket数据
            var concatStr = util.format(getSignConcat, js_api_ticket, noncestr, timestamp, webUrl);
            var hash = crypto.createHash('sha1').update(concatStr).digest('hex');

            //返回数据回传
            var toSign = {
                'appid': serverSerData.instanceMapper[type]['appid'],
                'noncestr': noncestr,
                'jsapi_ticket': serverSerData.instanceMapper[type]['js_api_ticket'],
                'timestamp': timestamp,
                'signature': hash
            };
            console.log('response toSign',toSign);
            response.send(toSign);
        })
    };


    /**
     * 算法签名的方法
     */
    var getJsApiTicket = function (response, callback) {

        //判断上次获取时间是否小于7000秒内
        var type = 2;
        var current = new Date();
        console.log('current: ', current, "js api cache", serverSerData.instanceMapper[type]['js_api_timestamp'], current - serverSerData.instanceMapper[type]['js_api_timestamp'])
        if (current - serverSerData.instanceMapper[type]['js_api_timestamp'] < 7000000) {
            //直接获取cache中的js_api_ticket数据
            console.log('get cache js_api_ticket');
            callback();

        } else {
            //获取access_token
            serverGeneralSer.getAccessToken(response, function () {

                //获取js_api_ticket
                var uri = util.format(jsSdkSignUrl, serverSerData.instanceMapper[type]['access_token']);
                //http的request请求
                request.get(uri, function (err, res, body) {
                    if (!err && res['statusCode'] == 200) {
                        var data = JSON.parse(body);
                        serverSerData.instanceMapper[type]['js_api_ticket'] = data['ticket']; //赋值ticket
                        serverSerData.instanceMapper[type]['js_api_timestamp'] = new Date(); //设置新的插入记录时间
                        callback();   //调用callback函数

                    } else {
                        //调用出错
                        console.error("getJsApiTicket error: ", err);
                        if (response != null) {
                            response.send('error');
                        }
                    }
                })
            })
        }
    };


}

module.exports = JSSDKConfig;