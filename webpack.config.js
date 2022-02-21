const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
//const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

const isDev =  process.env.NODE_ENV === "development"
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: "./js/main.js",
    output: {
        filename: `./js/${filename("js")}`,
        path: path.resolve(__dirname, "app"),
        clean: true
    },
    devServer: {
        historyApiFallback: true,
        static: "./",
        open: true,
        hot: true,
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
       // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename("css")}`
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                       loader: MiniCssExtractPlugin.loader,
                        options: {

                        },
                    },
                    "css-loader",'less-loader'
                ],

            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                dependency: { not: ['url'] },
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.(?:|woff2|ttf)$/i,
                loader: 'file-loader',
                dependency: { not: ['url'] },
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ],
            },
        ]
    }
}