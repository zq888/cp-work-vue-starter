<template>
  <v-layout fluid wrap>
    <v-flex xs12 sm6 :key="item._id" v-for="(item, index) in items">
      <v-toolbar color="purple" dark>
        <v-toolbar-title>
          <a :href="item.shortUrl" class="white--text">{{item.name}}</a>
        </v-toolbar-title>
      </v-toolbar>
      <v-list two-line>
        <template>
          <v-list-tile avatar ripple @click="editItem(item)">
            <v-list-tile-content>
              <v-list-tile-title class="title">
                <a :href="item.shortUrl">{{item.id}}</a>
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon color="grey lighten-1">add</v-icon>
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
const nsTrello = { namespace: types.nsTrello };

import clsTrello from "@/store/api/TrelloSDK";
const trello = new clsTrello();

@Component
export default class TrelloTable extends Vue {
  // Props
  dialog: boolean = false;
  editing: boolean = false;
  formTitle: string = "文书信息";
  headers: any[];
  editIndex: number = -1;
  // State
  @State("activeItem", nsTrello)
  activeItem: object;
  // @State("items", nsTrello)
  items: any[];
  @State("filterKey") globalFilterKey: string;
  // Getters
  @Getter("itemFiltered", nsTrello)
  itemFiltered: any[];
  @Getter("itemKeys", nsTrello)
  itemKeys: any[];
  // Mutations
  @Mutation(types.mSetActive, nsTrello)
  setActive: Function;
  @Mutation(types.mSetValue, nsTrello)
  setValue: Function;
  // Actions
  @Action(types.aCreate, nsTrello)
  createItem: Function;
  @Action(types.aDelete, nsTrello)
  deleteItem: Function;
  @Action(types.aUpdate, nsTrello)
  updateItem: Function;

  constructor() {
    super();
    this.dialog = false;
    this.editing = false;
    this.headers = [];
    this.items = [];
  }

  created() {
    this.fetch();
  }

  fetch() {
    trello.client.getBoards("me", (error: any, result: any[]) => {
      if (error) {
        console.log(error);
      } else {
        this.items = result;
      }
    });
  }

  navigate(payload: any) {
    this.$router.push({ name: "trello-page", params: payload });
  }

  editItem(item: any) {
    // this.editing = true;
    // this.setActive(item);
    // this.navigate({ id: item._id, page: "board", editing: "true" });
    // this.dialog = true;
  }
}
</script>
