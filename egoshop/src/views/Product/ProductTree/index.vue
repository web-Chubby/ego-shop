<template>
    <el-tree
        :load="loadNode"
        :props="defaultProps"
        highlight-current
        lazy
        show-checkbox
        @node-click="handleNodeClick"
    >
    </el-tree>
</template>

<script>
    export default {
        name: "ProductTree",
        data(){
            return{
                data:[],
                defaultProps:{
                    children: 'children',
                    label: 'name'
                }
            }
        },
        methods:{
            handleNodeClick(data) {
                this.$emit('onTreeData', data);
            },
            loadNode(node, resolve){
                if (node.level === 0) {
                    this.$axios.getSelectItemCategoryByParentId().then(res => {
                        if (res.status === 200) {
                            return resolve(res.data.data);
                        } else {
                            alert('请求失败');
                        }
                    });
                }
                if (node.level >= 1) {
                    this.$axios.getSelectItemCategoryByParentId({
                        id: node.data.cid
                    }).then(res => {
                        if (res.status === 200) {
                                return resolve(res.data.data);
                            } else {
                                alert('请求失败');
                            }
                        })
                        .catch(error => {
                            resolve([]);
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>