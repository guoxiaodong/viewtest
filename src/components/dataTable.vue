<style>
    .search {
        width: 400px;
        position: absolute;
        right: 0;
        /*float: right;
        margin-right: 20px;*/
    }
    .ivu-input-wrapper{ line-height:inherit}
    .btn {  float: right;  }
    .ivu-table-title{position: relative}
    .tablename{  position: relative;}
    .tablename-title{position: absolute;left: 0;font-size: 18px;}
    .tablename .ivu-input-icon { top: 8px; }
    .datatable .ivu-table-header{margin-top: 10px}
    .t-head-top { border-bottom: 1px solid #D7DDE4;height: 48px}
    .t-head-bottom {height: 42px;}
    .datatable .ivu-table-title {height: auto!important;border-bottom: none!important;}
</style>
<template>
  <div class="datatable">
      <Table :show-header="showHeader" :height="height" :context="self.$parent" :columns="columns" :data="currentData" @on-selection-change="selectchange" @on-sort-change="changeOrder">
          <div v-if="ifsearch" class="tablename" slot="header">
              <div class="t-head-top">
                  <p class="tablename-title" v-html="tablename"></p>
                  <Input  :placeholder="searchName" icon="search" class="search" v-model="search" @on-change="list()"></Input>
              </div>
              <slot name="buttons"></slot>
          </div>
      </Table>
    <slot name="pageLeft"></slot><Page :total="total" :current="current" show-sizer show-total style="float: right; margin-top: 20px;" @on-change="change" @on-page-size-change="changesize" :page-size="pagesize"></Page>
    <div class="clear"></div>
  </div>
</template>
<script>
    // import base64 from '@/util/base64'
    export default {
        created () {
            this.list()
        },
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
            height: String,
            tablename: String,
            dataname: String,
            url: String,
            searchBase: false,
            expurl: {
                type: String,
                default: ''
            },
            ifsearch: {
                type: Boolean,
                default: true
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            searchName: {
                type: String,
                default: '请输入...'
            }
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
                current: 1 // 当前页码脚底显示
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
                if (typeof this.$parent.setDataTablePage == 'function') {
                    this.$parent.setDataTablePage(page, pagesize)
                }
                let search = this.search
                setTimeout(() => {
                    if (search != this.search) {
                        return
                    }
                    this.current = page
                    search = search.replace(/\+/g, '{p}')
                    // let baseSearch = this.searchBase ? base64.encode(this.search) : this.search
                    let url = (this.changeUrl ? this.changeUrl : this.url) + '?page=' + (page - 1) + '&iDisplayLength=' + pagesize + '&sSearch=' + search + this.order + this.expurl
                    this.axios.get(url).then((response) => {
                        return response.data
                    }).then((data) => {
                        this.dataTotal = data
                        this.$emit('on-data-change', data)
                    }).catch((error) => {
                        this.$Message.error(error.error)
                    })
                }, 1000)
            },
            change (page) {
                // console.log(page)
                this.list(page, this.pagesize)
                // console.log(page)
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
                this.order = '&key=' + column.key + '&order=' + column.order
                this.list(1, 10)
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
            }
        }
    }
</script>
