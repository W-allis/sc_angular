const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

const cleanWebpackPlugin = require('clean-webpack-plugin')

const path = require('path')

const utils = require('./utils')

const miniCssExtractPlugin = require('mini-css-extract-plugin')

const htmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

const env = require('../config/' + (process.env.BASE_ENV === 'production' ?　'prod' : 'dev'))

module.exports = merge(baseConfig, {
    entry: utils.generateEntires(),
    // mode: 'production',
    mode: (process.env.BASE_ENV === 'production' ?　'production' : 'development'),
    devtool: 'source-map',
    module: {
        rules: [
            ...utils.generateCssRules({
                usePostcss: false,
                useVue: true
            })
        ]
    },/*
    optimization: {
        splitChunks: {
            // chunks: "async",
            // minSize: 30000,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // name: true,
            cacheGroups: {
                // default: {
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true,
                // },
                vendors: {
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                mainfast: {
                    test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
                    name: 'mainfast',
                    chunks: 'async'
                }
            }
        }
        
    },*/
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new cleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/*')]
            // cleanOnceBeforeBuildPatterns: ['/dist/*'],
        }),
        new miniCssExtractPlugin({
            filename: utils.resolve('css/[name].css')
        }),
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main', 'vendor', 'mainfast'],
            inject: 'body',
            chunksSortMode: 'dependency'
        }),
        ...utils.generateHTML()
    ],
    devServer:{
        port: 9666
    }
})