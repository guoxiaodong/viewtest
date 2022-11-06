<style>
    .barcodeDetail label.ivu-form-item-label{
        white-space: nowrap;
    }
    .barcodeDetail table td{
        padding:3px;
        font-size: 14px;
    }
    .barcodeDetail .detail-title-info{
        padding-top: 28px;
        padding-left: 30px;
        margin-bottom: 0px;
        font-size: 14px;
    }
    .barcodeDetail .detail-title-info span{
        color:gray;
    }
</style>
<template>
    <Modal width="700" v-model="barcodeDetail" title='' @on-cancel="cancel()" :closable="false" :mask-closable="false">
        <p slot="header" style="text-align:left;height: auto">
            <span class="barcodeDetailTitle"></span>
            <Button class="workOrder-output" style="float: right" type="primary" size="small" v-on:click="close">返回</Button>
        </p>
        <div class="barcodeDetail">
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
        <span slot="footer"  class="barcodepage">
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
                barcodeDetail: false,
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
                    }
                ],
                data: [],
                url: '/materiel/getmaterielrfid/',
                ifsearch: true
            }
        },
        mounted () {
           // $('div.ivu-modal-footer.barcodepage').css('display', 'none')
        },
        methods: {
            open (type, id) {
                this.id = id
                this.barcodeDetail = true
                $('span.barcodeDetailTitle').html(type + '条码明细')
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
                this.barcodeDetail = false
            },
            // 模态框关闭
            cancel () {
                this.barcodeDetail = false
                this.$refs.datatable.delData()
            }
        },
        watch: {
            barcodeDetail (v) {
                if (v === false) {
                    this.data = []
                }
            }
        }
    }
</script>
