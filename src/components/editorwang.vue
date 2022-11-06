<template lang="html">
    <div class="vue-wangEditor">
        <textarea :id="name" :name="name" style="height: 300px;" v-html="initcontent" @input="outputContent"></textarea>
    </div>
</template>

<script>
import WangEditor from 'wangeditor'
export default {
    props: ['initcontent'],
    data () {
        return {
            name: 'editor',
            editor: null,
            content: ''
        }
    },
    watch: {
        initcontent (content) {
            this.editor.$txt.html(content)
        }
    },
    mounted () {
        this.createEditor()
    },
    destroyed () {
        this.editor.destroy()
    },
    methods: {
        createEditor () {
            const self = this
            const editor = new WangEditor('editor')
            editor.config.menus = [
                'bold',
                'underline',
                'italic',
                'head',
                'img',
                'insertcode'
            ]
            editor.config.uploadImgUrl = this.axios.defaults.baseURL + '/upload'
            editor.onchange = function () {
                self.formatContent(this.$txt.html())
            }
            editor.create()
            this.editor = editor
        },
        formatContent (content) {
            this.content = content
            this.outputContent()
        },
        outputContent () {
            this.$emit('input', this.content)
        }
    }
}
</script>

<style lang="css">
</style>
