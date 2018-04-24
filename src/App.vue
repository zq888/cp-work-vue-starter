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
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
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
              @click="navigate(child.to)"
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
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
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
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
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
    <RegisterDialog />
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";
import RegisterDialog from "./components/Shared/RegisterDialog.vue";

import * as types from "@/store/types";
import { defaultUser } from "@/store/Model/BaseModel";
const nsUser = { namespace: types.nsUser };

@Component({
  components: {
    RegisterDialog
  }
})
export default class App extends Vue {
  items: any[];

  drawer: any;

  @Prop() source: String;

  @State("filterKey", nsUser)
  filterKey!: string;
  @Mutation(types.mSetFilter, nsUser)
  setFilter: Function;

  navigate(to: string) {
    this.$router.push(to);
  }

  constructor() {
    super();

    this.drawer = null;
    this.items = [
      { icon: "help", text: "Welcome", to: "/" },
      { icon: "contacts", text: "Contacts", to: "/user" },
      { icon: "history", text: "Apollo", to: "/apollo" },
      { icon: "content_copy", text: "Duplicates", to: "/about" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Database",
        to: "/database",
        model: true,
        children: [
          { icon: "add", text: "Create", to: "/database" },
          { icon: "add", text: "Manage", to: "/database/manage" },
          { icon: "add", text: "Import/Export", to: "/database/export" }
        ]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "More",
        model: false,
        children: [
          { text: "Import", to: "/about" },
          { text: "Export", to: "/about" },
          { text: "Print", to: "/about" },
          { text: "Undo changes", to: "/about" },
          { text: "Other contacts", to: "/about" }
        ]
      },
      { icon: "settings", text: "Settings", to: "/about" },
      { icon: "chat_bubble", text: "Send feedback", to: "/about" },
      { icon: "help", text: "Help", to: "/help" },
      { icon: "phonelink", text: "App downloads", to: "/about" },
      { icon: "keyboard", text: "Go to the old version", to: "/about" }
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
