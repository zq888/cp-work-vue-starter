import Vue from "vue";

import App from "./App.vue";

import router from "./router";

import store from "./store/index";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import colors from "vuetify/es5/util/colors";
Vue.use(Vuetify, {
  theme: {
    primary: colors.purple.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3,
  },
});
// import VueMDCAdapter from "vue-mdc-adapter";
// Vue.use(VueMDCAdapter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
