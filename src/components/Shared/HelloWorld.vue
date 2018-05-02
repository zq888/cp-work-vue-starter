<template>
  <v-jumbotron>
    <v-container>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">欢迎使用国际机构通用管理系统。</h3>
          <span class="subheading">更多更能，值得开发</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">查看更多功能</div>
          <Presentation />
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import UserLogin from "@/components/User/UserLogin.vue";
import Presentation from "@/components/Shared/Presentation.vue";

@Component({
  components: {
    UserLogin,
    Presentation,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg: string;
  @State("title") private title: string;
  @State("name", { namespace: "User" })
  private userDbName: string;
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
