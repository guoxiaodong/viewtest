import ServerHttp from './http'
/**
 * 工单接口
 */
class WorkOrder extends ServerHttp {
    workBuild () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.workBuild).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
    getWorkType () {
        return new Promise((resolve, reject) => {
            this.axios.get(this.map.getWorkType).then((response) => {
                resolve(response.data)
            }).catch(function (error) {
                reject(error.error)
            })
        })
    }
}

export default new WorkOrder()
