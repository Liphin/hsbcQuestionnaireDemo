/**
 * Created by Administrator on 2019/5/27.
 */
/**
 * 鼠标放上不同问卷类型时该问卷周围阴影凸显
 */
manageModule.directive('sheetTypeFrame', function () {
    return {
        restrict: 'A',
        scope: {
            sheetTypeFrame: '@'
        },
        link: function (scope, ele, attrs) {
            ele.bind('mouseenter', function (e) {
                ele.css('box-shadow', '0 0 20px ' + scope.sheetTypeFrame)
            });
            ele.bind('mouseleave', function (e) {
                ele.css('box-shadow', '0 0 5px ' + scope.sheetTypeFrame)
            })
        }
    }
});
/**
 * 鼠标进入按钮后，按钮背景和字体颜色改变
 */
manageModule.directive('sheetTypeBtn', function () {
    return {
        restrict: 'A',
        scope: {
            sheetTypeBtn: '@'
        },
        link: function (scope, ele, attrs) {
            ele.bind('mouseenter', function (e) {
                ele.css('background', scope.sheetTypeBtn);
                ele.css('color', 'white');
            });
            ele.bind('mouseleave', function (e) {
                ele.css('background', 'white');
                ele.css('color', scope.sheetTypeBtn);
            })
        }
    }
});


/**
 * 渲染表单中段落信息展现
 */
manageModule.directive('sheetParagraph', function () {
    return {
        restrict: 'A',
        scope: {
            sheetParagraph: '@'
        },
        link: function (scope, ele, attrs) {
            ele.html(scope.sheetParagraph);
        }
    }
});





