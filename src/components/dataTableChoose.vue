<style>
    .search {
        width: 326px;
        position: absolute;
        right: 0;
        /*float: right;
        margin-right: 20px;*/
    }
    .ivu-input-wrapper{ line-height:inherit}
    .btn {  float: right;  }
    .ivu-table-title{position: relative}
    .tablename{  position: relative;}
    .tablename-title{position: absolute;left: 0;font-size: 18px;}

    .datatable .ivu-table-header{margin-top: 8px}
    .t-head-top { border-bottom: 1px solid #D7DDE4;height: 48px}
    .t-head-bottom {height: 42px;}
    .datatable .ivu-table-title {
        height: auto!important;
        border-bottom: none!important;
    }

    .tableChoose .ivu-date-picker-rel i.ivu-input-icon{
        top:0px;
    }
    .work-order .time-choose label,
    .work-order .city-choose div,
    .work-order .floor-choose div{
        display: inline-block;
        width: auto;
        line-height:24px;
        font-size: 13px;
    }
    .work-order div.time-choose label:hover,
    .question div.time-choose label:hover{
        cursor:pointer;
    }
    .work-order div.time-choose label.active,
    .question  div.time-choose label.active{
        color:blue;
    }
    .work-order .time-choose,
    .work-order .city-choose,
    .work-order .floor-choose{
        height: 24px;
    }
    .work-order button.workOrder-output.ivu-btn.ivu-btn-primary{
        position: relative;
        left:0;
        display: inline-block;
        float:left;
    }
    .work-order .other-choose .ivu-select-item{
        display: inline-block;
    }

    .work-order div.ivu-table-wrapper.ivu-table-with-header>div.ivu-table{
        overflow: visible;
    }
    .work-order div.ivu-table-cell{
        white-space:nowrap;text-overflow:ellipsis;
    }
    .datatableChoose div.ivu-table-wrapper.ivu-table-with-header  div.ivu-table-title  div.t-head-top > div > i{
        top:8px;
    }
    /*问题导出页面*/
    .question div.time-right{

        display: none;
    }
    .question .workOrder-output{
        left:100%;
        margin-left: -87px;
    }
    .question button.workOrder-output.ivu-btn.ivu-btn-primary{
        position: relative;
        top: 4px;
    }
    .question div.workorder-datepicker.ivu-date-picker{
        top:-50px;
    }
    .question div.ivu-table-cell{
        white-space:nowrap;text-overflow:ellipsis;
    }
    .datatableChoose th.totalNum{
        border:0;
    }
    .datatableChoose .ivu-select.ivu-select-multiple{
        width: 410px;
    }
    /*工单列表*/
    .work-order .time-right{
        display: inline-block;
        position: relative;
        line-height: 0;
        margin-top: 13px;
        left: 100%;
        margin-left: -975px;

    }
    .datatableChoose .ivu-select.ivu-select-multiple .ivu-select-selection{
        max-height: 58px;
        overflow-y: auto;
    }
    .work-order .time-choose{
        height:auto;
    }
    .datatableChoose .work-order .t-head-bottom{
        height: auto;
    }
    .datatableChoose div.workorder-datepicker.ivu-date-picker{
        margin-left:30px;
        float:left;
    }
    .datatableChoose div.ivu-select.ivu-select-multiple{
        margin-left:20px;
    }
    .datatableChoose .choice{
        float:left;
        margin-left: 20px;
        margin-top: 4px;
    }
    .work-order .workOrder-output{
        float:right;
        margin-top: 9px;
    }
    /*小尺寸屏幕 筛选框*/
    @media (max-width:1320px) {
        .work-order .time-right{
            display: inline-block;
            position: relative;
            line-height: 0;
            margin-top: 13px;
            left: 100%;
            margin-left: -873px;

        }
        .datatableChoose .ivu-select.ivu-select-multiple{
            width: 310px;
        }
        .datatableChoose .search.ivu-input-wrapper.ivu-input-type{
            width: 280px;
        }
    }
</style>
<template>
    <div class="datatableChoose">

        <Table :show-header="showHeader" :context="self.$parent" :columns="columns" :data="currentData" @on-selection-change="selectchange" @on-sort-change="changeOrder">
            <div v-if="ifsearch" class="tablename" slot="header">
                <div class="t-head-top">
                    <p class="tablename-title" v-html="tablename"></p>
                    <Input  :placeholder="searchName" icon="search" class="search" v-model="search" @on-change="list()"></Input>
                </div>
                <div class="t-head-bottom" v-if="choosetime" slot="buttons">
                <div class="tableChoose">
                    <div class="time-choose">
                        <div class="time-right">
                            <label class="active choice" v-on:click="chooseTime">今日</label>
                            <label class="choice" v-on:click="chooseTime">本周</label>
                            <label class="choice" v-on:click="chooseTime">本月</label>
                            <DatePicker  :editable="false" :value="value" confirm class="workorder-datepicker" type="datetimerange"  placeholder="请选择日期时间"  @on-change="handleChange" @on-ok="handleOk" style="width: 290px"></DatePicker>
                        <!--筛选-->

                        <Select @on-change="chooseChange" v-model="model" multiple >
                            <OptionGroup label="优先级">
                                <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </OptionGroup>
                            <OptionGroup label="状态">
                                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </OptionGroup>
                            <!--<OptionGroup label="部门">-->
                                <!--<Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                            <!--</OptionGroup>-->
                            <OptionGroup label="积压">
                                <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </OptionGroup>
                            <OptionGroup label="工单类型">
                                <Option v-for="item in cityList5" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </OptionGroup>
                            <OptionGroup label="楼宇">
                                <Option v-for="item in cityList6" :value="item.value" :key="item.value">{{ item.text }}</Option>
                            </OptionGroup>
                        </Select>
                        </div>
                        <Button class="workOrder-output" type="primary" :disabled="disable" v-on:click="workOrderOutPut">导出Excel</Button>
                    </div>
                     </div>
                </div>
                <slot name="buttons"></slot>
            </div>
        </Table>
        <slot name="pageLeft"></slot><Page :total="total" :current="current" show-sizer show-total style="float: right; margin-top: 20px;" @on-change="change" @on-page-size-change="changesize" :page-size="pagesize"></Page>
        <div class="clear"></div>
    </div>
</template>
<script>
    // import base64 from '@/util/base64'
    import $ from 'jquery'
    import WorkOrderHttp from 'server/http/workOrder'
    import { URL } from '@/config/index'
    import _ from 'lodash'
    import {setTableItem} from '@/util/setDIVtitle'
    export default {
        created () {
            var d = new Date()
            var d1 = new Date()
            var d2 = new Date()
            d1.setTime(d.setHours(0, 0, 0))
            d2.setTime(d.setHours(23, 59, 59))
            this.value = [d1, d2]
            // 根据当前url判断export导出路径
            this.nowUrl = window.location.href
            if (this.nowUrl.indexOf('WorkOrder') != -1) { this.exurl = WorkOrderHttp.map.workExport }
            if (this.nowUrl.indexOf('QuestionExport') != -1) { this.exurl = WorkOrderHttp.map.questionExport }
            // 控件高度调整
            $('.datatableChoose .ivu-select .ivu-select-multiple').offsetHeight
            if (this.int) {
                this.list()
            }
        },
        props: {
            columns: {
                type: Array,
                default () {
                    return []
                }
            },
            data: {
                default () {
                    return []
                }
            },
            tablename: String,
            dataname: String,
            url: String,
            searchBase: false,
            expurl: {
                type: String,
                default: ''
            },
            ifsearch: {
                type: Boolean,
                default: true
            },
            choosetime: {
                type: Boolean,
                default: true
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            searchName: {
                type: String,
                default: '请输入搜索内容'
            },
            // 初始化时候加载数据
            int: {
                type: Boolean,
                default: true
            },
            // 服务模块筛选项
            changeItem: {
                type: String,
                default: null
            },
            // 服务模块id
            id: {
                type: String,
                default: null
            }
        },
        data () {
            return {
                cityList: [
                    {
                        value: 'priority-1',
                        label: '高'
                    },
                    {
                        value: 'priority-2',
                        label: '中'
                    },
                    {
                        value: 'priority-3',
                        label: '低'
                    },
                    {
                        value: 'status2-2',
                        label: '异常'
                    },
                    {
                        value: 'status2-1',
                        label: '正常'
                    },
                    {
                        value: 'labels-1',
                        label: '工程'
                    },
                    {
                        value: 'labels-2',
                        label: '技师'
                    },
                    {
                        value: 'labels-3',
                        label: '保洁（内）'
                    },
                    {
                        value: 'labels-4',
                        label: '保洁（外）'
                    },
                    {
                        value: 'overstock-1',
                        label: '全部积压'
                    },
                    {
                        value: 'overstock-2',
                        label: '一般积压'
                    },
                    {
                        value: 'overstock-3',
                        label: '超长积压'
                    },
                    {
                        value: 'wotype-2',
                        label: '保洁'
                    },
                    {
                        value: 'wotype-1',
                        label: '维修'
                    },
                    {
                        value: 'wotype-3',
                        label: '保养'
                    },
                    {
                        value: 'wotype-4',
                        label: '巡检'
                    },
                    {
                        value: 'wotype-5',
                        label: '项目'
                    },
                    {
                        value: 'builds-2',
                        label: 'PB新大厦'
                    },
                    {
                        value: 'builds-1',
                        label: '东升'
                    },
                    {
                        value: 'builds-3',
                        label: '环洋'
                    },
                    {
                        value: 'builds-4',
                        label: '白羊座D栋'
                    }
                ],
                cityList1: [
                    {
                        value: 'priority-3',
                        label: '低'
                    },
                    {
                        value: 'priority-2',
                        label: '中'
                    },
                    {
                        value: 'priority-1',
                        label: '高'
                    }
                ],
                cityList2: [
                    {
                        value: 'status2-2',
                        label: '异常'
                    },
                    {
                        value: 'status2-1',
                        label: '正常'
                    }
                ],
                cityList3: [
                    {
                        value: 'labels-1',
                        label: '工程'
                    },
                    {
                        value: 'labels-2',
                        label: '技师'
                    },
                    {
                        value: 'labels-3',
                        label: '保洁（内）'
                    },
                    {
                        value: 'labels-4',
                        label: '保洁（外）'
                    }
                ],
                cityList4: [
                    {
                        value: 'overstock-1',
                        label: '全部积压'
                    },
                    {
                        value: 'overstock-2',
                        label: '一般积压'
                    },
                    {
                        value: 'overstock-3',
                        label: '超长积压'
                    }
                ],
                cityList5: [],
                cityList6: [],
                model: [],
                self: this,
                search: '',
                total: 0,
                pagesize: 10,
                changeUrl: '',
                currentData: this.data,
                order: '',
                current: 1, // 当前页码脚底显示
                value: [],
                planstart: '',
                planfinish: '',
                choose: [],
                urlParam: '',
                exportParam: '',
                disable: true,
                exurl: '',
                nowUrl: '',
                chooseMore: ''
            }
        },
        mounted () {
            WorkOrderHttp.workBuild().then((data) => {
                for (var i of data[2].options) {
                    i.value = 'builds' + '-' + i.value
                }
                this.cityList6 = data[2].options
            })
            WorkOrderHttp.getWorkType().then((data) => {
                for (var i of data) {
                    i.id = 'wotype' + '-' + i.id
                }
                this.cityList5 = data
            })
        },
        methods: {
            refresh (url = '', expurl = '') {
                if (url) this.changeUrl = url // todo 临时方案
                if (expurl) this.expurl = expurl // todo 临时方案
                this.list(this.current, this.pagesize)
            },
            list (page = 1, pagesize = 10) {
                let search = this.search
                setTimeout(() => {
                    if (search != this.search) {
                        return
                    }
                    this.current = page
                    search = search.replace(/\+/g, '{p}')
                    // 处理时间插件格式
                    var Format = function (date, fmt) {
                        if (!date) { return '' }
                        if (date instanceof Date) {
                            var o = {
                                'M+': date.getMonth() + 1,
                                'd+': date.getDate(),
                                'h+': date.getHours(),
                                'm+': date.getMinutes(),
                                's+': date.getSeconds(),
                                'q+': Math.floor((date.getMonth() + 3) / 3),
                                'S': date.getMilliseconds()
                            }
                            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
                            for (var k in o) {
                                if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
                            }
                            return fmt
                        } else return date
                    }
                    var exParam = '?startday=' + Format(this.value[0], 'yyyy-MM-dd hh:mm:ss') + '&endday=' + Format(this.value[1], 'yyyy-MM-dd hh:mm:ss') + '&sSearch=' + search + '&type=export'
                    // 工单查询
                    if (this.nowUrl.indexOf('WorkOrder') != -1) {
                        var urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + '&startday=' + Format(this.value[0], 'yyyy-MM-dd hh:mm:ss') + '&endday=' + Format(this.value[1], 'yyyy-MM-dd hh:mm:ss') + '&sSearch=' + search + '&type=workList'
                        for (var b in this.choose) {
                            urlParam = urlParam + '&' + b + '=' + this.choose[b]
                            exParam = exParam + '&' + b + '=' + this.choose[b]
                        }
                    }
                    // 工单导出
                    if (this.nowUrl.indexOf('QuestionExport') != -1) {
                        urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + '&sSearch=' + search + '&type=issueList'
                    }
                    // 物料基本信息
                    if (this.nowUrl.indexOf('MaterialManage/BasicInfo') != -1) {
                        urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + '&sSearch=' + search
                    }
                    // 物料详细信息，物料记录条码详情
                    if (this.nowUrl.indexOf('MaterialManage/InventoryManage') != -1) {
                        urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + '&sSearch=' + search
                    }
                    // 供应商服务列表
                    if (this.nowUrl.indexOf('ServiceManage/SupplierService/ServiceQuery') != -1) {
                        if (this.changeItem) {
                            urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + this.changeItem + '&sSearch=' + search
                        } else if (this.id && this.id != '&id=') {
                            urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + this.id + '&sSearch=' + search
                        } else {
                            urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + '&sSearch=' + search
                        }
                    }
                    // 内部服务列表
                    if (this.nowUrl.indexOf('ServiceManage/Internalservice/InternalQuery') != -1) {
                        if (this.changeItem) {
                            urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + this.changeItem + '&sSearch=' + search
                        } else if (this.id) {
                            urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + this.id + '&sSearch=' + search
                        } else {
                            urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + '&sSearch=' + search
                        }
                    }
                    // 资产目录列表
                    if (this.nowUrl.indexOf('Asset/AssetManage') != -1) {
                        if (this.id) {
                            urlParam = '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + this.id + '&sSearch=' + search
                        }
                    }
                    let url = (this.changeUrl ? this.changeUrl : this.url) + urlParam
                    this.urlParam = urlParam
                    this.exParam = exParam
                    this.axios.get(url).then((response) => {
                        return response.data
                    }).then((data) => {
                        if (!data.data) {
                            data.data = []
                        }
                        // 供物料管理模块
                        if (data.data.length) {
                            for (var i = 0; i < data.data.length; i++) {
                                data.data[i].pid = i + 1 + (page - 1) * pagesize
                            }
                        }
                        // 供工单管理模块
                        if (data.data.length) {
                            this.disable = false
                        } else {
                            this.disable = true
                        }
                        this.dataTotal = data
                        this.$emit('on-data-change', data)
                        setTimeout(
                            setTableItem, 300
                        )
                    }).catch((error) => {
                        this.$Message.error(error.error)
                    })
                }, 1000)
            },
            change (page) {
                this.list(page, this.pagesize)
            },
            changesize (pagesize) {
                this.pagesize = pagesize
                this.list(this.page, pagesize)
            },
            // 带checkbox的 table获取数据
            selectchange (selection) {
                this.$emit('on-selection-change', selection)
            },
            changeOrder (column) {
                this.order = '&key=' + column.key + '&order=' + column.order
                this.list(1, 10)
            },
            chooseTime: function (e) {
                $('.work-order .time-choose label.choice').removeClass('active')
                $(e.target).addClass('active')
                var d = new Date()
                var d1 = new Date()
                var d2 = new Date()
                var d3 = new Date()
                var d4 = new Date()
                var d5 = new Date()
                var d6 = new Date()
                d1.setTime(d.setHours(0, 0, 0))
                d2.setTime(d.setHours(23, 59, 59))
                d3.setTime(d.getTime(d.setHours(0, 0, 0)) - 3600 * 1000 * 24 * (d.getDay() - 1))
                d4.setTime(d.getTime(d.setHours(23, 59, 59)) + 3600 * 1000 * 24 * (7 - d.getDay()))
                d5.setTime(d.getTime(d.setHours(0, 0, 0)) - 3600 * 1000 * 24 * (d.getDate() - 1))
                if (new Date().getMonth() == 11) {
                    var month = 0
                    var year = new Date().getFullYear() + 1
                } else {
                    month = new Date().getMonth() + 1
                    year = new Date().getFullYear()
                }
                d = new Date(year, month, 1)
                d6.setTime(d.getTime(d.setHours(23, 59, 59)) - 3600 * 1000 * 24)
                if (e.target.textContent == '今日') { this.value = [d1, d2] } else
                if (e.target.textContent == '本周') { this.value = [d3, d4] } else
                if (e.target.textContent == '本月') {
                    this.value = [d5, d6]
                }
                this.list()
            },
            workOrderOutPut: function () {
                var url = this.exurl + this.exParam
                var myInterceptor = this.axios.interceptors.request.use(function (config) {
                    $('button.workOrder-output.ivu-btn.ivu-btn-primary').addClass('disabled')
                    $('button.workOrder-output.ivu-btn.ivu-btn-primary').html('处理中..')
                    return config
                })
                this.axios.get(url, {timeout: 900000}).then((response) => {
                    $('button.workOrder-output.ivu-btn.ivu-btn-primary').removeClass('disabled')
                    $('button.workOrder-output.ivu-btn.ivu-btn-primary').html('导出Excel')
                    return response.data
                }).then((data) => {
                    var downloadUrl = URL.split('/api')
                    location.href = downloadUrl[0] + '/' + data
                }).catch((error) => {
                    this.$Message.error(error.error)
                })
                this.axios.interceptors.request.eject(myInterceptor)
            },
            handleOk: function () {
                $('.work-order .time-choose label.choice').removeClass('active')
                this.list()
            },
            handleChange: function (date) {
                this.value = date
                $('.work-order .time-choose label.choice').removeClass('active')
                this.list()
            },
            // 筛选
            chooseChange: function (value) {
                var remove = function (Array, val) {
                    var index = Array.indexOf(val)
                    if (index > -1) {
                        Array.splice(index, 1)
                    }
                    return Array
                }
                if (this.chooseMore.indexOf('overstock-1') != -1 && (value.indexOf('overstock-2') != -1 || value.indexOf('overstock-3') != -1)) {
                    remove(value, 'overstock-1')
                }
                if (value.indexOf('overstock-1') != -1 && (this.chooseMore.indexOf('overstock-2') != -1)) {
                    remove(value, 'overstock-2')
                }
                if (value.indexOf('overstock-1') != -1 && this.chooseMore.indexOf('overstock-3') != -1) {
                    remove(value, 'overstock-3')
                }
                this.chooseMore = _.clone(this.model)
                this.choose = []
                for (var k in this.model) {
                    var eachChoose = this.model[k].split('-')
                    if (eachChoose[0] in this.choose) {
                        this.choose[eachChoose[0]].push(eachChoose[1])
                    } else {
                        this.choose[eachChoose[0]] = []
                        this.choose[eachChoose[0]] = [(eachChoose[1])]
                    }
                }
                console.log(this.choose)
                this.list()
            },
            // 数据清空
            delData () {
                var data = []
                this.dataTotal = data
            }
        },
        computed: {
            dataTotal: {
                get: function () {
                },
                set: function ({data, recordsFiltered}) {
                    this.currentData = data
                    this.total = recordsFiltered
                }
            }
        },
        watch: {
            currentData () {
                this.$parent[this.dataname] = this.currentData
            }
        }
    }
</script>
