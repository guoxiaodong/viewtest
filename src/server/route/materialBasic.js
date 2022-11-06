export default {
    // 物料树形图
    materieltype: '/materiel/materieltype', // 获取物料大类树形图内容
    checkMaterialtype: '/materiel/materieltypeunique/{0}', // 验证添加物料大类
    addMaterialtype: '/materiel/materieltypeadd/{0}', // 添加物料大类
    removeMaterialtype: '/materiel/delmaterieltype/{0}', // 删除物料大类
    checkRemoveMaterialtype: '/materiel/testmaterielstock/{0}', // 验证删除物料大类
    editMaterial: '/materiel/materieltypeupdate', // 修改物料大类名称
    // 物料列表
    checkMaterialItem: '/materiel/testmateriel/{0}', // 验证删除物料信息
    removeMaterialItem: '/materiel/delmateriel/{0}', // 删除物料信息
    addMaterialItem: '/materiel/objectspecificationsadd', // 添加物料信息
    editMaterialItem: '/materiel/objectspecificationsupdate', // 修改物料信息
    /* 出入库相关
     *
     *
     *
     *
     */
    inventoryCatalog: '/materiel/specifictionlist', // 出入库树形图
    inventoryBasic: '/materiel/materielstockinfo/{0}', // 物料概况
    inventoryDetail: '/materiel/materielstockdetail/{0}', // 物料明细
    inventoryOpen: '/materiel/getmateriel/{0}', // 物料详情
    materialName: '/materiel/warehousespecifictionlist', // 物料信息分级名称
    InstorageMaterialN: '/materiel/putmateriel', // 无序物料入库
    InstorageMaterialY: '/materiel/putordermateriel', // 有序物料入库
    OutstorageMaterialN: '/materiel/outmateriel', // 无序物料出库
    OutstorageMaterialY: '/materiel/outordermateriel', // 有序物料出库
    Upload: '/upload', // 上传图片
    historyHandler: '/materiel/getwarehouses' // 查看历史入库人
}
