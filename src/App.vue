<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6 md1 >
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 md1 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="navigate(child.to, child.route)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="navigate(item.to)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="purple darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">国际机构通用管理系统</span>
      </v-toolbar-title>
      <v-text-field
        :value="filterKey"
        :name="filterKey"
        @input.native="setFilter($event)"
        flat
        solo-inverted
        prepend-icon="search"
        label="查找"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon @click="navigate('/about')">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon v-if="token.firebaseToken !== '' || token.netlifyToken !==''">
        <v-avatar size="24px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";
import NavigationBar from "./components/Shared/NavigationBar.vue";

import * as types from "@/store/types";
import { defaultUser } from "@/store/Model/BaseModel";
const nsUser = { namespace: types.nsUser };

@Component({
  components: {
    NavigationBar,
  },
})
export default class App extends Vue {
  items: any[];

  drawer: boolean;

  @Prop() source: String;

  @State("token") token: any;
  @State("filterKey", nsUser)
  filterKey: string;
  @Mutation(types.mSetFilter, nsUser)
  setFilter: Function;

  navigate(to: string, payload?: string) {
    this.$router.push({ path: to });
  }

  constructor() {
    super();

    this.drawer = false;
    this.items = [
      { icon: "home", text: "欢迎", to: "/" },
      {
        icon: "contacts",
        text: "人员",
        "icon-alt": "contacts",
        children: [
          { icon: "add", text: "列表", to: "/user/table" },
          { icon: "add", text: "卡片", to: "/user/card" },
          { icon: "add", text: "简历", to: "/user/profile" },
        ],
      },
      {
        icon: "folder_open",
        text: "文件",
        "icon-alt": "folder_open",
        children: [
          { icon: "add", text: "列表", to: "/document/table" },
          { icon: "add", text: "卡片", to: "/document/card" },
          { icon: "add", text: "简历", to: "/document/profile" },
        ],
      },
      {
        icon: "event",
        text: "日程",
        "icon-alt": "event",
        children: [
          { icon: "add", text: "列表", to: "/document/table" },
          { icon: "add", text: "卡片", to: "/document/card" },
          { icon: "add", text: "简历", to: "/document/profile" },
        ],
      },
      {
        icon: "keyboard",
        text: "写作",
        "icon-alt": "keyboard",
        children: [
          { icon: "add", text: "作业清单", to: "/writer/table" },
          { icon: "add", text: "作业卡", to: "/writer/board" },
          { icon: "add", text: "作业信息", to: "/writer/info" },
        ],
      },
      // { icon: "history", text: "Apollo", to: "/apollo" },
      // { icon: "content_copy", text: "Duplicates", to: "/about" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "数据库",
        to: "/database",
        model: true,
        children: [
          { icon: "add", text: "创建", to: "/database" },
          { icon: "add", text: "管理", to: "/database/manage" },
          { icon: "add", text: "导入/导出", to: "/database/export" },
        ],
      },
      { icon: "settings", text: "设置", to: "/about" },
      { icon: "chat_bubble", text: "反馈", to: "/about" },
      { icon: "help", text: "帮助", to: "/help" },
      { icon: "phonelink", text: "下载应用", to: "/about" },
      // { icon: "keyboard", text: "Go to the old version", to: "/about" }
    ];
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
/* Global CSS */
/* @font-face {
    font-family: "Material Icons";
    font-style: normal;
    font-weight: 400;
    src: url("/fonts/material-icons.woff2") format("woff2");
    }

    .material-icons {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    } */

/* latin-ext */
/* @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
    url("/fonts/KFOmCnqEu92Fr1Mu7GxKOzY.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    } */
/* latin */
/* @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
    url("/fonts/KFOmCnqEu92Fr1Mu4mxK.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
    } */
</style>
