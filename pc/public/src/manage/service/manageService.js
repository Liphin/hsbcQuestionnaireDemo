/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('ManageSer', function ($cookies, $routeParams, $location, ManageDataSer, OverallGeneralSer, OverallDataSer,
                                            AllSheetSer, DesignDataSer, ResultSer, AnalyseSer, RightSer) {

    /**
     * 管理页面初始化操作
     */
    let init = function () {
        ManageDataSer.overallData.navigation = $routeParams.option;
        //初始化时根据不同路由配置信息执行相应方法
        if ($routeParams.option == 'allSheet') {
            AllSheetSer.loadAllSheet(() => {
            });
        }
        //若页面尚未加载所有表单数据，则应先加载所有表单数据后再加载分析数据，否则直接加载分析数据
        else if ($routeParams.option == 'resultStatistic') {
            if (ManageDataSer.allSheetData.length == 0) {
                AllSheetSer.loadAllSheet(() => {
                    ResultSer.initResultData();
                })
            } else {
                ResultSer.initResultData();
            }
        }
        //若已加载所有表单数据则直接初始化系统管理逻辑，否则先加载表单数据
        else if ($routeParams.option == 'analyseData') {
            //如果该用户级别为2则加载所有表单数据并初始化系统管理数据
            if (OverallDataSer.overallData.user.right == 2) {
                if (ManageDataSer.allSheetData.length == 0) {
                    AllSheetSer.loadAllSheet(() => {
                        AnalyseSer.initAnalyseData();
                    })
                } else {
                    AnalyseSer.initAnalyseData();
                }
            }
            //若该用户级别不为2则进入所有表单路由
            else {
                $location.url('/manage/allSheet')
            }
        }
        //进入权限设置页面
        else if ($routeParams.option == 'rightSetting') {
            //初始化管理员权限数据
            RightSer.initRightData();
        }
    };


    /**
     * 创建新的表单类型数据
     */
    let createNewSheet = function (sheetType) {
        //判断是否已输入标题，若未输入则输入
        if (OverallGeneralSer.checkDataNotEmpty(ManageDataSer.overallData.newSheet.title)) {
            let data = {
                userid: OverallDataSer.overallData.user._id,
                title: ManageDataSer.overallData.newSheet.title,
                type: sheetType,
                status: 1, //状态信息： 1：待发布状态，2：发布中状态
                open: true, //对于发布状态的消息，设置open字段记录是否开放结果查询
                sheet: [DesignDataSer.newWidgetData.paragraph], //初始化操作
                timestamp: new Date().getTime(), //记录创建时间戳
                account: OverallDataSer.overallData.user.account, //记录该创建用户的账号信息
            };
            //post发送http请求数据创建新表单数据
            OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.createNewSheetUrl, data, function (result) {
                if (result.status == 200) {
                    //跳转链接，进入design界面
                    $location.path('/design/' + result.data);
                }
                else {
                    alert("创建失败，请稍后重试")
                }
            })
        }
        //提醒客户输入标题
        else {
            alert("请填写标题信息");
        }
    };


    return {
        init: init,
        createNewSheet: createNewSheet,
    }
});