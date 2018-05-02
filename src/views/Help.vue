<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in items" :key="i">
      <div slot="header">{{item.header}}</div>
      <v-card>
        <v-card-text>{{item.text}}</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class PresentationView extends Vue {
  items: any[] = [
    {
      header: "用户管理",
      text: "进行用户的管理",
      src: "https://pbs.twimg.com/profile_images/871923557332398080/M01F1Q4k_400x400.jpg",
    },
    {
      header: "文档管理",
      text: "进行文档的管理",
      src: "https://pbs.twimg.com/profile_images/871923557332398080/M01F1Q4k_400x400.jpg",
    },
  ];
}
</script>
