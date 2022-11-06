<style>
.materialBasic{
    padding-top: 17px;
    padding-bottom: 0;
}
.materialBasic .inneritem {
   background-position-x: 41.72%;
}
.materialBasic .ivu-table-wrapper{
    border-top: 0px;
}
.materialBasic .ivu-table-wrapper.ivu-table-with-header{
    border-left: 1px solid #dddee1!important;
    left: 0px!important;
    width: 99.956%!important;
}
.materialBasic .ivu-table-wrapper.ivu-table-with-header .ivu-table{
    max-width: 99.8%!important;
}
.materialBasicItem .materialBasicSearch .ivu-icon.ivu-icon-search.ivu-input-icon.ivu-input-icon-normal{
    top:0px!important;
}
.materialBasicItem .search.ivu-input-wrapper.ivu-input-type{
    width: 89%;
}
.materialBasicItem #materialInfo{
    max-height: 600px;
}
</style>
<template>
    <div class="materialBasicItem">
        <div class="innerheader">
            物料基本配置
        </div>
        <div class="innercontent materialBasic" >
            <Row class="inneritem" id="getHeight">
                <Col span="10">
                <div class="inneritem-head">物料分类：</div>
                <Input class="materialBasicSearch" v-model="searchTreeNode" placeholder="请输入搜索内容" icon="search" style="width: 99%;margin:1px;margin-top: 9px" @on-change="searchNode()"></Input>
                <div id='materialInfo' class='ztree' style="overflow: auto;" ></div>
                </Col>
                <Col  span="14">
                <div class="inneritem-head border-none">物料名称：</div>
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
                    :url="url">
                </dataTableChoose>
                </Col>
            </Row>
        </div>
        <!--新增树节点-->
        <addTreeNode  ref="addTreeNode" @treeInt="treeInt"></addTreeNode>
        <addMaterialName ref="addMaterialItem" @tableInt="tableInt"></addMaterialName>
    </div>
</template>
<script>
    import $ from 'jquery'
    import MaterialHttp from 'server/http/materialBasic'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    import dataTableChoose from '@/components/dataTableChoose.vue'
    import resize from '@/mixins/resize'
    require('static/css/tree.css')
    import addTreeNode from './components/addTreeNode.vue'
    import addMaterialName from './components/addMaterialName.vue'
    import ztreeSearch from '@/mixins/ztreeSearch'
    export default {
        components: {
            dataTableChoose,
            addTreeNode,
            addMaterialName
        },
        mixins: [resize, ztree, ztreeSearch],
        created () {
            this.$emit('updateActive', '4-1')
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
//                        beforeClick: this.zTreeBeforeClick,
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
                        title: '物料名称',
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
                url: '/materiel/materiellist/',
                ifsearch: true,
                treeNode: {}
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
                this.$refs.addTreeNode.open('新建', node)
            },
            edit (node) {
                this.$refs.addTreeNode.open('修改', node)
            },
            // 删除节点
            remove (node) {
                MaterialHttp.checkremove(node.id).then((data) => {
                    if (data == 1) {
                        this.$Modal.warning({
                            title: '',
                            content: '该类别下存在库存，不能删除'
                        })
                    }
                    if (data == 0) {
                        this.$Modal.confirm({
                            title: '',
                            content: '删除物料类别后该类下所有物料也将清空，是否继续',
                            onOk: () => {
                                MaterialHttp.removeMaterialType(node.id).then((res) => {
                                    this.treeInt()
                                }).catch(() => {
                                    this.confirmDis = false
                                })
                            }
                        })
                    }
                })
            },
            // 删除列表内物料信息
            removeItem (id) {
                MaterialHttp.checkRemoveMaterialItem(id).then((data) => {
                    if (data == 1) {
                        this.$Modal.warning({
                            title: '',
                            content: '该类别下存在库存，不能删除'
                        })
                    }
                    if (data == 0) {
                        this.$Modal.confirm({
                            title: '',
                            content: '确定继续删除物料吗',
                            onOk: () => {
                                MaterialHttp.removeMaterialItem(id).then((res) => {
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
                if (!treeNode.parentTId) {
                    return false
                }
            },
            zTreeOnClick (event, treeId, treeNode) {
                if (treeNode.id == 0) {
                    return
                }
                $('.addButton').removeClass('disabled')
                this.treeNode = treeNode
                this.url = '/materiel/materiellist/' + this.treeNode.id
                this.$refs.datatable.changesize(10)
                this.$refs.datatable.list()
            },
            addHoverDom (treeId, treeNode) {
                let aObj = $('#' + treeNode.tId + '_a')
                if ($('#diyBtn_' + treeNode.id).length > 0) {
                    return
                }
                let addStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">新增</a>'
                let editStr = '<a class="diyBtnEdit" id="editdiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">修改</a>'
                let delStr = '<a class="diyBtnDel" id="DeldiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">删除</a>'
                // 一级节点只显示添加
                if (treeNode.level == 0) {
                    aObj.append(addStr)
                }
                // 二级节点显示编辑，删除
                if (treeNode.level !== 0) {
                    if ($('#' + treeNode.tId + ' a').hasClass('diyBtnEdit')) {
                        return
                    }
                    aObj.append(editStr)
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
                    $('#editdiyBtn_' + treeNode.id).unbind().remove()
                    $('#DeldiyBtn_' + treeNode.id).unbind().remove()
                }
            },
            // 新增，修改物料信息
            addItem (type, params) {
                if (!params) {
                    params = {}
                    params.id = this.treeNode.id
                }
                this.$refs.addMaterialItem.open(type, params)
            },
           // 初始树形图
            treeInt () {
                MaterialHttp.getclass().then((data) => {
                    this.ztreeObj = $.fn.zTree.init($('#materialInfo'), this.setting, data)

                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('tId', 'materialInfo_1'))

                    // 默认的打开详情
                    let node = this.ztreeObj.getNodeByParam('tId', 'materialInfo_2')
                    $('a#' + node.tId + '_a').click()
                })
                document.getElementById('materialInfo').style.minHeight = (document.body.clientHeight - 213) + 'px'
            },
            // 初始列表
            tableInt () {
                if (this.treeNode.id == 0) {
                    return
                }
                this.url = '/materiel/materiellist/' + this.treeNode.id
                this.$refs.datatable.list()
            },
            onResize () {
                document.getElementById('materialInfo').style.minHeight = (document.body.clientHeight - 213) + 'px'
            },
            searchNode () {
                var nodes = this.ztreeObj.transformToArray(this.ztreeObj.getNodes())
                this.ztreeSearch(this.ztreeObj, nodes, this.searchTreeNode)
            }
        }
    }
</script>
