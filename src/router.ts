import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Welcome from "./views/Welcome.vue";
import Apollo from "./views/Apollo.vue";
import User from "./views/User.vue";
import Document from "./views/Document.vue";
import Writer from "./views/Writer.vue";
import Database from "./views/Database.vue";
import Help from "./views/Help.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/",
      name: "index",
      redirect: "/home",
    },
    {
      path: "/user",
      name: "user",
      component: User,
    },
    {
      path: "/user/:page",
      name: "user-page",
      component: User,
    },
    {
      path: "/document/:page",
      name: "document-page",
      component: Document,
    },
    {
      path: "/writer/:page",
      name: "writer-page",
      component: Writer,
    },
    {
      path: "/writer/:page/:id",
      name: "writer-page-id",
      component: Writer,
    },
    {
      path: "/database",
      name: "database",
      component: Database,
    },
    {
      path: "/help",
      name: "help",
      component: Help,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
    },
    {
      path: "/apollo",
      name: "apollo",
      component: Apollo,
    },
  ],
});
