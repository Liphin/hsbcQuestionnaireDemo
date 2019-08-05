/**
 * Created by Administrator on 2019/6/6.
 */
/**
 * 渲染表单中段落信息展现
 */
sheetModule.directive('designParagraphHtml', [function () {
    return {
        restrict: 'A',
        scope: {
            designParagraphHtml: '@',
        },
        link: function (scope, ele, attrs) {
            scope.$watch('designParagraphHtml', function (newValue, oldValue) {
                if (newValue && newValue != '') {
                    ele.html(newValue);
                }
            });
        }
    };
}]);