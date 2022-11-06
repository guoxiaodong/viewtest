import ServerHttp from './http'
import _ from 'lodash'

/**
 * 预算相关接口
 */
class Budget extends ServerHttp {
    constructor () {
        super()
        this.subGroup = [{ id: 1, code: '1', name: '1-name', des: '1-name des', time: '2017-1-12 12:12' }, {id: 2, code: '2', name: '2-name', des: '2-name des', time: '2017-1-12 12:12'}]
        this.subject = [
            { id: 100, code: '01', name: '01-name', group: 1, des: '01-name des', num: 10, time: '2017-1-12 12:12' },
            {id: 101, code: '02', name: '02-name', group: 2, des: '02-name des', num: 16, time: '2017-1-12 15:10'},
            {id: 102, code: '03', name: '03-name', group: 1, des: '03-name des', num: 14, time: '2017-1-15 14:17'}]
    }
    /**
     * 创建科目/科目组
     * @param object data
     */
    create (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.userpost, data).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // 获取预算管理图表数据
    getList () {
        return new Promise((resolve, reject) => {
            var list = []
            var item = {
                'address': 'PB新大厦',
                'workorders': [{
                    'id': 38134,
                    'title': 'PB新大厦 保洁',
                    'planstart': '2018-01-16 17:51:55',
                    'planfinish': '2018-01-17 17:51:55',
                    'realstart': null,
                    'realfinish': null,
                    'source_type': 'App\\Models\\ServiceEvent', // App\Models\PlanTask,App\Models\ServiceRequest,App\Models\Issue
                    'planmoney': '￥ 1927.3',
                    'realmoney': null,
                    'issettleaccounts': 0,
                    'supplier': '供应商名称'
                }, {
                    'id': 38135,
                    'title': 'PB环洋 保洁',
                    'planstart': '2018-01-18 14:51:55',
                    'planfinish': '2018-01-18 18:51:55',
                    'realstart': '2018-01-18 13:51:55',
                    'realfinish': '2018-01-18 18:51:55',
                    'source_type': 'App\\Models\\ServiceEvent', // App\Models\PlanTask,App\Models\ServiceRequest,App\Models\Issue
                    'planmoney': '￥ 1927.3',
                    'realmoney': '￥ 1924.3',
                    'issettleaccounts': 1,
                    'supplier': '供应商名称'
                }, {
                    'id': 38136,
                    'title': 'PB东升 保洁',
                    'planstart': '2018-01-18 14:51:55',
                    'planfinish': '2018-01-18 18:51:55',
                    'realstart': '2018-01-16 17:51:55',
                    'realfinish': '2018-01-18 18:51:55',
                    'source_type': 'App\\Models\\ServiceEvent', // App\Models\PlanTask,App\Models\ServiceRequest,App\Models\Issue
                    'planmoney': '￥ 1927.3',
                    'realmoney': '￥ 1924.3',
                    'issettleaccounts': 1,
                    'supplier': '供应商名称'
                }]
            }
            list.push(item)
            item.address = 'PB环洋'
            list.push(item)
            resolve(list)
            item = {
                'id': 38134,
                'title': 'PB新大厦 保洁',
                'planstart': '2018-01-16 17:51:55',
                'planfinish': '2018-01-17 17:51:55',
                'realstart': null,
                'realfinish': null,
                'description': 'y',
                'workorderid': 'O15160963151428S',
                'priority': 3,
                'profession_id': 15,
                'wotype_id': 2,
                'phone': '13840857349',
                'source_type': 'App\\Models\\ServiceEvent', // App\Models\PlanTask,App\Models\ServiceRequest,App\Models\Issue
                'source_id': 7147,
                'operator_type': 'App\\Models\\User',
                'operator_id': 20,
                'status': 2,
                'turn': 0,
                'dot': 0,
                'clock': 0,
                'time_effect': 0,
                'is_supervise': 0,
                'group_id': null,
                'associatenumber': 0,
                'remark': null,
                'created_by': null,
                'updated_by': null,
                'valid_time': '1516096314591259',
                'created_at': '2018-01-16 17:51:55',
                'updated_at': '2018-01-16 17:51:55',
                'deleted_at': null,
                'source': {
                    'id': 7147,
                    'title': 'PB新大厦 普通报障',
                    'created_at': '2018-01-16 17:51:55',
                    'status': 2,
                    'source': 1,
                    'description': 'y',
                    'serious': 3,
                    'wotype_id': 2,
                    'inspector_type': 'App\\Models\\User',
                    'inspector_id': 1,
                    'inspector': {
                        'id': 1,
                        'name': 'admin',
                        'sex_name': '未知',
                        'professions': [{
                            'id': 2,
                            'name': '工种2',
                            'pivot': {
                                'user_id': 1,
                                'profession_id': 2
                            }
                        }, {
                            'id': 6,
                            'name': 'PB技师',
                            'pivot': {
                                'user_id': 1,
                                'profession_id': 6
                            }
                        }]
                    },
                    'status_name': '处理中',
                    'serious_name': '一般',
                    'wotype_name': '保洁',
                    'source_name': '普通报障'
                },
                'status_name': '已分配',
                'priority_name': '低',
                'wotype_name': '保洁',
                'source_name': '事件',
                'images': [],
                'sites': [{
                    'id': 452933,
                    'wo_id': 38134,
                    'space_id': 0,
                    'tier_id': 0,
                    'building_id': 2,
                    'dot_status': 0,
                    'site_type': 'App\\Models\\Building',
                    'site_id': 2,
                    'shortname': 'PB新大厦',
                    'site': {
                        'id': 2,
                        'name': 'PB新大厦',
                        'shortname': null,
                        'zone_id': 2,
                        'city_id': 1,
                        'longitude': '116.2837410000',
                        'latitude': '40.0444840000',
                        'diviation': '1000',
                        'url': null,
                        'location': null,
                        'status': null,
                        'created_by': null,
                        'updated_by': null,
                        'created_at': '2017-10-10 11:42:24',
                        'updated_at': '2017-10-19 14:59:10',
                        'deleted_at': null,
                        'dots': []
                    }
                }],
                'profession': {
                    'id': 15,
                    'name': 'PB内保主管',
                    'description': null
                },
                'iotdatas': [],
                'operator': {
                    'id': 20,
                    'phone': '13522649138',
                    'sex': 2,
                    'age': 0,
                    'name': '张友芳',
                    'avatar': 'http://veryid.chinacloudapp.cn:91//uploads//temp//20171012//1507801463537.jpg',
                    'profession_id': 15,
                    'active': 1,
                    'group_id': 71,
                    'leader': 1,
                    'priority': 1,
                    'city_id': 1,
                    'site_type': 'App\\Models\\Zone',
                    'site_id': 2,
                    'station': '北京 PB新大厦',
                    'created_by': 27,
                    'updated_by': 27,
                    'entry_at': '2017-12-31 12:00:00',
                    'maindirectory': 'A500',
                    'directory_status': 0,
                    'created_at': '2017-10-10 13:29:10',
                    'updated_at': '2018-01-17 09:30:38',
                    'deleted_at': null,
                    'sex_name': '女'
                },
                'associates': [],
                'objects': [{
                    'id': 88,
                    'name': '卫生',
                    'objecttype': 12,
                    'is_consumable': 0,
                    'is_property': 0,
                    'created_by': null,
                    'updated_by': null,
                    'created_at': '2017-10-10 14:49:56',
                    'updated_at': '2017-10-10 14:49:56',
                    'deleted_at': null,
                    'pivot': {
                        'wo_id': 38134,
                        'object_id': 88,
                        'id': 541713
                    }
                }],
                'consumables': [],
                'supervises': [],
                'records': [{
                    'id': 118371,
                    'wo_id': 38134,
                    'operator_type': 'App\\Models\\User',
                    'operator_id': 1,
                    'status': 1,
                    'comment': 'admin创建工单，工单待分配 13840857349',
                    'handler_type': 'App\\Models\\User',
                    'handler_id': 1,
                    'note': '',
                    'associate_id': null,
                    'associate_status': 0,
                    'created_at': '2018-01-16 17:51:55',
                    'status_name': '创建',
                    'associator': null,
                    'handler': {
                        'id': 1,
                        'phone': '13840857349',
                        'sex': 0,
                        'age': 0,
                        'name': 'admin',
                        'avatar': 'https:\\\\veryid.chinacloudapp.cn\\uploads\\temp\\20180109\\1515477152835.jpg',
                        'profession_id': 2,
                        'active': 1,
                        'group_id': 14,
                        'leader': 1,
                        'priority': 99,
                        'city_id': 1,
                        'site_type': 'App\\Models\\Zone',
                        'site_id': 3,
                        'station': '北京 环洋',
                        'created_by': 1,
                        'updated_by': 1,
                        'entry_at': '2017-09-30 14:36:50',
                        'maindirectory': 'A500',
                        'directory_status': 0,
                        'created_at': '2017-08-15 01:56:47',
                        'updated_at': '2018-01-09 13:52:35',
                        'deleted_at': null,
                        'sex_name': '未知'
                    }
                }, {
                    'id': 118372,
                    'wo_id': 38134,
                    'operator_type': 'App\\Models\\User',
                    'operator_id': 20,
                    'status': 2,
                    'comment': '系统已分配工单给张友芳',
                    'handler_type': 'App\\Models\\System',
                    'handler_id': 1,
                    'note': '',
                    'associate_id': null,
                    'associate_status': 0,
                    'created_at': '2018-01-16 17:51:55',
                    'status_name': '派发',
                    'associator': null,
                    'handler': {
                        'id': 1,
                        'name': '系统'
                    }
                }],
                'issues': []
            }
        })
    }

