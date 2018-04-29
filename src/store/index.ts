import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import fb from "@/store/api/firebaseSDK";
fb.dbInit();
Vue.prototype.$fb = fb;

import { dbInit } from "@/store/api/NedbSDK";
dbInit();
// import nb from "@/store/api/NedbSDK";
// nb.dbInit();
// Vue.prototype.$nb = nb;

import User from "./modules/User";
import Database from "./modules/Database";
import Document from "./modules/Document";
import plugins from "./plugin";

import Base from "@/store/modules/Base";

interface IState {
  title: string;
  filterKey: string;
  token: string;
}

const state: IState = {
  title: "xing wenju",
  filterKey: "",
  token: ""
};

export default new Vuex.Store({
  state,
  plugins,
  modules: {
    User,
    Database,
    Document
  },
  getters: {
    mytitle: state => state.title
  },
  mutations: Base.mutations,
  actions: Base.actions
});
