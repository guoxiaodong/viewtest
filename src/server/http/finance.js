import ServerHttp from './http'

/**
 * 财务相关接口
 */
class Finance extends ServerHttp {
    /**
     * 保存科目、科目组(fid=0)
     * @param array data
     */
    save (data) {
        return new Promise((resolve, reject) => {
            if (!data.id) {
                this.axios.post(this.map.financePost, data).then(function (response) {
                    resolve()
                }).catch(function (error) {
                    reject(error.error)
                })
            } else {
                this.axios.put(this.map.financePut, data).then(function (response) {
                    resolve()
                }).catch(function (error) {
                    reject(error.error)
                })
            }
        })
    }

    /**
     * 创建科目、科目组(fid=0)
     * @param array data
     */
    create (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.financePost, data).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 编辑科目、科目组(fid=0)
     * @param array data
     */
    edit (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.financePut, data).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取科目、科目组(fid=0)
     * @param string ids
     */
    getAll () {
        let url = this.urlFormat(this.map.finances)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 删除角色
     * @param string ids
     */
    delete (id) {
        let url = this.urlFormat(this.map.financeDelete, id)
        return new Promise((resolve, reject) => {
            this.axios.delete(url).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 校验名称
     * @param string name
     */
    checkName (name) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.financeCheckName, name).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 校验编号
     * @param string ids
     */
    checkNo (no) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.financeCheckNo, no).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /* 预算设置中空间地点获取 */
    getSpace () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getSpace).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /* 获取科目（组）详情 */
    getFinanceDetail (id) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.getDetail, id)
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // 指定地址的某年的预算
    getYearFinanceByPlace (year, place) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.yearFinanceByPlace, year, place)
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // 指定地址的某年中每月的预算
    getPerMonthFinanceByPlace (year, place) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.monthFinanceByPlace, year, place)
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // /budget/s/date 预算设置中最右下角图表
    getBudgetSData (arg) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetSDate, {params: arg}).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    // /budget/{id} 弹出预算编辑的模态框时获取数据
    getBudgetById (id) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.budgetById, id)
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // /budget/{month}/{place_id} 获取预算详情，用于弹出框编辑
    getBudgetByMonthPlace (month, placeId) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.budgetByMonthPlace, month, placeId)
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // 预算设置中，预算编辑的保存
    budgetSave (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.budgetSave, data).then(function (response) {
                resolve()
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // /budget/webtips 预算概览最上面4个图表数据和中间menu数据
    budgetWebtips () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetWebtips).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // /budget/s/month // 预算概览最下面图表，按年统计的数据
    budgetSMonth (arg) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetSMonth, {params: arg}).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // /budget/placeLevel //地图图表数据获取
    budgetPlaceLevel (arg) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetPlaceLevel, {params: arg}).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // 预算概览页面饼图数据 /budget/s/finances/{year}
    budgetSFinancesYear (arg) {
        return new Promise((resolve, reject) => {
            let url = this.urlFormat(this.map.budgetSFinancesYear, arg.year)
            this.axios.get(url, {params: arg}).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    // /budget/s/building-rank 店铺支出排行
    budgetSBuildingRank (arg) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetSBuildingRank, {params: arg})
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error.error)
                })
        })
    }

    // /budget/s/notsettled-workorders 预算调整左侧 未完成工单列表
    budgetSNotSettledWorkorders (arg) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetSNotSettledWorkorders, {params: arg})
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error.error)
                })
        })
    }

    // /supplier/lists 供应商列表
    supplierLists () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.supplierLists, {params: null})
                .then(function (response) {
                    resolve(response.data.data)
                })
                .catch(function (error) {
                    reject(error.error)
                })
        })
    }

    // /budget/s/building-workorder 预算调整图表
    budgetSBuildingWorkorder (arg) {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetSBuildingWorkorder, {params: arg})
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error.error)
                })
        })
    }

    // 工单状态颜色获取 /budget/colors
    getBudgetColors () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.budgetColors)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error.error)
                })
        })
    }
    // 工单状态颜色保存 /budget/colors
    setBudgetColors (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.budgetColors, data)
                .then(function (response) {
                    resolve()
                })
                .catch(function (error) {
                    reject(error.error)
                })
        })
    }

    // /budget/workorder/settle-account-time 设置结算时间
    bWOSettleAccountTime (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.bWOSettleAccountTime, data)
                .then(function (response) {
                    resolve()
                })
                .catch(function (error) {
                    reject(error.error)
                })
        })
    }
}

export default new Finance()
// export default Finance
