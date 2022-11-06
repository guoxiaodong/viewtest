import ServerHttp from './http'

/**
 * 通用接口
 */
class Common extends ServerHttp {

    /**
     * 获取所有岗位
     */
    profession () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.profession).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取所有组织
     */
    group () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.grouplists).then(function (response) {
                resolve(response.data.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取站点地区
     */
    site () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.site).then(function (response) {
                resolve(response.data.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 获取站点地区
     */
    supper () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.supper).then(function (response) {
                resolve(response.data.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 获取对应部门
     */
    groupItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.groupItem, {params: data}).then(function (response) {
                resolve(response.data.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取配置信息
     */
    getConfig () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.config).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new Common()
