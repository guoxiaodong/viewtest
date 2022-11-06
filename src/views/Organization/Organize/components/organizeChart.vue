<style>
    #jOrgChart .jOrgChart table { margin: 0 auto; }
</style>
<template>
    <div>
        <div class="innerbtns" style="position: absolute; top: 42px; z-index: 999; right: 40px;">
            <selectSupplier ref="selectSupplier" @supplierChange="supplierChange"></selectSupplier>
        </div>
        <div style="width: 100%; overflow-x: auto; padding: 20px 0; text-align: center" >
            <div id='jOrgChart'></div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import GroupHttp from 'server/http/group'
    require('static/plugin/jorgchart/jquery.jOrgChart.css')
    require('static/plugin/jorgchart/jquery.jOrgChart.js')
    import selectSupplier from '../components/selectSupplier.vue'
    export default {
        created () {
            this.$emit('updateActiveName', '2')
        },
        components: {
            selectSupplier
        },
        data () {
            return {}
        },
        mounted () {
            /*
            GroupHttp.getGroupChar().then((data) => {
                var showlist = $("<ul id='org' style='display:none'></ul>")
                this.showall(data, showlist)
                $('#jOrgChart').append(showlist)
                $('#org').jOrgChart({
                    chartElement: '#jOrgChart',
                    dragAndDrop: false
                })
            })
            */
        },
        methods: {
            supplierChange (data) {
                GroupHttp.getGroupChar(data).then((data) => {
                    $('#jOrgChart').empty()
                    var showlist = $("<ul id='org' style='display:none'></ul>")
                    this.showall(data, showlist)
                    $('#jOrgChart').append(showlist)
                    $('#org').jOrgChart({
                        chartElement: '#jOrgChart',
                        dragAndDrop: false
                    })
                })
            },
            showall (menulist, parent) {
                for (var val of menulist) {
                    if (val.childrens) {
                        var li = $('<li></li>')
                        li.append('<span>' + val.name + '</span>').append('<ul></ul>').appendTo(parent)
                        // 递归显示
                        this.showall(val.childrens, $(li).children().eq(1))
                    } else {
                        $('<li></li>').append('<span>' + val.name + '</span>').appendTo(parent)
                    }
                }
            }
        }
    }

</script>
