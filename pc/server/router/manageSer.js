/**
 * Created by Administrator on 2019/5/27.
 */

const uuidv1 = require('uuid/v1');
const express = require('express');
const mongo = require('../db/mongo');
const mongodb = require('mongodb');
const serverData = require('../serverSerData');
const miniSer = require('../wechat/mini/miniSer');
const router = express.Router();
const userDom = "user";//mongodb中的user文档库
const sheetDom = "sheet";//mongodb中的sheet文档库
const resultDom = "result"; //mongodb中的result文档库
const participantDom = "participant"; //mongodb中的participant文档库


/**
 * 创建新表单操作
 */
router.post('/createNewSheet', function (req, res, next) {
    let param = req.body;
    //插入sheet文档
    mongo.insertOneDocuments(sheetDom, param, response => {
        console.log('插入sheet状态：', response.result);
        //创建新问卷表单数据成功，返回新创建的数据
        if (response.result.n == 1) {

            //插入result操作
            let newResultData = {
                sheetid: response.ops[0]._id,
                result: {}, //存放结果数据
            };
            mongo.insertOneDocuments(resultDom, newResultData, response2 => {
                console.log('插入result状态：', response2.result)
                //插入result文档成功
                if (response2.result.n == 1) {
                    //TODO 速度优化：三者同步操作
                    //创建带参数的二维码操作
                    miniSer.createParamQrCode(res, response.ops[0]._id, () => {
                        res.send({
                            status: 200,
                            data: response.ops[0]._id
                        })
                    });
                }
                //插入result文档失败
                else {
                    res.send({
                        status: 401,
                    })
                }
            })
        }
        //创建新问卷表单数据，插入数据库失败
        else {
            res.send({
                status: 401,
            })
        }
    })
});


/**
 * 加载所有表单数据
 */
router.post('/loadAllSheet', function (req, res, next) {
    let param = req.body;
    //如果right权限级别为2则是管理员级别，设置param为空对象即查找所有表单数据
    if (param.right == 2) {
        param = {}
    }
    //若right级别不为管理员级别则删除right字段，紧根据userid进行查找即可
    else {
        delete param.right
    }
    //查找对应表单数据
    mongo.findDocuments(sheetDom, param, response => {
        res.send({
            status: 200,
            data: response
        })
    })
});

/**
 * 删除对应表单
 */
router.post('/deleteSheet', function (req, res, next) {
    let param = req.body;
    //TODO 届时用Promise做并行处理，并每次复用db对象，无需连接3次, 并且需删除文件，若换成不生成文件形式可省却该步骤
    mongo.deleteOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, response => {
        if (response.result.n > 0) {
            mongo.deleteManyDocuments(resultDom, {sheetid: new mongodb.ObjectID(param._id)}, response2 => {
                mongo.deleteManyDocuments(participantDom, {sheetid: param._id}, response3 => {
                    //TODO 删除带参数的二维码图片操作
                    res.send({
                        status: 200
                    })
                })
            })
        }
        //sheet表单需要判断是否有删除数量大于0，result和participant表单无需判断删除数目问题，可能未有参与者提交信息
        else {
            console.log("删除sheet表单失败");
            res.send({
                status: 401
            })
        }
    })
});


/**
 * 拷贝对应表单
 */
router.post('/copySheet', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, response => {
        if (response.length > 0) {
            let targetSheet = response[0]; //获取拷贝目标对象数据
            delete targetSheet._id; //自动创建的_id先对原先进行覆盖
            mongo.insertOneDocuments(sheetDom, targetSheet, response2 => {
                if (response2.result.n == 1) {
                    //TODO 速度优化，同步操作；
                    //生成带参数的二维码
                    miniSer.createParamQrCode(res, response2.ops[0]._id, () => {
                        res.send({
                            status: 200,
                        })
                    });
                }
                //创建失败
                else {
                    console.log('插入拷贝表单失败', response2);
                    res.send({
                        status: 402
                    })
                }
            })
        }
        else {
            console.log("获取对应表单失败");
            res.send({
                status: 401
            })
        }
    })
});

/**
 * 获取该表单数据填写数据结果
 */
router.post('/getTargetResult', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(resultDom, {sheetid: new mongodb.ObjectID(param.sheetid)}, response => {
        res.send({
            status: 200,
            data: response
        })
    })
});


