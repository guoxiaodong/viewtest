<style>
    .inventoryDetails label.ivu-form-item-label{
        white-space: nowrap;
    }
    img.detailImg{
        height: 100px;
    }
    .img-room,.img-room img{
        display: inline-block;
    }
    .inventoryDetails table td{
        padding:3px;
        font-size: 14px;
    }
    .inventoryDetails table td:nth-child(odd){
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #657180;
        font-weight: 600;
    }
    .inventoryDetails .table td:nth-child(even){
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #657180;
    }
    .inventoryDetails table td:nth-child(odd) span{
        display: inline-block;
        width: 65%;
        text-align-last: justify;
    }
    .inventoryDetails .detail-title{
        padding: 0px 0 14px 18px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #657180;
        line-height: 21px;
    }
    .inventoryDetails .detail-title{
        border-bottom: 1px solid #9EA7B4;
    }
    .inventoryDetails .detail-title-info{
        padding-top: 28px;
        padding-left: 30px;
        margin-bottom: 0px;
        font-size: 14px;
    }
    .inventoryDetails .detail-title-info span{
        color:gray;
    }
    .inventoryDetails img{
        margin-right:16px;
        width:70px;
        height:70px;
    }
    .inventoryDetails .title-time{
        margin-right: 122px;
    }
    .inventoryDetails .title-priority{
        margin-right: 150px;
    }
</style>
<template>
    <div>
    <Modal width="700" v-model="inventory" title='' @on-cancel="cancel()">
        <p slot="header" style="text-align:left">
            <span class="inventoryDetailsTitle">出入库</span>
        </p>
        <div class="inventoryDetails">
             <!--出库记录-->
            <table border="0" width="100%" v-if="data.io == 0">
                <tr>
                    <td width="17%"><span>数量</span>：</td>
                    <td width="40%"><span>{{data.change_stock }}</span></td>
                    <td width="15%"><span>库管员</span>：</td>
                    <td ><span>{{data.admin}}</span></td>
                </tr>
                <tr>
                    <td><span>领取人</span>：</td>
                    <td><span>{{data.handler_name }}</span></td>
                    <td><span>出库时间</span>：</td>
                    <td ><span>{{data.created_at}}</span></td>
                </tr>
                <tr>
                    <td width="15%" valign="top"><span>原因</span>：</td>
                    <td colspan="3"><span>{{data.remark}}</span></td>
                </tr>
                <tr>
                <td width="10%" valign="top"><span>图片</span>：</td>
                <td colspan="3"><div id="imgMaterialDetail1" class="img-room" v-if="data.images.length"> <div class="img-room" v-for="image in data.images"><img class="detailImg" v-bind:src="image.url" /></div></div><div v-else>无</div></td>
                </tr>
                <tr v-if="data.rfid">
                    <td width="18%" valign="top"><span>物料序列号</span>：</td>
                    <td><a @click="openbar">点击查看条码明细</a></td>
                </tr>
            </table>
             <!--入库记录-->
            <table border="0" width="100%" v-if="data.io == 1">
                <tr>
                    <td width="15%"><span>批次</span>：</td>
                    <td width="40%"><span>{{data.id }}</span></td>
                    <td width="15%"><span></span></td>
                    <td ><span></span></td>
                </tr>
                <tr>
                    <td width="15%"><span>物料目录</span>：</td>
                    <td><span>{{data.materiel_name }}</span></td>
                    <td width="15%"><span>入库时间</span>：</td>
                    <td ><span>{{data.created_at }}</span></td>
                </tr>
                <tr>
                    <td width="15%"><span>条形码</span>：</td>
                    <td><span>{{data.barcode}}</span></td>
                    <td width="12%"><span>库管员</span>：</td>
                    <td ><span>{{data.admin}}</span></td>
                </tr>
                <tr>
                    <td width="15%"><span>数量</span>：</td>
                    <td><span>{{data.change_stock }}</span></td>
                    <td width="12%"><span>单价</span>：</td>
                    <td ><span>{{data.price}}</span></td>
                </tr>
                <tr>
                    <td width="15%"><span>入库人</span>：</td>
                    <td><span>{{data.handler_name}}</span></td>
                    <td width="12%"><span>供应商</span>：</td>
                    <td ><span>{{data.provider}}</span></td>
                </tr>
                <tr>
                    <td width="15%" valign="top"><span>备注</span>：</td>
                    <td ><span>{{data.remark }}</span></td>
                </tr>
                <tr>
                    <td width="10%" valign="top"><span>图片</span>：</td>
                    <td colspan="3"><div id="imgMaterialDetail2" class="img-room" v-if="data.images.length"> <div class="img-room" v-for="image in data.images"><img class="detailImg" v-bind:src="image.url" /></div></div><div v-else>无</div></td>
                </tr>
                <tr  v-if="data.rfid">
                    <td width="18%" valign="top"><span>物料序列号</span>：</td>
                    <td><a @click="openbar">点击查看条码明细</a></td>
                </tr>
            </table>
        </div>
        <span slot="footer">
        </span>
    </Modal>
    <!--查看条码明细-->
    <barcodeDetail  ref="barcodeDetail" @open="open(id)"></barcodeDetail>
    </div>
</template>
<script>
    import $ from 'jquery'
    import materialHttp from 'server/http/materialBasic'
    require('static/plugin/viewer/css/viewer.min.css')
    import Viewerd from 'static/plugin/viewer/js/viewer.min.js'
    import barcodeDetail from './barcodeDetail.vue'
    export default {
        components: {
            barcodeDetail
        },
        data () {
            return {
                data: [],
                inventory: false,
                id: '',
                viewer1: 1,
                viewer2: 1
            }
        },
        methods: {
            open (id) {
                this.id = id
                this.inventory = true
                materialHttp.inventoryOpen(id).then((data) => {
                    switch (data.io) {
                    case 0:
                        $('span.inventoryDetailsTitle').html('出库记录')
                        break
                    case 1:
                        $('span.inventoryDetailsTitle').html('入库记录')
                        break
                    }
                    this.data = data
                    this.data.admin = this.$store.state.loginUser.username
                    setTimeout(() => {
                        if (document.getElementById('imgMaterialDetail1')) {
                            this.viewer1 = new Viewerd(document.getElementById('imgMaterialDetail1'))
                        }
                        if (document.getElementById('imgMaterialDetail2')) {
                            this.viewer2 = new Viewerd(document.getElementById('imgMaterialDetail2'))
                        }
                    }, 500)
                }).catch((error) => {
                    this.$Message.error(error.error)
                })
            },
            openbar () {
                this.inventory = false
                if (this.data.io == 0) {
                    this.$refs.barcodeDetail.open('出库', this.id)
                }
                if (this.data.io == 1) {
                    this.$refs.barcodeDetail.open('入库', this.id)
                }
            },
            close () {
                this.inventory = false
                $('div.ivu-modal-footer').css('display', 'block')
                if (this.viewer1 !== 1) {
                    this.viewer1.destroy()
                }
                if (this.viewer2 !== 1) {
                    this.viewer2.destroy()
                }
            },
            // 模态框关闭
            cancel () {
                this.inventory = false
                $('div.ivu-modal-footer').css('display', 'block')
                if (this.viewer1 !== 1) {
                    this.viewer1.destroy()
                }
                if (this.viewer2 !== 1) {
                    this.viewer2.destroy()
                }
            }
        },
        watch: {
            inventory (v) {
                if (v === false) {
                    this.data = {}
                }
            }
        }
    }
</script>
