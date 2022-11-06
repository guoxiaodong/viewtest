<style>
    .condition-item{
        padding:5px 10px;
        margin:0 10px;
        cursor: pointer;
    }
    .condition-title{
        padding:5px 10px;
        margin:0 10px;
        display: inline-block;
    }
    .condition-item.active{
        color:cornflowerblue;
    }
    .collapse-items{
        height: 32px;
        overflow: hidden;
    }
</style>
<template>
    <div class="container flex">
        <div><span class="condition-title">{{filterName}}：</span></div>
        <div class="flex-1 flex flex-wrap" :class="{'collapse-items':isCollapse}">
            <span class="condition-item" v-if="hasAll" :class="{'active':!filterCondition.length}" @click="chose(null)">全部</span>
            <span class="condition-item" v-for="item in filterData" :class="{'active':filterCondition.includes(item.id)}" @click="chose(item)">{{item.name}}</span>
        </div>
        <div>
            <Button type="text" @click="collapseItem()">{{isCollapse?'展开':'收起'}}</Button>
        </div>
    </div>
</template>
<script>
    // import base64 from '@/util/base64'
    export default {
        props: {
            filterName: {
                type: String,
                default () {
                    return '分类'
                }
            },
            filterData: {
                type: Array,
                default () {
                    return []
                }
            },
            hasAll: {
                type: Boolean,
                default () {
                    return true
                }
            },
            isMulti: {
                type: Boolean,
                default () {
                    return true
                }
            }
        },
        data () {
            return {
                isCollapse: true,
                filterCondition: []
            }
        },
        methods: {
            chose (i) {
                // i = null,则为全部
                if (i == null) {
                    this.filterCondition = []
                } else {
                    let index = this.filterCondition.indexOf(i.id)
                    if (index != -1) {
                        this.filterCondition.splice(index, 1)
                    } else {
                        if (!this.isMulti) {
                            this.filterCondition = []
                        }
                        this.filterCondition.push(i.id)
                    }
                }
                let temp = []
                for (let i = 0; i < this.filterData.length; i++) {
                    if (this.filterCondition.includes(this.filterData[i].id)) {
                        temp.push(this.filterData[i])
                    }
                }
                this.$emit('filterCondition-change', temp)
            },
            collapseItem () {
                this.isCollapse = !this.isCollapse
            }
        },
        watch: {
            filterData (n, o) {
                this.filterCondition = []
                if (o.length) {
                    this.$emit('filterCondition-change', [])
                }
            }
        }
    }
</script>
