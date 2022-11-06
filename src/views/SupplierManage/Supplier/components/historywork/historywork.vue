<style>
    .tables .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .btnsGroup { position: absolute; right: 460px; top: 7px; z-index: 99; }
    /* .btnsGroup.ivu-radio-group-button .ivu-radio-wrapper ,
    .btnsGroup.ivu-radio-group-button .ivu-radio-wrapper:first-child { border: none; }
    .btnsGroup.ivu-radio-group-button .ivu-radio-wrapper-checked { box-shadow: none } */
    .itembg { background-color: #f5f7f9; height: 20px; }
    .sortList .ivu-checkbox , .sortList .ivu-radio { display: none; }
    .sortList .ivu-checkbox-wrapper.ivu-checkbox-wrapper-checked , .sortList .ivu-radio-group-item.ivu-radio-wrapper-checked { color: #3399FF; }
    .sortList .ivu-checkbox-wrapper , .sortList, .sortList .ivu-radio-group-item { font-size: 16px; color: #657180; }
    .sortList .itemSort { padding: 7px 20px; }
</style>
<template>
    <div class="tables">
        <div>
            <Row class="sortList">
                <Col span="24" style="border-bottom: 1px solid #D7DDE4; padding: 0 0 15px 20px; margin-bottom: 15px; font-size: 18px; color: #464C5B;">
                    所有分类
                </Col>
                <Col span="24" class="itemSort">
                    <span style="float: left; display: block; width: 130px;">行政服务：</span>
                    <RadioGroup v-if="showOneSer" v-model="serBtn" @on-change="changeSerOption" style="float: left; width: 80%; height: 30px; overflow: hidden;">
                        <Radio label="0" style="margin-right: 40px;">全部</Radio>
                        <Radio style="margin-right: 40px; padding: 3px 0;" :label="item.id" v-for="(item, index) in this.serList" :key="item.index">{{item.name}}</Radio>
                    </RadioGroup>
                    <RadioGroup v-if="showManySer" v-model="serBtn" @on-change="changeSerOption" style="float: left; width: 80%;">
                        <Radio label="0" style="margin-right: 40px;">全部</Radio>
                        <Radio style="margin-right: 40px; padding: 3px 0;" :label="item.id" v-for="(item, index) in this.serList" :key="item.index">{{item.name}}</Radio>
                    </RadioGroup>
                    <a style="float: right; margin-top: 3px;" v-if="showOneBtn" @click="showSerBtn">展开</a>
                    <a style="float: right; margin-top: 3px;" v-if="showManyBtn" @click="hideSerBtn">收起</a>
                </Col>
                <Col span="24" class="itemSort" style=" border: 1px dashed #D7DDE4; border-left: none; border-right: none;">
                    <span style="float: left; display: block; width: 130px; margin-top: 3px;">供应商服务：</span>
                    <RadioGroup v-model="suppAllBtn" @on-change="changeAllSuppOption" style="float: left; height: 30px; margin-top: 3px;">
                        <Radio label="0" style="margin-right: 40px;">全部</Radio>
                    </RadioGroup>
                    <CheckboxGroup v-if="showOneSuppList" v-model="suppBtn" @on-change="changeSuppOption" style="float: left; width: 75%; height: 30px;  overflow: hidden;">
                        <Checkbox style="margin-right: 40px; padding: 3px 0;" :label="item.id" v-for="(item, index) in this.suppList" :key="item.index">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                    <CheckboxGroup v-if="showManySuppList" v-model="suppBtn" @on-change="changeSuppOption" style="float: left; width: 75%;">
                        <Checkbox style="margin-right: 40px; padding: 3px 0;" :label="item.id" v-for="(item, index) in this.suppList" :key="item.index">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                    <a style="float:right; margin-top: 3px;" v-if="showOneSupp" @click="showOneSuppBtn">展开</a>
                    <a style="float: right; margin-top: 3px;" v-if="showManySupp" @click="showManySuppBtn">收起</a>
                </Col>
                <Col span="24" class="itemSort">
                    <span style="float: left; display: block; width: 130px; margin-top: 3px;">地区：</span>
                    <RadioGroup v-model="placeAllBtn" @on-change="changeAllPlaceOption" style="float: left">
                        <Radio label="0" style="margin-right: 40px; margin-top: 3px;">全部</Radio>
                    </RadioGroup>
                    <CheckboxGroup v-if="showOnePlaceList" v-model="placeBtn" @on-change="changePlaceOption" style="float: left; height: 30px; width: 75%; overflow: hidden;">
                        <Checkbox style="margin-right: 40px; padding: 3px 0;" :label="item.ParentPlaceIds" v-for="(item, index) in this.placeList" :key="item.index">{{item.placeName}}</Checkbox>
                    </CheckboxGroup>
                    <CheckboxGroup v-if="showManyPlaceList" v-model="placeBtn" @on-change="changePlaceOption" style="float: left; width: 75%;">
                        <Checkbox style="margin-right: 40px; padding: 3px 0;" :label="item.ParentPlaceIds" v-for="(item, index) in this.placeList" :key="item.index">{{item.placeName}}</Checkbox>
                    </CheckboxGroup>
                    <a style="float:right; margin-top: 3px;" v-if="showOnePlace" @click="showOnePlaceBtn">展开</a>
                    <a style="float: right; margin-top: 3px;" v-if="showManyPlace" @click="showManyPlaceBtn">收起</a>
                </Col>
            </Row>
        </div>
        <div class="itembg"></div>
        <div class="datatable PMtable" style="position: relative; padding-top: 10px;">
            <RadioGroup v-model="button" @on-change="changeGroupName" type="button" class="btnsGroup" style="right: 700px; top: 18px;">
                <Radio label="0">今日</Radio>
                <Radio label="1">本周</Radio>
                <Radio label="2">本月</Radio>
            </RadioGroup>
            <DatePicker type="daterange" confirm @on-change="changeTime" v-model="time" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期进行筛选" style="width: 230px; position: absolute; right: 450px; top: 18px; z-index: 99;"></DatePicker>
            <dataTableFilter :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                <div class="t-head-bottom" slot="buttons">
                    <Alert type="warning" show-icon style="margin-top:20px;">已选择&nbsp;{{this.number}}&nbsp;个工单&emsp;&emsp;费用总计：￥{{this.money}}</Alert>
                </div>
            </dataTableFilter>
        </div>
        <!--查看工单-->
        <show ref="showWorkOrder"></show>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTableFilter from '@/components/dataTableFilter.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    import show from '../historywork/show.vue'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTableFilter, show
        },
        created () {
            this.$emit('updateActiveName', '4')
            this.getFilterList()
            this.tableTitle()
        },
        data () {
            return {
                s: '',
                tablename: '历史工单列表',
                showOneSer: true,
                showManySer: false,
                showOneBtn: true,
                showManyBtn: false,
                showOneSuppList: true,
                showManySuppList: false,
                showOneSupp: true,
                showManySupp: false,
                showOnePlace: true,
                showManyPlace: false,
                showOnePlaceList: true,
                showManyPlaceList: false,
                hasbtn: true,
                button: '',
                select_ids: '',
                serList: [],
                suppList: [],
                placeList: [],
                number: '0',
                money: '0.00',
                dataValue: [],
                serBtn: '0',
                suppBtn: [],
                suppAllBtn: '0',
                placeBtn: [],
                placeAllBtn: '0',
                time: [],
                newTime: [],
                startday: '',
                endday: '',
                url: SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=0' + '&b_service_id=' + '&site=' + '&startday=' + '&endday=' + '&',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '工单编号',
                        sortable: true,
                        key: 'workorderid'
                    },
                    {
                        title: '工单标题',
                        sortable: true,
                        key: 'workordername',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#3399FF',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.row.id)
                                    }
                                }
                            }, params.row.workordername)
                        }
                    },
                    {
                        title: '供应商服务',
                        sortable: true,
                        key: 'title'
                    },
                    {
                        title: '地点',
                        sortable: true,
                        width: 140,
                        key: 'place'
                    },
                    {
                        title: '状态',
                        sortable: true,
                        key: 'status_name'
                    },
                    {
                        title: '时间',
                        sortable: true,
                        key: 'updated_at'
                    },
                    {
                        title: '操作',
                        width: 80,
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row.id)
                                        }
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            changeTime (value) {
                this.startday = value[0]
                this.endday = value[1]
                this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday + '&'
                this.ClearAllInfo()
                this.refresh()
            },
            // table加title
            tableTitle () {
                setTimeout(
                    setTableItem, 3000
                )
            },
            // 按条件筛选
            getFilterList () {
                SupplierManageHttp.getFilterList(this.$route.params.id).then((data) => {
                    this.serList = data.InnerService
                    this.suppList = data.SupplierService
                    this.placeList = data.placenInfo
                })
            },
            // 内部服务
            changeSerOption (value) {
                this.axios.get(SupplierManageHttp.map.getFilterInfo + '/' + this.$route.params.id + '?inner_service_id=' + value).then((response) => {
                    this.suppList = response.data.SupplierService
                })
                this.serBtn = value
                this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday + '&'
                this.ClearAllInfo()
                this.refresh()
            },
            showSerBtn () {
                this.showManySer = true
                this.showOneSer = false
                this.showOneBtn = false
                this.showManyBtn = true
            },
            hideSerBtn () {
                this.showManySer = false
                this.showOneSer = true
                this.showOneBtn = true
                this.showManyBtn = false
            },
            // 供应商服务
            changeAllSuppOption (value) {
                this.suppBtn = []
                this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday + '&'
                this.ClearAllInfo()
                this.refresh()
            },
            changeSuppOption (value) {
                this.suppAllBtn = ''
                this.suppBtn = value
                if (this.suppBtn.length == 0) {
                    this.suppAllBtn = '0'
                }
                this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday + '&'
                this.ClearAllInfo()
                this.refresh()
            },
            showOneSuppBtn () {
                this.showOneSupp = false
                this.showManySupp = true
                this.showOneSuppList = false
                this.showManySuppList = true
            },
            showManySuppBtn () {
                this.showOneSupp = true
                this.showManySupp = false
                this.showOneSuppList = true
                this.showManySuppList = false
            },
            // 地区
            changeAllPlaceOption (value) {
                this.placeBtn = []
                this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + '&startday=' + this.startday + '&endday=' + this.endday + '&'
                this.ClearAllInfo()
                this.refresh()
            },
            changePlaceOption (value) {
                this.placeAllBtn = ''
                this.placeBtn = value
                if (this.placeBtn.length == 0) {
                    this.placeAllBtn = '0'
                }
                this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday + '&'
                this.ClearAllInfo()
                this.refresh()
            },
            showOnePlaceBtn () {
                this.showOnePlaceList = false
                this.showManyPlaceList = true
                this.showOnePlace = false
                this.showManyPlace = true
            },
            showManyPlaceBtn () {
                this.showOnePlaceList = true
                this.showManyPlaceList = false
                this.showOnePlace = true
                this.showManyPlace = false
            },
            // 合同筛选
            changeGroupName (label) {
                if (label == 0) {
                    let start = new Date(new Date(new Date().toLocaleDateString()).getTime())
                    let end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
                    this.time = [start, end]
                    let s = new Date(this.time[0])
                    let e = new Date(this.time[1])
                    this.startday = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + s.getHours() + ':' + s.getMinutes() + ':' + s.getSeconds()
                    this.endday = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + e.getHours() + ':' + e.getMinutes() + ':' + e.getSeconds()
                    this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday
                    this.ClearAllInfo()
                    this.refresh()
                } else if (label == 1) {
                    let date = new Date()
                    let today = date.getDay()
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
                    this.startday = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + '00' + ':' + '00' + ':' + '00'
                    this.endday = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + '23' + ':' + '59' + ':' + '59'
                    this.time = [this.startday, this.endday]
                    this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday
                    this.ClearAllInfo()
                    this.refresh()
                } else {
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
                    this.startday = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + '00' + ':' + '00' + ':' + '00'
                    this.endday = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + '23' + ':' + '59' + ':' + '59'
                    this.time = [this.startday, this.endday]
                    this.url = SupplierManageHttp.map.getHistoryWorkOrderList + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&b_service_id=' + this.suppBtn + '&site=' + this.placeBtn + '&startday=' + this.startday + '&endday=' + this.endday
                    this.ClearAllInfo()
                    this.refresh()
                }
            },
            // 统计
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
                if (this.select_ids == '') {
                    this.number = '0'
                    this.money = '0.00'
                } else {
                    SupplierManageHttp.getHistoryWorkOrderNum(this.select_ids).then((data) => {
                        this.number = data.workOrderCount
                        this.money = data.Money
                    })
                }
            },
            // 刷新页面清空工单数量、钱数
            ClearAllInfo () {
                this.number = '0'
                this.money = '0.00'
            },
            // 查看历史工单
            show (id) {
                this.$refs.showWorkOrder.open(id)
            },
            // 刷新表格
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
            // addclose () {
            //     this.$refs.datatable.$emit('refresh', this.url)
            // }
        }
    }
</script>
