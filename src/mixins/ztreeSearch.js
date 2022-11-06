// ztree.js

export default {
    methods: {
        ztreeSearch (ztreeObj, data, search) {
            // 显示已隐藏的节点
            let hiddenNodes = ztreeObj.getNodesByParam('isHidden', true)
            ztreeObj.showNodes(hiddenNodes)
            if (!search) {
                return
            }
            let showNodes = []
            // 检索需要隐藏的节点
            for (let v of data) {
                let node = ztreeObj.getNodeByParam('tId', v.tId)
                if (v.name.indexOf(search) < 0) {
                    ztreeObj.hideNode(node)
                } else {
                    showNodes.push(node)
                }
            }

            // 显示查询出的节点的父节点
            for (let v of showNodes) {
                // 显示所有父节点
                this.showAllParentNodes(ztreeObj, v)
            }
        },
        showAllParentNodes (ztreeObj, node) {
            if (node) {
                let parentNode = node.getParentNode()
                ztreeObj.showNode(parentNode)
                return this.showAllParentNodes(ztreeObj, parentNode)
            }
        }
    }
}
