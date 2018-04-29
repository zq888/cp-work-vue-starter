import Vue from "vue";

import App from "./App.vue";

import router from "./router";

import store from "./store/index";

import fb from "@/store/api/firebaseSDK";
Vue.prototype.$fb = fb;

import nb from "@/store/api/NedbSDK";
Vue.prototype.$nb = nb;

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import colors from "vuetify/es5/util/colors";
Vue.use(Vuetify, {
  theme: {
    primary: colors.purple.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
});
// import { apolloProvider } from "./vue-apollo";

Vue.config.productionTip = false;

new Vue({
  // provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
