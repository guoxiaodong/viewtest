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
    .table-li { border-bottom: 1px solid #e9eaec}
    .datatable .ivu-table-title {height: auto!important;border-bottom: none!important;}
    .fixname { position: absolute; left: 0; top: 140px; z-index: 9; height: 1000px; background-color: #fff; width: 100px; text-align: center}
    .typename li { border-bottom: 1px solid #e9eaec; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; }
</style>
<template>
  <div class="datatable">
      <Table :show-header="showHeader" :context="self.$parent" :columns="columns" :data="currentData" @on-selection-change="selectchange" @on-sort-change="changeOrder">
          <div v-if="ifsearch" class="tablename" slot="header">
              <div class="t-head-top">
                  <div class="fixname" v-if="showInfo">
                      <ul class="typename">
                          <li v-for="column in typecolumns" :style="'height:' + column.column * 48 + 'px'">{{ column.typename}}</li>
                      </ul>
                  </div>
                  <p class="tablename-title" v-html="tablename"></p>
                  <Input  :placeholder="searchName" icon="search" class="search" v-model="search" @on-change="list()"></Input>
              </div>
              <slot name="buttons"></slot>
          </div>
      </Table>
    <slot name="pageLeft"></slot><Page :total="total" :current="current" show-total style="float: right; margin-top: 20px;" @on-change="change" @on-page-size-change="changesize" :page-size="pagesize"></Page>
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
                showInfo: false,
                self: this,
                search: '',
                total: 0,
                pagesize: 10,
                changeUrl: '',
                currentData: this.data,
                order: '',
                current: 1, // 当前页码脚底显示
                typecolumns: []
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
                        if (data.data.length == 0) {
                            this.showInfo = false
                            this.dataTotal = data
                            this.$emit('on-data-change', data)
                        } else {
                            this.showInfo = true
                            this.dataTotal = data
                            this.$emit('on-data-change', data)
                        }
                    }).catch((error) => {
                        this.$Message.error(error.error)
                    })
                }, 1000)
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
                    /**
                     * 分类列
                     */
                    let column = 0
                    let typename = ''
                    this.typecolumns = []
                    let length = data.length
                    for (let index in data) {
                        let item = data[index]
                        if (typename == item.typename) {
                            column++
                        } else {
                            if (typename != '') {
                                this.typecolumns.push({typename: typename, column: column})
                            }
                            typename = item.typename
                            column = 1
                        }
                        if (index == (length - 1)) {
                            this.typecolumns.push({typename: typename, column: column})
                        }
                    }
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
