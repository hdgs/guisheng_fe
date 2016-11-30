const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		'main.js': ['./src/main.js', 'webpack-hot-middleware/client'],
		'second.js': ['./src/second.js', 'webpack-hot-middleware/client'],
		'pictures.js':['./src/pictures.js','webpack-hot-middleware/client'],
		vendor: [ "superagent","vue","whatwg-fetch","./src/style.js","./src/header.js"]
	},
	output: {
		path: '/',
		publicPath: 'http://localhost:3000/dist/',
		filename: '[name]'
	},
	vue: {
  cssModules: {
    // overwrite local ident name
    localIdentName: '[path][name]---[local]---[hash:base64:5]',
    // enable camelCase
    camelCase: true
  }
},
	module: {
		resolveLoader: { root: path.join(__dirname, "node_modules") },
	    loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				include: [
        	path.resolve(__dirname, "src"),
      	],
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
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
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
