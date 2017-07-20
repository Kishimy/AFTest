const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require ('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = {
    entry: './src/main.js',
    output: {
			path: __dirname + '/public',
			publicPath: '/public/',
			filename: 'bundle.js'
		},
    module: {
        loaders: [
			{ 
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?name=img/[name].[ext]'
			},
			{
				test: /\main.less$/,
				use: extractLess.extract({
					use: [ {
							loader: "css-loader"
						}, {
							loader: "postcss-loader",
							options: {
								plugins: function () {
									return [
										autoprefixer, precss
									]
								}
							}
						}, {
							loader: "resolve-url-loader"
						}, {
							loader: "less-loader?sourceMap",
						}],
					fallback: "style-loader",
				})
			}
		]
	},
	plugins: [
		extractLess
	],
};