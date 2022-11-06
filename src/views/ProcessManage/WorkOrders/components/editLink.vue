<style>
    .ivu-menu-horizontal {
        height: 40px;
        line-height: 40px;
        margin-top: 15px;
    }
    .ivu-menu-horizontal .ivu-menu-item {
        font-size: 16px;
        color: #9EA7B4;
    }
</style>
<template>
    <div>
        <div class="innerheader">
            编辑环节
            <Button type="primary" @click="back" style="float: right; margin-top: 8px;">返回上一级</Button>
        </div>
        <div style="margin-left: 40px; margin-right: 40px;">
            <Menu mode="horizontal" active-name="1" ref="othermenu">
                <router-link :to="editlinkbasic">
                    <MenuItem name="1">基本信息</MenuItem>
                </router-link>
                <router-link :to="editlinkform">
                    <MenuItem name="2">表单模板</MenuItem>
                </router-link>
            </Menu>
        </div>
        <div class="clear"></div>
        <router-view @updateActiveName="updateActiveName"></router-view>
    </div>
</template>
<script>
    export default {
        created () {
            this.$emit('updateActive', '6-1')
        },
        data () {
            return {
                editlinkbasic: '/processmanage/editlinkbasic/' + this.$route.params.id + '/' + this.$route.params.linkid,
                editlinkform: '/processmanage/editlinkform/' + this.$route.params.id + '/' + this.$route.params.linkid
            }
        },
        methods: {
            back () {
                location.href = '/#/processmanage/creatlink/' + this.$route.params.id
            },
            updateActiveName (menuName) {
                this.$refs.othermenu.currentActiveName = menuName
            }
        }
    }
</script>
