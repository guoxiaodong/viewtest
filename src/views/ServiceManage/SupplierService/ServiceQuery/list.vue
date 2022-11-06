<style>
.serviceQuery-list .serveGroup span,
.serviceQuery-list .serveGroupClass span,
.serviceQuery-list .servePlace span,
.serviceQuery-list .status span{
    display: inline-block;
    margin-right: 100px;
}
.serviceQuery-list .filter{

}
.serviceQuery-list .filter-room{
}
.serviceQuery-list div.filter-tip{
    margin-left: 3%;
    height:21px;
    float:left;
    overflow: hidden;
    width: 75%;
}
.serviceQuery-list .filter-title{
    width: 103px;
    text-align: right;
    float:left;
}
.serviceQuery-list .expand{
    color:blue;
}
.serviceQuery-list .packup{
    color:blue;
}
.serviceQuery .ivu-steps.ivu-steps-horizontal{
    margin: 10px 20px;
}
.serviceQuery-list div.filter-title-status{
    width: 100%;
}
.serviceQuery-list .innerbtns{
    position: relative;
    top: 32px;
    left: -40px;
    z-index: 1;
}
.serviceQuery-list .active{
    color:blue;
}
.serviceQuery-stepOne .ivu-table-body{
    height: 630px
}
.serviceQuery-stepFour .ivu-table-body{
    height: 630px
}
</style>
<template>
    <div class="serviceQuery-list">
        <div class="serviceList" v-show="stepShowZero">
        <div class="innerheader">
            供应商服务
        </div>
        <div class="datatable">
            <div class="filter clearfix">
                <div class="filter-room clearfix">
                    <filterItem :filterData="serveGroupClass" :filterName="'服务组分类'" :isMulti="false" @filterCondition-change="conditionChange1"></filterItem>
                </div>
                <div class="filter-room clearfix">
                    <filterItem :filterData="serveGroup" :filterName="'服务组'" @filterCondition-change="conditionChange2"></filterItem>
                </div>
                <div class="filter-room clearfix">
                    <filterItem :filterData="placeGroup" :filterName="'服务地域'" @filterCondition-change="conditionChange3"></filterItem>
                </div>
                <div class="filter-title-status">
                    <filterItem :filterData="statusGroup" :filterName="'正常提供'" @filterCondition-change="conditionChange4"></filterItem>
                </div>
            <div class="innerbtns" style="width: 45%">
                <Row >
                    <Button type="primary" @click="add()">+ 新增</Button>
                    <Button type="ghost" @click="remove()">批量删除</Button>
                    <Button type="ghost" @click="makeStop()">批量停用</Button>
                    <Button type="ghost" @click="makeStart()">批量启用</Button>
                </Row>
            </div>
        </div>
            <dataTableChoose
                v-on:on-data-change=""
                ref="datatable"
                :columns="columns"
                :data="data"
                dataname="data"
                :changeItem="'&type1_id='+ type1_id + '&type2_id='+ type2_id + '&site_id='+ site_id + '&status='+ status"
                @on-selection-change="selectTable"
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
        <stepThree v-show="stepShowThree" ref="stepThree" @show="showList"></stepThree>
        <stepFour v-show="stepShowFour" ref="stepFour" @show="showList"></stepFour>
        <finishStep v-show="stepFinish" ref="stepFinish" @show="showList"></finishStep>
        <editStep  ref="editStep" @refresh ="refresh"></editStep>
    </div>
</template>
<script>
    import dataTableChoose from '@/components/dataTableChoose.vue'
    import filterItem from '@/components/filterItem.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import stepOne from './components/stepOne.vue'
    import stepTwo from './components/stepTwo.vue'
    import stepThree from './components/stepThree.vue'
    import stepFour from './components/stepFour.vue'
    import ServiceHttp from 'server/http/service'
    import editStep from './components/edit.vue'
    import finishStep from './components/finish.vue'
    import _ from 'lodash'
    export default {
        components: {
            stepOne,
            stepTwo,
            stepThree,
            stepFour,
            dataTableChoose,
            editStep,
            finishStep,
            filterItem
        },
        data () {
            return {
                stepShowZero: true,
                stepShowOne: false,
                stepShowTwo: false,
                stepShowThree: false,
                stepShowFour: false,
                stepFinish: false,
                type1_id: '',
                type2_id: '',
                site_id: '',
                status: '',
                serveGroupClass: [], // 服务组分类
                serveGroup: [], // 服务组分类
                serviceGroupAll: [],
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
                ifsearch: '',
                selectItem: [],
                tablename: '供应商服务',
                url: '/Service/getsupplierservicelist',
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
                        key: 'suppliercounts',
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
                        key: 'supplierArea',
                        ellipsis: true,
                        align: 'center'// ,
//                        render: (h, params) => {
//                            return h('span', {
//                                attrs: {
//                                    title: params.row.supplierArea
//                                }
//                            }, (params.row.supplierArea && params.row.supplierArea.length > 8) ? (params.row.supplierArea.substring(0, 8) + '...') : '')
//                        }
                    },
                    {
                        title: '操作',
                        width: 120,
                        align: 'center',
                        key: 'actions',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row.id)
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
                // data: [],
                filter1: []
            }
        },
        mixins: [ ],
        created () {
            this.placeGroup = []
            this.$emit('updateActive', '7-1')
            // 地点获取
            ServiceHttp.getSupplierPlace().then((data) => {
                this.placeGroup = data
            })
            // 服务组获取
            ServiceHttp.supplierCata().then((data) => {
                this.serveGroupClass = data.service
                for (var i in data.service) {
                    var group = data.service[i].service
                    for (var j in group) {
                        this.serveGroup.push(group[j])
                    }
                }
                this.serviceGroupAll = _.cloneDeep(this.serveGroup)
            })
        },
        methods: {
            add () {
                this.showList(1, null)
            },
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
            selectTable (selection) {
                this.selectItem = selection
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            },
            showList (index, id = null) {
                this.stepShowZero = false
                this.stepShowOne = false
                this.stepShowTwo = false
                this.stepShowThree = false
                this.stepShowFour = false
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
                    this.stepShowThree = true
                    this.$refs.stepThree.open(id)
                    break
                case 4:
                    this.stepShowFour = true
                    this.$refs.stepFour.open(id)
                    break
                case 5:
                    this.stepFinish = true
                    this.$refs.stepFinish.open(id)
                    break
                }
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
            conditionChange2 (e) {
                if (e.length == 0) {
                    this.type2_id = ''
                } else {
                    var array = []
                    for (var i in e) {
                        array.push(e[i].id)
                    }
                    this.type2_id = array.join(',')
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
