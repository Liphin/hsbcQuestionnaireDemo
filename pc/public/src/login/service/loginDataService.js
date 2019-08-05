/**
 * Created by Administrator on 2019/5/27.
 */
"use strict"
loginModule.factory('LoginDataSer', function () {

    //页面变量
    let pageConfig = {
        showLogin: true,
    };

    //登录或注册信息
    let loginInfo = {
        account: '',
        password: '',
    };

    return {
        loginInfo: loginInfo,
        pageConfig: pageConfig,
    }
});