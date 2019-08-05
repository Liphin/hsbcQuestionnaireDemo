var yearList = 'yearList';
var monthList = 'monthList';
var dayIcon = 'dayIcon';
var dayTabel = 'day-tabel';
var selectDateClass = 'select-date';


/**
 * 杩斿洖浠婂ぉ鏃ユ湡鏁版嵁
 * @param event
 * @param id
 */
function reBackToday(event, id) {
    event.stopPropagation();
    var d = new Date();
    var currYear = d.getFullYear();
    var currMonth = (d.getMonth() + 1);
    var currentDate = d.getDate();
    $("." + monthList + id).val(currMonth);
    $("." + yearList + id).val(currYear);
    $("." + id).val(currYear + "-" + currMonth + "-" + currentDate);
    ergodicDate(currYear, currMonth, currentDate, id);
}

/**
 * 灞曠ず鏃ユ湡閫夋嫨椤甸潰鍏蜂綋鏁版嵁
 * @param year
 * @param month
 * @param currDate
 * @param id
 */
function ergodicDate(year, month, currDate, id) {
    var preMonthLength = getMonthLength(year, month);
    //娓呯┖鎵€鏈夋棩鏈熸覆鏌撻潰鏉跨殑鏁版嵁
    var dayPanel = $("." + dayTabel + id);
    dayPanel.empty();
    var date1 = new Date(year + "/" + month + "/" + 1).getDay();

    //璁＄畻鏈堜唤闀垮害娓叉煋
    var dayLength = getMonthLength(year, month);
    var dayArr = [];
    for (var m = 1; m < dayLength + 1; m++) {
        dayArr.push(m)
    }
    //杩涜娓叉煋鎿嶄綔锛屽姩鎬佹坊鍔犳棩鏈熻妭鐐瑰厓绱�
    for (var k = 0; k < 6; k++) {
        var li1;
        if (k == 5) {
            li1 = $('<li></li>');
        } else {
            li1 = $('<li class="tabel-line"></li>');
        }
        var ul2 = $('<ul class="tabel-ul"></ul>');
        for (var n = 0; n < 7; n++) {
            if (k == 0 && n < date1) {
                if (currDate < 7 && (preMonthLength - date1 + n + 1) == currDate) {
                    if (n == 6) {
                        ul2.append('<li class="table-li-rect">' + "</li>")
                    } else {
                        ul2.append('<li class="table-li-rect">' + "</li>")
                    }
                } else {
                    if (n == 6) {
                        ul2.append('<li class="table-li-rect">' + "</li>")
                    } else {
                        ul2.append('<li class="table-li-rect">' + "</li>")
                    }
                }
            } else {
                if (k == 0) {
                    if (currDate < 7 && (dayArr[n - date1]) == currDate) {
                        if (n == 6) {
                            ul2.append('<li type="date" class="tabel-li active weekColor">' + dayArr[n - date1] + "</li>")
                        } else {
                            ul2.append('<li type="date" class="tabel-li active">' + dayArr[n - date1] + "</li>")
                        }
                    } else {
                        if (n == 6) {
                            ul2.append('<li type="date" class="tabel-li weekColor">' + dayArr[n - date1] + "</li>")
                        } else {
                            ul2.append('<li type="date" class="tabel-li">' + dayArr[n - date1] + "</li>")
                        }
                    }
                } else {
                    if ((k * 7 - date1 + n + 1) > dayArr.length) {
                        break
                    } else {
                        if (currDate >= 2 && (k * 7 - date1 + n + 1) == currDate) {
                            if (n == 0 || n == 6) {
                                ul2.append('<li type="date" class="tabel-li active weekColor">' + (k * 7 - date1 + n + 1) + "</li>")
                            } else {
                                ul2.append('<li type="date" class="tabel-li active">' + (k * 7 - date1 + n + 1) + "</li>")
                            }
                        } else {
                            if (n == 0 || n == 6) {
                                ul2.append('<li type="date" class="tabel-li weekColor">' + (k * 7 - date1 + n + 1) + "</li>")
                            } else {
                                ul2.append('<li type="date" class="tabel-li">' + (k * 7 - date1 + n + 1) + "</li>")
                            }
                        }
                    }
                }
            }
        }
        li1.append(ul2);
        dayPanel.append(li1);
    }
}

