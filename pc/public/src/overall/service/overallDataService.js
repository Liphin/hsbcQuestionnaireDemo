/**
 * Created by Administrator on 2018/2/28.
 */

overallModule.factory('OverallDataSer', function ($rootScope) {

    let overallData = {
        'screen': {'width': '', 'height': ''},
        'loginStatus': false,
        'loadingData': false, //
        'requestDataErrorMsg': '尊敬的客户，服务出错，请稍后重试',
        'fileSuffix': ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'png', 'jpeg', 'jpg', 'gif', 'pfx', 'zip'], //文件后缀辅助数据

        //用户信息
        user: {
            _id: '',
            account: '',
            right: '',
        },

        //http请求时等待加载压栈
        loadingNum: 0,

        //执行操作完成后等动画
        finishAnimation: {
            status: false,
            text: '',
        },
    };

    // Url系统各种文件获取的URL设置
    let baseUrlData = {
        frontEndHttp: "http://127.0.0.1:3301/", //前端url
    };

    //http请求的具体路径
    let urlData = {
        //注册登录路由
        loginUrl: baseUrlData.frontEndHttp + "login", //登录操作
        registerUrl: baseUrlData.frontEndHttp + "register", //注册操作

        //表单问卷设计的交互路由
        saveSheetDataUrl: baseUrlData.frontEndHttp + "saveSheetData", //保存表单设计数据
        resourceBaseUrl: baseUrlData.frontEndHttp + "resource/", //资源存放的基路径
        getTargetSheetUrl: baseUrlData.frontEndHttp + "getTargetSheet", //获取指定_id的sheet文档数据

        //表单管理的交互路由
        loadAllSheetUrl: baseUrlData.frontEndHttp + "loadAllSheet", //加载该用户所有表单数据
        createNewSheetUrl: baseUrlData.frontEndHttp + "createNewSheet", //创建新的sheet
        releaseConfigUrl: baseUrlData.frontEndHttp + "releaseConfig", //设置发布状态
        deleteSheetUrl: baseUrlData.frontEndHttp + "deleteSheet", //删除表单
        copySheetUrl: baseUrlData.frontEndHttp + "copySheet", //拷贝表单
        getTargetResultUrl: baseUrlData.frontEndHttp + "getTargetResult", //获取表单填写结果
        emptyTargetRecordUrl: baseUrlData.frontEndHttp + "emptyTargetRecord", //清空目标数据结果
        renameSheetUrl: baseUrlData.frontEndHttp + "renameSheet", //重命名问卷操作
        updatePublishSheetConfigUrl: baseUrlData.frontEndHttp + "updatePublishSheetConfig", //更新已发布的表单数据配置信息

        //数据分析交互路由
        getSystemManagePersonDataUrl: baseUrlData.frontEndHttp + "getSystemManagePersonData", //数据分析

        //权限设置
        getAdminAccountUrl: baseUrlData.frontEndHttp + "getAdminAccount", //获取所有管理员权限的账号
        updateAdminRightUrl: baseUrlData.frontEndHttp + "updateAdminRight", //更新管理员权限的账号
    };

    //用于sql注入filter
    let sqlVerify = [];


    //location.path的重定向
    let redirect = {
        'login': '/login',
        'manage': '/manage',
        'design': '/arbitration/list',
        'arbiListTest': '/arbitration/listTest',
    };


    let zIndexHelper = {
        loading: 5000,
        finishAnimation: 5000,
        phoneView: 1000,
        publishConfig: 1000,
        info: 1000,
    };

    //电脑键盘按键操作
    let keyBoard = {
        "ctrl": false,
    };

    //模态框提示弹出框
    let modalSetting = {
        lg: {},
        sm: {
            manage: {
                emptyAnalyse: false, //清空数据提示模态框
            }
        }
    };

    return {
        keyBoard: keyBoard,
        urlData: urlData,
        redirect: redirect,
        sqlVerify: sqlVerify,
        modalSetting: modalSetting,
        overallData: overallData,
        baseUrlData: baseUrlData,
        zIndexHelper: zIndexHelper,
    }
});
