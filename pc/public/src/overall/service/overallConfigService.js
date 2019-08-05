/**
 * Created by Administrator on 2018/2/28.
 */

overallModule.config(function ($routeProvider, $httpProvider, $sceDelegateProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'src/login/tmpl/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/manage/:option', {
            templateUrl: 'src/manage/tmpl/manage.html',
            controller: 'ManageCtrl',
            controllerAs: 'manage',
            resolve: {
                check: function (OverallSer) {
                    return OverallSer.processLogonStatus(20, '/login');
                }
            }
        })
        .when('/design/:_id', {
            templateUrl: 'src/design/tmpl/design.html',
            controller: 'DesignCtrl',
            controllerAs: 'design',
            resolve: {
                check: function (OverallSer) {
                    return OverallSer.processLogonStatus(20, '/login');
                }
            }
        })
        .otherwise({redirectTo: '/login'});

    //部署拦截器，每次http请求，会经过拦截器方法后再往下传
    $httpProvider.interceptors.push('interceptHttp');
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '**'
    ]);
});