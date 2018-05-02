<template>
  <v-container> 
    <v-layout v-if="inProgress" row>
      <v-flex xs12 sm6 md4 offset-md4>
        <v-alert type="success" :value="!inProgress">
          This is a success alert.
        </v-alert>
        <v-progress-circular indeterminate :size="80" color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
      <form v-if="!inProgress">
        <v-text-field
          v-model="name"
          label="Name"
          :counter="10"
          data-vv-name="name"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          data-vv-name="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="email"
          data-vv-name="password"
          required
        ></v-text-field>

        <v-btn @click="netlifyLogin" class="primary">Netlify Login</v-btn>
        <v-btn @click="fireSignin" class="accent">Firebase Signin</v-btn>
      </form>
      </v-flex>
    </v-layout>
      <v-dialog v-model="warnDialoge" max-width="500px">
      <v-card>
        <v-card-title>
          <span>提醒</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>{{warnText}}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="warnDialoge=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

const Netlify = require("netlify-auth-providers");

import { fb } from "@/store/api/firebaseSDK";

import * as types from "@/store/types";

@Component
export default class UserLogin extends Vue {
  name: string;
  email: string;
  password: string;
  warnDialoge: boolean;
  warnText: string;
  inProgress: boolean;

  @State("firebaseToken") firebaseToken: string;
  @State("netlifyToken") netlifyToken: string;
  @State("netlifyLoggedIn") netlifyLoggedIn: boolean;
  @State("firebaseLoggedIn") firebaseLoggedIn: boolean;

  constructor() {
    super();
    this.name = "linuxing3";
    this.email = "linuxing3@qq.com";
    this.password = "20090909";
    this.warnDialoge = false;
    this.warnText = "";
    this.inProgress = false;
  }
  mounted() {}

  netlifyLogin() {
    // this.createUser({ name: this.name, email: this.email });
    var authenticator = new Netlify.default({});
    authenticator.authenticate({ provider: "github", scope: "user" }, (err: any, data: any) => {
      if (err) {
        console.log(err);
      }
      console.log("Authenticated with GitHub. Access Token: " + data.token);
      this.netlifyToken = data.token;
    });
  }

  async fireSignup() {
    fb.firebaseAuth.createUserWithEmailAndPassword("linuxing3@qq.com", "20090909").catch(data => {
      console.log(data);
    });
  }

  async fireSignin() {
    this.inProgress = true;
    let user: object = await fb.loginWithEmail(this.email, this.password);
    if (user !== undefined) {
      this.warnText = "你已成功登录，可以继续使用本系统。";
      this.inProgress = false;
      this.navigate("/help");
    } else {
      console.log("You Must login...");
      this.warnText = "你必须要登录才可以继续使用本系统。";
      this.warnDialoge = true;
    }
  }

  navigate(to: string, payload?: string) {
    this.$router.push({ path: to });
  }

  doneLogin() {
    this.$router.push({ path: "/home" });
  }

  clearFields() {
    this.name = "";
    this.email = "";
  }

  LoginStatus(oldToken: string, newToken: string) {
    return false;
  }
}
</script>
