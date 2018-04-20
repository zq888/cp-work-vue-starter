import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
Vue.use(Vuetify);
import { apolloProvider } from "./vue-apollo";

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
