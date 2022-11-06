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
        <div class="itembg"></div>
        <div class="datatable PMtable" style="position: relative">
            <dataTableFilter :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                <div class="t-head-bottom" slot="buttons">
                    <Button type="primary" v-html="pri_btn_name" @click="addBranch()"></Button>
                    <Button type="ghost" @click="delbatch()">批量删除</Button>
                </div>
            </dataTableFilter>
        </div>
        <!--添加分支-->
        <addBranch ref="addBranch"></addBranch>
        <!--删除分支-->
        <delBranch ref="delBranch" :title="delTitle"></delBranch>
        <!--批量删除分支-->
        <delBranch ref="delManyBranch" :title="delManyTitle"></delBranch>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTableFilter from '@/components/dataTableFilter.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    import addBranch from '../structure/addBranch.vue'
    import delBranch from '../structure/delBranch.vue'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTableFilter, addBranch, delBranch
        },
        created () {
            this.$emit('updateActiveName', '5')
            this.tableTitle()
            this.getFilterList()
            this.getAllplace()
        },
        data () {
            return {
                s: '',
                tablename: '分支列表',
                pri_btn_name: '新增',
                delTitle: '删除分支',
                delManyTitle: '批量删除分支',
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
                url: SupplierManageHttp.map.getBranchLists + '/' + this.$route.params.id + '?',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '分支编号',
                        sortable: true,
                        key: 'no'
                    },
                    {
                        title: '分支名称',
                        sortable: true,
                        key: 'name',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#3399FF',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.showBranch(params.row.id)
                                    }
                                }
                            }, params.row.name)
                        }
                    },
                    {
                        title: '供应商服务',
                        sortable: true,
                        key: 'servicename'
                    },
                    {
                        title: '服务范围',
                        sortable: true,
                        key: 'search'
                    },
                    {
                        title: '历史工单',
                        sortable: true,
                        width: 140,
                        key: 'countorder'
                    },
                    {
                        title: '时间',
                        sortable: true,
                        key: 'updated_at'
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
                                            this.show(params.row.id)
                                        }
                                    }
                                }, '查看'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.delBranch(params.row.id)
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
                this.axios.get(SupplierManageHttp.map.getFilterInfo + '/' + this.$route.params.id + '?inner_service_id=' + value).then((response) => {
                    this.suppList = response.data.SupplierService
                })
                this.serBtn = value
                this.url = SupplierManageHttp.map.getBranchLists + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + this.placeBtn + '&'
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
                this.url = SupplierManageHttp.map.getBranchLists + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&service_ids=' + '&servicearea=' + this.placeBtn + '&'
                this.refresh()
            },
            changeSuppOption (value) {
                this.suppAllBtn = ''
                this.suppBtn = value
                if (this.suppBtn.length == 0) {
                    this.suppAllBtn = '0'
                }
                this.url = SupplierManageHttp.map.getBranchLists + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + this.placeBtn + '&'
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
                this.url = SupplierManageHttp.map.getBranchLists + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + '&'
                this.refresh()
            },
            changePlaceOption (value) {
                this.placeAllBtn = ''
                this.placeBtn = value
                if (this.placeBtn.length == 0) {
                    this.placeAllBtn = '0'
                }
                this.url = SupplierManageHttp.map.getBranchLists + '/' + this.$route.params.id + '?inner_service_id=' + this.serBtn + '&service_ids=' + this.suppBtn + '&servicearea=' + this.placeBtn + '&'
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
            // 添加分支
            addBranch () {
                this.$refs.addBranch.open()
            },
            // 删除删除
            delBranch (id) {
                this.$refs.delBranch.open(id)
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
                    this.$refs.delManyBranch.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的分支机构')
                }
            },
            // 查看合同
            show (id) {
                this.$route.params.sid = id
                location.href = '/#/suppliermanage/structure/showBranchSuppList/' + this.$route.params.id + '/' + this.$route.params.sid
            },
            // 刷新表格
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        }
    }
</script>
