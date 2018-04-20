<template>
  <v-container>
    <router-link to="/">Home</router-link>
  <v-carousel>
    <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
  </v-carousel>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class HelloWorld extends Vue {
  items: any[] = [
    {
      src:
        "https://pbs.twimg.com/profile_images/871923557332398080/M01F1Q4k_400x400.jpg"
    },
    {
      src:
        "https://pbs.twimg.com/profile_images/871923557332398080/M01F1Q4k_400x400.jpg"
    },
    {
      src:
        "https://pbs.twimg.com/profile_images/871923557332398080/M01F1Q4k_400x400.jpg"
    },
    {
      src:
        "https://pbs.twimg.com/profile_images/871923557332398080/M01F1Q4k_400x400.jpg"
    }
  ];
}
</script>
