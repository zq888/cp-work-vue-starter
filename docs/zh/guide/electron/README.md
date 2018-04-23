---
title: "electron-vue"
---

#  基于 vue 构造 electron 应用程序。
**Building awesome electron vue app**

<div align="center">
<br>
<img width="500" src="https://vuepress.vuejs.org/hero.png" alt="electron-vue">
<br>
<br>
</div>

## Overview

This project is a example to set up `electron apps` using `vue` and `electron-vue`. 

electron-vue 充分利用 `vue-cli` 作为脚手架工具，加上拥有 `vue-loader` 的 `webpack`、`electron-packager` 或是 `electron-builder`，以及一些最常用的插件，如`vue-router`、`vuex` 等等。

It takes advantage of `@vue/cli 3.0` for scaffolding, partially `webpack` with `vue-loader`, `electron-packager` or `electron-builder`, and `nedb` o `firebase`, and some of the most used plugins like `vue-router`, `vuex`, and so much more.

### New things you'll find in this boilerplate...

* _Using `@vue/cli` 3.0 as the main tools (New)_
* _Using `typescript` as a entry file_
* _Using one `base` module in `vuex` store_
* _Using `vue-property-decorator` and `vuex-class` for component class coding style_
* _Using `element-ui` as UI Library_
* _Using `nedb` as data persistence in `userData` folder_
* ES6 with [`@vue/app`](https://babeljs.io/docs/plugins/preset-stage-0/) by default
* Involing `firebase`, `graphql`,`animation`,`authentication`plugins
* _Others_

你会在本样板代码中找到的东西...

* 基本的项目结构与 **单一的** `package.json` 设置
* 详细的 [文档](https://simulatedgreg.gitbooks.io/electron-vue/content/)
* 使用 [vue-cli](https://github.com/vuejs/vue-cli) 作为项目脚手架
* 立即可用的 Vue 插件 \([axios](https://github.com/mzabriskie/axios), [vue-electron](https://github.com/SimulatedGREG/vue-electron), [vue-router](https://github.com/vuejs/vue-router), [vuex](https://github.com/vuejs/vuex)\)\*
* 预装开发工具 [vue-devtools](https://github.com/vuejs/vue-devtools) 和 [devtron](https://github.com/electron/devtron)
* 使用 [electron-packager](https://github.com/electron-userland/electron-packager) 或 [electron-builder](https://github.com/electron-userland/electron-builder) 轻松打包你的应用程序\*
* `appveyor.yml` 与 `.travis.yml` 配置用于 [electron-builder](https://github.com/electron-userland/electron-builder) 的自动部署\*
* 能够生成用于浏览器的网页输出
* 便利的 [NPM 脚本](/npm_scripts.md)
* 使用携带模块热更新 (Hot Module Replacement) 的 [webpack](https://github.com/webpack/webpack) 和 [vue-loader](https://github.com/vuejs/vue-loader)
* 在工作在 electron 的 `main` 主进程时重启进程
* 支持使用 [vue-loader](https://github.com/vuejs/vue-loader/) 的 HTML/CSS/JS 预处理器
* 默认支持 [`stage-0`](https://babeljs.io/docs/plugins/preset-stage-0/) 的 ES6
* 使用 [`babili`](https://github.com/babel/babili) 避免完全反编译到 ES5
* ESLint \(支持 [`standard`](https://github.com/feross/standard) 和 [`airbnb-base`](https://github.com/airbnb/javascript)\)\*
* 单元测试 \(使用 Karma + Mocha\)\*
* 端到端测试 \(使用 Spectron + Mocha\)\*

### Common things you'll find in original boilerplate...

* Basic project structure with a **single** `package.json` setup
* Detailed [documentation](https://simulatedgreg.gitbooks.io/electron-vue/content/)
* Project scaffolding using [vue-cli](https://github.com/vuejs/vue-cli)
* Ready to use Vue plugins \([axios](https://github.com/mzabriskie/axios), [vue-electron](https://github.com/SimulatedGREG/vue-electron), [vue-router](https://github.com/vuejs/vue-router), [vuex](https://github.com/vuejs/vuex)\)\*
* Installed [vue-devtools](https://github.com/vuejs/vue-devtools) and [devtron](https://github.com/electron/devtron) tools for development
* Ability to easily package your electron app using [electron-packager](https://github.com/electron-userland/electron-packager) or [electron-builder](https://github.com/electron-userland/electron-builder)\*
* `appveyor.yml` and `.travis.yml` configurations for automated deployments with [electron-builder](https://github.com/electron-userland/electron-builder)\*
* Ability to produce web output for browsers
* Handy [NPM scripts](https://simulatedgreg.gitbooks.io/electron-vue/content/en/npm_scripts.html)
* Use of [webpack](https://github.com/webpack/webpack) and [vue-loader](https://github.com/vuejs/vue-loader) with Hot Module Replacement
* Process restarting when working in main process
* HTML/CSS/JS pre-processor support with [vue-loader](https://github.com/vuejs/vue-loader/)
* ES6 with [`stage-0`](https://babeljs.io/docs/plugins/preset-stage-0/) by default
* Use of [`babili`](https://github.com/babel/babili) to remove the need of transpiling completely down to ES5
* ESLint \(with support for [`standard`](https://github.com/feross/standard) and [`airbnb-base`](https://github.com/airbnb/javascript)\)\*
* Unit Testing \(with Karma + Mocha\)\*
* End-to-end Testing \(with Spectron + Mocha\)\*

### Project Structure

#### 1. Electron Webpack configuration

Tips: 

+ Customize output directory as `../dist/electron`

+ Customize output file name as `entry.main` = `[name]`

+ Must set target as `electron-main` if you are about to build a electro app

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
#### 2. Build

+ Bundle app with `electron-packager`

```js
const packager = require("electron-packager");
const buildConfig = require("./build.config");

function bundleApp() {
  packager(buildConfig, (err, appPaths) => {
    if (err) {
      console.log(
        `\n${errorLog}${chalk.yellow("`electron-packager`")} says...\n`
      );
      console.log(err + "\n");
    } else {
      console.log(`\n${doneLog}\n`);
    }
  });
}
```

+ Build options

```js
const path = require("path");
module.exports = {
  arch: "x64", // ia32, mac, etc
  asar: true,
  dir: path.join(__dirname, "../"), // show not be electron/dist directory
  icon: path.join(__dirname, "../build/icons/icon"),
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, "../build"),
  overwrite: true,
  platform: process.env.BUILD_TARGET || "all"
};
```

#### 3. Development

+ npm script

```bash
npm run dev
```

+ Write Renderer files with `vue-cli-service`

```js
const { spawn } = require("child_process");
vueProcess = spawn(
  path.join(
    __dirname + "/../node_modules/.bin/vue-cli-service" + extension
  ),
  ["serve"],
  {
    cwd: path.join(__dirname + "/..")
  }
);
```

+ Write Main file (add dev configuration is *development environment*)

```js
mainConfig.entry.main = [
  path.join(__dirname, "../src/main/index.dev.js")
].concat(mainConfig.entry.main);

electronLog(mainConfig.entry.main, "yellow");

const compiler = webpack(mainConfig);

// do compipler debug stuff
```

+ start Electron with the packed `main.js` under `dist/electron` directory

```js
function startElectron() {
  electronProcess = spawn(electron, [
    "--inspect=5858",
    path.join(__dirname, "../dist/electron/main.js")
  ]);

  electronProcess.stdout.on("data", data => {
    electronLog(data, "blue");
  });
  electronProcess.stderr.on("data", data => {
    electronLog(data, "red");
  });

  electronProcess.on("close", () => {
    if (!manualRestart) process.exit();
  });
}
```

### Source Code Directory

#### Vuex

+ `general.js` is the base template of store

```js
export const state = {
  items: [],
  currentItem: {
    _id: 1,
    name: "xing wenju",
  },
  filterKey: "",
  sortKey: "",
  editing: false,
  dbName: "",
};

export const getters = {}
export const mutation = {}
export const actions = {}
```

+ `User.js` is the module which extends the `general.js` with `namespace`

```js
/**
 * 适用于人员对象的存储器
 */

import { state, actions, getters, mutations } from "../template/general";

state.dbName = "user";

export default {
  // 使用命名空间，实现模块化导入
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
```

+ If you prefer the `typescript`, you can use types pattern

```ts
const state: State = {
  name: "base",
  items: [],
  activeItem: {},
  filterKey: "",
  sortKey: "",
};

const getters = {
  moduleName: (state: State) => state.name,
  itemCounts: (state: State) => state.items.length,
  itemKeys: (state: State) => {
    return [];
  },
  itemFiltered: (state: State) => {
    return baseFilter(state.items, state.sortKey, state.filterKey);
  },
};

const mutations = {
  "mutation/create": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/delete": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/update": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/read": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/set": (state: State, payload: any) => {
    state.activeItem[payload.target.name] = payload.target.value;
  },
};

const actions = {
  "action/create": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/create", payload);
  },
  "action/delete": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/delete", payload);
  },
  "action/update": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/update", payload);
  },
  "action/read": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/read", payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
```

+ If you need `vuex plugin`

In the `store/index.js`, add `plugin`

```js
export default new Vuex.Store({
  modules,
  plugins, // add this line
  ...
});
```

Then define you plugin as a array of functions which take store as parameter

In the `plugins/cloud.js` file, is like this

```js
export const FirebasePlugin = (options = {}) => {
  return store => {
    const namespace = options.namespace || "";
    store.subscribe((mutation, state) => {
       // do your side works like save to firbase
    }
  }
}
```

#### Vue

+ In the component, we can use like this

```js
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("User", ["items", "currentItem", "filterKey", "sortKey", "editing", "dbName"]),
    ...mapGetters("User", ["filteredData", "count", "itemFieldNames"]),
  },
  methods: {
    ...mapActions("User", [
      "DB_SELECT_DATABASE",
      "DB_FIND_ITEMS",
      "DB_CREATE_ITEM",
      "DB_UPDATE_ITEM",
      "DB_DELETE_ITEM",
      "DB_CLEAR_ITEM",
    ]),
    ...mapMutations("User", [
      "SELECT_DATABASE",
      "CREATE_ITEM",
      "DELETE_ITEM",
      "UPDATE_ITEM",
      "FIND_ITEMS",
      "CLEAR_ITEMS",
      "UPDATE_MODEL",
      "SET_CURRENT_ITEM",
      "SET_EMPTY_ITEM",
      "TOOGLE_EDIT",
      "UPDATE_FILTERKEY",
      "UPDATE_SORTKEY",
    ])
  }
}
```

+ Or you can use the `class` component definition as in `BookmarkPage.vue`

```ts
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action, namespace } from "vuex-class";

const BookmarkState = namespace("Bookmark", State);
const BookmarkGetter = namespace("Bookmark", Getter);
const BookmarkAction = namespace("Bookmark", Action);
const BookmarkMutation = namespace("Bookmark", Mutation);

@Component
export default class User extends Vue {

  @BookmarkState("dbName") dbName: string;

  @BookmarkGetter("filteredData") filteredData: any[];
  @BookmarkGetter("itemFieldNames") itemFieldNames: string[];

  @BookmarkAction("DB_SELECT_DATABASE") selectDb: Function;
  @BookmarkAction("DB_FIND_ITEMS") find: Function;
  @BookmarkAction("DB_CREATE_ITEM") create: Function;
  @BookmarkAction("DB_DELETE_ITEM") remove: Function;

  createBookmark() {
    this.create({ title: this.title, url: this.url });
  }

  removeBookmark(bookmark: any) {
    this.remove(bookmark);
  }
}
```

#### Vue router

#### Axios

#### Element UI

## Tips

### 下一步

请务必查看 [文档](https://simulatedgreg.gitbooks.io/electron-vue/content/)。在这里，你将找到有关项目配置、项目结构和构建应用程序的有用信息。这里还有一个方便的 [常见问题](https://simulatedgreg.gitbooks.io/electron-vue/content/en/faqs.html) 的部分。

## 基于 electron-vue 的作品

看看一些基于 electron-vue 建造的了不起的的项目。

* [**Surfbird**](https://github.com/surfbirdapp/surfbird): 一个基于 Electron 和 Vue 的 Twitter 客户端
* [**Lulumi-browser**](https://github.com/qazbnm456/lulumi-browser): Lulumi-browser 是一个轻量级的浏览器，基于 Vue.js 2 和 Electron
* [**Space-Snake**](https://github.com/ilyagru/Space-Snake): 使用 Electron 和 Vue.js 构建的桌面游戏。
* [**Forrest**](https://github.com/stefanjudis/forrest): 一个 npm 脚本的桌面客户端
* [**miikun**](https://github.com/hiro0218/miikun): 一个简单的 Markdown 编辑器
* [**Dakika**](https://github.com/Madawar/Dakika): 超省时的应用程序，使写作变得轻而易举
* [**Dynamoc**](https://github.com/ieiayaobb/dynamoc): Dynamoc 是一个 dynamodb-local、 dynalite 和 AWS dynamodb 的图形化界面客户端
* [**Dockeron**](https://github.com/dockeron/dockeron): Dockeron 项目, 基于 Electron + Vue.js 的 Docker 桌面客户端
* [**Easysubs**](https://github.com/matiastucci/easysubs): 快速简单地下载字幕
* [**Data-curator**](https://github.com/ODIQueensland/data-curator)：分享可用的開放數據。
