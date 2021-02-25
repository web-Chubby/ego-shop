<template>
    <el-card class="box-card" body-style>
        <div slot="header" class="clearfix"><span>登录 | 注册</span></div>
        <el-form label-width="80px" :model="formLabelAlign">
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model="formLabelAlign.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button type="primary">注册</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: 'Login',
        data() {
            return {
                formLabelAlign: {
                    username: '',
                    password: ''
                }
            };
        },
        methods:{
            ...mapMutations("loginModule",["setToken","setUser"]),
            onSubmit() {
                if (this.formLabelAlign.username && this.formLabelAlign.password){
                    this.$axios.getLogin({
                        username: this.formLabelAlign.username,
                        password: this.formLabelAlign.password
                    }).then(res=>{
                        console.log(res.data)
                        if (res.data.status === 200){
                            //成功
                            //存入
                            this.setToken(res.data.token);
                            this.setUser(res.data.data[0].username);
                            //本地存储
                            localStorage.setItem('token', res.data.token);
                            localStorage.setItem('egouser', res.data.data[0].username);
                            this.$router.replace("/");
                        }else {
                            //失败
                            this.$message.error(res.data.msg);
                        }
                    })
                }else {
                    this.$message('请输入用户名密码');
                }
            }
        }
    };
</script>

<style scoped>
    .box-card {
        width: 480px;
        margin: 100px auto;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: '';
    }

    .clearfix:after {
        clear: both;
    }

    .clearfix {
        text-align: center;
    }
</style>
