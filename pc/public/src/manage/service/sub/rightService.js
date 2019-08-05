/**
 * Created by Administrator on 2019/6/12.
 */
manageModule.factory('RightSer', function (OverallGeneralSer, OverallDataSer, ManageDataSer) {

    /**
     * 初始化权限设置的数据
     */
    let initRightData = function () {
        ManageDataSer.rightSetting.adminAccount.length = 0; //清空数据操作
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getAdminAccountUrl, {}, result => {
            //获取数据成功
            if (result.status == 200) {
                //循环赋值该数据至数组
                for (let i in result.data) {
                    ManageDataSer.rightSetting.adminAccount.push(result.data[i]);
                }
            }
            //数据获取失败
            else {
                alert("系统出错，请稍后重试")
            }
        })
    };

    /**
     * 管理员权限设置操作
     */
    let setAdminRight = function (account, right) {
        if(!OverallGeneralSer.checkDataNotEmpty(account)) {
            alert("新授权管理员账号不能为空");
            return
        }
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.updateAdminRightUrl, {account: account, right: right}, result => {
            //更新账号权限成功
            if (result.status == 200) {
                OverallGeneralSer.setFinishAnimation(1500, "更新成功"); //提示更新状态
                initRightData(); //重新获取数据
            }
            //该账号不存在，需更新已有账号的权限
            else if(result.status==401){
                alert("该账号不存在，请更新已有账号的权限")
            }
            //数据获取失败
            else {
                alert("系统出错，请稍后重试")
            }
        })
    };

    return {
        initRightData: initRightData,
        setAdminRight: setAdminRight,
    }
});