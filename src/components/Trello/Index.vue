<template>
  <v-layout fluid wrap>
    <v-flex xs12 sm3 :key="item.id" v-for="(item, index) in items">
      <v-toolbar color="purple" dark>
        <v-toolbar-title>
          <a :href="item.shortUrl" class="white--text">{{item.name}}</a>
        </v-toolbar-title>
      </v-toolbar>
      <v-list two-line>
        <template>
          <v-list-tile avatar ripple @click="editItem(item)">
            <v-list-tile-content>
              打开面板
            </v-list-tile-content>
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
  items: any[];
  constructor() {
    super();
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
    this.navigate({ id: item.id, page: "board", editing: "true" });
  }
}
</script>
