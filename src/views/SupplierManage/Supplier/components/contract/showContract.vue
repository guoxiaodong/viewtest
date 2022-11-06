<style>
    .tables .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .itemTop { padding: 20px; font-size: 14px; color: #657180; }
    .itemTop .itemLine { padding: 5px 0; }
    .itemTop .itemLine .Txtwords { width: 70%; float: left; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; }
    .downLoadName { float: left; width: 80%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; }
    .itembg1 { height: 67px; background-color: #f5f7f9;  padding-top: 20px; }
    .itembg1 .itemTitle { height: 28px; border-bottom: 2px solid #D7DDE4; line-height: 28px;
                         font-size: 16px; color: #3399FF; }
    .itembg1 .itemTitle span { display: inline-block; height: 28px; border-bottom: 2px solid #3399FF}
    .itemStatus { position: absolute; right: -20px; top: 0; float: right; margin-top: 30%; width: 100px;
         height: 60px; background-color: #04B9B9; text-align: center; line-height: 60px; font-size: 24px;
         color: #FFFFFF;}
</style>
<template>
    <div>
        <div class="itemTop">
            <Row>
                <Col span="24" style="padding-bottom: 15px;">
                    <Row>
                        <Col span="16" style="font-size: 20px; color: #657180; word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.name}}</Col>
                        <Col span="8" style="text-align: right;">
                            <Button type="text" style="font-size: 14px;" @click="editCont">修改信息</Button>
                            <Button type="primary" style="font-size: 14px;" @click="back">返回上一级</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span="8">
                    <Row>
                        <Col span="24" class="itemLine">编&emsp;&emsp;号：{{this.no}}</Col>
                        <Col span="24" class="itemLine">签订时间：{{this.signtime}}</Col>
                        <Col span="24" class="itemLine">有效时间：{{this.startime}} - {{this.endtime}}</Col>
                    </Row>
                </Col>
                <Col span="12">
                    <Row>
                        <Col span="24" class="itemLine">
                            <span style="float: left;">适用地区：</span>
                            <div class="Txtwords" v-if="showTxtWord">{{this.site_name}}</div>
                            <div v-if="hideTxtWord" style="float: left; width: 70%;">{{this.site_name}}</div>
                            <a v-if="showBtn" style="float: right; margin-right: 20px; text-decoration:underline" @click="more">更多</a>
                            <a v-if="hideBtn" style="float: right; margin-right: 20px; text-decoration:underline" @click="hide">收起</a>
                        </Col>
                        <Col span="24" class="itemLine">
                            <span style="float: left;">附&emsp;&emsp;件：</span>
                            <div style="float: left; width: 75%">
                                <div v-if="DownOneList">
                                    <div class="downLoadName">{{this.showDownName}}</div>&emsp;
                                    <a :href='this.showDownUrl' style="text-decoration:underline">下载</a>
                                </div>
                                <ul v-if="DownManyList">
                                    <li v-for="item in this.downList" :key="item.id">
                                        <div class="downLoadName">{{item.name}}</div>&emsp;
                                        <a :href='item.url' style="text-decoration:underline">下载</a>
                                    </li>
                                </ul>
                            </div>
                            <a @click="DownOneBtn" v-if="DownOne" style="float: right; margin-right: 20px; text-decoration:underline">更多</a>
                            <a @click="DownManyBtn" v-if="DownMany" style="float: right; margin-right: 20px; text-decoration:underline">收起</a>
                        </Col>
                        <Col span="24" class="itemLine">
                            <span style="float: left;">备&emsp;&emsp;注：</span>
                            <div class="Txtwords" v-if="showNoteWord">{{this.note}}</div>
                            <div v-if="hideNoteWord" style="float: left; width: 70%; word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.note}}</div>
                            <a v-if="showNoteBtn" @click="moreNote" style="float: right; margin-right: 20px; text-decoration:underline">更多</a>
                            <a v-if="hideNoteBtn" @click="hideNote" style="float: right; margin-right: 20px; text-decoration:underline">收起</a>
                        </Col>
                    </Row>
                </Col>
                <Col span="4">
                    <div class="itemStatus">{{this.status}}</div>
                </Col>
            </Row>
        </div>
        <div class="itembg1">
            <div class="itemTitle"><span>供应商服务</span></div>
        </div>
        <div class="tables">
            <dataTable :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                <div class="t-head-bottom" slot="buttons">
                    <Button type="primary" v-html="pri_btn_name" @click="addSer()"></Button>
                    <Button type="ghost" @click="delbatch()">批量删除</Button>
                </div>
            </dataTable>
        </div>
        <!--修改合同-->
        <editContract ref="editContract"></editContract>
        <!--以下为供应商服务页面-->
        <!--添加服务-->
        <addContractSer ref="addContractSer"></addContractSer>
        <!--修改服务-->
        <editContractSer ref="editContractSer"></editContractSer>
        <!--删除服务-->
        <delContractSer ref="delContractSer" :title="delOneTitle"></delContractSer>
        <!--批量删除供应商服务-->
        <delContractSer ref="delContractSers" :title="delManyTitle"></delContractSer>
        <!--查看服务-->
        <showContractSer ref="showContractSer"></showContractSer>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable.vue'
    import editContract from '../contract/editContract.vue'
    import addContractSer from '../contract/addContractSer.vue'
    import editContractSer from '../contract/editContractSer.vue'
    import delContractSer from '../contract/delContractSer.vue'
    import showContractSer from '../contract/showContractSer.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTable, editContract, addContractSer, editContractSer, delContractSer, showContractSer
        },
        created () {
            this.$emit('updateActive', '8-1')
            this.tableTitle()
            // 获取合同修改信息
            this.getContractInfo()
        },
        data () {
            return {
                delOneTitle: '删除供应商服务',
                delManyTitle: '批量删除供应商服务',
                showTxtWord: true,
                showNoteWord: true,
                hideTxtWord: false,
                hideNoteWord: false,
                showBtn: true,
                showNoteBtn: true,
                hideBtn: false,
                hideNoteBtn: false,
                DownOneList: true,
                DownManyList: false,
                DownOne: true,
                DownMany: false,
                tablename: '供应商服务列表',
                pri_btn_name: '新增',
                hasbtn: true,
                url: SupplierManageHttp.map.getContractServiceList + '/' + this.$route.params.id + '/' + this.$route.params.sid,
                name: '',
                no: '',
                signtime: '',
                startime: '',
                endtime: '',
                site_name: '',
                attachment: '',
                note: '',
                showDownName: '',
                showDownUrl: '',
                id: '',
                downList: [],
                status: '',
                select_ids: '',
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
                                        src: params.row.imgurl
                                    }
                                }),
                                h('span', {
                                    style: {
                                        display: 'block',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        color: '#3399FF',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden'
                                    },
                                    on: {
                                        click: () => {
                                            this.showContractSer(params.row.serviceid)
                                        }
                                    }
                                }, params.row.title + params.row.no),
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
                        title: '服务等级',
                        width: '150',
                        sortable: true,
                        key: 'servicelevel'
                    },
                    {
                        title: '状态',
                        width: '90',
                        sortable: true,
                        key: 'status'
                    },
                    {
                        title: '服务质量',
                        width: '165',
                        sortable: true,
                        key: 'servicequality',
                        render: (h, params) => {
                            return h('Rate', {
                                props: {
                                    value: params.row.servicequality,
                                    disabled: true
                                }
                            })
                        }
                    },
                    {
                        title: '提供服务的分支',
                        width: '200',
                        sortable: true,
                        key: 'brancename'
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
                                            this.editSer(params.row.serviceid)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeContractSer(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: [],
                EditData: {}
            }
        },
        methods: {
            getContractInfo () {
                SupplierManageHttp.getContractInfo(this.$route.params.sid).then((data) => {
                    this.name = data.data.contractinfo.name
                    this.no = data.data.contractinfo.no
                    this.status = data.data.contractinfo.status
                    this.signtime = data.data.contractinfo.signdate.slice(0, 10)
                    this.startime = data.data.contractinfo.effecttime.slice(0, 10)
                    this.endtime = data.data.contractinfo.invalidtime.slice(0, 10)
                    this.site_name = data.data.contractinfo.site_name
                    this.note = data.data.contractinfo.note
                    if (this.note == null) {
                        this.showNoteBtn = false
                    }
                    // 显示单个
                    if (data.data.attachment.length != 0) {
                        this.DownOne = true
                        this.DownOneList = true
                        this.showDownName = data.data.attachment[0].name
                        this.showDownUrl = data.data.attachment[0].url
                    } else {
                        this.DownOne = false
                        this.DownOneList = false
                    }
                    // 批量显示
                    this.downList = data.data.attachment
                    this.EditData = data.data
                })
            },
            // table加title
            tableTitle () {
                setTimeout(
                    setTableItem, 3000
                )
            },
            // 返回
            back () {
                location.href = '/#/suppliermanage/contract/' + this.$route.params.id
            },
            // 显示隐藏
            more () {
                this.showTxtWord = false
                this.showBtn = false
                this.hideTxtWord = true
                this.hideBtn = true
            },
            hide () {
                this.showTxtWord = true
                this.showBtn = true
                this.hideTxtWord = false
                this.hideBtn = false
            },
            moreNote () {
                this.showNoteWord = false
                this.showNoteBtn = false
                this.hideNoteWord = true
                this.hideNoteBtn = true
            },
            hideNote () {
                this.showNoteWord = true
                this.showNoteBtn = true
                this.hideNoteWord = false
                this.hideNoteBtn = false
            },
            DownOneBtn () {
                this.DownOneList = false
                this.DownManyList = true
                this.DownOne = false
                this.DownMany = true
            },
            DownManyBtn () {
                this.DownOneList = true
                this.DownManyList = false
                this.DownOne = true
                this.DownMany = false
            },
            // 编辑合同
            editCont (EditData) {
                this.$refs.editContract.open(this.EditData)
                this.DownMany = false
                this.DownManyList = false
            },
            // 合同内供应商服务
            addSer () {
                this.$refs.addContractSer.open()
            },
            editSer (serviceid) {
                this.$refs.editContractSer.openEdit(serviceid)
            },
            removeContractSer (serviceid) {
                this.$refs.delContractSer.open(serviceid)
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
                    this.$refs.delContractSers.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的供应商服务!')
                }
            },
            // 查看合同
            showContractSer (serviceid) {
                this.$refs.showContractSer.open(serviceid)
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
