<style>
    .me-def .ivu-modal-footer
    {
        padding:12px 18px 12px 18px;
    }
</style>
<template>
    <Modal v-model="show" title="科目选择" @on-ok="ok" @on-cancel="cancel" class="me-def">
    <div>
        <div class="treesear" style="text-align: center">
            <Input v-model="search" placeholder="请输入搜索内容" style="width: 80%"></Input>
        </div>
        <div style="overflow: auto;">
            <div class="item">
                <div id='subjects' class='ztree' ></div>
            </div>
        </div>
        <!--<span slot="footer">
            <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
            <Button type="primary" @click="handleSubmit()">确&emsp;定</Button>
        </span>-->
    </div>
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
            // this.getList()
        },
        methods: {
            open (data) { // 获取科目（组）数据
                this.show = true
                this.treeData = data
                this.ztreeObj = $.fn.zTree.init($('#subjects'), this.setting, data)
                this.ztreeObj.expandAll(true)
            },
            ok () {
                var selData = []
                this.ztreeObj.getCheckedNodes().forEach(item => {
                    selData.push({
                        id: item.id,
                        fid: item.fid,
                        name: item.name,
                        checked: item.checked,
                        nocheck: false
                    })
                })
                this.$emit('subCondition', selData)
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
