const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
	experiments: {
		asyncWebAssembly: true,
	},
	entry: "./bootstrap.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bootstrap.js",
	},
	mode: "development",
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				path.resolve(__dirname, "index.html"),
				path.resolve(__dirname, "styles.css"),
				{from: "./webnode", to: "webnode"},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devServer: {
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp',
		},
	},

};
