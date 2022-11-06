import ServerHttp from './http'

/**
 * 对象相关接口
 */
class ManageObject extends ServerHttp {

    /**
     * 获取所有对象大类
     */
    getAll () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.object).then((response) => {
                let formatData = []
                for (let v of response.data) {
                    formatData.push({id: v.id, name: v.name, pid: 0})
                }
                resolve(formatData)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    *添加对象大类
    */
    addManageType (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addManageType, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    *删除对象大类
    */
    delManagetype (ids) {
        let url = this.urlFormat(this.map.delManagetype, ids)
        return new Promise((resolve, reject) => {
            this.axios.post(url, ids).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    *编辑对象大类
    */
    editManagetype (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.editManagetype, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    *获取标准组
    */
    getGroup () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getGroup).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取标准项
    */
    getGroupInfo (ids) {
        let url = this.urlFormat(this.map.getGroupInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url, ids).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 添加管理对象
    */
    addObject (data) {
        let formatData = {
            objectname: '',
            objecttype: 0,
            standards: [],
            standardgroup: []
        }

        formatData.objectname = data.objectname
        formatData.objecttype = data.typeid

        for (let item of data.items) {
            formatData.standardgroup.push({id: item.groupid})
            for (let standard of item.standards) {
                formatData.standards.push({
                    value: standard.value,
                    pid: item.groupid
                })
            }
        }
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addObject, formatData).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取修改管理对象信息
    */
    getObjectInfo (ids) {
        let url = this.urlFormat(this.map.getObjectInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url, ids).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 修改管理对象
    */
    putObject (data) {
        let formatData = {
            id: 0,
            objectname: '',
            objecttype: 0,
            standards: [],
            standardgroup: []
        }

        formatData.objectname = data.objectname
        formatData.objecttype = data.typeid
        formatData.id = data.id
        for (let item of data.items) {
            formatData.standardgroup.push({id: item.groupid})
            for (let standard of item.standards) {
                formatData.standards.push({
                    value: standard.value,
                    pid: item.groupid
                })
            }
        }
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putObject, formatData).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    *删除对象
    */
    delobject (ids) {
        let url = this.urlFormat(this.map.delObject, ids)
        return new Promise((resolve, reject) => {
            this.axios.post(url, ids).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 标准组  **/

    /**
    * 获取标准组信息
    */
    getStandardlist () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getStandardlist).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 添加标准组
    */
    addStandard (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addStandard, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取标准组信息
    */
    getStandardInfo (id, page) {
        let url = this.urlFormat(this.map.getStandardInfo, id, page)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 修改标准组
    */
    putStandard (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putStandard, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 删除标准组
    */
    delStandard (ids) {
        let url = this.urlFormat(this.map.delStandard, ids)
        return new Promise((resolve, reject) => {
            this.axios.post(url, ids).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取更多标准组信息
    */
    // getStandardsList (id, page) {
    //     let url = this.urlFormat(this.map.getStandardInfo, id, page)
    //     return new Promise((resolve, reject) => {
    //         this.axios.get(url).then((response) => {
    //             resolve(response.data)
    //         }).catch(function (error) {
    //             reject(error.error)
    //         })
    //     })
    // }

    /**
     * 搜索标准项
     */
    searchStandard (groupId, search) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.searchStandard, {id: groupId, standvalue: search}).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new ManageObject()
