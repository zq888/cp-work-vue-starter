<template>
  <v-layout fluid wrap>
    <v-flex xs12 sm12> 
      <v-toolbar color="purple" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>作业清单</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list two-line>
        <template v-for="(item, index) in items">
          <v-list-tile avatar ripple :key="index" @click="editItem(item)">
            <v-list-tile-content>
              <v-list-tile-title>{{ item["标题"] }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ item["作者"] }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item["正文"] }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>like</v-list-tile-action-text>
              <v-icon color="grey lighten-1">star_border</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import { defaultWriterWork } from "@/store/Model/BaseModel";
const nsWriter = { namespace: types.nsWriter };

@Component
export default class WriterWorkTable extends Vue {
  // Props
  dialog: boolean = false;
  editing: boolean = false;
  formTitle: string = "文书信息";
  headers: any[];
  editIndex: number = -1;
  // State
  @State("activeItem", nsWriter)
  activeItem: object;
  @State("items", nsWriter)
  items: any[];
  @State("filterKey") globalFilterKey: string;
  // Getters
  @Getter("itemFiltered", nsWriter)
  itemFiltered: any[];
  @Getter("itemKeys", nsWriter)
  itemKeys: any[];
  // Mutations
  @Mutation(types.mSetActive, nsWriter)
  setActive: Function;
  @Mutation(types.mSetValue, nsWriter)
  setValue: Function;
  // Actions
  @Action(types.aCreate, nsWriter)
  createItem: Function;
  @Action(types.aDelete, nsWriter)
  deleteItem: Function;
  @Action(types.aUpdate, nsWriter)
  updateItem: Function;

  constructor() {
    super();
    this.dialog = false;
    this.editing = false;
    this.headers = [];
  }

  navigate(payload: any) {
    this.$router.push({ name: "writer-page-id", params: payload });
  }

  editItem(item: any) {
    this.editing = true;
    this.setActive(item);
    this.navigate({ id: item._id, page: "board", editing: "true" });
    this.dialog = true;
  }
}
</script>
