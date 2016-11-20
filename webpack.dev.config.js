const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		'main.js': ['./src/main.js', 'webpack-hot-middleware/client'],
		'second.js': ['./src/second.js', 'webpack-hot-middleware/client'],
		'pictures.js':['./src/pictures.js','webpack-hot-middleware/client'],
		vendor: [ "superagent","vue","whatwg-fetch"]
	},
	output: {
		path: '/',
		publicPath: 'http://localhost:3000/dist/',
		filename: '[name]'
	},
	module: {
	    loaders: [
			{
				test: /\.vue$/,
				loader: 'vue',
				options:{
					cssModules: {
        				localIdentName: '[name]-[local]-[hash:base64:5]',
        				camelCase: true
    				}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.(html|tpl)$/,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file?limit=8192',
				query: {
					name: '[name].[ext]?[hash]'
				}
			}
	    ]
	},
	devtool: '#eval-source-map',
  	resolve: {
	    extensions: ['', '.js', '.scss','.vue'],
	},
	plugins: [
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin(),
	    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  	]
};
