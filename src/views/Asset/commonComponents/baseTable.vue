<style>
    .ivu-input-wrapper{ line-height:inherit}
    .btn {  float: right;  }
    .ivu-table-title{position: relative}
    .datatable .ivu-table-header{margin-top: 10px}
    .t-head-top { border-bottom: 1px solid #D7DDE4;height: 48px}
    .t-head-bottom {height: 42px;}
    .datatable .ivu-table-title {height: auto!important;border-bottom: none!important;}
</style>
<template>
    <div class="baseTable">
        <Table :context="self.$parent" :loading="loading"
               :columns="columns" :data="currentData" @on-selection-change="selectchange"
               @on-sort-change="changeOrder"></Table>
        <slot name="pageLeft"></slot>
        <Page :total="total" :current="current" show-sizer show-total
              style="float: right; margin-top: 20px;" @on-change="change"
              @on-page-size-change="changesize" :page-size="pagesize"></Page>
        <div class="clear"></div>
    </div>
</template>
<script>
    // import base64 from '@/util/base64'
    export default {
        props: {
            columns: {
                type: Array,
                default () {
                    return []
                }
            },
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            url: String,
            expurl: {
                type: String,
                default: ''
            },
            params: {
                type: Object,
                default () {
                    return {}
                }
            },
            showLoading: {
                type: Boolean,
                default () {
                    return false
                }
            },
            requestdata: String,
            dataname: String
        },
        data () {
            return {
                self: this,
                search: '',
                total: 0,
                pagesize: 10,
                changeUrl: '',
                currentData: this.data,
                order: '',
                current: 1, // 当前页码脚底显示,
                requestData: null,
                loading: this.showLoading
            }
        },
        methods: {
            refresh (url = '', expurl = '') {
                if (url) this.changeUrl = url // todo 临时方案
                if (expurl) this.expurl = expurl // todo 临时方案
                this.current = 1
                this.list(this.current, this.pagesize)
            },
            list (page = 1, pagesize = 10) {
                this.current = page
                let params = {
                    page: page - 1,
                    iDisplayLength: pagesize
                }
                Object.assign(params, this.order, this.params)
                this.loading = true
                this.axios.get(this.url, { params: params }).then((response) => {
                    this.loading = false
                    return response.data
                }).then((data) => {
                    this.requestData = this._.cloneDeep(data)
                    this.dataTotal = data
                    this.$emit('on-data-change', data)
                }).catch((error) => {
                    this.loading = false
                    this.$Message.error(error.error)
                })
            },
            change (page) {
                this.list(page, this.pagesize)
            },
            changesize (pagesize) {
                this.pagesize = pagesize
                this.list(this.page, pagesize)
            },
            // 带checkbox的 table获取数据
            selectchange (selection) {
                this.$emit('on-selection-change', selection)
            },
            changeOrder (column) {
                this.order = {
                    key: column.key,
                    order: column.order
                }
                this.list(1, this.pagesize)
            }
        },
        computed: {
            dataTotal: {
                get: function () {
                },
                set: function ({data, recordsFiltered}) {
                    this.currentData = data
                    this.total = recordsFiltered
                }
            }
        },
        watch: {
            currentData () {
                this.$parent[this.dataname] = this.currentData
            },
            requestData () {
                this.$parent[this.requestdata] = this.requestData
            }
        }
    }
</script>
