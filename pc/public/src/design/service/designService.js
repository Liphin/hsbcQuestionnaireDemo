/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignSer', function ($http, $location, OverallDataSer, OverallGeneralSer, DesignDataSer,
                                            $routeParams, ManageDataSer) {

    /**
     * 初始化渲染数据集
     */
    let init = function () {
        //1、http请求获取对应的表单数据
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getTargetSheetUrl, {_id: $routeParams._id}, result => {
            if (result.status == 200) {
                //返回是一个数据集，去第一条数据为目标sheet
                let targetSheet = result.data[0];
                //赋值表单页面编辑数据
                DesignDataSer.sheet.length = 0;
                for (let i in targetSheet.sheet) {
                    DesignDataSer.sheet.push(targetSheet.sheet[i]);
                }
                //赋值表单全局设置数据
                DesignDataSer.overallData.sheetConfig = {
                    _id: targetSheet._id,//唯一的id号，
                    userid: targetSheet.userid,//创建者id号
                    title: targetSheet.title,//标题
                    type: targetSheet.type,//表单类型：问卷、投票等
                    status: targetSheet.status,//表单状态：草稿，发布中等
                    open: targetSheet.open, //是否对外开放查询结果
                    timestamp: targetSheet.timestamp, //最新保存时间
                };

                //2. 编辑页面的组件动态添加操作，针对不同种类问卷类型有不同组件组合
                for (let i in ManageDataSer.allSheetType) {
                    //查找 ManageDataSer.allSheetType 中对应问卷类型的widgetType数组
                    if (ManageDataSer.allSheetType[i].type == targetSheet.type) {
                        let widgetType = ManageDataSer.allSheetType[i].widgetType;

                        //清空当前数据记录
                        DesignDataSer.widget.length = 0;
                        for (let j in DesignDataSer.allWidget) {
                            //初始化每个allWidget大项都添加
                            let targetWidget = {
                                status: DesignDataSer.allWidget[j].status,
                                name: DesignDataSer.allWidget[j].name,
                                sub: [],
                            };
                            //若对应问卷类型的widgetType数组包含该类型，则添加，否则不添加
                            for (let h in DesignDataSer.allWidget[j].sub) {
                                if (widgetType.indexOf(DesignDataSer.allWidget[j].sub[h].type) > -1) {
                                    targetWidget.sub.push(DesignDataSer.allWidget[j].sub[h]);
                                }
                            }
                            DesignDataSer.widget.push(targetWidget);
                        }
                    }
                }
            }
            //获取失败
            else {
                alert("系统出错，请稍后重试")
            }
        });
    };


    /**
     * 点击预览，快速预览或小程序预览
     * @param design
     */
    let viewPage = function (design) {
        //拷贝当前组件设置的
        DesignDataSer.overallData.phoneView.sheetOrigin.length = 0;
        DesignDataSer.overallData.phoneView.sheetOrigin = angular.copy(DesignDataSer.sheet);
        //摄者手机页面预览展示
        DesignDataSer.overallData.phoneView.showPhoneView = true;
        //设置预览页面允许选择按钮
        design.isDisabled = false;
    };


    /**
     * 编辑页面关闭手机预览
     * @param design
     */
    let closePhoneView = function (design) {
        //清空提交的数据
        DesignDataSer.sheet.length = 0;
        //重新赋值预览前的数据
        for (let i in DesignDataSer.overallData.phoneView.sheetOrigin) {
            DesignDataSer.sheet.push(DesignDataSer.overallData.phoneView.sheetOrigin[i])
        }
        //清空sheetOrigin数组
        DesignDataSer.overallData.phoneView.sheetOrigin.length = 0;
        //关闭手机预览页面
        DesignDataSer.overallData.phoneView.showPhoneView = false;
        //展开编辑页面无法进行直接数据默认选择操作
        design.isDisabled = true;
    };


    /**
     * 开放保存操作的对外方法体
     * @param callback
     */
    let saveOpt = function (callback) {
        //保存到数据库
        let jsonData = {
            _id: DesignDataSer.overallData.sheetConfig._id,
            sheet: DesignDataSer.sheet, //用于保存表单数据到数据库
            timestamp: new Date().getTime(), //获取最新保存的时间
        };
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.saveSheetDataUrl, jsonData, function (result) {
            if (result.status == 200) {
                //保存完成后如有其它操作调用此方法
                if (callback != undefined) callback();

            } else {
                alert("保存出错，请稍后重试")
            }
        });
    };


    /**
     * 保存页面信息
     * 1、手机表单HTML的框架页面添加数据
     * 2、保存该HTML到后台文件
     * 4、生成携带参数的的小程序二维码 TODO
     */
    let savePage = function () {
        //调用开放的公共保存操作方法
        saveOpt(() => {
            OverallGeneralSer.setFinishAnimation(1500, '保存完成');
        })
    };


    /**
     * 发布表单数据
     */
    let publishPage = function (status) {
        //1、保存当前表单数据
        saveOpt(() => {
            //2、设置数据库中开放表单字段的操作
            OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.releaseConfigUrl,
                {_id: DesignDataSer.overallData.sheetConfig._id, status: status}, result => {
                    if (result.status == 200) {
                        OverallGeneralSer.setFinishAnimation(2000, '发布成功');
                        $location.path('/manage/allSheet');
                    }
                    //更新失败
                    else {
                        alert("发布失败，请稍后重试");
                    }
                })
        })
    };


    /**
     * 提交问卷表单数据
     */
    let submitSheet = function () {
        //表单提交的数据
        let submitData = {
            openid: OverallDataSer.overallData.user._id, //电脑端用户提交用该用户的_id作为openid，手机端用户用真实openid
            sheetid: DesignDataSer.overallData.sheetConfig._id, //该表单文档的id
            title: DesignDataSer.overallData.sheetConfig.title,
            type: DesignDataSer.overallData.sheetConfig.type,
            sheet: DesignDataSer.sheet,
            timestamp: new Date().getTime()
        };

        $http.post("/submitResult", submitData).success(function (result) {
            if (result.status == 200) {
                OverallGeneralSer.setFinishAnimation(1500, '提交成功');
            } else {
                alert("提交出错，请稍后重试")
            }
        }).error(function (err) {
            alert("很抱歉，提交有误，请稍后重试");
        });
    };


    return {
        init: init,
        submitSheet: submitSheet,
        viewPage: viewPage,
        savePage: savePage,
        publishPage: publishPage,
        closePhoneView: closePhoneView,
    }
});

