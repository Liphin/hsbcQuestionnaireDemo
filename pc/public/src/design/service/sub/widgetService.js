/**
 * Created by Administrator on 2019/5/22.
 */

designModule.factory('WidgetSer', function (DesignDataSer) {

    /**
     * 添加新组件操作
     * 1、添加此新的组件到表单中
     * 2、对该新添加的组件进行编辑操作
     * @param type
     */
    let addNewWidget = function (type) {
        //1、新的拷贝
        let newWidget = angular.copy(DesignDataSer.newWidgetData[type]);
        //设置组件的timestamp
        newWidget.timestamp = new Date().getTime();
        //2、添加此新的组件到表单中，插入位置是正在编辑的组件后面添加
        DesignDataSer.sheet.splice(DesignDataSer.overallData.editRenderIndex + 1, 0, newWidget);
        //3、对该新添加的组件进行编辑操作
        editWidgetData(DesignDataSer.overallData.editRenderIndex + 1);
    };


    /**
     * 获取某问题的序号
     * @param index
     */
    let getQuestionnaireNum = function (index) {
        //遍历问题表单到index前的每个选项，去除所有为paragraph类型的数据
        let paraNum = 0;
        for (let i = 0; i < index; i++) {
            if (DesignDataSer.sheet[i].type == 'paragraph') {
                paraNum++;
            }
        }
        return index - paraNum + 1; //从1开始
    };


    /**
     * 编辑该组件的数据
     */
    let editWidgetData = function (index) {
        //1、设置自动绑定的编辑题目的位置信息
        DesignDataSer.overallData.editRenderIndex = index;
    };


    /**
     * 对组件的操作
     * @opt 操作类型
     * @index 组件所在表单数组的下标
     */
    let widgetOpt = function (opt, index) {
        //对应的表单组件信息
        let widget = DesignDataSer.sheet[index];
        switch (opt) {
            case 'copy': {
                DesignDataSer.sheet.splice(index, 0, angular.copy(widget));
                break;
            }
            case 'delete': {
                DesignDataSer.sheet.splice(index, 1);
                break;
            }
            //上移操作
            case 'positionUp': {
                //如果不是第一个则可以继续向上移动
                if (index > 0) {
                    //拷贝对应组件信息
                    let newWidget = angular.copy(DesignDataSer.sheet[index]);
                    //删除当前组件元素
                    DesignDataSer.sheet.splice(index, 1);
                    //插入新数据到对应位置
                    DesignDataSer.sheet.splice(index - 1, 0, newWidget);
                }
                break;
            }
            //下移操作
            case 'positionDown': {
                //如果不是最后一个则可以继续向下移动
                if (index < DesignDataSer.sheet.length - 1) {
                    //拷贝对应组件信息
                    let newWidget = angular.copy(DesignDataSer.sheet[index]);
                    //删除当前组件元素
                    DesignDataSer.sheet.splice(index, 1);
                    //插入新数据到对应位置
                    DesignDataSer.sheet.splice(index + 1, 0, newWidget);
                }
                break;
            }
        }
    };


    /**
     * 添加选项操作
     */
    let addOptions = function (param) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //根据不同组件类型执行相应的操作
        switch (widget.type) {
            //单选类型
            case 'single_select': {
                widget.data.option.push({text: '新选项'});
                break;
            }
            case 'multi_select': {
                widget.data.option.push({'text': '新选项', status: false});
                break;
            }
            case 'single_scale': {
                widget.data.option.push({'text': '新项', value: widget.data.option.length});
                break;
            }
            case 'matrix_single_select': {
                if (param == 'choice') {
                    widget.data.choice.push({text: '新项', selected: 'none'})

                } else if (param == 'option') {
                    widget.data.option.push({text: '子项'})
                }
                break;
            }
            case 'matrix_single_scale': {
                if (param == 'choice') {
                    widget.data.choice.push({text: '新项', selected: []})

                } else if (param == 'option') {
                    widget.data.option.push({text: '子项', value: widget.data.option.length})
                }
                break;
            }
            case 'pull_single_select': {
                widget.data.option.push({text: '新选项', value: widget.data.option.length});
                break;
            }
            case 'matrix_multi_select': {
                if (param == 'choice') {
                    widget.data.choice.push({text: '新项', selected: []})

                } else if (param == 'option') {
                    widget.data.option.push({text: '子项'})
                }
                break;
            }
            case 'matrix_fill': {
                widget.data.option.push({text: '新项', value: ''});
                break;
            }
        }
    };

    /**
     * 删除选项操作
     * @param index 选项下标位置
     * @param param
     */
    let deleteOption = function (index, param) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //其他类型默认删除数据集中对应的选项
        if (widget.data[param].length > 1) widget.data[param].splice(index, 1);
    };

    /**
     * 选项上移
     * @param index
     * @param param
     */
    let positionUp = function (index, param) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //原来位置大于0才能上移调整
        if (index > 0) {
            //拷贝一个即将粘贴过来的数据对象
            let newData = angular.copy(widget.data[param][index]);
            //删除数据集中对应的选项
            widget.data[param].splice(index, 1);
            //插入新数据到对应位置
            widget.data[param].splice(index - 1, 0, newData);
        }
    };

    /**
     * 选项下移
     * @param index
     * @param param
     */
    let positionDown = function (index, param) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //原来位置小于数组大小才能下移调整
        if (index < widget.data.option.length - 1) {
            //拷贝一个即将粘贴过来的数据对象
            let newData = angular.copy(widget.data[param][index]);
            //删除数据集中对应的选项
            widget.data[param].splice(index, 1);
            //插入新数据到对应位置
            widget.data[param].splice(index + 1, 0, newData);
        }
    };

    /**
     * 设置或取消设置为默认选中状态
     * @param index
     * @param param
     */
    let setAsDefault = function (index, param) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //对应不同组件不同的初始化设置操作
        switch (widget.type) {
            case 'multi_select': {
                widget.data[param][index].status = !widget.data[param][index].status;
                break;
            }
            case 'pull_single_select': {
                widget.data.selected = index.toString();
                break;
            }
            default: {
                //如果之前已选中默认值，再点一次取消选择，否则选择
                if (widget.data.selected == index) {
                    widget.data.selected = 'none'
                } else {
                    widget.data.selected = index;
                }
                break;
            }
        }
    };


    return {
        widgetOpt: widgetOpt,
        editWidgetData: editWidgetData,
        addNewWidget: addNewWidget,
        addOptions: addOptions,
        deleteOption: deleteOption,
        positionUp: positionUp,
        positionDown: positionDown,
        setAsDefault: setAsDefault,
        getQuestionnaireNum: getQuestionnaireNum,
    }
});