/**
 * 杩斿洖璇ユ湀浠芥棩鏈熼暱搴�
 * @param year
 * @param month
 * @returns {number}
 */
function getMonthLength(year, month) {
    //鏍规嵁骞翠唤鍒ゅ畾鏄惁骞冲勾杩樻槸娑﹀勾
    function isLeapYear(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)
    }

    //杩斿洖鏈€缁堟湀浠藉ぉ鏁�
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        month = 30;
        return month
    } else {
        if (month == 2) {
            if (isLeapYear(year) == true) {
                month = 29;
                return month
            } else {
                month = 28;
                return month
            }
        } else {
            month = 31;
            return month
        }
    }
}

/**
 * 鏈堜唤鍜屽勾浠芥洿鏀规搷浣滐紝鏃ユ湡涓嶅彉
 * @param event
 * @param id
 */
function monthYearChange(event, id) {
    event.stopPropagation();
    //鍥炴樉鏃ユ湡閫夋嫨鐨勫唴瀹�
    var textInput = $("." + id);
    var date = textInput.val();
    var yearValue = $("." + yearList + id).val();
    var monthValue = $("." + monthList + id).val();
    var currentDate = date.split('-')[2];
    ergodicDate(yearValue, monthValue, currentDate, id);
    //鏇存敼骞翠唤鍜屾湀浠斤紝鏈€鍚庢湀浠界殑澶╂暟涓嶅彉
    textInput.val(yearValue + "-" + monthValue + "-" + currentDate);
}

/**
 * 鏃堕棿閫夋嫨鍣ㄦ洿鏀规暟鎹搷浣�
 * @param ele
 * @param event
 * @param id
 */
function dataPanelHideShow(ele, event, id) {
    event.stopPropagation();
    var nextEle = $(ele).next();
    if ($(nextEle).css("display") == "none") {
        //鍒濆鍖栦笅鎷夋鏁版嵁閫夋嫨鐨勬搷浣�
        var textInput = $("." + id);
        var date = textInput.val().split('-');
        $("." + yearList + id).val(date[0]);
        $("." + monthList + id).val(date[1]);
        ergodicDate(date[0], date[1], date[2], id);
        $(nextEle).css("display", "block")
    } else {
        $(nextEle).css("display", "none")
    }
}

/**
 * 鎵撳紑鏃ユ湡閫夋嫨闈㈡澘鍚庯紝鐐瑰嚮閫夋嫨瀵瑰簲鏃ユ湡
 * @param event
 * @param id
 */
function changeDate(event, id) {
    if ($(event.target).attr('type') == 'date') {
        event.stopPropagation();
        //鍥炴樉鏃ユ湡閫夋嫨鐨勫唴瀹�
        var textInput = $("." + id);
        var monthEle = $("." + monthList + id);
        var yearEle = $("." + yearList + id);
        var dayEle = $("." + dayIcon + id);

        var selectDate;
        var selectYear = yearEle.val();
        var selectMonth = monthEle.val();
        var selectDay = $(event.target).html();
        selectDate = selectYear + "-" + selectMonth + "-" + selectDay;

        yearEle.val(selectYear);
        monthEle.val(selectMonth);
        textInput.val(selectDate);
        dayEle.html(selectDay);

        var selectDateEle = $("." + selectDateClass + id);
        console.log("." + selectDateEle + id, selectDateEle)
        if (selectDateEle.css("display") == "none") {
            selectDateEle.css("display", "block")
        } else {
            selectDateEle.css("display", "none")
        }
    }
}


/**
 * 鍒濆鍖栨棩鏈熼€夋嫨鍣紝骞舵坊鍔燞TML鍐呭
 * @param id
 * @param name
 * @param height
 * @returns {string}
 */
