<style>
    .itemBtn .ivu-table-cell , .itemTableInfo .ivu-table-cell{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .selectFormTemp { margin: 0 200px; position: relative; }
    .selectFormTemp label { position: absolute; left: -70px; font-size: 14px; top: 5px; color: #464C5B; }
    .itemForm { margin: 0 40px; }
    .itemForm .itemTable { margin-top: 50px; border: 1px solid #D7DDE4; border-radius: 3px; }
    .itemForm .itemTable .itemTableTitle { font-size: 14px; border-bottom: 1px solid #D7DDE4; height: 40px; background-color: #f8f8f9; line-height: 40px; padding-left: 30px; }
    .itemForm .itemTable .itemTableInfo , .itemForm .itemBtn { margin: 20px 30px; }
    .itemBtn button { margin-bottom: 20px; }
    .itemForm .flowbtns { border-top: 1px solid #D7DDE4; padding: 30px 0; text-align: center; margin-top: 30px; }
    .itemForm .flowbtns button { margin: 0 10px; font-size: 14px; }
    .formModalBtn { margin-top: 50px; }
    .formModalBtn .ivu-form-item {  padding: 0 180px 0 150px; }
    .formModalBtn .ivu-form-item.formbtns { padding: 10px 16px 0 0; }
</style>
<template>
    <div class="itemForm">
        <div class="selectFormTemp">
            <label>表单模板</label>
            <Select v-model="selectGroup" filterable @on-change="changeOption">
                <OptionGroup v-for="(item, key) in group" :label="item.name" :key="item.id">
                    <Option v-for="item1 in item.form_templates" :value="item1.id" :key="item1.id">{{ item1.name }}</Option>
                </OptionGroup>
            </Select>
            <Poptip style="position: absolute; right: -35px; top: 5px;" trigger="hover" placement="bottom" title="表单模板" content="选择表单模板创建新的流程环节">
                <span class="helpInfo"></span>
            </Poptip>
        </div>
        <!--表单模板-->
        <div class="itemTable">
           <div class="itemTableTitle">表单元素</div>
           <!-- <div class="itemBtn" style="text-align: right; margin: 20px 30px 0;">
               <Button type="ghost" @click="resetBtn">重置表单</Button>
           </div> -->
           <div class="itemTableInfo">
               <Table :height="500" :columns="columns" :data="data"></Table>
               <!-- <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" style="float: right; margin-top: 20px;"></Page> -->
               <div class="clear"></div>
           </div>
        </div>
        <!--按钮-->
        <div class="itemTable">
            <div class="itemTableTitle">按钮</div>
            <div class="itemBtn">
                <Button type="primary" @click="addbtn" :disabled="disabled">新&emsp;增</Button>&emsp;
                <!-- <Button type="ghost" :disabled="disabled" @click="allHide">批量隐藏</Button>&emsp; -->
                <!-- <Button type="ghost" :disabled="disabled" @click="delAllBtn">批量删除</Button> -->
                <Table :height="500" :columns="columns1" :data="data1" @on-selection-change="selectchange"></Table>
                <!-- <Page :total="dataCount1" :page-size="pageSize1" show-total @on-change="changepage1" style="float: right; margin-top: 20px;"></Page> -->
                <div class="clear"></div>
            </div>
        </div>
        <div class="flowbtns">
            <!-- <Button type="ghost" @click="handleReset('formInline')">重&emsp;置</Button> -->
            <Button type="primary" :disabled="disabled" @click="handleSubmit">提&emsp;交</Button>
        </div>
        <!--新增-->
        <Modal class="popTitle" @on-cancel="cancel('formInline')" v-model="addBtn" title="新增按钮" :styles="{width: '90%'}">
            <Form ref="formInline" class="formModalBtn" :model="formInline" :label-width="100" :rules="ruleInline">
                <FormItem prop="no" label="按钮编号">
                    <Input type="text" disabled v-model="formInline.no" placeholder="Username"></Input>
                </FormItem>
                <FormItem prop="name" label="按钮名称">
                    <Input type="text" v-model="formInline.name" placeholder="请输入按钮名称"></Input>
                </FormItem>
                <FormItem prop="function" label="按钮功能" style="position: relative;">
                    <Select v-model="formInline.function_id" @on-change="changeStatus">
                        <Option v-for="item in funcList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Poptip style="position: absolute; right: -35px; top: 0;" trigger="hover" placement="bottom" title="按钮功能" content="选择按钮功能，决定目标状态。">
                        <span class="helpInfo"></span>
                    </Poptip>
                </FormItem>
                <FormItem label="目标状态">
                    <span v-if="defaultName"  style="font-size: 14px; color: #9EA7B4;">待分配</span><span v-if="changeName"  style="font-size: 14px; color: #9EA7B4;">{{this.statusName}}</span>
                </FormItem>
                <FormItem prop="mainOperate" label="主操作">
                    <RadioGroup v-model="formInline.mainOperate" style="float: left;">
                        <Radio label="1">是</Radio>&emsp;&emsp;
                        <Radio label="">否</Radio>&emsp;&emsp;
                    </RadioGroup>
                    <Poptip trigger="hover" placement="bottom" title="主操作" content="决定当前环节中，次按钮是否在该表单内显示。">
                        <span class="helpInfo"></span>
                    </Poptip>
                </FormItem>
                <FormItem prop="show" label="是否显示">
                    <RadioGroup v-model="formInline.show" style="float: left;">
                        <Radio label="1">是</Radio>&emsp;&emsp;
                        <Radio label="">否</Radio>&emsp;&emsp;
                    </RadioGroup>
                    <Poptip trigger="hover" placement="bottom" title="是否显示" content="决定当前环节中，次按钮是否在该表单内显示。">
                        <span class="helpInfo"></span>
                    </Poptip>
                </FormItem>
                <FormItem class="formbtns">
                    <Button type="ghost" @click="cancelBtn('formInline')">取&emsp;消</Button>
                    <Button type="primary" @click="subBtn('formInline')">确&emsp;定</Button>
                </FormItem>
            </Form>
            <span slot="footer"></span>
        </Modal>
        <!--编辑-->
        <Modal class="popTitle" v-model="editBtnModal" title="编辑按钮" :styles="{width: '90%'}">
            <Form ref="formInlineEdit" class="formModalBtn" :model="formInlineEdit" :label-width="100" :rules="ruleInlineEdit">
                <FormItem prop="no" label="按钮编号">
                    <Input type="text" disabled v-model="formInlineEdit.no" placeholder="按钮编号"></Input>
                </FormItem>
                <FormItem prop="name" label="按钮名称">
                    <Input type="text" v-model="formInlineEdit.name" placeholder="请输入按钮名称"></Input>
                </FormItem>
                <FormItem prop="function" label="按钮功能" style="position: relative;">
                    <Select v-model="formInlineEdit.function_id" @on-change="changeStatus">
                        <Option v-for="item in funcList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Poptip style="position: absolute; right: -35px; top: 0;" trigger="hover" placement="bottom" title="按钮功能" content="选择按钮功能，决定目标状态。">
                        <span class="helpInfo"></span>
                    </Poptip>
                </FormItem>
                <FormItem label="目标状态">
                    <span v-if="defaultName"  style="font-size: 14px; color: #9EA7B4;">待分配</span><span v-if="changeName"  style="font-size: 14px; color: #9EA7B4;">{{this.statusName}}</span>
                </FormItem>
                <FormItem prop="mainOperate" label="主操作">
                    <RadioGroup v-model="formInlineEdit.mainOperate" style="float:left;">
                        <Radio label="1">是</Radio>&emsp;&emsp;
                        <Radio label="">否</Radio>&emsp;&emsp;
                    </RadioGroup>
                    <Poptip trigger="hover" placement="bottom" title="主操作" content="决定当前环节中，次按钮是否在该表单内显示。">
                        <span class="helpInfo"></span>
                    </Poptip>
                </FormItem>
                <FormItem prop="show" label="是否显示">
                    <RadioGroup v-model="formInlineEdit.show" style="float:left;">
                        <Radio label="1">是</Radio>&emsp;&emsp;
                        <Radio label="">否</Radio>&emsp;&emsp;
                    </RadioGroup>
                    <Poptip trigger="hover" placement="bottom" title="是否显示" content="决定当前环节中，次按钮是否在该表单内显示。">
                        <span class="helpInfo"></span>
                    </Poptip>
                </FormItem>
                <FormItem class="formbtns">
                    <Button type="ghost" @click="cancelEditBtn">取&emsp;消</Button>
                    <Button type="primary" @click="editBtn('formInlineEdit')">确&emsp;定</Button>
                </FormItem>
            </Form>
            <span slot="footer"></span>
        </Modal>
        <!--删除-->
        <Modal v-model="delBtnModal" title="删除按钮">
            <div class="">
                <div class="item">
                    <Alert type="warning" show-icon>
                        删除自添加的按钮之后将无法恢复，
                        <template slot="desc">
                            你还要继续吗？
                        </template>
                    </Alert>
                </div>
            </div>
            <div class="formbtns">
                <div class="item">
                    <Button type="ghost" @click="cancelDelBtn()">取&emsp;消</Button>
                    <Button type="primary" @click="delBtn()">确&emsp;定</Button>
                </div>
            </div>
            <span slot="footer"></span>
        </Modal>
        <!--批量删除-->
        <Modal v-model="delBtnsModal" title="批量删除按钮">
        </Modal>
        <!--批量隐藏-->
        <Modal v-model="hideBtnsModal" title="批量隐藏按钮">
            <div class="">
                <div class="item">
                    <Alert type="warning" show-icon>
                        隐藏显示中的按钮，按钮将不在显示！
                        <template slot="desc">
                            你还要继续吗？
                        </template>
                    </Alert>
                </div>
            </div>
            <div class="formbtns">
                <div class="item">
                    <Button type="ghost" @click="cancelHideBtn()">取&emsp;消</Button>
                    <Button type="primary" @click="hideBtn()">确&emsp;定</Button>
                </div>
            </div>
            <span slot="footer"></span>
        </Modal>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import ProcessManageHttp from 'server/http/processManage'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    export default {
        components: {
        },
        created () {
            this.$emit('updateActiveName', '2')
            setTimeout(
                setTableItem, 2000
            )
            // 获取模板
            ProcessManageHttp.getFormTemplate().then((data) => {
                this.group = data
            })
            // 获取环节详情
            this.getLinkInfo()

            // 获取功能
            this.getLinkAction()
        },
        data () {
            return {
                dataFormId: '',
                deltitle: '删除按钮',
                addBtn: false,
                editBtnModal: false,
                delBtnModal: false,
                delBtnsModal: false,
                hideBtnsModal: false,
                disabled: true,
                defaultName: true,
                changeName: false,
                dataCount: 0,
                dataCount1: 0,
                pageSize: 10,
                pageSize1: 10,
                ajaxHistoryData: [],
                ajaxHistoryData1: [],
                group: [],
                formData: [],
                funcList: [],
                selectGroup: '',
                statusName: '',
                form_id: '',
                index: '',
                select_ids: [],
                columns: [
                    {
                        title: '元素编号',
                        key: 'no'
                    },
                    {
                        title: '元素名称',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        render: (h, params) => {
                            if (params.row.type == 1) {
                                return h('span', '展示字段')
                            } else if (params.row.type == 2) {
                                return h('span', '有初始值的文本框')
                            } else if (params.row.type == 3) {
                                return h('span', '文本域')
                            } else {
                                return h('span', '业务按钮')
                            }
                        }
                    },
                    {
                        type: 'radio',
                        title: '读写',
                        width: 80,
                        render: (h, params) => {
                            if (params.row.canWrite == true) {
                                return h('Radio', {
                                    props: {
                                        value: Boolean(params.row.writable)
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.radioWritAble(params.index)
                                        }
                                    }
                                })
                            } else {
                                return h('Radio', {
                                    props: {
                                        disabled: true
                                    }
                                })
                            }
                        }
                    },
                    {
                        title: '只读',
                        width: 80,
                        render: (h, params) => {
                            if (params.row.canReadOnly == true) {
                                return h('Radio', {
                                    props: {
                                        value: Boolean(params.row.readonly)
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.radioReadOnly(params.index)
                                        }
                                    }
                                })
                            } else {
                                return h('Radio', {
                                    props: {
                                        disabled: true
                                    }
                                })
                            }
                        }
                    },
                    {
                        title: '隐藏',
                        width: 80,
                        render: (h, params) => {
                            if (params.row.canHide == true) {
                                return h('Radio', {
                                    props: {
                                        value: Boolean(params.row.hide)
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.radioCanHide(params.index)
                                        }
                                    }
                                })
                            } else {
                                return h('Radio', {
                                    props: {
                                        disabled: true
                                    }
                                })
                            }
                        }
                    }
                ],
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'no'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '功能',
                        key: 'function',
                        render: (h, params) => {
                            if (params.row.function_id) {
                                for (var i = 0, length = this.funcList.length; i < length; i++) {
                                    if (this.funcList[i].id == params.row.function_id) {
                                        return h('span', this.funcList[i].name + ('(' + this.funcList[i].function + ')'))
                                    }
                                }
                            }
                        }
                    },
                    {
                        title: '目标状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('span', params.row.status_name)
                        }
                    },
                    {
                        title: '按钮特性',
                        key: 'feature'
                    },
                    {
                        title: '主操作',
                        key: 'mainOperate',
                        render: (h, params) => {
                            if (params.row.mainOperate == '') {
                                return h('span', '否')
                            } else {
                                return h('span', '是')
                            }
                        }
                    },
                    {
                        title: '是否显示',
                        key: 'show',
                        render: (h, params) => {
                            if (params.row.show == '') {
                                return h('span', '否')
                            } else {
                                return h('span', '是')
                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 120,
                        render: (h, params) => {
                            if (params.row.feature == '表单默认') {
                                return h('div', [
                                    h('a', {
                                        style: {
                                            marginRight: '20px',
                                            color: '#3399FF'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.index)
                                            }
                                        }
                                    }, '编辑')
                                ])
                            } else {
                                return h('div', [
                                    h('a', {
                                        style: {
                                            marginRight: '20px',
                                            color: '#3399FF'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.index)
                                            }
                                        }
                                    }, '编辑'),
                                    h('a', {
                                        style: {
                                            color: '#D0021B'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除')
                                ])
                            }
                        }
                    }
                ],
                data: [],
                data1: [],
                dataPage: [],
                data1Page: [],
                dataButton: {},
                dataElements: {},
                formInline: {
                    no: '',
                    name: '',
                    function: '',
                    function_id: '',
                    status: '',
                    feature: '',
                    mainOperate: '',
                    show: ''
                },
                formInlineEdit: {
                    no: '',
                    name: '',
                    function: '',
                    function_id: '',
                    status: '',
                    feature: '',
                    mainOperate: '',
                    show: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请输入按钮名称', trigger: 'blur' }
                    ],
                    function_id: [
                        { required: true, type: 'number', message: '请选择按钮功能', trigger: 'change' }
                    ]
                },
                ruleInlineEdit: {
                    name: [
                        { required: true, message: '请输入按钮名称', trigger: 'blur' }
                    ],
                    function_id: [
                        { required: true, type: 'number', message: '请选择按钮功能', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            radioWritAble (index, value) {
                this.data[index].writable = 1
                this.data[index].readonly = ''
                this.data[index].hide = ''
            },
            radioReadOnly (index) {
                this.data[index].writable = ''
                this.data[index].readonly = 1
                this.data[index].hide = ''
            },
            radioCanHide (index) {
                this.data[index].writable = ''
                this.data[index].readonly = ''
                this.data[index].hide = 1
            },
            getLinkInfo () {
                ProcessManageHttp.getLinkInfo(this.$route.params.linkid).then((data) => {
                    this.selectGroup = data.form_id
                    this.dataFormId = this.selectGroup
                    let dataButtons = JSON.parse(data.form_detail)
                    for (var key in dataButtons.buttons) {
                        this.data1.push({no: key, name: dataButtons.buttons[key].name, canCheck: dataButtons.buttons[key].canCheck, function: dataButtons.buttons[key].function, function_id: dataButtons.buttons[key].function_id, status: dataButtons.buttons[key].status, status_name: dataButtons.buttons[key].status_name, feature: dataButtons.buttons[key].feature, mainOperate: dataButtons.buttons[key].mainOperate, show: dataButtons.buttons[key].show})
                    }
                    // this.data1Page = this.data1
                    // 按钮分页
                    // this.ajaxHistoryData1 = this.data1Page
                    // this.dataCount1 = this.data1Page.length
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    // if (this.data1.length < this.pageSize1) {
                        // this.data1 = this.ajaxHistoryData1
                    // } else {
                        // this.data1 = this.ajaxHistoryData1.slice(0, this.pageSize1)
                    // }
                    for (var k in dataButtons.elements) {
                        this.data.push({no: k, name: dataButtons.elements[k].name, canCheck: dataButtons.elements[k].canCheck, type: dataButtons.elements[k].type, hide: dataButtons.elements[k].hide, readonly: dataButtons.elements[k].readonly, writable: dataButtons.elements[k].writable, canHide: dataButtons.elements[k].canHide, canWrite: dataButtons.elements[k].canWrite, canReadOnly: dataButtons.elements[k].canReadOnly})
                    }
                    // this.dataPage = this.data
                    // 表单元素分页
                    // this.ajaxHistoryData = this.dataPage
                    // this.dataCount = this.dataPage.length
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    // if (this.data.length < this.pageSize) {
                        // this.data = this.ajaxHistoryData
                    // } else {
                        // this.data = this.ajaxHistoryData.slice(0, this.pageSize)
                    // }
                })
            },
            changeOption (value) {
                this.disabled = false
                if (this.dataFormId == value) {
                    this.data = []
                    this.data1 = []
                    this.getLinkInfo()
                } else {
                    this.data = []
                    this.data1 = []
                    for (let v of this.group) {
                        for (let formT of v.form_templates) {
                            if (value == formT.id) {
                                if (formT.template != null) {
                                    for (let formTT of JSON.parse(formT.template)) {
                                        for (var key in formTT.elements) {
                                            this.data.push({no: key, name: formTT.elements[key].name, canCheck: formTT.elements[key].canCheck, type: formTT.elements[key].type, hide: formTT.elements[key].hide, readonly: formTT.elements[key].readonly, writable: formTT.elements[key].writable, canHide: formTT.elements[key].canHide, canWrite: formTT.elements[key].canWrite, canReadOnly: formTT.elements[key].canReadOnly})
                                        }
                                        for (var k in formTT.buttons) {
                                            this.data1.push({no: k, name: formTT.buttons[k].name, canCheck: formTT.buttons[k].canCheck, status: formTT.buttons[k].status, function: formTT.buttons[k].function, function_id: formTT.buttons[k].function_id, mainOperate: formTT.buttons[k].mainOperate, feature: formTT.buttons[k].feature, show: formTT.buttons[k].show})
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            changeStatus (value) {
                for (let v of this.funcList) {
                    if (value == v.id) {
                        // 编辑
                        this.formInlineEdit.function = v.function
                        this.formInlineEdit.status = v.target_status
                        // 新增
                        this.formInline.function = v.function
                        this.formInline.status = v.target_status

                        this.statusName = v.status_name
                    }
                }
                this.defaultName = false
                this.changeName = true
            },
            // 获取环节功能
            getLinkAction () {
                ProcessManageHttp.getLinkAction().then((data) => {
                    this.funcList = data
                })
            },
            // 添加按钮
            addbtn () {
                let dataTime = 'EWF' + (new Date()).valueOf().toString().substr(0, 12)
                this.formInline.no = dataTime
                this.addBtn = true
                this.defaultName = true
                this.changeName = false
            },
            subBtn (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.data1.push({no: this.formInline.no, name: this.formInline.name, function: this.formInline.function, function_id: this.formInline.function_id, status: this.status, status_name: this.statusName, feature: '自添加', mainOperate: this.formInline.mainOperate, show: this.formInline.show})
                        this.$Message.success('添加成功!')
                        this.addBtn = false
                        this.cancel(name)
                    } else {
                        // this.$Message.error('表单必填项不能为空!')
                    }
                })
            },
            cancelBtn (formInline) {
                this.addBtn = false
                this.cancel(formInline)
            },
            // 编辑按钮
            edit (index) {
                this.index = index
                this.formInlineEdit.no = this.data1[index].no
                this.formInlineEdit.name = this.data1[index].name
                this.formInlineEdit.function_id = this.data1[index].function_id
                this.funcList.forEach((v) => {
                    if (v.id == this.formInlineEdit.function_id) {
                        this.formInlineEdit.function = v.function
                        this.formInlineEdit.status = v.target_status
                    }
                })
                this.statusName = this.data1[index].status_name
                this.formInlineEdit.mainOperate = this.data1[index].mainOperate
                this.formInlineEdit.show = this.data1[index].show
                this.editBtnModal = true
            },
            editBtn (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.data1[this.index].name = this.formInlineEdit.name
                        this.data1[this.index].function = this.formInlineEdit.function
                        this.data1[this.index].status_name = this.statusName
                        this.data1[this.index].function_id = this.formInlineEdit.function_id
                        this.data1[this.index].status = this.formInlineEdit.status
                        this.data1[this.index].mainOperate = this.formInlineEdit.mainOperate
                        this.data1[this.index].show = this.formInlineEdit.show
                        this.$Message.success('编辑成功!')
                        this.editBtnModal = false
                    } else {
                        // this.$Message.error('表单必填项不能为空!')
                    }
                })
            },
            // 删除
            remove (index) {
                this.index = index
                this.delBtnModal = true
            },
            cancelDelBtn () {
                this.delBtnModal = false
            },
            delBtn () {
                let index = this.index
                this.data1.splice(index, 1)
                this.delBtnModal = false
            },
            // 批量删除,批量隐藏
            selectchange (selection) {
                // let ids = []
                // for (var key in selection) {
                //     ids.push(key)
                // }
                this.select_ids = selection
            },
            delAllBtn () {
                if (this.select_ids.length != 0) {
                    for (let v of this.select_ids) {
                        this.data1.splice(v, 1)
                    }
                } else {
                    this.$Message.error('请选择要删除的按钮')
                }
            },
            // 批量隐藏
            allHide () {
                if (this.select_ids.length != 0) {
                    this.hideBtnsModal = true
                } else {
                    this.$Message.error('请选择要隐藏的按钮')
                }
            },
            hideBtn () {
                // for (let v of this.select_ids) {
                //
                // }
                for (var key in this.select_ids) {
                    this.data1[key].show = ''
                }
                // this.hideBtnsModal = false
            },
            // 提交表单
            handleSubmit () {
                for (let v of this.data) {
                    this.dataElements[v.no] = {name: v.name, type: v.type, canWrite: v.canWrite, canReadOnly: v.canReadOnly, canHide: v.canHide, writable: v.writable, readonly: v.readonly, hide: v.hide, canCheck: v.canCheck}
                }
                for (let v of this.data1) {
                    this.dataButton[v.no] = {name: v.name, function: v.function, function_id: v.function_id, status_name: v.status_name, status: v.status, feature: v.feature, mainOperate: v.mainOperate, show: v.show, canCheck: v.canCheck}
                }
                let formData = JSON.stringify({elements: this.dataElements, buttons: this.dataButton})
                ProcessManageHttp.addLinkForm({id: this.$route.params.linkid, form_id: this.selectGroup, form_detail: formData}).then((data) => {
                    this.$Message.success('编辑成功!')
                })
                location.href = '/#/processmanage/creatlink' + '/' + this.$route.params.id
            },
            // 按钮分页
            changepage1 (index) {
                var _start = (index - 1) * this.pageSize1
                var _end = index * this.pageSize1
                this.data1 = this.ajaxHistoryData1.slice(_start, _end)
            },
            // 表单元素
            changepage (index) {
                var _start = (index - 1) * this.pageSize
                var _end = index * this.pageSize
                this.data = this.ajaxHistoryData.slice(_start, _end)
            },
            // 清空表单
            cancel (formInline) {
                this.$refs[formInline].resetFields()
            },
            // 取消按钮
            cancelEditBtn () {
                this.editBtnModal = false
            },
            // 取消隐藏按钮
            cancelHideBtn () {
                this.hideBtnsModal = false
            }
        }
    }
</script>
