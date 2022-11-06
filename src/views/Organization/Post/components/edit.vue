<style>
   .formModal .ivu-modal .ivu-select-dropdown { position: fixed!important; }
</style>
<template>
    <Modal
        v-model="addModal"
        title="编辑"
        :styles="{width: '90%'}" @on-cancel="cancel('formInline')" class="formModal">
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
                                <div id='allobjectEdit' class='ztree'></div>
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="postTree">
                            <div class="treesear">
                                <Input v-model="search" placeholder="搜索" style="width: 100%"></Input>
                            </div>
                            <div class="item">
                                <div id='allSpaceEdit' class='ztree'></div>
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
                        :data="roles"
                        :target-keys="targetKeys"
                        :render-format="render"
                        :list-style="listStyle"
                        :titles="['未关联角色：', '已关联角色']"
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
                searchObj: '',
                search: '',
                ztreeMyObj: '',
                ztreeObj: '',
                treeData: [],
                checkedData: [],
                checkMyObjNode: [],
                role_id: '',
                object_id: '',
                id: '',
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
                    work: ''
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
                        { required: true, type: 'number', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            async open (id) {
                this.id = id
                this.wType()
                await this.object()
                await this.space()
                this.role()
                this.submitCount = 0
                this.spaceTypeReverse = new Map([
                    ['App\\Models\\Space', 'space'],
                    ['App\\Models\\Tier', 'tier'],
                    ['App\\Models\\Building', 'build'],
                    ['App\\Models\\Zone', 'zone'],
                    ['App\\Models\\City', 'city']
                ])
                this.spaceType = new Map([
                    ['space', 'App\\Models\\Space'],
                    ['tier', 'App\\Models\\Tier'],
                    ['build', 'App\\Models\\Building'],
                    ['zone', 'App\\Models\\Zone'],
                    ['city', 'App\\Models\\City']
                ])
                PostHttp.allpost(this.id).then((data) => {
                    this.formInline.name = data.data.professioninfo.name
                    this.formInline.description = data.data.professioninfo.description
                    this.formInline.type = data.data.wotypeinfo
                    this.formInline.work = data.data.professioninfo.work
                    this.targetKeys = data.data.rolerinfo
                    // 获取对象选中
                    if (data.data.objectinfo != '') {
                        for (let v of data.data.objectinfo) {
                            let node = this.ztreeMyObj.getNodeByParam('id', v)
                            node.checked = true
                        }
                    }
                    let firstLevelNodes = this.ztreeMyObj.getNodesByParam('level', 0)
                    for (let node of firstLevelNodes) {
                        if ('children' in node) {
                            node.checked = true
                            let childNodes = node.children
                            for (let child of childNodes) {
                                if (child.checked == false) {
                                    node.checked = false
                                    break
                                }
                            }
                        } else {
                            node.isHidden = true
                        }
                    }
                    this.ztreeMyObj.refresh()
                    // 获取空间选中
                    let sites = data.data.spaceinfo
                    let ids = []
                    for (let v of sites) {
                        ids.push(v.place_id)
                    }
                    for (let id of ids) {
                        let spaceNode = this.ztreeObj.getNodeByParam('id', id)
                        spaceNode.checked = true
                        this.ztreeOnCheck(this.ztreeObj, spaceNode)
                    }
                    this.ztreeObj.refresh()
                })
                this.addModal = true
            },
            // 获取工单类型
            wType () {
                PostHttp.workType().then((data) => {
                    this.typeList = data.data
                })
            },
            // 获取对象
            object () {
                return new Promise((resolve, reject) => {
                    myObjectHttp.getAll().then((data) => {
                        this.myObjectData = data
                        this.ztreeMyObj = $.fn.zTree.init($('#allobjectEdit'), this.myObjectSetting, data)
                        resolve()
                    })
                })
            },
            // 获取空间
            space () {
                return new Promise((resolve, reject) => {
                    SpaceHttp.allSpace().then((data) => {
                        this.spaceData = data
                        this.ztreeObj = $.fn.zTree.init($('#allSpaceEdit'), this.allSpaceSetting, data)
                        resolve()
                    })
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
            // 取消
            cancelSubmit (formInline) {
                this.searchObj = ''
                this.search = ''
                this.addModal = false
            },
            // 关闭模态框
            cancel (formInline) {
                this.searchObj = ''
                this.search = ''
                this.addModal = false
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
                            PostHttp.putpost({id: this.id, name: this.formInline.name, description: this.formInline.description, work_id: workStrid, work: this.formInline.work, object_id: objectStrId, role_id: roleStrid, sites: JSON.stringify(this.checkedData)}).then(() => {
                                this.$Message.success('修改成功!')
                                this.addModal = false
                                this.searchObj = ''
                                this.search = ''
                                this.confirmDis = false
                                this.$parent.refresh()
                            }).catch((error) => {
                                this.$Message.error(error)
                                this.confirmDis = false
                                this.submitCount = 0
                            })
                        } else {
                            this.$Message.error('管理对象和工作地点不能为空!')
                            this.confirmDis = false
                            this.submitCount = 0
                        }
                    } else {
                        // this.$Message.error('必填项不能为空!')
                        this.confirmDis = false
                        this.submitCount = 0
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
