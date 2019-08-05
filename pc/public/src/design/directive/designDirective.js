/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

/**
 * 段落数据说明
 */
designModule.directive('designParagraphHtml', ['DesignDataSer', function (DesignDataSer) {
    return {
        restrict: 'A',
        scope:{
            designParagraphHtml:'@',
        },
        link: function (scope, ele, attrs) {
            //ele.html(scope.designParagraphHtml);
            scope.$watch('designParagraphHtml', function (newValue, oldValue) {
                if (newValue && newValue != '') {
                    ele.html(newValue);
                }
            });
        }
    };
}]);