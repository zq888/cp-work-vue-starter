<template>
  <v-jumbotron color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to the site</h3>
          <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Check out our newest features!</div>
          <v-btn large color="primary" class="mx-0">{{userDbName}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @State("title") private title!: string;
  @State("name", { namespace: "User" })
  private userDbName!: string;
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
h1 {
  color: cornflowerblue;
}
</style>
