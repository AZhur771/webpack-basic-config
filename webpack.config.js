const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
  const { mode = "developement" } = env;

  const isProd = mode === "production" ? true : false;

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader"
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: "Hello World",
        buildTime: new Date().toString(),
        template: "public/index.html"
      })
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "main-[hash:8].css"
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? "production" : "development",

    output: {
      filename: isProd ? "name-[hash:8].js" : undefined
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders()
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), "sass-loader"]
        },
        {
          test: /\.(png|jpg|ico|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]"
              }
            }
          ]
        }
      ]
    },

    plugins: getPlugins(),

    devServer: {
      open: true
    }
  };
};
