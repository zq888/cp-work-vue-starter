<template>
  <div class="hello">
      {{title}}
      {{Message}}
      {{msg}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @State("title") private title: string;
  Message: string;
  constructor() {
    super();
  }
  created() {
    this.title;
    this.Message = "My message";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
