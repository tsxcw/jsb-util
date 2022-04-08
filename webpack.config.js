const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs");
var package = fs.readFileSync("package.json", 'utf-8');
package = JSON.parse(package)
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        test: './test.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './index.html'
        }),
    ],
    output: {
        filename: function (params) {
            console.log(params)
            if(params.runtime=='index'){
                return `jsbUtil-V${package.version.replace(/\./g, "_")}.js`
            }
            return params.runtime+'.js'
        },
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        libraryExport: "default"
    },
};