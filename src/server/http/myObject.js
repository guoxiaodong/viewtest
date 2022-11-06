import ServerHttp from './http'

/**
 * 对象相关接口
 */
class MyObject extends ServerHttp {

    /**
     * 获取所有对象
     */
    getAll () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.object).then((response) => {
                let formatData = []
                for (let v of response.data) {
                    let tid = 't' + v.id
                    formatData.push({id: tid, name: v.name, pid: 0})
                    for (let child of v.objects) {
                        formatData.push({id: child.id, name: child.name, pid: tid})
                    }
                }
                resolve(formatData)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取对象临时方案
    getAllObject () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.object).then((response) => {
                let formatData = []

                for (let v of response.data) {
                    let tid = 't' + v.id
                    if (v.objects == '') {
                        // response.data.splice(0, 1)
                    } else {
                        formatData.push({id: tid, name: v.name, pid: 0})
                        for (let child of v.objects) {
                            formatData.push({id: child.id, name: child.name, pid: tid})
                        }
                    }
                }
                resolve(formatData)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 获取角色的对象
     * @param int roleid 角色编号
     */
    getRoleObjects (roleid) {
        let url = this.urlFormat(this.map.relateObjects, 'role', roleid)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 角色关联
     * @param int roleid
     * @param array objects
     */
    roleRelate (roleid, objects) {
        let url = this.urlFormat(this.map.relateObjects, 'role', roleid)
        let ids = []
        for (let p of objects) {
            ids.push(p.id)
        }

        return new Promise((resolve, reject) => {
            this.axios.put(url, {'ids': ids.join(',')}).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

}

export default new MyObject()
