// //npm run dev-server
// const path = require("path");
// const DotenvFlow = require("dotenv-flow-webpack");
//
// module.exports = (env, argv) => {
//     console.log(env, __dirname); // outputs development
//     return {
//         mode: "development",
//         entry: ['core-js/stable', "./src/index.jsx"],
//         output: {
//             path: path.join(__dirname, "./src/main/resources/public"),
//             filename: "bundle.js",
//         },
//         resolve: {
//             extensions: [
//                 ".wasm",
//                 ".ts",
//                 ".tsx",
//                 ".mjs",
//                 ".cjs",
//                 ".js",
//                 ".jsx",
//                 ".json",
//             ],
//             modules: [path.resolve(__dirname, "./src/react"), "node_modules"], // !!!
//             alias: {
//                 root: __dirname,
//                 src: path.resolve(__dirname, "src/main"),
//             },
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.(js|jsx)$/,
//                     exclude: /node_modules/,
//                     use: [
//                         {
//                             loader: "babel-loader",
//                             options: {
//                                 presets: ["@babel/preset-env", "@babel/preset-react"],
//                                 plugins: [
//                                     "@babel/plugin-proposal-class-properties",
//                                     "@babel/plugin-proposal-object-rest-spread",
//                                 ],
//                             },
//                         },
//                     ],
//                 },
//                 {
//                     test: /\.less$/,
//                     use: [
//                         {
//                             loader: 'style-loader', // creates style nodes from JS strings
//                         },
//                         {
//                             loader: 'css-loader', // translates CSS into CommonJS
//                         },
//                         {
//                             loader: 'less-loader', // compiles Less to CSS
//                             options: {
//                                 lessOptions: {
//                                     javascriptEnabled: true,
//                                 },
//                             },
//                         },
//                     ],
//                 },
//                 {
//                     test: /\.s?css$/,
//                     use: ["style-loader", "css-loader", "sass-loader"],
//                 },
//             ],
//         },
//         plugins: [
//             new DotenvFlow({
//                 path: __dirname, // path.join(__dirname, 'src/main/js'),
//                 node_env: env,
//             }),
//         ],
//         devtool: "cheap-module-eval-source-map",
//         devServer: {
//             contentBase: path.join(__dirname, "./public"),
//             clientLogLevel: "debug",
//             historyApiFallback: true,
//             disableHostCheck: true,
//             // https: true,
//             port:3000,
//             writeToDisk: true,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Headers': '*',
//                 'Access-Control-Allow-Methods': '*',
//                 'Authorization': '*'
//             },
//             proxy: {
//                 '/': 'http://localhost:8081',
//                 secure: false
//             }
//         },
//     };
// };