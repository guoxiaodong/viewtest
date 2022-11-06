<style>
    .formBuild { position: absolute; left: 0; top: 100px; z-index: 99; width: 500px; background-color: #fff; border-radius: 5px; padding: 30px 15px 15px; margin-left: 20px;}
    .map { height: 500px; background-color: #000; }
</style>
<template>
    <Modal v-model="addobject" title="编辑楼宇" @on-cancel="cancel('formInline')" :styles="{width: '90%'}">
        <Form class="formBuild" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
            <FormItem prop="building_name" label="楼宇名称：">
                <Input type="text" v-model="formInline.building_name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem prop="building_shortname" label="楼宇名称缩写：">
                <Input type="text" v-model="formInline.building_shortname" placeholder="请输入"></Input>
            </FormItem>
            <FormItem prop="longitude" label="经度：">
                <Input type="text" number v-model="formInline.longitude" disabled placeholder=""></Input>
            </FormItem>
            <FormItem prop="latitude" label="纬度：">
                <Input type="text" number v-model="formInline.latitude" disabled placeholder=""></Input>
            </FormItem>
            <FormItem prop="diviation" label="有效半径：">
                <Input type="text" v-model="formInline.diviation" placeholder="请输入" number style="width:290px; color: #495060; font-size: 14px;"></Input><span style="float: right;">米</span>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')" :disabled="confirmDis">确&emsp;定</Button>
            </FormItem>
        </Form>
        <baidu-map v-if="mapShow" @ready="mapHandler" @click="mapClick" :scroll-wheel-zoom="true" :center="map.center" :zoom="map.zoom" ak="F1f9d239ddb4b86bd403120058d1ee08">
            <bm-view class="map"></bm-view>
            <bm-local-search class="map-search" @infohtmlset='hideMap' id="mapSearch" :location="location" :pageCapacity="5" :keyword="formInline.building_name" :auto-viewport="true"></bm-local-search>
        </baidu-map>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import SpaceInfoHttp from 'server/http/spaceinfo'
    import {BaiduMap, BmView, BmLocalSearch} from 'vue-baidu-map'
    export default {
        components: {
            BaiduMap, BmView, BmLocalSearch
        },
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入楼宇名称'))
                } else {
                    callback()
                }
            }
            return {
                mapShow: false,
                location: '',
                addobject: false,
                submitCount: 0,
                confirmDis: false,
                id: '',
                level: '',
                fid: '',
                map: {
                    center: {lng: 0, lat: 0},
                    zoom: 3
                },
                formInline: {
                    building_name: '',
                    building_shortname: '',
                    longitude: '',
                    latitude: '',
                    diviation: 1000
                },
                ruleInline: {
                    building_name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    diviation: [
                        { type: 'number', required: true, message: '请输入有效半径，只能是数字', trigger: 'blur' },
                        { type: 'number', max: 1000, min: 1, message: '有效半径为1000米', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open (node) {
                this.id = node.id
                this.level = node.level
                this.addobject = true
                this.mapShow = true
                this.submitCount = 0
                this.getPlaceInfo(this.id)
            },
            getPlaceInfo (id) {
                SpaceInfoHttp.getPlaceInfo(this.id).then((data) => {
                    this.location = data.city_name
                    this.formInline.building_name = data.cityinfo.name
                    this.formInline.building_shortname = data.cityinfo.shortname
                    this.formInline.longitude = data.cityinfo.longitude
                    this.formInline.latitude = data.cityinfo.latitude
                    this.formInline.diviation = parseInt(data.cityinfo.diviation)
                    this.fid = data.cityinfo.fid
                })
            },
            mapHandler ({BMap, map}) {
                this.map.center.lng = 116.404
                this.map.center.lat = 39.915
                this.map.zoom = 15
            },
            mapClick ({point}) {
                this.formInline.longitude = point.lng
                this.formInline.latitude = point.lat
                document.getElementById('mapSearch').innerHTML = ''
            },
            hideMap () {
                document.getElementById('mapSearch').innerHTML = ''
            },
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        this.confirmDis = true
                        SpaceInfoHttp.putPlace({name: this.formInline.building_name, shortname: this.formInline.building_shortname, id: this.id, longitude: this.formInline.longitude, latitude: this.formInline.latitude, diviation: this.formInline.diviation, fid: this.fid, level: this.level}).then((res) => {
                            this.confirmDis = false
                            this.addobject = false
                            this.$Message.success('提交成功!')
                            this.confirmDis = false
                            this.$parent.refBuildNode(res)
                        }).catch((error) => {
                            this.confirmDis = false
                            this.submitCount = 0
                            this.$Message.error(error)
                        })
                    } else {
                        this.confirmDis = false
                        this.submitCount = 0
                    }
                })
            },
            cancelSubmit (formInline) {
                this.$refs['formInline'].resetFields()
                this.addobject = false
            },
            // 模态框关闭
            cancel (formInline) {
                this.$refs[formInline].resetFields()
            }
        }
    }
</script>
