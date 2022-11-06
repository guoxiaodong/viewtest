import ServerHttp from './http'

/**
 * 空间相关接口
 */
class SpaceInfo extends ServerHttp {
    /* 空间对象 */

    /**
    * 添加地点
    */
    addPlace (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addPlace, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取空间类型
    */
    getAllSpaceType () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAllSpaceType).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取修改地点信息
    */
    getPlaceInfo (ids) {
        let url = this.urlFormat(this.map.getPlaceInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url, ids).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 修改地点
    */
    putPlace (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putPlace, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 删除地点
    */
    delPlace (id) {
        let url = this.urlFormat(this.map.delPlace, id)
        return new Promise((resolve, reject) => {
            this.axios.post(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /* 空间管理对象 */
    putSpaceObject (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putSpaceObject, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取选中对象
    */
    getSpaceObjectInfo (ids) {
        let url = this.urlFormat(this.map.getSpaceObjectInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 修改空间管理对象
    */

    /**
    * 删除空间管理对象
    */
    delSpaceObject (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.delSpaceObject, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /* 空间类型 */

    /**
     * 添加空间类型
     */
    addSpace (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addSpace, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 获取修改空间信息
    */
    getSpaceInfo (ids) {
        let url = this.urlFormat(this.map.getSpaceInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url, ids).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 编辑空间
    */
    editSpace (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.editSpace, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
    * 删除空间
    */
    delSpaceType (ids) {
        let url = this.urlFormat(this.map.delSpaceType, ids)
        return new Promise((resolve, reject) => {
            this.axios.post(url, ids).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new SpaceInfo()
