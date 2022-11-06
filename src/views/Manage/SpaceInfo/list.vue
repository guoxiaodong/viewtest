<style>
    .ivu-menu-horizontal {
        height: 40px;
        line-height: 40px;
    }
    .ivu-menu-horizontal .ivu-menu-item {
        font-size: 16px;
        color: #9EA7B4;
    }
</style>
<template>
    <div>
        <div class="innerheader">
            空间信息管理
        </div>
        <div style="margin-left: 40px; margin-right: 40px;">
            <Menu mode="horizontal" active-name="1" ref="othermenu">
                <router-link to="/manage/spaceobjects/">
                    <MenuItem name="1">空间及空间内对象</MenuItem>
                </router-link>
                <router-link to="/manage/spacetype/">
                    <MenuItem name="2">空间类型</MenuItem>
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
            this.$emit('updateActive', '3-2')
        },
        methods: {
            updateActiveName (menuName) {
                this.$refs.othermenu.currentActiveName = menuName
            }
        }
    }
</script>
