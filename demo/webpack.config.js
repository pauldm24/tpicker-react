var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: [
            path.join(__dirname, 'app.js')
        ]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    devtool: 'eval-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: "errors-only",
        hot: true,
        port: 8081
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /build/],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Time Picker React',
            template: path.join(__dirname, 'index.tmpl.html'),
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({browsers: ["last 2 versions", "last 3 iOS versions"]}),
                    precss
                ]
            }
        })
    ]
};
