<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-menu
                        :default-active="activeIndex"
                        @select="handleSelect"
                        active-text-color="#0672ff"
                        background-color="rgb(42,50,61)"
                        class="el-menu-demo"
                        mode="horizontal"
                        text-color="#fff"
                >
                    <el-menu-item index="1">
                        <router-link class="nav-txt" to="/product">
                            <i class="el-icon-search"></i>
                            商品查询
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link class="nav-txt" to="/params">
                            <i class="el-icon-money"></i>
                            规格参数
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link class="nav-txt" to="/content">
                            <i class="el-icon-postcard"></i>
                            内容分类管理
                        </router-link>
                    </el-menu-item>
                    <el-dropdown type trigger="click" class="login-my">
						<span class="el-dropdown-link">
							{{this.user}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
    export default {
        name: 'Nav',
        data() {
            return {
                activeIndex: '1'
            };
        },
		computed:{
        	...mapState('loginModule',['user'])
		},
        methods: {
        	...mapMutations('loginModule',['clearToken','clearUser']),
            handleSelect(key, keyPath) {

            },
			loginout(){
				localStorage.removeItem("egouser");
				localStorage.removeItem("token")
				this.clearToken();
				this.clearUser();
				this.$router.replace("/login")
			}
        }
    };
</script>

<style scoped lang="less">
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-menu-demo {
        padding: 0 200px;
    }

    .nav-txt {
        display: block;
        width: 100%;
        height: 100%;
    }

    .login-my {
		width: 100px;
        float: right;
		line-height: 56px;
		color: #fff;
		cursor:pointer;
		margin-right: 10px;
		text-align: center;
    }
</style>
