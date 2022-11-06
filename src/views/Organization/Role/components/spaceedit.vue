<style>
    .modalcontent .ztree li a:hover { text-decoration: none; }
</style>
<template>
    <Modal v-model="show" title="空间权限" :styles="{width: '85%'}" @on-cancel="cancel1" class="modalfix">
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
                    <div id="modalfixh1" style="overflow: auto;">
                        <div class="item">
                            <div id='allSpace' class='ztree'></div>
                        </div>
                    </div>
                </Col>
                <Col span="14">
                    <div class="taglist">
                        <p>已选空间：</P>
                        <div class="clear"></div>
                        <ul id="fixlisth1" style="overflow: auto;">
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
    import SpaceHttp from 'server/http/space'
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
                spaceData: [],
                checkedData: [],
                allSpaceSetting: {
                    treeId: 'space',
                    data: {
                        simpleData: {
                            enable: true
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
                SpaceHttp.allSpace().then((data) => {
                    this.spaceData = data
                    this.ztreeObj = $.fn.zTree.init($('#allSpace'), this.allSpaceSetting, data)
                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0))
                    // this.ztreeObj.expandAll(true)
                    this.getRoleSpace()
                })
            },
            open (row) {
                this.checkedData = []
                this.id = row.id
                this.name = row.name
                this.description = row.description
                this.show = true
                this.init()
            },
            getRoleSpace () {
                SpaceHttp.roleSpaces(this.id).then((ids) => {
                    for (let id of ids) {
                        let node = this.ztreeObj.getNodeByParam('id', id)
                        node.checked = true
                        this.ztreeOnCheck(this.ztreeObj, node)
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
                    // 父节点是否半选
                    let pNode = node.getParentNode()
                    let pHalfchecked = pNode ? this.isHalfChecked(pNode) : true

                    if (!halfchecked && pHalfchecked) {
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
                SpaceHttp.roleRelate(this.id, this.checkedData).then(() => {
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
                this.ztreeSearch(this.ztreeObj, this.spaceData, v)
            }
        }
    }
</script>
