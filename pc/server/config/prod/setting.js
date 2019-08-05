/**
 * Created by Administrator on 2018/11/3.
 */
let settingData = {
    basePath: "/root/hsbc/questionnaire/front", //基础路径
    domainName: "http://questionnaire.hsbc.liphin.com", //域名设置
    isProd: true, //是否为生产环境
    frontPort: 3301, //前端port
};
//其他配置
settingData['projectPath'] = settingData['basePath'] + "/output/public";
settingData['resourcePath'] = settingData['basePath'] + "/resource";


//http和https服务开启
let certConfig = {
    key: '/root/hsbc/questionnaire/front/cert/questionnaire.hsbc.liphin.com.key',
    cert: '/root/hsbc/questionnaire/front/cert/questionnaire.hsbc.liphin.com.crt',
};


//小程序应用配置
let appConfig = {
    appid: '***',
    secret: '***',
};

//允许的origin
let allowedOrigin = [
    'https://questionnaire.hsbc.liphin.com'
];

module.exports = {
    settingData: settingData,
    appConfig: appConfig,
    certConfig: certConfig,
    allowedOrigin: allowedOrigin,
};
