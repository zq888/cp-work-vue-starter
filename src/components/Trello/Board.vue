<template>
  <v-layout fluid wrap>
    <v-flex xs12 sm6 :key="card._id" v-for="(card, index) in card">
      <v-toolbar color="blue" dark>
        <v-toolbar-title>
          <a :href="item.shortUrl" class="white--text">{{card.name}}</a>
        </v-toolbar-title>
      </v-toolbar>
      <v-list two-line>
        <template>
          <v-list-tile avatar ripple @click="editItem(card)">
            <v-list-tile-content>
              <v-list-tile-title class="title">
                <a :href="card.shortUrl">{{card.id}}</a>
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
  // State
  boardId: string = "";
  cards: any[];

  constructor() {
    super();
    this.cards = [];
  }

  created() {
    this.boardId = this.$route.params.id;
    this.fetch();
  }

  fetch() {
    trello.client.getCardsOnBoard(this.boardId, (error: any, result: any[]) => {
      if (error) {
        console.log(error);
      } else {
        this.cards = result;
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
