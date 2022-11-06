<style>
    .barcodeRepeat label.ivu-form-item-label{
        white-space: nowrap;
    }
    .barcodeRepeat table td{
        padding:3px;
        font-size: 14px;
    }
    .barcodeRepeat .detail-title-info{
        padding-top: 28px;
        padding-left: 30px;
        margin-bottom: 0px;
        font-size: 14px;
    }
    .barcodeRepeat .detail-title-info span{
        color:gray;
    }
    .barcodeRepeat input{
        position: relative;
        top: 38px;
    }
    .barcodeRepeat .barcodeImg{
        margin-left: 15%;
    }
    .barcodeRepeat .barcodeImg div:last-child{
        letter-spacing: 4px;
    }
</style>
<template>
    <Modal width="500" v-model="barcodeRepeat" title='' @on-cancel="cancel()" :closable="false" :mask-closable="false">
        <p slot="header" style="text-align:left;height: auto">
            <input id="check" type="checkbox" style="margin-top: 8px;" checked="checked"  @change="swapCheck()" />
            <span style="margin-left: 5px;">全选</span>
          <span ><span style="float:right;">总数： <span>{{checkAllGroup.length}}</span></span><span style="float: right;margin-right: 20px">已选： <span>{{checkTotal}}</span></span> </span>
        </p>
        <div>
            <p>开始序列号：<span>{{barcode[0]}}</span></p>
            <p>结束序列号：<span>{{barcode[barcode.length - 1]}}</span></p>
        </div>
        <div><Input  style="width: 260px" placeholder="搜索序列号" icon="search"  v-model="searchCode" @on-change="search()"></Input></div>
        <div class="barcodeRepeat" id="print">
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <div v-for="(index, item) in checkAllGroup" class="checkbox"><input checked="checked" class="print1" type="checkbox" @change="itemCheck()"><div class="barcodeImg print"></div></div>
            </CheckboxGroup>
        </div>
        <span slot="footer"  class="barcodepage">
             <Button type="primary" @click="print()" >打印</Button>
             <Button type="ghost" @click="close()">取消</Button>
        </span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import {Format} from '@/util/timeFormat'
    // import materialHttp from 'server/http/materialBasic'
    require('static/plugin/viewer/css/viewer.min.css')
    import dataTableChoose from '@/components/dataTableChoose.vue'
    // import barcode from 'static/plugin/barcode/jquery-barcode.js'
    require('static/plugin/barcode/jquery-barcode.js')
    require('static/plugin/print/jqprint.js')
    export default {
        components: {
            dataTableChoose
        },
        data () {
            return {
                barcodeRepeat: false,
                id: '',
                checkAll: true,
                checkAllGroup: [],
                allGrup: [],
                checkTotal: '',
                searchCode: '',
                barcode: [], // 条码数组
                all: [[], []],
                thisTime: []
            }
        },
        created () {
           // this.checkAllGroup
        },
        mounted () {
            // $('div.ivu-modal-footer.barcodepage').css('display', 'none')
        },
        methods: {
            open (id, num) {
                this.id = id
                for (var i = 1; i <= num; i++) {
                    this.allGrup.push(i.toString())
                    this.checkAllGroup.push(i.toString())
                    this.all[0].push(i.toString())
                }
                setTimeout(() => {
                    for (var v in this.checkAllGroup) {
                        var total = (parseInt(v) + 1).toString()
                        while (total.length < 4) {
                            total = '0' + total
                        }
                        this.barcode.push(new Date().getTime() + total)
                        var barcode = new Date().getTime() + total
                        this.all[1].push(barcode)
                        $('.barcodeImg').eq(v).empty().barcode(barcode, 'code128', {barWidth: 2, barHeight: 60, fontSize: 15, showHRI: true})
                        $('.ivu-checkbox-group input').eq(v).val()
                    }
                    this.barcodeRepeat = true
                    this.checkTotal = this.checkAllGroup.length
                }, 500)
            },
            swapCheck () {
                if (this.checkAll) {
                    $("input[type='checkbox']").each(function () {
                        this.checked = false
                    })
                    this.checkAll = false
                } else {
                    $("input[type='checkbox']").each(function () {
                        this.checked = true
                    })
                    this.checkAll = true
                }
                this.checkTotal = $('.barcodeRepeat input.print1:checked').length
            },
            itemCheck () {
                if ($('.barcodeRepeat input:checked').length == this.checkAllGroup.length) {
                    $('#check').prop('checked', true)
                } else {
                    $('#check').prop('checked', false)
                }
                this.checkTotal = $('.barcodeRepeat input.print1:checked').length
            },
            checkAllGroupChange (data) {
                if (data.length === this.allGrup.length) {
                    this.indeterminate = false
                    this.checkAll = true
                } else if (data.length > 0) {
                    this.indeterminate = true
                    this.checkAll = false
                } else {
                    this.indeterminate = false
                    this.checkAll = false
                }
                this.checkTotal = $('.barcodeRepeat input.print1:checked').length
            },
            close () {
                // this.$refs.datatable.delData()
                this.$emit('open', this.id)
                this.barcodeRepeat = false
            },
            search () {
                var search = this.searchCode
                var barcode = this.barcode
                $('.barcodeRepeat .checkbox').hide()
                $('.barcodeRepeat .barcodeImg').removeClass('print')
                $('.barcodeRepeat input').removeClass('print1')
                $.grep(this.barcode, function (value) {
                    if (value.indexOf(search) != -1) {
                        var disappear = (barcode.indexOf(value))
                        $('.barcodeRepeat input').eq(disappear).addClass('print1')
                        $('.barcodeRepeat .barcodeImg').eq(disappear).addClass('print')
                        $('.barcodeRepeat .checkbox').eq(disappear).show()
                    }
                })
                this.checkTotal = $('.barcodeRepeat input.print1:checked').length
            },
            print () {
                // 打印计数（暂时最大为1）
                // **
                $('.barcodeRepeat input').next().removeClass('check')
                for (var i = 0; i < $('.barcodeRepeat input:checked').length; i++) {
                    if ($('.barcodeRepeat input:checked').eq(i).is(':checked')) {
                        $('.barcodeRepeat input:checked').eq(i).next().addClass('check')
                    }
                }
                $('.barcodeRepeat .barcodeImg.print.check').jqprint({
                    debug: false,
                    importCSS: true,
                    printContainer: true,
                    operaSupport: false
                })
                // 具体打印条码
                var div = Array.from($('.barcodeRepeat .barcodeImg.print.check').children('div:last-child'))
                for (var a in div) {
                    var tempItem = {
                        rfid: $(div[a]).html(),
                        print_time: Format(new Date(), 'yyyy-MM-dd hh:mm:ss')
                    }
                    this.thisTime.push(tempItem)
//                    console.log(Array.indexOf(this.thisTime, $(div[a]).html()))
//                    if (Array.indexOf(this.thisTime, $(div[a]).html()) != -1) {
//                        var index = Array.indexOf(this.thisTime, $(div[a]).html())
//                        this.thisTime.splice(index + 1, 0, Format(new Date(), 'yyyy-MM-dd hh:mm:ss'))
//                    } else {
//                        this.thisTime.push($(div[a]).html())
//                        this.thisTime.push(Format(new Date(), 'yyyy-MM-dd hh:mm:ss'))
//                    }
                }
                this.$emit('print', this.thisTime, this.barcode)
                this.barcodeRepeat = false
            },
            // 模态框关闭
            cancel () {
                this.barcodeRepeat = false
            }
        },
        watch: {
            barcodeRepeat (v) {
                if (v === false) {
                    for (v in this.checkAllGroup) {
                        $('.barcodeImg').eq(v).empty()
                    }
                    this.allGrup = []
                    this.checkAllGroup = []
                    this.searchCode = ''
                    this.thisTime = []
                    this.barcode = []
                }
            }
        }
    }
 </script>
