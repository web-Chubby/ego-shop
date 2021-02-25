<template>
    <el-pagination
            class="pagination"
            layout="prev, pager, next"
            background
            :total="total"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
    >
    </el-pagination>
</template>

<script>
    //分页
    export default {
        name: "ProductPagination",
        data(){
            return {
                total:0,
                currentPage:1
            }
        },
        methods:{
            handleCurrentChange(currentPage){
                this.$emit("currentPageEvent",currentPage)
            }
        },
        mounted() {
            this.$axios.getTotal().then(res=>{
                this.total = res.data.result[0]["count(*)"];//访问特殊字符使用[]
            })
        }
    }
</script>

<style scoped>
    .pagination{
        margin-top: 20px;
    }
</style>