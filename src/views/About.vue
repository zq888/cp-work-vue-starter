<template>
  <v-layout row wrap>
    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class HelloWorld extends Vue {
  items: any[] = [
    {
      src: "https://vuepress.vuejs.org/hero.png"
    },
    {
      src: "https://vuepress.vuejs.org/hero.png"
    },
    {
      src: "https://vuepress.vuejs.org/hero.png"
    },
    {
      src: "https://vuepress.vuejs.org/hero.png"
    }
  ];
}
</script>
