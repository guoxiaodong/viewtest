import ServerHttp from './http'

/**
 * 岗位相关接口
 */
class Post extends ServerHttp {

    /**
     * 获取工单类型
     * @param
     */
    workType () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.workType).then(function (response) {
                resolve(response)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取所有角色
     */
    allroles () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.allroles).then(function (response) {
                resolve(response)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
    * 新建
    */
    postadd (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.postadd, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
    * 删除
    */
    delete (ids) {
        let url = this.urlFormat(this.map.del, ids)
        return new Promise((resolve, reject) => {
            this.axios.post(url).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
    * 获取修改信息
    */
    allpost (ids) {
        let url = this.urlFormat(this.map.allpost, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
    * 修改岗位
    */
    putpost (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putpost, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

}
export default new Post()
