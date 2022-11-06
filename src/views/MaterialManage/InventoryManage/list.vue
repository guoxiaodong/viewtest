<style>
.materialBasic .inneritem {
    background-position-x: 41.72%;
}
.materialBasic label.active{
    color:blue;
}
.materialBasic div.ivu-table-cell{
    white-space:nowrap;text-overflow:ellipsis;
}
.materialBasic .ivu-icon.ivu-icon-search.ivu-input-icon.ivu-input-icon-normal{
    top:4px;
}
div.innercontent.materialBasic > div > div.ivu-col.ivu-col-span-14 > div.ivu-tabs.ivu-tabs-no-animation{
    overflow: visible;
}
</style>
<template>
    <div class="materialInventory">
        <div class="innerheader">
            出入库
        </div>
        <div class="innercontent materialBasic" >
            <Row class="inneritem" >
                <Col span="10">
                <div class="inneritem-head">物料目录：
                <Input v-model="searchTreeNode" placeholder="请输入搜索内容" icon="search" style="width: 200px;margin:1px;" @on-change="searchNode()"></Input>
                </div>
                <div id='materialCatalog' class='ztree' style="overflow: auto;" ></div>
                </Col>
                <Col  span="14">
                <div class="inneritem-head border-none">库存情况：
                    <Button class="addButton" type="primary" style="" @click="stockInOrOut('入库')">入库</Button>
                    <Button class="addButton" type="primary" style="" @click="stockInOrOut('出库')">出库</Button>
                </div>
                <Tabs :animated="false">
                    <TabPane label="概况">
                        <div class="time" style="position: relative;left: 50%;">
                            <label class="choice active" v-on:click="chooseTime">本周</label>
                            <label class="choice" v-on:click="chooseTime">本月</label>
                            <Date-picker :value="value" :editable="false" type="daterange" size="small" placement="bottom-end" placeholder="选择日期"  @on-change="handleChange" style="width: 200px"></Date-picker>
                        </div>
                        <div id="mychart" style="width: 100%;height:400px;"></div>
                    </TabPane>
                    <TabPane label="明细">
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
                    </TabPane>
                </Tabs>
                </Col>
            </Row>
        </div>
        <!--查看出入库记录-->
        <InventoryDetails  ref="InventoryDetails" ></InventoryDetails>
        <!--出入库-->
        <stockInOrOut  ref="stockInOrOut" @refresh="refresh"></stockInOrOut>
    </div>
