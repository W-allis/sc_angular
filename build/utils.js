const config = require('../config')

const isProduction = process.env.BASE_ENV === 'production'

const miniCssExtractPlugin = require('mini-css-extract-plugin')

const htmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

const fs = require('fs')

exports.resolve = function (dir) {
    const assetsPath = isProduction ? config.build.assetsPath : config.dev.assetsPath

    return path.join(assetsPath, dir)
}

exports.cssLoader = function (options) {

    function _(loader) {

        var output = isProduction ? [
            { 
                loader: miniCssExtractPlugin.loader, 
                options: { hmr: process.env.NODE_ENV === 'development'} 
            }, 'css-loader'] 
            : [{ loader: 'vue-style-loader' }, { loader: 'css-loader' }]

        if (loader) {
            output.push({ loader: `${loader}-loader` })
        }

        if (options.usePostcss) {
            output.push({loader: 'postcss-loader' })
        }

        // if (options.useVue) {
        //     output.shift({ loader: 'vue-style-loader' })
        // }

        return output
    }

    return {
        css: _(),
        less: _('less'),
        scss: _('scss'),
        sass: _('sass')
    }
}

exports.generateCssRules = function (options) {
    const entries = exports.cssLoader(options)

    const output = []

    for (var key in entries) {
        output.push({
            test: new RegExp(`\\.${key}$`),
            use: entries[key]
        })
    }

    return output
}

exports.collection = function (options) {

    var _path = isProduction ? config.build.mutipartPage : config.dev.mutipartPage

    var output = []

    if (typeof _path === 'string') {
        _path = [_path]
    }

    for (let entry of _path) {
        const singleDir = fs.readdirSync(entry)

        for (let file of singleDir) {
            let key = entry.substring(entry.lastIndexOf('\\') + 1) + '-' + file
            
            output.push({
                name: key,
                path: path.join(entry, file, 'index')
            })
        }
    }

    return output
}

exports.generateEntires = function() {
    const entries = exports.collection()

    const output = {}

    for (let entry of entries) {
        output[entry.name] = entry.path
    }

    return output
}

exports.generateHTML = function() {
    const entries = exports.collection()

    const output = []

    for (let entry of entries) {
        output.push(new htmlWebpackPlugin({
            filename: path.join(...entry.name.split('-')) + '/index.html',
            template: entry.path + '.html',
            chunks: [entry.name]
        }))
    }

    return output
}

