<template>
  <form>
    <v-text-field
      v-for="v, k in activeItem" v-bind:key="v._id" v-bind:label="k"
      v-bind:name="k" v-bind:id="k" v-bind:value="v"
      @input.native="setValue($event)"
      required
    ></v-text-field>
    <v-btn @click="createItem">Save</v-btn>
    <v-btn @click="clear">clear</v-btn>
    <v-btn @click="deleteItem">Delete</v-btn>
  </form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";

@Component
export default class UserLogin extends Vue {
  @State("activeItem", { namespace: "User" })
  activeItem!: object;
  @State("items", { namespace: "User" })
  items: any[];
  @Getter("itemFiltered", { namespace: "User" })
  itemFiltered: any[];
  @Mutation(types.mSet, { namespace: "User" })
  setValue: Function;
  @Action(types.aCreate, { namespace: "User" })
  createUser: Function;
  @Action(types.aDelete, { namespace: "User" })
  deleteUser: Function;
  @Action(types.aUpdate, { namespace: "User" })
  updateUser: Function;

  constructor() {
    super();
  }

  createItem() {
    this.createUser(this.activeItem);
  }

  findItems() {}
  deleteItem() {
    this.deleteUser(this.activeItem);
  }
  clear() {}
}
</script>
