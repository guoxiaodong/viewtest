<style>
    .printBarcode label.ivu-form-item-label{
        white-space: nowrap;
    }
    .printBarcode table td{
        padding:3px;
        font-size: 14px;
    }
    .printBarcode .detail-title-info{
        padding-top: 28px;
        padding-left: 30px;
        margin-bottom: 0px;
        font-size: 14px;
    }
    .printBarcode .detail-title-info span{
        color:gray;
    }
</style>
<template>
    <Modal width="700" v-model="printBarcode" title='' @on-cancel="cancel()" :closable="false" :mask-closable="false">
        <p slot="header" style="text-align:left;height: auto">
            <span class="printBarcodeTitle"></span>
            <Button class="workOrder-output" style="float: right" type="primary" size="small" v-on:click="close">返回</Button>
        </p>
        <div class="printBarcode">
            <dataTableChoose
                ref="datatable"
                :columns="columns"
                :data="data"
                dataname="data"
                :ifsearch="ifsearch"
                :choosetime="choosetime"
                :int="false"
                :url="url">
            </dataTableChoose>
        </div>
        <span slot="footer" >
        </span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    // import materialHttp from 'server/http/materialBasic'
    require('static/plugin/viewer/css/viewer.min.css')
    import dataTableChoose from '@/components/dataTableChoose.vue'
    export default {
        components: {
            dataTableChoose
        },
        data () {
            return {
                printBarcode: false,
                id: '',
                choosetime: false,
                columns: [
                    {
                        title: '序号',
                        key: 'pid',
                        align: 'center'
                    },
                    {
                        title: '条码序列号',
                        align: 'center',
                        key: 'rfid'
                    },
                    {
                        title: '打印次数',
                        align: 'center',
                        key: 'print_number'
                    },
                    {
                        title: '打印时间',
                        align: 'center',
                        key: 'print_time'
                    }
                ],
                data: [],
                url: '/materiel/getrepeatprintrfid/',
                ifsearch: true
            }
        },
        mounted () {
        },
        methods: {
            open (id) {
                this.id = id
                this.printBarcode = true
                $('span.printBarcodeTitle').html('重复打印条码明细')
                this.tableInt()
            },
            tableInt () {
                if (this.id == 0) {
                    return
                }
                this.url = '/materiel/getmaterielrfid/' + this.id
                this.$refs.datatable.list()
            },
            close () {
                this.$refs.datatable.delData()
                this.$emit('open', this.id)
                this.printBarcode = false
                $('div.ivu-modal-footer').css('display', 'block')
            },
            // 模态框关闭
            cancel () {
                this.printBarcode = false
                $('div.ivu-modal-footer').css('display', 'block')
                this.$refs.datatable.delData()
            }
        },
        watch: {
            printBarcode (v) {
                if (v === false) {
                    this.data = []
                }
            }
        }
    }
</script>
