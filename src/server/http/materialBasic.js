import ServerHttp from './http'

/**
 * 物料基本配置相关接口
 */
class MaterialBasic extends ServerHttp {

    /**
     * 获取物料类别
     */
    getclass () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.materieltype).then((response) => {
                var data = []
                for (var p in response.data) {
                    data.push(response.data[p])
                }
                resolve(data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 验证新增物料
     */
    checkAdd (ids, data) {
        let url = this.urlFormat(this.map.checkMaterialtype, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 新增物料
     */
    addMaterialType (ids, data) {
        let url = this.urlFormat(this.map.addMaterialtype, ids)
        return new Promise((resolve, reject) => {
            this.axios.put(url, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 验证删除
     */
    checkremove (ids) {
        let url = this.urlFormat(this.map.checkRemoveMaterialtype, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 删除物料
     */
    removeMaterialType (ids) {
        let url = this.urlFormat(this.map.removeMaterialtype, ids)
        return new Promise((resolve, reject) => {
            this.axios.post(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 编辑物料大类名
    editMaterialType (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.editMaterial, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 验证物料信息
    checkRemoveMaterialItem (id) {
        let url = this.urlFormat(this.map.checkMaterialItem, id)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 删除物料信息
    removeMaterialItem (id) {
        let url = this.urlFormat(this.map.removeMaterialItem, id)
        return new Promise((resolve, reject) => {
            this.axios.post(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 修改物料信息
    editMaterialItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.editMaterialItem, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 新增物料信息
    addMaterialItem (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.addMaterialItem, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /* 出入库部分
    *
    *
    *
    *
    *
    *
    *
    * */
    // 出入库树形图
    inventoryCatalog () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.inventoryCatalog).then((response) => {
                var mydata = []
                for (var v1 in response.data) {
                    response.data[v1].objecttypes = response.data[v1].objecttypes
                    for (var v3 in response.data[v1].objecttypes) {
                        response.data[v1].objecttypes[v3].objecttypes = response.data[v1].objecttypes[v3].wareobjects
                        for (var v4 in response.data[v1].objecttypes[v3].wareobjects) {
                            response.data[v1].objecttypes[v3].wareobjects[v4].warespecifications[0].warehouse_id = response.data[v1].objecttypes[v3].pivot.warehouse_id
                            response.data[v1].objecttypes[v3].wareobjects[v4].objecttypes = response.data[v1].objecttypes[v3].wareobjects[v4].warespecifications
                        }
                    }
                    mydata.push(response.data[v1])
                }
                resolve(mydata)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 出入库信息概要
    inventoryBasic (id, data) {
        let url = this.urlFormat(this.map.inventoryBasic, id)
        return new Promise((resolve, reject) => {
            this.axios.get(url, {params: data}).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 出入库信息详细
    // inventoryDetail (id, data) {
    //     let url = this.urlFormat(this.map.inventoryDetail, id)
    //     return new Promise((resolve, reject) => {
    //         this.axios.get(url, {params: data}).then((response) => {
    //             resolve(response.data)
    //         }).catch(function (error) {
    //             reject(error.error)
    //         })
    //     })
    // }
    // 出入库查看
    inventoryOpen (id) {
        let url = this.urlFormat(this.map.inventoryOpen, id)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 无序物料入库
    InstorageMaterialN (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.InstorageMaterialN, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 有序物料入库
    InstorageMaterialY (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.InstorageMaterialY, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 无序物料出库
    OutstorageMaterialN (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.OutstorageMaterialN, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 有序物料出库
    OutstorageMaterialY (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.OutstorageMaterialY, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 获取物料信息分级名称
    materialName () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.materialName).then((response) => {
                var mydata = []
                var mydata1 = []
                var mydata2 = []
                var mydataI = []
                var mydataN = []
                // 处理四层嵌套成一个二元数组，第一项id与第二项name顺序相同
                for (var v1 in response.data) {
                    for (var v3 in response.data[v1].objecttype) {
                        for (var v4 in response.data[v1].objecttype[v3].object) {
                            for (var v5 in response.data[v1].objecttype[v3].object[v4].specifications) {
                                mydataI.push(response.data[v1].id)
                                mydataN += (response.data[v1].name)
                                mydataI.push(response.data[v1].objecttype[v3].id)
                                mydataN += '/' + (response.data[v1].objecttype[v3].name)
                                mydataI.push(response.data[v1].objecttype[v3].object[v4].id)
                                mydataN += '/' + (response.data[v1].objecttype[v3].object[v4].name)
                                mydataI.push(response.data[v1].objecttype[v3].object[v4].specifications[v5].id)
                                mydataN += '/' + (response.data[v1].objecttype[v3].object[v4].specifications[v5].name)
                                mydata1.push(mydataI)
                                mydata2.push(mydataN)
                                mydataI = []
                                mydataN = []
                            }
                        }
                    }
                }
                mydata.push(mydata1, mydata2)
                resolve(mydata)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 查看历史入库人
    historyHandler () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.historyHandler).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new MaterialBasic()

