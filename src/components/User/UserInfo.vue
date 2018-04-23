<template>
  <form>
    {{editing ? " 你在进行编辑更新" : "你在添加模式"}}
    <v-text-field
      v-for="v, k in activeItem" v-bind:key="v._id" v-bind:label="k"
      v-bind:name="k" v-bind:id="k" v-bind:value="v"
      @input.native="setValue($event)"
      required
    ></v-text-field>
    <v-btn color="primary" @click="saveItem">{{editing ? "Update": "Save"}}</v-btn>
  </form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import { defaultUser } from "@/store/Model/BaseModel";
const nsUser = { namespace: types.nsUser };

@Component
export default class UserLogin extends Vue {
  // Props
  @Prop() editing!: boolean;
  // State
  @State("activeItem", nsUser)
  activeItem!: object;
  @State("items", nsUser)
  items: any[];
  // Getters
  @Getter("itemFiltered", nsUser)
  itemFiltered: any[];
  // Mutations
  @Mutation(types.mSetActive, nsUser)
  setActive: Function;
  @Mutation(types.mSetValue, nsUser)
  setValue: Function;
  // Actions
  @Action(types.aCreate, nsUser)
  createItem: Function;
  @Action(types.aDelete, nsUser)
  deleteItem: Function;
  @Action(types.aUpdate, nsUser)
  updateItem: Function;

  constructor() {
    super();
  }

  saveItem() {
    if (this.editing) {
      this.updateItem(this.activeItem);
    } else {
      this.createItem(this.activeItem);
    }
  }
}
</script>