function initDatePicker(id, name, height) {
    var picker = "";
    picker += " <div class=\"laydate-box\" style=\"width: 100%;height: 100%\">\n";
    picker += "     <input type=\"text\" name=\"" + name + "\" class=\"form-control laydateInput " + id + "\" placeholder=\"yyyy-MM-dd\" style=\"width: 100%;height: 100%;vertical-align: middle;display: inline-block\"/>\n";
    picker += "     <div onclick=\"dataPanelHideShow(this, event ," + id + ")\" style=\"vertical-align: middle;display: inline-block;position: absolute;right: 15px;top: " + ((height - 25) / 2 + 5) + "px;/*动态更新top值*/;font-size: 12px;cursor: pointer;\">\n";
    picker += "         <span class=\"dayIcon dayIcon" + id + "\" style=\"position: relative;z-index: 5;font-size: 12px; width: 20px; text-align: center; display: inline-block\"></span>\n";
    picker += "         <img src=\"http://viewcoder-bucket.oss-cn-shenzhen.aliyuncs.com/cdn/img/calendar2.png\"  class=\"icon\" style=\"cursor:pointer\"/>\n";
    picker += "     </div>\n";
    picker += "     <div class=\"select-date select-date" + id + "\">\n";
    picker += "         <div class=\"select-date-header\">\n";
    picker += "             <ul class=\"heade-ul\" style='padding: 0;'>\n";
    picker += "                 <li class=\"header-item header-item-one\">\n";
    picker += "                     <select onchange=\"monthYearChange(event, " + id + ")\" onclick='event.stopPropagation()' class=\"yearList yearList" + id + "\"></select>\n";
    picker += "                 </li>\n";
    picker += "                 <li id=\"test\" class=\"header-item header-item-two\" onselectstart=\"return false\">\n";
    picker += "                     <select onchange=\"monthYearChange(event," + id + ")\" onclick='event.stopPropagation()' class=\"monthList monthList" + id + "\"></select>\n";
    picker += "                 </li>\n";
    picker += "                 <li class=\"header-item header-item-three\" onselectstart=\"return false\" >\n";
    picker += "                     <div class=\"btn btn-default\" onclick=\"reBackToday(event, " + id + ")\" style=\"padding: 4px 12px;outline:none\">回到今天</div>\n";
    picker += "                 </li>\n";
    picker += "             </ul>\n";
    picker += "         </div>\n";
    picker += "         <div class=\"select-date-body\" style=\"cursor:pointer\">\n";
    picker += "             <ul class=\"week-list\">\n";
    picker += "                 <li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>\n";
    picker += "             </ul>\n";
    picker += "             <ul class=\"day-tabel" + id + "\" onclick=\"changeDate(event, " + id + ")\" style=\"padding: 0;\"></ul>\n";
    picker += "         </div>\n";
    picker += "     </div>\n";
    picker += "</div>\n";
    return picker;
}


/**
 * 触发获取日期数据
 */
function triggerDatePicker() {
    /**
     * 娓叉煋姣忎釜鏃ユ湡閫夋嫨鍣�
     */
    $(".viewcoder-datepicker").each(function () {
        var pickerStr = initDatePicker($(this).attr('id'), $(this).attr('name'), parseInt($(this).css('height')));
        $(this).attr('name',null); //娓呴櫎鏈€澶栧眰缁勪欢鐨刵ame鍊�
        $(this).html(pickerStr);
    });

    /**
     * 骞存湀鏃ユ椂闂撮€夋嫨鍣�
     * @type {Array}
     */
    var yearArr = [];
    var monthArr = [];
    for (var i = 1900; i < 2099; i++) {
        yearArr.push(i + "年");
        var optionYear = '<option value="' + i + '">' + i + "年" + "</option>";
        $(".yearList").append(optionYear)
    }
    for (var j = 1; j < 13; j++) {
        monthArr.push(j + "月");
        var optionMonth = '<option value="' + j + '">' + j + "月" + "</option>";
        $(".monthList").append(optionMonth)
    }

    /**
     * 鍒濆鍖栧綋鍓嶆棩鏈熸椂闂达細骞�/鏈�/鏃�
     * @type {Date}
     */
    var d = new Date();
    var currYear = d.getFullYear();
    var currMonth = (d.getMonth() + 1);
    var currDate = d.getDate();
    $(".laydateInput").val(currYear + "-" + currMonth + "-" + currDate);
    $(".dayIcon").html(currDate);
}



//选择日期时的展示与隐藏
$(window).click(function () {
    console.log('click window')
    $(".select-date").each(function () {
        if ($(this).css("display") == "block") {
            $(this).css("display", "none")
        }
    })
});




$(function () {


});