</template>
<script>
    import store from '@/store'
    import * as types from '@/store/mutation-types'
    import router from '@/router'
    import $ from 'jquery'
    import MaterialHttp from 'server/http/materialBasic'
    import ztree from '@/mixins/ztree'
    import ztreeSearch from '@/mixins/ztreeSearch'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    import dataTableChoose from '@/components/dataTableChoose.vue'
    import resize from '@/mixins/resize'
    require('static/css/tree.css')
    import echarts from 'static/plugin/echarts/echarts.js'
    import InventoryDetails from './components/inventoryDetails.vue'
    import stockInOrOut from './components/stockInOrOut.vue'
    export default {
        components: {
            dataTableChoose,
            InventoryDetails,
            stockInOrOut
        },
        mixins: [resize, ztree, ztreeSearch],
        created () {
            this.$emit('updateActive', '4-2')
            if (!sessionStorage.getItem('userId')) {
                store.commit(types.LOGOUT)
                router.replace({
                    path: '/',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
        },
        data () {
            return {
                value: [],
                searchTreeNode: '',
                ztreeObj: '',
                choosetime: false,
                setting: {
                    treeId: 'func',
                    data: {
                        key: {
                            children: 'objecttypes'
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
                        selectedMulti: false
                    }
                },
                columns: [
                    {
                        title: '批次',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'change_stock'
                    },
                    {
                        title: '时间',
                        align: 'center',
                        key: 'created_at'
                    },
                    {
                        title: '记录类型',
                        align: 'center',
                        key: 'io'
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
                                            this.openDetail(params.row.id)
                                        }
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ],
                data: [],
                url: '/materiel/materielstockdetail/',
                ifsearch: true,
                treeNode: {},
                echarts: false,
                material: {}
            }
        },
        mounted () {
            this.treeInt()
            $('.choice.active').click()
        },
        methods: {
            aaa () {
                alert('')
            },
            // 时间选择
            chooseTime: function (e) {
                $('.materialBasic label.choice').removeClass('active')
                $(e.target).addClass('active')
                var d = new Date()
                var d1 = new Date()
                var d2 = new Date()
                var d3 = new Date()
                var d4 = new Date()
                var d5 = new Date()
                var d6 = new Date()
                d1.setTime(d.setHours(0, 0, 0))
                d2.setTime(d.setHours(23, 59, 59))
                d3.setTime(d.getTime(d.setHours(0, 0, 0)) - 3600 * 1000 * 24 * (d.getDay() - 1))
                d4.setTime(d.getTime(d.setHours(23, 59, 59)) + 3600 * 1000 * 24 * (7 - d.getDay()))
                d5.setTime(d.getTime(d.setHours(0, 0, 0)) - 3600 * 1000 * 24 * (d.getDate() - 1))
                if (new Date().getMonth() == 11) {
                    var month = 0
                    var year = new Date().getFullYear() + 1
                } else {
                    month = new Date().getMonth() + 1
                    year = new Date().getFullYear()
                }
                d = new Date(year, month, 1)
                d6.setTime(d.getTime(d.setHours(23, 59, 59)) - 3600 * 1000 * 24)
                if (e.target.textContent == '本周') { this.value = [d3, d4] } else
                if (e.target.textContent == '本月') {
                    this.value = [d5, d6]
                }
                setTimeout(this.echartsInt, 500)
            },
            handleChange: function (date) {
                this.value = date
                $('.materialBasic label.choice').removeClass('active')
                setTimeout(this.echartsInt, 500)
            },
            zTreeBeforeClick (treeId, treeNode, clickFlag) {
                console.log(treeNode)
                if (treeNode.level != 3) {
                    return false
                }
                var v4 = treeNode
                var v3 = treeNode.getParentNode()
                var v2 = v3.getParentNode()
                var v1 = v2.getParentNode()
                var material = {}
                material.Id = v1.id + ',' + v2.id + ',' + v3.id + ',' + v4.id
                material.order = v4.is_ordered
                material.unit = v4.unit
                this.material = material
            },
            zTreeOnClick (event, treeId, treeNode) {
                if (treeNode.level != 3) {
                    return
                }
                this.treeNode = treeNode
                this.echartsInt()
                this.tableInt()
            },
            // echarts初始化
            echartsInt () {
                if (this.treeNode.warehouse_id == 0 || !this.treeNode.warehouse_id) {
                    return
                }
                var Edata = {
                    edata: []
                } // 展示数据
                // 事件处理
                var a = $('input.ivu-input.ivu-input-small')
                var time = a[0].value.split(' - ')
                var data = {
                    startday: time[0],
                    endday: time[1],
                    specification_id: this.treeNode.id
                }
                var dataX = []
                var showtime = []
                function getDate (datestr) {
                    var temp = datestr.split('-')
                    var date = new Date(temp[0], temp[1] - 1, temp[2])
                    return date
                }
                var startTime = getDate(data.startday)
                var endTime = getDate(data.endday)
                while ((endTime.getTime() - startTime.getTime()) >= 0) {
                    var year = startTime.getFullYear()
                    var week = '周' + '日一二三四五六'.charAt(startTime.getDay())
                    var month = (startTime.getMonth() + 1).toString().length == 1 ? '0' + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1)
                    var day = startTime.getDate().toString().length == 1 ? '0' + startTime.getDate() : startTime.getDate()
                    dataX.push(month + '-' + day + week)
                    startTime.setDate(startTime.getDate() + 1)
                    showtime.push(year + '-' + month + '-' + day)
                }
                MaterialHttp.inventoryBasic(this.treeNode.warehouse_id, data).then((data) => {
                    Edata.now = 0
                    for (var v in data) {
                        if (data[v].data) {
                            Edata.edata.push(data[v].data.stock)
                            Edata.now = data[v].data.stock
                        } else {
                            Edata.edata.push({})
                        }
                    }
                    // echarts部分
                    if (!this.echarts) {
                        var myChart = echarts.init(document.getElementById('mychart'))
                        this.echarts = myChart
                    } else {
                    }
                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            enterable: true, // 鼠标是否可以进入悬浮框中
                            trigger: 'axis',
                            axisPointer: {   // 坐标轴指示器，坐标轴触发有效
                                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params) {
                                if (data[params[0].dataIndex].data) {
                                    var relVal = showtime[params[0].dataIndex] + '<br/>'
                                    relVal += '库存量' + data[params[0].dataIndex].data.stock + '<br/>'
                                    if (data[params[0].dataIndex].data.io != 2) {
                                        relVal += '入库量' + data[params[0].dataIndex].data.putwarechang_stock + '<br/>'
                                        relVal += '出库量' + data[params[0].dataIndex].data.outwarechang_stock + '<br/>'
                                    }
                                    return relVal
                                }
                            }
                        },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: dataX
                        }],
                        yAxis: {},
                        series: [{
                            markLine: {
                                label: {
                                    normal: {
                                    }
                                },
                                data: [{
                                    name: '现库存量',
                                    yAxis: Edata.now,
                                    label: {
                                        normal: {
                                            position: 'end',
                                            formatter: '{b}:\n    {c}'
                                        }
                                    }
                                }]
                            },
                            name: '销量',
                            type: 'line',
                            smooth: 'true',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default'
                                    }
                                }
                            },
                            data: Edata.edata
                        }]
                    }
                    // 使用刚指定的配置项和数据显示图表。
                    this.echarts.setOption(option)
                    /*
                     *echarts结束
                     *
                     */
                })
            },
            // 新增，修改物料信息
            openDetail (type, id) {
                if (!id) {
                    id = this.treeNode.id
                }
                this.$refs.InventoryDetails.open(type, id)
            },
            stockInOrOut (type, materialInfo) {
                this.$refs.stockInOrOut.open(type, this.material)
            },
            // 初始树形图
            treeInt () {
                MaterialHttp.inventoryCatalog().then((data) => {
                    this.ztreeObj = $.fn.zTree.init($('#materialCatalog'), this.setting, data)

                    this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('tId', 'materialCatalog_3'))

                    // 默认的打开详情
                    let node = this.ztreeObj.getNodeByParam('tId', 'materialCatalog_4')
                    $('a#' + node.tId + '_a').click()
                })
                document.getElementById('materialCatalog').style.height = (document.body.clientHeight - 213) + 'px'
            },
            // 初始列表
            tableInt () {
                if (!this.treeNode.id) {
                    return
                }
                this.url = '/materiel/materielstockdetail/' + this.treeNode.id
                this.$refs.datatable.list()
            },
            onResize () {
                document.getElementById('materialCatalog').style.height = (document.body.clientHeight - 213) + 'px'
            },
            searchNode () {
                var nodes = this.ztreeObj.transformToArray(this.ztreeObj.getNodes())
                this.ztreeSearch(this.ztreeObj, nodes, this.searchTreeNode)
            },
            refresh () {
                this.echartsInt()
                this.tableInt()
                this.treeInt()
            }
        }
    }
</script>
