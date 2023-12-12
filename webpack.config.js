// Generated using webpack-cli https://github.com/webpack/webpack-cli

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[path][name].[hash][ext][query]'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        new CopyPlugin({
            patterns: [
              { from: "./src/assets/images", to: "./assets/images" },
              { from: "./src/assets/videos", to: "./assets/videos" },
            ],
            options: {
              concurrency: 100,
            },
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
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    stylesHandler,
                    'css-loader',
                    //'sass-loader',
                    {
                        loader: "sass-loader",
                        options: {
                          sourceMap: true,
                          sassOptions: {
                            outputStyle: "compressed",
                          },
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: '[path][name].[hash][ext][query]'
                }
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
