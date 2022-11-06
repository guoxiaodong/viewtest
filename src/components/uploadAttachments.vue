<template>
    <div>
        <Upload
            ref="upload"
            :show-upload-list="true"
            :on-success="handleSuccess"
            :format="['pdf','doc','docx']"
            :max-size="5120"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :action="uploadurl">
            <Button type="ghost" icon="ios-cloud-upload-outline">点此上传附件</Button>
        </Upload>
        <!-- <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div> -->
        <div class="uploadinfo">
            支持扩展名：.pdf .doc .docx
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
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 pdf,doc或docx格式的附件。'
                })
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 5M。'
                })
            },
            handleBeforeUpload (file) {
                if (file.size === 0) {
                    this.$Notice.warning({
                        title: '文件内容不能为空！'
                    })
                    return false
                }
              /*
                const check = this.uploadList.length < 1
                if (!check) {
                    this.$Notice.warning({
                        title: '只能上传1张图片'
                    })
                }
                return check
                */
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
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
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
