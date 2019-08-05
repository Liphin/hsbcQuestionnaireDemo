/**
 * Created by Administrator on 2019/5/30.
 */

manageModule.factory('ResultSer', function ($location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 初始化分析数据
     */
    let initResultData = function () {

        //1、获取目标问卷的index
        let param = $location.search();

        //如果目标问卷id参数为空处理规则且
        if (!OverallGeneralSer.checkDataNotEmpty(param._id)) {
            //若参数为空则取第一个页面元素_id，若问卷页面总数大于0则跳转，否则停止向下运行
            if (ManageDataSer.allSheetData.length > 0) {
                $location.url('/manage/resultStatistic?_id=' + ManageDataSer.allSheetData[0]._id)

            } else {
                return
            }
            return;
        }

        //初始化目标sheet数组的index
        for (let i in ManageDataSer.allSheetData) {
            if (param._id == ManageDataSer.allSheetData[i]._id) {
                ManageDataSer.resultData.sheetIndex = i; //记录目标数据的index
            }
        }

        //2、清空之前数据
        for (let i in ManageDataSer.resultData.result) {
            delete ManageDataSer.resultData.result[i];
        }

        //3、获取提交表单数据结果
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getTargetResultUrl, {sheetid: param._id}, result => {
            if (result.status == 200) {
                //重新赋值result对象数组，如数据被清空则无需赋值操作
                if (OverallGeneralSer.checkDataNotEmpty(result.data[0].result)) {
                    for (let i in result.data[0].result) {
                        ManageDataSer.resultData.result[i] = result.data[0].result[i];
                    }
                }
            }
            //获取数据失败
            else {
                alert("系统出错，请稍后重试");
            }
        })
    };


    /**
     * 获取某问题的序号
     * @param index
     */
    let getQuestionnaireNum = function (index) {
        //遍历问题表单到index前的每个选项，去除所有为paragraph类型的数据
        let paraNum = 0;
        let targetSheet = ManageDataSer.allSheetData[ManageDataSer.resultData.sheetIndex];
        for (let i = 0; i < index; i++) {
            if (targetSheet.sheet[i].type == 'paragraph') {
                paraNum++;
            }
        }
        return index - paraNum + 1; //从1开始
    };


    /**
     * 数据统计分析时一些数据计算
     */
    let getStatisticNum = function (type, data, data2) {
        switch (type) {
            //小计统计
            case 'selectMinCount': {
                return data > 0 ? data : 0;
            }
            //百分比计算
            case 'selectPercent': {
                let num = data > 0 ? data : 0;
                let total = 0;
                for (let i in data2) {
                    //如果是other类型则添加该数组的个数，否则直接添加该选项选择的人数数字
                    if (i == 'other') {
                        total += data2[i].length;
                    } else {
                        total += data2[i];
                    }
                }
                let result = (parseFloat(num) / total * 100).toFixed(2);
                return OverallGeneralSer.checkDataNotEmpty(result) ? result : 0;
            }
            //总数统计
            case 'selectSum': {
                let total = 0;
                for (let i in data) {
                    //如果是other类型则添加该数组的个数，否则直接添加该选项选择的人数数字
                    if (i == 'other') {
                        total += data[i].length;
                    } else {
                        total += data[i];
                    }
                }
                return OverallGeneralSer.checkDataNotEmpty(total) ? total : 0;
            }
            //matrix类型百分比计算
            case 'matrixPercent': {
                let num = data > 0 ? data : 0;
                let total = 0;
                for (let i in data2) {
                    total += data2[i];
                }
                let result = (parseFloat(num) / total * 100).toFixed(2);
                return OverallGeneralSer.checkDataNotEmpty(result) ? result : 0;
            }
            //matrix类型汇总计算
            case 'matrixSum': {
                let total = 0;
                for (let i in data) {
                    for (let j in data[i]) {
                        total += data[i][j];
                    }
                }
                return OverallGeneralSer.checkDataNotEmpty(total) ? total : 0;
            }
        }
    };


    /**
     * 下载打印分析结果数据
     */
    let downloadResult = function () {
        let analyseEle = $("#resultStatisticContent");
        let height = analyseEle.height();
        let fileName = ManageDataSer.allSheetData[ManageDataSer.resultData.sheetIndex].title + "_数据统计分析";
        //截屏函数
        html2canvas(analyseEle[0], {
            height: height,
            width: 800,
            windowWidth: 1360,
            windowHeight: height + 100,
        }).then(canvas => {
            //创建新的canvas，用于装载截屏canvas
            let imgCanvas = document.createElement("canvas");
            imgCanvas.width = 900;
            imgCanvas.height = height + 200;
            let ctx = imgCanvas.getContext("2d");

            //设置背景颜色
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 900, height + 200);

            //设置截屏的图片
            ctx.drawImage(canvas, 50, 50, 800, height + 100);
            let dataUrl = imgCanvas.toDataURL("image/jpeg", 1.0);

            //新建a元素，用于触发点击下载操作
            let element = document.createElement('a');
            element.setAttribute('href', dataUrl);
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    };


    /**
     * 清空统计数据
     */
    let emptyResult = function () {
        let param = $location.search();
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.emptyTargetRecordUrl,
            {_id: param._id}, result => {
                //清空数据成功
                if (result.status == 200) {
                    OverallGeneralSer.setFinishAnimation(1500, "数据清空成功");
                    initResultData(); //重新初始化数据
                }
                //清空数据失败
                else {
                    alert("清空数据失败，请稍后重试")
                }
            })
    };


    /**
     * 查看填空题的数据结果
     * @param index
     * @param subIndex
     */
    let viewFillResultDetail = function (index, subIndex) {
        let widget = ManageDataSer.allSheetData[ManageDataSer.resultData.sheetIndex];
        let widgetItem = widget.sheet[index];
        ManageDataSer.overallData.fillResult.type = widgetItem.type;
        ManageDataSer.overallData.fillResult.title = widgetItem.data.title;
        ManageDataSer.overallData.fillResult.index = index;
        ManageDataSer.overallData.fillResult.data.length = 0;
        ManageDataSer.overallData.fillResult.status = true;
        //单项填空题或单项详情题
        if (ManageDataSer.resultData.sheetClassify.fill_single.indexOf(widgetItem.type) > -1) {
            //循环遍历每个结果数据，并添加到fillResult数组中
            for (let i in ManageDataSer.resultData.result[widgetItem.timestamp]) {
                ManageDataSer.overallData.fillResult.data.push(ManageDataSer.resultData.result[widgetItem.timestamp][i]);
            }
        }
        //矩阵填空题
        else if (ManageDataSer.resultData.sheetClassify.fill_matrix.indexOf(widgetItem.type) > -1) {
            ManageDataSer.overallData.fillResult.title += (" | " + widgetItem.data.option[subIndex].text);
            //循环遍历每个矩阵填空子结果数据，并添加到fillResult数组中
            for (let i in ManageDataSer.resultData.result[widgetItem.timestamp][subIndex]) {
                ManageDataSer.overallData.fillResult.data.push(ManageDataSer.resultData.result[widgetItem.timestamp][subIndex][i]);
            }
        }
        //单选题，有other选项数据
        else if (['single_select'].indexOf(widgetItem.type) > -1) {
            ManageDataSer.overallData.fillResult.title += " | 其他选项";
            for (let i in ManageDataSer.resultData.result[widgetItem.timestamp].other) {
                ManageDataSer.overallData.fillResult.data.push(ManageDataSer.resultData.result[widgetItem.timestamp].other[i]);
            }
        }
    };


    return {
        getQuestionnaireNum: getQuestionnaireNum,
        initResultData: initResultData,
        getStatisticNum: getStatisticNum,
        downloadResult: downloadResult,
        emptyResult: emptyResult,
        viewFillResultDetail: viewFillResultDetail,
    }
});