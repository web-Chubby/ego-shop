const base = {
    baseUrl:'/api',
    //登录
    login:'/login',
    //商品查询
    selectTbItemAllByPage:'/backend/item/selectTbItemAllByPage',
    //商品总条数地址
    total:"/total",
    //商品删除地址
    deleteItemById:"/backend/item/deleteItemById",
    //类目选择地址
    selectItemCategoryByParentId:"/backend/itemCategory/selectItemCategoryByParentId",
    //添加商品地址
    insertTbItem:"/backend/item/insertTbItem",
    //预更新
    preUpdateItem:"/backend/item/preUpdateItem",
    //商品修改地址
    updateTbItem:"/backend/item/updateTbItem",
}

export default base