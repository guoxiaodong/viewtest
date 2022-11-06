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
            新建/编辑流程
            <Button type="primary" @click="back" style="float: right; margin-top: 8px;">返回上一级</Button>
        </div>
        <div style="margin-left: 40px; margin-right: 40px;">
            <Menu mode="horizontal" active-name="1" ref="othermenu">
                <router-link :to="creatbasic">
                    <MenuItem name="1">基本信息</MenuItem>
                </router-link>
                <router-link :to="creatlink">
                    <MenuItem name="2">环节</MenuItem>
                </router-link>
                <router-link to="">
                    <MenuItem name="3">流程预览</MenuItem>
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
                creatbasic: '/processmanage/creatbasic/' + this.$route.params.id,
                creatlink: '/processmanage/creatlink/' + this.$route.params.id
            }
        },
        methods: {
            back () {
                location.href = '/#/processmanage/workorders'
            },
            updateActiveName (menuName) {
                this.$refs.othermenu.currentActiveName = menuName
            }
        }
    }
</script>
