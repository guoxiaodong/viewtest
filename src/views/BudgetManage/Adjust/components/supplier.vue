<style>
    /* .me-def .ivu-modal-footer
    {
        padding:12px 18px 12px 18px;
    } */
</style>
<template>
    <!-- <Modal v-model="show" title="供应商选择" @on-ok="ok" @on-cancel="cancel" class="me-def"> -->
    <Modal v-model="show" title="供应商选择" class="me-def">
        <div>
            <div class="treesear" style="text-align: center">
                <Input v-model="search" placeholder="请输入搜索内容" style="width: 80%"></Input>
            </div>
            <div style="overflow: auto;">
                <div class="item">
                    <div id='tree' class='ztree' ></div>
                </div>
            </div>
            <div class="formbtns">
                <Button type="ghost" @click="cancel()">取&emsp;消</Button>
                <Button type="primary" @click="ok()">确&emsp;定</Button>
            </div>
            <!--<span slot="footer">
                <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit()">确&emsp;定</Button>
            </span>-->
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    // import FinanceHttp from 'server/http/finance'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/css/tree.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    export default {
        mixins: [ztreeSearch, ztree],
        data () {
            return {
                search: '',
                show: false,
                treeData: [],
                ztreeObj: '',
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
                }
            }
        },
        created () {
        },
        methods: {
            open (data) { // 获取科目（组）数据
                this.show = true
                this.treeData = data
                this.ztreeObj = $.fn.zTree.init($('#tree'), this.setting, data)
            },
            ok () {
                var selData = []
                this.ztreeObj.getCheckedNodes().forEach(item => {
                    selData.push({
                        id: item.id,
                        name: item.name,
                        checked: item.checked
                    })
                    console.log(selData)
                })
                this.$emit('supCondition', selData)
                this.show = false
            },
            cancel () {
                this.show = false
            }
        },
        watch: {
            search (v) {
                this.ztreeSearch(this.ztreeObj, this.treeData, v)
            }
        }
    }
</script>
