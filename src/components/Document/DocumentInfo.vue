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
import { defaultDocument } from "@/store/Model/BaseModel";
const nsDocument = { namespace: types.nsDocument };

@Component
export default class DocumentInfo extends Vue {
  // Props
  @Prop() editing!: boolean;
  // State
  @State("activeItem", nsDocument)
  activeItem!: object;
  @State("items", nsDocument)
  items: any[];
  // Getters
  @Getter("itemFiltered", nsDocument)
  itemFiltered: any[];
  // Mutations
  @Mutation(types.mSetActive, nsDocument)
  setActive: Function;
  @Mutation(types.mSetValue, nsDocument)
  setValue: Function;
  // Actions
  @Action(types.aCreate, nsDocument)
  createItem: Function;
  @Action(types.aDelete, nsDocument)
  deleteItem: Function;
  @Action(types.aUpdate, nsDocument)
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
