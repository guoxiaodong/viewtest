import ServerHttp from './http'

/**
 * 流程相关接口
 */
class ProcessManage extends ServerHttp {
    /**
     * 获取流程配置信息
     */
    getFlowConfig () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getFlowConfig).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 获取流程详情
     */
    showFlowInfo (id) {
        let url = this.urlFormat(this.map.showFlowInfo, id)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 创建流程
     */
    addFlowInfo (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.getFlowList, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 编辑流程  **/
    putFLowInfo (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.getFlowList, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**
     * 删除流程
     */
    delFlowInfo (ids) {
        let url = this.urlFormat(this.map.showFlowInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 获取流程图
     */
    getFlowChart (flowid) {
        let url = this.urlFormat(this.map.getFlowChart, flowid)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 根据不用的接口获取数据
     */
    getData (url) {
        return new Promise((resolve, reject) => {
            this.axios.get(url).then(function (response) {
                resolve(response)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 检查流程名称 **/
    checkFlowName (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.checkFlowName, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }

    /**
     * 环节相关接口
     */

    /** 获取环节配置信息 **/
    getLinkConfig () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getLinkConfig).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取环节工单状态 **/
    getLinkStatus () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getLinkStatus).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取表单模板  **/
    getFormTemplate () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getFormTemplate).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取环节列表  **/
    getLinkList (url) {
        return new Promise((resolve, reject) => {
            this.axios.get(url).then(function (response) {
                resolve(response)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 新增环节-基本信息 **/
    addLink (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.putLink, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  新增环节-表单模板  **/
    addLinkForm (data) {
        return new Promise((resolve, reject) => {
            this.axios.put(this.map.putLink, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  获取环节信息  **/
    getLinkInfo (ids) {
        let url = this.urlFormat(this.map.getLinkInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.get(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /**  删除环节  **/
    delFlowLink (ids) {
        let url = this.urlFormat(this.map.getLinkInfo, ids)
        return new Promise((resolve, reject) => {
            this.axios.delete(url).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 获取按钮功能  **/
    getLinkAction () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getLinkAction).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    /** 检查环节名称 **/
    checkLinkName (data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.map.checkLinkName, data).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new ProcessManage()
