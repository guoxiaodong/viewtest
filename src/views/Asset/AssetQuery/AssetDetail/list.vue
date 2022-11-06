<style>
    .block {
        padding: 10px 0;
    }
    .ivu-tabs{
        min-height: 400px;
    }
    .asset-img{
        width: 200px;
        height: 200px;
    }
</style>
<template>
    <div class="">
        <div class="innerheader">
            <span class="pull-left">资产详情</span>
            <a class="pull-right" @click="back()">返回列表</a>
        </div>
        <div class="innercontent">
            <!-- 基础信息 -->
            <div>
                <div class="flex">
                    <div>
                        <!-- 资产对象图片 -->
                        <img class="asset-img" :src="curAssetObje.text"/>
                    </div>
                    <!-- 资产详情 -->
                    <div class="flex-1 m-l-10">
                        <Row v-if="useStatus && useStatus.property && useStatus.property.name">
                            <Col span="12">
                            <h2>{{useStatus.property.name}}</h2>
                            </Col>
                            <Col span="12">{{useStatus.text}}</Col>
                        </Row>
                        <!--<Row v-if="curAssetObje.name && curAssetObje.status">
                            <Col span="12">
                                <h2>{{curAssetObje.name}}</h2>
                            </Col>
                            <Col span="12">使用状况 : {{curAssetObje.status}}</Col>
                        </Row>-->
                        <Row>
                            <Col v-for="(v, i) in assetObjProps" span="12" :key="i">
                            <span v-if="v.property.type!=13">{{v.property.name}} : {{v.text || '暂无'}}</span>
                            <div v-else>
                                附件：
                                <a :src="v.text">{{v.text.substring(v.text.lastIndexOf('/')+1)}}</a>
                            </div>
                            </Col>
                        </Row>
                    </div>
                    <div class="text-center">
                        <!-- 操作按钮 -->
                        <Button type="text" @click="edit">
                            <Icon type="edit"></Icon>
                            <br>
                            修改信息
                        </Button>
                        <br>
                        <Button type="text" @click="printInfo()">
                            <Icon type="printer"></Icon>
                            <br>
                            打印
                        </Button>
                    </div>
                </div>
            </div>
            <div class="block"></div>
            <!-- 6个tab页面 -->
            <div>
                <Tabs value="maintenanceInfo" @on-click="changeTab($event)">
                    <TabPane label="维护信息" name="maintenanceInfo">
                        <maintenanceInfo ref="maintenanceInfo"></maintenanceInfo>
                    </TabPane>
                    <TabPane label="变更记录" name="changeRecord">
                        <changeRecord ref="changeRecord"></changeRecord>
                    </TabPane>
                    <TabPane label="事件记录" name="eventRecord">
                        <eventRecord ref="eventRecord"></eventRecord>
                    </TabPane>
                    <TabPane label="管理计划" name="managePlan">
                        <managePlan ref="managePlan"></managePlan>
                    </TabPane>
                    <TabPane label="盘点记录" name="inventoryRecord">
                        <inventoryRecord ref="inventoryRecord"></inventoryRecord>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <printCard ref="printCard"></printCard>
        <assetDetailInfo ref="assetDetailInfo"></assetDetailInfo>
    </div>
</template>
<script>
    import maintenanceInfo from './components/maintenanceInfo.vue'
    import changeRecord from './components/changeRecord.vue'
    import eventRecord from './components/eventRecord.vue'
    import managePlan from './components/managePlan.vue'
    import inventoryRecord from './components/inventoryRecord.vue'
//    import AssetManageRoute from '@/server/route/assetManage'
    import printCard from '../../commonComponents/printCard.vue'
    import AssetHttp from 'server/http/assetManage'
    import { URL } from '@/config/index'
    import assetDetailInfo from '../../commonComponents/assetDetailInfo.vue'
    export default {
        components: {
            maintenanceInfo, changeRecord, eventRecord, managePlan, inventoryRecord, printCard, assetDetailInfo
        },
        data () {
            return {
                curAssetObje: {},
                assetObjProps: [],
                useStatus: {}
            }
        },
        created () {
//            this.axios.get(AssetManageRoute.assetDetail + '/' + this.$route.params.id)
//                .then(res => {
//                    this.assetObj = res.data
//                })
//                .catch(error => {
//                    this.$Message.error(error.error)
//                })
        },
        mounted () {
            AssetHttp.getAssetDetail(this.$route.params.id)
                .then(data => {
                    this.assetObj = data
                })
                .catch(error => {
                    this.$Message.error(error)
                })
//            this.axios.get(AssetManageRoute.assetDetail + '/' + this.$route.params.id)
//                .then(res => {
//                    this.assetObj = res.data
//                })
//                .catch(error => {
//                    this.$Message.error(error.error)
//                })
        },
        methods: {
            back () {
                history.back()
            },
            edit () {
                this.$refs.assetDetailInfo.open(3, '编辑', this.$route.params.id)
            },
            changeTab (e) {
                this.$refs[e].active()
            },
            printInfo () {
                this.$refs.printCard.open('资产卡片', this.$route.params.id)
            }
        },
        computed: {
            assetObj: {
                get: function () {
                    return this.curAssetObje
                },
                set: function (v) {
                    this.curAssetObje = v
                    console.log('curAssetObje:', this.curAssetObje)
                    // 处理props
                    this.assetObjProps = []
                    for (let i = 0; i < v.specs.length; i++) {
                        let spec = v.specs[i]
                        if (spec.property_key !== 'image' && spec.property_key !== 'name' && spec.property_key !== 'status') {
                            this.assetObjProps.push(spec)
                        } else if (spec.property_key == 'image') {
                            spec.value = URL.replace(/api/, '') + 'uploads' + spec.value
                            spec.text = spec.value
                        } else if (spec.property_key == 'status') {
                            this.useStatus = spec
                            console.log('this.useStatus:', this.useStatus)
                        }
                    }
                }
            }
        }
    }
</script>
