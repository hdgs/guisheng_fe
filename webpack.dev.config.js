const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  entry: {
    'main.js': ['./src/main.js', 'webpack-hot-middleware/client'],
    'second.js': ['./src/second.js', 'webpack-hot-middleware/client'],
    'pictures.js': ['./src/pictures.js', 'webpack-hot-middleware/client'],
    vendor: ["superagent", "vue", "whatwg-fetch", "./src/style.js", "./src/header.js"]
  },
  output: {
    path: path.join(__dirname, ""),
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
    resolveLoader: {
      root: path.join(__dirname, "node_modules")
    },
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, "src"),
      ],
    }, {
      test: /\.(html|tpl)$/,
      loader: 'html-loader'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file?limit=8192',
      query: {
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  devtool: '#eval-source-map',
  resolve: {
    extensions: ['', '.js', '.scss', '.vue'],
  },
  plugins: [
    new HtmlWebpackPlugin({
    	alwaysWriteToDisk: true,
      filename: 'template/base.html',
      inject:false,
      template: './template/base.ejs',
      chunks: ['vendor']
    }),
    new HtmlWebpackPlugin({
    	alwaysWriteToDisk: true,
      filename: 'template/index.html',
      inject:false,
      template: './template/index.ejs',
      chunks: ['main.js']
    }),
    new HtmlWebpackPlugin({
    	alwaysWriteToDisk: true,
      filename: 'template/pictures.html',
      inject:false,
      template: './template/pictures.ejs',
      chunks: ['pictures.js']
    }),
    new HtmlWebpackPlugin({
    	alwaysWriteToDisk: true,
      filename: 'template/second.html',
      inject:false,
      template: './template/second.ejs',
      chunks: ['second.js']
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ]
};
