/**
 * Created by Administrator on 2018/2/28.
 */

overallModule.factory('OverallSer', function ($rootScope, OverallDataSer, $location, $http,  OverallGeneralSer, $cookies) {


    /**
     * 全局初始化应用
     */
    let initData = function () {

    };


    /**
     * 鼠标事件停止传递
     * @param $event
     */
    let preventEventTransport = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };


    /**
     * modal的黑色遮罩层背景去掉
     */
    let modalBackRemove = function () {
        $(".modal-backdrop").remove();
    };


    /**
     * 获取sql注入的每个key word
     */
    // let getSqlInjectFilterWords = function () {
    //     /*获取所有嫌疑sql注入key word*/
    //     let allSqlKeyWords = OverallDataSer.urlData['frontEndHttp']['getSqlKeyWord'];
    //
    //     //1. 如果尚未获取全部sql key word数据则http请求获取
    //     if (Object.keys(OverallDataSer.sqlVerify.length <= 0)) {
    //         $http({
    //             method: 'GET',
    //             url: allSqlKeyWords
    //         }).then(function successCallback(response) {
    //             if (response['status'] == 200) {
    //                 OverallDataSer.sqlVerify = response['data'].split(",");
    //             }
    //         }, function errorCallback(err) {
    //             OverallSer.alertHttpRequestError("OverallSer.sqlInjectFilter", 500, err);
    //         });
    //     }
    // };


    /**
     * 键盘按下热键时，根据不同热键类型执行相应的操作
     * @param $event
     */
    let keyboardDownOpt = function ($event) {
        let keyObj = $event.key.toLowerCase();
        switch (keyObj) {
            case 'control': {
                //记录按下ctrl操作
                OverallDataSer.keyBoard['ctrl'] = true;
                break;
            }
            default: {
                break;
            }
        }
    };

    /**
     * 键盘按下热键时，根据不同热键类型执行相应的操作
     * @param $event
     */
    let keyboardUpOpt = function ($event) {
        let keyObj = $event.key.toLowerCase();
        switch (keyObj) {
            case 'control': {
                //记录按下ctrl操作
                OverallDataSer.keyBoard['ctrl'] = false;
                break;
            }
            default: {
                break;
            }
        }
    };


    /**
     * 对获取的User Status进行渲染页面前达标判断
     * 并针对不达标情况进行页面跳转处理
     * @param targetCamLevel
     * @param redirectPath
     */
    let processLogonStatus = function (targetCamLevel, redirectPath) {
        let verifiedCamLevel = getUserLogonStatus();
        //判断cam级别是否达标，如果不达标则进行相应跳转，
        //并返回bool值告知controller不再进行运行；否则告知达标true
        let result = verifiedCamLevel >= targetCamLevel;
        //如果result为false则直接跳转到指定redirect的path
        if (!result) {
            $location.path(redirectPath);
        }
        return result;
    };


    /**
     * 用户登录状态验证，返回登录级别
     * 10 用户尚未登录或登录信息已超时，请重新登录
     * 20 用户已经登录，可进入manager会话组页面
     */
    let getUserLogonStatus = function () {
        //初始化用户尚未登录或登录信息已超时，设置最低10级别
        let verifiedCamLevel = 10;
        if ((OverallGeneralSer.checkDataNotEmpty($cookies.get('_id')) ||
            OverallGeneralSer.checkDataNotEmpty(OverallDataSer.overallData.user._id))) {
            //用户已经登录，登录级别为20
            verifiedCamLevel = 20;
            if (!OverallGeneralSer.checkDataNotEmpty(OverallDataSer.overallData.user._id)) {
                OverallDataSer.overallData.user._id = $cookies.get('_id');
                OverallDataSer.overallData.user.account = $cookies.get('account');
                OverallDataSer.overallData.user.right = $cookies.get('right');

            } else {
                //延长cookie超时时间
                let newExpireTime = OverallGeneralSer.getNewCookiesExpireDate();
                $cookies.put('_id', OverallDataSer.overallData.user._id, {'expires': newExpireTime});
                $cookies.put('account', OverallDataSer.overallData.user.account, {'expires': newExpireTime});
                $cookies.put('right', OverallDataSer.overallData.user.right, {'expires': newExpireTime});
            }
        }
        return verifiedCamLevel;
    };


    return {
        initData: initData,
        keyboardUpOpt: keyboardUpOpt,
        keyboardDownOpt: keyboardDownOpt,
        modalBackRemove: modalBackRemove,
        preventEventTransport: preventEventTransport,
        processLogonStatus:processLogonStatus,
    }
});
