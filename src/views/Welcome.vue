<template>
  <v-layout row wrap>
    <v-flex>
    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class About extends Vue {
  items: any[] = [
    {
      src: "https://vuepress.vuejs.org/hero.png",
    },
    {
      src: "https://vuetifyjs.com/static/doc-images/cards/halcyon.png",
    },
    {
      src: "https://vuepress.vuejs.org/hero.png",
    },
    {
      src: "https://vuetifyjs.com/static/doc-images/cards/halcyon.png",
    },
  ];
}
</script>
