const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 坑，需要加{}，不然报错
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack");
module.exports = {
    // 配置环境
    mode: 'development',
    //开发环境，不压缩代码，显示格式，生成.map文件
    devtool: 'source-map',
    //
    devServer: {
        contentBase: 'build', //执行的基本目录，一般是webpack打包输出的目录
        host:'127.0.0.1', // 运行在哪个IP
        // host:'192.168.0.2',
        // allowedHosts: ['192.168.0.3'], //允许访问主机
        port: 8080,
        // open: true //自动打开浏览器
        //跨域:项目使用了后端跨域，所以注释掉了
        // proxy: {
        //     '/api':'http://127.0.0.1:3000'
        // }
    },
    // 配置入口、出口
    entry: {
        app:'./src/app.js',
    },
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'app.js'
    },
    plugins: [
        //每次打包都会清理输出目录，清理没有用到的文件
        new CleanWebpackPlugin(),
        //指定入口html的模板
        new HtmlWebpackPlugin({
            template: './src/app.html'
        }),
        //抽离style，生成css文件（因为style、css-loader结果是将css内容插入html的style标签中）
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        }),
        //拷贝文件，不以模块的方式打包的文件
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/public/libs/img',
                    to: './public/libs/img',
                }
            ],

        }),
        //全局引入jquery，这样子所有模块都可以使用$。因为在项目中很多模块都用到jquery
        new webpack.ProvidePlugin({
            $: 'jquery' //全局引入jQuery
        })
    ],
    module: {
        rules: [
            {
                //处理css
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                //处理图片
                test: /\.(png|svg|jpg|jepg|webpng|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 200*1204, //小于100k，用base64
                    outputPath: 'images/',
                }
            },
            {
                //处理art模板文件
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // 不知道为啥打包后图片加载不到，所有先用这个方法+拷贝插件
                    htmlResourceRules:false //是否将标签里的src等url资源打包为模块
                }
            },
            {
                //处理字体文件，css中通过url引入本地的字体文件
                test:/\.(ttf|woff|eot|woff2|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // name: '/css/fonts/[name].[ext]' //目录+自定义名称
                        outputPath: '/css/fonts/' //指定输出目录
                    }
                }
            }
            ,
            {
                //解析在html使用src和url引入文件成模块
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                    // ,
                    // options: {
                    //     attrs: [':data-src']
                    // }
                }
            }
        ]
    }



}