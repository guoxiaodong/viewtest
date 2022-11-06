import ServerHttp from './http'

/**
 * 角色相关接口
 */
class Role extends ServerHttp {

    /**
     * 创建角色
     * @param array data
     */
    create (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.role, data).then(function (response) {
                resolve()
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
        let url = this.urlFormat(this.map.roleParam, data.id)
        return new Promise((resolve, reject) => {
            this.axios.put(url, data).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 删除角色
     * @param string ids
     */
    delete (ids) {
        let url = this.urlFormat(this.map.roleParam, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new Role()
