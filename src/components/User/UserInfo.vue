<template>
  <form>
    <v-text-field
      v-for="v, k in activeItem" v-bind:key="v._id" v-bind:label="k"
      v-bind:name="k" v-bind:id="k" v-bind:value="v"
      @input.native="setValue($event)"
      required
    ></v-text-field>
    <v-btn color="primary" @click="createItem">Save</v-btn>
    <v-btn color="" @click="updateItem">Update</v-btn>
  </form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import { defaultUser } from "@/store/Model/BaseModel";

@Component
export default class UserLogin extends Vue {
  @Prop() dialog!: boolean;
  @State("editing", { namespace: "User" })
  editing!: object;
  @State("activeItem", { namespace: "User" })
  activeItem!: object;
  @State("items", { namespace: "User" })
  items: any[];
  @Getter("itemFiltered", { namespace: "User" })
  itemFiltered: any[];
  @Mutation(types.mSetValue, { namespace: "User" })
  setValue: Function;
  @Mutation(types.mSetActive, { namespace: "User" })
  setActive: Function;
  @Action(types.aCreate, { namespace: "User" })
  create: Function;
  @Action(types.aDelete, { namespace: "User" })
  delete: Function;
  @Action(types.aUpdate, { namespace: "User" })
  update: Function;

  constructor() {
    super();
  }

  createItem() {
    this.create(this.activeItem);
  }

  updateItem() {
    this.update(this.activeItem);
  }
}
</script>
