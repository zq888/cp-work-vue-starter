<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
      <div slot="header">Item</div>
      <v-card>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
