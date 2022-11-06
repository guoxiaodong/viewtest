import ServerHttp from './http'

/**
 * 角色相关接口
 */
class User extends ServerHttp {

    /**
     * 创建用户
     * @param array data
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

    /**
     * 获取用户详情
     * @param int id
     */
    get (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.userinfo + '?id=' + id).then(function (response) {
                resolve(response.data.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 编辑角色
     * @param array data
     */
    edit (data) {
        // let url = this.urlFormat(this.map.userupdate, data.id)
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.userupdate, data).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取用户角色
     * @param int id
     */
    userroles (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.userroles + '?id=' + id).then(function (response) {
                resolve(response.data.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 编辑用户角色
     * @param array data
     */
    userrolesadd (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.userrolesadd, data).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 编辑用户角色
     * @param array data
     */
    checkPhone (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.checkPhone, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 获取用户供应商对应部门
     */
    groupItems (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.groupItems + '?id=' + id).then(function (response) {
                resolve(response.data.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

}

export default new User()
