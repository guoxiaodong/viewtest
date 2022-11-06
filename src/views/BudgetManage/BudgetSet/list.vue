<style >
    .search-top{width: 99%; text-align: center}
    .taglist-right{margin-left: 20px;}
    .taglist-head{font-size:22px;height:54px;line-height: 54px;color: #657180;border-bottom: 1px dashed #D7DDE4;}
    .store-info{font-size: 14px; color: #657180; margin-bottom: 25px;margin-top: 19px;}
    .report-head{height: 40px;line-height: 40px;background: #F5F7F9;  box-shadow: 0 1px 0 0 #D7DDE4;  border-radius: 4px 4px 0 0;}
    .report-foot{height: 40px;line-height: 40px;    border-radius: 4px 4px 0 0;}
    .flexTable { border-bottom: 1px solid #D7DDE4; }
    .tabsEchart { margin-top: 25px; }
    .tabsEchart .ivu-tabs-nav-prev , .tabsEchart .ivu-tabs-nav-next { margin-top: 70px; }
    .tabsEchart .ivu-tabs-bar { border-bottom: none; }
    .tabsEchart .ivu-tabs-ink-bar { height: 0; }
    .tabsEchart .ivu-tabs-nav .ivu-tabs-tab { box-shadow: 0 2px 4px 0 #CAD3DF; border-radius: 2px; border: 1px solid #CAD3DF; }
    .tabsEchart .ivu-tabs-nav-scroll { padding-bottom: 15px; }
</style>
<template>
    <div>
        <div class="innerheader" style="margin: 0; padding-left: 20px;">
            预算设置
        </div>
        <div style="margin: 0 20px;">
            <Row>
                <Col span="8" style="border-right: 1px solid #CAD3DF;">
                <div class="postTree">
                    <div class="treesear" style="margin-top: 14px; margin-right: 20px;">
                        <Input v-model="search" placeholder="请输入搜索内容" class="search-top"></Input>
                    </div>
                    <div class="item">
                        <div id='allSpaceEdit' class='ztree'></div>
                    </div>
                </div>
                </Col>
                <Col span="16" >
                <div v-show="rightShow" class="taglist-right">
                    <p class="taglist-head">{{yearFinance.place_name}}</p>
                    <div class="flex store-info">
                        <div class="flex-1"><span>门店数量：{{yearFinance.build_count}}</span></div>
                        <div class="flex-1"><span>地理位置：{{curFPlace}}</span></div>
                        <!--<div class="flex-1"><span style="font-color:#657180;font-size:14px">负责人：</span><span style="font-color:#464C5B;font-size:14px">{{yearFinance.expense}}</span></div>-->
                    </div>
                    <div>
                        <div class="flex flexTable">
                            <div class="flex-1">
                                <p class="report-head p-l-20">预算年度</p>
                                <Select v-model="curYear" @on-change="yearChange" style="width: 80%;" class="m-t-10 m-b-10 p-l-20">
                                    <Option v-for="item in yearList" :value="item" :key="item">{{ item }}</Option>
                                </Select>
                            </div>
                            <div class="flex-1">
                                <p class="report-head p-l-20 ">年内预算已使用</p>
                                <p class="report-foot p-l-20 m-t-10">{{yearFinance.expense}}</p>
                            </div>
                            <div class="flex-1">
                                <p class="report-head p-l-20 ">总额</p>
                                <p class="report-foot p-l-20 m-t-10">{{yearFinance.total}}</p>
                            </div>
                            <div class="flex-1">
                                <p class="report-head p-l-20 ">年内已使用占比</p>
                                <p class="report-foot p-l-20 m-t-10">{{(yearFinance.total?(yearFinance.expense / yearFinance.total *100):(0)).toFixed(2)}}%</p>
                            </div>
                        </div>
                    </div>
                    <!--tab标签-->
                    <div class="tabsEchart">
                        <!--用于调样式-->
                        <!--<Tabs>-->
                            <!--<TabPane :label="label" name="2018-02-02"></TabPane>-->
                            <!--<TabPane :label="label2" name="2018-02-03"></TabPane>-->
                        <!--</Tabs>-->
                        <Tabs @on-click="tabClick">
                            <TabPane v-for="(item, index) in tabList" :label="item.label" :name="item.name" :key="index">
                            </TabPane>
                        </Tabs>
                    </div>
                    <!--图表-->
                    <div>
                        <div id="chart" style="width:550px;height:252px; margin-top: 25px;">
                            <Progress :percent="25" hide-info></Progress>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
        <editWin ref="editWin" @refresh="refresh"></editWin>
    </div>
</template>
<script>
    import $ from 'jquery'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    import echarts from 'echarts'// 必须用这种方式引入，否则地图出不来
    import FinanceHttp from 'server/http/finance'
    import Page from '../../../../node_modules/iview/src/components/page/page.vue'
    import {Format} from '@/util/timeFormat'
    import editWin from './edit'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/css/tree.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')

    export default {
        mixins: [ztreeSearch, ztree],
        components: {
            Page, editWin
        },
        created () {
            this.$emit('updateActive', '5-1')
        },
        data () {
            return {
                // todo 用于调样式，上线前要删除
                label: (h) => {
                    return h('div', [
                        h('span', {
                            style: {
                                'font-size': '20px'
                            }
                        }, '2018-02-01'), // 8月份
                        h('i', {
                            on: {
                                click: () => {
                                }
                            },
                            class: 'ivu-icon ivu-icon-edit',
                            style: {
                                'margin-left': '18px'
                            },
                            attrs: {
                                title: '编辑'
                            }
                        }),
                        h('p', [h('span', {
                            style: {
                                'font-size': '32px'
                            }
                        }, 82), h('span', {
                            style: {
                                'font-size': '14px',
                                'color': '#9EA7B4'
                            }
                        }, '(￥' + 123 + ')')]), // 82% (￥134312)
                        h('Progress', {
                            props: {
                                percent: 82,
                                'hide-info': ''
                            }
                        }), // 进度条
                        h('div', {
                            style: {
                                'width': '170px',
                                'height': '2px',
                                'borderTop': '1px solid #D7DDE4',
                                'margin': '9px 0 6px'
                            }
                        }),
                        h('p', {
                            style: {
                                'font-size': '12px',
                                'float': 'left'
                            }
                        }, '预算总量 ￥' + 200),
                        h('p', {
                            style: {
                                'font-size': '12px',
                                'float': 'right',
                                'color': '#FE6F6E'
                            }
                        }, '已结束')
                    ])
                },
                label2: (h) => {
                    return h('div',
                        {
                            style: {
                                'text-align': 'center'
                            }
                        },
                        [h('i', {
                            class: 'ivu-icon ivu-icon-android-add',
                            style: {
                                'font-size': '100px',
                                'color': 'gainsboro'
                            }
                        })])
                },
                search: '',
                isParentPlace: true,
                rightShow: false,
                spaceData: [],
                ztreeObj: '',
                setting: {
                    treeId: 'space',
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey: 'fid',
                            idKey: 'id',
                            rootPId: 0
                        }
                    },
                    check: {
                        chkboxwType: 'checkbox'
                    },
                    callback: {
                        onClick: this.nodeClick
                    },
                    view: {
                        selectedMulti: false
                    }
                },
                yearList: [],
                curYear: '',
                yearFinance: Object.create(null), // 年度预算
                curFPlace: '', // 地理位置
                curPlaceId: '', // 用于记录当前选中的treenode节点id
                perMonthData: Object.create(null),
                dynTabList: [
                    {
                        id: 1,
                        'datetime': '2018-01-01',
                        'total_money': 20, // 预算金额
                        'expense_money': 3.00// 支出金额
                    },
                    {
                        id: 2,
                        'datetime': '2018-02-01',
                        'total_money': 5,
                        'expense_money': 2
                    },
                    {
                        id: 3,
                        'datetime': '2018-03-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 4,
                        'datetime': '2018-04-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 5,
                        'datetime': '2018-05-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 6,
                        'datetime': '2018-06-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 7,
                        'datetime': '2018-07-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 8,
                        'datetime': '2018-08-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 9,
                        'datetime': '2018-09-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 10,
                        'datetime': '2018-10-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 11,
                        'datetime': '2018-11-01',
                        'total_money': 4,
                        'expense_money': 3
                    },
                    {
                        id: 12,
                        'datetime': '2018-12-01',
                        'total_money': 4,
                        'expense_money': 3
                    }
                ], // 动态tab的数据源，需清空
                tabList: [], // 用于绘制动态tab标签
                onOff: false,
                chart: Object.create(null),
                chartData: '', // 保存从服务器请求来的图表数据
                option: {
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
                        feature: {
//                            dataView: {show: true, readOnly: false},
//                            magicType: {show: true, type: ['line', 'bar']},
//                            restore: {show: true},
//                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['预算', '本年支出', '本年累加支出', '去年支出', '去年累加支出']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
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
                                formatter: '{value}' //  元
                            }
                        }
                    ],
                    series: []
                }, // 第一种方案
                series: [
                    {
                        name: '预算',
                        type: 'line',
                        // yAxisIndex: 1,
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#95BB6C' // #FFD700 黄色，#95BB6C淡绿色 #F5A623橙色
                            }
                        }
                    },
                    {
                        name: '本年支出',
                        type: 'bar',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#FFD700' // #FFD700 黄色，#95BB6C 淡绿色 #F5A623 橙色
                            }
                        }
                    },
                    {
                        name: '本年累加支出',
                        type: 'line',
                        // yAxisIndex: 1,
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#FFD700' // #FFD700 黄色，#95BB6C淡绿色 #F5A623橙色
                            }
                        }
                    },
                    {
                        name: '去年支出',
                        type: 'bar',
                        data: [], // data.last,
                        itemStyle: {
                            normal: {
                                color: '#F5A623' // #FFD700 黄色，#95BB6C淡绿色 #F5A623 橙色
                            }
                        }
                    },
                    {
                        name: '去年累加支出',
                        type: 'line',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#F5A623' // #FFD700 黄色，#95BB6C淡绿色 #F5A623橙色
                            }
                        }
                    }
                ] // 第一种方案
            }
        },
        mounted () {
            this.chart = echarts.init(document.getElementById('chart'))
            FinanceHttp.getSpace().then((data) => {
                this.spaceData = data
                this.ztreeObj = $.fn.zTree.init($('#allSpaceEdit'), this.setting, data)
                this.ztreeObj.expandAll(true)
                var firstNode = this.ztreeObj.getNodes()[0]
                if (firstNode) {
                    this.ztreeObj.selectNode(firstNode)
                    this.nodeClick(null, 'fun', firstNode)
                }
            })
        },
        methods: {
            nodeClick (event, treeId, treeNode) {
                this.rightShow = true
                this.curFPlace = treeNode.name
                this.curPlaceId = treeNode.id
                this.isleafPlace = !treeNode.children
//                var curNode = treeNode
//                while (curNode.level > 0) {
//                    var pNode = curNode.getParentNode()
//                    this.curFPlace = (pNode.name + ' ' + this.curFPlace)
//                    if (pNode.level == 0) {
//                        break
//                    } else {
//                        curNode = pNode
//                    }
//                }
                // 先绑定年，当前年的上一年，下一年，当前年，组成列表返回
                this.curYear = new Date().getFullYear()
                this.yearList = [this.curYear - 1, this.curYear, this.curYear + 1]
                this.yearChange()
                /* FinanceHttp.getYearFinanceByPlace(this.curYear, treeNode.id).then((data) => {
                    this.yearFinance = data
                })
                    .catch(error => {
                        console.error(error)
                    }) */
                // 绘制图表
            },
            yearChange () {
                // 上面区域数据获取
                FinanceHttp.getYearFinanceByPlace(this.curYear, this.curPlaceId).then((data) => {
                    this.yearFinance = data
                })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
                // 月份数据获取
                FinanceHttp.getPerMonthFinanceByPlace(this.curYear, this.curPlaceId).then((data) => {
                    this.perMonthData = data
//                    data.push({
//                        'id': '',
//                        'place_id': 20,
//                        'datetime': '2018-02-01',
//                        'total': 200,
//                        'expense': '0.00',
//                        'created_at': '2018-01-31 20:45:21',
//                        'updated_at': '2018-02-02 10:13:25',
//                        'budget_finances': [
//                            {
//                                'id': 2,
//                                'budget_id': 2,
//                                'finance_id': 2,
//                                'total': 200,
//                                'expense': '0.00',
//                                'created_at': '2018-02-02 10:13:25',
//                                'updated_at': '2018-02-02 10:13:25'
//                            }
//                        ]
//                    })
                    this.makeTabs(data)
                })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            makeTabs (data) {
                this.dynTabList = data
                this.tabList = []
                if (this.dynTabList.length == 0) {
                    // this.tabList.push({name: '', label: '暂无'})
                    this.tabClick()
                } else {
                    this.dynTabList.forEach((item, index) => {
                        var per = 0
                        if (item.total_money != 0) {
                            per = item.expense_money / item.total_money * 100
                        }
                        var doc = {
                            name: item.datetime,
                            label: (h) => {
                                var list = []
                                var day = parseInt(item.datetime.substring(5, 7))
                                var curDay = new Date().getMonth() + 1
                                list.push(h('span', {
                                    style: {
                                        'font-size': '20px'
                                    }
                                }, item.datetime.substring(0, 7))) // 8月份
                                // 只有叶子节点才允许编辑预算
                                if (this.isleafPlace && day >= curDay) {
                                    list.push(h('i', {
                                        on: {
                                            click: () => {
                                                this.edit(item.datetime, this.curPlaceId, this.curFPlace)
                                                this.stopBubble()
                                            }
                                        },
                                        class: 'ivu-icon ivu-icon-edit',
                                        style: {
                                            'margin-left': '18px'
                                        },
                                        attrs: {
                                            title: '编辑'
                                        }
                                    }))
                                }
                                list.push(h('p', [h('span', {
                                    style: {
                                        'font-size': '32px'
                                    }
                                }, per + '%'), h('span', {
                                    style: {
                                        'font-size': '14px',
                                        'color': '#9EA7B4'
                                    }
                                }, '(￥' + item.expense_money + ')')]))
                                list.push(h('Progress', {
                                    props: {
                                        percent: per
                                    }
                                }))
                                list.push(h('div', {
                                    style: {
                                        'width': '170px',
                                        'height': '2px',
                                        'borderTop': '1px solid #D7DDE4',
                                        'margin': '9px 0 6px'
                                    }
                                }))
                                list.push(h('p', {
                                    style: {
                                        'font-size': '12px',
                                        'float': 'left'
                                    }
                                }, '预算总量 ￥' + item.total_money))
                                // 与当前月份相比，过去的标为已结束
                                if (day < curDay) {
                                    list.push(h('p', {
                                        style: {
                                            'font-size': '12px',
                                            'float': 'right',
                                            'color': '#FE6F6E'
                                        }
                                    }, '已结束'))
                                }
                                return h('div', list)
                            }
                        }
//                        if (this.isleafPlace) {
//                            doc['label'] = (h) => {
//                                return h('div', [
//                                    h('span', {
//                                        style: {
//                                            'font-size': '20px'
//                                        }
//                                    }, item.datetime), // 8月份
//                                    h('i', {
//                                        on: {
//                                            click: () => {
//                                                this.edit(item.datetime, this.curPlaceId, this.curFPlace)
//                                                this.stopBubble()
//                                            }
//                                        },
//                                        class: 'ivu-icon ivu-icon-edit',
//                                        style: {
//                                            'margin-left': '18px'
//                                        }
//                                    }),
//                                    h('p', [h('span', {
//                                        style: {
//                                            'font-size': '32px'
//                                        }
//                                    }, per + '%'), h('span', {
//                                        style: {
//                                            'font-size': '14px',
//                                            'color': '#9EA7B4'
//                                        }
//                                    }, '(￥' + item.expense_money + ')')]), // 82% (￥134312)
//                                    h('Progress', {
//                                        props: {
//                                            percent: per
//                                        }
//                                    }), // 进度条
//                                    h('div', {
//                                        style: {
//                                            'width': '170px',
//                                            'height': '2px',
//                                            'borderTop': '1px solid #D7DDE4',
//                                            'margin': '9px 0 6px'
//                                        }
//                                    }),
//                                    h('p', {
//                                        style: {
//                                            'font-size': '12px',
//                                            'float': 'left'
//                                        }
//                                    }, '预算总量 ￥' + item.total_money),
//                                    h('p', {
//                                        style: {
//                                            'font-size': '12px',
//                                            'float': 'right',
//                                            'color': '#FE6F6E'
//                                        }
//                                    }, '已结束')
//                                ])
//                            }
//                        } else {
//                            doc['label'] = (h) => {
//                                return h('div', [
//                                    h('span', {
//                                        style: {
//                                            'font-size': '20px'
//                                        }
//                                    }, item.datetime), // 8月份
//                                    h('p', [h('span', {
//                                        style: {
//                                            'font-size': '32px'
//                                        }
//                                    }, per + '%'), h('span', {
//                                        style: {
//                                            'font-size': '14px',
//                                            'color': '#9EA7B4'
//                                        }
//                                    }, '(￥' + item.expense_money + ')')]), // 82% (￥134312)
//                                    h('Progress', {
//                                        props: {
//                                            percent: per,
//                                            'hide-info': ''
//                                        }
//                                    }), // 进度条
//                                    h('div', {
//                                        style: {
//                                            'width': '170px',
//                                            'height': '2px',
//                                            'borderTop': '1px solid #D7DDE4',
//                                            'margin': '9px 0 6px'
//                                        }
//                                    }),
//                                    h('p', {
//                                        style: {
//                                            'font-size': '12px',
//                                            'float': 'left'
//                                        }
//                                    }, '预算总量 ￥' + item.total_money),
//                                    h('p', {
//                                        style: {
//                                            'font-size': '12px',
//                                            'float': 'right',
//                                            'color': '#FE6F6E'
//                                        }
//                                    }, '已结束')
//                                ])
//                            }
//                        }
                        this.tabList.push(doc)
                    })
                    this.tabClick(this.dynTabList[0].datetime)
                }
                if (this.isleafPlace) {
                    var date = ''
                    if (this.dynTabList.length > 0) {
                        var lastDate = this.dynTabList[this.dynTabList.length - 1].datetime.substring(0, 7)
                        var arr = lastDate.split('-')
                        var month = parseInt(arr[1]) + 1
                        if (month == 13) {
                            arr[1] = '01'
                            arr[0] = parseInt(arr[0]) + 1
                        } else {
                            arr[1] = month < 10 ? ('0' + month) : month.toString()
                        }
                        date = arr.join('-')
                    } else {
                        date = Format(new Date(), 'yyyy-MM')
                    }
                    this.tabList.push({
                        name: date,
                        label: (h) => {
                            return h('div',
                                {
                                    style: {
                                        'text-align': 'center',
                                        'width': '170px',
                                        'height': '137px'
                                    }
                                },
                                [h('i', {
                                    class: 'ivu-icon ivu-icon-android-add',
                                    style: {
                                        'font-size': '100px',
                                        'color': 'gainsboro',
                                        'margin-right': '50px',
                                        'margin-top': '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(date, this.curPlaceId, this.curFPlace, true)
                                            this.stopBubble()
                                        }
                                    }
                                })])
                        }
                    })
                }
            },
            edit (month, placeId, placeName, isnew = null) {
                if (isnew) {
                    var obj = {
                        datetime: month,
                        total: 0,
//                        expense: '',
                        place_id: placeId,
                        budget_finances: []
                    }
                    this.$refs.editWin.open(obj, placeName)
                } else {
                    FinanceHttp.getBudgetByMonthPlace(month, placeId)
                        .then(data => {
                            this.$refs.editWin.open(data, placeName)
                        })
                }
            },
            refresh () {
                this.yearChange()
//                FinanceHttp.getYearFinanceByPlace(this.curYear, this.curPlaceId).then((data) => {
//                    this.yearFinance = data
//                })
//                    .catch(error => {
//                        console.error(error)
//                    })
            },
            tabClick (data) {
                if (!data) {
                    this.option.series = []
                    this.option.xAxis[0].data = []
                    this.chart.setOption(this.option, true)
                    return
                }
                var year = data.substring(0, 4)
                var month = data.substring(5, 7)
                var day1 = data
                var day2 = data.substring(0, 8) // 2018-04-
                day2 += Format(new Date(year, month, 0), 'dd')
                var arg = {
                    begin: day1,
                    end: day2,
                    place_id: '',
                    calc_last_year: 1,
                    calc_sum: 1
                }
                FinanceHttp.getBudgetSData(arg)
                    .then(data => {
                        this.chartData = data
//                        this.chartData = {
//                            date: ['2018-02-01', '2018-02-02', '2018-02-03', '2018-02-04', '2018-02-05', '2018-02-06', '2018-02-07', '2018-02-08', '2018-02-09', '2018-02-10', '2018-02-11', '2018-02-12', '2018-02-13', '2018-02-14', '2018-02-15', '2018-02-16', '2018-02-17', '2018-02-18', '2018-02-19', '2018-02-20', '2018-02-21', '2018-02-22', '2018-02-23', '2018-02-24', '2018-02-25', '2018-02-26', '2018-02-27', '2018-02-28'],
//                            current: [this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom()],
//                            last: [this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom()],
//                            sum: [this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom()],
//                            lastsum: [this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom(), this.makeRandom()],
//                            budget: ['1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000']
//                        }
                        /* this.option = {
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
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['预算', '本年支出', '本年累加支出', '去年支出', '去年累加支出']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: data.date,
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
                                    name: '预算',
                                    type: 'line',
                                    // yAxisIndex: 1,
                                    data: data.budget,
                                    itemStyle: {
                                        normal: {
                                            color: '#95BB6C' // #FFD700 黄色，#95BB6C淡绿色 #F5A623橙色
                                        }
                                    }
                                },
                                {
                                    name: '本年支出',
                                    type: 'bar',
                                    data: data.current,
                                    itemStyle: {
                                        normal: {
                                            color: '#FFD700' // #FFD700 黄色，#95BB6C 淡绿色 #F5A623 橙色
                                        }
                                    }
                                },
                                {
                                    name: '本年累加支出',
                                    type: 'line',
                                    // yAxisIndex: 1,
                                    data: data.sum,
                                    itemStyle: {
                                        normal: {
                                            color: '#FFD700' // #FFD700 黄色，#95BB6C淡绿色 #F5A623橙色
                                        }
                                    }
                                },
                                {
                                    name: '去年支出',
                                    type: 'bar',
                                    data: data.last, // data.last,
                                    itemStyle: {
                                        normal: {
                                            color: '#F5A623' // #FFD700 黄色，#95BB6C淡绿色 #F5A623 橙色
                                        }
                                    }
                                },
                                {
                                    name: '去年累加支出',
                                    type: 'line',
                                    data: data.lastsum,
                                    itemStyle: {
                                        normal: {
                                            color: '#F5A623' // #FFD700 黄色，#95BB6C淡绿色 #F5A623橙色
                                        }
                                    }
                                }
                            ]
                        } */
                        this.option.xAxis[0].data = this.chartData.date
                        this.series[0].data = this.chartData.budget
                        this.series[1].data = this.chartData.current
                        this.series[2].data = this.chartData.sum
                        this.series[3].data = this.chartData.last
                        this.series[4].data = this.chartData.lastsum
                        this.option.series = this.series
                        this.chart.setOption(this.option, true)
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            // 测试用，用于构造随机数，将来需要删除
            makeRandom () {
                return Math.round(Math.random() * 1000)
            },
            stopBubble (e) {
                if (e && e.stopPropagation) { // 非IE
                    e.stopPropagation()
                } else { // IE
                    window.event.cancelBubble = true
                }
            }
        },
        watch: {
            search (v) {
                this.ztreeSearch(this.ztreeObj, this.spaceData, v)
            }
        }
    }
</script>
