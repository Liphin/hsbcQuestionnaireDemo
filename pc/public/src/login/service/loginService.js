/**
 * Created by Administrator on 2019/5/27.
 */
loginModule.factory('LoginSer', function (LoginDataSer, OverallGeneralSer, $cookies,
                                          OverallDataSer, $location) {

    /**
     * 保存登录信息
     */
    let saveLoginInfo = function (data) {
        //查询有该记录，登录成功，跳转到用户管理界面
        OverallDataSer.overallData.user._id = data._id;
        OverallDataSer.overallData.user.account = LoginDataSer.loginInfo.account;
        OverallDataSer.overallData.user.right = data.right;

        //保存至cookie中
        let newExpireTime = OverallGeneralSer.getNewCookiesExpireDate();
        $cookies.put('_id', OverallDataSer.overallData.user._id, {'expires': newExpireTime});
        $cookies.put('account', OverallDataSer.overallData.user.account, {'expires': newExpireTime});
        $cookies.put('right', OverallDataSer.overallData.user.right, {'expires': newExpireTime});
    };


    /**
     * 登录操作
     */
    let loginOpt = function () {
        //登录请求
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.loginUrl,
            LoginDataSer.loginInfo, res => {
                //账户登录成功
                if (res.status == 200) {
                    //保存登录信息
                    saveLoginInfo(res.data);
                    //跳转页面
                    $location.url('/manage/allSheet');
                }
                //账户尚未注册
                else if (res.status == 401) {
                    alert("密码填写有误");
                }
                //账户不存在
                else if (res.status == 402) {
                    alert("该账号尚未注册");
                }
            })
    };

    /**
     * 注册操作
     */
    let registerOpt = function () {
        //注册请求
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.registerUrl,
            LoginDataSer.loginInfo, res => {

                //该账号注册成功
                if (res.status == 200) {
                    //保存登录信息
                    saveLoginInfo(res.data);

                    //重置账号密码信息
                    LoginDataSer.loginInfo.account = '';
                    LoginDataSer.loginInfo.password = '';

                    //路由到管理页面
                    $location.url('/manage/allSheet');
                }
                //插入数据失败
                else if (res.status == 404) {
                    alert("账号注册失败，请稍后重试");
                }
                //该账号已经被注册过
                else if (res.status == 403) {
                    alert("该账号已被注册过，请尝试注册不同账号名");
                }
                //系统未知出错
                else {
                    alert("系统出错，请稍后重试")
                }
            })
    };


    return {
        loginOpt: loginOpt,
        registerOpt: registerOpt,
    }
});