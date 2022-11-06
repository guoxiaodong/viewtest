<style>
    .internalQuery-stepFinish .finish{
    }
    .internalQuery-stepFinish .finish div{
        width:fit-content;
        width:-webkit-fit-content;
        width:-moz-fit-content;
        position:relative;
        left:42%;
        transform:translateX(-50%);
        -webkit-transform:translateX(-50%);
        -moz-transform:translateX(-50%);
        white-space:nowrap;
        margin-bottom: 10px;
    }
    .internalQuery-stepFinish .finish .button{
        margin-left: 96px;
        margin-right: 10px;
    }
    .internalQuery-stepFinish .finish img{
        margin-left: 121px;
        margin-bottom: 10px;
        width: 120px;
        height: 120px;
    }
</style>
<template>
    <div class="internalQuery-stepFinish">
        <Row style="padding-top: 10%">
            <Col span="7">&nbsp;</Col>
            <Col span="10">
            <div  class="finish"  >
                <img src="static/images/ic_done@2x.png"  alt="" />
                <div><span>您成功添加供应商服务</span> <span>{{name}}({{no}})</span></div>
                <span>
            <Button class="button" type="primary" @click="goback()">返回列表</Button>
            <Button type="ghost" @click="goservice()">查看服务</Button>
            </span>
            </div>
            </Col>
            <Col span="7">&nbsp;</Col>
        </Row>
    </div>
</template>
<script>
    //    import $ from 'jquery'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import ServiceHttp from 'server/http/service'
    export default {
        components: {
        },
        data () {
            return {
                id: null,
                name: '',
                no: ''
            }
        },
        methods: {
            open (id) {
                this.id = id
                var data = {
                    id: this.id
                }
                ServiceHttp.supplierDetail(data).then((data) => {
                    this.no = data[0].no
                    this.name = data[0].title
                })
            },
            goback () {
                location.reload()
            },
            goservice () {
                this.$emit('show', 0, this.id)
            }
        }
    }
</script>
