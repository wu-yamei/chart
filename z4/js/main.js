$(document).ready(function() {
    //折线图部分
    // $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {
    var bmiData = [20, 17, 28, 20, 14, 23, 15, 17, 19, 20, 12, 17];
    var mon; //月
    var days; //天数
    var isMonth = true; //显示天数
    var options = {
        chart: { //配置
            type: 'spline',
            spacingRight: 20,
            showAxes: true, //空图动态添加数值时是否显示数轴
            plotBackgroundColor: '#fff', //绘图区背景
            renderTo: 'chart'
        },
        title: {
            text: '近期BMI值变化',
            align: 'left',
            style: {
                color: '#333',
                fontSize: '1.4rem'
            }
        },
        xAxis: {
            allowDecimals: false, //坐标轴刻度是否为小数
            gridLineWidth: 0, //网格线宽度
            tickmarkPlacement: 'on', //刻度线位于刻度数中间
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            labels: {
                align: 'center', //轴标签水平对齐方式
                // x: 10,
                y: 25, //刻度坐标
                style: {
                    color: '#666',
                    fontSize: '1.4rem'
                }
            },
            animation: false,
            min: 0,
            max: 5,
            tickWidth: 1, //刻度竖线
            tickInterval: 1,
            lineColor: '#e5e5e5',
            userHIML: true
        },
        yAxis: {
            allowDecimals: false, //控制数轴是否显示小数
            min: 13,
            max: 35,
            animation: false,
            showFirstLabel: false,
            showLastLabel: false,
            gridLineWidth: 1,
            gridLineDashStyle: 'shortDash',
            gridZIndex: 1,
            tickInterval: 6, //step
            tickWidth: 1, //刻度竖线
            lineWidth: 1,
            title: {
                text: '',
                rotation: 0,
                y: -5
            },
            labels: {
                align: 'center',
                style: {
                    color: '#666'
                },
                x: -25,
                y: 5,
            },
            lineColor: '#e5e5e5'
        },
        series: [{
            type: 'area', //渐变区域
            data: bmiData,
            color: '#b4994b',
            lineWidth: 1,
            name: 'BMI',
            fillColor: { //渐变背景
                linearGradient: [0, 0, 0, 130],
                stops: [
                    [0, '#b4994b'],
                    [1, Highcharts.Color('#b4994b').setOpacity(0).get('rgba')]
                ]
            },
            marker: { //交点样式
                fillColor: '#fff',
                lineWidth: 1,
                lineColor: '#b4994b',
                states: {
                    hover: {
                        fillColor: '#b4994b'
                    }
                }
            }
        }],
        tooltip: {
            animation: false,
            backgroundColor: 'rgba(180,153,75,.85)',
            borderRadius: 5,
            hideDelay: 100,
            userHIML: true,
            style: {
                width: '2rem',
                // height: '1em',
                color: '#fff',
                fontSize: '1.4rem',
                lineHeight: '1em'
            },
            formatter: function() {
                return this.y;
            }
        },
        legend: { //折线图标
            enabled: false
        },
        credits: { //隐藏商标
            enabled: false
        },
        exporting: { //隐藏导出按钮
            enabled: false
        }
    };
    // });
    // });
    var chart = new Highcharts.Chart(options);
    //触摸事件
    var sx, sy, mx, my;
    var touchObj = $('#touchObj')[0]; //触摸对象
    touchObj.addEventListener('touchstart', function(e) {
        e.preventDefault();
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
    });
    touchObj.addEventListener('touchmove', function(e) {
        e.preventDefault();
        mx = e.touches[e.touches.length - 1].clientX;
        my = e.touches[e.touches.length - 1].clientY;
    });
    touchObj.addEventListener('touchend', function(e) {
        e.preventDefault();
        var s1 = sx - mx; //触摸点水平方向的距离
        var s2 = sy - my; //触摸点垂直方向的距离
        var xMin = chart.xAxis[0].getExtremes().min; //x轴最小值
        var xMax = chart.xAxis[0].getExtremes().max; //x轴最大值
        if (s1 >= 50 && s2 < 10) { //向右滑动
            if(isMonth){
                // if(xMax == 11){
                //     $(this).unbind(e);
                //     return;
                // }
               chart.xAxis[0].setExtremes(xMax, xMax + 5 < 11? xMax + 5 : 11, true, true);
            }else{
                // if(xMax == days+1){
                //     $(this).unbind(e);
                //     return;
                // }
               chart.xAxis[0].setExtremes(xMax, xMax + 5 < days+1? xMax + 5 : days+1, true, true); 
           }
        } else if (s2 < 50 && s1 < 10) { //向左滑动
            // if(xMin == 0){
            //     $(this).unbind(e);
            //     return;
            // }
            chart.xAxis[0].setExtremes(xMin - 5 > 0 ? xMin - 5 : 0, xMin, true, true);
        } else {
            return;
        };
    });

    // 开关按钮点击事件
    $('.switch').on('click', 'span', function() {
        //是否是闰年
        var isRun = false;
        mon = new Date().getMonth() + 1;
        var fullYear = new Date().getFullYear();
        var date = new Date().getDate();
        run(fullYear);
        if (mon == 3 || 6 || 9 || 11) {
            days = 30;
        } else if (mon == 2) {
            if (isRun) {
                days = 29;
            } else {
                days = 28;
            }
        } else {
            days = 31;
        };
        $(this).addClass('current').siblings('span').removeClass('current'); //开关按钮切换背景
        if ($(this).text() == '月') {
            var today = '<a href="javascript:void(0) style="color:#b4994b">今天</a>';
            var arrDay = [];
            isMonth = false;
            for (var i = 1; i < days + 1; i++) {
                if (i == date) {
                    arrDay.push(today);
                    continue;
                }
                arrDay.push(mon + '/' + i);
            }
            chart.xAxis[0].setCategories(arrDay); //设置x轴刻度
            chart.xAxis[0].setExtremes(date - 5 >= 0 ? date-5 : 0, date); //设置min，max
            return;
        };
        if ($(this).text() == '年') {
            var arrMonth = []; //存放x轴刻度
            isMonth = true;
            for (var i = 1; i < 13; i++) {
                arrMonth.push(i);
            };
            chart.xAxis[0].setCategories(arrMonth);
            // chart.xAxis[0].setExtremes(mon-5 >= 0?mon-5:0, mon); //设置min，max
            chart.xAxis[0].setExtremes(0, 5);
            return;
        }
    });
    //判断闰年方法
    function run(a) {
        if ((a % 4 == 0 && a % 100 != 0) || (a % 400 == 0 && a % 100 == 0)) {
            isRun = true;
        } else {
            isRun = false;
        }
    };

});