    /**
     * 验证科目组编号是否存在
     * @param string code
     */
    checkGroupCode (code) {
        return new Promise((resolve, reject) => {
            var flag = this.subGroup.find(g => {
                return g.code == code
            })
            resolve(!flag)
        })
    }

    /**
     * 验证科目组名称是否存在
     * @param string name
     */
    checkGroupName (name) {
        return new Promise((resolve, reject) => {
            var flag = this.subGroup.find(g => {
                return g.name == name
            })
            resolve(!flag)
        })
    }

    /**
     * 创建科目组
     * @param object data
     */
    createGroup (data) {
        return new Promise((resolve, reject) => {
            var value = Object.create(null)
            for (var i in data) {
                value[i] = data[i]
            }
            var id = this.subGroup[this.subGroup.length - 1].id
            value['id'] = (++id)
            this.subGroup.push(value)
            resolve()
        })
    }

    /**
     * 创建科目组
     * @param
     */
    getGroup () {
        return new Promise((resolve, reject) => {
            var value = JSON.stringify(this.subGroup)
            resolve(JSON.parse(value))
        })
    }

    /**
     * 删除科目组
     * @param
     */
    delGroup (code) {
        return new Promise((resolve, reject) => {
            _.remove(this.subGroup, function (g) {
                return g.code == code
            })
            resolve()
        })
    }

