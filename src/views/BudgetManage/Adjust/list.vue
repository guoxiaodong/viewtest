<style>
    .title{
        font-size: 16px;
        color: #464C5B;
        margin-top: 15px;
    }
    .group-title{
        margin-top: 5px;
        font-size: 14px;
        color: #464C5B;
        font-weight: bold;
    }
    .group-time{
        margin-top: 5px;
        font-size: 12px;
        color: #ABBDC2;
        float: right;
        margin-right: 5px;
    }
    .wo-title{
        /*margin-top: 15px;*/
        font-size: 12px;
        color: #464C5B
    }
    .wo-time{
        /*margin-top: 15px;*/
        font-size: 10px;
        color: #ABBDC2;
        margin-right: 5px;
    }
    .wo-type{
        background-color: #FFE79B;
        width: 45px;
        height: 20px;
        font-size: 10px;
        color: #CD7F40
    }
    .wo-desc{
        font-size: 10px;
        color: #93B0B9
    }
    .wo-priority{
        font-size: 10px;
        width: 45px;
        height: 20px;
        color: #ff3366;
        background-color: #f3cccc;
    }
    #test{
        visibility: inherit;
    }
    .itembg { background-color: #f5f7f9; height: 20px; }
    .Flex-title {
        height: 46px; line-height: 46px; border-bottom: 1px solid #D7DDE4; margin: 0 20px;
    }
    .title , .Flex-title span { font-size: 16px; color: #464C5B; font-weight: normal; }
</style>
<template>
    <div style="background-color:;">
        <div class="innerheader" style="border-bottom: none;">
            <span>预算调整</span>
            <a style="float: right;font-size: 14px;color:#3399FF " @click="goOverview">返回</a>
        </div>
        <div class="itembg"></div>
        <div class="modalcontent" style="border: none; margin: 0; background-color: #f5f7f9;">
            <div class="flex">
                <div class="flex-1" v-show="leftShow" style="background-color: #ffffff">
                    <div class="Flex-title">
                       <span class="title">未结算工单</span>
                    </div>
                    <div style="margin-top:10px; margin-left: 20px; margin-right: 20px;">
                        <Input v-model="search" placeholder="请输入搜索内容" style="width: 100%;"></Input>
                    </div>
                    <div style="margin-top: 10px; margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
                        <Button @click="supClick" type="primary" style="width: 48%; float:left">供应商</Button>
                        <Button @click="subjectClick" type="primary" style="width: 48%; float: right;">科目</Button>
                    </div>
                    <div class="clear"></div>
                    <div id="panel" style=" margin-left: 20px; margin-right: 20px;">
                        <ul>
                            <li v-for="(item,index) in leftData">
                                <!--工单组-->
                                <p>
                                    <span class="group-title" :title="item.group_title">{{item.group_title?(item.group_title.length>10?(item.group_title.substring(0,15)+'...'):item.group_title):'暂无标题'}}</span>
                                    <span class="group-title" style="float: right">¥{{item.group_money?item.group_money:0}}</span>
                                    <span class="group-time" :title="item.group_time">{{item.group_time?item.group_time.substring(5,10):'暂无时间'}}</span>
                                </p>
                                <div style="margin-top: 15px">
                                <!--工单-->
                                <p>
                                    <!--<a @click="">{{item.title}}</a>-->
                                    <span class="wo-title" :title="item.title">{{item.title?(item.title.length>10?(item.title.substring(0,15)+'...'):item.title):'暂无标题'}}</span>
                                    <span class="wo-title" style="float: right">¥{{item.money?item.money:0}}</span>
                                    <span class="wo-time" style="float: right" :title="item.created_at">{{item.created_at?item.created_at.substring(5,10):''}}</span>
                                </p>
                                <!--状态 描述-->
                                <p>
                                    <Badge :count="item.wotype_name" class-name="wo-type"></Badge>
                                    <Badge :count="item.priority_name" class-name="wo-priority"></Badge>
                                    <span class="wo-desc" :title="item.description">{{item.description?(item.description.length>10?(item.description.substring(0,10)+'...'):item.description):'暂无描述'}}</span>
                                </p>
                                </div>
                                <div class="me" v-show="item.flag">
                                    <ul>
                                        <li v-for="(subItem,subIndex) in item.otherGroupOrder">
                                            <div  style="margin-top: 5px">
                                                <!--工单-->
                                                <p>
                                                    <!--<a @click="">{{item.title}}</a>-->
                                                    <span class="wo-title" :title="subItem.title">{{subItem.title?(subItem.title.length>15?(subItem.title.substring(0,15)+'...'):subItem.title):''}}</span>
                                                    <span class="wo-title" style="float: right">¥{{subItem.money?subItem.money:0}}</span>
                                                    <span class="wo-time" :title="subItem.created_at" style="float: right">{{subItem.created_at?subItem.created_at.substring(5,10):''}}</span>
                                                </p>
                                                <!--状态 描述-->
                                                <p>
                                                    <Badge :count="subItem.wotype_name" class-name="wo-type"></Badge>
                                                    <Badge :count="subItem.priority_name" class-name="wo-priority"></Badge>
                                                    <!--<span class="wo-priority">{{item.priority_name}}</span>&nbsp;-->
                                                    <span class="wo-desc" :title="subItem.description">{{subItem.description?(subItem.description.length>10?(subItem.description.substring(0,10)+'...'):subItem.description):''}}</span>
                                                </p>
                                            </div>
                                            <!--<a @click="">{{subItem.title}}</a><span>{{subItem.created_at}}</span>
                                            <p><span>{{subItem.wotype_name}}</span>&nbsp;<span>{{subItem.priority_name}}</span>&nbsp;<span>{{subItem.description}}</span></p>-->
                                        </li>
                                    </ul>
                                </div>
                                <div class="text-center">
                                    <i class="ivu-icon ivu-icon-android-menu" @click="itemIconClick(item)" style="font-size:20px"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="width: 25px; text-align: center;margin: 200px 0px 0px 0px;" >
                    <i class="ivu-icon ivu-icon-chevron-left" v-show="leftShow" @click="iconClick"></i>
                    <i class="ivu-icon ivu-icon-chevron-right" v-show="!leftShow" @click="iconClick"></i>
                </div>
                <div class="flex-2" style="margin-left: 20px; background-color: #fff;">
                    <div >
                        <div style="height:30px; position: relative">
                            <div class="Flex-title">
                                <span class="title">预算调整</span>
                            </div>
                            <div style="position: absolute; right: 20px; top: 10px;">
                                <Checkbox v-model="isTitle" @on-change="cbgroupChange">工单标题</Checkbox>
                                <Checkbox v-model="isNo" @on-change="cbgroupChange">工单编号</Checkbox>
                                <Checkbox v-model="isSupplier" @on-change="cbgroupChange">供应商</Checkbox>
                                <!--<CheckboxGroup v-model="cbGroup" @on-change="cbgroupChange">&lt;!&ndash;v-model=""&ndash;&gt;-->
                                <!--<Checkbox label="woTitle">工单标题</Checkbox>-->
                                <!--<Checkbox label="woNo">工单编号</Checkbox>-->
                                <!--<Checkbox label="supplier">供应商</Checkbox>-->
                                <!--&lt;!&ndash;<Checkbox label="planTitle">计划标题</Checkbox>&ndash;&gt;-->
                                <!--</CheckboxGroup>-->
                                <i class="ivu-icon ivu-icon-navicon-round" style="font-size: 16px; margin-top: 3px; margin-right: 3px;" @click="conditionClick" title="筛选"></i><a @click="conditionClick">筛选</a>&nbsp;&nbsp;&nbsp;&nbsp;<a @click="colorClick">图表配置</a>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <!--节点定位-->
                        <div style="margin: 7px 20px 10px;">
                            <Input v-model="visSearchStr" placeholder="请输入要搜索的工单编号" style="width: 60%;"></Input>
                            <Button @click="visSearch" type="primary">搜索</Button>
                        </div>
                        <div style="background-color: #ffffff; margin: 0 20px;">
                            <div v-show="novis" style="padding-left: 20px">无数据</div>
                            <!--预算调整图表-->
                            <div id="visualization" class="me-def"></div>
                        </div>
                        <div style="margin: 26px 20px 16px">
                            <div class="Flex-title">
                                <span class="title">支出统计</span>
                            </div>
                        </div>
                        <div style="background-color: #ffffff;height:304px; margin: 0 20px;">
                            <div id="echart" style="height:300px">echart图表</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="test" style="display:none">
            </div>
        </div>
        <subject ref="subject" @subCondition="subCondition"></subject>
        <supplier ref="supplier" @supCondition="supCondition"></supplier>
        <conditions ref="conditions" @conCallback="conCallback"></conditions>
        <color ref="color" @colorCallback="colorCallback"></color>
        <settleEdit ref="settleEdit" @settleCallback="settleCallback"></settleEdit>
    </div>
</template>
<script>
    require('vis/dist/vis.css')
    // import $ from 'Jquery'
    import vis from 'vis/dist/vis.js'
    import echarts from 'echarts'
    import subject from './components/subject'
    import supplier from './components/supplier'
    import conditions from './components/conditions'
    import color from './components/color'
    import settleEdit from './components/settleEdit'
    import _ from 'lodash'
    import {Format} from '@/util/timeFormat'
    import FinanceHttp from 'server/http/finance'
    export default {
        components: {
            subject, supplier, conditions, color, settleEdit
        },
        created () {
            this.$emit('updateActive', '5-0')
        },
        data () {
            return {
                novis: false,
                color: '',
                search: '',
                visSearchStr: '', // 搜索vis用
                testVis: null, // 测试用
                visItem: null,
                leftShow: true,
                titleShow: false, // checkbox
                noshow: false, // checkbox
                supplierShow: false, // checkbox
                planTitle: false, // checkbox
                itemShow: false, // 用于测试拉伸效果
                leftData: [
//                    {
//                        'id': 1,
//                        'title': 'PB新大厦 1F 计划', // 工单标题
//                        'group_title': '工单组标题', // 工单组标题
//                        'description': 'this is description', // 描述
//                        'group_sign': 'sdf',
//                        'priority': 3,
//                        'status': 2,
//                        'money': '10.00', // 工单金额
//                        'b_id': 1,
//                        'group_time': '2017-10-27 16:55:01',          // 工单组创建时间
//                        'created_at': '2017-10-27 16:55:01', // 工单创建时间
//                        'group_money': '10.00', // 工单组金额
//                        'flag': false,
//                        'otherGroupOrder': [ // 工单组其他工单
//                            {
//                                'id': 31,
//                                'title': 'PB新大厦 北楼一层 维修',
//                                'group_title': null,
//                                'description': '需要新增一个工位',
//                                'group_sign': 'sdf',
//                                'priority': 3,
//                                'status': 5,
//                                'money': '20.00',
//                                'b_id': 1,
//                                'created_at': '2017-10-30 13:31:21',
//                                'status_name': '完成',
//                                'priority_name': '低',
//                                'wotype_name': '',
//                                'source_name': ''
//                            }
//                        ],
//                        'status_name': '已分配',
//                        'priority_name': '低',
//                        'wotype_name': '维修',
//                        'source_name': '',
//                        'supplier': {
//                            'id': 1,
//                            'name': '测试',
//                            'servicescore': null,
//                            'logo': null,
//                            'cooperatestatus_name': '',
//                            'contractstatus_name': ''
//                        }
//                    },
//                    {
//                        'id': 41,
//                        'title': 'PB新大厦 北楼一层 O-1B-08 计划',
//                        'group_title': '工单组标题2',
//                        'description': '每日例行检查会议室音视频设备。',
//                        'group_sign': null,
//                        'priority': 3,
//                        'status': 4,
//                        'money': '1.00',
//                        'b_id': 1,
//                        'created_at': '2017-11-01 07:00:02',
//                        'group_money': '1.00',
//                        'otherGroupOrder': [],
//                        'status_name': '已撤销',
//                        'priority_name': '低',
//                        'wotype_name': '',
//                        'source_name': '',
//                        'supplier': {
//                            'id': 1,
//                            'name': '测试',
//                            'servicescore': null,
//                            'logo': null,
//                            'cooperatestatus_name': '',
//                            'contractstatus_name': ''
//                        }
//                    }
                ],
                visData: {
                    'datescope': {
                        'from': '2017-10-27 17:10:00',
                        'to': '2018-02-06 17:00:00'
                    },
                    'builds': [
                        {
                            'name': 'PB新大厦',
                            'workorders': [
                                {
                                    'id': 1,
                                    'title': 'PB新大厦 1F 计划',
                                    'workorderid': 'O15090945010690P',
                                    'b_id': 1,
                                    'money': '10.00',
                                    'is_settle_account': 0,
                                    'planstart': '2017-10-27 17:10:00',
                                    'planfinish': '2017-11-27 17:37:00',
                                    'settle_account_time': '2018-01-01 00:00:00',
                                    'status_name': '',
                                    'status': 1,
                                    'priority_name': '',
                                    'wotype_name': '',
                                    'source_name': '',
                                    'supplier': {
                                        'id': 1,
                                        'name': '测试',
                                        'servicescore': null,
                                        'logo': null,
                                        'cooperatestatus_name': '',
                                        'contractstatus_name': ''
                                    }
                                }
                            ],
                            'plan_workorders': [
                                {
                                    'id': 341,
                                    'title': '新风机组',
                                    'planstart': '2018-01-06 10:00:00',
                                    'planfinish': '2018-02-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 2,
                                    'suplier': null
                                },
                                {
                                    'id': 1161,
                                    'title': '卫生',
                                    'planstart': '2017-01-06 16:10:00',
                                    'planfinish': '2017-02-06 16:20:00',
                                    'settle_account_time': '2018-02-06 16:20:00',
                                    'money': '1.00',
                                    'status': 1,
                                    'suplier': null
                                },
                                {
                                    'id': 1171,
                                    'title': '卫生',
                                    'planstart': '2017-02-06 16:20:00',
                                    'planfinish': '2017-03-06 16:30:00',
                                    'settle_account_time': '2018-02-06 16:30:00',
                                    'money': '1.00',
                                    'status': 6,
                                    'suplier': null
                                },
                                {
                                    'id': 1181,
                                    'title': '卫生',
                                    'planstart': '2017-03-06 16:30:00',
                                    'planfinish': '2017-04-06 16:40:00',
                                    'settle_account_time': '2018-02-06 16:40:00',
                                    'money': '1.00',
                                    'status': 5,
                                    'suplier': null
                                },
                                {
                                    'id': 1191,
                                    'title': '卫生',
                                    'planstart': '2017-05-06 16:40:00',
                                    'planfinish': '2017-06-06 16:50:00',
                                    'settle_account_time': '2018-02-06 16:50:00',
                                    'money': '1.00',
                                    'status': 4,
                                    'suplier': null
                                },
                                {
                                    'id': 1201,
                                    'title': '卫生',
                                    'planstart': '2017-06-06 16:50:00',
                                    'planfinish': '2017-07-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 3,
                                    'suplier': null
                                },
                                {
                                    'id': 1211,
                                    'title': '卫生',
                                    'planstart': '2017-07-06 16:00:00',
                                    'planfinish': '2017-08-06 16:10:00',
                                    'settle_account_time': '2018-02-06 16:10:00',
                                    'money': '1.00',
                                    'status': 2,
                                    'suplier': null
                                },
                                {
                                    'id': 1301,
                                    'title': '给排水管道',
                                    'planstart': '2017-08-06 16:00:00',
                                    'planfinish': '2017-09-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 1,
                                    'suplier': null
                                },
                                {
                                    'id': 1337,
                                    'title': '地面',
                                    'planstart': '2017-09-06 14:10:00',
                                    'planfinish': '2017-10-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 6,
                                    'suplier': null
                                },
                                {
                                    'id': 1467,
                                    'title': '电梯',
                                    'planstart': '2017-10-06 15:07:00',
                                    'planfinish': '2017-11-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 5,
                                    'suplier': null
                                },
                                {
                                    'id': 1474,
                                    'title': '电梯',
                                    'planstart': '2017-11-06 14:29:00',
                                    'planfinish': '2017-12-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 4,
                                    'suplier': null
                                },
                                {
                                    'id': 1476,
                                    'title': '电梯',
                                    'planstart': '2018-02-06 10:06:00',
                                    'planfinish': '2018-03-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 3,
                                    'suplier': null
                                },
                                {
                                    'id': 1515,
                                    'title': '配线架',
                                    'planstart': '2018-02-06 16:35:00',
                                    'planfinish': '2018-04-06 16:40:00',
                                    'settle_account_time': '2018-02-06 16:40:00',
                                    'money': '1.00',
                                    'status': 2,
                                    'suplier': null
                                },
                                {
                                    'id': 1558,
                                    'title': '电梯',
                                    'planstart': '2018-02-06 10:06:00',
                                    'planfinish': '2018-05-06 17:00:00',
                                    'settle_account_time': '2018-02-06 17:00:00',
                                    'money': '1.00',
                                    'status': 1,
                                    'suplier': null
                                }
                            ]
                        }
                    ]
                },
                subData: [], // 科目所有数据,只做数据库返回的数据记录用
                subjectData: [], // 未完成工单 科目筛选条件用
                financeData: [], // 图表科目条件筛选用
                selSubData: '', // 科目已选择数据,作为条件,多个用逗号连接
                supData: [],
                selSupData: '', // 供应商已选择数据，作为条件，多个用逗号连接
                placeData: [], // 空间地点数据
                buildData: [], // 门店数据
                colorData: [],
                cbGroup: [],
                isTitle: false,
                isNo: false,
                isSupplier: false,
                timeline: null,
                myChart: null,
                chartArg: '',
                selectId: '' // 用于标识vis中当前选中node的id，也就是工单id
            }
        },
        mounted () {
            // 科目筛选条件
            FinanceHttp.getAll().then((data) => {
                this.subData = data
                this.subjectData = _.cloneDeep(data)
                this.financeData = _.cloneDeep(data)
                this.subjectData.forEach(item => {
                    item['checked'] = false
                    if (item.fid) {
                        item['nocheck'] = false
                    } else {
                        item['nocheck'] = true
                    }
                })
                this.financeData.forEach(item => {
                    item['checked'] = false
                    if (item.fid) {
                        item['nocheck'] = false
                    } else {
                        item['nocheck'] = true
                    }
                })
            })
                .catch(error => {
                    this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                })

            // 供应商筛选条件
            FinanceHttp.supplierLists()
                .then(data => {
                    data.forEach(item => {
                        this.supData.push({
                            id: item.id,
                            name: item.name,
                            checked: false
                        })
                    })
                })
                .catch(error => {
                    this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                })

            this.getLeftListData()
            // this.makeVIS() // 必须在这里调用，否则出不来

            // 图表筛选条件的基础数据获取
            FinanceHttp.getSpace().then((data) => {
                this.placeData = data
            }).catch(error => {
                this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
            })
            var dateRange = [new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)]
            Promise.all([FinanceHttp.getBudgetColors(), FinanceHttp.budgetSBuildingWorkorder({begin: dateRange[0], end: dateRange[1], type: 1})])
                .then(([colorData, visData]) => {
                    this.visData = visData
                    this.colorData = colorData
                    this.makeVIS()
                    this.makeEchart()
                })
                .catch(error => {
                    this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                })

            // this.timeline = new vis.Timeline(document.getElementById('visualization'))
            this.myChart = echarts.init(document.getElementById('echart'))
            // this.test()
        },
        methods: {
            test: function () {
                var groupCount = 3
                var itemCount = 1

                // create a data set with groups
                var names = ['John', 'Alston', 'Lee', 'Grant']
                var groups = new vis.DataSet()
                for (var g = 0; g < groupCount; g++) {
                    groups.add({id: g, content: names[g]})
                }

                // create a dataset with items
                var items = new vis.DataSet()
                for (var i = 0; i < itemCount; i++) {
                    var start = new Date().getTime() + Math.random() * 200 * 60 * 60 * 1000
                    var group = Math.floor(Math.random() * groupCount)
                    items.add({
                        id: i,
                        group: group,
                        content: 'item ' + i +
                        ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
                        start: start,
                        type: 'box'
                    })
                }

                // create visualization
                var container = document.getElementById('test')
                var options = {
                    groupOrder: 'content'  // groupOrder can be a property name or a sorting function
                }

                var timeline = new vis.Timeline(container)
                timeline.setOptions(options)
                timeline.setGroups(groups)
                timeline.setItems(items)
//                setTimeout(() => {
//                    $('#test .vis-timeline vis-bottom').css({'visibility': 'visible'})
//                }, 2000)
                // DOM element where the Timeline will be attached
//                var container = document.getElementById('test')
//                // Create a DataSet (allows two way data-binding)
//                var items = new vis.DataSet([
//                    {id: 1, content: 'item 1', start: '2014-04-20'},
//                    {id: 2, content: 'item 2', start: '2014-04-14'},
//                    {id: 3, content: 'item 3', start: '2014-04-18'},
//                    {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
//                    {id: 5, content: 'item 5', start: '2014-04-25'},
//                    {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
//                ])
//                // Configuration for the Timeline
//                var options = {}
//                // Create a Timeline
//                var timeline = new vis.Timeline(container, items, options)
//                var dateRange = [new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)]
//                timeline.setWindow(dateRange[0], dateRange[1])
            },
            visSearch: function () {
                var selList = this.visItem.filter((value) => {
                    return value.content.indexOf(this.visSearchStr) != -1
                })
                var ids = selList.map(function (value) {
                    return value.id
                })
                this.timeline.setSelection(ids, {focus: true})
            },
            goOverview: function () {
                location.href = '/#/BudgetManage/Overview'
            },
            getLeftListData () {
                var arg = {}
                if (this.selSubData != '') {
                    arg['finances'] = this.selSubData
                }
                if (this.selSupData != '') {
                    arg['suppliers'] = this.selSupData
                }
                if (this.sSearch != '') {
                    arg['sSearch'] = this.sSearch
                }
                FinanceHttp.budgetSNotSettledWorkorders(arg)
                    .then(data => {
                        data.forEach(item => {
                            item['flag'] = false // 默认只显示第一条工单，其余折叠
                        })
                        this.leftData = data
//                        this.leftData.push({
//                            'id': 1,
//                            'title': 'PB新大厦 1F 计划', // 工单标题
//                            'group_title': '工单组标题', // 工单组标题
//                            'description': 'this is description', // 描述
//                            'group_sign': 'sdf',
//                            'priority': 3,
//                            'status': 2,
//                            'money': '10.00', // 工单金额
//                            'b_id': 1,
//                            'group_time': '2017-10-27 16:55:01',          // 工单组创建时间
//                            'created_at': '2017-10-27 16:55:01', // 工单创建时间
//                            'group_money': '10.00', // 工单组金额
//                            'flag': false,
//                            'otherGroupOrder': [ // 工单组其他工单
//                                {
//                                    'id': 31,
//                                    'title': 'PB新大厦 北楼一层 维修',
//                                    'group_title': null,
//                                    'description': '需要新增一个工位',
//                                    'group_sign': 'sdf',
//                                    'priority': 3,
//                                    'status': 5,
//                                    'money': '20.00',
//                                    'b_id': 1,
//                                    'created_at': '2017-10-30 13:31:21',
//                                    'status_name': '完成',
//                                    'priority_name': '低',
//                                    'wotype_name': '',
//                                    'source_name': ''
//                                }
//                            ],
//                            'status_name': '已分配',
//                            'priority_name': '低',
//                            'wotype_name': '维修',
//                            'source_name': '',
//                            'supplier': {
//                                'id': 1,
//                                'name': '测试',
//                                'servicescore': null,
//                                'logo': null,
//                                'cooperatestatus_name': '',
//                                'contractstatus_name': ''
//                            }
//                        })
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            iconClick () {
                this.leftShow = !this.leftShow
            },
            itemIconClick (value) {
                value.flag = !value.flag
            },
            makeVIS () {
                // DOM element where the Timeline will be attached
                // var container = document.getElementById('visualization')

                // create a data set with groups
                var groups = new vis.DataSet()
                this.visItem = []
                this.visData.builds.forEach((build, index) => {
                    groups.add({id: index, content: build.name})
                    // items
                    build.workorders.forEach((wo, i) => {
                        var content = wo.money
                        if (this.isTitle) {
                            content = '<span>' + wo.title + '</span><br/>' + content
                        }
                        if (this.isNo) {
                            content = '<span>' + wo.workorderid + '</span><br/>' + content
                        }
                        if (this.isSupplier) {
                            var supplier = wo.supplier ? (wo.supplier.name ? wo.supplier.name : '暂无供应商') : '暂无供应商'
                            content = content + '<br/><span>' + supplier + '</span>'
                        }
//                        if (this.cbGroup.indexOf('woTitle') != -1) {
//                            content = '<span>' + wo.title + '</span><br/>' + content
//                        }
//                        if (this.cbGroup.indexOf('woNo') != -1) {
//                            content = '<span>' + wo.workorderid + '</span><br/>' + content
//                        }
//                        if (this.cbGroup.indexOf('supplier') != -1) {
//                            var supplier = wo.supplier ? (wo.supplier.name ? wo.supplier.name : '暂无供应商') : '暂无供应商'
//                            content = content + '<br/><span>' + supplier + '</span>'
//                        }

                        var tooltip = wo.is_settle_account ? '未结算' : '已结算:' + wo.settle_account_time
                        var bgColor = ''
                        if (this.colorData && (this.colorData.user || this.colorData.default)) {
                            var colorObj = this.colorData.user.find(u => {
                                return u.id == wo.status
                            })
                            if (colorObj) {
                                bgColor = colorObj.budget_chart_color
                            } else {
                                colorObj = this.colorData.default.find(d => {
                                    return d.id == wo.status
                                })
                                if (colorObj) {
                                    bgColor = colorObj.budget_chart_color
                                }
                            }
                        }
                        var temp = this.visItem.filter(i => {
                            return i.id == wo.id
                        })
                        if (temp.length == 0) {
                            this.visItem.push({
                                id: wo.id,
                                content: content,
                                group: index,
                                start: wo.planstart,
                                end: wo.planfinish,
                                title: tooltip,
                                editable: false,
                                selectable: true, // 后续需根据流程状态设置值
                                style: bgColor ? ('background-color: ' + bgColor) : ''
                            })
                        } else {
                            console.error('vis有冗余数据：', wo)
                        }
                        /* items.add({
                            id: 10000 + i,
                            content: wo.money,
                            type: 'point',
                            group: index,
                            start: wo.settle_account_time,
                            editable: true
                        }) */
                    })
                    build.plan_workorders.forEach((wo, i) => {
                        var content = wo.money
                        if (this.cbGroup.indexOf('woTitle') != -1) {
                            content = '<span>' + wo.title + '</span><br/>' + content
                        }
                        if (this.cbGroup.indexOf('woNo') != -1) {
                            content = '<span>' + (wo.workorderid ? wo.workorderid : '暂无编号') + '</span><br/>' + content
                        }
                        if (this.cbGroup.indexOf('supplier') != -1) {
                            var supplier = wo.supplier ? (wo.supplier.name ? wo.supplier.name : '暂无供应商') : '暂无供应商'
                            content = content + '<br/><span>' + supplier + '</span><br/>'
                        }
                        var tooltip = wo.is_settle_account ? '未结算' : '已结算:' + wo.settle_account_time
                        var temp = this.visItem.filter(i => {
                            return i.id == wo.id
                        })
                        if (temp.length == 0) {
                            this.visItem.push({
                                id: wo.id,
                                content: content,
                                group: index,
                                start: wo.planstart,
                                end: wo.planfinish,
                                title: tooltip,
                                editable: false,
                                selectable: false, // 计划工单不允许编辑结算时间
                                style: 'background-color: #d4d4d4'
                            })
                        } else {
                            console.error('vis有冗余数据：', wo)
                        }
                        /* items.add({
                            id: 10000 + i,
                            content: wo.money,
                            type: 'point',
                            group: index,
                            start: wo.settle_account_time,
                            editable: true
                        }) */
                    })
                })
                // Configuration for the Timeline
                var options = {
                    editable: {
                        add: false,         // add new items by double tapping
                        updateTime: false,  // drag items horizontally
                        updateGroup: false, // drag items from one group to another
                        remove: false,       // delete an item by tapping the delete button top right
                        overrideItems: false  // allow these options to override item.editable
                    }// ,
                    // groupOrder: 'content'
                }
                var items = new vis.DataSet()
                // items.add(this.visItem)
                this.visItem.forEach((item, index) => {
                    items.add(item)
                })
                try {
                    this.timeline.destroy()
                } catch (error) {}
//                if (this.timeline) {
//                    this.timeline.destroy()
//                }
                this.timeline = new vis.Timeline(document.getElementById('visualization'), items, groups, options)
                // Create a Timeline
//                this.timeline.setOptions(options)
//                this.timeline.setGroups(groups)
//                this.timeline.setItems(items)
                // event：add，update，remove
//                items.on('update', function (event, properties, senderId) {
//                })

//                this.timeline.on('select', properties => {
//                    this.selectId = properties.items[0]
//                })
//                this.timeline.on('click', (properties) => {
//                })
                this.timeline.on('doubleClick', (properties) => {
                    // 如果有当前选中项，双击打开模态框编辑结算时间
                    if (properties.item) {
                        var temp = null
                        this.visData.builds.forEach(build => {
                            temp = build.workorders.find(w => {
                                return w.id == properties.item
                            })
                        })
                        if (temp && temp.is_settle_account == 0) {
                            this.$refs.settleEdit.open(temp)
                        }
                    }
                })

                // var dateRange = [new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)]
                // this.timeline.setWindow(dateRange[0], dateRange[1])
                if (items.length == 0) {
                    this.novis = true
//                    $('#visualization .vis-timeline').css({'visibility': 'visible'})
                }
                // this.timeline.setWindow(this.visData.datescope.from, this.visData.datescope.to)
            },
            subjectClick () {
                if (this.subjectData && this.subjectData.length > 0) {
// 与this.checkSubData数据比对后打开界面
                    this.$refs.subject.open(this.subjectData)
                } else {
                    this.$Message.error('暂未获取到科目数据')
                }
            },
            // 科目条件选择返回后的回调
            subCondition (data) {
                // 先将this.subData的所有checked置为false，然后再讲data匹配的值赋值为true
                this.subjectData.forEach(i => {
                    var index = data.findIndex(s => {
                        return s.id == i.id
                    })
                    if (index != -1) {
                        i.checked = true
                    } else {
                        i.checked = false
                    }
                })
                this.selSubData = _.map(data, 'id').join()
                this.getLeftListData()
            },
            supClick () {
                if (this.subData && this.subData.length > 0) {
                    this.$refs.supplier.open(this.supData)
                } else {
                    this.$Message.error('暂未获取到供应商数据')
                }
            },
            supCondition (data) {
                this.supData.forEach(item => {
                    var index = data.findIndex(s => {
                        return s.id == item.id
                    })
                    if (index != -1) { // 当前项被选中
                        item.checked = true
                    } else {
                        item.checked = false
                    }
                })
                this.selSupData = _.map(data, 'id').join()
                this.getLeftListData()
            },
            conditionClick () {
                if ((this.financeData && this.financeData.length > 0) && (this.placeData && this.placeData.length > 0)) {
                    this.$refs.conditions.open(this.financeData, this.placeData)
                }
            },
            conCallback (data) {
                // 先根据选择的数据，更新双向绑定数据，用于下次模态框弹出时数据恢复，然进行http请求获取数据
                this.financeData.forEach(item => {
                    var index = data.finances.findIndex(s => {
                        return s.id == item.id
                    })
                    if (index != -1) { // 当前项被选中
                        item.checked = true
                    } else {
                        item.checked = false
                    }
                })
                this.placeData.forEach(item => {
                    var index = data.places.findIndex(s => {
                        return s.id == item.id
                    })
                    if (index != -1) { // 当前项被选中
                        item.checked = true
                    } else {
                        item.checked = false
                    }
                })
                // 构造参数
                var arg = {
                    type: data.type,
                    begin: data.begin,
                    end: data.end,
                    finance_ids: _.map(data.finances, 'id').join(),
                    place_ids: _.map(data.places, 'id').join()// ,
                    // build_ids: _.map(data.build_ids, 'id').join()
                }
                this.chartArg = arg
                FinanceHttp.budgetSBuildingWorkorder(arg)
                    .then(data => {
                        this.visData = data
                        this.makeVIS()
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            colorClick (data) {
                if (this.colorData) {
                    this.$refs.color.open(this.colorData)
                } else {
                    console.log('颜色数据暂未返回，请稍后...')
                }
            },
            colorCallback (data) {
                FinanceHttp.setBudgetColors(data)
                    .then(re => {
                        FinanceHttp.getBudgetColors().then((data) => {
                            this.colorData = data
                        }).catch(error => {
                            this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                        })
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            cbgroupChange (data) {
                this.makeVIS()
            },
            // 结算时间回调
            settleCallback (data) {
                FinanceHttp.bWOSettleAccountTime(data)
                    .then(() => {
                        FinanceHttp.budgetSBuildingWorkorder({begin: '2016-1-1', end: '2018-2-12', type: 1})
                            .then(data => {
                                this.visData = data
                            })
                            .catch(error => {
                                this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                            })
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            makeEchart (param) {
                // 基于准备好的dom，初始化echarts实例
                var legData = []
                var xData = []
                var sData1 = []
                var sData2 = []
                var sData3 = []
                var today = new Date()
                legData.push('本年支出')
                legData.push('去年支出')
                legData.push('预算')
                var yearMonth = Format(today, 'yyyy-MM-')
                var day1 = yearMonth + '01'
                var day2 = yearMonth + Format(new Date(today.getFullYear(), today.getMonth() + 1, 0), 'dd')
                var arg1 = {
                    begin: this.chartArg.begin,
                    end: this.chartArg.end,
                    place_id: this.chartArg.place_ids,
                    calc_last_year: 1,
                    calc_sum: 1
                }
                arg1 = {
                    begin: day1,
                    end: day2,
                    place_id: '',
                    calc_last_year: 1,
                    calc_sum: 1
                }
                FinanceHttp.getBudgetSData(arg1)
                    .then(data => {
                        sData1 = data.current
                        sData2 = data.last
                        sData3 = data.budget
                        xData = data.date
                        // 测试用，测试数据
//                        var day = today.getDate()
//                        sData1 = []
//                        sData2 = []
//                        sData3 = []
//                        for (var j = 1; j <= day; j++) {
//                            xData.push((j) + '日')
//                            sData1.push(Math.round(Math.random() * 1000))
//                            sData2.push(Math.round(Math.random() * 1000))
//                            sData3.push(Math.round(Math.random() * 1000))
//                        }

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
                                    // type: 'time',
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

                        this.myChart.setOption(option)
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            }
        },
        watch: {
            search (v) {
                // this.ztreeSearch(this.ztreeObj, this.spaceData, v)
            }
        }
    }
</script>
