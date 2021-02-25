module.exports = {
	publicPath: "./",
	// publicPath: process.env.NODE_ENV === "binheSportSystem" ? "./" : "/",
	outputDir: "dist",
	assetsDir: 'static',
	filenameHashing: false,
	lintOnSave: true,
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/api': {
				//请求的地址
				target: 'http://localhost:3003', //su
				//是否跨域
				changeOrigin: true,
				//websocket配置
				ws: true,
				// 是否校验https证书
				// secure:true,
				//路径重写规则 /api/users/user
				pathRewrite: {
					'^/api': ''
				}
			},
		}
	}
};
