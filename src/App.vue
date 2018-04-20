<template>
  <div id="app">
    <v-app>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";

@Component({
  components: {
    HelloWorld,
    NavBar
  }
})
export default class App extends Vue {
  items: any[];

  constructor() {
    super();
    this.items = [
      { title: "Home", icon: "dashboard", to: "/" },
      { title: "About", icon: "question_answer", to: "/about" }
    ];
  }
}
</script>

<style>
/* @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"); */
/* Global CSS */
</style>
