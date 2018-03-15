var webpack = require("webpack");
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcRoot = path.resolve(__dirname, './');
const appRoot = path.resolve(srcRoot, 'app');

module.exports = {
    entry: {
        main: './app/javascripts/app.js',
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'app.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx|es6)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    "presets": [
                        ["es2015", { "modules": false }],
                        //Webpack understands the native import syntax, and uses it for tree shaking

                        "stage-2",
                        //Specifies what level of language features to activate.
                        //State 2 is "draft", 4 is finished, 0 is strawman.
                        //See https://tc39.github.io/process-document/

                        "react"
                        //Transpile React components to JS
                    ],
                    "plugins": [
                        "react-hot-loader/babel"
                        //Enables React code to work with HMR.
                    ]
                }
            },
            { test: /\.scss$/i, use: ExtractTextPlugin.extract(["css", "sass"]) },
            { test: /\.sol/, use: 'truffle-solidity' }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],

        modules: [
            appRoot,
            'node_modules'
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './app/index.html', to: "index.html" },
            { from: './app/images', to: "images" },
            { from: './app/fonts', to: "fonts" }
        ]),
        new ExtractTextPlugin("app.css")
    ],
    devServer: {
        stats: 'errors-only',
    }
};