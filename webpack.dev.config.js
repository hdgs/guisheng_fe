const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        'main.js': ['./src/main.js', 'webpack-hot-middleware/client', "./src/header.js"],
        'second.js': ['./src/second.js', 'webpack-hot-middleware/client', "./src/header.js"],
        'pictures.js': ['./src/pictures.js', 'webpack-hot-middleware/client', "./src/header.js"],
        'profile.js': ['./src/profile.js', 'webpack-hot-middleware/client'],
        'landing.js': ['./src/landing.js', 'webpack-hot-middleware/client'],
        'wrong.js': ['./src/wrong.js', 'webpack-hot-middleware/client', "./src/header.js"],
        'search.js': ['./src/search.js', 'webpack-hot-middleware/client', "./src/header.js"],
        vendor: ["vue", "whatwg-fetch", "./src/style.js"]
    },
    output: {
        path: path.join(__dirname, ""),
        publicPath: '/dist/',
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
            loader: 'url-loader?limit=20&name=images/[hash:8].[name].[ext]'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }]
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['', '.js', '.scss', '.vue'],
        alias: {
            'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.min'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/base.html',
            inject: false,
            template: './template/base.ejs',
            chunks: ['vendor']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/index.html',
            inject: false,
            template: './template/index.ejs',
            chunks: ['main.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/pictures.html',
            inject: false,
            template: './template/pictures.ejs',
            chunks: ['pictures.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/second.html',
            inject: false,
            template: './template/second.ejs',
            chunks: ['second.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/profile.html',
            inject: false,
            template: './template/profile.ejs',
            chunks: ['profile.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/landing.html',
            inject: false,
            template: './template/landing.ejs',
            chunks: ['landing.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/wrong.html',
            inject: false,
            template: './template/wrong.ejs',
            chunks: ['wrong.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/search.html',
            inject: false,
            template: './template/search.ejs',
            chunks: ['search.js']
        }),
        new HtmlWebpackHarddiskPlugin(),
        new FaviconsWebpackPlugin('./src/img/1.png'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            },
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ]
};