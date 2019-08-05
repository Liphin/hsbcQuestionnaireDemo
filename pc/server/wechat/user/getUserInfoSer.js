/**
 * Created by Administrator on 2018/9/20.
 */
var url = require('url');
var util = require('util');
var http = require('http');
var https = require('https');
var request = require('request');
var fs = require("fs");
var uuidv1 = require('uuid/v1');
var schedule = require('node-schedule');
var gm = require('gm').subClass({imageMagick: true});
var serverSerData = require('../serverSerData');
var ServerGeneralSer = require('../serverGeneralSer');
var UserGeneralSer = require('./userGeneralSer');

var userGeneralSer = new UserGeneralSer();
var serverGeneralSer = new ServerGeneralSer();


function GetUserInfoSer() {

    //获取微信企业code的api
    //var getUserCodeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=1#wechat_redirec";
    var getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s";
    //读取上次文件最后的操作数字
    var num = parseInt(fs.readFileSync('account.txt').toString());

    //启动schedule任务，每隔5秒进行写入文件一次
    schedule.scheduleJob('*/5 * * * * *', function () {
        fs.writeFile('account.txt', num, function (err) {
            if (err) {
                console.error(err);
            }
        });
    });


    /**
     * 获取用户的基础数据
     * @param type
     * @param userOpenid
     * @param userAccessToken
     * @param res
     * @param callback
     */
    var getUserInfo = function (type, userOpenid, userAccessToken, res, callback) {
        //拼接获取用户数据的请求链接
        var acesstoken = userAccessToken;
        var openid = userOpenid;
        var uri = util.format(getUserInfoUrl, acesstoken, openid);
        //用https方式请求
        https.get(uri, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                var userData = JSON.parse(data);
                // console.log('get userData1', userData)
                callback(userData);
            });

        }).on('error', function (e) {
            console.error("Get error: ", e);
            res.send('error');
        });
    };


    /**
     * 获取公司员工信息数据
     * @param req
     * @param res
     */
    this.getWxUserInfo = function (req, res) {

        //解析url参数
        var type = 1;
        var arg = url.parse(req.url, true).query;
        var code = arg['code'];
        var state = arg['state'];

        //赋值code
        console.log('state', state);
        console.log('code', code);

        //获取access_token
        userGeneralSer.getAccessToken(type, code, res, function (userOpenid, userAccessToken) {

            //获取用户user数据
            console.log('access_token', userAccessToken);
            console.log('openid', userOpenid);

            getUserInfo(type, userOpenid, userAccessToken, res, function (userData) {
                if (serverGeneralSer.checkDataNotEmpty(userData)) {
                    //更新用户的openid和创建海报操作
                    var sqlStr = "UPDATE sum SET openid = ?, create_post=1 WHERE user_mark = ?";
                    var addData = [userOpenid, state];
                    serverSerData.dbPool.mysql.query(sqlStr, addData, function (error, results) {
                        console.log('update openid', !error);
                    });

                    //打印查看用户数据
                    console.log('user data', userData);
                    //第几个供电青年的位数自增
                    num++;
                    var uniqueImgFile = uuidv1();

                    //fs保存headimgurl图片数据到本地，取640*640的大图，并重置为200*200的小图
                    var sourceUrl = userData['headimgurl'];
                    var lastIndexSlash = sourceUrl.lastIndexOf("/");
                    var headImgUrl = sourceUrl.substring(0, lastIndexSlash) + "/0";
                    var newHeadImgPath = serverSerData.basePath + "/resource/" + uniqueImgFile + "_portrait.jpg";
                    gm(request(headImgUrl))
                        .resize(200, 200)
                        .write(newHeadImgPath, function (err) {
                            if (!err) {
                                console.log('done headImg save and resize');

                                //生成海报文本图片
                                //空格空白字符串
                                var emptyStr = "  ";
                                for (let i = 0; i < num.toString().length; i++) {
                                    emptyStr += "  ";
                                }
                                var newTextImgPath = serverSerData.basePath + "/resource/" + uniqueImgFile + "_textImg.png";
                                gm(562, 200, "rgba(0,0,0,0)")
                                    .region(562, 200, 0, 0)
                                    .gravity("Center")
                                    .fill("#0a3b76")
                                    .font(serverSerData.basePath + "/assets/font/MSYHBD.TTF", 34)
                                    .drawText(0, 0, "我是中国南方电网青年")
                                    .fill("#ff4346")
                                    .drawText(-120, 45, num + "")
                                    //.drawText(-120, 45, "1") //空格4格
                                    //.drawText(-120, 45, "12") //空格6格
                                    //.drawText(-120, 45, "123") //空格8格
                                    //.drawText(-120, 45, "1234") //空格10格
                                    .fill("#0a3b76")
                                    .drawText(0, 45, "第" + emptyStr + "位五四精神传承人")
                                    .write(newTextImgPath, function (err) {
                                        if (!err) {
                                            console.log('done textImg save');
                                            res.redirect('http://powerh5.liphin.com/sharePage.html?' + 'num=' + num + '&uuidv=' + uniqueImgFile);

                                        } else {
                                            res.send("write text image error");
                                        }
                                    });
                            } else {
                                res.send("write head image error");
                            }
                        });
                }
                else {
                    //获取用户失败
                    res.send('400 get user info error');
                }
            })
        })
    };


    //
    // //从url中读取并获取异源数据
    // var sourceUrl = "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoNmyX91CuTPyiaJia7oBmeTbU4nfPs9XUna3JLjmshEWcjcfHIiaNbl0I6tXJeVSx2H1UwQYropsVSA/132";
    // var headImgName = uuidv1() +".jpg";
    // var fileUrl = serverSerData.basePath + "/resource/" + headImgName;
    // //download该异源数据到本地
    // request.head(sourceUrl, function (err, res, body) {
    //     request(sourceUrl).pipe(fs.createWriteStream(fileUrl)).on('close', function () {
    //         // num++;
    //         // res.redirect('http://powerh5.liphin.com/sharePage.html?' + 'num=' + num + '&headimgurl=' + headImgName);
    //     });
    // });


}

module.exports = GetUserInfoSer;