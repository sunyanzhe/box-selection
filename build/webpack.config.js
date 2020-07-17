const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const TimeFormater = require('time-formater');
module.exports = {
    mode: 'production',
    entry:  path.resolve(__dirname, '../src/main.js'),
    output: {
        filename: 'box-selection.js',
        path: path.resolve(__dirname, '../dist/'),
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'BOX_SELECTION',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.runtime.esm.js',
          '@': path.resolve(__dirname, '../packages')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new vueLoaderPlugin(),
        new webpack.BannerPlugin(`Update: ${TimeFormater().format('YYYY-MM-DD HH:mm:ss')}`)
    ]
}