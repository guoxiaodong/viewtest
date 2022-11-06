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
     .menus {
         background-color: #f5f7f9;
         padding: 10px 0 20px;
     }
     .menus .ivu-menu-light {
         background: none;
     }
     .menus .ivu-menu-horizontal {
         margin-top: 0;
     }
     .itemTop { font-size: 14px; color: #657180; }
     .itemTop .itemLine { padding: 2px 0; }
     .itemTop .itemLine .Txtwords { width: 70%; float: left; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; }
</style>
<template>
    <div>
        <div class="itemTop">
            <Row>
                <Col span="16" style="font-size: 20px; color: #657180; word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.name}}&nbsp;</Col>
                <Col span="8" style="text-align: right;">
                    <Button type="text" style="font-size: 14px;" @click="editBranch">修改信息</Button>
                    <Button type="primary" style="font-size: 14px;" @click="back">返回上一级</Button>&emsp;
                </Col>
                <Col span="24" style="margin-top: 20px;">
                    <Row>
                        <Col span="4">
                            <img :src="this.logo" width="143" height="143" />
                        </Col>
                        <Col span="20">
                            <Row>
                                <Col class="itemLine" span="24">
                                    <Row>
                                        <Col span="12">编&emsp;&emsp;号：{{this.no}}</Col>
                                        <Col span="12">服务质量：</Col>
                                    </Row>
                                </Col>
                                <Col class="itemLine">
                                    <Row>
                                        <Col span="12">更新时间：{{this.updataTime}}</Col>
                                        <Col span="12">地&emsp;&emsp;址：{{this.address}}</Col>
                                    </Row>
                                </Col>
                                <Col span="24">
                                    <span style="float: left;">详细地址：</span><span style="float: left; width: 80%; word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.addressdetail}}</span>
                                </Col>
                                <Col class="itemLine">
                                    <Row>
                                        <Col span="24">
                                            <span style="float:left; margin-top: 2px;">联系方式：</span>
                                            <div style="float: left; width: 70%" v-if="ShowOne"><span style="word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.contactName}}</span>&emsp;{{this.contactTel}}</div>
                                            <div style="float: left; width: 70%" v-if="ShowMany">
                                                <ul v-for="(item, index) in this.contact" :key="item.index">
                                                    <li><span style="word-wrap: break-word; word-break: normal; word-break:break-all;">{{item.name}}</span>&emsp;{{item.tel}}</li>
                                                </ul>
                                            </div>
                                            <a @click="ShowBtn" v-if="ShowOneBtn" style="float: right; margin-right: 20px; text-decoration:underline">更多</a>
                                            <a @click="CloseBtn" v-if="ShowManyBtn" style="float: right; margin-right: 20px; text-decoration:underline">收起</a>
                                        </Col>
                                    </Row>
                                </Col>
                                <div style="height: 0; clear: both; width: 100%;"></div>
                                <Col class="itemLine">
                                    <span style="float: left;">服务范围：</span>
                                    <div class="Txtwords" v-if="showSerWord">{{this.search}}</div>
                                    <div v-if="hideSerWord" style="float: left; width: 70%;">{{this.search}}</div>
                                    <a v-if="showSerBtn" @click="moreSer" style="float: right; margin-right: 20px; text-decoration:underline">更多</a>
                                    <a v-if="hideSerBtn" @click="hideSer" style="float: right; margin-right: 20px; text-decoration:underline">收起</a>
                                </Col>
                                <div style="height: 0; clear: both; width: 100%;"></div>
                                <Col class="itemLine">
                                    <span style="float: left;">简&emsp;&emsp;介：</span>
                                    <div class="Txtwords" v-if="showNoteWord">{{this.intro}}</div>
                                    <div v-if="hideNoteWord" style="float: left; width: 70%; word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.intro}}</div>
                                    <a v-if="showNoteBtn" @click="moreNote" style="float: right; margin-right: 20px; text-decoration:underline">更多</a>
                                    <a v-if="hideNoteBtn" @click="hideNote" style="float: right; margin-right: 20px; text-decoration:underline">收起</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <div style="" class="menus">
            <Menu style="" mode="horizontal" active-name="1" ref="othermenu">
                <router-link :to="supplist">
                    <MenuItem name="1">供应商服务（{{this.normalTotal}}/{{this.total}}）</MenuItem>
                </router-link>
                <router-link :to="workorder">
                    <MenuItem name="2">历史工单（{{this.workorderNum}}）</MenuItem>
                </router-link>
            </Menu>
        </div>
        <router-view @updateActiveName="updateActiveName"></router-view>
        <!--修改分支-->
        <editBranch ref="editBranch"></editBranch>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable.vue'
    import editBranch from '../structure/editBranch.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTable, editBranch
        },
        created () {
            this.$emit('updateActive', '8-1')
            this.tableTitle()
            // 获取分支修改信息
            this.getBranchInfo()
        },
        data () {
            return {
                delOneTitle: '删除供应商服务',
                delManyTitle: '批量删除供应商服务',
                tablename: '供应商服务列表',
                pri_btn_name: '新增',
                ShowOne: true,
                ShowMany: false,
                ShowOneBtn: true,
                ShowManyBtn: false,
                showSerWord: true,
                hideSerWord: false,
                showSerBtn: true,
                hideSerBtn: false,
                showNoteWord: true,
                hideNoteWord: false,
                showNoteBtn: true,
                hideNoteBtn: false,
                hasbtn: true,
                supplist: '/suppliermanage/structure/showBranchSuppList/' + this.$route.params.id + '/' + this.$route.params.sid,
                workorder: '/suppliermanage/structure/showBranchWorkOrder/' + this.$route.params.id + '/' + this.$route.params.sid,
                total: '',
                normalTotal: '',
                workorderNum: '',
                logo: '',
                name: '',
                no: '',
                updataTime: '',
                search: '',
                intro: '',
                address: '',
                addressdetail: '',
                contactName: '',
                contactTel: '',
                contact: [],
                EditData: {}
            }
        },
        methods: {
            getBranchInfo () {
                this.contact = []
                SupplierManageHttp.getBranchInfo(this.$route.params.sid).then((data) => {
                    this.total = data.countservice
                    this.normalTotal = data.countNormal
                    this.workorderNum = data.countwo
                    this.name = data.name
                    this.logo = data.logo
                    this.no = data.no
                    this.updataTime = data.updated_at
                    this.search = data.search
                    this.intro = data.intro
                    this.address = data.address
                    this.addressdetail = data.addressdetail
                    // 多个联系方式
                    for (let v of JSON.parse(data.contact)) {
                        this.contactName = v.name
                        this.contactTel = v.tel
                        this.contact.push({name: v.name, tel: v.tel})
                    }
                    this.intro = data.intro
                    if (this.intro == null) {
                        this.showNoteBtn = false
                    }
                    this.EditData = data
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
                location.href = '/#/suppliermanage/structure/' + this.$route.params.id
            },
            // 按钮切换
            ShowBtn () {
                this.ShowOne = false
                this.ShowMany = true
                this.ShowOneBtn = false
                this.ShowManyBtn = true
            },
            CloseBtn () {
                this.ShowOne = true
                this.ShowMany = false
                this.ShowOneBtn = true
                this.ShowManyBtn = false
            },
            moreSer () {
                this.showSerWord = false
                this.hideSerWord = true
                this.showSerBtn = false
                this.hideSerBtn = true
            },
            hideSer () {
                this.showSerWord = true
                this.hideSerWord = false
                this.showSerBtn = true
                this.hideSerBtn = false
            },
            moreNote () {
                this.showNoteBtn = false
                this.showNoteWord = false
                this.hideNoteBtn = true
                this.hideNoteWord = true
            },
            hideNote () {
                this.showNoteBtn = true
                this.showNoteWord = true
                this.hideNoteBtn = false
                this.hideNoteWord = false
            },
            // 修改分支列表
            editBranch (EditData) {
                this.$refs.editBranch.open(this.EditData)
                this.ShowOne = true
                this.ShowOneBtn = true
                this.ShowMany = false
                this.ShowManyBtn = false
            },
            updateActiveName (menuName) {
                this.$refs.othermenu.currentActiveName = menuName
            }
        }
    }
</script>
