/**
 * Created by Administrator on 2018/2/28.
 */

/**
 * 退出登录页面
 */
overallModule.directive('overall', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/overall.html'
    };
}]);

/**
 * 退出登录页面
 */
overallModule.directive('signOut', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/sub/signOut.html'
    };
}]);


/**
 * 执行完成动画
 */
overallModule.directive('finishAnimate', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/sub/finishAnimate.html'
    };
}]);


/**
 * 加载动画
 */
overallModule.directive('loadAnimate', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/sub/loadAnimate.html'
    };
}]);

/**
 * 模态框设置
 */
overallModule.directive('overallModalInfo', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/sub/modalInfo.html'
    };
}]);




