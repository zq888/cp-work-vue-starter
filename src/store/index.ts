import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import User from "./modules/User";
import plugins from "./plugin";

interface State {
  title: string;
}

const state: State = {
  title: "xing wenju"
};

export default new Vuex.Store({
  state,
  plugins,
  modules: {
    User
  },
  getters: {
    mytitle: state => state.title
  },
  mutations: {},
  actions: {}
});
