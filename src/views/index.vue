<style scoped>
    .wrapper,.menu{height: 100%!important;}
    .menu{padding-top: 15px!important;}
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: #464c5b;
    }
    .content{
        position: absolute;
        left: 250px;
        right: 0;
        top: 0;
        bottom: 0;
        min-width: 950px;
        overflow-y: auto;
        overflow-x: hidden;
        background: #f5f7f9;
    }
    .layout-content{
        margin: 15px;
        position: relative;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 0;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #D7DDE4;
        margin: 20px auto 15px;
    }
    .layout-header{
        height: 55px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        text-align: right;
        line-height: 55px;
        padding-right: 20px;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .spin{
        display: none;
    }
    .ivu-spin-fix{
        z-index: 99999;
        position: fixed;
    }
</style>
<template>
    <div class="wrapper">
        <div class="sidebar">
            <Menu active-name="1-1" theme="dark" width="auto" :open-names="['0']" ref="menu">
                <div class="layout-logo-left">HiFM</div>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        人力与组织机构
                    </template>
                    <router-link to="/organization/role"><MenuItem name="1-1">角色管理</MenuItem></router-link>
                    <router-link to="/organization/user"><MenuItem name="1-2">用户管理</MenuItem></router-link>
                    <router-link to="/organization/rights"><MenuItem name="1-3">权限管理</MenuItem></router-link>
                    <router-link :to="'/organization/organize/list/'+this.supplier_id"><MenuItem name="1-4">组织机构</MenuItem></router-link>
                    <router-link to="/organization/post"><MenuItem name="1-5">岗位管理</MenuItem></router-link>
                </Submenu>
                <Submenu name="2">
                     <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        报表分析
                      </template>
                      <router-link to="/ReportAnalysis/WorkOrder"><MenuItem name="2-1">工单查询</MenuItem></router-link>
                      <router-link to="/ReportAnalysis/QuestionExport"><MenuItem name="2-2">问题导出</MenuItem></router-link>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        配置管理
                    </template>
                    <router-link to="/manage/objects"><MenuItem name="3-1">管理对象</MenuItem></router-link>
                    <router-link to="/manage/spaceobjects"><MenuItem name="3-2">空间信息管理</MenuItem></router-link>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        物料管理
                    </template>
                    <router-link to="/MaterialManage/BasicInfo"><MenuItem name="4-1">物料基本配置</MenuItem></router-link>
                    <router-link to="/MaterialManage/InventoryManage"><MenuItem name="4-2">出入库</MenuItem></router-link>
                </Submenu>
                <Submenu name="5">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        预算管理
                    </template>
                    <router-link to="/BudgetManage/Overview"><MenuItem name="5-0">预算概览</MenuItem></router-link>
                    <router-link to="/BudgetManage/BudgetSet"><MenuItem name="5-1">预算设置</MenuItem></router-link>
                    <router-link to="/BudgetManage/SubjectSet"><MenuItem name="5-2">科目设置</MenuItem></router-link>
                    <!--<router-link to="/BudgetManage/Adjust"><MenuItem name="5-3">预算调整</MenuItem></router-link>-->
                </Submenu>
                <Submenu name="6">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        流程管理
                    </template>
                    <router-link to="/processmanage/workorders"><MenuItem name="6-1">工单审批</MenuItem></router-link>
                </Submenu>
                <Submenu name="7">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        服务管理
                    </template>
                    <router-link to="/ServiceManage/SupplierService/ServiceQuery"><MenuItem name="7-1">供应商服务查询</MenuItem></router-link>
                    <router-link to="/ServiceManage/SupplierService/Suppliercatalog"><MenuItem name="7-2">供应商服务目录</MenuItem></router-link>
                    <router-link to="/ServiceManage/Internalservice/InternalQuery"><MenuItem name="7-3">行政服务查询</MenuItem></router-link>
                    <router-link to="/ServiceManage/Internalservice/InternalCatalog"><MenuItem name="7-4">行政服务目录</MenuItem></router-link>
                </Submenu>
                <Submenu name="8">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        供应商管理
                    </template>
                    <router-link to="/suppliermanage/supplier"><MenuItem name="8-1">供应商管理</MenuItem></router-link>
                </Submenu>
                <Submenu name="9">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        资产管理
                    </template>
                    <router-link to="/Asset/AssetQuery"><MenuItem name="9-1">资产查询</MenuItem></router-link>
                    <router-link to="/Asset/AssetManage"><MenuItem name="9-2">资产目录管理</MenuItem></router-link>
                </Submenu>
            </Menu>
        </div>
        <div class="content">
            <Spin size="large" fix v-if="true" class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
            <div class="layout-header">
                <Dropdown class="username" trigger="click">
                     <a href="javascript:void(0)">
                         {{username}}
                            <Icon type="arrow-down-b"></Icon>
                     </a>
                     <Dropdown-menu slot="list">
                         <Dropdown-item>
                             <Button type="text" @click="loginout"><Icon type="log-out"></Icon>&ensp;退出</Button>
                         </Dropdown-item>
                     </Dropdown-menu>
                </Dropdown>
            </div>
            <div class="layout-content" id="h">
                <div class="layout-content-main">
                    <router-view @updateActive="updateActive"></router-view>
                </div>
            </div>
            <div class="layout-copy">
               EMTD HiFMCloud.com © 2017-2018 京ICP备17009400号-6
            </div>
        </div>
    </div>
</template>
<script>
    import resize from '../mixins/resize'
    require('static/css/modal.css')
    export default {
        components: {
        },
        mixins: [ resize ],
        data () {
            return {
                username: this.$store.state.loginUser.username,
                supplier_id: this.$store.state.loginUser.supplier_id
            }
        },
        mounted () {
            document.getElementById('h').style.minHeight = (document.body.clientHeight - 140) + 'px'
            sessionStorage.setItem('loading', '0')
            // console.log(document.body.clientHeight)
        },
        methods: {
            loginout () {
                location.href = '/'
                localStorage.removeItem('vuex')
            },
            onResize () {
                document.getElementById('h').style.minHeight = (document.body.clientHeight - 140) + 'px'
                // console.log(document.getElementById('h').style.minHeight)
            },
            updateActive (menuName) {
                this.$refs.menu.currentActiveName = menuName
            }
        }
    }
</script>
