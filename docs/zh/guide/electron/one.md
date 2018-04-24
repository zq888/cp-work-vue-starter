---
title: "Webpack"
---

# Electron Webpack configuration

**Output**

::: tip
+ Customize output directory as `../dist/electron`
+ Customize output file name as `entry.main` = `[name]`
+ Must set target as `electron-main` if you are about to build a electro app
:::

In the file `../dist/electron`

```js
"use strict";

process.env.BABEL_ENV = "main";

const path = require("path");
const { dependencies } = require("../package.json");
const webpack = require("webpack");

const BabiliWebpackPlugin = require("babili-webpack-plugin");

let mainConfig = {
  entry: {
    main: path.join(__dirname, "../src/main/index.js")
  },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "../dist/electron")
  },
  target: "electron-main",
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader"
        }
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: "node-loader"
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== "production",
    __filename: process.env.NODE_ENV !== "production"
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  resolve: {
    extensions: [".js", ".json", ".node"]
  }
};

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
    })
  );
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
  mainConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    })
  );
}

module.exports = mainConfig;
```