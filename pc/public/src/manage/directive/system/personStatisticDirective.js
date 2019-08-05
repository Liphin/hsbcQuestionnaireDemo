/**
 * Created by Administrator on 2019/6/10.
 */
/**
 * 问卷参与者人次数——时间统计
 */
manageModule.directive('personStatisticTime', function (OverallGeneralSer, ManageDataSer) {
    return {
        restrict: 'E',
        scope: {
            timeData: '@'
        },
        template: '<div></div>',
        link: function (scope, element) {

            //监听数据集是否发生变化，若发生变化则重新渲染操作
            scope.$watch('timeData', function (newValue, oldValue) {
                //监听数据存在时进行解析
                let timeData = JSON.parse(newValue);
                if (OverallGeneralSer.checkDataNotEmpty(timeData)) {
                    //数据初始化
                    let renObj = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0}, renArray = [];

                    //遍历每个sheet数据添加到renObj中
                    for (let i in timeData) {
                        let date = new Date(timeData[i].timestamp);
                        renObj[date.getMonth() + 1]++;
                    }
                    //renObj装载到renArray中，进行highChart饼状图解析
                    for (let j in renObj) {
                        renArray.push(renObj[j]);
                    }
                    //对数据进行饼状图渲染
                    renderChar(renArray);
                }
            });

            /**
             * 折线图渲染
             */
            let renderChar = function (renArray) {
                Highcharts.setOptions({
                    colors: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
                });
                Highcharts.chart(element[0], {
                    chart: {
                        width: 750,
                        height: 450
                    },
                    title: {
                        text: '各月份问卷参与人次数统计'
                    },
                    xAxis: {
                        categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: {
                        title: {
                            text: '问卷参与人次数（单位：人次）'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:15px;color: #248dc2;font-weight: bold">{point.key}</span>',
                        pointFormat:'<span style="font-size: 15px; color: black"> 参与 </span>' +
                        '<span style="font-size: 15px;color: #248dc2;font-weight: bold">{point.y}</span>' +
                        '<span style="font-size: 15px; color: black"> 人次 </span>'
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: '参与人次数——时间',
                        data: renArray
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                });
            }
        }
    }
});