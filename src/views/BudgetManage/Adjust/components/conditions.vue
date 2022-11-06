<style>
    .me-def .ivu-modal-body{
        padding: 16px;
    }
    .me-def .ivu-modal-footer{
        padding:12px 18px 12px 18px;
    }
    /*.me-def .ivu-modal-header .ivu-modal-header-inner, .me-def .ivu-modal-header p{
        font-size: 14px;
        color: #1c2438;
        font-weight: 700;
    }*/
</style>
<template>
    <!-- <Modal v-model="show" title="条件过滤" @on-ok="ok" @on-cancel="cancel" :styles="{width: '90%'}" class="me-def"> -->
    <Modal v-model="show" title="条件过滤" @on-cancel="cancel" :styles="{width: '90%'}" class="me-def">
        <div style="font-size: 14px;">
            <div style="margin-bottom: 24px;">分&emsp;&emsp;类：
                <RadioGroup v-model="type">
                    <Radio label="1">
                        <span>计划性支出</span>
                    </Radio>
                    <Radio label="2">
                        <span>纠正性支出</span>
                    </Radio>
                </RadioGroup>
            </div>
            <div style="margin-bottom: 24px;">时间范围：<DatePicker type="daterange" placement="bottom-end" v-model="dateRange" @on-change="dateChange" style="width: 200px"></DatePicker>
            </div>
            <div class="flex" style="margin-bottom: 24px; font-size: 14px; border: 1px solid #CAD3DF; border-radius: 5px;">
                <div class="flex-1" style="border-right: 1px solid #CAD3DF">
                    <div>
                        <div style="border-bottom: 1px solid #CAD3DF; padding-left: 20px; height: 40px; line-height: 40px;">科&emsp;&emsp;目：</div>
                        <div id='subjects1' class='ztree' style="height: 350px; overflow: auto; margin-left: 20px;"></div>
                    </div>
                </div>
                <div class="flex-1">
                    <div>
                        <div style="border-bottom: 1px solid #CAD3DF; padding-left: 20px; height: 40px; line-height: 40px;">空&emsp;&emsp;间：</div>
                        <div id="place" class="ztree" style="height: 350px; overflow: auto; margin-left: 20px;"></div>
                    </div>
                </div>
            </div>
            <!--<div>
                门店：<div id="build" class="ztree"></div>
            </div>-->
            <div class="formbtns">
                <Button type="ghost" @click="cancel()">取&emsp;消</Button>
                <Button type="primary" @click="ok()">确&emsp;定</Button>
            </div>
        </div>
        <span slot='footer'></span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    // import {Format} from '@/util/timeFormat'
    // import FinanceHttp from 'server/http/finance'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/css/tree.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    export default {
        mixins: [ztreeSearch, ztree],
        data () {
            return {
                show: false,
                type: 1,
                dateRange: [],
                setting: {
                    treeId: 'fun',
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey: 'fid',
                            idKey: 'id',
                            rootPId: null
                        }
                    },
                    check: {
                        enable: true,
                        chkboxwType: 'checkbox'
                    },
                    callback: {
                        // onClick: this.nodeClick
                    },
                    view: {
                        selectedMulti: true
                    }
                },
                subjectTreeData: [],
                subjectTreeObj: '',
                placeTreeData: [],
                placeTreeObj: '',
                buildTreeData: [],
                buildTreeObj: '',
                treeData: [],
                ztreeObj: ''
            }
        },
        created () {
        },
        mounted () {
            if (this.dateRange.length == 0) {
                this.dateRange = [new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)]
            }
        },
        methods: {
            open (subData, placeData) {
                this.show = true
                this.treeData = subData
                this.ztreeObj = $.fn.zTree.init($('#subjects1'), this.setting, subData)
                // this.ztreeObj.expandAll(true)
                this.placeTreeData = placeData
                this.placeTreeObj = $.fn.zTree.init($('#place'), this.setting, placeData)
                // this.placeTreeObj.expandAll(true)
//                this.buildTreeData = buildData
//                this.buildTreeObj = $.fn.zTree.init($('#build'), this.setting, subData)
//                this.buildTreeObj.expandAll(true)
            },
            ok () {
                var arg = Object.create(null)
                arg['type'] = this.type
                if (this.dateRange != '' && this.dateRange.length == 2) {
                    arg['begin'] = this.dateRange[0]
                    arg['end'] = this.dateRange[1]
                }
                arg['finances'] = []
                arg['places'] = []
                // arg['build_ids'] = []
                this.ztreeObj.getCheckedNodes().forEach(item => {
                    arg['finances'].push({
                        id: item.id,
                        fid: item.fid,
                        name: item.name,
                        checked: item.checked,
                        nocheck: false
                    })
                })
                this.placeTreeObj.getCheckedNodes().forEach(item => {
                    arg['places'].push({
                        id: item.id,
                        fid: item.fid,
                        name: item.name,
                        checked: item.checked,
                        nocheck: item.nocheck
                    })
                })

//                this.buildTreeObj.getCheckedNodes().forEach(item => {
//                    arg['build_ids'].push({
//                        id: item.id,
//                        fid: item.fid,
//                        name: item.name,
//                        checked: item.checked,
//                        nocheck: item.nocheck
//                    })
//                })
                /* var selData = []
                this.ztreeObj.getCheckedNodes().forEach(item => {
                    selData.push({
                        id: item.id,
                        fid: item.fid,
                        name: item.name,
                        checked: item.checked,
                        nocheck: false
                    })
                }) */
                this.$emit('conCallback', arg)
                this.show = false
            },
            cancel () {
                this.show = false
            },
            dateChange (data) {
                // this.dateRange = data
            }
        }
    }
</script>
