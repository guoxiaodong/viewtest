<style>
    .itembg { background-color: #f5f7f9; height: 20px; }
    .title , .Flex-title span { font-size: 16px; color: #464C5B; font-weight: normal; }
    .top-value {
        font-size: 30px;
        margin-top: 8px;
    }
    .top-sub-value{
        font-size: 16px;
        color: #9EA7B4;/*颜色没出来*/
        margin-left: 4px;
    }
    .top-desc{
        color: #657180;
        font-size: 12px;
        border-top: 1px solid #D7DDE4;
        line-height: 30px;
    }
    .bottom-title{
        font-size: 16px;
        color: #657180;
        margin-top: 35px;
    }
    .flexItem { margin: 0 15px; padding-top: 15px; }
    .flexItem .flexItem-h { height: 120px; }
    .Flex-title {
        height: 46px; line-height: 46px; border-bottom: 1px solid #D7DDE4; margin: 0 20px;
    }
    .rightMenu .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
        border-bottom: 1px solid #D7DDE4
    }
    .rightMenu .ivu-menu-vertical.ivu-menu-light:after { width: 0; }
    .rightMenu .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        border-left: 2px solid #2d8cf0; border-right: none;
        background: rgba(215,221,228,0.20);
    }
    .tabsName .ivu-tabs-bar { margin-bottom: 0; }
    .tabsName .ivu-tabs-nav-container { font-size: 16px; color: #464C5B; }
</style>
<template>
    <div>
        <div class="innerheader" style="background-color:#ffffff; border-bottom: none">
            <span>预算概览</span>
            <a style="float: right;font-size: 14px;color:#3399FF; " @click="goAdjust">预算调整</a>
        </div>
        <div class="itembg"></div>
        <div>
            <!--顶部四个小方块-->
            <div style="background-color: #f5f7f9">
                <div class="flex">
                    <!--本月预算已使用-->
                    <div class="flex-1" style="background-color: #fff;">
                        <div class="flexItem">
                            <div class="flexItem-h">
                                <span class="title">本月预算已使用</span>
                                <p style="margin: 10px 0;"><span class="top-value"  style="color:#73AAEB">{{top1Data.percent}}%</span><span class="top-sub-value">({{top1Data.expense_money?'￥'+top1Data.expense_money:'0'}})</span></p>
                                <Progress :percent="top1Data.percent" hide-info></Progress>
                            </div>
                            <p class="top-desc"><span>本月预算总量&nbsp;&nbsp;</span><span>{{top1Data.total_money?('¥'+top1Data.total_money):'0'}}</span></p>
                        </div>
                    </div>
                    <!--今日使用量-->
                    <div class="flex-1" style="margin-left: 14px; background-color: #fff;">
                        <div class="flexItem">
                            <div class="flexItem-h">
                                <span class="title">今日使用量</span>
                                <p><span class="top-value" style="color:#C79EB0">{{top2Data.today?'￥'+top2Data.today:'0'}}</span></p>
                                <div id="top2" style="height:40px;">图表</div>
                            </div>
                            <p class="top-desc">
                                日均&nbsp;<span>￥{{top2Data.avg?top2Data.avg:'0'}}</span>
                                &nbsp;&nbsp;&nbsp;日环比&nbsp;<span :style="'color:'+(top2Data.percent>=0?'green':'red')">{{top2Data.percent?top2Data.percent:'0'}}%</span>
                            </p>
                        </div>
                    </div>
                    <!--今日工单数-->
                    <div class="flex-1" style="margin-left: 14px; background-color: #fff;">
                        <div class="flexItem">
                            <div class="flexItem-h">
                                <span class="title">今日工单数</span>
                                <p><span  class="top-value" style="color:#87B9B3">{{top3Data.today?top3Data.today:'0'}}</span></p>
                                <div id="top3" style="height:40px;">图表</div>
                            </div>
                            <p class="top-desc">
                                日均&nbsp;<span>{{top3Data.avg?top3Data.avg:'0'}}</span>
                                &nbsp;&nbsp;&nbsp;日环比&nbsp;<span :style="'color:'+(top3Data.percent>=0?'green':'red')">{{top3Data.percent?top3Data.percent:'0'}}%</span>
                            </p>
                        </div>
                    </div>
                    <!--全年预算已使用-->
                    <div class="flex-1" style="margin-left: 14px; background-color: #fff;">
                        <div class="flexItem">
                            <div class="flexItem-h">
                                <span class="title">全年预算已使用</span>
                                <p  style="margin: 10px 0;"><span  class="top-value" style="color:#F5A623">{{top4Data.percent?top4Data.percent:'0'}}%</span><span class="top-sub-value">(￥{{top4Data.expense_money?top4Data.expense_money:'0'}})</span></p>
                                <Progress :percent="top4Data.percent" hide-info></Progress>
                            </div>
                            <p class="top-desc"><span>全年预算总量&nbsp;¥{{top4Data.total_money?top4Data.total_money:'0'}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="itembg"></div>
        <div>
            <!--中间层-->
            <div style="height:490px">
                <div class="flex" style="background-color: #f5f7f9">
                    <!--预算使用占比class="flex-1"-->
                    <div class="flex-1" style="background-color: #fff;">
                        <div class="Flex-title">
                            <span>预算使用占比</span>
                        </div>
                        <!--分割线-->
                        <div style="margin:15px 20px 0">
                            <RadioGroup v-model="RGSubject" type="button" @on-change="RGSubjectChange">
                                <Radio label="按科目组"></Radio>
                                <Radio label="按科目"></Radio>
                            </RadioGroup>
                        </div>
                        <div>
                            <div id="midPie" style="height:390px;">环形图表</div>
                        </div>

                    </div>
                    <!--预算使用状况一览-->
                    <div class="flex-3" style="background-color:#ffffff;margin-left: 14px; position: relative">
                        <div class="flex">
                            <div class="flex-5">
                                <div>
                                    <!--年月，日期控件-->
                                    <div class="Flex-title">
                                        <span>预算使用状况一览</span>
                                        <DatePicker id="dp2" type="month" placeholder="结束月份" v-model="ymEnd" @on-change="dateChange" style="float:right;width: 120px; margin-top: 7px;"></DatePicker>
                                        <span style="float:right">&nbsp;至&nbsp;</span>
                                        <DatePicker id="dp1" type="month" placeholder="开始月份" v-model="ymBegin" @on-change="dateChange" style="float:right;width: 120px; margin-top: 7px"></DatePicker>
                                        <RadioGroup v-model="RGMY" type="button" @on-change="radioChange"  style="float:right;  margin-right: 15px;">
                                            <Radio label="本月"></Radio>
                                            <Radio label="全年"></Radio>
                                        </RadioGroup>
                                    </div>
                                    <div style="margin: 20px 100px 20px 20px;">
                                        <!--地图图表-->
                                        <div id="map" style="height:370px"></div>
                                    </div>
                                    <!--渐变条-->
                                    <div style="margin: 0 120px 20px 20px;">
                                        <div style="width:auto;height:10px;background: linear-gradient(to right, #C79EB0 20%,#95BB6C 20%,#95BB6C 50%, #FFD700 50%,#FFD700 80%,#73AAEB 80%,#73AAEB 100%);
                                        border-top-left-radius: 5px; border-bottom-left-radius: 5px;border-top-right-radius: 5px; border-bottom-right-radius: 5px; "><!--87B9B3-->
                                        </div>
                                        <div class="flex">
                                            <div class="flex-1">
                                                <span>大于 80%</span>
                                                <!--<div style="background: #C79EB0;height:10px;width:10px"></div><span>大于 80%</span>-->
                                            </div>
                                            <div class="flex-1">
                                                <span>50% ～ 80%</span>
                                                <!--<div style="background: #95BB6C;height:10px;width:10px"></div><span>50% ～ 80%</span>-->
                                            </div>
                                            <div class="flex-1">
                                                <span>20% ～ 50%</span>
                                                <!--<div style="background: #87B9B3;height:10px;width:10px"></div><span>20% ～ 50%</span>-->
                                            </div>
                                            <div class="flex-1">
                                                <span>小于 20%</span>
                                                <!--<div style="background: #73AAEB;height:10px;width:10px"></div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--tab栏-->
                            <div style="position: absolute; right: 20px; top: 46px; height: 430px; border-left: 1px solid #D7DDE4;">
                                <div class="rightMenu">
                                    <Menu ref="Menu" mode="vertical" :active-name="menuData.length && menuData[0].level" style="width: 80px" @on-select="midMenuClick" >
                                        <MenuItem v-for="(item, index) in menuData" :key="index" :name="item.level">{{item.name}}<br/>{{item.count}}个</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <!--<Tabs value="name1" @on-click="midTabClick">
                            <TabPane :label="tab1" name="tab1">
                            </TabPane>
                            <TabPane :label="tab2" name="tab2">
                            </TabPane>
                            <TabPane :label="tab3" name="tab3">
                            </TabPane>
                            <TabPane :label="tab4" name="tab4">
                            </TabPane>
                        </Tabs>-->
                    </div>
                </div>
            </div>
            <div class="itembg" style="height: 40px;"></div>
            <div style="margin: 0 20px;">
                <div class="tabsName">
                    <Tabs value="year" @on-click="bottomTabClick">
                        <TabPane label="年度" name="year">
                        </TabPane>
                        <TabPane label="本月" name="month">
                        </TabPane>
                    </Tabs>
                </div>
                <div class="flex">
                    <!--预算使用趋势分析class="flex-3"-->
                    <div style="position: relative; background-color:#ffffff;border-right: 1px solid #D7DDE4 ;margin-right: 10px">
                            <div class="bottom-title" style="position: absolute; ">预算使用趋势分析</div>
                            <!--底部图表-->
                            <div id="bottomChart" style="height:300px;width:700px; margin-top: 35px;"></div>
                    </div>
                    <!--门店使用量排名class="flex-1"-->
                    <div style="background-color:#ffffff;margin-left: 10px;float: right">
                        <div class="bottom-title">门店使用量排名</div>
                        <div style="margin-top: 10px">
                            <ul>
                                <li v-for="(item, index) in bottomRightData">
                                    <span style="display: inline-block; width: 15px; height: 15px; border-radius: 50%; background-color: #9EA7B4; color: #fff; font-size: 12px; text-align: center; line-height: 15px;">{{index + 1}}</span>&emsp;
                                    <span style="display: inline-block; text-decoration: underline; font-size: 14px; color: #3399FF;">{{item.name}}</span>&emsp;
                                    <span style="font-size: 14px; color: #9EA7B4;">{{item.expense_total}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import echarts from 'echarts'// 必须用这种方式引入，否则地图出不来
    import FinanceHttp from 'server/http/finance'
    import {Format} from '@/util/timeFormat'
    require('echarts/dist/extension/bmap.js') // 必须引入bmap，否则地图出不来
    // import echarts from 'static/plugin/echarts/echarts.js'
    export default {
        data () {
            return {
                top1Data: Object.create(null),
                top2Data: Object.create(null),
                top3Data: Object.create(null),
                top4Data: Object.create(null),
                RGMY: '本月',
                RGSubject: '按科目组',
                RGZS: '实际',
                ymBegin: '', // 开始月份
                ymEnd: '', // 结束月份
                // dateRange: '',
                top2Chart: '',
                top3Chart: '',
                mid1Chart: '',
                midPieChart: '',
                bottomChart: '',
                mapChart: '',
                menuData: [], // TODO 需清空数据，现在用于测试
                curMenu: '', // 用来绑定中间menu选中项
                bottomRightData: [],
                pieData: {
                    subject: null,
                    group: null
                } // 饼图数据
            }
        },
        mounted () {
            this.initData()
            this.radioChange('本月')
            this.bottomTabClick('year')
        },
        created () {
            this.$emit('updateActive', '5-0')
        },
        methods: {
            goAdjust: function () {
                location.href = '/#/BudgetManage/Adjust'
            },
            initData: function () {
                this.top2Chart = echarts.init(document.getElementById('top2'))
                this.top3Chart = echarts.init(document.getElementById('top3'))
                this.midPieChart = echarts.init(document.getElementById('midPie'))
                this.bottomChart = echarts.init(document.getElementById('bottomChart'))
                this.mapChart = echarts.init(document.getElementById('map'))
                FinanceHttp.budgetWebtips()
                    .then(data => {
                        if (data) {
                            // top1
                            this.top1Data = data.month_budget
                            var top1Per = 0
                            var total1 = parseFloat(this.top1Data.total_money)
                            var expense1 = parseFloat(this.top1Data.expense_money)
                            if (!isNaN(total1) && !isNaN(expense1) && total1 != 0) {
                                top1Per = expense1 / total1 * 100
                            }
                            this.top1Data.percent = top1Per
                            // top2
                            this.top2Data = data.today_expense
                            let today = parseFloat(this.top2Data.today)
                            let yesterday = parseFloat(this.top2Data.yesterday)
                            var top2per = 0
                            if (!isNaN(today) && !isNaN(yesterday) && yesterday != 0) {
                                top2per = (today - yesterday) / yesterday * 100
                            }
                            // （本期数-上期数）/上期数×100%
                            this.top2Data['percent'] = top2per
                            this.top2()

                            // top3
                            this.top3Data = data.today_workorder
                            let today1 = parseFloat(this.top3Data.today)
                            let yesterday1 = parseFloat(this.top3Data.yesterday)
                            var top3per = 0
                            if (!isNaN(today1) && !isNaN(yesterday1) && yesterday1 != 0) {
                                top3per = ((today1 - yesterday1) / yesterday1 * 100).toFixed(2)
                            }
                            this.top3Data['percent'] = top3per
                            this.top3()

                            // top4
                            this.top4Data = data.year_budget
                            var top4Per = 0
                            var total2 = parseFloat(this.top4Data.total_money)
                            var expense2 = parseFloat(this.top4Data.expense_money)
                            if (!isNaN(total2) && !isNaN(expense2) && total2 != 0) {
                                top4Per = expense2 / total2 * 100
                            }
                            this.top4Data['percent'] = top4Per

                            this.menuData = []
                            data.places.forEach(item => {
                                this.menuData.push(item)
                            })
                            // this.$refs.Menu.updateActiveName
                            setTimeout(this.$refs.Menu.updateActiveName, this.menuData[0].level)// 用于默认选中第一项
                            this.midMenuClick(this.menuData[0].level)
                        }
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })

                // 饼图
                var arg = {
                    type: 1, // 科目组
                    year: new Date().getFullYear(),
                    show_zero: 0
                }
                FinanceHttp.budgetSFinancesYear(arg)
                    .then(data => {
                        this.pieData.group = data
//                        this.pieData.group = {
//                            total: 5,
//                            finances: [
//                                {name: 'group1', value: 335},
//                                {name: 'group2', value: 310},
//                                {name: 'group3', value: 234},
//                                {name: 'group4', value: 135},
//                                {name: 'group5', value: 1548}
//                            ]
//                        }
                        this.RGSubjectChange('按科目组')
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
                var arg2 = {
                    type: 2, // 科目组
                    year: new Date().getFullYear(),
                    show_zero: 0
                }
                FinanceHttp.budgetSFinancesYear(arg2)
                    .then(data => {
                        this.pieData.subject = data
//                        this.pieData.subject = {
//                            total: 5,
//                            finances: [
//                                {name: 'subject1', value: 335},
//                                {name: 'subject2', value: 310},
//                                {name: 'subject3', value: 234},
//                                {name: 'subject4', value: 135},
//                                {name: 'subject5', value: 1548}
//                            ]
//                        }
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                        // todo 测试数据，需删除
//                        this.pieData.subject = {
//                            total: 5,
//                            finances: [
//                                {name: 'subject1', value: 335},
//                                {name: 'subject2', value: 310},
//                                {name: 'subject3', value: 234},
//                                {name: 'subject4', value: 135},
//                                {name: 'subject5', value: 1548}
//                            ]
//                        }
                    })
                this.RGSubjectChange('按科目组')
            },
            top2: function () {
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        show: false,
                        type: 'time',
                        // boundaryGap: false,
                        splitLine: {// 去掉轴内部线的
                            show: false
                        }
                    },
                    yAxis: {
                        show: false,
                        type: 'value',
                        // boundaryGap: [0, '100%'],
                        splitLine: {// 去掉轴内部线的
                            show: false
                        }
                    },
                    series: [{
                        data: [
                            {name: '2016/12/18 6:38:08', value: ['2016/12/18 6:38:08', 80]},
                            {name: '2016/12/18 16:18:18', value: ['2016/12/18 16:18:18', 60]},
                            {name: '2016/12/18 19:18:18', value: ['2016/12/18 19:18:18', 90]}
                        ],
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#C79EB0'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#C79EB0'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#975fe4'
                            }
                        }
                    }]
                }

                // 使用刚指定的配置项和数据显示图表。
                this.top2Chart.setOption(option)
            },
            top3: function () {
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        show: false,
                        type: 'time',
                        splitLine: {// 去掉轴内部线的
                            show: false
                        }
                    },
                    yAxis: {
                        show: false,
                        type: 'value',
                        splitLine: {// 去掉轴内部线的
                            show: false
                        }
                    },
                    series: [{
                        data: [
                            {name: '2016/12/18 6:38:08', value: ['2016/12/18 6:38:08', 80]},
                            {name: '2016/12/18 9:18:18', value: ['2016/12/18 8:18:18', 50]},
                            {name: '2016/12/18 12:18:18', value: ['2016/12/18 10:18:18', 90]},
                            {name: '2016/12/18 16:18:18', value: ['2016/12/18 16:18:18', 60]},
                            {name: '2016/12/18 19:18:18', value: ['2016/12/18 19:18:18', 90]}
                        ],
                        type: 'bar',
                        barWidth: 8,
                        barGap: 1, // '30%'
                        itemStyle: {
                            normal: {
                                color: '#87B9B3'
                            }
                        }
                    }]
                }

                // 使用刚指定的配置项和数据显示图表。
                this.top3Chart.setOption(option)
            },
            RGSubjectChange: function (data) {
                var legData = []
                var dataList = []
                if (data == '按科目组') {
                    if (!this.pieData.group) {
                        return
                    }
                    dataList = this.pieData.group.finances
                } else if (data == '按科目') {
                    if (!this.pieData.subject) {
                        return
                    }
                    dataList = this.pieData.subject.finances
                }
                dataList.forEach(item => {
                    legData.push({name: item.name, icon: 'circle'})
                })
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        formatter: {name},
                        orient: 'vertical',
                        left: 'center',
                        bottom: 0,
                        data: legData
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    // formatter: ' {per|{d}%}  ',
                                    show: false,
                                    position: 'center',
                                    formatter: '已使用总额\n¥ {c} ({d}%) '
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '18'// ,
                                        // fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: dataList
                        }
                    ]
                }
                /* // 使用刚指定的配置项和数据显示图表。 */
                this.midPieChart.setOption(option)
            },
            bottomTabClick: function (name) {
                var legData = []
                var xData = []
                var sData1 = []
                var sData2 = []
                var sData3 = []
                legData.push('本年支出')
                legData.push('去年支出')
                legData.push('预算')
                // var today = new Date(2017, 11, 15)
                var today = new Date()
                new Promise((resolve, reject) => {
                    if (name == 'year') {
                        var tempDay = Format(new Date(today.getFullYear(), 12, 0), 'dd')
                        var arg = {
                            'place_id': '',
                            'begin': today.getFullYear() + '-01-01',
                            'end': today.getFullYear() + '-12-' + tempDay,
                            'calc_last_year': '1'
                        }
                        FinanceHttp.budgetSMonth(arg)
                            .then(data => {
                                data.forEach(item => {
                                    xData.push(item.datetime.substring(5, 7))
                                    sData1.push(item.expense_money)
                                    sData2.push(item.last_expense_money)
                                    sData3.push(item.total_money)
                                })
//                                xData = []
//                                sData1 = []
//                                sData2 = []
//                                sData3 = []
//                                var month = today.getMonth()
//                                for (var i = 0; i <= month; i++) {
//                                    xData.push((i + 1) + '月')
//                                    sData1.push(Math.round(Math.random() * 1000))
//                                    sData2.push(Math.round(Math.random() * 1000))
//                                    sData3.push(Math.round(Math.random() * 1000))
//                                }
                                resolve()
                            })
                            .catch(error => {
                                this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                                reject()
                            })
                    } else if (name == 'month') {
                        var yearMonth = Format(today, 'yyyy-MM-')
                        var day1 = yearMonth + '01'
                        var day2 = yearMonth + Format(new Date(today.getFullYear(), today.getMonth() + 1, 0), 'dd')
                        var arg1 = {
                            begin: day1,
                            end: day2,
                            place_id: '',
                            calc_last_year: 1,
                            calc_sum: 1
                        }
                        FinanceHttp.getBudgetSData(arg1)
                            .then(data => {
//                                var temp = data.date.map(item => {
//                                    return item.substring(8, 10)
//                                })
                                xData = data.date
                                sData1 = data.current
                                sData2 = data.last
                                sData3 = data.budget
                                // 测试用，测试数据
//                                var day = today.getDate()
//                                sData1 = []
//                                sData2 = []
//                                sData3 = []
//                                for (var j = 1; j <= day; j++) {
//                                    xData.push((j) + '日')
//                                    sData1.push(Math.round(Math.random() * 1000))
//                                    sData2.push(Math.round(Math.random() * 1000))
//                                    sData3.push(Math.round(Math.random() * 1000))
//                                }
                                resolve()
                            })
                            .catch(error => {
                                this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                                reject()
                            })
                    }
                })
                    .then(() => {
                        var option = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // x轴和y轴值的提示
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            toolbox: { // 图表切换，图片到处等工具
//                                feature: {
//                                    dataView: {show: true, readOnly: false},
//                                    magicType: {show: true, type: ['line', 'bar']},
//                                    restore: {show: true},
//                                    saveAsImage: {show: true}
//                                }
                            },
                            legend: {
                                data: legData
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: xData,
                                    axisPointer: {
                                        type: 'shadow' // x轴的提示样式，默认是一条线
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '元',
                                    // min: 0, //不设置时根据值自动显示
                                    // max: 1000,
                                    // interval: 50, //强制根据给定的离散值分割轴
                                    axisLabel: {
                                        formatter: '{value} 元'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '本年支出',
                                    type: 'bar',
                                    data: sData1,
                                    itemStyle: {
                                        normal: {
                                            color: '#FFD700' // #FFD700 黄色，#95BB6C 淡绿色 #F5A623 橙色
                                        }
                                    }
                                },
                                {
                                    name: '去年支出',
                                    type: 'bar',
                                    data: sData2,
                                    itemStyle: {
                                        normal: {
                                            color: '#F5A623' // #FFD700 黄色，#95BB6C淡绿色 #F5A623 橙色
                                        }
                                    }
                                },
                                {
                                    name: '预算',
                                    type: 'line',
                                    // yAxisIndex: 1,
                                    data: sData3,
                                    itemStyle: {
                                        normal: {
                                            color: '#95BB6C' // #FFD700 黄色，#95BB6C淡绿色 #F5A623橙色
                                        }
                                    }
                                }
                            ]
                        }
                        this.bottomChart.setOption(option)
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })

                // 排行
                if (name == 'year') {
                    var tempDay = Format(new Date(today.getFullYear(), 12, 0), 'dd')
                    var day1 = today.getFullYear() + '-01-01'
                    var day2 = today.getFullYear() + '-12-' + tempDay
                    FinanceHttp.budgetSBuildingRank({begin: day1, end: day2})
                        .then(data => {
                            this.bottomRightData = data.rank
                            if (data.rank.length == 0) {
                                this.bottomRightData.push({name: '暂无', expense_total: ''})
                            }
//                            this.bottomRightData = [
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'}]
                        })
                        .catch(error => {
                            this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                        })
                } else if (name == 'month') {
                    var yearMonth = Format(today, 'yyyy-MM-')
                    var day3 = yearMonth + '01'
                    var day4 = yearMonth + Format(new Date(today.getFullYear(), today.getMonth() + 1, 0), 'dd')
                    FinanceHttp.budgetSBuildingRank({begin: day3, end: day4})
                        .then(data => {
                            this.bottomRightData = data.rank
                            if (data.rank.length == 0) {
                                this.bottomRightData.push({name: '暂无', expense_total: ''})
                            }
//                            this.bottomRightData = [
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'},
//                                {left: 'CN01715工专路一号店', right: '30%'}]
                        })
                        .catch(error => {
                            this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                        })
                }
            },
            radioChange: function (data) {
                var today = new Date()
                if (data == '本月') {
                    this.ymBegin = Format(today, 'yyyy-MM')
                    this.ymEnd = Format(today, 'yyyy-MM')
                } else if (data == '全年') {
                    this.ymBegin = Format(today, 'yyyy-') + '01'
                    this.ymEnd = Format(today, 'yyyy-') + '12'
                }
                this.dateChange()
            },
            dateChange: function (data) {
                this.makeMap()
            },
            midMenuClick: function (menu) {
                this.curMenu = menu
                this.makeMap()
                // 在tab中处理data数据
                /* if (menu == 'tab1') {
                } else if (menu == 'tab2') {
                } else if (menu == 'tab3') {
                } else if (menu == 'tab4') {
                }
                var data = [
                    [121.4648, 31.2891, 310],
                    [113.8953, 22.901, 31],
                    [118.7073, 37.5513, 80],
                    [113.4229, 22.478, 73],
                    [111.4783, 36.1615, 27],
                    [118.3118, 35.2936, 81],
                    [124.541, 40.4242, 27],
                    [119.5642, 28.1854, 456]// ,
                    /!* [87.9236, 43.5883, 31],
                    [112.8955, 23.1097, 31],
                    [115.0488, 39.0948, 31],
                    [103.5901, 36.3043, 31],
                    [110.3467, 41.4899, 31],
                    [116.4551, 40.2539, 31],
                    [109.314, 21.6211, 31],
                    [118.8062, 31.9208, 31],
                    [108.479, 23.1152, 31],
                    [116.0046, 28.6633, 31],
                    [121.1023, 32.1625, 31],
                    [118.1689, 24.6478, 31],
                    [121.1353, 28.6688, 31],
                    [117.29, 32.0581, 31],
                    [111.4124, 40.4901, 31],
                    [108.4131, 34.8706, 31],
                    [127.9688, 45.368, 31],
                    [118.4766, 39.6826, 31],
                    [120.9155, 30.6354, 31],
                    [113.7854, 39.8035, 31],
                    [122.2229, 39.4409, 31],
                    [117.4219, 39.4189, 31],
                    [112.3352, 37.9413, 31],
                    [121.9482, 37.1393, 31],
                    [121.5967, 29.6466, 31],
                    [107.1826, 34.3433, 31],
                    [118.5535, 33.7775, 31],
                    [119.4543, 31.5582, 31],
                    [113.5107, 23.2196, 31],
                    [116.521, 39.0509, 31],
                    [109.1052, 36.4252, 31],
                    [115.1477, 40.8527, 31],
                    [117.5208, 34.3268, 31],
                    [116.6858, 37.2107, 31],
                    [114.6204, 23.1647, 31],
                    [103.9526, 30.7617, 31],
                    [119.4653, 32.8162, 31],
                    [117.5757, 41.4075, 31],
                    [91.1865, 30.1465, 31],
                    [120.3442, 31.5527, 31],
                    [119.2786, 35.5023, 31],
                    [102.9199, 25.4663, 31],
                    [119.5313, 29.8773, 31],
                    [117.323, 34.8926, 31],
                    [109.3799, 24.9774, 31],
                    [113.5327, 27.0319, 31],
                    [114.3896, 30.6628, 31],
                    [117.1692, 23.3405, 31],
                    [112.6318, 22.1484, 31],
                    [123.1238, 42.1216, 31],
                    [116.8286, 38.2104, 31],
                    [114.917, 23.9722, 31],
                    [118.3228, 25.1147, 31],
                    [117.0264, 36.0516, 31],
                    [120.0586, 32.5525, 31],
                    [117.1582, 36.8701, 31],
                    [116.8286, 35.3375, 31],
                    [110.3893, 19.8516, 31],
                    [118.0371, 36.6064, 31],
                    [118.927, 33.4039, 31],
                    [114.5435, 22.5439, 31],
                    [112.9175, 24.3292, 31],
                    [120.498, 27.8119, 31],
                    [109.7864, 35.0299, 31],
                    [119.8608, 30.7782, 31],
                    [112.5439, 27.7075, 31],
                    [117.8174, 37.4963, 31],
                    [119.0918, 36.524, 31],
                    [120.7397, 37.5128, 31],
                    [101.9312, 23.8898, 31],
                    [113.7305, 22.1155, 31],
                    [120.2234, 33.5577, 31],
                    [121.9482, 41.0449, 31],
                    [114.4995, 38.1006, 31],
                    [119.4543, 25.9222, 31],
                    [119.2126, 40.0232, 31],
                    [120.564, 29.7565, 31],
                    [115.9167, 36.4032, 31],
                    [112.1265, 23.5822, 31],
                    [122.2559, 30.2234, 31],
                    [120.6519, 31.3989, 31],
                    [117.6526, 36.2714, 31],
                    [115.6201, 35.2057, 31],
                    [122.4316, 40.4297, 31],
                    [120.1575, 40.578, 31],
                    [115.8838, 37.7161, 31],
                    [118.6853, 28.8666, 31],
                    [101.4038, 36.8207, 31],
                    [109.1162, 34.2004, 31],
                    [106.6992, 26.7682, 31],
                    [119.1248, 34.552, 31],
                    [114.8071, 37.2821, 31],
                    [114.4775, 36.535, 31],
                    [113.4668, 34.6234, 31],
                    [108.9734, 39.2487, 31],
                    [107.7539, 30.1904, 31],
                    [120.0037, 29.1028, 31],
                    [109.0393, 35.1947, 31],
                    [106.3586, 38.1775, 31],
                    [119.4763, 31.9702, 31],
                    [125.8154, 44.2584, 31],
                    [113.0823, 28.2568, 31],
                    [112.8625, 36.4746, 31],
                    [113.4778, 38.0951, 31],
                    [120.4651, 36.3373, 31],
                    [113.7964, 24.7028, 31] *!/
                ]
                data
                var data1 = [
                    [121.4648, 31.2891, 31],
                    [113.8953, 22.901, 31],
                    [118.7073, 37.5513, 80],
                    [113.4229, 22.478, 73],
                    [111.4783, 36.1615, 27],
                    [118.3118, 35.2936, 81],
                    [124.541, 40.4242, 27],
                    [119.5642, 28.1854, 45]
                ]
                var data2 = [
                    [87.9236, 43.5883, 31],
                    [112.8955, 23.1097, 31],
                    [115.0488, 39.0948, 31],
                    [103.5901, 36.3043, 31],
                    [110.3467, 41.4899, 31],
                    [116.4551, 40.2539, 31],
                    [109.314, 21.6211, 31],
                    [118.8062, 31.9208, 31]
                ]
                var data3 = [
                    [108.479, 23.1152, 31],
                    [116.0046, 28.6633, 31],
                    [121.1023, 32.1625, 31],
                    [118.1689, 24.6478, 31],
                    [121.1353, 28.6688, 31],
                    [117.29, 32.0581, 31],
                    [111.4124, 40.4901, 31],
                    [108.4131, 34.8706, 31]
                ]
                var data4 = [
                    [106.3586, 38.1775, 31],
                    [119.4763, 31.9702, 31],
                    [125.8154, 44.2584, 31],
                    [113.0823, 28.2568, 31],
                    [112.8625, 36.4746, 31],
                    [113.4778, 38.0951, 31],
                    [120.4651, 36.3373, 31],
                    [113.7964, 24.7028, 31]
                ]
                var series = [
                    {
                        type: 'scatter',
                        // 使用百度地图坐标系
                        coordinateSystem: 'bmap',
                        // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                        data: data1,
                        symbolSize: function (val) {
                            return val[2] / 2
                        }/!* ,
                        itemStyle: {
                            normal: {
                                color: '#C79EB0'
                            }
                        } *!/
                    },
                    {
                        type: 'scatter',
                        // 使用百度地图坐标系
                        coordinateSystem: 'bmap',
                        // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                        data: data2,
                        symbolSize: function (val) {
                            return val[2] / 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#95BB6C'
                            }
                        }
                    },
                    {
                        type: 'scatter',
                        // 使用百度地图坐标系
                        coordinateSystem: 'bmap',
                        // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                        data: data3,
                        symbolSize: function (val) {
                            return val[2] / 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#87B9B3'
                            }
                        }
                    },
                    {
                        type: 'scatter',
                        // 使用百度地图坐标系
                        coordinateSystem: 'bmap',
                        // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                        data: data4,
                        symbolSize: function (val) {
                            return val[2] / 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#F5A623'
                            }
                        }
                    }
                ]
                var legData = ['上海', '东莞', '东营', '中山', '临汾', '临沂', '丹东', '丽水']
                var option = {
                    // 加载 bmap 组件
                    bmap: {
                        // 百度地图中心经纬度
                        center: [116.4551, 40.2539],
                        // 百度地图缩放
                        zoom: 5,
                        // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                        roam: true,
                        // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
                        mapStyle: {
                            styleJson: [
                                {
                                    'featureType': 'water',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#ccc'
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'highway',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#ccc'
                                    }
                                },
                                {
                                    'featureType': 'highway',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#ccc',
                                        'lightness': 1
                                    }
                                },
                                {
                                    'featureType': 'highway',
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#ccc'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#ccc'
                                    }
                                },
                                {
                                    'featureType': 'poi',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'green',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#ccc',
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'subway',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'manmade',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'local',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'boundary',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#ccc'
                                    }
                                },
                                {
                                    'featureType': 'building',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#ccc'
                                    }
                                }
                            ]
                        }
                    },
                    series: series,
                    backgroundColor: '#ccc',
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data: legData,
                        textStyle: {
                            color: '#fff'
                        },
                        selectedMode: 'single'
                    }
                }
                this.mapChart.setOption(option) */
            },
            makeMap: function () {
                if (this.curMenu == '' || this.ymBegin == '' || this.ymEnd == '') {
                    return
                }
                var arg = {
                    level: this.curMenu,
                    begin: Format(this.ymBegin, 'yyyy-MM'),
                    end: Format(this.ymEnd, 'yyyy-MM')
                }
                console.log('makeMap arg:', arg)
                FinanceHttp.budgetPlaceLevel(arg)
                    .then(data => {
                        console.log('makeMap data:', data)
//                        data = [
//                            {
//                                'id': 12,
//                                'longitude': '116.3566250000',
//                                'latitude': '40.0446000000',
//                                'name': '北京 东升 东升',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 13,
//                                'longitude': '116.2837410000',
//                                'latitude': '40.0444840000',
//                                'name': '北京 PB新大厦 PB新大厦',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 14,
//                                'longitude': '116.3022380000',
//                                'latitude': '40.0539270000',
//                                'name': '北京 环洋 环洋',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 15,
//                                'longitude': '120.3732100000',
//                                'latitude': '31.4879810000',
//                                'name': '无锡 软件园 白羊座D栋',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 16,
//                                'longitude': null,
//                                'latitude': null,
//                                'name': '无锡 高新区 海辉大厦',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 17,
//                                'longitude': null,
//                                'latitude': null,
//                                'name': '无锡 软件园 白羊座C栋',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 18,
//                                'longitude': null,
//                                'latitude': null,
//                                'name': '无锡 软件园 白羊座B栋',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 19,
//                                'longitude': null,
//                                'latitude': null,
//                                'name': '无锡 1 1',
//                                'build_count': 1,
//                                'budget': null,
//                                'expense': null
//                            },
//                            {
//                                'id': 20,
//                                'longitude': null,
//                                'latitude': null,
//                                'name': '无锡 软件园 白羊座A栋',
//                                'build_count': 1,
//                                'budget': '220',
//                                'expense': '3.00'
//                            }
//                        ]
                        var chartData = []
                        data.forEach(item => {
                            var per = 0
                            if (item.budget != '' && item.budget != null && item.budget != undefined && item.budget != 0) {
                                per = (item.expense / item.budget * 100).toFixed(2)
                            }
                            chartData.push({
                                name: item.name,
                                value: [
                                    item.longitude,
                                    item.latitude,
                                    per,
                                    item.budget,
                                    item.expense
                                ]
                            })
                        })
                        var series = []
                        for (var i = 1; i <= 4; i++) {
                            var sdata = []
                            var color = ''
                            switch (i) {
                            case 1:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 20
                                })
                                color = '#73AAEB'
                                break
                            case 2:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 50 && d.value[2] >= 20
                                })
                                color = '#FFD700'
                                break
                            case 3:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 80 && d.value[2] >= 50
                                })
                                color = '#95BB6C'
                                break
                            case 4:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 100 && d.value[2] >= 80
                                })
                                color = '#C79EB0'
                                break
                            }
                            series.push({
                                type: 'scatter',
                                // 使用百度地图坐标系
                                coordinateSystem: 'bmap',
                                // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                                data: sdata,
                                symbolSize: function (val) {
                                    return 30
                                },
                                itemStyle: {
                                    normal: {
                                        color: color
                                    }
                                }
                            })
                        }
                        var option = {
                            // 加载 bmap 组件
                            bmap: {
                                // 百度地图中心经纬度
                                center: [116.4551, 40.2539],
                                // 百度地图缩放
                                zoom: 5,
                                // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                                roam: true,
                                // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
                                mapStyle: {
                                    styleJson: [
                                        {
                                            'featureType': 'water',
                                            'elementType': 'all',
                                            'stylers': {
                                                'color': '#ffffff' // 044161
                                            }
                                        },
                                        {
                                            'featureType': 'land',
                                            'elementType': 'all',
                                            'stylers': {
                                                'color': '#ffffff' // 004981
                                            }
                                        },
                                        {
                                            'featureType': 'boundary',
                                            'elementType': 'geometry',
                                            'stylers': {
                                                'color': '#ffffff' // 064f85
                                            }
                                        },
                                        {
                                            'featureType': 'railway',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'highway',
                                            'elementType': 'geometry',
                                            'stylers': {
                                                'color': '#ffffff' // 004981
                                            }
                                        },
                                        {
                                            'featureType': 'highway',
                                            'elementType': 'geometry.fill',
                                            'stylers': {
                                                'color': '#ffffff', // 005b96
                                                'lightness': 1
                                            }
                                        },
                                        {
                                            'featureType': 'highway',
                                            'elementType': 'labels',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'arterial',
                                            'elementType': 'geometry',
                                            'stylers': {
                                                'color': '#004981' // 004981
                                            }
                                        },
                                        {
                                            'featureType': 'arterial',
                                            'elementType': 'geometry.fill',
                                            'stylers': {
                                                'color': '#ffffff' // 00508b
                                            }
                                        },
                                        {
                                            'featureType': 'poi',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'green',
                                            'elementType': 'all',
                                            'stylers': {
                                                'color': '#056197', // 056197
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'subway',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'manmade',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'local',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'arterial',
                                            'elementType': 'labels',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'boundary',
                                            'elementType': 'geometry.fill',
                                            'stylers': {
                                                'color': '#808080' // 029fd4
                                            }
                                        },
                                        {
                                            'featureType': 'building',
                                            'elementType': 'all',
                                            'stylers': {
                                                'color': '#1a5787'
                                            }
                                        },
                                        {
                                            'featureType': 'label',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        }
                                    ]
                                }
                            },
                            series: series, /* [{
                                type: 'scatter',
                                // 使用百度地图坐标系
                                coordinateSystem: 'bmap',
                                // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                                data: chartData,
                                /!* symbolSize: function (val) {
                                    return val[2] / 2
                                }, *!/
                                itemStyle: {
                                    normal: {
                                        color: '#C79EB0'
                                    }
                                }
                            }], */
                            backgroundColor: '#ccc',
                            tooltip: {
                                trigger: 'item',
                                formatter: function (params) {
                                    var value2 = params.value[2] ? params.value[2] : 0
                                    var value3 = params.value[3] ? params.value[3] : 0
                                    var value4 = params.value[4] ? params.value[4] : 0
                                    return params.name + ' : ' + value2 + '% (' + value4 + '/' + value3 + ')'
                                }
                            }
                        }
                        this.mapChart.setOption(option)
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                        var data = [
                            {
                                'id': 12,
                                'longitude': '116.3566250000',
                                'latitude': '40.0446000000',
                                'name': '北京 东升 东升',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1234
                            },
                            {
                                'id': 13,
                                'longitude': '116.2837410000',
                                'latitude': '40.0444840000',
                                'name': '北京 PB新大厦 PB新大厦',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1247
                            },
                            {
                                'id': 14,
                                'longitude': '116.3022380000',
                                'latitude': '40.0539270000',
                                'name': '北京 环洋 环洋',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1268
                            },
                            {
                                'id': 15,
                                'longitude': '120.3732100000',
                                'latitude': '31.4879810000',
                                'name': '无锡 软件园 白羊座D栋',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1258
                            },
                            {
                                'id': 16,
                                'longitude': null,
                                'latitude': null,
                                'name': '无锡 高新区 海辉大厦',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1248
                            },
                            {
                                'id': 17,
                                'longitude': null,
                                'latitude': null,
                                'name': '无锡 软件园 白羊座C栋',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1246
                            },
                            {
                                'id': 18,
                                'longitude': null,
                                'latitude': null,
                                'name': '无锡 软件园 白羊座B栋',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1245
                            },
                            {
                                'id': 19,
                                'longitude': null,
                                'latitude': null,
                                'name': '无锡 1 1',
                                'build_count': 1,
                                'budget': 12345,
                                'expense': 1247
                            },
                            {
                                'id': 20,
                                'longitude': null,
                                'latitude': null,
                                'name': '无锡 软件园 白羊座A栋',
                                'build_count': 1,
                                'budget': '220',
                                'expense': '3.00'
                            }
                        ]
                        var chartData = []
                        data.forEach(item => {
                            var per = 0
                            if (item.budget != '' && item.budget != null && item.budget != undefined && item.budget != 0) {
                                per = (item.expense / item.budget * 100).toFixed(2)
                            }
                            chartData.push({
                                name: item.name,
                                value: [
                                    item.longitude,
                                    item.latitude,
                                    per,
                                    item.budget,
                                    item.expense
                                ]
                            })
                        })
                        var series = []
                        for (var i = 1; i <= 4; i++) {
                            var sdata = []
                            var color = ''
                            switch (i) {
                            case 1:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 20
                                })
                                color = '#C79EB0'
                                break
                            case 2:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 50 && d.value[2] >= 20
                                })
                                color = '#95BB6C'
                                break
                            case 3:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 80 && d.value[2] >= 50
                                })
                                color = '#87B9B3'
                                break
                            case 4:
                                sdata = chartData.filter(d => {
                                    return d.value[2] < 100 && d.value[2] >= 80
                                })
                                color = '#73AAEB'
                                break
                            }
                            series.push({
                                type: 'scatter',
                                // 使用百度地图坐标系
                                coordinateSystem: 'bmap',
                                // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                                data: sdata,
                                /* symbolSize: function (val) {
                                    return val[2] * 1000
                                }, */
                                itemStyle: {
                                    normal: {
                                        color: color
                                    }
                                }
                            })
                        }
                        var option = {
                            // 加载 bmap 组件
                            bmap: {
                                // 百度地图中心经纬度
                                center: [116.4551, 40.2539],
                                // 百度地图缩放
                                zoom: 5,
                                // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                                roam: true,
                                // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
                                mapStyle: {
                                    styleJson: [
                                        {
                                            'featureType': 'water',
                                            'elementType': 'all',
                                            'stylers': {
                                                'color': '#ccc'
                                            }
                                        },
                                        {
                                            'featureType': 'railway',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'highway',
                                            'elementType': 'geometry',
                                            'stylers': {
                                                'color': '#ccc'
                                            }
                                        },
                                        {
                                            'featureType': 'highway',
                                            'elementType': 'geometry.fill',
                                            'stylers': {
                                                'color': '#ccc',
                                                'lightness': 1
                                            }
                                        },
                                        {
                                            'featureType': 'highway',
                                            'elementType': 'labels',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'arterial',
                                            'elementType': 'geometry',
                                            'stylers': {
                                                'color': '#ccc'
                                            }
                                        },
                                        {
                                            'featureType': 'arterial',
                                            'elementType': 'geometry.fill',
                                            'stylers': {
                                                'color': '#ccc'
                                            }
                                        },
                                        {
                                            'featureType': 'poi',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'green',
                                            'elementType': 'all',
                                            'stylers': {
                                                'color': '#ccc',
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'subway',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'manmade',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'local',
                                            'elementType': 'all',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'arterial',
                                            'elementType': 'labels',
                                            'stylers': {
                                                'visibility': 'off'
                                            }
                                        },
                                        {
                                            'featureType': 'boundary',
                                            'elementType': 'geometry.fill',
                                            'stylers': {
                                                'color': '#ccc'
                                            }
                                        },
                                        {
                                            'featureType': 'building',
                                            'elementType': 'all',
                                            'stylers': {
                                                'color': '#ccc'
                                            }
                                        }
                                    ]
                                }
                            },
                            series: series, /* [{
                                type: 'scatter',
                                // 使用百度地图坐标系
                                coordinateSystem: 'bmap',
                                // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                                data: chartData,
                                /!* symbolSize: function (val) {
                                    return val[2] / 2
                                }, *!/
                                itemStyle: {
                                    normal: {
                                        color: '#C79EB0'
                                    }
                                }
                            }], */
                            backgroundColor: '#ccc',
                            tooltip: {
                                trigger: 'item'
                            }
                        }
                        this.mapChart.setOption(option)
                    })
            }
        }
}
</script>
