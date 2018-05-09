<template>
  <v-layout fluid wrap color="purple">
    <v-flex xs12 sm12>
        <v-card>
            <v-card-title>
               {{card.name}}
            </v-card-title>
        </v-card>
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
export default class TrelloCard extends Vue {
  // State
  card: any;

  newTodoInputShow: boolean = false;
  newTodo: string = "";

  constructor() {
    super();
    this.card = {};
  }

  created() {
    this.fetch();
  }

  fetch() {
    trello.client.getCard("me", this.$route.params.id, (error: any, result: any[]) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        this.card = result;
      }
    });
  }

  navigate(payload: any) {
    this.$router.push({ name: "trello-page", params: payload });
  }
}
</script>
