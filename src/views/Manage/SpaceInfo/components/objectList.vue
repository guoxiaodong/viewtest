<style>
  .manageTable .search { width: 100%; }
  .manageTable { background: url(/static/images/ic_line.png) repeat-x 0 47px }
  .ManageSearch { height: 48px; border-bottom: 1px solid #CAD3DF; padding: 9px 20px 0; }
  .addManageBtn { margin: 9px 20px 0; }
</style>
<template>
    <div class="innercontent">
        <Row class="manageTitle">
            <Col span="12">空间信息</Col>
            <Col span="12">空间内管理对象</Col>
        </Row>
        <Row class="inneritem">
            <Col span="12">
                <div class="ManageSearch">
                    <Input v-model="searchObj" placeholder="请输入搜索内容" style="width: 100%"></Input>
                </div>
                <div id='cityinfo' class='ztree' style="max-height: 650px; overflow: auto;"></div>
            </Col>
            <Col span="12" class="manageTable">
                <dataTableInfo ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                    <div class="t-head-bottom" slot="buttons">
                        <Button type="primary" @click="eidtManageObject()">修改</Button>
                    </div>
                </dataTableInfo>
            </Col>
        </Row>
        <!--添加城市-->
        <addSpaceInfo ref="addSpaceInfo"></addSpaceInfo>
        <!--编辑城市-->
        <editSpaceInfo ref="editSpaceInfo"></editSpaceInfo>
        <!--删除城市-->
        <delSpaceInfo ref="delSpaceInfo"></delSpaceInfo>
        <!--修改空间管理对象-->
        <editmanageobject ref="editmanageobject"></editmanageobject>
        <!--删除空间管理对象-->
        <delspaceobject ref="delspaceobject"></delspaceobject>
    </div>
</template>
<script>
    import $ from 'jquery'
    import CommonHttp from 'server/http/common'
    import SpaceHttp from 'server/http/space'
    import SpaceInfoHttp from 'server/http/spaceinfo'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    require('static/css/tree.css')
    require('static/css/modal.css')
    require('static/css/datatable.css')
    import dataTableInfo from '@/components/dataTableInfo.vue'
    import addSpaceInfo from '../components/addSpaceInfo.vue'
    import editSpaceInfo from '../components/editSpaceInfo.vue'
    import delSpaceInfo from '../components/delSpaceInfo.vue'
    import editmanageobject from '../components/editmanageobject.vue'
    import delspaceobject from '../components/delspaceobject.vue'
    export default {
        created () {
            this.$emit('updateActiveName', '1')
        },
        components: {
            dataTableInfo, addSpaceInfo, editSpaceInfo, delSpaceInfo, editmanageobject, delspaceobject
        },
        mixins: [ ztreeSearch, ztree ],
        data () {
            return {
                secondWord: false,
                permodal: false,
                id: '',
                num: '',
                city: '',
                showTable: false,
                searchObj: '',
                ztreeObj: '',
                typeid: '',
                checkedData: [],
                allSpaceSetting: {
                    treeId: 'space',
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    check: {
                        enable: false,
                        chkboxwType: 'checkbox'
                    },
                    callback: {
                        onCheck: this.onCheck,
                        onClick: this.zTreeOnClick,
                        onCollapse: (event, treeId, treeNode) => {
                            this.zTreeOnCollapse(this.ztreeObj, treeNode)
                        },
                        beforeDrop: this.zTreeOnDrop
                    },
                    view: {
                        selectedMulti: false,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom
                    }
                },
                showinfo: true,
                spaceid: '',
                showinput: false,
                addrights: false,
                ifsearch: false,
                url: SpaceInfoHttp.map.getSpaceObjectList + '/0',
                columns: [
                    {
                        width: 100,
                        title: '对象大类'
                    },
                    {
                        title: '序号',
                        width: 70,
                        type: 'index'
                    },
                    {
                        title: '管理对象',
                        key: 'objectname'
                    },
                    {
                        title: '操作',
                        width: 80,
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeobject(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: []
            }
        },
        mounted () {
            CommonHttp.getConfig().then((data) => {
                this.num = JSON.parse(data['PLACE'].place_level).length
            })
            this.list()
        },
        methods: {
            list () {
                SpaceHttp.allSpace().then((data) => {
                    data = [{id: 0, name: '全部'}, ...data]
                    this.myObjectData = data
                    this.ztreeObj = $.fn.zTree.init($('#cityinfo'), this.allSpaceSetting, data)
                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0))
                    let node = this.ztreeObj.getNodeByParam('id', data[1].id)
                    let firstNode = this.getFirstTreeNode(node, this.ztreeObj, true)
                    $('a#' + firstNode.tId + '_a').click()
                })
            },
            // 新增
            addSpaceInfo (node) {
                this.$refs.addSpaceInfo.open(node)
            },
            // 编辑
            editSpaceInfo (node) {
                this.$refs.editSpaceInfo.open(node)
            },
            // 删除
            delSpaceInfo (node) {
                this.$refs.delSpaceInfo.open(node)
            },
            // 删除管理对象
            removeobject (id) {
                this.$refs.delspaceobject.open(this.spaceid, id)
            },
            // 编辑空间管理对象
            eidtManageObject () {
                this.$refs.editmanageobject.open(this.spaceid)
            },
            submit () {
                this.$refs.rightFrom.submit().then((res) => {
                    let node = this.ztreeObj.getNodeByParam('id', res.id)
                    node.name = res.name
                    node.identify = res.identify
                    this.ztreeObj.updateNode(node)
                })
            },
            delbatch () {
                let ids = this.checkedData.join(',')
                if (this.checkedData.length != 0) {
                    this.$refs.deleteMany.init(ids)
                } else {
                    this.$Message.error('请选择需要删除的权限')
                }
            },
            delCheckedNodes () {
                for (let id of this.checkedData) {
                    let node = this.ztreeObj.getNodeByParam('id', id)
                    this.ztreeObj.removeNode(node)
                }
                this.checkedData = []
            },
            zTreeOnClick (event, treeId, treeNode) {
                if (this.num) {
                    this.url = SpaceInfoHttp.map.getSpaceObjectList + '/' + treeNode.id
                    this.$refs.datatable.refresh(this.url)
                    this.spaceid = treeNode.id
                }
            },
            zTreeOnDrop (treeId, treeNodes, targetNode, moveType) {
                if (moveType == 'inner' && targetNode != null) {
                    SpaceInfoHttp.put({id: treeNodes[0].id, pid: targetNode.id})
                } else {
                    return false
                }
            },
            // 园区刷新
            delZoneNode (id) {
                let node = this.ztreeObj.getNodeByParam('id', id)
                this.ztreeObj.removeNode(node)
            },
            refZoneNode (res) {
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                node.name = res.name
                this.ztreeObj.updateNode(node)
            },
            addZoneNode (res) {
                let pNode = this.ztreeObj.getNodeByParam('id', res.fid)
                let newNode = {
                    id: res.id,
                    name: res.name
                }
                this.ztreeObj.addNodes(pNode, newNode)
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                $('a#' + node.tId + '_a').click()
            },
            // 楼宇刷新
            addBuildNode (res) {
                let pNode = this.ztreeObj.getNodeByParam('id', res.fid)
                let newNode = {
                    id: res.id,
                    name: res.name
                }
                this.ztreeObj.addNodes(pNode, newNode)
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                $('a#' + node.tId + '_a').click()
            },
            refBuildNode (res) {
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                node.name = res.name
                this.ztreeObj.updateNode(node)
            },
            delBuildNode (id) {
                let node = this.ztreeObj.getNodeByParam('id', id)
                this.ztreeObj.removeNode(node)
            },
            // 层刷新
            addTierNode (res) {
                let pNode = this.ztreeObj.getNodeByParam('id', res.fid)
                let newNode = {
                    id: res.id,
                    name: res.name
                }
                this.ztreeObj.addNodes(pNode, newNode)
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                $('a#' + node.tId + '_a').click()
            },
            refTierNode (res) {
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                node.name = res.name
                this.ztreeObj.updateNode(node)
            },
            delTierNode (id) {
                let node = this.ztreeObj.getNodeByParam('id', id)
                this.ztreeObj.removeNode(node)
            },
            // 空间刷新
            addSpaceNode (res) {
                let pNode = this.ztreeObj.getNodeByParam('id', res.fid)
                let newNode = {
                    id: res.id,
                    name: res.name
                }
                this.ztreeObj.addNodes(pNode, newNode)
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                $('a#' + node.tId + '_a').click()
            },
            refSpaceNode (res) {
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                node.name = res.name
                this.ztreeObj.updateNode(node)
            },
            delSpaceNode (id) {
                let node = this.ztreeObj.getNodeByParam('id', id)
                this.ztreeObj.removeNode(node)
            },
            // 鼠标滑动
            addHoverDom (treeId, treeNode) {
                let aObj = $('#' + treeNode.tId + '_a')
                if ($('#diyBtn_' + treeNode.id).length > 0) {
                    return
                }
                if (treeNode.level == 0) {
                    let addStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">新增</a>'
                    aObj.append(addStr)
                    let btn = $('#diyBtn_' + treeNode.id)
                    if (btn) {
                        btn.bind('click', () => {
                            this.addSpaceInfo(treeNode)
                        })
                    }
                } else {
                    let addStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">新增</a>'
                    let editStr = '<a class="diyBtnEdit" id="editdiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">编辑</a>'
                    let delStr = '<a class="diyBtnDel" id="deldiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">删除</a>'
                    aObj.append(addStr)
                    aObj.append(editStr)
                    aObj.append(delStr)
                    let btn = $('#diyBtn_' + treeNode.id)
                    let editbtn = $('#editdiyBtn_' + treeNode.id)
                    let delBtn = $('#deldiyBtn_' + treeNode.id)
                    if (btn) {
                        btn.bind('click', () => {
                            this.addSpaceInfo(treeNode)
                        })
                    }
                    if (editbtn) {
                        editbtn.bind('click', () => {
                            this.editSpaceInfo(treeNode)
                        })
                    }
                    if (delBtn) {
                        delBtn.bind('click', () => {
                            this.delSpaceInfo(treeNode)
                        })
                    }
                }
            },
            onCheck (event, treeId, treeNode) {
                let checkedNodes = this.ztreeObj.getCheckedNodes(true)
                this.checkedData = []
                for (let node of checkedNodes) {
                    // 当前节点是否半选
                    let halfchecked = this.isHalfChecked(node)
                    if (!halfchecked) {
                        this.checkedData.push(node.id)
                    }
                }
            },
            removeHoverDom (treeId, treeNode) {
                $('#diyBtn_' + treeNode.id).unbind().remove()
                $('#editdiyBtn_' + treeNode.id).unbind().remove()
                $('#deldiyBtn_' + treeNode.id).unbind().remove()
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        },
        watch: {
            searchObj (v) {
                this.ztreeSearch(this.ztreeObj, this.myObjectData, v)
            }
        }
    }
</script>
