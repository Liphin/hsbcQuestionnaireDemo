/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('ManageDataSer', function () {
    let overallData = {
        navigation: 'allSheet', //导航类型

        //在所有问卷表单中，设置打开某个问卷的配置面板
        configPanel: {
            status: false, //是否打开状态
            sheetIndex: '', //需要设置其状态的的index
            configData: {
                open: '',
            }
        },

        //在结果页面中，查看填空题的详情数据弹框显示数据
        fillResult: {
            status: false, //面板展开状态
            type: '', //该题目类型
            index: '', //该题目序号
            title: '', //题目标题
            data: [], //数据集
        },

        //创建新的表单
        newSheet: {
            title: '',
        },

        //所有问卷中，小程序预览操作
        miniView: {
            showMiniView: false, //是否展开小程序预览页面
            sheetMiniQrCodeUrl: '', //小程序二维码
            downloadName: '',//下载二维码名称
        },
    };

    //装载该用户发送过的所有问卷表单数据
    let allSheetData = [];


    //结果统计
    let resultData = {
        sheetIndex: '',
        result: {},
        participant: {},
        sheetClassify: {  //根据不同类型对应展示不同的分析结果数据
            paragraph: ['paragraph'],
            select: ['single_select', 'single_scale', 'pull_single_select', 'multi_select'],
            matrix: ['matrix_single_select', 'matrix_single_scale', 'matrix_multi_select'],
            fill_single: ['single_fill', 'detail_fill'],
            fill_matrix: ['matrix_fill',]
        }
    };


    //数据分析
    let analyseData = {
        type: 'sheet', //选择的系统分析的类型
        statistic: {
            sheet: { //问卷统计
                item: 'type', //问卷统计分析中具体factor中哪个分析类别
                name: '问卷统计', //分析的名称
                data: [], //问卷数据分析的相关数据
            },
            person: { //人次数统计
                item: 'time', //人次数统计分析中具体factor中哪个分析类别
                name: '人次数统计', //数据分析的名称
                data: [], //人次数统计分析的相关数据
                append: {  //附加数据
                    rank: [], //人次数排位统计数据==> sheetid: number
                }
            }
        }
    };


    //权限设置数据
    let rightSetting = {
        adminAccount: [], //所有管理员账号装载数据
        newAdminAccount: '', //新授权的管理员账号数据
    };


    //创建不同类型问卷有不同组件选择类型
    let allSheetType = {
        questionnaire: {
            type: 'questionnaire',
            name: '问卷',
            color: '#fd8c42',
            fontIcon: 'fa fa-newspaper-o',
            depict: '丰富题型，强大逻辑，问卷密码，红包抽奖',
            widgetType: ['paragraph', 'single_select', 'single_scale', 'matrix_single_select', 'matrix_single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']
        },
        vote: {
            type: 'event',
            name: '活动事件',
            color: '#508cc7',
            fontIcon: 'fa fa-futbol-o',
            depict: '活动事件，信息模板，信息统计，数据分析',
            widgetType: ['paragraph', 'single_select', 'single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill',
                'template_company', 'template_name', 'template_phone']
        },
        exam: {
            type: 'vote',
            name: '投票',
            color: '#ba5b9f',
            fontIcon: 'fa fa-bar-chart',
            depict: '图文视频，选项随机，实时排行，微信投票',
            widgetType: ['paragraph', 'single_select', 'single_scale', 'matrix_single_select', 'matrix_single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select']
        },
        form: {
            type: 'exam',
            name: '考试',
            color: '#12ba57',
            fontIcon: 'fa fa-file-text-o',
            depict: '题库抽题，限时作答，成绩查询，自动阅卷',
            widgetType: ['paragraph', 'single_select', 'single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']
        }
    };


    return {
        rightSetting: rightSetting,
        resultData: resultData,
        overallData: overallData,
        allSheetType: allSheetType,
        allSheetData: allSheetData,
        analyseData: analyseData,
    }
});