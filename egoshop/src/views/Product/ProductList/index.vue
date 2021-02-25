<template>
    <div>
        <el-button type="primary" @click="addProduct">添加商品</el-button>
        <ElementTable :tableData="tableData">
            <el-table-column label="商品ID" prop="id" show-overflow-tooltip width="80px"></el-table-column>
            <el-table-column label="商品名称" prop="title" show-overflow-tooltip width="120px"></el-table-column>
            <el-table-column label="图片地址" prop="image" show-overflow-tooltip></el-table-column>
            <el-table-column label="商品卖点" prop="sellPoint" show-overflow-tooltip></el-table-column>
            <el-table-column label="商品价钱" prop="price" show-overflow-tooltip width="100px"></el-table-column>
            <el-table-column label="商品数量" prop="num" show-overflow-tooltip width="100px"></el-table-column>
            <el-table-column label="商品描述" prop="descs" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click="handleEdit(scope.$index, scope.row)"
                            size="mini">编辑
                    </el-button>
                    <el-button
                            @click="handleDelete(scope.$index, scope.row)"
                            size="mini"
                            type="danger">删除
                    </el-button>
                </template>
            </el-table-column>
        </ElementTable>
        <!--分页-->
        <ProductPagination class="Pagination" @currentPageEvent="getCurrentpageData"></ProductPagination>
        <!--添加商品-->
        <el-dialog :visible.sync="dialogVisible" title="添加产品" width="70%">
            <el-form ref="form" :model="product" label-width="80px">
                <el-form-item label="类目选择">
                    <el-button type="primary" @click="innerVisible = true">选择类目</el-button>
                    <span class="category">{{ categoryData.name }}</span>
                    <el-dialog append-to-body :visible.sync="innerVisible" title="添加产品" width="50%">
                        <ProductTree @onTreeData="getTreeData"></ProductTree>
                        <span class="chile">
                           <el-button type="primary" @click="innerVisible = false">确定</el-button>
                            <el-button type="primary" @click="innerVisible = false">取消</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="product.title"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点">
                    <el-input v-model="product.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="product.num"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <span>
                        {{uploadData.name}}
                    </span>
                    <el-button @click="dialogUploadVisble = true">上传图片</el-button>
                    <el-dialog
                        title="上传图片"
                        width="30%"
                        :visible.sync="dialogUploadVisble"
                        append-to-body
                    >
                        <ProductUpload @onUpload="getUpload"></ProductUpload>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogUploadVisble = false">确定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品描述">
                    <ProductUeditor @onUeditor="getUeditor"></ProductUeditor>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="submitProductHandle" type="primary">提 交</el-button>
            </span>
        </el-dialog>
        <!--修改产品-->
        <el-dialog :visible.sync="dialogEditorProductVisible" title="修改产品" width="70%">
            <el-form ref="form" :model="modify" label-width="80px">
                <el-form-item label="类目选择">
                    <el-button type="primary" @click="innerVisible = true">选择类目</el-button>
                    <span class="category">{{ categoryData.name }}</span>
                    <el-dialog append-to-body :visible.sync="innerVisible" title="添加产品" width="50%">
                        <ProductTree @onTreeData="getTreeData"></ProductTree>
                        <span class="chile">
                           <el-button type="primary" @click="innerVisible = false">确定</el-button>
                            <el-button type="primary" @click="innerVisible = false">取消</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="modify.title"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点">
                    <el-input v-model="modify.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="modify.price"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="modify.num"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <span>
                        {{uploadData.name}}
                    </span>
                    <el-button @click="dialogUploadVisble = true">上传图片</el-button>
                    <el-dialog
                            title="上传图片"
                            width="30%"
                            :visible.sync="dialogUploadVisble"
                            append-to-body
                    >
                        <ProductUpload @onUpload="getUpload"></ProductUpload>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogUploadVisble = false">确定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品描述">
                    <ProductUeditor @onUeditor="getUeditor"></ProductUeditor>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="reSubmitProductHandle" type="primary">提 交</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import ElementTable from '../../../components/element-table'
    import ProductPagination from '../ProductPagination'
    import ProductTree from '../ProductTree'
    import ProductUpload from '../ProductUpload'
    import ProductUeditor from '../ProductUeditor'

    export default {
        name: "ProductList",
        data() {
            return {
                tableData: [],
                page: 1,
                //添加框
                dialogVisible: false,
                innerVisible:false,
                dialogUploadVisble:false,
                //修改框
                dialogEditorProductVisible:false,
                product:{},
                //目录
                categoryData:{},
                //图片
                uploadData:{},
                //富文本编辑器
                ueditorData:"",
                //修改数据
                modify:{},
                updateId:""
            }
        },
        components: {
            ElementTable,
            ProductPagination,
            ProductTree,
            ProductUpload,
            ProductUeditor
        },
        methods: {
            http(page) {
                this.$axios.getSelectTbItemAllByPage({
                    page: page
                }).then(res => {
                    if (res.data.status == 200) {
                        this.tableData = res.data.data.result;
                    }
                });
            },
            //分页
            getCurrentpageData(page) {
                this.page = page
                this.http(page);
            },
            //编辑
            handleEdit(index, row) {
                this.updateId = row.id;
                this.$axios.getPreUpdateItem({
                    id: row.id
                }).then(res=>{
                    console.log(res.data)
                    if (res.data.status == 200) {
                        this.modify = {
                            title: res.data.data.title,
                            sellPoint: res.data.data.sellPoint,
                            price: res.data.data.price,
                            num: res.data.data.num,
                        };
                    }
                })
                this.dialogEditorProductVisible = true;
            },
            //删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.getDeleteItemById({id: row.id}).then(res => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            //删除后重新加载页面
                            this.http(this.page);
                        } else {
                            this.$message({
                                type: "error",
                                message: "删除出现错误"
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加按钮
            addProduct(){
                this.dialogVisible = true
            },
            //获取类目数据
            getTreeData(data) {
                this.categoryData = data;
            },
            //图片
            getUpload(data){
                this.uploadData = data
            },
            //富文本编辑器
            getUeditor(data){
                this.ueditorData = data
            },
            //添加产品
            submitProductHandle(){
                this.$axios.getInsertTbItem({
                    title: this.product.title,
                    cid: this.categoryData.cid,
                    sellPoint: this.product.sellPoint,
                    price: this.product.price,
                    num: this.product.num,
                    desc: this.ueditorData,
                    image: this.uploadData.url
                }).then(res=>{
                    if (res.data.status === 200) {
                        this.dialogVisible = false;
                        this.http(1);
                    } else {
                        const h = this.$createElement;
                        this.$notify({
                            title: "添加失败",
                            message: h("i", { style: "color: teal" }, "请重新添加")
                        });
                    }
                })
            },
            //修改商品
            reSubmitProductHandle(){
                this.$axios.getUpdateTbItem({
                    id: this.updateId,
                    title: this.modify.title,
                    sellPoint: this.modify.sellPoint,
                    price: this.modify.price,
                    num: this.modify.num
                }).then(res=>{
                    if (res.data.status === 200){
                        this.dialogEditorProductVisible = false;
                        this.http(1)
                    }else {
                        const h = this.$createElement;
                        this.$notify({
                            title: "修改失败",
                            message: h("i", { style: "color: red" }, "请重新修改")
                        });
                    }
                })
            }
        },
        mounted() {
            this.http(1)
        }
    }
</script>

<style scoped>
    .chile{
        display: block;
        margin-top: 20px;
    }
    .Pagination{
        margin-bottom: 20px;
    }
    .category{
        display: block;
        float: left;
        width: 150px;
        height: 40px;
    }
</style>