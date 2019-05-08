const path = require('path')

module.exports = {
    dev: {
        rootPath: path.resolve(__dirname, '../dist'),

        assetsPath: './static',

        publicPath: '/',

        useVue: true,

        useEslint: true,
        useStylelint: true,

        usePostcss: false,

        // 多页面配置文件夹
        mutipartPage: [path.resolve(__dirname, '../src/mutipart')]
    },
    build: {
        rootPath: path.resolve(__dirname, '../dist'),        

        assetsPath: './static',

        publicPath: '/',

        usePostcss: true,

        mutipartPage: [path.resolve(__dirname, '../src/mutipart')]
    }
}