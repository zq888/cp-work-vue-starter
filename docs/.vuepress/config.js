module.exports = {
  title: "Emacser & Vimer & Vuer",
  description: "A sturnborn Emacser-Vimer-Vuer development notes",
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "linuxing3/cp-work-vue-starter",
    // 当你的文档不是仓库的根目录时需要设置
    docsDir: "docs",
    // 可选的, 默认是  master
    docsBranch: "master",
    // 默认是 true, 设置为 false 来禁用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
    nav: [
      { text: "Home", link: "/" },
      { text: "Electron", link: "/zh/guide/electron/" },
      { text: "Vuex", link: "/zh/guide/vuex/" },
      { text: "Vue Router", link: "/zh/guide/vue-router/" },
      { text: "Vue Cli", link: "/zh/guide/vue-cli/" },
      { text: "Google", link: "https://google.com" },
      {
        text: "Languages",
        items: [
          { text: "Chinese", link: "/zh/guide/" },
          { text: "English", link: "/en/guide/" }
        ]
      }
    ],
    sidebar: {
      "/zh/guide/electron/": ["", "one", "two"],
      "/zh/guide/vuex/": ["", "one", "two"],
      "/zh/guide/vue-router/": ["", "one", "two"],
      "/zh/guide/vue-cli/": ["", "one", "two"]
    }
  }
};
