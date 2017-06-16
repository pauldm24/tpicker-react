var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: [
            './index.js',
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
        library: 'TPickerReact',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?sourceMap',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({browsers: ['last 2 versions', 'last 3 iOS versions']}),
                                    precss
                                ],
                                sourceMap: true
                            }
                        },
                        'sass-loader?sourceMap'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('tpicker-react.css'),
        new webpack.optimize.UglifyJsPlugin()
    ]
}
