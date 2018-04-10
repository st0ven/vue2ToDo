const path = require("path")
const webpack = require("webpack")
const portNumber = 4001

module.exports = {
    devServer: {
        port: portNumber,
        host: '0.0.0.0'
    },
    entry: {
        app: './src/app.js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                vue:{
                    test: new RegExp("vue"),
                    name: "vue",
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['.js', '.css', '.styl']
    }
}
