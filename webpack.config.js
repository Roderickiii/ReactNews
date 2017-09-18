var webpack = require('webpack');
var path = require('path');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
	devServer: {
		historyApiFallback: true
	},
	context: path.join(__dirname),
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./src/root.js",
	output: {
		path: __dirname,
		filename: "bundle.js",
		publicPath: "/src/"
	},

	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /(node_modules)/,
			loader: "babel-loader",
			include: __dirname,
			query: {
				presets: ["es2015", "react"],
				plugins: ["react-html-attrs",
					[
						"import",
						{
							"libraryName": "antd",
							"style": 'css'
						}
					]
				]
			}
		},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}]
	}
};
