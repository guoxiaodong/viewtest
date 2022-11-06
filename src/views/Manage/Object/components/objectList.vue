<style>
  .manageTable .search { width: 100%; }
  .manageTable { background: url(/static/images/ic_line.png) repeat-x 0 47px }
  .ManageSearch { height: 48px; border-bottom: 1px solid #CAD3DF; padding: 9px 20px 0; }
  .addManageBtn { margin: 9px 20px 0; }
</style>
<template>
    <div class="innercontent">
        <Row class="manageTitle">
            <Col span="12">对象大类</Col>
            <Col span="12">管理对象</Col>
        </Row>
        <Row class="inneritem">
            <Col span="12">
                <div class="ManageSearch">
                    <Input v-model="searchObj" placeholder="请输入搜索内容" style="width: 100%"></Input>
                </div>
                <Button type="primary" @click="addmanage()" class="addManageBtn">新增</Button>
                <div id='manageobject' class='ztree' style="max-height: 600px; overflow: auto;"></div>
            </Col>
            <Col span="12" class="manageTable">
                <dataTable :height="height" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                    <div class="t-head-bottom" slot="buttons">
                        <Button type="primary" @click="addobject()">新增</Button>
                    </div>
                </dataTable>
            </Col>
        </Row>
        <!--对象大类增加-->
        <addmanage ref="addmanage"></addmanage>
        <!--删除对象大类-->
        <delmanage ref="delmanage"></delmanage>
        <!--编辑对象大类-->
        <editmanage ref="editmanage"></editmanage>
        <!--添加管理对象-->
        <addobject ref="addobject"></addobject>
        <!--编辑管理对象-->
        <editobject ref="editobject"></editobject>
        <!--删除管理对象-->
        <delobject ref="delobject"></delobject>
    </div>
</template>
<script>
    import $ from 'jquery'
    import ManageObjectHttp from 'server/http/manageobject'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    require('static/css/tree.css')
    require('static/css/modal.css')
    require('static/css/datatable.css')
    import dataTable from '@/components/dataTable.vue'
    import addmanage from '../components/addmanage.vue'
    import delmanage from '../components/delmanage.vue'
    import editmanage from '../components/editmanage.vue'
    import addobject from '../components/addobject.vue'
    import editobject from '../components/editobject.vue'
    import delobject from '../components/delobject.vue'
    export default {
        created () {
            this.$emit('updateActiveName', '1')
        },
        components: {
            dataTable, addmanage, delmanage, editmanage, addobject, editobject, delobject
        },
        mixins: [ ztreeSearch, ztree ],
        data () {
            return {
                secondWord: false,
                permodal: false,
                id: '',
                searchObj: '',
                ztreeObj: '',
                typeid: '',
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
                        enable: false,
                        chkboxType: { 'Y': 's', 'N': 'ps' },
                        chkboxwType: 'checkbox'
                    },
                    edit: {
                        enable: true,
                        showRenameBtn: false,
                        showRemoveBtn: false
                    },
                    callback: {
                        onCheck: this.onCheck,
                        onClick: this.zTreeOnClick,
                        beforeDrop: this.zTreeOnDrop
                    },
                    view: {
                        selectedMulti: false,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom
                    }
                },
                showinfo: true,
                showinput: false,
                addrights: false,
                ifsearch: false,
                url: '',
                page: 1,
                pageSize: 10,
                height: '620',
                columns: [
                    {
                        title: '序号',
                        width: 120,
                        type: 'index'
                    },
                    {
                        title: '管理对象',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        width: 120,
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        color: '#3399FF',
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editobject(params.row.id)
                                        }
                                    }
                                }, '编辑'),
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
            this.list()
        },
        methods: {
            list () {
                ManageObjectHttp.getAll().then((data) => {
                    this.manageData = data
                    this.ztreeObj = $.fn.zTree.init($('#manageobject'), this.setting, data)
                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0))
                    let nodes = this.ztreeObj.getNodesByParam('level', 0)
                    $('a#' + nodes[0].tId + '_a').click()
                })
            },
            // 新增对象大类
            addmanage () {
                this.$refs.addmanage.open()
            },
            // 编辑对象大类
            editManage (id) {
                this.$refs.editmanage.open(id)
            },
            // 删除对象大类
            deldep (id) {
                this.$refs.delmanage.open(id)
            },
            // 添加管理对象
            addobject () {
                this.$refs.addobject.open(this.typeid)
            },
            // 编辑管理对象
            editobject (id) {
                this.$refs.editobject.open(this.typeid, id)
            },
            // 删除管理对象
            removeobject (id) {
                this.$refs.delobject.open(id)
            },
            delCheckedNodes () {
                for (let id of this.checkedData) {
                    if (id == this.id) {
                        let nodes = this.ztreeObj.getNodesByParam('level', 1)
                        $('a#' + nodes[0].Id + '_a').click()
                    }
                    let node = this.ztreeObj.getNodeByParam('id', id)
                    this.ztreeObj.removeNode(node)
                }
                this.checkedData = []
            },
            addNode (res) {
                console.log(res)
                let pNode = this.ztreeObj.getNodeByParam('id', 'manageobject_' + res.id)
                console.log(pNode)
                let newNode = {
                    id: res.id,
                    name: res.name
                }
                this.ztreeObj.addNodes(pNode, newNode)
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                console.log(node)
                $('a#' + node.tId + '_a').click()
            },
            editNode (res) {
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                node.name = res.name
                this.ztreeObj.updateNode(node)
            },
            delNode (id) {
                let node = this.ztreeObj.getNodeByParam('id', id)
                console.log(node)
                this.ztreeObj.removeNode(node)
            },
            // ztree点击
            zTreeOnClick (event, treeId, treeNode) {
                this.url = ManageObjectHttp.map.getManageList + '/' + treeNode.id
                this.$refs.datatable.refresh(this.url)
                this.typeid = treeNode.id
            },
            addHoverDom (treeId, treeNode) {
                let aObj = $('#' + treeNode.tId + '_a')
                if ($('#diyBtn_' + treeNode.id).length > 0) {
                    return
                }
                let editStredit = '<a class="diyBtnEdit" id="editdiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">修改</a>'
                let delStr = '<a class="diyBtnDel" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">删除</a>'
                aObj.append(editStredit)
                aObj.append(delStr)
                let btn = $('#diyBtn_' + treeNode.id)
                let editbtn = $('#editdiyBtn_' + treeNode.id)
                if (editbtn) {
                    editbtn.bind('click', () => {
                        this.editManage(treeNode)
                    })
                }
                if (btn) {
                    btn.bind('click', () => {
                        this.deldep(treeNode)
                    })
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
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            },
            setDataTablePage (page, pageSize) {
                this.page = page
                this.pageSize = pageSize
            },
            research () {
                this.searchObj = ''
            }
        },
        watch: {
            searchObj (v) {
                this.ztreeSearch(this.ztreeObj, this.manageData, v)
            }
        }
    }
</script>
