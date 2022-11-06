<template>
    <div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            :action="uploadurl"
            style="width: 130px;">
            <div class="upload">
               <Icon class="upload-img"></Icon>
               <p>点此上传头像</p>
            </div>
        </Upload>
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <div class="uploadinfo">
            支持扩展名：.png .jpg .jpeg
        </div>
    </div>
</template>
<script>
    import { URL } from '@/config/index'
    export default {
        data () {
            return {
                uploadurl: URL + '/upload',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
                this.$emit('handleRemove', '')
            },
            handleSuccess (res, file) {
                file.name = res.file[0].name
                file.url = URL.replace(/api/, '') + '/uploads' + res.file[0].url
                this.$emit('handleUp', res.file[0].url)
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                })
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                })
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 1
                if (!check) {
                    this.$Notice.warning({
                        title: '只能上传1张图片'
                    })
                }
                return check
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        top: 0;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
