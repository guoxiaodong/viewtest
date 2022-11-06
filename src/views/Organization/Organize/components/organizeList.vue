<style>
    .editInput {
        display: inline-block;
        height: 18px;
        width: 18px;
        background-image: url(/static/images/ic_edit.png);
        background-position:  center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-indent: -9999px;
        float: left;
        margin-top: 8px;
        margin-left: 5px;
    }
    .storeInput {
        display: inline-block;
        height: 18px;
        width: 18px;
        background-image: url(/static/images/ic_save.png);
        background-position:  center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-indent: -9999px;
        float: left;
        margin-top: 8px;
        margin-left: 5px;
    }
</style>

<template>
    <div>
        <div style="position: absolute; top: 52px; z-index: 999; right: 40px;">
            <selectSupplier ref="selectSupplier" @supplierChange="supplierChange"></selectSupplier>
        </div>
        <div class="innerbtns">
            <Row>
                <Col span="12">
                    <Button type="ghost" @click="delbatch()">批量删除</Button>
                </Col>
                <Col span="12">
                    <Button type="primary" @click="addper()">新增人员</Button>
                    <!--
                    <Select v-model="supplier_id" filterable @on-change="supplierChange" style="width: 300px">
                        <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    -->
                </Col>
            </Row>
        </div>
        <div class="innercontent">
            <Row class="inneritem">
                <Col span="12">
                    <div class="inneritem-head">组织机构列表：</div>
                    <div id='groups' class='ztree fixtree' style="overflow: auto;"></div>
                </Col>
                <Col span="12">
                    <div class="inneritem-head">部门信息：</div>
                    <div id="fixinfo" class="fixtree">
                        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="110" style="margin-top: 10px;">
                            <FormItem label="主要职责：" v-show="showinfo">
                                <p>
                                    <span style="float:left;">{{this.description}}</span>
                                    <a @click="edit()" class="editInput">编辑</a>
                                </P>
                            </FormItem>
                            <div v-show="showinput">
                                <FormItem label="主要职责：" prop="description">
                                    <Input v-model="description" placeholder="请输入" style="width: 90%;" ></Input>
                                    <a @click="store()" style="float: right;" class="storeInput">保存</a>
                                </FormItem>
                            </div>
                            <FormItem ref='ss' prop="main" label="主要负责人：">
                                <Select v-model="formInline.main" >
                                    <Option v-for="item in mainList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem prop="second" label="次要负责人：">
                                <Select v-model="formInline.second" filterable multiple @on-change="secondChange">
                                    <Option v-for="item in secondList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem prop="label" label="职能标签：">
                                <Select v-model="formInline.label" filterable multiple>
                                    <Option v-for="item in labelList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <div v-if='secondWord' style="font-size: 12px; padding-left: 110px; color: #FF5650;">人员排序会影响工单派发或退回等的处理顺序</div>
                            <div style="margin-top: 20px;">
                                <div class="inneritem-head" style="border: none; height: 20px; line-height: 20px;">人员列表：</div>
                                <dataTable
                                    ref="datatable"
                                    :columns="columns"
                                    :data="data"
                                    dataname="data"
                                    :ifsearch="ifsearch"
                                    :url="url">
                                </dataTable>
                            </div>
                            <FormItem style="text-align: right">
                                <!--<Button type="error">重&emsp;置</Button>-->
                                <Button type="primary" @click="handleSubmit('formInline')">提&emsp;交</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
        <!--新增部门-->
        <adddep ref="depmodal"></adddep>
        <!--编辑部门-->
        <editgroup ref="editgroupmodal"></editgroup>
        <!--新增人员-->
        <Modal v-model="permodal" title="新增人员" :styles="{width: '85%'}">
            <addper v-if="permodal" :Id="id"></addper>
            <span slot="footer"></span>
        </Modal>

        <!--操作删除-->
        <deleteGroupUser ref="deleteOne" title="删除人员"></deleteGroupUser>

        <deleteGroup ref="deleteGroup"></deleteGroup>
    </div>
