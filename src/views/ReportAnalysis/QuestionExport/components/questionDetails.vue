<style>
    detail-card{
        margin:auto;

    }
    .detail-card .card{
        padding:30px;
        padding-top: 21px;
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
        color:#657180;
        font-family: PingFangSC-Medium;
    }
    .question-details .detail-card table td:nth-child(odd) span{
        display: inline-block;
        width: 65%;
        text-align-last: justify;
    }
    .detail-card table td:nth-child(even){
        color:#657180;
        font-family: PingFangSC-Regular;
    }
    .detail-card .ivu-card-head{
        background-color:#F5F7F9;
        padding:9px 9px 11px 9px;
    }
    .detail-card .ivu-card-head p{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #464C5B;
        line-height: 20px;
    }
    .ivu-modal-body{
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .detail-card .detail-title{
        padding-left:18px;
        padding-bottom: 14px;
        font-size: 16px;
        line-height: 21px;
        font-weight: bold;
        font-family: PingFangSC-Medium;
        color:#657180;
    }
    .order-details .title-time{
        margin-right: 122px;
    }
    .order-details .title-priority{
        margin-right: 94px;
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
    .order-details .workorder-title{
        font-size: 15px;
        margin-bottom:8px;
    }
    div.time-line.card{
        padding-top: 0px;
        margin-top: -8px;
    }
    .ivu-card-body table{
        padding:19px 0 44px 20px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #657180;
        line-height: 20px;
    }
    .ivu-card-body table td{
        padding:10px 0px;
    }
    .ivu-card-body table .table-owner{
        width: 60px;
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
</style>
<template>
    <Modal  v-model="show" title='' :styles="{width: '85%'}" @on-cancel="cancel()">
        <div class="order-details question-details">
            <div class="detail-card">
                <div class="detail-title">{{data.title}}</div>
                <div class="detail-title-info"><span class="title-time">{{data.created_at}}</span> &nbsp;  <span class="title-priority">紧急程度： {{data.serious_name}}</span>  &nbsp; <span> 状态：</span>{{data.status_name}}</div>
                <div class="card"> <card dis-hover>
                    <p slot="title">
                        基础信息
                    </p>

                    <table border="0" width="100%">
                        <tr>
                            <td width="10%"><span>登记时间</span>：</td>
                            <td width="28%"><span v-if="data.created_at">{{data.created_at }}</span></td>
                            <td width="10%" ></td>
                            <td ></td>
                        </tr>
                        <tr>
                            <td width="8%"><span style="width: auto">登记人</span>：</td>
                            <td width="20%"><span v-if="data.creator && data.creator.name">{{data.creator.name }}</span></td>
                            <td width="10%" class="table-owner"><span style="width: auto">负责人</span>：</td>
                            <td ><span v-if="data.owner && data.owner.name">{{data.owner.name }}</span></td>
                        </tr>
                        <tr>
                            <td width="10%" valign="top"><span>空间地点</span>：</td>
                            <td colspan="3"><span v-if="data.sites && data.sites.length"> <span v-for="site in data.sites "><span v-if="site==data.sites[data.sites.length-1]">{{site.shortname }}</span><span v-else>{{site.shortname }} / </span></span></span></td>
                        </tr>
                        <tr>
                            <td width="10%" valign="top"><span>管理对象</span>：</td>
                            <td colspan="3"><span v-if="data.objects && data.objects.length"><span v-for="object in data.objects "><span v-if="object==data.objects[data.objects.length-1]">{{object.name }}</span><span v-else>{{object.name  }} / </span></span></span></td>
                        </tr>
                        <tr>
                            <td width="10%"><span>描述</span>：</td>
                            <td colspan="3"><span v-if="data.description">{{data.description }}</span><span v-else>无</span></td>
                        </tr>
                        <tr v-if="data.reason">
                            <td width="10%"><span>原因</span>：</td>
                            <td colspan="3"><span >{{data.reason }}</span></td>
                        </tr>
                        <tr v-if="data.solution">
                            <td width="10%"><span>解决方案</span>：</td>
                            <td colspan="3"><span >{{data.solution }}</span></td>
                        </tr>
                    </table>
                </card></div>
                <div class="card time-line" v-if="data.workorders && data.workorders.length" v-for="workorder in data.workorders" :key="workorder.id">
                    <card dis-hover>
                    <p slot="title">
                        工单进度 &nbsp; [<span class="workorder-title">{{workorder.title}}</span>]
                    </p>
                    <Timeline >
                        <TimelineItem  v-for="record in workorder.records" :key="record.id">
                            <span class="record-content">{{record.handler.name}}  &nbsp;&nbsp;  {{record.status_name}}</span>
                            <span class="record-comment">{{record.comment}}</span>
                            <span class="record-time">{{record.created_at}}</span>
                        </TimelineItem>
                    </Timeline>

                    </card>
                </div>
            </div>
        </div>
    </Modal>

</template>
<script>
    import $ from 'jquery'
    import { URL } from '@/config/index'
    import QuestionExportHttp from 'server/http/questionExport'
    export default {
        mounted () {
            $('div.ivu-modal-footer').css('display', 'none')
        },
        components: {
        },
        data () {
            return {
                show: false,
                data: {}
            }
        },
        methods: {
            open (id) {
                this.data = []
                this.axios.get(URL + QuestionExportHttp.map.questionDetail + id).then((response) => {
                    return response.data
                }).then((data) => {
                    if (this.data == {}) {
                        this.$Message.error('该数据不存在')
                    } else {
                        if (data.workorders && data.workorders.length) {
                            $.each(data.workorders, function (i, val) {
                                val.records.reverse()
                            })
                        }
                        this.data = data
                    }
                }).catch((error) => {
                    this.$Message.error(error.error)
                })
                this.show = true
            },
            // 取消按钮
            cancelSubmit () {
                this.$parent.refresh()
                this.show = false
            },
            // 模态框关闭
            cancel () {
                this.$parent.refresh()
                this.show = false
            }
        }
    }
</script>
