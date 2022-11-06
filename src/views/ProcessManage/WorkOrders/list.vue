<style>
    .PMtable .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .formBtns { padding-right: 0 !important; }
    .formBtns .btns { float: left; color: #3399FF; background-image: url(/static/images/ic_arrow@2x.png); background-size: 9px; background-repeat: no-repeat; background-position: right center; }
    .formBtns .btns.hide { background-image: url(/static/images/ic_arrow_2@2x.png); background-size: 9px; background-repeat: no-repeat; background-position: right center; }
</style>
<template>
    <div class="">
        <div class="innerheader" style="margin-top: 20px;">
            工单审批流程
        </div>
        <div style="margin: 28px 40px 0;">
            <Form style="display: none;" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
                <Row>
                    <Col span="18">
                        <Row>
                            <Col span="12">
                                <FormItem prop="user" label="流程名称">
                                    <Input type="text" v-model="formInline.user" placeholder="请输入流程名称"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem prop="status" label="状态">
                                    <Select v-model="formInline.status" placeholder="请选择">
                                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="otherInfo">
                            <Col span="12">
                                <FormItem prop="user" label="服务名称">
                                    <Input type="text" v-model="formInline.user" placeholder="请输入流程名称"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem prop="worktype" label="工单类型">
                                    <Select v-model="formInline.worktype" placeholder="请选择">
                                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem prop="addr" label="适用地点">
                                    <Select v-model="formInline.addr" multiple >
                                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem prop="addr" label="管理对象">
                                    <Select v-model="formInline.object" multiple >
                                        <OptionGroup label="Hot Cities">
                                            <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </OptionGroup>
                                        <OptionGroup label="Other Cities">
                                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </OptionGroup>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem prop="shang" label="供应商">
                                    <Select v-model="formInline.shang" filterable multiple >
                                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col span="6">
                       <FormItem class="formBtns">
                           <div style="margin-left: -80px; text-align: right">
                               <Button type="text" v-if="show" @click="showBtn" class="btns">展开</Button>
                               <Button type="text" v-if="hide" @click="hideBtn" class="btns hide">收起</Button>
                               <Button type="primary" @click="handleSubmit('formInline')" style="margin-right: 10px;">查&ensp;询</Button>
                               <Button type="ghost" @click="handleReset('formInline')">重&ensp;置</Button>
                           </div>
                       </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="t-head-bottom m-l-40">
            <Button type="primary" v-html="pri_btn_name" @click="addModal()"></Button>
            <Button type="ghost" @click="delbatch()">批量删除</Button>
        </div>
        <div class="datatable PMtable">
            <dataTableFlow :ifsearch="ifsearch" :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
            </dataTableFlow>
        </div>
        <!--查看-->
        <showInfoList ref="showInfoList"></showInfoList>
        <!--删除-->
        <delFlow ref="delFLow" :title="deltitle"></delFlow>
        <!--批量删除-->
        <delFlow ref="alldelFlow" :title="alldeltitle"></delFlow>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTableFlow from '@/components/dataTableFlow.vue'
    import showInfoList from './components/showInfoList.vue'
    // import editFlow from './components/editFlow.vue'
    import delFlow from './components/delFlow.vue'
    import ProcessManageHttp from 'server/http/processManage'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTableFlow, showInfoList, delFlow
        },
        created () {
            setTimeout(
                setTableItem, 2000
            )
        },
        data () {
            return {
                tablename: '工单审批流程',
                pri_btn_name: '新增',
                deltitle: '删除流程',
                alldeltitle: '批量删除流程',
                hasbtn: true,
                ifsearch: false,
                show: true,
                hide: false,
                otherInfo: false,
                url: ProcessManageHttp.map.getFlowList,
                value: '',
                select_ids: '',
                statusList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                cityList1: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    }
                ],
                cityList2: [
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                formInline: {
                    user: '',
                    status: '',
                    name: '',
                    worktype: '',
                    addr: [],
                    object: [],
                    shang: []
                },
                ruleInline: {},
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        sortable: true,
                        key: 'no'
                    },
                    {
                        title: '名称',
                        sortable: true,
                        key: 'name',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#3399FF',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.showInfo(params.row.id)
                                    }
                                }
                            }, params.row.name)
                        }
                    },
                    {
                        title: '状态',
                        sortable: true,
                        width: 130,
                        render: (h, params) => {
                            if (params.row.status == '0') {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '停用')
                            } else if (params.row.status == '1') {
                                return h('span', {
                                    style: {
                                        color: '#14AA64'
                                    }
                                }, '正常')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#9EA7B4'
                                    }
                                }, '过期')
                            }
                        }
                    },
                    {
                        title: '有效期',
                        sortable: true,
                        render: (h, params) => {
                            return h('span', params.row.starttime.slice(0, 10) + '-' + params.row.endtime.slice(0, 10))
                        }
                    },
                    {
                        title: '操作',
                        width: 120,
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.editFlow(params.row.id)
                                        }
                                    }
                                }, '编辑'),
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
            this.$emit('updateActive', '6-1')
            ProcessManageHttp.getFlowConfig().then((data) => {
                for (let v of data) {
                    if (v.summary == 1) {
                        this.columns.splice(3, 0, {title: v.name, sortable: true, key: v.field})
                    }
                }
            })
        },
        methods: {
            // 帅选条件
            showBtn () {
                this.hide = true
                this.show = false
                this.otherInfo = true
            },
            hideBtn () {
                this.hide = false
                this.show = true
                this.otherInfo = false
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.formInline)
                    } else {
                        this.$Message.error('Fail!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            // datatable
            showInfo (id) {
                this.$refs.showInfoList.open(id)
            },
            addModal () {
                location.href = '/#/processmanage/add'
            },
            editFlow (id) {
                location.href = '/#/processmanage/creatbasic/' + id
            },
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
            },
            delbatch () {
                if (this.select_ids.length != 0) {
                    this.$refs.alldelFlow.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的流程')
                }
            },
            remove (id) {
                this.$refs.delFLow.open(id)
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
            // addclose () {
            //     this.$refs.datatable.$emit('refresh', this.url)
            // }
        }
    }
</script>
