<style>
    .internalQuery-list .serveGroup span,
    .internalQuery-list .serveGroupClass span,
    .internalQuery-list .servePlace span,
    .internalQuery-list .status span{
        display: inline-block;
        margin-right: 100px;
    }
    .internalQuery-list .filter{
    }
    .internalQuery-list .filter-room{
    }
    .internalQuery-list div.filter-tip{
        margin-left: 3%;
        height:21px;
        float:left;
        overflow: hidden;
        width: 75%;
    }
    .internalQuery-list .filter-title{
        width: 103px;
        text-align: right;
        float:left;
    }
    .internalQuery-list .expand{
        color:blue;
    }
    .internalQuery-list .packup{
        color:blue;
    }
    .serviceQuery .ivu-steps.ivu-steps-horizontal{
        margin: 10px 20px;
    }
    .internalQuery-list div.filter-title-status{
        width: 100%;
    }
    .internalQuery-list .innerbtns{
        position: relative;
        top: 32px;
        left: -40px;
        z-index: 1;
    }
    .blue{
        color:blue;
    }
</style>
<template>
    <div class="internalQuery-list">
        <div class="internalList" v-show="stepShowZero">
        <div class="innerheader">
            服务
        </div>
        <div class="datatable">
            <div class="filter clearfix">
                <div class="filter-room clearfix">
                    <filterItem :filterData="serveGroupClass" :filterName="'服务组分类'" :isMulti="false" @filterCondition-change="conditionChange1"></filterItem>
                </div>
                <div class="filter-room clearfix">
                    <filterItem :filterData="placeGroup" :filterName="'服务地域'"  @filterCondition-change="conditionChange3"></filterItem>
                </div>
                <div class="filter-title-status">
                    <filterItem :filterData="statusGroup" :filterName="'正常提供'" @filterCondition-change="conditionChange4"></filterItem>
                </div>
            </div>
            <div class="innerbtns" style="width: 45%">
                <Row >
                    <Button type="primary" @click="add()">+ 新增</Button>
                    <Button type="ghost" @click="remove()">批量删除</Button>
                    <Button type="ghost" @click="makeStop()">批量停用</Button>
                    <Button type="ghost" @click="makeStart()">批量启用</Button>
                </Row>
            </div>
            <dataTableChoose
                v-on:on-data-change=""
                ref="datatable"
                :columns="columns"
                :data="data"
                dataname="data"
                @on-selection-change="selectTable"
                :changeItem="'&type1_id='+ type1_id + '&site_id='+ site_id + '&status='+ status"
                :ifsearch="ifsearch"
                :choosetime= false
                :int= true
                :url="url">

            </dataTableChoose>
        </div>
        </div>
        <!--新增服务-->
        <stepOne v-show="stepShowOne"  ref="stepOne" @show="showList"></stepOne>
        <stepTwo v-show="stepShowTwo" ref="stepTwo" @show="showList"></stepTwo>
        <finishStep v-show="stepFinish" ref="stepFinish" @show="showList"></finishStep>
        <editStep  ref="editStep"  @refresh ="refresh"></editStep>
    </div>
