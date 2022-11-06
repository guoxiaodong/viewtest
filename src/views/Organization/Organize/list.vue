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
            组织机构
        </div>
        <div style="margin-left: 40px; margin-right: 40px;">
            <Menu mode="horizontal" active-name="1" ref="othermenu">
                <router-link :to="'/organization/organize/list/'+this.$route.params.id">
                    <MenuItem name="1">组织机构表</MenuItem>
                </router-link>
                <router-link :to="'/organization/organize/chart/'+this.$route.params.id">
                    <MenuItem name="2">组织机构图</MenuItem>
                </router-link>
            </Menu>
        </div>
        <router-view @updateActiveName="updateActiveName"></router-view>
    </div>
</template>
<script>
    export default {
        created () {
            this.$emit('updateActive', '1-4')
        },
        methods: {
            updateActiveName (menuName) {
                this.$refs.othermenu.currentActiveName = menuName
            }
        }
    }
</script>
