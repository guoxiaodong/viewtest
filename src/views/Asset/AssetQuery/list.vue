<style>
    .search-area {
        padding: 20px 0;
    }
    .block {
        padding: 10px 0;
    }
    .PMtable .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    /* 隐藏tab切换栏 */
    .no-tabhead .ivu-tabs-bar{
        display:none;
    }
    .ivu-tabs{
        min-height: 400px;
    }
</style>
<template>
    <div class="">
        <div class="innerheader">
            资产查询
        </div>
        <div class="innercontent">
            <!-- 搜索 -->
            <div class="search-area flex">
                <div class="flex-1"></div>
                <div class="flex-1 flex">
                    <input type="text" class="ivu-input flex-1" v-model="filterCondition.search" @change="refresh">
                    <button class="ivu-btn ivu-btn-primary">搜索</button>
                </div>
                <div class="flex-1"></div>
            </div>
            <!-- 分类 -->
            <div class="block"></div>
            <div class="sort-area">
                <filterItem :isMulti=false :filterData="filterData.first" :filterName="'一级分类'" @filterCondition-change="conditionChange($event,'first')"></filterItem>
                <filterItem :isMulti=false :filterData="filterData.second" :filterName="'二级分类'" @filterCondition-change="conditionChange($event,'second')"></filterItem>
                <filterItem :filterData="filterData.third" :filterName="'规格分类'" @filterCondition-change="conditionChange($event,'third')"></filterItem>
                <!--<filterItem v-for="(v, k, i) in filterDataCustom" :key="i" :filterData="v.data" :filterName="v.name||v" @filterCondition-change="customConditionChange($event,k)"></filterItem>-->
                <filterItem v-for="(v, k, i) in filterDataCustom" :key="i" :filterData="v.data" :filterName="v.name||v" @filterCondition-change="customConditionChange($event,k)"></filterItem>
            </div>
            <!-- 信息展示 -->
            <div class="block"></div>
            <div class="info-area">
                <Tabs :value="tabsName" class="no-tabhead">
                    <TabPane name="assetQuery">
                        <assetList ref="assetQuery" :target="self" :filterParams="filterCondition"></assetList>
                    </TabPane>
                    <TabPane name="assetRecord">
                        <assetRecord ref="assetRecord" main="assetQuery" :target="self" :filterParams="filterCondition"></assetRecord>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import baseTable from '../commonComponents/baseTable.vue'
    import filterItem from '@/components/filterItem.vue'
    import assetRecord from './components/assetRecord.vue'
    import assetList from './components/assetList.vue'
    import AssetHttp from 'server/http/assetManage'
    require('static/css/modal.css')
    export default {
        created () {
//            this.init()
        },
        components: {
            baseTable, filterItem, assetRecord, assetList
        },
        data () {
            return {
                self: this,
                filterData: {
                    first: [],
                    second: [],
                    third: []
                },
                filterDataCustom: [],
                filterCondition: {
                    first: '',
                    second: '',
                    third: '',
                    search: ''
                },
                tabsName: 'assetQuery'
            }
        },
        mounted () {
            this.init()
            this.refresh()
        },
        methods: {
            init () {
                //  加载分类
                AssetHttp.getAssetsClass()
                    .then(data => {
                        this.loading = false
                        //  处理业务逻辑赋值
                        this.filterData.first = data
                    })
                    .catch(error => {
                        this.$Message.error(error.error)
                    })
                // 加载自定义筛选条件 规格分类之类的
                AssetHttp.getAssetFilter()
                    .then(data => {
                        this.filterDataCustom = {}
                        for (let i = 0; i < data.length; i++) {
                            let temp = data[i]
                            this.filterDataCustom[temp.key] = {
                                name: temp.name,
                                data: temp.object.split(',')
                            }
                        }
                        // 测试数据，需删除
                        this.filterDataCustom['status'] = {
                            data: [{id: 1, name: '使用中'}, {id: 2, name: '闲置'}, {id: 3, name: '废弃'}],
                            name: '使用状况'
                        }
                        // todo 这是干啥的？
//                        AssetHttp.getAssetCondition()
//                            .then(data => {
//                                console.log(data)
//                            })
//                            .catch(error => {
//                                error
//                                // console.log('AssetHttp.getAssetCondition接口报错：', error)
//                            })
                    })
                    .catch(error => {
                        console.log(error)
//                        this.$Message.error(error.error)
                    })

                // todo 测试用，需注释掉
//                AssetHttp.getAssetList()
//                    .then(data => {
//                        console.log('assetList:', data)
//                    })
//                    .catch(error => {
//                        console.log(error)
//                        this.$Message.error(error.error || error)
//                    })
                AssetHttp.getAssetRecord()
                    .then(data => {
                        console.log('getAssetRecord:', data)
                    })
                    .catch(error => {
                        console.log('AssetHttp.getAssetRecord error:', error)
                    })
//                this.axios.get(AssetManageRoute.getSort)
//                    .then(res => {
//                        console.log('this.axios.get:', res)
//                        this.loading = false
//                        //  处理业务逻辑赋值
//                        let result = res[0].data
//                        this.filterData.first = result
//                    })
//                    .catch((error) => {
//                        this.loading = false
//                        this.$Message.error(error.error)
//                    })
                // 加载自定义筛选条件
//                this.axios.get(AssetManageRoute.getAssetFilter)
//                    .then(res => {
//                        //  处理业务逻辑赋值
//                        console.log(res.data)
//                        let result = res.data
//                        this.filterDataCustom = {}
//                        for (let i = 0; i < result.length; i++) {
//                            let temp = result[i]
//                            this.filterDataCustom[temp.key] = {
//                                name: temp.name,
//                                data: []
//                            }
//                        }
//                        return this.axios.get(AssetManageRoute.getAssetCondition)
//                    })
//                    .then(res => {
//                        console.log(res)
//                    })
//                    .catch((error) => {
//                        this.$Message.error(error.error)
//                    })
            },
            //  切换分类
            conditionChange (e, type) {
                if (type === 'first') {
                    if (e[0]) {
                        this.filterData.second = e[0].objects
                    } else {
                        this.filterData.second = []
                    }
                } else if (type === 'second') {
                    if (e[0]) {
                        this.filterData.third = e[0].specifications
                    } else {
                        this.filterData.third = []
                    }
                } else if (type === 'third') {
                    this.filterCondition[type] = ''
                    let temp = []
                    for (let i = 0; i < e.length; i++) {
                        temp.push(e[i].id)
                    }
                    this.filterCondition[type] = temp.join(',')
                    this.refresh()
                }
            },
            // 自定义切换分类
            customConditionChange (e, type) {
                this.filterCondition[type] = ''
                let temp = []
                for (let i = 0; i < e.length; i++) {
                    temp.push(e[i].id)
                }
                this.filterCondition[type] = temp.join(',')
                this.refresh()
            },
            refresh () {
                this.$refs[this.tabsName].refresh()
            }
        }
    }
</script>
