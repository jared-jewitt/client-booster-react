const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = () => {
  const TITLE = "React SPA boilerplate";
  const TARGET = "web";

  const NODE_ENV = process.env.NODE_ENV || "production";
  const ASSET_PATH = process.env.ASSET_PATH || "/";
  const HOST = process.env.HOST || "localhost";
  const PORT = process.env.PORT || 3000;

  const BUILD_FILE_NAMES = {
    htmlFileName: "index.html",
    jsFileName: NODE_ENV === "development" ? "js/[name].js" : "js/[name].[contenthash:8].js",
    jsChunkFileName: NODE_ENV === "development" ? "js/[id].chunk.js" : "js/[id].[contenthash:8].chunk.js",
    styleFileName: NODE_ENV === "development" ? "styles/[name].css" : "styles/[name].[contenthash:8].css",
    styleChunkFileName: NODE_ENV === "development" ? "styles/[id].chunk.css" : "styles/[id].[contenthash:8].chunk.css",
    assetModuleFileName: NODE_ENV === "development" ? "assets/[name][ext]" : "assets/[name].[contenthash:8][ext]",
  };

  const PATHS = {
    src: path.join(__dirname, "src"),
    public: path.join(__dirname, "public"),
    build: path.join(__dirname, "build"),
    entry: path.join(__dirname, "src", "index.tsx"),
    template: path.join(__dirname, "public", "template.html"),
  };

  return {
    target: TARGET,
    mode: NODE_ENV,
    entry: PATHS.entry,
    output: {
      path: PATHS.build,
      publicPath: ASSET_PATH,
      filename: BUILD_FILE_NAMES.jsFileName,
      chunkFilename: BUILD_FILE_NAMES.jsChunkFileName,
      assetModuleFilename: BUILD_FILE_NAMES.assetModuleFileName,
    },
    devServer: {
      contentBase: PATHS.build,
      port: PORT,
      host: HOST,
      hot: true,
      watchContentBase: true,
      historyApiFallback: true,
      writeToDisk: true,
      overlay: true,
      stats: "errors-warnings",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        "@": PATHS.src,
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(ico|gif|png|jpg|jpeg|svg|woff|woff2|eot|ttf|otf)$/,
          type: "asset",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: BUILD_FILE_NAMES.styleFileName,
        chunkFilename: BUILD_FILE_NAMES.styleChunkFileName,
      }),
      new HtmlWebpackPlugin({
        title: TITLE,
        filename: BUILD_FILE_NAMES.htmlFileName,
        template: PATHS.template,
      }),
      new CopyPlugin({
        patterns: [{ from: PATHS.public, to: PATHS.build, globOptions: { ignore: ["*.html"] } }],
      }),
    ],
  };
};
