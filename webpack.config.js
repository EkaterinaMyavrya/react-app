const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['env'] }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
          
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'      
            } 
        ]
    },   
    resolve: { extensions: ['*', '.js', '.jsx'] },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};