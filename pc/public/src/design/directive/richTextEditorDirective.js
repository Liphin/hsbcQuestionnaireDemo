/**
 * Created by Administrator on 2018/2/28.
 */

/**
 * 富文本编辑器
 */
designModule.directive('richTextEditor', ['DesignDataSer', function (DesignDataSer) {

    return {
        restrict: 'A',
        scope: {
            paraIndex: '@',
        },
        link: function (scope, ele, attrs) {
            /**
             * 加粗按钮
             * @param context
             */
            let myBold = function (context) {
                let ui = $.summernote.ui;
                let button = ui.button({
                    tooltip: '加粗',
                    contents: function () {
                        let str = "";
                        // str += '<div>';
                        str += '<i class="fa fa-bold" style=";color: grey;"></i>';
                        // str += '加粗</div>';
                        // str += '</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('bold');

                    }
                });
                return button.render();
            };

            /**
             * 斜体字体
             * @param context
             */
            let myItalic = function (context) {
                let ui = $.summernote.ui;
                let button = ui.button({
                    tooltip: '斜体',
                    contents: function () {
                        let str = "";
                        str += '<div>';
                        str += '<i class="fa fa-italic" style="color: grey;"></i>';
                        // str += '斜体</div>';
                        str += '</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('italic');

                    }
                });
                return button.render();
            };

            /**
             * 下划线字体
             * @param context
             */
            let myUnderline = function (context) {
                let ui = $.summernote.ui;
                let button = ui.button({
                    tooltip: '下划线',
                    contents: function () {
                        let str = "";
                        str += '<div>';
                        str += '<i class="fa fa-underline" style="color: grey;"></i>';
                        //str += '下划线</div>';
                        str += '</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('underline');

                    }
                });
                return button.render();
            };


            /**
             * 居左按钮
             * @param context
             */
            let myAlignLeft = function (context) {
                let ui = $.summernote.ui;
                let button = ui.button({
                    tooltip: '居左',
                    contents: function () {
                        let str = "";
                        str += '<div>';
                        str += '<i class="fa fa-align-left" style=";color: grey;"></i>';
                        //str += '居左</div>';
                        str += '</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyLeft');

                    }
                });
                return button.render();
            };

            /**
             * 下划线字体
             * @param context
             */
            let myAlignRight = function (context) {
                let ui = $.summernote.ui;
                let button = ui.button({
                    tooltip: '居右',
                    contents: function () {
                        let str = "";
                        str += '<div>';
                        str += '<i class="fa fa-align-right" style=";color: grey;"></i>';
                        //str += '居右</div>';
                        str += '</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyRight');

                    }
                });
                return button.render();
            };

            /**
             * 居中
             * @param context
             */
            let myAlignCenter = function (context) {
                let ui = $.summernote.ui;
                let button = ui.button({
                    tooltip: '斜体',
                    contents: function () {
                        let str = "";
                        str += '<div>';
                        str += '<i class="fa fa-align-center" style=";color: grey;"></i>';
                        //str += '居中</div>';
                        str += '</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyCenter');

                    }
                });
                return button.render();
            };

            /**
             * 把富文本框编辑的数据实时响应到
             */
            let refreshData = function () {
                scope.$apply(function () {
                    DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex].data.html = ele.summernote("code");
                });
            };

            ele.summernote({
                height: 300,
                fontNames: ['微软雅黑', '宋体', '黑体', '华文行楷', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
                fontSizes: ['12', '14', '16', '18', '20', '24', '28', '32'],

                toolbar: [
                    ['style', ['bold', 'italic', 'underline']],
                    ['para', ['myalignleft', 'myaligncenter', 'myalignright']],
                    ['other',['link', 'codeview' ,'fullscreen']],
                    ['front', ['fontname', 'fontsize', 'color']]
                ],
                buttons: {
                    mybold: myBold,
                    myitalic: myItalic,
                    myunderline: myUnderline,

                    myalignleft: myAlignLeft,
                    myalignright: myAlignRight,
                    myaligncenter: myAlignCenter,
                }
            });

            let summernoteInitMark = false;

            //监听富文本框内容变化事件
            ele.on('summernote.change', function (we, contents, $editable) {
                //第一次进入summernote后无需change监听，否则会重复执行angularjs的digest
                if (!summernoteInitMark) {
                    //更新数据操作
                    refreshData();

                } else {
                    summernoteInitMark = false;
                }
            });

            /**
             * 监听同样段落组件，选择不同index进入后不同响应
             */
            scope.$watch('paraIndex', function (newValue, oldValue) {
                if (newValue && newValue != '') {
                    summernoteInitMark = true;
                    //初始化富文本框HTML内容
                    ele.summernote('code', DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex].data.html); //加载初始化的code
                }
            });
        },
    }
}]);
