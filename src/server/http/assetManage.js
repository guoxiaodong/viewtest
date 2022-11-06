import ServerHttp from './http'

/**
 * 供应商管理相关接口
 */
class AssetManage extends ServerHttp {
    /** 资产目录
     */
    /**
     * 获取资产类别
     */
    getclass () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.assettype).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 验证新增资产
     */
    checkAdd (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.checkAssettype, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 新增资产
     */
    addAssetType (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addAssettype, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 验证删除
     */
    checkremove (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.checkRemoveAssettype, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 删除资产
     */
    removeAssetType (data) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.removeAssettype, data)
            this.axios.delete(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 编辑物料大类名
    // editAssetType (data) {
    //     return new Promise((resolve, reject) => {
    //         this.axios.put(this.map.editAsset, data).then((response) => {
    //             resolve(response.data)
    //         }).catch(function (error) {
    //             reject(error.error)
    //         })
    //     })
    // }
    // 验证物料信息
    checkRemoveAssetItem (id) {
        let url = this.urlFormat(this.map.checkAssetItem, id)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 删除物料信息
    removeAssetItem (id) {
        let url = this.urlFormat(this.map.removeAssetItem, id)
        return new Promise((resolve, reject) => {
            this.axios.delete(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 修改物料信息
    editAssetItem (id, data) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.editAssetItem, id)
            this.axios.put(url, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 新增物料信息
    addAssetItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addAssetItem, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /*
   *
   *资产查询
   *
   *
   */
    /** 删除合同内服务商  **/
    delContractSer (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.delContractSer, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // 资产查询，加载分类，包括一级分类，二级分类，规格分类的数据
    getAssetsClass () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAssetsClass)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    // 加载自定义筛选条件,也即除了大类，二级分类，规格分类的查询条件的其他查询条件
    getAssetFilter () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAssetFilter)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    // 根据生成的自定义筛选条件，请求数据
    getAssetCondition () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAssetCondition)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    getAssetList () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAssetList)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.error)
                })
        })
    }

    // 获取资产记录
    getAssetRecord (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAssetRecord, {params: data})
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    // 根据规格id获取新增登记资产的自定义字段
    getAssetProperties (id) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.getAssetProperties, id)
            this.axios.get(url)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    // 获取所有空间，用于新增登记资产时存放地点选择
    getSpaceAll () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getSpaceAll)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    // 新登记资产
    newAsset (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.asset, data)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    // 获取资产列表的自定义列
    getColProp () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.colProp)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }

    // 获取资产详情
    getAssetDetail (id) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.assetDetail, id)
            this.axios.get(url)
                .then(response => {
                    resolve(response.data || null)
                })
                .catch(error => {
                    reject(error.error || error)
                })
        })
    }
}

export default new AssetManage()
