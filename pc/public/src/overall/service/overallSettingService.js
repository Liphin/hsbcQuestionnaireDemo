/**
 * Created by Administrator on 2018/2/28.
 */

/**
 * 当有外来请求时候进行拦截，可以进行安全防范等操作或者进行页面跳转等。
 * use this to intercept all when there’s an outgoing server call and to turn it off when the call is completed.
 */
overallModule.factory('interceptHttp', function ($location, $rootScope) {

    return {
        /*成功请求数据*/
        request: function (receive) {
            if (receive.load != false) {
                $rootScope.overallData.loadingNum++;
            }
            //console.log('request', $rootScope.overallData.loading, receive)
            return receive;
        },

        /*成功返回数据*/
        response: function (response) {
            $rootScope.overallData.loadingNum--;
            //console.log('response', $rootScope.overallData.loading, response)
            return response
        },

        /*请求或返回数据出现错误*/
        requestError: function (err) {
            $rootScope.overallData.loadingNum--;
            //console.log('requestError', $rootScope.overallData.loading)
            return err;
        },
        responseError: function (err) {
            $rootScope.overallData.loadingNum--;
            //console.log('responseError', $rootScope.overallData.loading)
            return err;
        }
    };
});

/**
 * always we set the changing animation between page changeing
 */
overallModule.run(function ($rootScope, $timeout) {

    /*定义在config中每个path对应controller和view*/
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
        $rootScope.overallData.loadingNum++;
        //console.log('$routeChangeStart', $rootScope.overallData.loading)
    });

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        $rootScope.overallData.loadingNum--;
        //console.log('$routeChangeSuccess', $rootScope.overallData.loading)
    });

    /*所有URL跳转，不管是否在config中定义path*/
    $rootScope.$on('$locationChangeStart', function () {
        $rootScope.overallData.loadingNum++;
        //console.log('$locationChangeStart', $rootScope.overallData.loading)
    });
    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.overallData.loadingNum--;
        //console.log('$locationChangeSuccess', $rootScope.overallData.loading)
    });

});