<style>
    /*.layout-content {  background: transparent !important;  }*/
    .layout-content-main {  padding: 0 !important;  }
    .top{color: #657180;}
    .m-l-40{margin-left: 40px}
    .top,.bottom-left,.bottom-right,.middle{  padding: 10px;  border-radius: 2px;  background: #fff;  }
    .top-left,.middle-right{  border-right: 1px solid #D7DDE4;padding: 10px}
    .top-recharge {  font-size: 38px;color: #FF9900;vertical-align: middle  }
    .top-right {  margin: 45px auto auto 40px  }
    .top-right > p {  display: inline-block  }
    .bottom-left,.bottom-right{padding: 20px!important;min-height: 480px}
    .table-title-more{text-align: right;margin-bottom: 20px}
    .bottom-left-table-name{border-bottom: 1px solid #D7DDE4;}
    .bottom-left-ul li {padding:18px}
    .bottom-left-ul li a{color: #657180!important;}
    .span-b,.span-r, .span-y{display:inline-block;width:6px;height:6px;border-radius:6px;background:#39f;margin-right:15px}
    .span-r {background: #f30}
    .span-y {background: #f90}
    .echarts {width: 860px;height: 400px;}
    .middle-right{min-height: 430px}
    .middle-r-today{  font-size: 16px;  color: #657180;  }
    .middle-r-num{  font-size: 28px;  color: #3399FF;  }
    .middle-r-per{color: #FF3300;  }
    .middle-r-per-text{color: #9EA7B4;  }
    .middle-r-s{  font-size: 16px;  color: #657180;  }
    .middle-r-r-radio,.middle-r-r-date{position: absolute;top: 0;right: 300px;z-index:5;}
    .middle-r-r-date{right: 0;width: 230px}
    .ivu-radio-group-button .ivu-radio-wrapper-checked:first-child,.ivu-radio-group-button .ivu-radio-wrapper {border: none!important;}
    .ivu-radio-group-button .ivu-radio-wrapper-checked:hover,.ivu-radio-group-button .ivu-radio-wrapper-checked{box-shadow: none!important;}
    .middle {padding: 20px;}
    .ivu-modal-content { margin: 0 5%; }
</style>
<template>
        <!--middle-->
        <Row class="middle m-t-15">
            <Row class="bottom-left-table-name" solt="header">
                <Col span="20"><h2 class="m-t-5">接口调用情况统计</h2></Col>
                <Col span="4" class="m-b-10">
                <Select placeholder="选择分类" v-model="apiTypeS" @on-change="searhTypeFun">
                    <Option value="0" key="0">全部</Option>
                    <Option-group v-for="item in consoleData.api_type" :label="item.name" :key="item">
                        <Option v-for="v in item.api" :value="v.id" :key="v.id">{{ v.name }}</Option>
                    </Option-group>
                </Select>
                </Col>
            </Row>
            <Row>
                <Col span="5" class="middle-right">
                <p class="middle-r-today m-t-20">今日调用次数</p>
                <p class="middle-r-num m-t-10">{{consoleData.todayCall}}</p>
                <p class="middle-r-per m-t-10">{{consoleData.rate}}<span  class="middle-r-per-text">    同比昨天</span></p>
                <p class="middle-r-s m-t-40">累计调用次数(成功)</p>
                <p class="middle-r-num m-t-10">{{consoleData.totalSuccess}}</p>
                </COl>
                <Col span="19 m-t-10">
                <div class="middle-r-r-radio">
                    <Radio-group v-model="bigDate" type="button" @on-change="bigTimeChange">
                        <Radio label="今日"></Radio>
                        <Radio label="本周"></Radio>
                        <Radio label="本月"></Radio>
                    </Radio-group>
                </div>
                <div class="middle-r-r-date">
                    <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" @on-change="timeChange"></Date-picker>
                </div>
                <div class="echarts">
                    <IEcharts v-if="eShow" :option="line" ref="echarts"></IEcharts>
                </div>
                </COl>
            </Row>
        </Row>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'
import record from '@/api/record'
import account from '@/api/account'
import getConfValue from '@/util/getConfValue'
import { getWeekStartDate, getTodayDate, getMonthStartDate } from '@/util/assist'
import store from '@/store'
export default {
    components: {
        IEcharts
    },
    created () {
        this.userinfo()
        this.list()
        this.console()
    },
    data () {
        return {
            account: {},
            consoleData: {},
            eShow: true,
            searhType: 0,
            from: getWeekStartDate(), // 开始时间
            to: getTodayDate(), // 结束时间
            bigDate: '今日',
            line: {
                title: {
                    text: '近一周接口调用情:'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: true,
                        dataView: {show: false},
                        magicType: ['line', 'bar'],
                        restore: true,
                        saveAsImage: true
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: []
            },
            apiTypeS: '',
            columns: [
                {
                    title: '序号',
                    width: 80,
                    key: 'id'
                },
                {
                    title: '接口种类',
                    render: (h, params) => {
                        return h('span', params.row.api.name)
                    }
                },
                {
                    title: '调用IP',
                    width: 140,
                    key: 'ip'
                },
                {
                    title: '结果',
                    width: 60,
                    key: 'status',
                    render: (h, params) => {
                        return h('span', getConfValue(params.row.status, store.state.config.CALL_RESULT))
                    }
                },
                {
                    title: '时间',
                    key: 'created_at'
                }
            ],
            data: []
        }
    },
    methods: {
        list () { // 重新获取数据
            let self = this
            this.axios.get(record.statistics + '?api_id=' + self.searhType + '&from=' + self.from + '&to=' + self.to).then(function (response) {
                return response.data
            }).then(function (data) {
                self.line.xAxis[0].data = data.xAxis
                self.line.series.forEach((v, k) => {
                    v.data = []
                })
                data.series.forEach((v, k) => {
                    let serie = {
                        name: v.name,
                        type: 'line',
                        smooth: true,
                        default: ['rgba(48,127,202,0.0)', 'rgba(8,127,202,0.0)'],
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: v.data
                    }
                    self.line.series.push(serie)
                })
            })
        },
        console () { // 可选项和数据统计
            let self = this
            this.axios.get(record.console).then(function (response) {
                return response.data
            }).then(function (data) {
                self.consoleData = data
                self.data = data.records
            })
        },
        searhTypeFun (value) {
            this.searhType = value
            this.list()
        },
        timeChange (date) {
            this.from = date[0]
            this.to = date[1]
            this.list()
        },
        bigTimeChange (label) {
            if (label == '本周') {
                this.from = getWeekStartDate()
            } else if (label == '本月') {
                this.from = getMonthStartDate()
            } else {
                this.from = getTodayDate()
            }
            this.to = getTodayDate()
            this.list()
        },
        userinfo () {
            let self = this
            this.axios.get(account.info).then(function (response) {
                return response.data
            }).then(function (data) {
                self.account = data
            })
        }
    }
}
</script>
