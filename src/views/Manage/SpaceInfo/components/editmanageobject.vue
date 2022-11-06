<template>
    <Modal
        v-model="addModal"
        title="请选择管理对象"
        :styles="{width: '90%'}">
            <div class="postItem">
                <div class="spaceTitle">空间：{{this.spaceInfoName}}</div>
                <Row class="postInfo">
                    <Col span="12" class="postBor">
                        <div class="postTree">
                            <div class="treesear">
                                <Input v-model="searchObj" placeholder="搜索" style="width: 100%"></Input>
                            </div>
                            <div class="item">
                                <div id='allobjectEdit' class='ztree'></div>
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="taglist" style="padding-right: 0;">
                            <p>已选管理对象：</P>
                            <div class="clear"></div>
                            <ul style="height: 360px; overflow: auto;">
                                <li v-for="i in checkedData">
                                    {{ i.name }}
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="clear"></div>
            <div class="clear"></div>
            <div class="formbtns">
                <div class="item">
                    <Button type="ghost" @click="cancelSubmit('formInline')">取&emsp;消</Button>
                    <Button type="primary" @click="handleSubmit('formInline')">确&emsp;定</Button>
                </div>
            </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import SpaceInfoHttp from 'server/http/spaceinfo'
    import myObjectHttp from 'server/http/myObject'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/css/tree.css')
    require('static/css/post.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    require('static/css/transfer.css')
    export default {
        mixins: [ztreeSearch, ztree],
        data () {
            return {
                addModal: false,
                searchObj: '',
                search: '',
                ztreeMyObj: '',
                ztreeObj: '',
                treeData: [],
                checkedData: [],
                checkMyObjNode: [],
                spaceInfoName: '',
                space_id: '',
                myObjectSetting: {
                    treeId: 'object',
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
                },
                data: {}
            }
        },
        methods: {
            async open (spaceid) {
                this.space_id = spaceid
                await this.object()
                this.checkObject()
                this.checkedData = []
                this.addModal = true
            },
            // 获取对象
            object () {
                return new Promise((resolve, reject) => {
                    myObjectHttp.getAllObject().then((data) => {
                        this.myObjectData = data
                        this.ztreeMyObj = $.fn.zTree.init($('#allobjectEdit'), this.myObjectSetting, data)
                        resolve()
                    })
                })
            },
            // 选中对象
            checkObject () {
                SpaceInfoHttp.getSpaceObjectInfo(this.space_id).then((data) => {
                    this.spaceInfoName = data.spaceinfo
                    // 获取对象选中
                    for (let v of data.objectids) {
                        let node = this.ztreeMyObj.getNodeByParam('id', v)
                        node.checked = true
                    }
                    let firstLevelNodes = this.ztreeMyObj.getNodesByParam('level', 0)
                    for (let node of firstLevelNodes) {
                        node.checked = true
                        let childNodes = node.children
                        for (let child of childNodes) {
                            if (child.checked == false) {
                                node.checked = false
                                break
                            }
                        }
                    }
                    this.ztreeMyObj.refresh()
                    this.refreshCheckData()
                })
            },
            onCheck (event, treeId, treeNode) {
                this.ztreeOnCheck(this.ztreeMyObj, treeNode)
                this.refreshCheckData()
            },
            refreshCheckData () {
                let checkedNodes = this.ztreeMyObj.getNodesByParam('checked', true)
                this.checkedData = []
                for (let node of checkedNodes) {
                    // 当前节点是否半选
                    let halfchecked = this.isHalfChecked(node)
                    if (!halfchecked) {
                        this.checkedData.push({'id': node.id, 'name': node.name})
                    }
                }
            },
            // 取消
            cancelSubmit (formInline) {
                this.addModal = false
            },
            // 提交
            handleSubmit (formInline) {
                // 对象
                let objectCheckedNodes = this.ztreeMyObj.getNodesByParam('checked', true)
                let objectIds = []
                for (let node of objectCheckedNodes) {
                    if (node.pid) {
                        objectIds.push(node.id)
                    }
                }
                let objectStrIds = objectIds.join(',')
                SpaceInfoHttp.putSpaceObject({space_id: this.space_id, object_id: objectStrIds}).then(() => {
                    this.$Message.success('修改成功')
                    this.addModal = false
                    this.$parent.refresh()
                }).catch((error) => {
                    this.$Message.error(error)
                })
            }
        },
        watch: {
            searchObj (v) {
                this.ztreeSearch(this.ztreeMyObj, this.myObjectData, v)
            }
        }
    }
</script>
