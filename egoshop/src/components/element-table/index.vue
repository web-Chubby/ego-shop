<template>
    <el-table :data="tableData" style="width:100%">
        <slot></slot>
    </el-table>
</template>

<script>
    export default {
        name: "ElementTable",
        data(){
            return{

            }
        },
        props:{
            tableData:{
                type:Array,
                default:() =>{
                    return []
                }
            }
        }
    }
</script>

<style scoped>

</style>