import ServerHttp from './http'

/**
 * 权限相关接口
 */
class Permission extends ServerHttp {

    /**
     * 获取所有权限
     */
    getAll () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.permissions).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 新增权限
     * @param object data
     */
    create (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.permission, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                // console.log(error)
                reject(error.error)
            })
        })
    }

    /**
     * 编辑权限
     * @param object data
     */
    put (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.permission, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 删除权限
     * @param string ids 权限编号，使用逗号连接
     */
    del (ids) {
        let url = this.urlFormat(this.map.permissionsParam, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url, ids).then((response) => {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取角色的权限
     * @param int roleid 角色编号
     */
    getRolePermissions (roleid) {
        let url = this.urlFormat(this.map.rolePermissions, roleid)
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
     * @param array permissions
     */
    roleRelate (roleid, permissions) {
        let url = this.urlFormat(this.map.relatePermissions, 'role', roleid)
        let ids = []
        for (let p of permissions) {
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

export default new Permission()
