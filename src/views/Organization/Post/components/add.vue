<style>
   .formModal .ivu-modal .ivu-select-dropdown { position: fixed!important; }
</style>
<template>
    <Modal
        v-model="addModal"
        title="新建"
        class="formModal"
        :styles="{width: '90%'}" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="right" :label-width="100">
            <FormItem prop="name" label="岗位名称：">
                <Input type="text" v-model="formInline.name" placeholder="请输入名称"></Input>
            </FormItem>
            <FormItem prop="description" label="岗位职责：">
                <Input v-model="formInline.description" :maxlength="101" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入"></Input>
            </Formitem>
            <FormItem prop="type" label="工单类型：">
                <Select v-model="formInline.type" filterable multiple placeholder="请选择工单类型">
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="是否要排班：" prop="work">
                <Select v-model="formInline.work" placeholder="请选择">
                    <Option v-for="item in workList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <div class="postItem">
                <Row class="postTitle">
                    <Col span="12">管理对象(必选)：</Col>
                    <Col span="12">工作地点(必选)：</Col>
                </Row>
                <Row class="postInfo">
                    <Col span="12" class="postBor">
                        <div class="postTree">
                            <div class="treesear">
                                <Input v-model="searchObj" placeholder="搜索" style="width: 100%"></Input>
                            </div>
                            <div class="item">
                                <div id='allobject' class='ztree'></div>
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="postTree">
                            <div class="treesear">
                                <Input v-model="search" placeholder="搜索" style="width: 100%"></Input>
                            </div>
                            <div class="item">
                                <div id='allSpace' class='ztree'></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="clear"></div>
            <div class="clear"></div>
            <div class="postItem">
                <Row class="postTitle">
                    <col span="24">关联角色(非必选)：</Col>
                </Row>
                <template>
                    <Transfer
                        v-if="show"
                        :data="roles"
                        :target-keys="targetKeys"
                        :render-format="render"
                        :list-style="listStyle"
                        :titles="['未关联角色', '已关联角色']"
                        @on-change="handleChange"></Transfer>
                </template>
            </div>
            <FormItem>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit('formInline')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')" :disabled='confirmDis'>确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import PostHttp from 'server/http/post'
    import myObjectHttp from 'server/http/myObject'
    import SpaceHttp from 'server/http/space'
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
                confirmDis: false,
                submitCount: 0,
                show: false,
                searchObj: '',
                search: '',
                ztreeMyObj: '',
                ztreeObj: '',
                treeData: [],
                checkedData: [],
                role_id: '',
                object_id: '',
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
                },
                roles: [],
                data: {},
                targetKeys: [],
                listStyle: {
                    width: '47%',
                    height: '400px'
                },
                typeList: [],
                workList: [
                    {
                        value: 1,
                        label: '是'
                    },
                    {
                        value: 0,
                        label: '否'
                    }
                ],
                formInline: {
                    name: '',
                    description: '',
                    type: [],
                    work: 1
                },
                ruleInline: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    description: [
                        { type: 'string', max: 100, message: '最多只能输入100个字符', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, type: 'array', min: 1, message: '请选择工单类型', trigger: 'change' },
                        { type: 'array', trigger: 'change' }
                    ],
                    work: [
                        { require: true, type: 'number', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            open () {
                this.wType()
                this.object()
                this.space()
                this.role()
                this.show = true
                this.submitCount = 0
                this.addModal = true
                this.spaceType = new Map([
                    ['space', 'App\\Models\\Space'],
                    ['tier', 'App\\Models\\Tier'],
                    ['build', 'App\\Models\\Building'],
                    ['zone', 'App\\Models\\Zone'],
                    ['city', 'App\\Models\\City']
                ])
            },
            // 获取工单类型
            wType () {
                PostHttp.workType().then((data) => {
                    this.typeList = data.data
                })
            },
            // 获取对象
            object () {
                myObjectHttp.getAllObject().then((data) => {
                    this.myObjectData = data
                    this.ztreeMyObj = $.fn.zTree.init($('#allobject'), this.myObjectSetting, data)
                })
            },
            // 获取空间
            space () {
                SpaceHttp.allSpace().then((data) => {
                    this.spaceData = data
                    this.ztreeObj = $.fn.zTree.init($('#allSpace'), this.allSpaceSetting, data)
                })
            },
            // 获取角色
            role () {
                PostHttp.allroles().then((data) => {
                    this.roles = data.data.data.allrolers
                })
            },
            render (item) {
                return item.label
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys
            },
            // 清空
            allcancel (formInline) {
                this.$refs[formInline].resetFields()
                this.checked1 = ''
                this.checked = ''
                this.targetKeys = []
                this.searchObj = ''
                this.search = ''
                this.addModal = false
                this.show = false
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
                        // let [siteType, siteId] = node.id
                        // siteType = this.spaceType.get(siteType)
                        // this.checkedData.push({'site_type': siteType, 'site_id': siteId})
                        this.checkedData.push({'site_id': node.id})
                    }
                }
            },
            // 关闭模态框
            cancel (formInline) {
                this.allcancel(formInline)
            },
            // 取消
            cancelSubmit (formInline) {
                this.allcancel(formInline)
            },
            // 提交
            handleSubmit (formInline) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[formInline].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        // 对象
                        let objectCheckedNodes = this.ztreeMyObj.getNodesByParam('checked', true)
                        let objectIds = []
                        for (let node of objectCheckedNodes) {
                            if (node.pid) {
                                objectIds.push(node.id)
                            }
                        }
                        let objectStrId = objectIds.join(',')
                        // 地点
                        // let checkedNodes = this.ztreeObj.getNodesByParam('checked', true)
                        // this.checkedData = []
                        // for (let site of checkedNodes) {
                        //     let [siteType, siteId] = site.id.split('-')
                        //     siteType = this.spaceType.get(siteType)
                        //     this.checkedData.push({'site_type': siteType, 'site_id': siteId})
                        // }
                        let roleStrid = this.targetKeys.join(',')
                        let workStrid = this.formInline.type.join(',')
                        let checked1 = this.ztreeMyObj.getNodesByParam('checked', true)
                        let checked = this.ztreeObj.getNodesByParam('checked', true)
                        if (checked1.length > 0 && checked.length > 0) {
                            PostHttp.postadd({name: this.formInline.name, description: this.formInline.description, work_id: workStrid, work: this.formInline.work, object_id: objectStrId, role_id: roleStrid, sites: JSON.stringify(this.checkedData)}).then(() => {
                                this.$Message.success('创建成功!')
                                this.$refs[formInline].resetFields()
                                checked1 = ''
                                checked = ''
                                this.targetKeys = []
                                this.searchObj = ''
                                this.search = ''
                                this.addModal = false
                                this.confirmDis = false
                                this.$parent.refresh()
                                // this.show = false
                            }).catch((error) => {
                                this.$Message.error(error)
                                this.confirmDis = false
                                this.submitCount = 0
                            })
                        } else {
                            this.$Message.error('管理对象和工作地点不能为空!')
                            this.submitCount = 0
                            this.confirmDis = false
                        }
                    } else {
                        // this.$Message.error('必填项不能为空!')
                        this.submitCount = 0
                        this.confirmDis = false
                    }
                })
            }
        },
        watch: {
            searchObj (v) {
                this.ztreeSearch(this.ztreeMyObj, this.myObjectData, v)
            },
            search (v) {
                this.ztreeSearch(this.ztreeObj, this.spaceData, v)
            }
        }
    }
</script>
