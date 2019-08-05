/**
 * Created by Administrator on 2019/5/27.
 */

/**
 * 管理界面头部html
 */
manageModule.directive('manageHeader', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/header.html'
    }
});

/**
 * 管理界面左侧导航栏html
 */
manageModule.directive('manageNavigation', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/navigation.html'
    }
});

/**
 * 管理界面右侧内容页面
 */
manageModule.directive('manageContent', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content.html'
    }
});


//****************************** 新建问卷 *************************************
/**
 * 创建新的问卷表单
 */
manageModule.directive('manageCreateSheet', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/create/create_sheet.html'
    }
});


//****************************** 所有问卷 *************************************
/**
 * 查看已有所有问卷表单
 */
manageModule.directive('manageAllSheet', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/all/all_sheet.html'
    }
});

/**
 * 小程序qrcode
 */
overallModule.directive('managePreviewMini', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/all/sub/mini_qrcode.html'
    };
}]);

/**
 * 发布问卷等的配置面板
 */
overallModule.directive('managePublishConfig', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/all/sub/publish_config.html'
    };
}]);


//********************************** 结果统计 ************************************************
/**
 * 结果统计
 */
manageModule.directive('resultStatistic', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/result/result_statistic.html'
    }
});


/**
 * 结果统计——段落描述
 */
manageModule.directive('resultParagraph', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/result/sub/result_paragraph.html'
    }
});

/**
 * 结果统计——选择题
 */
manageModule.directive('resultSelect', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/result/sub/result_select.html'
    }
});

/**
 * 结果统计——矩阵单选题
 */
manageModule.directive('resultMatrix', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/result/sub/result_matrix.html'
    }
});

/**
 * 结果统计——单项填空题
 */
overallModule.directive('resultFillSingle', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/result/sub/result_fill_single.html'
    };
}]);

/**
 * 结果统计——多项填空题
 */
overallModule.directive('resultFillMatrix', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/result/sub/result_fill_matrix.html'
    };
}]);

/**
 * 结果统计——填空题详情数据
 */
overallModule.directive('resultTextDetail', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/result/sub/result_text_detail.html'
    };
}]);


//*************************************** 数据分析 ***************************************************
/**
 * 数据分析主页面
 */
overallModule.directive('manageAnalyseData', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/analyse/analyse_data.html'
    };
}]);
/**
 * 问卷统计
 */
overallModule.directive('manageAnalyseSheetStatistic', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/analyse/sub/analyse_sheet_statistic.html'
    };
}]);
/**
 * 人次数统计
 */
overallModule.directive('manageAnalysePersonStatistic', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/analyse/sub/analyse_person_statistic.html'
    };
}]);



//**************************************** 权限设置 **************************************************
/**
 * 权限设置
 */
overallModule.directive('manageRightSetting', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/right/right_setting.html'
    };
}]);