    /**
     * 验证科目编号是否存在
     * @param string code
     */
    checkSubjectCode (code) {
        return new Promise((resolve, reject) => {
            var flag = this.subject.find(s => {
                return s.code == code
            })
            resolve(!flag)
        })
    }

    /**
     * 验证科目名称是否存在
     * @param string name
     */
    checkSubjectName (name) {
        return new Promise((resolve, reject) => {
            var flag = this.subject.find(s => {
                return s.name == name
            })
            resolve(!flag)
        })
    }

    /**
     * 创建科目
     * @param object data
     */
    createSubject (data) {
        return new Promise((resolve, reject) => {
            var value = Object.create(null)
            for (var i in data) {
                value[i] = data[i]
            }
            var id = this.subject[this.subject.length - 1].id
            value['id'] = (++id)
            this.subject.push(value)
            resolve()
        })
    }

    /**
     * 获取科目
     * @param
     */
    getSubject () {
        return new Promise((resolve, reject) => {
            var value = JSON.stringify(this.subject)
            resolve(value)
        })
    }

    /**
     * 删除科目组
     * @param
     */
    delSubject (code) {
        return new Promise((resolve, reject) => {
            _.remove(this.subject, function (g) {
                return g.code == code
            })
            resolve()
        })
    }

    getAll () {
        return new Promise((resolve, reject) => {
            var value = this.subGroup.concat(this.subject)
            resolve(value)
        })
    }

    getSubjectByCode (code) {
        return new Promise((resolve, reject) => {
            var value = this.subject.find(s => {
                return s.code == code
            })
            var temp = JSON.stringify(value)
            resolve(JSON.parse(temp))
        })
    }

    getGroupByCode (code) {
        return new Promise((resolve, reject) => {
            var value = this.subGroup.find(s => {
                return s.code == code
            })
            var temp = JSON.stringify(value)
            resolve(JSON.parse(temp))
        })
    }
}

export default new Budget()
