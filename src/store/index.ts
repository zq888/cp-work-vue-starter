import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { fb } from "@/store/api/firebaseSDK";

import { dbInit } from "@/store/api/NedbSDK";
dbInit();

import User from "./modules/User";
import Database from "./modules/Database";
import Document from "./modules/Document";
import Writer from "./modules/Writer";
import plugins from "./plugin";

import Base from "@/store/modules/Base";

interface IState {
  title: string;
  filterKey: string;
  token: {
    [token: string]: string;
  };
  loggedIn: boolean;
}

const state: IState = {
  title: "xing wenju",
  filterKey: "",
  token: {
    netlifyToken: "",
    firebaseToken: "",
  },
  loggedIn: false,
};

export default new Vuex.Store({
  state,
  plugins,
  modules: {
    User,
    Database,
    Writer,
    Document,
  },
  getters: {
    mytitle: state => state.title,
  },
  mutations: Base.mutations,
  actions: Base.actions,
});
