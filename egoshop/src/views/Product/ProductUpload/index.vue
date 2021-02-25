<template>
    <el-upload
            ref="upload"
            class="upload-demo"
            action="http://localhost:3003/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
            :auto-upload="false"
            :on-success="uploadHandle"
            :file-list="fileList"
    >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
</template>

<script>
    //图片上传
    export default {
        name: "ProductUpload",
        data(){
            return{
                fileList:[]
            }
        },
        methods:{
            handlePreview(file) {},
            handleRemove(file, fileList) {},
            uploadHandle(res, file, fileList) {
                console.log(res)
                this.$emit("onUpload",res)
            },
            submitUpload(){
                this.$refs.upload.submit();
            }
        }
    }
</script>

<style scoped>

</style>