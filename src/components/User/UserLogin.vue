<template>
  <form>
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
      data-vv-name="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      data-vv-name="password"
      required
    ></v-text-field>
    <v-text-field
      v-model="code"
      label="Authorization Code"
      data-vv-name="code"
    ></v-text-field>

    <v-btn @click="netlifyLogin">Netlify Login</v-btn>
    <v-btn @click="fireSignin">Firebase Signin</v-btn>
  </form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

const Netlify = require("netlify-auth-providers");

import fb from "@/store/api/firebaseSDK";

import * as types from "@/store/types";

@Component
export default class UserLogin extends Vue {
  name: string;
  email: string;
  password: string;
  code: string;
  select: any;
  dictionary: any;
  @State("name", { namespace: "User" })
  userDbName!: string;
  @State("items", { namespace: "User" })
  items: any[];
  @Action(types.aCreate, { namespace: "User" })
  createUser: Function;

  constructor() {
    super();
    this.name = "linuxing3";
    this.email = "linuxing3@qq.com";
    this.password = "20090909";
    this.code = "";
    this.dictionary = {
      attributes: {
        email: "E-mail Address"
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        password: {
          required: "Select field is required"
        }
      }
    };
  }
  mounted() {}

  netlifyLogin() {
    // this.createUser({ name: this.name, email: this.email });
    var authenticator = new Netlify.default({});
    authenticator.authenticate(
      { provider: "github", scope: "user" },
      (err: any, data: any) => {
        if (err) {
          console.log(err);
        }
        console.log("Authenticated with GitHub. Access Token: " + data.token);
      }
    );
  }

  async fireSignup() {
    fb.firebaseAuth
      .createUserWithEmailAndPassword("linuxing3@qq.com", "20090909")
      .catch(data => {
        console.log(data);
      });
  }

  async fireSignin() {
    let user = await fb.loginWithEmail(this.email, this.password);
    console.log(user);
  }

  clearFields() {
    this.name = "";
    this.email = "";
    this.select = null;
  }
}
</script>
