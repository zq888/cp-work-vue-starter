import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import User from "./modules/User";

interface State {
  title: string;
}

const state: State = {
  title: "xing wenju"
};

export default new Vuex.Store({
  state,
  modules: {
    User
  },
  getters: {
    mytitle: state => state.title
  },
  mutations: {},
  actions: {}
});
