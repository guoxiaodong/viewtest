import ServerHttp from './http'

/**
 * 物料基本配置相关接口
 */
class Service extends ServerHttp {
    /**
     * 获取供应商服务目录
     */
    supplierCata () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.supplierCata).then((response) => {
                var data = {}
                data.service = response.data
                data.name = '全部'
                data.id = 0
                resolve(data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取内部服务目录
    internalCata () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.internalCata).then((response) => {
                var data = {}
                data.service = response.data
                data.name = '全部'
                data.id = 0
                resolve(data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 分类名重复
    checkCataname (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.checkServiceCataname, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 服务组名重复
    checkGroup (id, data) {
        let url = this.urlFormat(this.map.checkServiceGroup, id)
        return new Promise((resolve, reject) => {
            this.axios.put(url, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 添加服务组分类
    addServiceClass (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.addServiceClass, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 添加服务组
    addServiceGroup (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.addServiceGroup, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 添加内部服务分类
    addInternalClass (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.addInternalClass, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 供应商一级目录删除验证(服务组分类)
    supplierremoveCheck (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.supplierremoveCheck, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 其他删除验证（服务组）
    cataRemoveCheck (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.cataRemoveCheck, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 目录一级删除(服务组分类)
    removeCataClass (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.removeCataClass, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 目录二级删除（服务组）
    removeCataGroup (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.removeCataGroup, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 目录详情
    cataDetail (ids, data) {
        let url = this.urlFormat(this.map.cataDetail, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 目录详情修改
    cataDetailModify (ids, data) {
        let url = this.urlFormat(this.map.cataDetailModify, ids)
        return new Promise((resolve, reject) => {
            this.axios.put(url, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 节点拖拽
    changeNode (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.changeNode, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    //
    //
    //
    //
    // 查询模块
    supplierStepOne (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.supplierStepOne, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    supplierStepThree (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.supplierStepThree, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    supplierStepFour (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.supplierStepFour, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 财务分类
    finances () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.finances).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 所属对象
    object () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.object).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 新建服务名查重
    testservicename (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.testservicename, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 第二步查询服务项
    getservicecolumns () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getservicecolumns).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 增加服务项
    addServiceItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addServiceItem, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 修改第二步服务项
    editServiceItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.editServiceItem, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 删除第二步服务项
    removeServiceItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.removeServiceItem, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 第三步
    // 增加服务等级
    addLevelItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.addLevelItem, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取编辑
    getEditLevel (ids) {
        let url = this.urlFormat(this.map.getEditLevel, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 提交编辑
    editLevel (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.editLevel, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 删除等级
    removeLevel (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.removeLevel, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 登记查重
    checkname (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.checkname, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 第四步供应商下拉
    getSupplierItem () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getSupplierItem).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取等级
    getLevels () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getLevels).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取分支
    getbranchs () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getbranchs).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 提交新建
    submitSupplier (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.submitSupplier, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 第四步删除供应商
    removeSupplier (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.removeSupplier, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取编辑供应商
    getEditSupplier (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getEditSupplier, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 提交供应商修改
    submitEdit (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.submitEdit, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 内部
    // 第一步
    // 下拉工单类型
    interWorktype () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.interWorktype).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 新建内部服务
    submitInternal (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.submitInternal, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取服务范围
    getServicePlace () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getServicePlace).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 名称查重
    checkNameInetrnal (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.checkNameInetrnal, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 第二步
    // 获取添加备选
    getItemSupplierService (data = null) {
        if (!data) {
            return new Promise((resolve, reject) => {
                this.axios.get(this.map.getItemSupplierService).then((response) => {
                    resolve(response.data)
                }).catch(function (error) {
                    reject(error.error)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                this.axios.get(this.map.getItemSupplierService, {params: data}).then((response) => {
                    resolve(response.data)
                }).catch(function (error) {
                    reject(error.error)
                })
            })
        }
    }
    // 添加
    addSupplier (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addSupplier, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 删除
    removeinternalSupplier (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.removeinternalSupplier, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 编辑
    editInternalService (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.editInternalService, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 列表操作
    removeList (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.removeList, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    serviceStart (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.serviceStart, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    serviceStop (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.serviceStop, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    getSupplierPlace () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getSupplierPlace).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    getInternalPlace () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getInternalPlace).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    interDetail (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.interDetail, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    interEdit (id, data) {
        let url = this.urlFormat(this.map.interEdit, id)
        return new Promise((resolve, reject) => {
            this.axios.post(url, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    supplierDetail (data) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.supplierDetail, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    supplierEdit (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.supplierEdit, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    getIcon () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getIcon).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new Service()
