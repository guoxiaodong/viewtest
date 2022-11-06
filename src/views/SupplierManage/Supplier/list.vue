<style>
    .PMtable .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .itembg { background-color: #f5f7f9; height: 20px; }
    .sortList .ivu-checkbox , .sortList .ivu-radio { display: none; }
    .sortList .ivu-checkbox-wrapper.ivu-checkbox-wrapper-checked , .sortList .ivu-radio-group-item.ivu-radio-wrapper-checked { color: #3399FF; }
    .sortList .ivu-checkbox-wrapper , .sortList, .sortList .ivu-radio-group-item { font-size: 16px; color: #657180; }
    .sortList .itemSort { padding: 7px 20px; }
</style>
<template>
    <div class="">
        <div style="margin-top: 20px;">
            <Row class="sortList" style="padding-top: 20px;">
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
                    <RadioGroup v-model="suppAllBtn" @on-change="changeAllSuppOption" style="float: left; margin-top: 3px;">
                        <Radio label="0" style="margin-right: 40px;">全部</Radio>
                    </RadioGroup>
                    <CheckboxGroup v-if="showOneSuppList" v-model="suppBtn" @on-change="changeSuppOption" style="float: left; width: 75%; height: 30px; overflow: hidden;">
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
                        <Checkbox style="margin-right: 40px; padding: 3px 0;" :label="item.name" v-for="(item, index) in this.placeList" :key="item.index">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                    <CheckboxGroup v-if="showManyPlaceList" v-model="placeBtn" @on-change="changePlaceOption" style="float: left; width: 75%;">
                        <Checkbox style="margin-right: 40px; padding: 3px 0;" :label="item.name" v-for="(item, index) in this.placeList" :key="item.index">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                    <a style="float:right; margin-top: 3px;" v-if="showOnePlace" @click="showOnePlaceBtn">展开</a>
                    <a style="float: right; margin-top: 3px;" v-if="showManyPlace" @click="showManyPlaceBtn">收起</a>
                </Col>
            </Row>
        </div>
        <div class="itembg">
        </div>
        <div class="datatable PMtable">
            <dataTableFilter :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                <div class="t-head-bottom" slot="buttons">
                    <Button type="primary" v-html="pri_btn_name" @click="addSupp()"></Button>
                    <Button type="ghost" @click="delbatch()">批量删除</Button>
                </div>
            </dataTableFilter>
        </div>
        <!--添加供应商-->
        <addSupplier ref="addSupplier"></addSupplier>
        <!--编辑供应商-->
        <editSupplier ref="editSupplier"></editSupplier>
        <!--删除供应商-->
        <delSupplier ref="delOneSupp" :title="delOneTitle"></delSupplier>
        <!--批量删除供应商-->
        <delSupplier ref="delManySupp" :title="delManyTitle"></delSupplier>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import SupplierManageHttp from 'server/http/supplierManage'
    import dataTableFilter from '@/components/dataTableFilter.vue'
    import addSupplier from './components/addSupplier.vue'
    import editSupplier from './components/editSupplier.vue'
    import delSupplier from './components/delSupplier.vue'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTableFilter, addSupplier, editSupplier, delSupplier
        },
        created () {
            this.$emit('updateActive', '8-1')
            this.tableTitle()
            this.getFilterList()
            this.getAllplace()
        },
        data () {
            return {
                tablename: '供应商列表',
                pri_btn_name: '新增',
                deltitle: '删除流程',
                alldeltitle: '批量删除流程',
                delOneTitle: '删除供应商',
                delManyTitle: '批量删除供应商',
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
                select_ids: '',
                serList: [],
                suppList: [],
                placeList: [],
                serBtn: '0',
                suppBtn: [],
                suppAllBtn: '0',
                placeBtn: [],
                placeAllBtn: '0',
                url: SupplierManageHttp.map.getSupplierList + '?inner_service_id=' + '&service_ids=' + '&servicearea=' + '&',
                id: 1,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称/编号/简介',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    style: {
                                        float: 'left',
                                        width: '40px',
                                        height: '40px',
                                        marginRight: '10px'
                                    },
                                    attrs: {
                                        src: params.row.logo
                                    }
                                }),
                                h('span', {
                                    style: {
                                        display: 'block',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        color: '#3399FF',
                                        height: '20px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    },
                                    on: {
                                        click: () => {
                                            this.showInfo(params.row.id)
                                        }
                                    }
                                }, params.row.name + '(' + params.row.no + ')'),
                                h('span', {
                                    style: {
                                        display: 'block',
                                        fontSize: '13px',
                                        height: '20px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }
                                }, params.row.intro)
                            ])
                        }
                    },
                    {
                        title: '合作状态',
                        // sortable: true,
                        width: 150,
                        // key: 'cooperatestatus_name'
                        key: 'contractstatus_name'
                    },
                    {
                        title: '合同状态',
                        // sortable: true,
                        width: 110,
                        // key: 'contractstatus_name'
                        key: 'cooperatestatus_name'
                    },
                    {
                        title: '服务质量',
                        sortable: true,
                        width: 165,
                        key: 'servicescore',
                        render: (h, params) => {
                            return h('Rate', {
                                props: {
                                    value: params.row.servicescore,
                                    disabled: true
                                }
                            })
                        }
                    },
                    {
                        title: '服务地域',
                        sortable: true,
                        width: 150,
                        key: 'servicearea'
                    },
                    {
                        title: '操作',
                        width: 120,
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
                                            this.showInfo(params.row.id)
                                        }
                                    }
                                }, '查看'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.delSupplier(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
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
                    // this.placeList = data.placenInfo
                })
            },
            // 获取所有地点
            getAllplace () {
                SupplierManageHttp.getAllplace(this.$route.params.id).then((data) => {
                    this.placeList = data
                })
            },
            // 内部服务
            changeSerOption (value) {
                console.log(value)
                // this.axios.get(SupplierManageHttp.map.getFilterInfo + '?inner_service_id=' + value).then((response) => {
                this.axios.get(SupplierManageHttp.map.getAllSupplierList + '/' + value).then((response) => {
                    console.log(response.data)
                    this.suppList = response.data
                })
                this.serBtn = value
                this.url = SupplierManageHttp.map.getSupplierList + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + this.placeBtn + '&'
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
                this.url = SupplierManageHttp.map.getSupplierList + '?inner_service_id=' + this.serBtn + '&service_ids=' + '&servicearea=' + this.placeBtn + '&'
                this.refresh()
            },
            changeSuppOption (value) {
                this.suppAllBtn = ''
                this.suppBtn = value
                if (this.suppBtn.length == 0) {
                    this.suppAllBtn = '0'
                }
                this.url = SupplierManageHttp.map.getSupplierList + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + this.placeBtn + '&'
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
                this.url = SupplierManageHttp.map.getSupplierList + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + '&'
                this.refresh()
            },
            changePlaceOption (value) {
                this.placeAllBtn = ''
                this.placeBtn = value
                if (this.placeBtn.length == 0) {
                    this.placeAllBtn = '0'
                }
                this.url = SupplierManageHttp.map.getSupplierList + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + this.placeBtn + '&'
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
            // datatable
            showInfo (id) {
                this.$route.params.id = id
                location.href = '/#/suppliermanage/basic/' + this.$route.params.id
            },
            addSupp () {
                this.$refs.addSupplier.open()
            },
            // 删除
            delSupplier (id) {
                this.$refs.delOneSupp.open(id)
            },
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
            },
            delbatch () {
                if (this.select_ids.length != 0) {
                    this.$refs.delManySupp.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的供应商')
                }
            },
            remove (id) {
                this.$refs.delFLow.open(id)
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        }
    }
</script>
