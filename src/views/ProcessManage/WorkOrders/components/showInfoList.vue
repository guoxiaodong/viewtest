<style>
    .container { position: relative;}
    .basicInfo { font-size: 14px; color: #657180; line-height: 35px; padding: 30px 0 70px;}
    .basicInfo label { margin-left: 80px; width: 70px; display: inline-block; text-align: justify; text-align-last: justify; }
    .PMtable .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .node rect {
        stroke: #333;
        fill: #999;
    }
    .edgePath path {
        stroke: #333;
        fill: #333;
        stroke - width: 1.5px;
    }
</style>
<template>
    <Modal
        v-model="show"
        title="FM计划工单处理流程"
        :styles="{width: '90%'}"
        @on-cancel="cancel">
        <div>
            <div style="margin-left: 40px; margin-right: 40px;" class="container" :id="d3Parent">
                <Tabs :value="tabsActivity" :animated="false"  @on-click="flowChartDraw">
                    <TabPane label="基本信息" name="baseinfo">
                        <Row class="basicInfo">
                            <Col>
                                <label>工单编号</label>：{{this.no}}
                            </Col>
                            <Col>
                                <label>工单名称</label>：{{this.name}}
                            </Col>
                            <Col v-for="(item, index) in FlowInfo" :key="item.index">
                                <label>{{item.name}}</label>：{{item.field}}
                            </Col>
                            <Col>
                                <label>流程状态</label>：{{this.status}}
                            </Col>
                            <Col>
                                <label>生效时间</label>：{{this.starttime}} - {{this.endtime}}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="环节" name="link">
                        <div class="PMtable">
                            <dataTable :ifsearch="ifsearch" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                            </dataTable>
                        </div>
                    </TabPane>
                    <TabPane label="流程预览" name="flowchart" >
                        <div class="hideOne"></div>
                        <div class="flow-chart"></div>
                        <!-- <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">
                            <div v-for="jtknode in node"
                                 class="window jtk-node {{jtknode.className}}"
                                 id="LCTNODE{{jtknode.id}}"
                                 style="{{jtknode.style}}"
                                 @click="open(jtknode)">
                                <strong>{{jtknode.label}}</strong>
                            </div>
                        </div> -->
                        <div class="fill-height" >
                            <!-- demo -->
                            <!-- <div class="relative" id="canvas" style="width:1000px;height:1000px;">
                                <div class="block" id="LCTNODE1"><strong>1</strong></div>
                                <div class="block" id="LCTNODE2"><strong>2</strong></div>
                                <div class="block" id="LCTNODE3"><strong>3</strong></div>
                                <div class="block" id="LCTNODE4"><strong>4</strong></div>
                				<div class="block" id="LCTNODE5"><strong>5</strong></div>
                            </div> -->
                            <!-- /demo -->
                            <!-- <div class="jsp-mask"></div> -->
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <div class="formbtns">
            <div class="item">
                <Button type="ghost" @click="cancel()">关&emsp;闭</Button>
                <!-- <Button type="primary" @click="confirm()">确&emsp;定</Button> -->
            </div>
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable'
    import ProcessManageHttp from 'server/http/processManage'
    import CommonHttp from 'server/http/common'
    import { FlowChart } from 'static/plugin/flowChart/flowChart'
    require('static/css/modal.css')
    require('static/css/flowchart.css')
    export default {
        components: {
            dataTable
        },
        data () {
            return {
                tabsActivity: 'baseinfo',
                d3Parent: 'a' + $.now(),
                sfield: '',
                ssfield: '',
                show: false,
                ifsearch: false,
                id: '',
                url: ProcessManageHttp.map.getLinkList + '/0',
                no: '',
                name: '',
                status: '',
                starttime: '',
                endtime: '',
                FlowInfo: [],
                columns: [
                    {
                        title: '编号',
                        sortable: 'custom',
                        key: 'no'
                    },
                    {
                        title: '名称',
                        sortable: 'custom',
                        key: 'name'
                    },
                    {
                        title: '工单状态',
                        sortable: true,
                        key: 'wo_status',
                        render: (h, params) => {
                            for (let i = 0; i < this.wo_status.length; i++) {
                                if (this.wo_status[i].id == params.row.wo_status) {
                                    return h('span', this.wo_status[i].name)
                                }
                            }
                        }
                    }
                ],
                data: []
            }
        },
        created () {
            setTimeout(
                setTableItem, 300
            )
            this.$emit('updateActive', '5-1')
            // 获取工单状态
            CommonHttp.getConfig().then((data) => {
                this.wo_status = data['WORKORDER_STATUS']
            })
        },
        methods: {
            open (id) {
                this.id = id
                this.show = true
                this.showFlowInfo(id)
//                this.getFlowConfig()
                this.getLinkConfig()
                this.url = ProcessManageHttp.map.getLinkList + '/' + this.id
                setTimeout(() => {
                    this.$refs.datatable.refresh(this.url)
                }, 500)
                this.flowChartDraw(this.tabsActivity)
            },
            flowChartDraw (tabsName) {
                this.tabsActivity = tabsName
                if (tabsName !== 'flowchart') {
                    this.hidePopup()
                    return
                }

                const conf = {
                    container: '.flow-chart',
                    d3Parent: '#' + this.d3Parent,
                    height: 700,
                    width: '100%'
                }

                setTimeout(() => {
                    if (this.flowChart) {
                        this.flowChart.clear()
                    } else {
                        this.flowChart = new FlowChart(conf)
                    }
                    // 获取流程图信息
                    ProcessManageHttp.getFlowChart(this.id).then((data) => {
                        let _ = this._
                        if (!_.isEmpty(data) && _.has(data, 'nodes') && _.has(data, 'edges') && data.nodes.length) {
                            this.flowChart.draw(data)
                        }
                    })
                }, 0)
            },
            hidePopup () {
                if (this.flowChart) {
                    this.flowChart.hidePopup()
                }
            },
            // 获取流程信息
            showFlowInfo (id) {
                ProcessManageHttp.showFlowInfo(id).then((data) => {
                    this.no = data.no
                    this.name = data.name
                    if (data.status == 0) {
                        this.status = '停用'
                    } else if (data.status == 1) {
                        this.status = '正常'
                    } else {
                        this.status = '过期'
                    }
                    this.starttime = data.starttime.slice(0, 10)
                    this.endtime = data.endtime.slice(0, 10)
                    ProcessManageHttp.getFlowConfig().then((sdata) => {
                        for (let v of sdata) {
                            this.sfield = v.field.toString()
                            for (let sv of JSON.parse(data[this.sfield])) {
                                this.ssfield += sv.name + ','
                            }
                            this.ssfield = this.ssfield.slice(0, -1)
                            this.FlowInfo.push({name: v.name, field: this.ssfield})
                        }
                    })
                })
            },
            // 获取流程配置文件
            getFlowConfig () {
                ProcessManageHttp.getFlowConfig().then((data) => {
                    for (let v of data) {
                        this.FlowInfo.push({name: v.name, field: v.field.toString()})
                    }
                })
            },
            // 获取环节配置信息
            getLinkConfig () {
                ProcessManageHttp.getLinkConfig().then((data) => {
                    for (let v of data) {
                        if (v.summary == 1) {
                            this.columns.splice(3, 0, {title: v.name, sortable: true, key: v.field.toString()})
                        }
                    }
                })
            },
            cancel () {
                this.show = false
                this.FlowInfo = []
                this.flowChart.clear()
            }
        }
    }
</script>
