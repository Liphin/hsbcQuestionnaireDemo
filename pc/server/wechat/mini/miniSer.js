/**
 * Created by Administrator on 2019/5/25.
 */
const fs = require('fs');
const url = require('url');
const util = require('util');
const axios = require("axios");
const request = require('request');
const miniGeneralSer = require('./miniGeneralSer');
const serverSerData = require('../../serverSerData');
const serverGeneralSer = require('../../serverGeneralSer');


/**
 * 小程序获取用户openid
 * @param req
 * @param response
 */
let getUserOpenId = function (req, response) {
    let arg = url.parse(req.url, true).query;
    let js_code = arg['js_code'];

    //发送动态信息数据的url
    let getUserOpenIdUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';
    let uri = util.format(getUserOpenIdUrl, serverSerData.appConfig.appid, serverSerData.appConfig.secret, js_code);
    request.get(uri, function (err, resData, body) {
        if (!err && resData['statusCode'] == 200) {
            console.log("js_code", js_code, "获取openid body ", body)
            response.send(JSON.parse(body)['openid'])

        } else {
            response.send('fail')
        }
    });
};


/**
 * 生成带参数的二维码图片
 */
let createParamQrCode = function (res, scene, callback) {
    //获取access_token操作
    miniGeneralSer.getAccessToken(res, () => {
        console.log("成功获取access token");
        let getParamQrCodeUrl = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s";
        let url = util.format(getParamQrCodeUrl, serverSerData.overallData.mini.access_token);
        let filePath = serverSerData.resourcePath + "/qrcode/" + scene + ".jpg";
        //通过axios方式调用接口
        axios.post(url, {scene: scene}, {responseType: 'stream'})
            .then((response) => {
                fs.access(filePath, error => {
                    if (!error) {
                        console.log('带参数图片文件已存在，删除旧文件', filePath);
                        fs.unlinkSync(filePath); //删除旧文件
                    }

                    response.data.pipe(fs.createWriteStream(filePath));
                    console.debug('带参数qrCode图片文件数据写入成功', filePath);
                    if (serverGeneralSer.checkDataNotEmpty(res)) {
                        callback();
                    }
                })
            })
            .catch(function (error) {
                console.debug('调用接口获取带参数二维码图片失败', scene, error);
                if (serverGeneralSer.checkDataNotEmpty(res)) {
                    res.sendStatus(400);
                }
            });
    });
};


module.exports = {
    createParamQrCode: createParamQrCode,
    getUserOpenId: getUserOpenId,
};