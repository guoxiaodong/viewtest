<style>
    .ivu-menu-horizontal {
        height: 40px;
        line-height: 40px;
        margin-top: 15px;
    }
    .ivu-menu-horizontal .ivu-menu-item {
        font-size: 16px;
        color: #9EA7B4;
    }
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
    .tables .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .itemTop { font-size: 14px; color: #657180; }
    .itemTop .itemLine { padding: 2px 0; clear: both; }
    .itemTop .itemLine .Txtwords { width: 70%; float: left; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; }
</style>
<template>
    <div>
        <div class="itemTop"  style="background-color: #f5f7f9;">
            <Row style="">
                <Col span="18" style="background-color: #fff; padding: 20px;">
                    <Row>
                        <Col span="16" style="font-size: 20px; color: #657180; word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.name}}&nbsp;</Col>
                        <Col span="8" style="text-align: right;">
                            <Button type="text" style="font-size: 14px;" @click="editSupplier">修改信息</Button>
                            <Button type="primary" style="font-size: 14px;" @click="back">返回上一级</Button>&emsp;
                        </Col>
                        <Col span="24" style="margin-top: 20px;">
                            <Row>
                                <Col span="6">
                                    <img :src="this.logo" width="143" height="143" />
                                </Col>
                                <Col span="18">
                                    <Row>
                                        <Col class="itemLine">编&emsp;&emsp;号：{{this.no}}</Col>
                                        <Col class="itemLine">更新时间：{{this.updatatime}}</Col>
                                        <Col class="itemLine">地&emsp;&emsp;址：{{this.address}}</Col>
                                        <Col class="itemLine"><span style="float:left;">详细地址：</span><span  style="word-wrap: break-word; word-break: normal; word-break:break-all; float: left; width: 70%;">{{this.addressdetail}}</span></Col>

                                        <Col class="itemLine">
                                            <span style="float:left;">联系方式：</span>
                                            <div style="float: left; width: 70%;" v-if="ShowOne"><span style="word-wrap: break-word; word-break: normal; word-break:break-all;">{{this.contactName}}</span>&emsp;{{this.contactTel}}</div>
                                            <div style="float: left; width: 70%;" v-if="ShowMany">
                                                <ul v-for="(item, index) in this.contact" :key="item.index">
                                                    <li><span style="word-wrap: break-word; word-break: normal; word-break:break-all;">{{item.name}}</span>&emsp;{{item.tel}}</li>
                                                </ul>
                                            </div>
                                            <a @click="ShowBtn" v-if="ShowOneBtn" style="float: right; margin-right: 20px; text-decoration:underline">更多</a>
                                            <a @click="CloseBtn" v-if="ShowManyBtn" style="float: right; margin-right: 20px; text-decoration:underline">收起</a>
                                        </Col>
                                        <div style="height: 0; clear: both; width: 100%;"></div>
                                        <Col class="itemLine">
                                            <span style="float: left;">备&emsp;&emsp;注：</span>
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
                </Col>
                <Col span="6" style=" float: right">
                    <div style="margin-left: 15px; height: 242px; padding: 15px 25px 0; text-align: center; background-color: #fff;">
                      <div style="border-bottom: 1px dashed #D7DDE4; padding: 17px 0 18px;">
                         <h3 style="font-size: 16px; color: #FFA000; font-weight: normal;">待付款总额</h3>
                         <h2 style="font-size: 28px; color: #FFA000; font-weight: normal;">{{this.waitmoney}}</h2>
                      </div>
                      <div style="padding-top: 17px;">
                          <h3 style="font-size: 16px; color: #657180; font-weight: normal;">历史工单总额</h3>
                          <h2 style="font-size: 28px; color: #657180; font-weight: normal;">{{this.historymoney}}</h2>
                      </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div style="" class="menus">
            <Menu style="" mode="horizontal" active-name="1" ref="othermenu">
                <router-link :to="basic">
                    <MenuItem name="1">概况</MenuItem>
                </router-link>
                <router-link :to="service">
                    <MenuItem name="2">服务（{{this.sernormal}}/{{this.sertotal}}）</MenuItem>
                </router-link>
                <router-link :to="contract">
                    <MenuItem name="3">合同（{{this.contractEffective}}/{{this.contractTotal}}）</MenuItem>
                </router-link>
                <router-link :to="historywork">
                    <MenuItem name="4">历史工单（{{this.workorderNum}}）</MenuItem>
                </router-link>
                <router-link :to="structure">
                    <MenuItem name="5">分支机构（{{this.branchNum}}）</MenuItem>
                </router-link>
            </Menu>
        </div>
        <div class="clear"></div>
        <!--编辑供应商-->
        <editSupplier ref="editSupplier"></editSupplier>
        <router-view @updateActiveName="updateActiveName"></router-view>
    </div>
</template>
<script>
    import SupplierManageHttp from 'server/http/supplierManage'
    import editSupplier from '../components/editSupplier'
    export default {
        components: {
            editSupplier
        },
        created () {
            this.$emit('updateActive', '8-1')
            this.getSupplierInfo()
            this.serNum()
            this.contractNum()
            this.workOrderNum()
        },
        data () {
            return {
                ShowOne: true,
                ShowMany: false,
                ShowOneBtn: true,
                ShowManyBtn: false,
                showNoteWord: true,
                hideNoteWord: false,
                showNoteBtn: true,
                hideNoteBtn: false,
                sertotal: '',
                sernormal: '',
                contractTotal: '',
                contractEffective: '',
                workorderNum: '',
                branchNum: '',
                basic: '/suppliermanage/basic/' + this.$route.params.id,
                service: '/suppliermanage/service/' + this.$route.params.id,
                contract: '/suppliermanage/contract/' + this.$route.params.id,
                historywork: '/suppliermanage/historywork/' + this.$route.params.id,
                structure: '/suppliermanage/structure/' + this.$route.params.id,
                name: '',
                logo: '',
                no: '',
                updatatime: '',
                address: '',
                addressdetail: '',
                contact: [],
                contactName: '',
                contactTel: '',
                intro: '',
                ser: '',
                value: '',
                waitmoney: '',
                historymoney: '',
                EditData: {}
            }
        },
        methods: {
            back () {
                location.href = '/#/suppliermanage/supplier'
            },
            updateActiveName (menuName) {
                this.$refs.othermenu.currentActiveName = menuName
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
            // 获取供应商修改信息
            getSupplierInfo () {
                this.contact = []
                SupplierManageHttp.getSupplierInfo(this.$route.params.id).then((data) => {
                    this.historymoney = data.countmoney
                    this.waitmoney = data.countwaitpaymoney
                    this.name = data.name
                    this.no = data.no
                    this.updatatime = data.updated_at
                    this.address = data.address
                    this.addressdetail = data.addressdetail
                    // 多个联系方式
                    for (let v of JSON.parse(data.contact)) {
                        this.contactName = v.name
                        this.contactTel = v.tel
                        this.contact.push({name: v.name, tel: v.tel})
                    }
                    this.logo = data.logo
                    this.value = data.servicescore
                    this.intro = data.intro
                    if (this.intro == null) {
                        this.showNoteBtn = false
                    }
                    this.EditData = data
                    this.ShowMany = false
                    this.branchNum = data.countsb
                })
            },
            // 获取服务数量
            serNum () {
                SupplierManageHttp.getSerNum(this.$route.params.id).then((data) => {
                    this.sertotal = data.total
                    this.sernormal = data.normal
                })
            },
            // 获取合同数量
            contractNum () {
                SupplierManageHttp.getContractCount(this.$route.params.id).then((data) => {
                    this.contractTotal = data.data.total
                    this.contractEffective = data.data.effective
                })
            },
            // 获取历史工单数量
            workOrderNum () {
                SupplierManageHttp.getHistoryWorkOrderCount(this.$route.params.id).then((data) => {
                    this.workorderNum = data.workOrderCount
                })
            },
            // 编辑供应商
            editSupplier (EditData) {
                this.ShowOneBtn = true
                this.ShowManyBtn = false
                this.ShowOne = true
                this.ShowMany = false
                this.$refs.editSupplier.open(this.EditData)
            }
        }
    }
</script>
