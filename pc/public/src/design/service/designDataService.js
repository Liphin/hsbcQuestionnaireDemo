/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignDataSer', function () {

    let overallData = {
        editRenderIndex: 0, //当前正在编辑的渲染的组件的index
        viewType: 'phoneView', //phonView为快速预览、miniView为小程序预览

        //表单基础数据，每次进入表单时获取
        sheetConfig: {},

        //手机预览操作
        phoneView: {
            showPhoneView: false, //是否展开手机页面
            sheetOrigin: [],//记录预览时组件原本的配置，用于关闭手机预览页面时回滚操作
        },
    };


    //问卷、表单页面
    let sheet = [];

    //展示在选择列表上的组件
    let widget = [];
    //所有组件信息
    let allWidget = [
        {
            status: true, //展开状态：true、 收回状态：false
            name: '内容',
            sub: [
                {name: '文本描述', type: 'paragraph', font: 'fa fa-paragraph'},
            ]
        },
        {
            status: true, //展开状态：true、 收回状态：false
            name: '单选题',
            sub: [
                {name: '单选题', type: 'single_select', font: 'fa fa-circle'},
                {name: '量表题', type: 'single_scale', font: 'fa fa-power-off'},
                {name: '矩阵单选', type: 'matrix_single_select', font: 'fa fa-list'},
                {name: '矩阵量表', type: 'matrix_single_scale', font: 'fa fa-star-half-o'},
                {name: '下拉单选', type: 'pull_single_select', font: 'fa fa-caret-square-o-down'},
            ]
        },
        {
            status: true,
            name: '多选题',
            sub: [
                {name: '多选题', type: 'multi_select', font: 'fa fa-th-large'},
                {name: '矩阵多选', type: 'matrix_multi_select', font: 'fa fa-table'}
            ]
        },
        {
            status: true,
            name: '填空题',
            sub: [
                {name: '单项填空', type: 'single_fill', font: 'fa fa-tag'},
                {name: '矩阵填空', type: 'matrix_fill', font: 'fa fa-file-text-o'},
                {name: '详情填写', type: 'detail_fill', font: 'fa fa-file-word-o'}
            ]
        },
        {
            status: true,
            name: '模板信息',
            sub: [
                {name: '部门', type: 'template_company', font: 'fa fa-building'},
                {name: '姓名', type: 'template_name', font: 'fa fa-address-card-o'},
                {name: '手机', type: 'template_phone', font: 'fa fa-phone'}
            ]
        }
    ];

    /**
     * 新添加组件后填充的数据
     */
    let newWidgetData = {
        //****************************** 内容 *************************************
        //文本描述
        paragraph: {
            type: 'paragraph',
            data: {
                html: '<p><span>请输入相关文本信息描述</span></p>'
            },
        },

        //******************************* 单选题 ************************************
        //单选题
        single_select: {
            type: 'single_select',
            data: {
                required: false, //必答、非必答选项
                title: '这里输入题干信息',
                selected: 'none',
                cusFill: { //自定义文本
                    status: true, //编辑面板上用到的配置信息
                    text: '', //渲染面板上绑定的其他信息
                },
                option: [
                    {text: '选项1'},
                    {text: '选项2'},
                    {text: '选项3'},
                ],
            },
        },
        //量表题
        single_scale: {
            type: 'single_scale',
            data: {
                required: false, //必答、非必答选项
                title: '这里输入题干信息',
                selected: 'none',
                option: [
                    {text: '极差', value: 0},
                    {text: '不满', value: 1},
                    {text: '一般', value: 2},
                    {text: '满意', value: 3},
                    {text: '极好', value: 4}
                ]
            },
        },

        //矩阵单选
        matrix_single_select: {
            type: 'matrix_single_select',
            data: {
                required: false,
                title: '这里输入题干信息',
                option: [
                    {text: '极差'},
                    {text: '不满'},
                    {text: '一般'},
                    {text: '满意'},
                    {text: '极好'},
                ],
                choice: [
                    {
                        text: '外观',
                        selected: 'none',
                    },
                    {
                        text: '功能',
                        selected: 'none',
                    },
                ]
            }
        },
        //矩阵量表
        matrix_single_scale: {
            type: 'matrix_single_scale',
            data: {
                required: false,
                title: '这里输入题干信息',
                option: [
                    {text: '极差', value: 0},
                    {text: '不满', value: 1},
                    {text: '一般', value: 2},
                    {text: '满意', value: 3},
                    {text: '极好', value: 4},
                ],
                choice: [
                    {
                        text: '外观',
                        selected: 'none',
                    },
                    {
                        text: '功能',
                        selected: 'none',
                    },
                ]
            }
        },
        //下拉单选题
        pull_single_select: {
            type: 'pull_single_select',
            data: {
                required: false, //必答、非必答选项
                title: '这里输入题干信息',
                selected: '0',
                option: [
                    {text: '选项1'},
                    {text: '选项2'},
                    {text: '选项3'},
                ]
            },
        },

        //******************************* 多选题 ************************************
        //多选题
        multi_select: {
            type: 'multi_select',
            data: {
                required: false,
                title: '这里输入题干信息',
                option: [
                    {text: '选项1', status: true},
                    {text: '选项2', status: false},
                    {text: '选项3', status: false},
                ]
            },
        },
        //矩阵多选
        matrix_multi_select: {
            type: 'matrix_multi_select',
            data: {
                required: false,
                title: '这里输入题干信息',
                option: [
                    {text: '快速更快'},
                    {text: '准确度高'},
                    {text: '信息量大'},
                ],
                choice: [
                    {
                        text: '百度',
                        selected: [], //里面装着每个option对应index的true或false
                    },
                    {
                        text: '谷歌',
                        selected: [],
                    },
                ]
            }
        },

        //******************************** 填空题 ***********************************
        //单项填空
        single_fill: {
            type: 'single_fill',
            data: {
                required: false, //必答、非必答选项
                title: '这里输入题干信息',
                value: '',
            }
        },
        //矩阵填空
        matrix_fill: {
            type: 'matrix_fill',
            data: {
                required: false, //必答、非必答选项
                title: '这里输入题干信息',
                option: [
                    {text: '姓名', value: ''},
                    {text: '国籍', value: ''},
                    {text: '工作', value: ''}
                ],
            }
        },
        //详情填空
        detail_fill: {
            type: 'detail_fill',
            data: {
                required: false, //必答、非必答选项
                title: '这里输入题干信息',
                value: '',
            }
        },

        //****************************** 模板题 *************************************
        //模板题：所在部门
        template_company: {
            type: 'pull_single_select',
            data: {
                required: false, //必答、非必答选项
                title: '请选择对应的部门',
                selected: '0',
                option: [
                    {text: 'CMB（商业银行）'},
                    {text: 'RTB（零售银行）'},
                    {text: 'GMB（环球银行）'},
                ]
            },
        },
        //模板题：姓名
        template_name: {
            type: 'single_fill',
            data: {
                required: false, //必答、非必答选项
                title: '请输入您的姓名',
                value: '',
            }
        },
        //模板题：手机
        template_phone: {
            type: 'single_fill',
            data: {
                required: false, //必答、非必答选项
                title: '请输入您的手机号码',
                value: '',
            }
        },
    };

    return {
        overallData: overallData,
        allWidget: allWidget, //所有可选择的组件
        widget: widget, //展示在列表中的可选择的组件
        sheet: sheet, //问卷、表单页面
        newWidgetData: newWidgetData, //新添加的组件填充数据
    }
});