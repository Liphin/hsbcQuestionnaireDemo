/**
 * Created by Administrator on 2018/8/20.
 */

overallModule.factory('OverallGeneralSer', function ($http, OverallDataSer, $timeout, $rootScope, $location) {

    /**
     * 设置cookie三小时的生存时间
     * @returns {Date}
     */
    let getNewCookiesExpireDate = function () {
        let expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 3, expireDate.getMinutes(), expireDate.getSeconds(), expireDate.getMilliseconds());
        return expireDate;
    };


    /**
     * 对数据进行判空处理
     * @param data
     */
    let checkDataNotEmpty = function (data) {
        let status = false;
        if (data != null && data != undefined && data != 'NaN') {
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
     * 对每个sql key word进行监测是否在content中出现，
     * 若出现则返回false验证，否则返回true通过
     * @param content
     */
    // var sqlInjectFilter = function (content) {
    //     //循环每个sql key word进行监测
    //     for (var i in OverallDataSer.sqlVerify) {
    //         if (String(content).indexOf(OverallDataSer.sqlVerify[i]) >= 0) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };


    /**
     * 返回当前时间的timestamp
     * 若有前缀则添加前缀，否则直接返回时间戳数据
     */
    var getTimeStamp = function (prefix) {
        if (checkDataNotEmpty(prefix)) {
            return prefix + '' + (new Date()).valueOf();

        } else {
            return (new Date()).valueOf();
        }
    };


    /**
     * 返回当前时间，格式为2018-01-01 12:00:00
     * @returns {string}
     */
    var getCurrentDataTime = function () {
        let date = new Date();
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "  " + date.getHours() + ":" +
            date.getMinutes() + ":" + date.getSeconds();
    };


    /**
     * http get获取资源数据
     */
    let httpGetFiles = function (url, callback) {
        $http({
            method: 'Get',
            url: url,
        }).success(function (result) {
            callback(result);

        }).error(function (result) {
            alert("很抱歉，获取失败，请稍后重试！" + JSON.stringify(result))
        });
    };


    /**
     * http post发送表单数据
     */
    let httpPostFormData = function (url, obj, callback) {
        //初始化表单数据
        var fd = new FormData();
        //动态装载数据
        for (var i in obj) {
            fd.append(i, obj[i]);
        }
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            callback(response);

        }).error(function (err) {
            alert(OverallDataSer.overallData.requestDataErrorMsg + ",");
        });
    };


    /**
     * http post发送json数据
     */
    let httpPostJsonData = function (url, obj, callback) {
        $http.post(url, obj).success(function (response) {
            callback(response);

        }).error(function (err) {
            alert(OverallDataSer.overallData.requestDataErrorMsg + ",");
        });
    };


    /**
     * 发送post请求数据，发送非formData数据
     * @param data
     * @param url
     * @param callback
     * @param finallyCallback
     */
    var httpPostData2 = function (data, url, callback, finallyCallback) {
        $http({
            method: 'POST',
            url: url,
            data: ($.param(data)),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //data: data,
            //headers: {'Content-Type': 'application/json'}
        }).success(function (response) {
            callback(response);

        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("请求出错: ", 600, err);

        }).finally(function () {
            finallyCallback();
        });
    };


    /**
     * 发送post请求数据，发送非formData数据
     * @param data
     * @param url
     * @param callback
     * @param loader
     */
    var httpPostData3 = function (data, url, callback, loader) {
        //设置该loader加载项设置加载动画
        if (loader != undefined) {
            loader['status'] = true;
        }
        $http({
            method: 'POST',
            url: url,
            data: ($.param(data)),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //data: data,
            //headers: {'Content-Type': 'application/json'}
        }).success(function (response) {
            callback(response);

        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("请求出错: ", 600, err);

        }).finally(function () {
            if (loader != undefined) {
                //关闭该加载动画
                loader['status'] = false;
            }
        });
    };


    /**
     * 上传资源文件信息
     * 用于提交文件操作，并开放callback函数接口
     */
    let uploadResource = function (obj, callback) {
        var fd = new FormData();
        //动态装载数据
        for (var i in obj) {
            fd.append(i, obj[i]);
        }
        //提交表单数据
        var url = OverallDataSer.urlData['frontEndHttp']['uploadResource'];
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            callback(response);

        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("uploadResource", 600, err);
        })
    };


    /**
     * 上传文件到易简网
     * @param obj
     * @param callback
     */
    var uploadFileToYJW = function (obj, callback) {
        var url = 'https://14.23.88.138:7777/api/1.0/file';
        var headers = {
            'Content-Type': undefined,
            "Accept": "application/json",
            'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c'
        };
        var fd = new FormData();
        //动态装载数据
        for (var i in obj) {
            fd.append(i, obj[i]);
        }
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: headers,
            rejectUnauthorized: false

        }).success(function (response) {
            callback(response);

        }).error(function (err) {
            alert(OverallDataSer.overallData['requestDataErrorMsg'] + ",");

        });
    };


    /**
     * http 请求错误返回的处理
     * @param errFunction
     * @param errCode
     * @param err
     */
    var alertHttpRequestError = function (errFunction, errCode, err) {
        //请求出错打印错误消息和弹出alert视窗提醒客户
        console.error(errFunction, errCode, err);
        alert("Sorry, service error please try again later.\n很抱歉，服务异常，请稍后重试");
    };


    /**
     * urlEncode每个param数据节点
     */
    var resetNewData = function (target) {
        //遍历target中每个数据
        for (var i in target) {
            //如果该数据为对象或数组则回调处理，否则encodeURI处理
            switch (Object.prototype.toString.call(target[i])) {
                /*String类型数据*/
                case '[object String]': {
                    target[i] = '';
                    break;
                }
                /*Number类型*/
                case '[object Number]': {
                    target[i] = 0;
                    break;
                }
                /*Boolean类型*/
                case '[object Boolean]': {
                    target[i] = true;
                    break;
                }
                /*Array类型*/
                case '[object Array]': {
                    resetNewData(target[i])
                    break;
                }
                /*Object类型*/
                case '[object Object]': {
                    resetNewData(target[i])
                    break;
                }
            }
        }
    };


    /**
     * 操作完成动画
     */
    let setFinishAnimation = function (time, word) {
        //设置文字和动画状态
        //OverallDataSer.overallData.finishAnimation.status = false;
        OverallDataSer.overallData.finishAnimation.text = word;
        OverallDataSer.overallData.finishAnimation.status = true;

        //设置动画过期完成时间
        $timeout(function () {
            OverallDataSer.overallData.finishAnimation.status = false;
        }, time);
    };


    /**
     * 模态框弹出及隐藏，展示提示信息数据
     * @param modalType 'lg'/'sm'，分别为显示大或小的模态框
     * @param item 大类项
     * @param subItem 子类项
     */
    let modalInfoShow = function (modalType, item, subItem) {
        //遍历每个模态框使其状态为隐藏
        for (let type in OverallDataSer.modalSetting[modalType]) {
            for (let info in OverallDataSer.modalSetting[modalType][type]) {
                if (OverallDataSer.modalSetting[modalType][type][info]) {
                    OverallDataSer.modalSetting[modalType][type][info] = false;
                }
            }
        }
        OverallDataSer.modalSetting[modalType][item][subItem] = true; //单独设置展示某条模态框
        //根据不同模态框类型展示不同大小模态框面板
        if (modalType == 'lg') {
            $('#modal_info_lg').modal({keyboard: true});
            //$('.modal-backdrop.in').css('z-index', BasicDataSer.zIndexHelper['info_background']);

        } else if (modalType == 'sm') {
            $('#modal_info_sm').modal({keyboard: true});
            //$('.modal-backdrop.in').css('z-index', BasicDataSer.zIndexHelper['info_background']);
        }
    };


    return {
        httpGetFiles: httpGetFiles,
        httpPostFormData: httpPostFormData,
        httpPostJsonData: httpPostJsonData,
        getTimeStamp: getTimeStamp,
        getCurrentDataTime: getCurrentDataTime,
        httpPostData2: httpPostData2,
        httpPostData3: httpPostData3,
        modalInfoShow: modalInfoShow,
        uploadFileToYJW: uploadFileToYJW,
        uploadResource: uploadResource,
        setFinishAnimation: setFinishAnimation,
        checkDataNotEmpty: checkDataNotEmpty,
        getNewCookiesExpireDate: getNewCookiesExpireDate,
        alertHttpRequestError: alertHttpRequestError,
    }
});
