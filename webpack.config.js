const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';
	const config = {
		entry: './src/index.jsx',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist') // This line specifies the output directory
		},
		module: {
			rules: [
				{
					test: /.(js|jsx?)$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				{
					test: /.s?css$/,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.(gif|png|jpe?g|svg)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[path][name].[ext]',
							},
						}
					],
				}
			],
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
		],
		devServer: {
			historyApiFallback: true,
			open: true,
			hot: true,
			port: 8080,
		},
	};

	if (isProduction) {
		config.plugins.push(new webpack.HotModuleReplacementPlugin());
	}

	if (isProduction) {
		config.plugins.push(
			new MiniCssExtractPlugin({
				filename: '[name].css',
			})
		);
	}

	return config;
};