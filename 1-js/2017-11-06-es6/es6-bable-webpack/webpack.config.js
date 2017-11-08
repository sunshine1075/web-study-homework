const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	devtool: "evel-source-map", // 中小型项目常用

	entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件

	output: {
		path: __dirname + "/public", //打包后的文件存放的地方
		filename: "bundle.js" //打包后输出文件的文件名
	},

	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true, // 实时刷新
		port: 4090,
		hot: true // 热更新
	},
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			use: {
				loader: "babel-loader"
			},
			exclude: /node_modules/
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html", //new 一个这个插件的实例，并传入相关的参数
			title: "hot module replaced"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
}