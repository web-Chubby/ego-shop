import axios from '../utils/request'
import base from './base'

const api = {
    //登录接口
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    //商品查询接口
    getSelectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {params: params})
    },
    //商品总条数
    getTotal() {
        return axios.get(base.baseUrl + base.total)
    },
    //商品删除
    getDeleteItemById(params) {
        return axios.get(base.baseUrl + base.deleteItemById, {
            params: params
        })
    },
    //类目选择接口
    getSelectItemCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId,{
            params
        })
    },
    //添加商品接口
    getInsertTbItem(params){
        return axios.get(base.baseUrl + base.insertTbItem,{
            params
        })
    },
    //预更新接口
    getPreUpdateItem(params){
        return axios.get(base.baseUrl + base.preUpdateItem,{
            params
        })
    },
    //商品修改接口
    getUpdateTbItem(params){
        return axios.get(base.baseUrl + base.updateTbItem,{
            params
        })
    },
}

export default api