/**
 * Created by Administrator on 2018/5/15.
 */
/**服务器的测试环境和生产环境配置****************************************************************************/
//根据环境变量加载特定的config文件信息
let targetSetting = require('./config/' + global.env + "/setting");
let basePath = targetSetting['settingData']['basePath']; //项目根文件目录
let projectPath = targetSetting['settingData']['projectPath'];
let resourcePath = targetSetting['settingData']['resourcePath'];
let port = targetSetting['settingData']['frontPort']; //本地port
let isProd = targetSetting['settingData']['isProd']; //是否为生产环境

//其他配置信息
let httpDataLimit = '25mb';
let appConfig = targetSetting['appConfig'];

//全局数据变量
let overallData = {
    'mini': {
        'access_token': '', 'timestamp': 0, 'expire': 0,
    },
};

let crossOrigin = {
    'allowedOrigin': targetSetting.allowedOrigin,
    'methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'credentials': true,
};


module.exports = {
    targetSetting: targetSetting,
    httpDataLimit: httpDataLimit,
    overallData: overallData,
    appConfig: appConfig,
    basePath: basePath,
    projectPath: projectPath,
    resourcePath: resourcePath,
    crossOrigin: crossOrigin,
    isProd: isProd,
    port: port
};