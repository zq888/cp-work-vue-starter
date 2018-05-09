<template>
  <v-layout fluid wrap color="purple">
    <v-flex xs12 sm4 :key="list.id" v-for="list in lists">
      <v-toolbar color="purple darken-3">
        <v-toolbar-title>
          <a class="white--text">{{list.name}}</a>
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-form :key="card.id" v-for="card in cards" v-if="card.idList === list.id">
          <v-text-field :value="card.name"></v-text-field>
          <v-btn @click="openCard(card)">Open</v-btn>
        </v-form>
        <v-form v-show="newTodoInputShow === true">
          <v-text-field
          v-show="newTodoInputShow"
          v-model="newTodo"
          placeholder="为这张卡片输入标题"></v-text-field>
          <v-layout align-center>
            <v-btn class="accent" @click="addItem({todo: newTodo, listId: list.id})">
              添加卡片
            </v-btn>
          </v-layout>
        </v-form>
        <v-layout align-center v-show="newTodoInputShow === false">
          <v-btn class="primary" @click="newTodoInputShow = true">
            添加新的卡片
          </v-btn>
        </v-layout>
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
export default class TrelloBoard extends Vue {
  // State
  lists: any[];
  cards: any[];

  newTodoInputShow: boolean = false;
  newTodo: string = "";

  constructor() {
    super();
    this.cards = [];
    this.lists = [];
  }

  created() {
    this.fetch();
  }

  fetch() {
    trello.client.getListsOnBoard(this.$route.params.id, (error: any, result: any[]) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        this.lists = result;
      }
    });
    trello.client.getCardsOnBoard(this.$route.params.id, (error: any, result: any[]) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        this.cards = result;
      }
    });
  }

  navigate(payload: any) {
    this.$router.push({ name: "trello-page", params: payload });
  }

  openCard(item: any) {
    console.log("Opening card..." + item.id);
    this.navigate({ id: item.id, page: "card", editing: "true" });
  }

  addItem(item: any) {
    trello.client.addCard(item.todo, "", item.listId, (error: any, result: any[]) => {
      this.newTodo = "";
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        this.newTodoInputShow = false;
        this.fetch();
      }
    });
  }
}
</script>
