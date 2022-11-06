<style>
    .assetBasic{
        padding-top: 17px;
        padding-bottom: 0;
    }
    .assetBasic .inneritem {
        background-position-x: 41.72%;
    }
    .assetBasic .ivu-table-wrapper{
        border-top: 0px;
    }
    .assetBasic .ivu-table-wrapper.ivu-table-with-header{
        border-left: 1px solid #dddee1!important;
        left: 0px!important;
        width: 99.956%!important;
    }
    .assetBasic .ivu-table-wrapper.ivu-table-with-header .ivu-table{
        max-width: 99.8%!important;
    }
    .assetManage .assetBasicSearch .ivu-icon.ivu-icon-search.ivu-input-icon.ivu-input-icon-normal{
        top:0px!important;
    }
    .assetManage .search.ivu-input-wrapper.ivu-input-type{
        width: 89%;
    }
    .assetManage #assetInfo{
        max-height: 600px;
    }
</style>
<template>
    <div class="assetManage">
        <div class="innerheader">
            资产目录管理
        </div>
        <div class="innercontent assetBasic" >
            <Row class="inneritem" >
                <Col span="10">
                <div class="inneritem-head">资产分类：</div>
                <Input class="assetBasicSearch" v-model="searchTreeNode" placeholder="请输入搜索内容" icon="search" style="width: 99%;margin:1px;margin-top: 9px" @on-change="searchNode()"></Input>
                <div id='assetInfo' class='ztree' style="overflow: auto;" ></div>
                </Col>
                <Col  span="14">
                <div class="inneritem-head border-none">资产规格分类：</div>
                <Button class="disabled addButton" type="primary" style="position: absolute;top: 48px;left: 3px;z-index: 999;" @click="addItem('新增')">新增</Button>
                <dataTableChoose
                    ref="datatable"
                    :columns="columns"
                    :data="data"
                    dataname="data"
                    :ifsearch="ifsearch"
                    :choosetime="choosetime"
                    :treeNode="treeNode"
                    :int="false"
                    :id="id"
                    :url="url">
                </dataTableChoose>
                </Col>
            </Row>
        </div>
        <!--新增树节点-->
        <addTreeNode  ref="addAssetName" @treeInt="treeInt"></addTreeNode>
        <addAssetName ref="addAssetItem" @tableInt="tableInt"></addAssetName>
    </div>
