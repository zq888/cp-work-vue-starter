import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import User from "./modules/User";
import Database from "./modules/Database";
import Document from "./modules/Document";
import plugins from "./plugin";

import { dbInit } from "@/store/api/NedbSDK";
dbInit();

import Base from "@/store/modules/Base";

interface IState {
  title: string;
  filterKey: string;
}

const state: IState = {
  title: "xing wenju",
  filterKey: ""
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
