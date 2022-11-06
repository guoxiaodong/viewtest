<style>
    detail-card{
        margin:auto;

    }
    .detail-card .card{
        padding:30px;
        padding-top: 21px;
        padding-bottom: 0;
        margin:auto;
    }
    img.detailImg{
        height: 100px;
    }
    .img-room,.img-room img{
        display: inline-block;
    }
    .detail-card table td{
       padding:3px;
        font-size: 14px;
    }
    .detail-card table td:nth-child(odd){
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #657180;
        font-weight: 600;
    }
    .detail-card table td:nth-child(even){
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #657180;
    }
    .workorder-details table td:nth-child(odd) span{
        display: inline-block;
        width: 65%;
        text-align-last: justify;
    }
    .detail-card .ivu-card-head{
        background-color:#f3f3f3;
    }
    .order-details .detail-card .detail-title{
        padding: 0px 0 14px 18px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #657180;
        line-height: 21px;
    }
    .detail-card .detail-end{
        margin-top: 8px;
    }
    .order-details .detail-title{
        border-bottom: 1px solid #9EA7B4;
    }
    .order-details .detail-title-info{
        padding-top: 28px;
        padding-left: 30px;
        margin-bottom: 0px;
        font-size: 14px;
    }
    .order-details .detail-title-info span{
       color:gray;
    }
    .order-details img{
        margin-right:16px;
        width:70px;
        height:70px;
    }
    .order-details .title-time{
        margin-right: 122px;
    }
    .order-details .title-priority{
        margin-right: 150px;
    }
    .detail-card .ivu-card-head{
        background-color:#F5F7F9;
        padding:9px 9px 11px 9px;
    }
    .detail-card .ivu-card-head p{
        font-family: PingFangSC-Medium;
        font-size: 14px!important;
        color: #464C5B;
        line-height: 20px;
    }
    .ivu-card-body table td{
        padding:7px 0px;
    }
    .deal-finish{
        background-color: #F5F7F9;
        margin-left: -16px;
        margin-right: -16px;
        height: 40px;
        margin-top: 30px;
        margin-bottom: 19px;
    }
    .deal-finish p{
        padding:10px 0 10px 9px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #464C5B;
        line-height: 20px;
        font-weight: 700;
    }
    .order-details .ivu-timeline{
        margin-top: 22px;
        margin-left: 4px;
    }
    .order-details .record-content{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #657180;
        letter-spacing: 0;
        float:left;
        width: 20%;
    }
    .order-details .record-comment{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9EA7B4;
        letter-spacing: 0;
        position: absolute;
        left: 30%;
        width: 40%;
    }
    .order-details .record-time{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #A4AAB3;
        letter-spacing: 0;
        float: right;
        margin-right: 5%;
    }
    .order-details .ivu-timeline-item{
        padding-bottom: 45px;
    }
    .supplier-text {
        font-family: PingFangSC-Medium;
        font-size: 14px!important;
        color: #464C5B;
        line-height: 20px;
        font-weight: 600;
    }
    hr.supplier{
        border: none;
        border-top: 1px solid #cccccc;
        height: 0;
        margin-left: 86px;
        margin-right: 1px;
        margin-top: -10px;
        margin-bottom: 11px;
    }
