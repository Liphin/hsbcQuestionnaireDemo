/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.controller('DesignCtrl', function (check, $location, DesignDataSer, WidgetSer, DesignSer) {
    //检查是否登录状态
    if (!check) return;

    let design = this;
    design.isDisabled = false; //组件可编辑，不禁用
    design.overallData = DesignDataSer.overallData;
    design.widget = DesignDataSer.widget;
    design.sheet = DesignDataSer.sheet;
    design.isDisabled = true; //编辑页面面板，不能进行选择操作
    DesignSer.init();

    /**
     * 添加新组件的操作
     */
    design.addNewWidget = function (type) {
        WidgetSer.addNewWidget(type);
    };

    /**
     * 组件操作
     */
    design.widgetOpt = function (opt, index) {
        WidgetSer.widgetOpt(opt, index);
    };

    /**
     * 获取问题序号
     */
    design.getQuestionnaireNum = function (index) {
        return WidgetSer.getQuestionnaireNum(index);
    };

    /**
     * 编辑该组件的数据
     */
    design.editWidgetData = function (index) {
        WidgetSer.editWidgetData(index)
    };

    /**
     * 添加选项操作
     */
    design.addOption = function (param) {
        WidgetSer.addOptions(param);
    };

    /**
     * 删除选项操作
     */
    design.deleteOption = function (index, param) {
        WidgetSer.deleteOption(index, param);
    };

    /**
     * 调整位置，上移一个位置
     */
    design.positionUp = function (index, param) {
        WidgetSer.positionUp(index, param);
    };

    /**
     * 调整位置，下移一个位置
     */
    design.positionDown = function (index, param) {
        WidgetSer.positionDown(index, param);
    };

    /**
     * 设置或取消设置为默认选中选项
     */
    design.setAsDefault = function (index, param) {
        WidgetSer.setAsDefault(index, param);
    };

    /**
     * 预览页面数据结果
     */
    design.viewPage = function () {
        DesignSer.viewPage(design);
    };


    /**
     * 发布小程序页面
     */
    design.publishPage = function (status) {
        DesignSer.publishPage(status);
    };


    /**
     * 保存页面数据结果
     */
    design.savePage = function () {
        DesignSer.savePage();
    };

    /**
     * 提交问卷
     */
    design.submitSheet = function () {
        DesignSer.submitSheet();
    };

    /**
     * 编辑页面关闭手机预览
     */
    design.closePhoneView = function () {
        DesignSer.closePhoneView(design);
    };

    /**
     * 返回管理页面
     */
    design.backToManage = function () {
        $location.path('/manage/allSheet');
    }
});






