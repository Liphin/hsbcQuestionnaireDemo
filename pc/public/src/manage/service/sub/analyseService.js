/**
 * Created by Administrator on 2019/6/10.
 */
manageModule.factory('AnalyseSer', function ($location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 初始化系统管理数据
     */
    let initAnalyseData = function () {
        //获取系统管理的地址参数
        let param = $location.search();
        //1、查看系统管理数据分析中的目标分析类型和条目
        if (!OverallGeneralSer.checkDataNotEmpty(param.type) || !OverallGeneralSer.checkDataNotEmpty(param.item)) {
            //若type或item为空则重新进入路由
            $location.url('/manage/analyseData?type=sheet&&item=type');
            return;
        }

        //2、分别设置目标分析数据类型条目
        ManageDataSer.analyseData.type = param.type; //分析数据
        ManageDataSer.analyseData.statistic[param.type].item = param.item; //分析条目

        //3、加载所有参与者的问卷数据
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getSystemManagePersonDataUrl, null,
            result => {
                //******************************* 人次数统计数据 **********************************
                //保存人次数统计分析数据
                ManageDataSer.analyseData.statistic.person.data.length = 0; //数据情况
                //循环添加结果数据
                for (let i in result.data) {
                    ManageDataSer.analyseData.statistic.person.data.push(result.data[i])
                }
                //解析数据结果进行排位
                let rankObj = {};
                for (let i in result.data) {
                    //查看rank数组是否包含某sheetid为key的数据，如果包含该key则自增
                    if (rankObj.hasOwnProperty(result.data[i].sheetid)) {
                        rankObj[result.data[i].sheetid].num++;
                    }
                    //若之前尚未存在该key则初始化为1
                    else {
                        //查找_id对应的组件数据
                        let widget = '';
                        for (let j in ManageDataSer.allSheetData) {
                            if (ManageDataSer.allSheetData[j]._id == result.data[i].sheetid) {
                                widget = ManageDataSer.allSheetData[j];
                                break;
                            }
                        }
                        //如果找到该组件则进行数据初始化
                        if (OverallGeneralSer.checkDataNotEmpty(widget)) {
                            rankObj[result.data[i].sheetid] = {
                                num: 1,
                                title: widget.title,
                                status: widget.status == 2 ? '运行中' : '待发布',
                                _id: result.data[i].sheetid
                            };
                        }
                    }
                }
                //清空数组
                ManageDataSer.analyseData.statistic.person.append.rank.length=0;
                //循环添加rankObj到rank数组中
                for(let i in rankObj){
                    ManageDataSer.analyseData.statistic.person.append.rank.push(rankObj[i]);
                }


                //********************************** 问卷数统计数据 ****************************************
                //设置问卷统计分析数据
                ManageDataSer.analyseData.statistic.sheet.data.length = 0; //数据清空
                //循环添加所有表单中目标数据
                for (let i in ManageDataSer.allSheetData) {
                    let item = ManageDataSer.allSheetData[i];
                    ManageDataSer.analyseData.statistic.sheet.data.push({
                        type: item.type,
                        timestamp: item.timestamp,
                    })
                }
            })
    };

    return {
        initAnalyseData: initAnalyseData,
    }
});