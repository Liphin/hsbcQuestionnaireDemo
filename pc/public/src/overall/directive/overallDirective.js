/**
 * Created by Administrator on 2018/2/28.
 */
overallModule.directive('convertToNumber', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return val != null ? parseInt(val, 10) : null;
            });
            ngModel.$formatters.push(function (val) {
                return val != null ? '' + val : null;
            });
        }
    };
}]);


/**
 * 页面resize时调用该方法
 */
overallModule.directive('resize', ['$window', 'OverallDataSer', function ($window, OverallDataSer) {
    /**
     * 屏幕宽高变换
     * @param w
     */
    var resizeUpdateInfo=function (w) {
        //对Overall数值进行重新复制
        OverallDataSer.overallData['screen']['width'] = w.innerWidth;
        OverallDataSer.overallData['screen']['height'] = w.innerHeight;
    };

    return function (scope, element) {
        var w = angular.element($window);
        //bind 和 resize事件都
        w.bind('load , resize', function () {
            scope.$apply(function () {
                //传递$window，和传递w，结果不一样
                resizeUpdateInfo($window);
            });
        });
    }
}]);


/**
 * 手机页面上预览表单数据
 */
overallModule.directive('phoneView', ['OverallDataSer', function (OverallDataSer) {
    return {
        restrict: 'A',
        link: function (scope, ele, attrs) {
            ele.html(OverallDataSer.overallData.phoneView.sheetHtmlData);
        }
    };
}]);
