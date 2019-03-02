const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: { // https://webpack.js.org/concepts#loaders
        rules: [
            {
                test: /\.(js)$/, // *test* identifies which files should be transformed.
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/, 
                use: ["style-loader", "css-loader"] // *use* indicates which loader to use for transforming.
            }
        ]
    },
    // resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hot: true
        // hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};