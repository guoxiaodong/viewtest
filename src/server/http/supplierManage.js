import ServerHttp from './http'

/**
 * 供应商管理相关接口
 */
class SupplierManage extends ServerHttp {
    /**
     *  供应商相关接口
     */
    /** 获取合同状态、合作状态 **/
    getListStatus () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getListStatus).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    CheckSuppName (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.CheckSuppName, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  添加供应商  **/
    addSupp (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addSupp, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取修改供应商信息  **/
    getSupplierInfo (ids) {
        let url = this.urlFormat(this.map.getSupplierInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 修改供应商  **/
    putSupplier (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putSupplier, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 删除供应商  **/
    delSupplier (ids) {
        let url = this.urlFormat(this.map.delSupplier, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     *  概况相关接口
     */
    /** 获取接单量echart数据  **/
    getOrderNum (ids, timeid, starttime, endtime) {
        let url = this.urlFormat(this.map.getOrderNum, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url + '?period=' + timeid + '&starttime=' + starttime + '&endtime=' + endtime).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取主要门店  **/
    getMainStore (ids) {
        let url = this.urlFormat(this.map.getMainStore, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取工单类占比echart数据  **/
    getWorkOrderEchart (ids, timeid, starttime, endtime, typeid) {
        let url = this.urlFormat(this.map.getWorkOrderEchart, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url + '?period=' + timeid + '&starttime=' + starttime + '&endtime=' + endtime + '&type=' + typeid).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取供应商能力echart数据  **/
    getIndexEchart (ids) {
        let url = this.urlFormat(this.map.getIndexEchart, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取分支机构概况  **/
    getBranchInfoEchart (ids) {
        let url = this.urlFormat(this.map.getBranchInfoEchart, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取分支机构echart数据  **/
    getBasicBranchEchart (ids) {
        let url = this.urlFormat(this.map.getBasicBranchEchart, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 服务相关接口
     */
    /**  获取服务数量   **/
    getSerNum (ids) {
        let url = this.urlFormat(this.map.getSerNum, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取供应商服务下拉选项  **/
    getSerInfoList () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getSerInfoList).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取服务分支  **/
    getBranchList (ids) {
        let url = this.urlFormat(this.map.getBranchList, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取服务级别   **/
    getSerLevel (ids) {
        let url = this.urlFormat(this.map.getSerLevel, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  添加服务   **/
    addSer (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addSer, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  修改服务   **/
    putSer (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.addSer, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  删除服务   **/
    delSer (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.delSer, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 合同相关接口
     */
    /** 获取合同数量 */
    getContractCount (ids) {
        let url = this.urlFormat(this.map.getContractCount, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  验证合同名称是否重复    **/
    ContractNameExsits (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.ContractNameExsits, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 添加合同  **/
    addContract (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addContract, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  删除合同  **/
    delContract (ids) {
        let url = this.urlFormat(this.map.delContract, ids)
        return new Promise((resolve, reject) => {
            this.axios.post(url, ids).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取合同修改信息  **/
    getContractInfo (ids) {
        let url = this.urlFormat(this.map.getContractInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  修改合同  **/
    putContract (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putContract, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取合同内服务商下拉选项  */
    getSerSelect (ids) {
        let url = this.urlFormat(this.map.getSerSelect, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  合同内服务商添加、修改  **/
    addSerInfo (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addSerInfo, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
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

    /**
     *  历史工单
     */
    /** 获取历史工单数量  **/
    getHistoryWorkOrderCount (ids) {
        let url = this.urlFormat(this.map.getHistoryWorkOrderCount, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 历史工单价格、个数统计  **/
    getHistoryWorkOrderNum (ids) {
        let url = this.urlFormat(this.map.getHistoryWorkOrderNum, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取工单筛选列表  **/
    getFilterList (ids) {
        let url = this.urlFormat(this.map.getFilterList, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     *  分支结构
     */
    /** 添加分支  **/
    getAllSer () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAllSer).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    getAllSuppSer () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAllSuppSer).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    getAllplace () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getAllplace).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    addBranchList (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addBranchList, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  检验分支名称是否重复  **/
    CheckBranchName (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.CheckBranchName, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取分支修改信息  **/
    getBranchInfo (ids) {
        let url = this.urlFormat(this.map.getBranchInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 修改分支  **/
    putBranch (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.addBranchList, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  删除分支  **/
    delBranch (ids) {
        let url = this.urlFormat(this.map.delBranch, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取分支服务供应商下拉选项  **/
    getBranchSelectSupp (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getBranchSelectSupp + '?supplierbranch_id=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /*   获取分支服务级别下拉选项   **/
    getBranchSelectLevel (id) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getBranchSelectLevel + '?service_id=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  添加分支服务   **/
    addBranchSer (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.addBranchService, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取修改分支服务信息   */
    getBranchServiceInfo (ids, id) {
        let url = this.urlFormat(this.map.getBranchServiceInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url + '?service_id=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  修改分支服务  **/
    putBranchService (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putBranchService, data).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  删除分支服务  **/
    delBranchService (ids, id) {
        let url = this.urlFormat(this.map.delBranchService, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url + '?service_ids=' + id).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new SupplierManage()
