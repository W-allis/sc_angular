const VueLoaderPlugin = require('vue-loader/lib/plugin')

const utils = require('./utils')

exports.vueLoader = {
    test: /\.vue$/,
    use: [
        {
            loader: 'vue-loader',
            options: {
                loaders: utils.cssLoader({
                    useVue: true
                }),
                transformToRequire: {
                    video: ['src', 'poster'],
                    source: 'src',
                    img: 'src',
                    image: 'xlink:href'
                }
            }
        }
    ]
}

exports.vueLoaderPlugin = new VueLoaderPlugin()