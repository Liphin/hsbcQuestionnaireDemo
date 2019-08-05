/**
 * Created by Administrator on 2019/6/6.
 */
"use strict";

/**
 * 获取网页url参数
 */
let getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

//**************************** Angularjs ****************************************
let sheetModule = angular.module('sheet', []);
sheetModule.controller('designCtrl', function ($scope, $http, designSer, designData) {
    let design = this;
    let _id = getUrlParameter("_id");
    let openid = getUrlParameter("openid");
    design.sheet = designData.sheet;
    design.overallData = designData.overallData;
    designSer.init(_id, openid); //数据初始化操作

    /**
     * 获取某问题的序号
     */
    design.getQuestionnaireNum = function (index) {
        return designSer.getQuestionnaireNum(index);
    };

    /**
     * 往上滚动到尚未完成的目标题目上
     */
    design.scrollToTargetUnfinished=function () {
        designSer.scrollToTargetUnfinished();
    };

    /**
     * 提交问卷
     */
    design.submitSheet = function () {
        designSer.submitSheet(openid);
    };


    /**
     * 该用户已经提交过了，切勿再次提交。并跳转到我的历史记录页面
     */
    design.jumpToMineHistory = function () {
        wx.miniProgram.switchTab({url: '/pages/mine/mine'})
    }

});