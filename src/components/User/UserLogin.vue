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
  name: string = "linuxing3";
  email: string = "linuxing3@qq.com";
  password: string = "20090909";

  photoUrl: string | null = "";
  uid: string | null = "";
  emailVerified: boolean = false;

  warnDialoge: boolean = false;
  warnText: string = "";
  inProgress: boolean = false;

  @State("token") token: any;
  @State("loggedIn") loggedIn: boolean;

  async netlifyLogin() {
    this.inProgress = true;
    var authenticator = new Netlify.default({});
    authenticator.authenticate({ provider: "github", scope: "user" }, (err: any, data: any) => {
      if (err) {
        this.onLoginError();
      }
      console.log("Authenticated with GitHub. Access Token: " + data.token);
      this.token.netlifyToken = data.token;
      this.doneLogin();
    });
  }

  /**
   * Signup with password and email
   */
  async fireSignup() {
    fb.firebaseAuth
      .createUserWithEmailAndPassword("linuxing3@qq.com", "20090909")
      .then((data: any) => {
        console.log(data);
        this.doneLogin();
      })
      .catch((err: any) => {
        this.onLoginError();
      });
  }
  /**
   * Signin with password and email
   */
  async fireSignin() {
    this.inProgress = true;
    let error = await fb.loginWithEmail(this.email, this.password);
    if (error !== undefined) {
      this.onLoginError();
    } else {
      this.doneLogin();
      this.getUserInfo();
    }
  }

  getUserInfo() {
    let user = fb.firebaseAuth.currentUser;

    if (user != null) {
      user.getIdToken().then(token => {
        this.token.netlifyToken = token;
      });
      this.name = user.displayName === null ? "" : user.displayName;
      this.email = user.email === null ? "" : user.email;
      this.photoUrl = user.photoURL;
      this.emailVerified = user.emailVerified;
      this.uid = user.uid;
    }
    console.log(this.email);
  }
  /**
   * After login, goto help page view
   */
  doneLogin() {
    this.warnText = "你已成功登录，可以继续使用本系统。";
    this.inProgress = false;
    this.$router.push({ path: "/help" });
    // should upate the global state token for session
  }

  /**
   * on login error, alert
   */
  onLoginError() {
    console.log("You Must login...");
    this.warnText = "你必须要登录才可以继续使用本系统。";
    this.warnDialoge = true;
  }

  clearFields() {
    this.name = "";
    this.email = "";
  }
}
</script>
