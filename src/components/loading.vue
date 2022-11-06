<style>
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
</style>
<template>
    <Modal v-model="show" :closable="false" width="30px">
        <span slot="header"></span>
        <Row>
            <Col class="demo-spin-col" span="24" style="border: none;">
            <Spin fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
            </Col>
        </Row>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    export default {
        data () {
            return {
                show: false
            }
        },
        methods: {
            init () {
                this.show = true
            },
            loadingclose () {
                this.show = false
            }
        }
    }
</script>
