<template>
  <v-layout row wrap class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/Shared/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
