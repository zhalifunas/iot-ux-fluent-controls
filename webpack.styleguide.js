const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.ts',
    ],
    output: {
        path: path.join(__dirname, 'static/dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'eval-source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
    ],

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loaders: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader'
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]', 'sass-loader'] 
            }
        ]
    }
};