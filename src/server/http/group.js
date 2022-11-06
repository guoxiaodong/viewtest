import ServerHttp from './http'

/**
 * 组织相关接口
 */
class Organization extends ServerHttp {

    /**
     * 获取所有组织
     */
    getAll (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.groups + '?supplier_id=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取所有组织
     */
    getGroupChar (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getgroupchar + '?supplier_id=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取除了次要负责人所有组织成员
     */
    groupUser (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.groupuser + '?id=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取除了主要负责人组织成员
     */
    groupSecondUser (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.groupseconduser + '?id=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 创建组织
     * @param array data
     */
    create (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.group, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 编辑组织
     * @param array data
     */
    edit (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.group, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 删除组织
     * @param string ids 使用逗号连接
     */
    del (ids) {
        let url = this.urlFormat(this.map.groupsParam, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url, ids).then((response) => {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 创建组织成员
     * @param array data
     */
    addGroupUser (data, id) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.groupuser + '/' + id, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 修改组织成员
     * @param array data
     */
    updateGroupUser (data, id) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.groupuser + '/' + id, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 删除组织成员
     */
    deleteGroupUser (id) {
        return new Promise((resolve, reject) => {
            this.axios.delete(this.map.groupuser, {data: {'id': id}}).then((response) => {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取所有组织
     */
    GroupLabelall () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.grouplabelall).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 组织结构供应商列表
     */
    groupSupplierlist () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.groupsupplierlist).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

}

export default new Organization()
