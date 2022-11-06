import ServerHttp from './http'

/**
 * 空间相关接口
 */
class Space extends ServerHttp {

    // constructor () {
    //     super()
    // }

    /**
     * 获取所有空间
     */
    allSpace () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.spaceFormat).then((response) => {
                let spacesFormat = response.data
                let spaces = []

                for (let v of spacesFormat) {
                    let options = v.options

                    for (let o of options) {
                        spaces.push({'id': o.value, 'pId': o.parentVal, 'name': o.text})
                    }
                }
                resolve(spaces)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取角色的空间
     * @param int roleid 角色编号
     */
    roleSpaces (roleid) {
        let url = this.urlFormat(this.map.roleSpaces, roleid)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 角色关联空间
     * @param int roleid
     * @param array sites
     */
    roleRelate (roleid, sites) {
        let url = this.urlFormat(this.map.relateSpaces, 'role', roleid)

        return new Promise((resolve, reject) => {
            this.axios.put(url, {'sites': sites}).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

}

export default new Space()
