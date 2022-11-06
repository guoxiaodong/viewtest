// ztree.js

export default {
    methods: {
        ztreeOnCheck (treeObj, treeNode) {
            let flag = treeNode.checked
            // 解决：当子节点隐藏时，子节点未选中
            this.ztreeChildChecked(treeNode, flag)
        },
        ztreeChildChecked (node, flag) {
            let children = node.children
            if (children && children.length > 0) {
                for (let one of children) {
                    one.checked = flag
                    this.ztreeChildChecked(one, flag)
                }
            }
        },
        // 检查节点是否半选
        isHalfChecked (node) {
            let children = node.children
            let hasChildrent = !!children
            if (hasChildrent) {
                for (let child of children) {
                    if (!child.checked) {
                        return true
                    } else {
                        if (this.isHalfChecked(child)) {
                            return true
                        }
                    }
                }
            }
            return false
        },
        // 子节点收起
        zTreeOnCollapse (treeObj, treeNode) {
            treeObj.expandNode(treeNode, false)

            let children = treeNode.children

            if (typeof children != 'undefined') {
                for (let v of children) {
                    this.zTreeOnCollapse(treeObj, v)
                }
            }
        },
        /**
         * 获取节点的所有父节点名称
         * @param object node 当前节点
         */
        getFullParentNodeName (node, fullname = '') {
            let parentNode = node.getParentNode()

            if (!parentNode) {
                // 没有父节点
                return fullname
            } else {
                if (fullname) {
                    fullname = parentNode.name + ' / ' + fullname
                } else {
                    fullname = parentNode.name
                }
                return this.getFullParentNodeName(parentNode, fullname)
            }
        },
        // 展开第一个子节点
        getFirstTreeNode (treeNode, ztreeObj, expand = false) {
            let child = treeNode.children
            if (child) {
                if (expand) {
                    ztreeObj.expandNode(treeNode, true)
                }
                return this.getFirstTreeNode(child[0], ztreeObj, expand)
            } else {
                return treeNode
            }
        }
    }
}