</style>
<template>
    <Modal  v-model="show" title='' :styles="{width: '85%'}" @on-cancel="cancel()">
       <div class="order-details workorder-details">
        <div class="detail-card">
           <div class="detail-title">{{data.title}}</div>
            <div class="detail-title-info"><span class="title-time">{{data.created_at}}</span>   <span class="title-priority">优先级：{{data.priority_name}} </span>  <span> 状态：</span>{{data.status_name}}</div>
        <div class="card"> <card>
            <p slot="title">
                基础信息
            </p>

                <table border="0" width="100%">
                    <tr>
                        <td width="15%"><span>计划开始时间</span>：</td>
                        <td width="40%"><span v-if="data.planstart">{{data.planstart }}</span></td>
                        <td width="12%"><span>岗位</span>：</td>
                        <td ><span v-if="data.profession && data.profession.name">{{data.profession.name }}</span></td>
                    </tr>
                    <tr>
                        <td width="15%"><span>计划完成时间</span>：</td>
                        <td><span v-if="data.planfinish">{{data.planfinish }}</span></td>
                        <td width="12%"><span>当前处理人</span>：</td>
                        <td ><span v-if="data.operator && data.operator.name">{{data.operator.name }}</span></td>
                    </tr>
                    <tr>
                        <td width="15%" valign="top"><span>空间地点</span>：</td>
                        <td colspan="3"><span v-if="data.sites.length"> <span v-for="site in data.sites "><span v-if="site==data.sites[data.sites.length-1]">{{site.shortname }}</span><span v-else>{{site.shortname }} / </span></span></span></td>
                    </tr>
                    <tr>
                        <td width="10%" valign="top"><span>管理对象</span>：</td>
                        <td colspan="3"><span v-if="data.objects.length"><span v-for="object in data.objects "><span v-if="object==data.objects[data.objects.length-1]">{{object.name }}</span><span v-else>{{object.name }} / </span></span></span></td>
                    </tr>
                    <tr>
                        <td width="10%"><span>描述</span>：</td>
                        <td colspan="3"><span v-if="data.description">{{data.description }}</span><span v-else>无</span></td>
                    </tr>
                    <tr>
                        <td width="10%" valign="top"><span>图片</span>：</td>
                        <td colspan="3"><div id="img1" class="img-room" v-if="data.images0.length"> <div class="img-room" v-for="image in data.images0"><img class="detailImg" v-bind:src="image.url" /></div></div><div v-else>无</div></td>
                    </tr>
                </table>
            <div v-if="(data.status == 4) || (data.status == 5) ||(data.status == 6)">
            <div class="deal-finish">
                <p>
                    处理结果
                </p>
            </div>
                <table class="detail-end"  border="0" width="100%" >

                <tr>
                    <td width="15%"><span>实际开始时间</span>：</td>
                    <td width="40%"><span v-if="data.realstart"> {{data.realstart }}</span><span v-else>无</span></td>
                    <td width="10%"><span>处理人</span>：</td>
                    <td colspan="3"><span v-if="data.operator && data.operator.name"> {{data.operator.name }}</span><span v-else>无</span></td>
                </tr>
                <tr>
                    <td width="15%"><span>实际完成时间</span>：</td>
                    <td> <span v-if="data.realfinish">{{data.realfinish }}</span><span v-else>无</span></td>
                    <td width="10%"><span>协作人</span>：</td>
                    <td colspan="3"><span v-if="data.associates && data.associates.length"><span v-for="associate in data.associates ">{{associate.user.name }}{{associate.laborhour}}分钟 <br/> </span></span><span v-else>无</span></td>
                </tr>
                <tr>
                    <td width="15%" valign="top"><span>图片</span>：</td>
                    <td colspan="3"><div id="img2" class="img-room" v-if="data.images1 && data.images1.length"> <div  class="img-room" v-for="image in data.images1"><img class="detailImg" v-bind:src="image.url" /></div></div><span v-else>无</span></td>
                </tr>
                <tr>
                    <td width="15%"><span>消耗物品</span>：</td>
                    <td colspan="3">
                        <span v-if="data.consumables && data.consumables.length">
                          <span v-for="consumable in data.consumables ">{{consumable.name }}{{consumable.pivot.number}} <br/>
                          </span>
                        </span>
                        <span v-else>无</span>
                    </td>
                </tr>
                <tr>
                    <td width="10%"><span>遗留问题</span>：</td>
                    <td colspan="3"><span v-if="data.issues && data.issues.length"><span v-for="issue in data.issues ">{{issue.title }} <br/> </span></span><span v-else>无</span></td>
                </tr>
            </table>
            </div>
        </card></div>
        <div class="card"><card>
            <p slot="title">
                <span>来源</span>
            </p>
            <table border="0" width="100%" v-if="data.source_name=='计划'">
                <tr>
                    <td width="11%"><span>类型</span>：</td>
                    <td width="44%"><span v-if="data.source_name">{{data.source_name }}</span></td>
                    <td width="11%"><span>发起者</span>：</td>
                    <td ><span v-if="data.source && data.source.creator && data.source.creator.name">{{data.source.creator.name }}</span></td>
                </tr>
                <tr>
                    <td ><span>生效时间</span>：</td>
                    <td ><span v-if="data.source && data.source.effecttime">{{data.source.effecttime }}</span></td>
                    <td ><span>周期</span>：</td>
                    <td ><span v-if="data.source && data.source.period_name">{{data.source.period_name }}</span></td>
                </tr>
                <tr>
                    <td ><span>失效时间</span>：</td>
                    <td ><span v-if="data.source && data.source.invalidtime">{{data.source.invalidtime }}</span></td>
                    <td><span>描述</span>：</td>
                    <td ><span v-if="data.source && data.source.note">{{data.source.note }}</span><span v-else>无</span></td>
                </tr>
            </table>
            <table border="0" width="100%" v-else>
                <tr>
                    <td width="11%"><span>类型</span>：</td>
                    <td width="44%"><span v-if="data.source_name">{{data.source_name }}</span></td>
                    <td width="11%"><span>发起者</span>：</td>
                    <td ><span v-if="data.source && data.source.creator && data.source.creator.name">{{data.source.creator.name }}</span></td>
                </tr>
                <tr>
                    <td ><span>登记时间</span>：</td>
                    <td ><span v-if="data.source && data.source.creator">{{data.source.created_at }}</span></td>
                    <td ><span>状态</span>：</td>
                    <td ><span v-if="data.source && data.source.status_name">{{data.source.status_name }}</span></td>
                </tr>
                <tr>
                    <td><span>描述</span>：</td>
                    <td colspan="3"><span v-if="data.source && data.source.description">{{data.source.description }}</span><span v-else>无</span></td>
                </tr>
            </table>
        </card> </div>
            <div class="card"  v-if="data.supplier"><card>
                <p slot="title">
                    <span>供应商服务</span>
                </p>
                <table border="0" width="100%" >
                    <tr>
                        <td width="15%" valign="top"><span>供应商</span>：</td>
                        <td colspan="3"><span> {{data.supplier.name}}</span></td>
                    </tr>
                    <tr>
                        <td width="10%" valign="top"><span>服务</span>：</td>
                        <td colspan="3"><span> {{data.supplier_service.title}}</span></td>
                    </tr>
                </table>
                <span class="supplier-text">服务项及价格</span><hr class="supplier">
                <Table :columns="columns1" :data="data1"></Table>
            </card> </div>
        <div class="card"><card>
            <p slot="title">
                状态追踪
            </p>
            <Timeline>
                <TimelineItem v-if="data.records && data.records.length" v-for="record in data.records" :key="record.id">
                    <span class="record-content">{{record.handler.name}} &nbsp;&nbsp; {{record.status_name}}</span>
                    <span class="record-comment">{{record.comment}}</span>
                    <span class="record-time">{{record.created_at}}</span>
                </TimelineItem>
            </Timeline>
        </card> </div>
       </div>
      </div>
    </Modal>

