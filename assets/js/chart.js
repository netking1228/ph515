


    var myChart = echarts.init(document.getElementById('main'));

    //input的min和max
    function checkDate() {
        var selectedDate = new Date(document.getElementById('currentDate').value);
        var minDate = new Date('2023-01-01'); // 设置最小日期
        var maxDate = new Date('2024-04-30'); // 设置最大日期

        if (selectedDate < minDate || selectedDate > maxDate) {
            alert('請選擇 2023-01-01 至 2024-04-30 的範圍');
            document.getElementById('currentDate').value = today; // 設置日期為今天

            // 更新圖表
            updateChart();

        }
    }


    // 获取当前日期并格式化为 YYYY-MM-DD
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // 月份是从 0 开始的
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // 设置当前日期为日期输入框的值
    var currentDateInput = document.getElementById('currentDate');
    currentDateInput.value = today;





    // 將字符串格式的日期轉換為 JavaScript Date 對象
    data.forEach(item => {
        item.datetime = new Date(item.datetime);
    });



    // 獲取日期 input 元素
    var dateInput = document.getElementById('currentDate');

    function updateChart() {


        // 獲取選中的日期
        var selectedDate = new Date(dateInput.value);

        // 過濾數據以僅顯示所選日期的數據
        var filteredData = data.filter(item => {
            var date = new Date(item.datetime);
            return date.toDateString() === selectedDate.toDateString();
        });

        var filteredData_open = [];

        //格式涵數
        function formatTime(timeStr) {
            const time = new Date(timeStr);
            const hours = time.getHours().toString().padStart(2, '0');
            const minutes = time.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }






        // 刪除舊的圖表
        myChart.dispose();

        // 創建新的圖表
        myChart = echarts.init(document.getElementById('main'));





        // 配置新的圖表選項
        var option = {
            // 線的顏色
            visualMap: {
                show: false, // 不顯示圖標
                pieces: [
                    {
                        gt: -200,
                        lte: 0,
                        color: '#93CE07'
                    },
                    {
                        gt: 0,
                        lte: 200,
                        color: '#FBDB0F'
                    }

                ],
            },

            title: {
                text: '潮汐高度變化圖表',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            xAxis: {
                type: 'time',
                axisLabel: {
                    formatter: function (value) {
                        const date = new Date(value);
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        // 如果需要精确到分钟数，可以根据需要格式化时间
                        return `${hours}:${minutes}`;
                    },

                }
            },
            yAxis: {
                type: 'value',
                name: '潮汐高度（cm）'
            },
            series: [{
                name: '潮汐高度',
                type: 'line',

                data: filteredData.map(item => {
                    return {
                        value: [item.datetime, item.tideHeight],

                        symbolSize: 10,
                        itemStyle: {
                            color: item.tideHeight > 0 ? '#FBDB0F' : '#93CE07' // 滿潮為藍色，乾潮為橘色
                        },
                        label: {
                            show: true,
                            formatter: function (params) {
                                return item.tideHeight > 0 ? '滿潮' : '乾潮'; // 標示「滿潮」或「乾潮」
                            },
                            position: 'top' // 標籤位置在數據點上方
                        }
                    };
                }),

                smooth: true,

                markArea: {
                    itemStyle: {
                        color: 'rgba(0, 176, 80, 0.3)'
                    },
                    data: openx.filter(item => {
                        var date_open = new Date(item.opentime);
                        var date_close = new Date(item.closetime);

                        return (
                            date_open.toDateString() === selectedDate.toDateString() &&
                            date_close.toDateString() === selectedDate.toDateString()
                        );
                    }).map(item => {
                        return [
                            {
                                name: `步道開放 ${formatTime(item.opentime)}-${formatTime(item.closetime)}`,
                                xAxis: item.opentime
                            },
                            {
                                xAxis: item.closetime
                            }
                        ];
                    }),
                    label: {
                        show: true,
                        position: 'top', // 或者其他位置，比如 'insideTop'
                        fontSize: 15, // 设置字体大小
                        color: 'red' // 设置字体颜色
                        // 可以设置更多样式，比如 fontFamily、fontWeight 等
                    }
                }


            }]
        };

        // 設置新的圖表選項並渲染
        myChart.setOption(option);
    }


    window.addEventListener('resize', function () {
        myChart.resize();
    });
    updateChart()