</template>
<script>
    import $ from 'jquery'
    import GroupHttp from 'server/http/group'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    require('static/css/tree.css')
    require('static/css/modal.css')
    import adddep from '../components/adddep.vue'
    import editgroup from '../components/editgroup.vue'
    import addper from '../components/addper.vue'
    import deleteGroupUser from '../components/delete.vue'
    import deleteGroup from '../components/deleteGroup.vue'
    import dataTable from '@/components/dataTable.vue'
    import resize from '@/mixins/resize'
    import selectSupplier from '../components/selectSupplier.vue'
    export default {
        created () {
            this.$emit('updateActiveName', '1')
        },
        components: {
            deleteGroupUser, editgroup, adddep, addper, dataTable, deleteGroup, selectSupplier
        },
        mixins: [ resize, ztree ],
        data () {
            return {
                supplier_id: '',
                supplierList: [],
                secondWord: false,
                permodal: false,
                labelList: [],
                mainList: [],
                secondList: [],
                // 点击选中的组织编号
                id: '',
                description: '',
                ztreeObj: '',
                // checkbox选中的组织编号
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
                url: GroupHttp.map.groupuserlist + '/' + 0,
                formInline: {
                    main: '',
                    second: [],
                    oldmain: '',
                    oldsecond: [],
                    label: []
                },
                ruleInline: {
                    main: [
                        { required: true, type: 'number', message: '主要负责人不能为空', trigger: 'change' }
                    ]
                },
                columns: [
                    {
                        title: '姓名',
                        width: 85,
                        key: 'username'
                    },
                    {
                        title: '登录账号',
                        key: 'phone',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    fontFamily: 'Arial, Helvetica, sans-serif'
                                }
                            }, params.row.phone)
                        }
                    },
                    {
                        title: '岗位',
                        width: 80,
                        key: 'professionsname'
                    },
                    {
                        title: '聘用状态',
                        width: 65,
                        key: 'states',
                        render: (h, params) => {
                            if (params.row.entry_fso == 1) {
                                return h('span', {
                                    style: {
                                        color: '#14AA64'
                                    }
                                }, '在职')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#9EA7B4'
                                    }
                                }, '离职')
                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 65,
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
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
            /*
            GroupHttp.groupSupplierlist().then((data) => {
                this.supplier_id = data[0].id
                this.supplierList = data
            })
            */
            /*
            GroupHttp.getAll(this.supplier_id).then((data) => {
                data = [{id: 0, name: '全部'}, ...data]
                this.ztreeObj = $.fn.zTree.init($('#groups'), this.setting, data)
                this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0))
                let nodes = this.ztreeObj.getNodesByParam('level', 1)
                $('a#' + nodes[0].tId + '_a').click()
            })
            */
            document.getElementById('groups').style.height = (document.body.clientHeight - 320) + 'px'
            document.getElementById('fixinfo').style.height = (document.body.clientHeight - 320) + 'px'
        },
        methods: {
            supplierChange (data) {
                this.supplier_id = data
                GroupHttp.getAll(data).then((data) => {
                    $.fn.zTree.destroy()
                    data = [{id: 0, name: '全部', supplier_id: this.supplier_id}, ...data]
                    this.ztreeObj = $.fn.zTree.init($('#groups'), this.setting, data)
                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0))
                    let nodes = this.ztreeObj.getNodesByParam('level', 1)
                    if (nodes.length > 0) {
                        $('a#' + nodes[0].tId + '_a').click()
                    }
                })
            },
            secondChange (data) {
                if (data.length > 1) {
                    this.secondWord = true
                } else {
                    this.secondWord = false
                }
            },
            getInfo (data) {
                this.description = data.description ? data.description : '暂无'
                this.formInline.label = data.label
                this.id = data.id
                // 记录旧人，更新记录
                if (data.main) {
                    this.formInline.main = data.main
                    this.formInline.oldmain = data.main
                } else {
                    this.formInline.main = ''
                    this.formInline.oldmain = ''
                }
                if (data.second) {
                    this.formInline.second = data.second
                    this.formInline.oldsecond = data.second
                } else {
                    this.formInline.second = []
                    this.formInline.oldsecond = []
                }
                this.showinfo = true
                this.showinput = false
                this.refresh(data.id, GroupHttp.map.groupuserlist + '/' + this.id)
            },
            getUser (id) {
                GroupHttp.groupUser(id).then((res) => {
                    this.mainList = res
                })
                GroupHttp.groupSecondUser(id).then((res) => {
                    this.secondList = res
                })
                GroupHttp.GroupLabelall().then((res) => {
                    this.labelList = res
                })
            },
            // 新增部门
            adddep (treeNode) {
                this.$refs.depmodal.openmodal(treeNode)
            },
            editgroup (treeNode) {
                this.$refs.editgroupmodal.openeditmodal(treeNode)
            },
            // 新增人员
            addper () {
                this.permodal = true
            },
            // 职责编辑
            edit () {
                this.showinfo = false
                this.showinput = true
                setTimeout(() => {
                    this.focus()
                }, 300)
            },
            // 保存职责
            store () {
                this.showinfo = true
                this.showinput = false
                var arrayG = {}
                arrayG.id = this.id
                arrayG.description = this.description
                GroupHttp.edit(arrayG).then((res) => {
                    let node = this.ztreeObj.getNodeByParam('id', res.id)
                    node.description = res.description
                    this.ztreeObj.updateNode(node)
                })
            },
            remove (id) {
                if (this.formInline.main == id) {
                    this.$Message.success('请勿删除负责人')
                    return
                }
                for (var i of this.formInline.second) {
                    if (i == id) {
                        this.$Message.success('请勿删除负责人')
                        return
                    }
                }
                this.$refs.deleteOne.init(id, this.id)
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        GroupHttp.updateGroupUser(this.formInline, this.id).then(() => {
                            let node = this.ztreeObj.getNodeByParam('id', this.id)
                            node.main = this.formInline.main
                            node.second = this.formInline.second
                            this.ztreeObj.updateNode(node)
                            this.$Message.success('提交成功')
                        }).catch((error) => {
                            this.$Message.error(error)
                        })
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            delbatch () {
                if (this.checkedData.length === 0) {
                    this.$Message.error('请选择需要删除的组织')
                } else {
                    let ids = this.checkedData.join(',')
                    this.$refs.deleteGroup.init(ids)
                }
            },
            delCheckedNodes () {
                for (let id of this.checkedData) {
                    if (id == this.id) {
                        let nodes = this.ztreeObj.getNodesByParam('level', 1)
                        $('a#' + nodes[0].tId + '_a').click()
                    }
                    let node = this.ztreeObj.getNodeByParam('id', id)
                    this.ztreeObj.removeNode(node)
                }
                this.checkedData = []
            },
            zTreeOnClick (event, treeId, treeNode) {
                if (treeNode.id == 0) {
                    return
                }
                this.getInfo(treeNode)
            },
            zTreeOnDrop (treeId, treeNodes, targetNode, moveType) {
                if (moveType == 'inner' && targetNode != null) {
                    GroupHttp.edit({id: treeNodes[0].id, pid: targetNode.id})
                } else {
                    return false
                }
            },
            addNode (res) {
                let pNode = this.ztreeObj.getNodeByParam('id', res.pid)
                let newNode = {
                    id: res.id,
                    name: res.name,
                    pid: res.pid,
                    supplier_id: this.supplier_id
                }
                this.ztreeObj.addNodes(pNode, newNode)

                let node = this.ztreeObj.getNodeByParam('id', res.id)
                $('a#' + node.tId + '_a').click()
            },
            editNode (res) {
                let node = this.ztreeObj.getNodeByParam('id', res.id)
                node.name = res.name
                this.ztreeObj.updateNode(node)
            },
            addHoverDom (treeId, treeNode) {
                let aObj = $('#' + treeNode.tId + '_a')
                if ($('#diyBtn_' + treeNode.id).length > 0) {
                    return
                }
                let editStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">新增</a>'
                let editStredit = '<a class="diyBtnEdit" id="editdiyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">修改</a>'
                aObj.append(editStr)
                aObj.append(editStredit)
                let btn = $('#diyBtn_' + treeNode.id)
                let editbtn = $('#editdiyBtn_' + treeNode.id)
                if (btn) {
                    btn.bind('click', () => {
                        this.adddep(treeNode)
                    })
                }
                if (editbtn) {
                    editbtn.bind('click', () => {
                        this.editgroup(treeNode)
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
            refresh (flag, url) {
                if (flag) {
                    this.getUser(flag)
                }
                this.$refs.datatable.refresh(url)
            },
            onResize () {
                document.getElementById('groups').style.height = (document.body.clientHeight - 320) + 'px'
                document.getElementById('fixinfo').style.height = (document.body.clientHeight - 320) + 'px'
            },
            focus () {
                $('.ivu-input').focus()
            },
            bbb () {
                this.focus()
            }
        }
    }
</script>
