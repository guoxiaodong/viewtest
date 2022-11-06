<style>
    .supplierCatalog{
        padding-top: 17px;
        padding-bottom: 0;
    }
    .supplierCatalog .inneritem {
        background-position-x: 41.72%;
    }
    .supplierCatalog .ivu-table-wrapper{
        border-top: 0px;
    }
    .supplierCatalog .ivu-table-wrapper.ivu-table-with-header{
        border-left: 1px solid #dddee1!important;
        left: 0px!important;
        width: 99.956%!important;
    }
    .supplierCatalog .ivu-table-wrapper.ivu-table-with-header .ivu-table{
        max-width: 99.8%!important;
    }
    .supplierCatalog .supplierCatalogSearch .ivu-icon.ivu-icon-search.ivu-input-icon.ivu-input-icon-normal{
        top:0px!important;
    }
    .supplierCatalog .search.ivu-input-wrapper.ivu-input-type{
        width: 89%;
    }
    .supplierCatalog .edit{
        float:right;
        margin: 10px 25px;
    }
    .supplierCatalog .supplierCatalog-title
    {
        margin-left: 25px;
    }
    .supplierCatalog .supplierCatalog-title p{
        margin:5px 0;
    }
    .supplierCatalog .supplierCatalog-name{
        margin-left: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .supplierCatalog .supplierCatalog-intro{
        margin-left: 25px;
    }
    .addtreeNode{
        margin:10px;
    }
    .detail-title{
        font-size: 30px;
        font-weight: bold;
    }
    .addtreeNode .ivu-form-item{
        margin-bottom: 5px;
    }
</style>
<template>
    <div class="supplierCatalog">
        <div class="innerheader">
            服务目录管理
        </div>
        <div class="innercontent materialBasic" >
            <Row class="inneritem" >
                <Col span="10">
                <Input class="supplierCatalogSearch" v-model="searchTreeNode" placeholder="请输入搜索内容" icon="search" style="width: 98%;margin:4px;" @on-change="searchNode()"></Input>
                <div id='serviceCata' class='ztree' style="overflow: auto;" ></div>
                </Col>
                <Col  span="14" style="padding: 10px">
                <div class="supplierCatalog-title">
                    <div><span v-if="editstatus == true" class="detail-title">{{detail.name}}</span>
                        <Input v-if="editstatus == false" v-model="editName" placeholder="请输入" :maxlength="40" style="width: 300px"></Input>
                    <Button v-if="editstatus == true" class="edit" type="primary" style="" @click="edit()">编辑</Button>
                    <Button v-if="editstatus == false" class="edit" type="primary" style="" @click="save()">保存</Button></div>
                <p><Icon type="clock"></Icon>{{detail.time}}</p>
                </div>
                <hr/>
                <div class="supplierCatalog-name">
                    <p >服务分类编号： {{detail.no}}</p>
                    <p v-if="detail.type == 2">服务组分类名称： {{detail.className}}</p>
                    <p v-if="detail.type == 3">服务组名称： {{detail.className}}</p>
                    <p v-if="detail.num">服务数量： {{detail.num}}</p>
                </div>
                <p v-if="editstatus == true" class="supplierCatalog-intro">{{detail.intro}}</p>
                <p v-if="editstatus == false" class="supplierCatalog-intro">
                <Input v-model="editIntro" :maxlength="800" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
                </p>
                </Col>
            </Row>
        </div>
        <Modal
            v-model="addTreeNode"
            :title = addTitle>
            <div class="addtreeNode">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
            <p style="margin: 0 0 10px 10px;font-size: 13px;">编号：<span>{{addnumber}}</span></p>
            <p v-if="addtype == 1" style="margin: 0 0 10px 10px;font-size: 13px;">所属服务组分类：<span>{{addNodeClass}}</span></p>
                <FormItem label="分类名称：" prop="addClassName" class="needRequired">
                <Input v-model="formValidate.addClassName" :maxlength="40" placeholder="请输入" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="简介：" prop="addIntro">
                    <Input v-model="formValidate.addIntro" type="textarea" :maxlength="800" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
                </FormItem>
            </Form>
            </div>
            <div slot="footer">
                <Button type="ghost" @click="cancel">取&emsp;消</Button>
                <Button type="primary" @click="ok('formValidate')" >确&emsp;定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import $ from 'jquery'
    import ServiceHttp from 'server/http/service'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    import resize from '@/mixins/resize'
    require('static/css/tree.css')
    import ztreeSearch from '@/mixins/ztreeSearch'
    export default {
        components: {},
        mixins: [resize, ztree, ztreeSearch],
        created () {
            this.$emit('updateActive', '7-2')
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    if (this.addtype == 0) {
                        callback(new Error('服务组分类名为必填项'))
                    }
                    if (this.addtype == 1) {
                        callback(new Error('服务组名为必填项'))
                    }
                } else {
                    if (this.addtype == 0) {
                        var data = {
                            name: this.formValidate.addClassName,
                            type: 2
                        }
                        ServiceHttp.checkCataname(data).then((data) => {
                            if (data == 0) {
                                callback()
                            } else if (data == 1 && this.addtype == 0) {
                                callback(new Error('服务组分类名已存在'))
                            }
                        })
                    } else if (this.addtype == 1) {
                        data = {
                            name: this.formValidate.addClassName
                        }
                        ServiceHttp.checkGroup(this.treeNode.id, data).then((data) => {
                            if (data == 0) {
                                callback()
                            } else if (data == 1 && this.addtype == 1) {
                                callback(new Error('服务组名已存在'))
                            }
                        })
                    }
                }
            }
            return {
                ruleValidate: {
                    addClassName: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    addIntro: [
                        { required: true, message: '简介为必填项', trigger: 'blur' }
                    ]
                },
                searchTreeNode: '',
                ztreeObj: '',
                setting: {
                    treeId: 'func',
                    data: {
                        key: {
                            children: 'service'
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
                            isMove: true,
                            prev: false,
                            next: false
                        },
                        enable: true,
                        showRenameBtn: false
                    },
                    callback: {
                        beforeClick: this.zTreeBeforeClick,
                        onClick: this.zTreeOnClick,
                        beforeDrop: this.zTreeBeforeDrop
                    },
                    view: {
                        selectedMulti: false,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom
                    }
                },
                treeNode: {},
                addTreeNode: false, // 新增节点
                addTitle: '',
                addnumber: '',
                formValidate: {
                    addClassName: '',
                    addIntro: ''
                },
                addNodeClass: '',
                addtype: 0, // 新增节点
                detail: {
                    name: ''
                },
                editstatus: true,
                editName: '',
                editIntro: ''
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
                if (node.level == 0) {
                    this.addnumber = 'EPSTT' + new Date().getTime() + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
                    this.addTitle = '新增服务组分类'
                    this.addtype = 0
                } else {
                    this.addnumber = 'EPST' + new Date().getTime() + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
                    this.addTitle = '新增服务组'
                    this.addNodeClass = node.name
                    this.addtype = 1
                }
                this.addTreeNode = true
            },
            edit () {
                this.editName = this.detail.name
                this.editIntro = this.detail.intro
                this.editstatus = false
            },
            save () {
                var data = {
                    name: this.editName,
                    intro: this.editIntro,
                    type: this.treeNode.level
                }
                ServiceHttp.cataDetailModify(this.treeNode.id, data).then((data) => {
                    this.treeInt(this.editName)
                    this.editstatus = true
                })
            },
            ok (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.addtype == 0) {
                            var data = {
                                no: this.formValidate.addTitle,
                                name: this.formValidate.addClassName,
                                intro: this.formValidate.addIntro
                            }
                            ServiceHttp.addServiceClass(data).then((data) => {
                                this.addTreeNode = false
                                this.$Message.success('添加成功')
                                this.treeInt(this.formValidate.addClassName)
                            })
                        }
                        if (this.addtype == 1) {
                            data = {
                                no: this.formValidate.addTitle,
                                name: this.formValidate.addClassName,
                                intro: this.formValidate.addIntro,
                                fid: this.treeNode.id
                            }
                            ServiceHttp.addServiceGroup(data).then((data) => {
                                this.addTreeNode = false
                                this.$Message.success('添加成功')
                                this.treeInt(this.formValidate.addClassName)
                            })
                        }
                    }
                })
            },
            cancel () {
                this.addTreeNode = false
            },
            // 删除节点
            remove (node) {
                if (node.level == 1) {
                    var data = {
                        id: node.id
                    }
                    ServiceHttp.supplierremoveCheck(data).then((data) => {
                        if (data == 1) {
                            this.$Modal.confirm({
                                title: '',
                                content: '该服务组分类下存在服务组项，不能删除',
                                onOk: () => {
                                }
                            })
                        }
                        if (data == 0) {
                            this.$Modal.confirm({
                                title: '',
                                content: '确定删除操作吗？',
                                onOk: () => {
                                    var data = {
                                        id: node.id
                                    }
                                    ServiceHttp.removeCataClass(data).then((data) => {
                                        this.$Message.success('删除成功')
                                        this.treeInt()
                                    })
                                }
                            })
                        }
                    })
                }
                if (node.level == 2) {
                    data = {
                        id: node.id
                    }
                    ServiceHttp.cataRemoveCheck(data).then((data) => {
                        if (data == 1) {
                            this.$Modal.confirm({
                                title: '',
                                content: '该服务组下存在服务项，不能删除',
                                onOk: () => {
                                }
                            })
                        }
                        if (data == 0) {
                            this.$Modal.confirm({
                                title: '',
                                content: '确定删除操作吗？',
                                onOk: () => {
                                    var data = {
                                        id: node.id
                                    }
                                    ServiceHttp.removeCataGroup(data).then((data) => {
                                        this.$Message.success('删除成功')
                                        this.treeInt()
                                    })
                                }
                            })
                        }
                    })
                }
            },
            zTreeBeforeClick (treeId, treeNode, clickFlag) {
                if (treeNode.level == 0) {
                    return false
                }
                console.log(treeNode)
            },
            zTreeOnClick (event, treeId, treeNode) {
                if (treeNode.level == 0) {
                    return false
                }
                this.treeNode = treeNode
                this.show(treeNode)
            },
            zTreeBeforeDrop (treeId, treeNodes, targetNode, moveType) {
                if (treeNodes[0].level != 3 || targetNode.level != 2) {
                    return false
                }
                var data = {
                    service_id: treeNodes[0].id,
                    type_id: targetNode.id
                }
                ServiceHttp.changeNode(data).then((data) => {
                    this.treeInt(treeNodes[0].name)
                })
            },
            addHoverDom (treeId, treeNode) {
                let aObj = $('#' + treeNode.tId + '_a')
                if ($('#diyBtn_' + treeNode.id).length > 0) {
                    return
                }
                let addStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">新增</a>'
                let delStr = '<a class="diyBtnDel" id="DeldiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">删除</a>'
                // 父级节点显示添加，删除。子级节点显示删除
                if (treeNode.level == 0) {
                    aObj.append(addStr)
                } else if (treeNode.level == 1) {
                    if ($('a#' + treeNode.tId + ' a').hasClass('diyBtnAdd')) {
                        return
                    } else {
                        aObj.append(addStr)
                        aObj.append(delStr)
                    }
                } else if (treeNode.level == 2) {
                    if ($('#' + treeNode.tId + ' a').hasClass('diyBtnDel')) {
                        return
                    } else {
                        aObj.append(delStr)
                    }
                } else if (treeNode.level == 3) {
                }
                let btn = $('#diyBtn_' + treeNode.id)
                let delbtn = $('#DeldiyBtn_' + treeNode.id)
                if (btn) {
                    btn.bind('click', () => {
                        this.add(treeNode)
                    })
                }
                if (delbtn) {
                    delbtn.bind('click', () => {
                        this.remove(treeNode)
                    })
                }
            },
            removeHoverDom (treeId, treeNode) {
                // 父级节点显示添加，删除。子级节点显示删除
                if (treeNode.level == 0) {
                    $('#diyBtn_' + treeNode.id).unbind().remove()
                } else if (treeNode.level == 1 || treeNode.level == 2) {
                    $('#DeldiyBtn_' + treeNode.id).unbind().remove()
                    $('#diyBtn_' + treeNode.id).unbind().remove()
                } else if (treeNode.level == 3) {
                }
            },
            // 初始树形图
            treeInt (name = null) {
                ServiceHttp.supplierCata().then((data) => {
                    this.ztreeObj = $.fn.zTree.init($('#serviceCata'), this.setting, data)
                    var node = this.ztreeObj.getNodeByParam('tId', 'serviceCata_1')
                    if (node) {
                        this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('tId', 'serviceCata_1'))
                    }
                    // 默认的打开详情
                    if (!name) {
                        let node = this.ztreeObj.getNodeByParam('tId', 'serviceCata_2')
                        $('a#' + node.tId + '_a').click()
                    } else {
                        let node = this.ztreeObj.getNodeByParam('name', name)
                        this.ztreeObj.selectNode(node, true)
                        this.ztreeObj.expandNode(node, true, false)
                        $('a#' + node.tId + '_a').click()
                    }
                })
                document.getElementById('serviceCata').style.height = (document.body.clientHeight - 213) + 'px'
            },
            onResize () {
                document.getElementById('serviceCata').style.height = (document.body.clientHeight - 213) + 'px'
            },
            searchNode () {
                var nodes = this.ztreeObj.transformToArray(this.ztreeObj.getNodes())
                this.ztreeSearch(this.ztreeObj, nodes, this.searchTreeNode)
            },
            show (node) {
                var data = {
                    type: node.level
                }
                ServiceHttp.cataDetail(node.id, data).then((data) => {
                    if (node.level == 1 || node.level == 2) {
                        this.detail.name = data.name
                    } else if (node.level == 3) {
                        this.detail.name = data.title
                    }
                    this.detail.num = data.servicenumber || null
                    this.detail.no = data.no
                    this.detail.intro = data.intro
                    this.detail.time = data.updated_at
                    this.detail.className = data.servicetype || null
                    this.detail.type = node.level
                })
            }
        },
        watch: {
            addTreeNode (v) {
                if (v === false) {
                    this.$refs.formValidate.resetFields()
                }
            }
        }
    }
</script>
