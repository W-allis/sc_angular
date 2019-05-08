const path = require('path')

const utils = require('./utils')

const config = require('../config')

const vueConfig = require('./vue.loader.config')

const isProduction = process.env.BASE_ENV === 'production'

const styleLintPlugin = require('stylelint-webpack-plugin')

function generateEslintRule() {
    return {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    }
}

module.exports = {
    entry: {
        main: './src/main'
    },
    output: {
        path: isProduction ? config.build.rootPath : config.dev.rootPath,
        filename: utils.resolve('js/[name]_[hash:6].js'),
        // chunkFilename: utils.resolve('js/[name]_chunk_[hash:6].js'),
        publicPath: isProduction ? config.build.publicPath : config.dev.publicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [generateEslintRule()] : []),
            ...(config.dev.useVue ? [vueConfig.vueLoader] : []),
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|svg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: utils.resolve('img/[name].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.(mp3|mp4|csv|rmvb|ttf|woff)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        ...(config.dev.useVue ? [vueConfig.vueLoaderPlugin] : []),
        ...(config.dev.useStylelint ? [new styleLintPlugin({
            files: ['src/*.{vue,htm,html,css,sss,less,scss,sass}'],
        })] : [])
    ]
}