/**
 * Created by Administrator on 2019/6/6.
 */
/**
 * design的方法体
 */
sheetModule.factory('designSer', function ($http, designData, $location) {

    /**
     * 对数据进行判空处理
     * @param data
     */
    let checkDataNotEmpty = function (data) {
        let status = false;
        if (data != null && data != undefined && data != 'NaN') {
            //根据变量的不同类型进行判空处理
            switch (Object.prototype.toString.call(data)) {
                /*String类型数据*/
                case '[object String]': {
                    if (data.trim() != '') {
                        status = true;
                    }
                    break;
                }
                /*Array类型*/
                case '[object Array]': {
                    if (data.length > 0) {
                        status = true;
                    }
                    break;
                }
                /*Object类型*/
                case '[object Object]': {
                    if (Object.keys(data).length > 0) {
                        status = true;
                    }
                    break;
                }
                /*其他类型状态默认设置为true，分别为Number和Boolean类型*/
                default: {
                    status = true;
                    break;
                }
            }
        }
        return status;
    };


    /**
     * 初始化获取数据等操作
     */
    let init = function (_id, openid) {
        //获取目标表单数据
        $http.post("/checkAndGetTargetSheet", {_id: _id, openid: openid}).success(function (response) {
            if (response.status == 200) {
                let data = response.data[0];
                //若已发布状态，展示页面数据
                if (data.status == 2) {
                    //循环填充config数据
                    for (let i in data) {
                        designData.overallData.config[i] = data[i];
                    }
                    //循环填充sheet数据
                    for (let i in data.sheet) {
                        designData.sheet[i] = data.sheet[i];
                    }
                    console.log(designData.sheet)
                }
                //尚未发布状态
                else {
                    designData.overallData.config.title = data.title;
                    designData.overallData.blocker.item = 'notPublish';
                    designData.overallData.blocker.status = true;
                }
            }
            //如果返回码是301，该用户已经提交过了，展示切勿再次提交信息框
            else if (response.status == 301) {
                //设置config数据，标题使用
                let data = response.data[0];
                //循环填充config数据
                for (let i in data) {
                    designData.overallData.config[i] = data[i];
                }
                //设置已经提交过了的状态
                designData.overallData.blocker.item = 'hasSubmitted';
                designData.overallData.blocker.status = true;
            }
            //数据获取失败
            else {
                alert("很抱歉，系统出错，请稍后重试");
            }
        }).error(function (err) {
            alert("很抱歉，系统出错，请稍后重试");

        }).finally(function () {
            designData.overallData.loading = false;
        });
    };


    /**
     * 获取某问题的序号
     * @param index
     * @returns {number}
     */
    let getQuestionnaireNum = function (index) {
        //遍历问题表单到index前的每个选项，去除所有为paragraph类型的数据
        let paraNum = 0;
        for (let i = 0; i < index; i++) {
            if (designData.sheet[i].type == 'paragraph') {
                paraNum++;
            }
        }
        return index - paraNum + 1; //从1开始
    };


    /**
     * 检测所有必填项都已有填写
     */
    let checkAllRequiredItemFilled = function () {
        //遍历每个组件
        for (let i in designData.sheet) {
            let widget = designData.sheet[i];
            //对必答题进行检测
            if (widget.data.required) {
                //单选方式
                if (designData.widgetResultClassify.single.indexOf(widget.type) > -1) {
                    let selected = widget.data.selected;
                    //提醒某某题目为必答题，请先填写相关内容后再提交
                    if (selected == 'none') {
                        designData.overallData.messageBox.unfinishedIndex = i;
                        return false;
                    }
                }
                //多选方式
                else if (designData.widgetResultClassify.multi.indexOf(widget.type) > -1) {
                    let hasSelected = 0;
                    //循环遍历多选题的所有选项，统计已选择了的选项
                    for (let j in widget.data.option) {
                        if (widget.data.option[j].status) {
                            hasSelected++
                        }
                    }
                    //提醒某某题目为必答题，滚动到该题目上
                    if (hasSelected == 0) {
                        designData.overallData.messageBox.unfinishedIndex = i;
                        return false;
                    }
                }
                //矩阵单选
                else if (designData.widgetResultClassify.matrix_single.indexOf(widget.type) > -1) {
                    //遍历每个choice数组元素
                    for (let j in widget.data.choice) {
                        let selected = widget.data.choice[j].selected;
                        //若有选项为默认的none则弹框提示有题目未填写，并滚动到该题目上
                        if (selected == 'none') {
                            designData.overallData.messageBox.unfinishedIndex = i;
                            return false;
                        }
                    }
                }
                //矩阵多选
                else if (designData.widgetResultClassify.matrix_multi.indexOf(widget.type) > -1) {
                    //遍历每个choice数组元素
                    for (let j in widget.data.choice) {
                        let selectedArray = widget.data.choice[j].selected;
                        //若已选择的数组中没有true项则提示该题目未填写
                        if (selectedArray.indexOf(true) == -1) {
                            designData.overallData.messageBox.unfinishedIndex = i;
                            return false;
                        }
                    }
                }
                //单项填空题检测
                else if (designData.widgetResultClassify.fill_single.indexOf(widget.type) > -1) {
                    if (!checkDataNotEmpty(widget.data.value)) {
                        designData.overallData.messageBox.unfinishedIndex = i;
                        return false;
                    }
                }
                //多项填空题检测
                else if (designData.widgetResultClassify.fill_multi.indexOf(widget.type) > -1) {
                    for (let j in widget.data.option) {
                        if (!checkDataNotEmpty(widget.data.option[j].value)) {
                            designData.overallData.messageBox.unfinishedIndex = i;
                            return false;
                        }
                    }
                }
            }
        }
        //全部通过检测
        return true;
    };


    /**
     * 当有尚未完成的题目时按下提交按钮，则页面滚动到指定未完成的题目
     */
    let scrollToTargetUnfinished = function () {
        //关闭显示面板
        designData.overallData.messageBox.status = false;
        //滚动到尚未填写的目标题目
        $('html, body').animate({
            scrollTop: $("#widget_" + designData.overallData.messageBox.unfinishedIndex).offset().top - 50
        }, 500);
    };


    /**
     * 提交问卷
     */
    let submitSheet = function (openid) {
        //对所有题目进行检测是否已经必填过了，若存在留空必填项返回false，直接返回
        let checkStatus = checkAllRequiredItemFilled();
        if (!checkStatus) {
            designData.overallData.messageBox.status = true;
            return;
        }

        //程序继续执行必填项留空均全部填写完成
        designData.overallData.loading = true;//添加提交loading动画
        //数据封装准备
        let submitData = {
            openid: openid,
            sheetid: designData.overallData.config._id,
            title: designData.overallData.config.title,
            type: designData.overallData.config.type,
            sheet: designData.sheet,
            timestamp: new Date().getTime()
        };
        $http.post("/submitResult", submitData).success(function (response) {
            //取消提交loading动画
            designData.overallData.loading = false;
            //正确返回，跳转至小程序指定页面
            if (response.status == 200) {
                wx.miniProgram.switchTab({url: '/pages/statistics/statistics'})
            }
        }).error(function (err) {
            alert("很抱歉，提交有误，请稍后重试");
        });
    };


    return {
        init: init,
        submitSheet: submitSheet,
        getQuestionnaireNum: getQuestionnaireNum,
        scrollToTargetUnfinished: scrollToTargetUnfinished,
        checkAllRequiredItemFilled: checkAllRequiredItemFilled,
    }
});