</template>
<script>
    import $ from 'jquery'
    import { URL } from '@/config/index'
    import WorkOrderHttp from 'server/http/workOrder'
  //  require('static/plugin/viewer/js/viewer.min.js')
    require('static/plugin/viewer/css/viewer.min.css')
    import Viewerd from 'static/plugin/viewer/js/viewer.min.js'
    export default {
        mounted () {
            $('div.ivu-modal-footer').css('display', 'none')
        },
        components: {
        },
        data () {
            return {
                show: false,
                dataFor: {
                    planstart: '',
                    planfinish: '',
                    profession: {
                        name: ''
                    },
                    operator: {
                        name: '',
                        created_at: '',
                        status_name: ''
                    },
                    source_name: '',
                    status_name: '',
                    sites: [
                        {site: {
                            name: ''
                        }
                        }
                    ],
                    objects: {
                        name: ''
                    },
                    description: '',
                    realstart: '',
                    realfinish: '',
                    consumables: [
                        {name: ''
                        }
                    ],
                    issues: [{
                        title: ''
                    }],
                    associates: {
                        user: {
                            name: ''
                        }
                    },
                    source: {
                        creator: {
                            name: ''
                        }
                    },
                    records: [],
                    images0: [
                    ],
                    images1: [
                    ]
                },
                data: {
                    planstart: '',
                    planfinish: '',
                    profession: {
                        name: ''
                    },
                    operator: {
                        name: '',
                        created_at: '',
                        status_name: ''
                    },
                    source_name: '',
                    status_name: '',
                    sites: [
                        {site: {
                            name: ''
                        }
                        }
                    ],
                    objects: {
                        name: ''
                    },
                    description: '',
                    realstart: '',
                    realfinish: '',
                    consumables: [
                        {name: ''
                        }
                    ],
                    issues: [{
                        title: ''
                    }],
                    associates: {
                        user: {
                            name: ''
                        }
                    },
                    source: {
                        creator: {
                            name: ''
                        }
                    },
                    records: [],
                    images0: [
                    ],
                    images1: [
                    ]
                },
                img: [],
                viewer1: 1,
                viewer2: 1,
                columns1: [
                    {
                        title: '名称',
                        key: 'price_name',
                        align: 'center'
                    },
                    {
                        title: '规格',
                        key: 'specific',
                        align: 'center'
                    },
                    {
                        title: '在最小计价数',
                        key: 'unit',
                        align: 'center'
                    },
                    {
                        title: '单价',
                        key: 'price',
                        align: 'center'
                    },
                    {
                        title: '数量',
                        key: 'number',
                        align: 'center'
                    },
                    {
                        title: '价格',
                        key: 'total_price',
                        align: 'center'
                    }
                ],
                data1: []
            }
        },
        methods: {
            open (id) {
                this.data = this.dataFor
                this.axios.get(URL + WorkOrderHttp.map.workDetail + '/' + id).then((response) => {
                    return response.data
                }).then((data) => {
                    if (this.data == {}) {
                        this.$Message.error('该数据不存在')
                    } else {
                        if (data.price_columns.length > 0) {
                            this.data1 = data.price_columns
                        }
                        data.records.reverse()
                        this.data = data
                        data.images0 = []
                        data.images1 = []
                        if (data.images[0]) {
                            for (var k in data.images) {
                                if (data.images[k].type == 0) { this.data.images0.push(data.images[k]) }
                                if (data.images[k].type == 1) { this.data.images1.push(data.images[k]) }
                            }
                        }
                        setTimeout(() => {
                            if (document.getElementById('img1')) {
                                this.viewer1 = new Viewerd(document.getElementById('img1'))
                                this.img.push(this.viewer1)
                            }
                            if (document.getElementById('img2')) {
                                this.viewer2 = new Viewerd(document.getElementById('img2'))
                                this.img.push(this.viewer2)
                            }
                        }, 500)
                    }
                }).catch((error) => {
                    this.$Message.error(error.error)
                })
                this.show = true
            },
            // 取消按钮
            cancelSubmit () {
                if (this.viewer1 !== 1) {
                    this.viewer1.destroy()
                }
                if (this.viewer2 !== 1) {
                    this.viewer2.destroy()
                }
                this.$parent.refresh()
                this.show = false
            },
            // 模态框关闭
            cancel () {
                if (this.viewer1 !== 1) {
                    this.viewer1.destroy()
                }
                if (this.viewer2 !== 1) {
                    this.viewer2.destroy()
                }
                this.$parent.refresh()
                this.show = false
            }
        }
    }
</script>
