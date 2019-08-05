/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('AllSheetSer', function ($cookies, $location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 加载所有表单数据
     */
    let loadAllSheet = function (callback) {
        ManageDataSer.allSheetData.length = 0; //数据清空初始化操作
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.loadAllSheetUrl,
            {userid: OverallDataSer.overallData.user._id, right: OverallDataSer.overallData.user.right}, function (result) {
                if (result.status == 200) {
                    //根据创建时间先后排序
                    result.data.sort((a, b) => {
                        return b.timestamp - a.timestamp
                    });
                    //赋值从后台获取的数据
                    for (let i in result.data) {
                        ManageDataSer.allSheetData.push(result.data[i]);
                    }
                    //如果callback函数不为空则执行
                    if (callback != undefined) {
                        callback();
                    }
                }
                else if (result.status == 401) {
                    alert("数据加载失败，请稍后重试")
                }
            })
    };


    //**************************************** 表单操作 ********************************************
    /**
     * 编辑操作
     */
    let editOpt = function (sheet) {
        //文档处于草稿状态，可以进入编辑
        if (sheet.status == 1) {
            $location.path('/design/' + sheet._id);
        }
        //当前文档处于发布状态，需停止后才能进入编辑页面
        else {
            alert("当前文档处于发布中状态，需停止后才能进行文档编辑")
        }
    };


    /**
     * 设置发布、停止状态
     */
    let releaseOpt = function (sheet, status) {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.releaseConfigUrl,
            {_id: sheet._id, status: status}, result => {
                if (result.status == 200) {
                    //更新状态成功后，重新加载页面数据
                    loadAllSheet();
                }
                //更新失败
                else {
                    alert("系统出错，请稍后重试");
                }
            })
    };


    /**
     * 删除对应表单数据
     */
    let deleteOpt = function (sheet) {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.deleteSheetUrl,
            {_id: sheet._id, status: status}, result => {
                if (result.status == 200) {
                    //更新状态成功后，重新加载页面数据
                    loadAllSheet();
                }
                //更新失败
                else {
                    alert("删除出错，请稍后重试");
                }
            })
    };


    /**
     * 拷贝对应表单数据
     */
    let copyOpt = function (sheet) {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.copySheetUrl,
            {_id: sheet._id, status: status}, result => {
                if (result.status == 200) {
                    //更新状态成功后，重新加载页面数据
                    loadAllSheet();
                }
                //更新失败
                else {
                    alert("拷贝出错，请稍后重试");
                }
            })
    };


    /**
     * 对创建过的表单进行操作
     * @param type
     * @param index
     * @param param
     */
    let sheetOpt = function (type, index, param) {
        let sheet = ManageDataSer.allSheetData[index];
        switch (type) {
            case 'edit': {
                editOpt(sheet);
                break;
            }
            case 'analyse': {
                $location.url('/manage/analyseSheet?_id=' + sheet._id);
                break;
            }
            case 'release': {
                releaseOpt(sheet, param);
                break;
            }
            case 'qrcode': {
                let qrCodeUrl = OverallDataSer.urlData.resourceBaseUrl + 'qrcode/' + sheet._id + ".jpg";
                ManageDataSer.overallData.miniView.sheetMiniQrCodeUrl = qrCodeUrl;
                ManageDataSer.overallData.miniView.downloadName = sheet.title + "_二维码";
                ManageDataSer.overallData.miniView.showMiniView = true;
                break;
            }
            case 'copy': {
                copyOpt(sheet);
                break;
            }
            case 'delete': {
                deleteOpt(sheet);
                break;
            }
        }
    };


    /**
     * 对表单进行重命名操作
     * @param _id
     * @param index
     */
    let renameSheet = function (_id, index) {
        let sheet = ManageDataSer.allSheetData[index];
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.renameSheetUrl, {
            _id: _id,
            title: sheet.title
        }, result => {
            if (result.status == 200) {
                OverallGeneralSer.setFinishAnimation(1500, "重命名成功");
            }
            //重命名失败
            else {
                alert("很抱歉，重命名出错， 请稍后重试");
            }

            //重新加载页面
            loadAllSheet();
        })
    };


    /**
     * 初始化表单发布配置设置
     * @param index 表单数组的下标
     */
    let initSheetPublishConfig = function (index) {
        ManageDataSer.overallData.configPanel.sheetIndex = index;
        //循环赋值需要配置的数据字段
        for (let i in ManageDataSer.overallData.configPanel.configData) {
            ManageDataSer.overallData.configPanel.configData[i] = ManageDataSer.allSheetData[index][i];
        }
        //展开设置面板
        ManageDataSer.overallData.configPanel.status = true;
    };

    /**
     * 设置发布的问卷内容相关配置
     */
    let setPublishConfig = function () {
        //获取目标更新配置的表单数据
        let widget = ManageDataSer.allSheetData[ManageDataSer.overallData.configPanel.sheetIndex];
        //初始化即将更新的表单数据
        let data = {_id: widget._id, updateData: {}};
        //赋值要更新的配置信息
        for (let i in ManageDataSer.overallData.configPanel.configData) {
            data.updateData[i] = ManageDataSer.overallData.configPanel.configData[i];
        }
        //数据json发送请求
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.updatePublishSheetConfigUrl, data, result => {
            //更新发布配置成功
            if(result.status ==200){
                OverallGeneralSer.setFinishAnimation(1500, "更新发布配置信息成功");
                ManageDataSer.overallData.configPanel.status=false; //关闭配置面板
                loadAllSheet(); //重新加载表单数据
            }
            //更新发布配置失败
            else {
                alert("很抱歉，更新发布配置信息失败，请稍后重试");
            }
        })
    };


    return {
        sheetOpt: sheetOpt,
        renameSheet: renameSheet,
        loadAllSheet: loadAllSheet,
        setPublishConfig: setPublishConfig,
        initSheetPublishConfig: initSheetPublishConfig,
    }
});




