/**
 * Created by Administrator on 2019/6/6.
 */
/**
 * design数据集
 */
sheetModule.factory('designData', function () {

    //全局数据
    let overallData = {
        //加载状态
        loading: true,

        //消息盒子
        messageBox: {
            status: false,
            unfinishedIndex: '', //尚未完成的题目序号index
        },

        //阻断内容, blocker显示时数据内容不显示
        blocker: {
            status: false,
            item: '' //阻断内容显示的提示条目
        },

        //表单配置数据
        config: {
            title: ''
        }
    };

    //所有表单数据集合
    let sheet = [];


    //组件及其类型提交前验证分类
    let widgetResultClassify = {
        single: ['single_select', 'single_scale', 'pull_single_select'],
        multi: ['multi_select'],
        matrix_single: ['matrix_single_select', 'matrix_single_scale'],
        matrix_multi: ['matrix_multi_select'],
        fill_single: ['single_fill', 'detail_fill'],
        fill_multi: ['matrix_fill'],
    };


    return {
        sheet: sheet,
        overallData: overallData,
        widgetResultClassify: widgetResultClassify,
    }
});