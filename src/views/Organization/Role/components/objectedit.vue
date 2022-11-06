<style>
    .modalcontent .ztree li a:hover { text-decoration: none; }
</style>
<template>
    <Modal v-model="show" title="管理对象" :styles="{width: '85%'}" class="modalfix">
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
                    <div id="modalfixh2" style="overflow: auto;">
                        <div class="item">
                            <div id='obj' class='ztree'></div>
                        </div>
                    </div>
                </Col>
                <Col span="14">
                    <div class="taglist">
                        <p>已选对象：</P>
                        <div class="clear"></div>
                        <ul id="fixlisth2" style="overflow: auto">
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
    import ObjectHttp from 'server/http/myObject'
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
                    treeId: 'obj',
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
                ObjectHttp.getAll().then((data) => {
                    this.treeData = data
                    this.ztreeObj = $.fn.zTree.init($('#obj'), this.setting, data)
                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0)) // 展开一级
                    // this.ztreeObj.expandAll(true) 全部展开
                    this.getRoleObjects()
                })
            },
            open (row) {
                this.id = row.id
                this.name = row.name
                this.description = row.description
                this.show = true
                this.checkedData = []
                this.search = ''
                this.init()
            },
            getRoleObjects () {
                ObjectHttp.getRoleObjects(this.id).then((obj) => {
                    for (let v of obj) {
                        let node = this.ztreeObj.getNodeByParam('id', v.id)
                        node.checked = true
                    }

                    let firstLevelNodes = this.ztreeObj.getNodesByParam('level', 0)

                    for (let node of firstLevelNodes) {
                        let halfchecked = this.isHalfChecked(node)
                        if (!halfchecked) {
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
                    if (node.pid !== null) {
                        this.checkedData.push({'id': node.id, 'name': node.name})
                    }
                }
            },
            cancel () {
                this.ztreeObj.destroy()
                this.show = false
            },
            confirm () {
                ObjectHttp.roleRelate(this.id, this.checkedData).then(() => {
                    this.$Message.success('提交成功')
                    this.ztreeObj.destroy()
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
