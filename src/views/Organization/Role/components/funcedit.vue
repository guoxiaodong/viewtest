<style>
    .modalcontent .ztree li a:hover { text-decoration: none; }
</style>
<template>
    <Modal v-model="show" title="功能权限" :styles="{width: '85%'}" @on-cancel="cancel1" class="modalfix">
        <div class="item">
            <p class="roleinfo">角色：{{name}}</p>
            <p class="roleinfo">描述：{{description}}</p>
        </div>
        <div class="modalcontent">
            <Row>
                <Col span="10" style="border-right: 1px solid #CAD3DF;">
                    <div class="treesear">
                        <Input v-model="search" placeholder="搜索" style="width: 100%"></Input>
                    </div>
                    <div id="modalfixh" style="overflow: auto;">
                        <div class="item">
                            <div id='permissions' class='ztree'></div>
                        </div>
                    </div>
                </Col>
                <Col span="14">
                    <div class="taglist">
                        <p>已选权限：</P>
                        <div class="clear"></div>
                        <ul id="fixlisth" style="overflow: auto">
                            <li v-for="i in checkedData">
                                {{ i.name }}
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="formbtns">
            <div class="item">
                <Button type="ghost" @click="cancel()">取&emsp;消</Button>
                <Button type="primary" @click="confirm()">确&emsp;定</Button>
            </div>
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import PermissionHttp from 'server/http/permission'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/css/tree.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    export default {
        mixins: [ztreeSearch, ztree],
        data () {
            return {
                show: false,
                name: '',
                description: '',
                search: '',
                ztreeObj: '',
                treeData: [],
                checkedData: [],
                setting: {
                    treeId: 'func',
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey: 'pid'
                        }
                    },
                    check: {
                        enable: true,
                        chkboxwType: 'checkbox'
                    },
                    callback: {
                        onCheck: this.onCheck,
                        beforeClick: () => {
                            return false
                        }
                    }
                }
            }
        },
        methods: {
            init () {
                PermissionHttp.getAll().then((data) => {
                    this.treeData = data
                    this.ztreeObj = $.fn.zTree.init($('#permissions'), this.setting, data)
                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0)) // 展开一级
                    // this.ztreeObj.expandAll(true) 全部展开
                    this.getRolePermissions()
                })
            },
            open (row) {
                this.id = row.id
                this.name = row.name
                this.description = row.description
                this.show = true
                this.checkedData = []
                this.init()
            },
            getRolePermissions () {
                PermissionHttp.getRolePermissions(this.id).then((permissions) => {
                    for (let v of permissions) {
                        let node = this.ztreeObj.getNodeByParam('id', v.id)
                        if (node != null) {
                            node.checked = true
                        }
                    }
                    this.ztreeObj.refresh()
                    this.refreshCheckData()
                })
            },
            onCheck (event, treeId, treeNode) {
                this.ztreeOnCheck(this.ztreeObj, treeNode)
                this.refreshCheckData()
            },
            refreshCheckData () {
                let checkedNodes = this.ztreeObj.getNodesByParam('checked', true)
                this.checkedData = []
                for (let node of checkedNodes) {
                    // 当前节点是否半选
                    let halfchecked = this.isHalfChecked(node)

                    if (!halfchecked) {
                        this.checkedData.push({'id': node.id, 'name': node.name})
                    }
                }
            },
            cancel () {
                this.ztreeObj.destroy()
                this.search = ''
                this.show = false
            },
            cancel1 () {
                this.search = ''
            },
            confirm () {
                PermissionHttp.roleRelate(this.id, this.checkedData).then(() => {
                    this.$Message.success('提交成功')
                    this.ztreeObj.destroy()
                    this.search = ''
                    this.show = false
                }).catch((error) => {
                    this.$Message.error(error)
                })
            }
        },
        watch: {
            search (v) {
                this.ztreeSearch(this.ztreeObj, this.treeData, v)
            }
        }
    }
</script>