/**
 * 重命名操作
 */
router.post('/renameSheet', function (req, res, next) {
    let param = req.body;
    mongo.updateOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, {title: param.title}, response => {
        if (response.result.n == 1) {
            res.send({status: 200})
        }
        //重命名失败
        else {
            console.log("重命名失败：", response);
            res.send({status: 401})
        }
    })
});


/**
 * 更改发布配置操作
 */
router.post('/updatePublishSheetConfig', function (req, res, next) {
    let param = req.body;
    mongo.updateOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, param.updateData, response => {
        if (response.result.n == 1) {
            res.send({status: 200})
        }
        //更改发布配置失败
        else {
            console.warn("更改发布配置失败：", response);
            res.send({status: 401})
        }
    })
});


/**
 * 获取目标参与人员提交的数据
 */
router.post('/getTargetParticipant', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(participantDom, {_id: new mongodb.ObjectID(param._id)}, response => {
        if (response.length > 0) {
            res.send({
                status: 200,
                data: response[0]
            })
        }
        //无数据返回
        else {
            console.log("获取参与人员所提交的数据失败：", response);
            res.send({
                status: 401,
            })
        }
    })
});


/**
 * 手机获取目标表单数据及其结果数据
 */
router.post('/getTargetSheetAndResult', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, sheetResponse => {
        //当数据不为空则继续
        if (sheetResponse.length > 0) {
            mongo.findDocuments(resultDom, {sheetid: new mongodb.ObjectID(param._id)}, resultResponse => {
                //当数据不为空则返回
                if (resultResponse.length > 0) {
                    res.send({
                        status: 200,
                        sheet: sheetResponse[0],
                        result: resultResponse[0],
                    })
                } else {
                    console.log("获取result数据失败");
                    res.send({
                        status: 402
                    })
                }
            })
        } else {
            console.log("获取sheet数据失败");
            res.send({
                status: 401
            })
        }
    })
});


/**
 * 获取目标参与者的所有提交过的表单的记录信息
 */
router.post('/getAllTargetParticipantRecord', (req, res, next) => {
    let param = req.body;
    mongo.findDocuments(participantDom, {openid: param.openid}, response => {
        res.send({
            status: 200,
            data: response,
        })
    })
});


/**
 * 清空所有
 */
router.post('/emptyTargetRecord', (req, res, next) => {
    let param = req.body;
    Promise.all([new Promise((resolve, reject) => {
        //删除result文档中相关记录
        //设置对应result字段为空对象，重置到最初创建状态
        mongo.updateOneDocuments(resultDom, {sheetid: new mongodb.ObjectID(param._id)}, {result: {}}, response => {
            resolve(response)
        })
    }), new Promise((resolve, reject) => {
        //删除participant文档中相关记录
        mongo.deleteManyDocuments(participantDom, {sheetid: param._id}, response => {
            console.log('participant', response);
            resolve(response)
        })
    })]).then(([response1, response2]) => {
        res.send({status: 200})

    }).catch(err => {
        console.log("清空数据系统出错: ", err);
        res.send({status: 402})
    });
});

//******************************* 数据分析 **************************************
/**
 * 获取系统管理的人次数统计数据
 */
router.post('/getSystemManagePersonData', (req, res, next) => {
    mongo.findSpecificField(participantDom, {}, {_id: false, sheetid: true, timestamp: true}, response => {
        res.send({
            status: 200,
            data: response,
        })
    })
});


//********************************  权限设置  **********************************
/**
 * 获取所有管理员账号
 */
router.post('/getAdminAccount', (req, res, next) => {
    mongo.findSpecificField(userDom, {right: 2}, {account: true, right: true}, response => {
        res.send({
            status: 200,
            data: response,
        })
    })
});

/**
 * 更新管理员权限账号
 */
router.post('/updateAdminRight', (req, res, next) => {
    let param = req.body;
    mongo.updateOneDocuments(userDom, {account: param.account}, {right: param.right}, response => {
        if (response.result.n == 1) {
            res.send({
                status: 200,
            })
        }
        //更新管理员权限的账号输入有误
        else {
            console.log("更新管理员权限的账号输入有误");
            res.send({
                status: 401
            })
        }

    })
});


module.exports = router;





