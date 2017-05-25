const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        'main': ['./src/main.js'],
        'second': ['./src/second.js'],
        'pictures': ['./src/pictures.js'],
        'wrong': ['./src/wrong.js'],
        'profile': ['./src/profile.js'],
        'search': ['./src/search.js'],
        'landing': ['./src/landing.js'],
        vendor: ["vue", "whatwg-fetch", "./src/style.js", "./src/header.js"]
    },
    output: {
        path: path.join(__dirname, "static"),
        publicPath: '/static/',
        filename: '[name].[chunkhash].js'
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
        noParse: /vue.runtime.min/,
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
    resolve: {
        extensions: ['', '.js', '.scss', '.vue'],
         alias:{
            'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.min'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/base.html',
            inject: false,
            template: './template/base.ejs',
            favicon: './src/img/1.png',
            chunks: ['vendor']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/index.html',
            inject: false,
            template: './template/index.ejs',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/pictures.html',
            inject: false,
            template: './template/pictures.ejs',
            chunks: ['pictures']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/second.html',
            inject: false,
            template: './template/second.ejs',
            chunks: ['second']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/wrong.html',
            inject: false,
            template: './template/wrong.ejs',
            chunks: ['wrong']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/search.html',
            inject: false,
            template: './template/search.ejs',
            chunks: ['search']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/landing.html',
            inject: false,
            template: './template/landing.ejs',
            chunks: ['landing']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/profile.html',
            inject: false,
            template: './template/profile.ejs',
            chunks: ['profile']
        }),
        new HtmlWebpackHarddiskPlugin(),
        new FaviconsWebpackPlugin('./src/img/1.png'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, 
            },
        }),
        // new FaviconsWebpackPlugin('src/img/1.png'),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[hash].js")
    ]
};
