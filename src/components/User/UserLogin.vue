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
    <v-checkbox
      v-model="checkbox"
      value="1"
      label="Option"
      data-vv-name="checkbox"
      type="checkbox"
      required
    ></v-checkbox>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

import netlify from "netlify-auth-providers";

import * as types from "@/store/types";

@Component
export default class UserLogin extends Vue {
  name: string;
  email: string;
  select: any;
  checkbox: any;
  dictionary: any;
  @State("name", { namespace: "User" })
  userDbName!: string;
  @State("items", { namespace: "User" })
  items: any[];
  @Action(types.aCreate, { namespace: "User" })
  createUser: Function;

  constructor() {
    super();
    this.name = "";
    this.email = "";
    this.select = null;
    this.checkbox = null;
    this.dictionary = {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        select: {
          required: "Select field is required"
        }
      }
    };
  }
  mounted() {}

  submit() {
    this.createUser({ name: this.name, email: this.email });
    var authenticator = new netlify.default({});
    authenticator.authenticate({ provider: "github", scope: "user" }, function(
      err: any,
      data: any
    ) {
      if (err) {
        console.log(err);
      }
      console.log("Authenticated with GitHub. Access Token: " + data.token);
    });
  }

  clear() {
    this.name = "";
    this.email = "";
    this.select = null;
    this.checkbox = null;
  }
}
</script>
