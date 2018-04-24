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

::: tip
请务必查看 [文档](https://simulatedgreg.gitbooks.io/electron-vue/content/)。在这里，你将找到有关项目配置、项目结构和构建应用程序的有用信息。这里还有一个方便的 [常见问题](https://simulatedgreg.gitbooks.io/electron-vue/content/en/faqs.html) 的部分。
:::

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
