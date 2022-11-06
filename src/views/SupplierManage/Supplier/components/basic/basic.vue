<style>
    .itembg { background-color: #f5f7f9; height: 20px; }
    .echartsTitle { height: 46px; line-height: 46px; border-bottom: 1px solid #D7DDE4; margin: 0 20px; }
    .echartsTitle h2 { float: left; font-size: 16px; color: #464C5B; font-weight: normal; }
    .echartsTitle .viewBranch { float: right; font-size: 14px; color: #3399FF; }
</style>
<template>
    <div>
        <Row>
            <Col span="24">
                <div class="echartsTitle" style="margin: 0 40px 0 20px;">
                    <h2>接单量</h2>
                    <DatePicker placement="bottom-end" type="daterange" confirm @on-change="changeOrderNum" v-model="OrderNumTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择" style="float: right; width: 230px; margin-top: 7px;"></DatePicker>
                    <RadioGroup v-model="OrderNumOption" @on-change="changeOrderNumOption" type="button" style="float: right; margin-right: 20px;">
                        <Radio label="1">全部</Radio>
                        <Radio label="2">今日</Radio>
                        <Radio label="3">本周</Radio>
                        <Radio label="4">本月</Radio>
                        <Radio label="5">全年</Radio>
                    </RadioGroup>
                </div>
            </Col>
            <Col span="18">
                <div id="myChart1" style="width: 100%;height:400px;"></div>
            </Col>
            <Col span="6">
                <h2 style="margin: 35px 0 37px; font-weight: normal; font-size: 16px; color: #657180;">主要服务门店</h2>
                <ul>
                    <li style="margin: 8px 0;" v-for="(item, index) in this.MainStoreList" :key="item.index">
                        <span style="display: inline-block; width: 15px; height: 15px; border-radius: 50%; background-color: #9EA7B4; color: #fff; font-size: 12px; text-align: center; line-height: 15px;">{{index + 1}}</span>&emsp;
                        <span style="display: inline-block; text-decoration: underline; width: 160px; font-size: 14px; color: #3399FF;">{{item.name}}</span>&emsp;
                        <span style="font-size: 14px; color: #9EA7B4;">{{item.count}}单</span>
                    </li>
                </ul>
            </Col>
        </Row>
        <div class="itembg"></div>
        <Row class="echarts2">
            <Col span="14">
                <div class="echartsTitle" style="margin: 0 40px 0 20px;">
                    <h2>工单类别占比</h2>
                    <DatePicker type="daterange" confirm @on-change="changeTime" v-model="time" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择" style="float: right; width: 230px; margin-top: 7px;"></DatePicker>
                    <RadioGroup v-model="workOrderOption" @on-change="changeTimeOption" type="button" style="float: right; margin-right: 20px;">
                        <Radio label="1">全部</Radio>
                        <Radio label="2">本月</Radio>
                        <Radio label="3">全年</Radio>
                    </RadioGroup>
                </div>
                <div class="" style="float: left; margin-top: 20px; margin-left: 50px;">
                    <RadioGroup v-model="workOrderOption1" @on-change="changeWorkOrderOption" type="button" style="float: right; margin-right: 20px;">
                        <Radio label="1">按服务</Radio>
                        <Radio label="2">按地区</Radio>
                        <Radio label="3">按来源</Radio>
                    </RadioGroup>
                </div>
                <div style="height: 0; width: 100%; clear: both;"></div>
                <div id="myChart2" style="width: 40%; height: 250px;"></div>
                <ul style="position: absolute; left: 45%; top: 130px;">
                    <li style="margin: 5px 0" v-for="(item, index) in this.workOrderSeriesData" :key="item.id">
                        <span style="display: inline-block; width: 140px">{{item.name}}</span>&emsp;
                        <span style="display: inline-block; width: 70px;">{{item.value}}单</span>&emsp;
                        <span style="display: inline-block; width: 70px">¥{{item.money}}</span>
                    </li>
                </ul>
                <div style="width: 20px; height: 400px; position: absolute; right: 0; top: 0; background-color: #f5f7f9;"></div>
            </Col>
            <Col span="10">
                <div class="echartsTitle">
                    <h2>供应商能力指数</h2>
                </div>
                <div id="myChart3" style=" height: 250px; margin-top: 10px;"></div>
                <ul>
                    <li style="float: left; width: 20%; text-align: center" v-for="(item, index) in this.IndexList">
                        <h3 style="font-weight: normal;">{{item.name}}</h3>
                        <h2 style="font-weight: normal;">
                            {{item.data}}
                            <span v-if="item.equal == 1" style="color: #14AA64;">&#8593;</span>
                            <span v-else-if="item.equal == -1" style="color: #FF5650">&#8595;</span>
                            <span v-else-if="item.equal == 0">=</span>
                        </h2>
                        <h3 style="font-weight: normal;">平均 {{item.avg}}</h3>
                    </li>
                </ul>
            </Col>
        </Row>
        <div class="itembg"></div>
        <Row class="echarts5">
            <Col span="24">
                <div class="echartsTitle">
                    <h2>分支机构概况</h2>
                    <a class="viewBranch">查看分支机构</a>
                </div>
            </Col>
            <Col span="14">
                <div style="margin-right: 30px;">
                    <div id="myChart4" style="width: 100%; height: 400px; margin-top: 30px;"></div>
                </div>
            </Col>
            <Col span="10">
                <div style="margin-top: 20px;">
                    <h2 style="font-size: 16px;color: #657180;font-weight: normal; margin-bottom: 20px;">分支机构总工单</h2>
                    <div id="myChart5" style="width: 100%; height: 400px;"></div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import echarts from 'echarts'
require('echarts/dist/extension/bmap.js')
// import echarts from 'static/plugin/echarts/echarts.js'
import SupplierManageHttp from 'server/http/supplierManage'
export default {
    components: {
    },
    created () {
    },
    mounted () {
        this.drawLine1()
        this.drawLine2()
        this.drawLine3()
        this.drawLine4()
        this.drawLine5()
    },
    data () {
        return {
            // 接单量
            newTime: [],
            OrderNumTime: [],
            OrderNumOption: '1',
            OrderNumSeriesData: [],
            OrderNumLegendData: [],
            startIndexTime: '',
            endIndexTime: '',
            MainStoreList: [],
            // 工单类别占比
            time: [],
            workOrderOption: '1',
            workOrderOption1: '1',
            starttime: '',
            endtime: '',
            wokOrderLegendData: [],
            workOrderSeriesData: [],
            // 供应商能力指数
            IndexList: [],
            xAxisIndexData: [],
            IndexIndicatorData: [],
            IndexSeriesData: [],
            // 分支机构概况
            BranchInfoData: [],
            BranchInfoData1: [],
            BranchInfoSeriesData: [],
            // 分支机构工单总量
            branchlegendData: [],
            branchyAxisData: [],
            branchSeriesData: []
        }
    },
    methods: {
        // 接单量
        changeOrderNum (value) {
            this.startIndexTime = value[0]
            this.endIndexTime = value[1]
            this.OrderNumOption = '0'
            this.drawLine1()
        },
        changeOrderNumOption (value) {
            this.OrderNumOption = value
            if (value == 1) {
                this.startIndexTime = ''
                this.endIndexTime = ''
                this.OrderNumTime = []
            } else if (value == 2) {
                let start = new Date(new Date(new Date().toLocaleDateString()).getTime())
                let end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
                this.time = [start, end]
                let s = new Date(this.time[0])
                let e = new Date(this.time[1])
                this.startIndexTime = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + s.getHours() + ':' + s.getMinutes() + ':' + s.getSeconds()
                this.endIndexTime = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + e.getHours() + ':' + e.getMinutes() + ':' + e.getSeconds()
            } else if (value == 3) {
                let date = new Date()
                let today = date.getDay()
                // console.log(today)
                let stepSunDay = -today + 1
                if (today == 0) {
                    stepSunDay = -7
                }
                let stepMonday = 7 - today
                let week = date.getTime()
                let monday = new Date(week + stepSunDay * 24 * 3600 * 1000)
                let sunday = new Date(week + stepMonday * 24 * 3600 * 1000)
                this.newTime = [monday, sunday]
                let s = new Date(this.newTime[0])
                let e = new Date(this.newTime[1])
                this.startIndexTime = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + '00' + ':' + '00' + ':' + '00'
                this.endIndexTime = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + '23' + ':' + '59' + ':' + '59'
                this.OrderNumTime = [this.startIndexTime, this.endIndexTime]
            } else if (value == 4) {
                let start = new Date()
                start.setDate(1)
                let date = new Date()
                let currentMonth = date.getMonth()
                let nextMonth = ++currentMonth
                let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
                let oneDay = 1000 * 60 * 60 * 24
                let end = new Date(nextMonthFirstDay - oneDay)
                this.newTime = [start, end]
                let s = new Date(this.newTime[0])
                let e = new Date(this.newTime[1])
                this.startIndexTime = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + '00' + ':' + '00' + ':' + '00'
                this.endIndexTime = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + '23' + ':' + '59' + ':' + '59'
                this.OrderNumTime = [this.startIndexTime, this.endIndexTime]
            } else if (value == 5) {
                var now = new Date()
                var currentYear = now.getFullYear()
                // 本年开始月份
                var currentYearFirstDate = new Date(currentYear, 0, 1)
                this.startIndexTime = this.formatDate(currentYearFirstDate) + ' ' + '00:00:00'
                // 本年结束日期
                var currentYearLastDate = new Date(currentYear, 11, 31)
                this.endIndexTime = this.formatDate(currentYearLastDate) + ' ' + '00:00:00'
                this.OrderNumTime = [this.startIndexTime, this.endIndexTime]
            }
            this.drawLine1()
        },
        drawLine1 () {
            SupplierManageHttp.getMainStore(this.$route.params.id).then((data) => {
                this.MainStoreList = data
            })
            // var itemStyle = {
            //     normal: {
            //     },
            //     emphasis: {
            //         barBorderWidth: 1,
            //         shadowBlur: 5,
            //         shadowOffsetX: 0,
            //         shadowOffsetY: 0,
            //         shadowColor: 'rgba(0,0,0,0.5)'
            //     }
            // }
            SupplierManageHttp.getOrderNum(this.$route.params.id, this.OrderNumOption, this.startIndexTime, this.endIndexTime).then((data) => {
                this.xAxisIndexData = data.xData
                for (let vYdata of data.yData) {
                    this.OrderNumLegendData.push(vYdata.name)
                    this.OrderNumSeriesData.push({name: vYdata.name, type: 'bar', stack: 'one', data: vYdata.data})
                }
                let myChart = echarts.init(document.getElementById('myChart1'))
                myChart.setOption({
                    backgroundColor: '#fff',
                    legend: {
                        // data: ['bar', 'bar2', 'bar3', 'bar4'],
                        data: this.OrderNumLegendData,
                        align: 'left',
                        left: 10
                    },
                    // brush: {
                    //     toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                    //     xAxisIndex: 0
                    // },
                    // toolbox: {
                    //     feature: {
                    //         magicType: {
                    //             type: ['stack', 'tiled']
                    //         },
                    //         dataView: {}
                    //     }
                    // },
                    tooltip: {},
                    xAxis: {
                        // data: xAxisData,
                        data: this.xAxisIndexData,
                        // name: 'X Axis',
                        silent: true,
                        axisLine: {onZero: true},
                        splitLine: {show: false},
                        splitArea: {show: false}
                    },
                    yAxis: {
                        inverse: false,
                        splitArea: {show: false}
                    },
                    grid: {
                        left: 100
                    },
                    // 左侧路径
                    // visualMap: {
                    //     type: 'continuous',
                    //     dimension: 1,
                    //     text: ['High', 'Low'],
                    //     inverse: true,
                    //     itemHeight: 200,
                    //     calculable: true,
                    //     min: 0,
                    //     max: 1000,
                    //     top: 60,
                    //     left: 10,
                    //     inRange: {
                    //         colorLightness: [0.4, 0.8]
                    //     },
                    //     outOfRange: {
                    //         color: '#bbb'
                    //     },
                    //     controller: {
                    //         inRange: {
                    //             color: '#2f4554'
                    //         }
                    //     }
                    // },
                    series: this.OrderNumSeriesData
                    // series: [
                    //     {
                    //         name: 'bar',
                    //         type: 'bar',
                    //         stack: 'one',
                    //         itemStyle: itemStyle,
                    //         data: data1
                    //     }
                    // ]
                })
            })
        },
        // 工单类别占比
        changeTime (value) {
            this.starttime = value[0]
            this.endtime = value[1]
            this.workOrderOption = '1'
            this.drawLine2()
        },
        changeTimeOption (value) {
            this.workOrderOption = value
            if (value == 1) {
                this.starttime = ''
                this.endtime = ''
                this.time = []
            } else if (value == 2) {
                let start = new Date()
                start.setDate(1)
                let date = new Date()
                let currentMonth = date.getMonth()
                let nextMonth = ++currentMonth
                let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
                let oneDay = 1000 * 60 * 60 * 24
                let end = new Date(nextMonthFirstDay - oneDay)
                this.newTime = [start, end]
                let s = new Date(this.newTime[0])
                let e = new Date(this.newTime[1])
                this.starttime = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + '00' + ':' + '00' + ':' + '00'
                this.endtime = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + '23' + ':' + '59' + ':' + '59'
                this.time = [this.starttime, this.endtime]
            } else {
                var now = new Date()
                var currentYear = now.getFullYear()
                // 本年开始月份
                var currentYearFirstDate = new Date(currentYear, 0, 1)
                this.starttime = this.formatDate(currentYearFirstDate) + ' ' + '00:00:00'
                // 本年结束日期
                var currentYearLastDate = new Date(currentYear, 11, 31)
                this.endtime = this.formatDate(currentYearLastDate) + ' ' + '00:00:00'
                this.time = [this.starttime, this.endtime]
            }
            this.drawLine2()
        },
        changeWorkOrderOption (value) {
            this.workOrderOption1 = value
            this.drawLine2()
        },
        formatDate (date) {
            var myyear = date.getFullYear()
            var mymonth = date.getMonth() + 1
            var myweekday = date.getDate()
            if (mymonth < 10) {
                mymonth = '0' + mymonth
            }
            if (myweekday < 10) {
                myweekday = '0' + myweekday
            }
            return (myyear + '-' + mymonth + '-' + myweekday)
        },
        drawLine2 () {
            SupplierManageHttp.getWorkOrderEchart(this.$route.params.id, this.workOrderOption, this.starttime, this.endtime, this.workOrderOption1).then((data) => {
                this.workOrderSeriesData = data.data
                let myChart = echarts.init(document.getElementById('myChart2'))
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                        data: this.wokOrderLegendData
                    },
                    series: [
                        {
                            name: '工单类别占比',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.workOrderSeriesData
                            // data: [
                            //     {value: 335, name: '直接访问'},
                            //     {value: 310, name: '邮件营销'},
                            //     {value: 234, name: '联盟广告'},
                            //     {value: 135, name: '视频广告'},
                            //     {value: 1548, name: '搜索引擎'}
                            // ]
                        }
                    ]
                })
            })
        },
        // 供应商能力指数
        drawLine3 () {
            SupplierManageHttp.getIndexEchart(this.$route.params.id).then((data) => {
                this.IndexList = data.avg
                this.IndexIndicatorData = data.indicator
                this.IndexSeriesData.push({value: data.data})
                let myChart = echarts.init(document.getElementById('myChart3'))
                myChart.setOption({
                    // title: {
                    //     text: '多雷达图'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    // legend: {
                    //     x: 'center',
                    //     data: ['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
                    // },
                    radar: [
                        {
                            // indicator: [
                            //     {text: '品牌', max: 100},
                            //     {text: '内容', max: 100},
                            //     {text: '可用性', max: 100},
                            //     {text: '功能', max: 100}
                            // ],
                            indicator: this.IndexIndicatorData,
                            center: ['50%', '40%'],
                            radius: 80
                        }
                    ],
                    series: [
                        {
                            type: 'radar',
                            tooltip: {
                                trigger: 'item'
                            },
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            // data: [
                            //     {
                            //         value: [60, 73, 85, 40],
                            //         name: '某软件'
                            //     }
                            // ]
                            data: this.IndexSeriesData
                        }
                    ]
                })
            })
        },
        // 分支机构概况
        drawLine4 () {
            // function renderItem (params, api) {
            //     var coords = [
            //         [118.1, 24.46],
            //         [123.97, 47.33]
            //     ]
            //     var points = []
            //     for (var i = 0; i < coords.length; i++) {
            //         points.push(api.coord(coords[i]))
            //     }
            //     var color = api.visual('color')
            //     return {
            //         type: 'polygon',
            //         shape: {
            //             points: echarts.graphic.clipPointsByRect(points, {
            //                 x: params.coordSys.x,
            //                 y: params.coordSys.y,
            //                 width: params.coordSys.width,
            //                 height: params.coordSys.height
            //             })
            //         },
            //         style: api.style({
            //             fill: color,
            //             stroke: echarts.color.lift(color)
            //         })
            //     }
            // }
            SupplierManageHttp.getBranchInfoEchart(this.$route.params.id).then((data) => {
                // console.log(data)
                // var BranchInfoData = [
                //     {name: '齐齐哈尔', value: 14},
                //     {name: '赤峰', value: 16}
                // ]
                this.BranchInfoData = data.data
                this.BranchInfoData1 = data.place
                // var geoCoordMap = {
                //     '齐齐哈尔': [123.97, 47.33],
                //     '赤峰': [118.87, 42.28]
                // }
                var res = []
                for (var i = 0; i < this.BranchInfoData.length; i++) {
                    var geoCoord = this.BranchInfoData1[this.BranchInfoData[i].name]
                    if (geoCoord) {
                        res.push({
                            name: this.BranchInfoData[i].name,
                            value: geoCoord.concat(this.BranchInfoData[i].value)
                        })
                    }
                }
                this.BranchInfoSeriesData.push({name: '', type: 'scatter', coordinateSystem: 'bmap', data: res})
                let myChart = echarts.init(document.getElementById('myChart4'))
                myChart.setOption({
                    backgroundColor: '#404a59',
                    // title: {
                    //     text: '全国主要城市空气质量',
                    //     subtext: 'data from PM25.in',
                    //     sublink: 'http://www.pm25.in',
                    //     left: 'center',
                    //     textStyle: {
                    //         color: '#fff'
                    //     }
                    // },
                    tooltip: {
                        trigger: 'item'
                    },
                    bmap: {
                        center: [104.114129, 37.550339],
                        zoom: 5,
                        roam: true,
                        mapStyle: {
                            styleJson: [
                                {
                                    'featureType': 'water',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#044161'
                                    }
                                },
                                {
                                    'featureType': 'land',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#004981'
                                    }
                                },
                                {
                                    'featureType': 'boundary',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#064f85'
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
                                        'color': '#004981'
                                    }
                                },
                                {
                                    'featureType': 'highway',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#005b96',
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
                                        'color': '#004981'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#00508b'
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
                                        'color': '#056197',
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
                                        'color': '#029fd4'
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
                    // series: [
                    //     {
                    //         name: 'pm2.5',
                    //         type: 'scatter',
                    //         coordinateSystem: 'bmap',
                    //         data: res,
                    //         label: {
                    //             normal: {
                    //                 formatter: '{b}',
                    //                 position: 'right',
                    //                 show: false
                    //             },
                    //             emphasis: {
                    //                 show: true
                    //             }
                    //         },
                    //         itemStyle: {
                    //             normal: {
                    //                 color: '#ddb926'
                    //             }
                    //         }
                    //     }
                    // ]
                    series: this.BranchInfoSeriesData
                })
            })
        },
        // 分支机构工单量
        drawLine5 () {
            SupplierManageHttp.getBasicBranchEchart(this.$route.params.id).then((data) => {
                // 获取分支机构echart数据
                for (let vLeg of data.legend) {
                    this.branchlegendData.push(vLeg.name)
                }
                this.branchyAxisData = data.yAxis
                for (let vSer of data.series) {
                    this.branchSeriesData.push({name: vSer.name, type: 'bar', stack: '总量', data: vSer.data})
                }
                let myChart = echarts.init(document.getElementById('myChart5'))
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        // data: ['维修', '运输', '搬运']
                        data: this.branchlegendData
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        data: this.branchyAxisData
                    },
                    series: this.branchSeriesData
                    // series: [
                    //     {
                    //         name: '维修',
                    //         type: 'bar',
                    //         stack: '总量',
                    //         label: {
                    //             normal: {
                    //                 show: true,
                    //                 position: 'insideRight'
                    //             }
                    //         },
                    //         data: [320, 302, 301]
                    //     }
                    // ]
                })
            })
        }
    }
}
</script>
