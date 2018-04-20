<template>
  <div>
  {{userDbName}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @State("title") private title: string;
  @State("name", { namespace: "User" })
  private userDbName: string;
  Message: string;

  cards: any[];

  constructor() {
    super();
  }

  created() {
    this.title;
    this.Message = "My message";
    this.cards = [
      {
        title: "Pre-fab homes",
        src: "https://vuetifyjs.com/static/doc-images/cards/house.jpg",
        flex: 12
      },
      {
        title: "Favorite road trips",
        src: "https://vuetifyjs.com/static/doc-images/cards/road.jpg",
        flex: 6
      },
      {
        title: "Best airlines",
        src: "https://vuetifyjs.com/static/doc-images/cards/plane.jpg",
        flex: 6
      }
    ];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: cornflowerblue;
}
</style>
