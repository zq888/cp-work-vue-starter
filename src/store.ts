import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface State {
  title: string;
}

const state: State = {
  title: "xing wenju"
};

export default new Vuex.Store({
  state,
  getters: {
    mytitle: state => state.title
  },
  mutations: {},
  actions: {}
});