</template>
<script>
    import $ from 'jquery'
    import AssetHttp from 'server/http/assetManage'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    import dataTableChoose from '@/components/dataTableChoose.vue'
    import resize from '@/mixins/resize'
    require('static/css/tree.css')
    import addTreeNode from './components/addTreeNode.vue'
    import addAssetName from './components/addAssetName.vue'
    import ztreeSearch from '@/mixins/ztreeSearch'
    export default {
        components: {
            dataTableChoose,
            addTreeNode,
            addAssetName
        },
        mixins: [resize, ztree, ztreeSearch],
        created () {
            this.$emit('updateActive', '9-2')
        },
        data () {
            return {
                searchTreeNode: '',
                ztreeObj: '',
                checkedData: [],
                choosetime: false,
                setting: {
                    treeId: 'func',
                    data: {
                        key: {
                            children: 'objects'
                        }
                    },
                    check: {
                        enable: false,
                        chkboxType: { 'Y': 's', 'N': 'ps' },
                        chkboxwType: 'checkbox'
                    },
                    edit: {
                        drag: {
                            isCopy: false,
                            isMove: false,
                            prev: false,
                            next: false
                        },
                        enable: true,
                        showRenameBtn: false
                    },
                    callback: {
                        beforeClick: this.zTreeBeforeClick,
                        onClick: this.zTreeOnClick
                    },
                    view: {
                        selectedMulti: false,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom
                    }
                },
                columns: [
                    {
                        title: '序号',
                        key: 'pid',
                        align: 'center'
                    },
                    {
                        title: '资产名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        align: 'center',
                        key: 'specification'
                    },
                    {
                        title: '品牌',
                        align: 'center',
                        key: 'brand'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        color: 'rgb(51, 153, 255)',
                                        marginRight: '10px',
                                        marginLeft: '-10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.addItem('修改', params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeItem(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: [],
                url: AssetHttp.map.assetList,
                ifsearch: true,
                treeNode: {},
                id: ''
            }
        },
        mounted () {
            this.treeInt()
        },
        methods: {
            /**
             * 打开新增节点窗口
             */
            add (node) {
                this.$refs.addAssetName.open('新建', node)
            },
            edit (node) {
                this.$refs.addAssetName.open('修改', node)
            },
            // 删除节点
            remove (node) {
                var data = {
                    object_id: node.id
                }
                AssetHttp.checkremove(data).then((data) => {
                    if (data == 1) {
                        this.$Modal.warning({
                            title: '',
                            content: '该类别下存在资产，不能删除'
                        })
                    }
                    if (data == 0) {
                        this.$Modal.confirm({
                            title: '',
                            content: '删除资产类别后该类下所有资产也将清空，是否继续',
                            onOk: () => {
//                                var data2 = {
//                                    object_id: node.id
//                                }
                                AssetHttp.removeAssetType(node.id).then((res) => {
                                    this.treeInt()
                                }).catch(() => {
                                    this.confirmDis = false
                                })
                            }
                        })
                    }
                })
            },
            // 删除列表内资产信息
            removeItem (id) {
                AssetHttp.checkRemoveAssetItem(id).then((data) => {
                    if (data == 1) {
                        this.$Modal.warning({
                            title: '',
                            content: '该类别下存在资产，不能删除'
                        })
                    }
                    if (data == 0) {
                        this.$Modal.confirm({
                            title: '',
                            content: '确定继续删除资产吗',
                            onOk: () => {
                                AssetHttp.removeAssetItem(id).then((res) => {
                                    this.$refs.datatable.refresh(this.url)
                                }).catch(() => {
                                    this.confirmDis = false
                                })
                            }
                        })
                    }
                })
            },
            zTreeBeforeClick (treeId, treeNode, clickFlag) {
                console.log(treeNode)
                if (!treeNode.parentTId) {
                    return false
                }
            },
            zTreeOnClick (event, treeId, treeNode) {
                if (treeNode.id == 0) {
                    return
                }
                this.id = '&id=' + treeNode.id
                $('.addButton').removeClass('disabled')
                this.treeNode = treeNode
                this.$refs.datatable.changesize(10)
                this.$refs.datatable.list()
            },
            addHoverDom (treeId, treeNode) {
                let aObj = $('#' + treeNode.tId + '_a')
                if ($('#diyBtn_' + treeNode.id).length > 0) {
                    return
                }
                let addStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">新增</a>'
//                let editStr = '<a class="diyBtnEdit" id="editdiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">修改</a>'  暂时没有修改功能接口
                let delStr = '<a class="diyBtnDel" id="DeldiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">删除</a>'
                // 一级节点只显示添加
                if (treeNode.level == 0) {
                    aObj.append(addStr)
                }
                // 二级节点显示编辑，删除
                if (treeNode.level !== 0) {
                    if ($('#' + treeNode.tId + ' a').hasClass('diyBtnDel')) {
                        return
                    }
//                    aObj.append(editStr)   暂时没有修改功能接口
                    aObj.append(delStr)
                }
                let btn = $('#diyBtn_' + treeNode.id)
                let editbtn = $('#editdiyBtn_' + treeNode.id)
                let delbtn = $('#DeldiyBtn_' + treeNode.id)
                if (btn) {
                    btn.bind('click', () => {
                        this.add(treeNode)
                    })
                }
                if (editbtn) {
                    editbtn.bind('click', () => {
                        this.edit(treeNode)
                    })
                }
                if (delbtn) {
                    delbtn.bind('click', () => {
                        this.remove(treeNode)
                    })
                }
            },
            removeHoverDom (treeId, treeNode) {
                // 一级节点只显示添加
                if (treeNode.level == 0) {
                    $('#diyBtn_' + treeNode.id).unbind().remove()
                }
                // 二级节点显示编辑，删除
                if (treeNode.level !== 0) {
//                    $('#editdiyBtn_' + treeNode.id).unbind().remove() 暂时没有修改功能接口
                    $('#DeldiyBtn_' + treeNode.id).unbind().remove()
                }
            },
            // 新增，修改资产信息
            addItem (type, params) {
                if (!params) {
                    params = {}
                    params.id = this.treeNode.id
                }
                this.$refs.addAssetItem.open(type, params)
            },
            // 初始树形图
            treeInt () {
                AssetHttp.getclass().then((data) => {
                    this.ztreeObj = $.fn.zTree.init($('#assetInfo'), this.setting, data)

                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('tId', 'assetInfo_1'))

                    // 默认的打开详情
                    let node = this.ztreeObj.getNodeByParam('tId', 'assetInfo_2')
                    $('a#' + node.tId + '_a').click()
                })
                document.getElementById('assetInfo').style.minHeight = (document.body.clientHeight - 213) + 'px'
            },
            // 初始列表
            tableInt () {
                if (this.treeNode.id == 0) {
                    return
                }
                this.$refs.datatable.refresh(this.url)
            },
            onResize () {
                document.getElementById('assetInfo').style.minHeight = (document.body.clientHeight - 213) + 'px'
            },
            searchNode () {
                var nodes = this.ztreeObj.transformToArray(this.ztreeObj.getNodes())
                this.ztreeSearch(this.ztreeObj, nodes, this.searchTreeNode)
            }
        }
    }
</script>