</template>
<script>
//    import $ from 'jquery'
    import dataTableChoose from '@/components/dataTableChoose.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import stepOne from './components/stepOne.vue'
    import stepTwo from './components/stepTwo.vue'
    import editStep from './components/edit.vue'
    import ServiceHttp from 'server/http/service'
    import finishStep from './components/finish.vue'
    import filterItem from '@/components/filterItem.vue'
    export default {
        components: {
            stepOne,
            stepTwo,
            editStep,
            finishStep,
            dataTableChoose,
            filterItem
        },
        created () {
            this.$emit('updateActive', '7-3')
            // 地点获取
            ServiceHttp.getInternalPlace().then((data) => {
                this.placeGroup = []
                for (var i in data) {
                    var group = {
                        id: data[i].id,
                        name: data[i].name
                    }
                    this.placeGroup.push(group)
                }
                console.log(this.placeGroup)
            })
//            获得服务组
            ServiceHttp.internalCata().then((data) => {
                this.serveGroupClass = data.service
            })
        },
        data () {
            return {
                ifsearch: '',
                tablename: '供应商服务',
                internalList: true,
                stepShowZero: true,
                stepShowOne: false,
                stepShowTwo: false,
                stepFinish: false,
                type1_id: '',
                site_id: '',
                status: '',
                serveGroupClass: [], // 服务组分类
                placeGroup: [], // 地点组
                statusGroup: [
                    {
                        id: 0,
                        name: '暂停'
                    },
                    {
                        id: 1,
                        name: '正常'
                    }
                ],
                selectItem: [],
                url: '/Service/getindoorservicelist',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称/编号/简介',
                        width: 400,
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.title + '(' + params.row.no + ')'),
                                h('strong', params.row.intro)
                            ])
                        }
                    },
                    {
                        title: '供应商数量',
                        width: 170,
                        key: 'supplierservicecounts',
                        align: 'center'
                    },
                    {
                        title: '正常提供',
                        width: 140,
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.status == 0) {
                                params.row.status = '暂停'
                            }
                            if (params.row.status == 1) {
                                params.row.status = '正常'
                            }
                            if (params.row.status == 2) {
                                params.row.status = '其他'
                            }
                            return h('div', [
                                h('div', params.row.status)
                            ])
                        }
                    },
                    {
                        title: '服务地域',
                        width: 140,
                        key: 'servicearea',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 120,
                        key: 'actions',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.editStep.open(params.row.id)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
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
        mixins: [ ],
        methods: {
            remove (id = null) {
                if (!id) {
                    var tempid = ''
                    for (var i in this.selectItem) {
                        tempid += this.selectItem[i].id + ','
                    }
                    tempid = tempid.substr(0, tempid.length - 1)
                    var data = {
                        service_id: tempid
                    }
                } else {
                    data = {
                        service_id: id
                    }
                }
                this.$Modal.confirm({
                    title: '',
                    content: '确定删除吗？',
                    onOk: () => {
                        ServiceHttp.removeList(data).then((data) => {
                            this.refresh()
                        })
                    }
                })
            },
            makeStart () {
                var tempid = ''
                for (var i in this.selectItem) {
                    tempid += this.selectItem[i].id + ','
                }
                tempid = tempid.substr(0, tempid.length - 1)
                var data = {
                    service_id: tempid
                }
                ServiceHttp.serviceStart(data).then((data) => {
                    this.refresh()
                })
            },
            makeStop () {
                var tempid = ''
                for (var i in this.selectItem) {
                    tempid += this.selectItem[i].id + ','
                }
                tempid = tempid.substr(0, tempid.length - 1)
                var data = {
                    service_id: tempid
                }
                ServiceHttp.serviceStop(data).then((data) => {
                    this.refresh()
                })
            },
            add () {
                this.showList(1, null)
            },
            selectTable (selection) {
                this.selectItem = selection
            },
            showList (index, id = null) {
                this.stepShowZero = false
                this.stepShowOne = false
                this.stepShowTwo = false
                this.stepFinish = false
                switch (index) {
                case 0:
                    this.stepShowZero = true
                    if (id) {
                        this.$refs.editStep.open(id)
                    }
                    break
                case 1:
                    this.stepShowOne = true
                    this.$refs.stepOne.open(id)
                    break
                case 2:
                    this.stepShowTwo = true
                    this.$refs.stepTwo.open(id)
                    break
                case 3:
                    this.stepFinish = true
                    this.$refs.stepFinish.open(id)
                    break
                }
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            },
            conditionChange1 (e) {
                if (e.length == 0) {
                    this.type1_id = ''
                    this.serveGroup = this.serviceGroupAll
                } else {
                    this.type1_id = e[0].id
                    this.serveGroup = []
                    for (var i in e[0].service) {
                        var temp = {
                            id: e[0].service[i].id,
                            name: e[0].service[i].name
                        }
                        this.serveGroup.push(temp)
                    }
                }
                this.refresh()
            },
            conditionChange3 (e) {
                if (e.length == 0) {
                    this.site_id = ''
                } else {
                    var array = []
                    for (var i in e) {
                        array.push(e[i].id)
                    }
                    this.site_id = array.join(',')
                }
                this.refresh()
            },
            conditionChange4 (e) {
                if (e.length == 0) {
                    this.status = ''
                } else {
                    var array = []
                    for (var i in e) {
                        array.push(e[i].id)
                    }
                    this.status = array.join(',')
                }
                this.refresh()
            }
        }
    }
</script>
