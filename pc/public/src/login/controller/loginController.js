/**
 * Created by Administrator on 2019/5/27.
 */
"use strict"
loginModule.controller('LoginCtrl', function ($scope, LoginDataSer, LoginSer) {
    let login = this;
    login.pageConfig = LoginDataSer.pageConfig;
    login.loginInfo = LoginDataSer.loginInfo;

    /**
     * 登录操作
     */
    login.loginOpt = function () {
        LoginSer.loginOpt()
    };

    /**
     * 注册操作
     */
    login.registerOpt = function () {
        LoginSer.registerOpt();
    }


});