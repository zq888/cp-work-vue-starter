<template>
  <v-layout fluid wrap>
    <v-flex xs12 sm4 :key="card.id" v-for="card in cards">
      <v-toolbar color="purple darken-3" dark>
        <v-toolbar-title>
          <a class="white--text">{{card.name}}</a>
        </v-toolbar-title>
      </v-toolbar>
      <form>
            <v-text-field
            name="name"
            :value="card.name"
            required >
            </v-text-field>
            <v-text-field
            name="desc"
            :value="card.desc"
            required >
            </v-text-field>
            <v-text-field
            name="due"
            :value="card.due"
            required >
            </v-text-field>
      </form>
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
  cards: any[];
  // Properties
  checkItemStates: string = "";
  closed: string = "";
  dateLastActivity: string = "";
  desc: string = "";
  descData: string = "";
  due: string = "";
  dueComplete: string = "";
  id: string = "";
  idAttachmentCover: string = "";
  idBoard: string = "";
  idChecklists: string = "";
  idLabels: string = "";
  idList: string = "";
  idMembers: string = "";
  idMembersVoted: string = "";
  idShort: string = "";
  labels: string = "";
  manualCoverAttachment: string = "";
  name: string = "";
  pos: string = "";
  shortLink: string = "";
  shortUrl: string = "";
  subscribed: string = "";
  url: string = "";

  constructor() {
    super();
    this.cards = [];
  }

  created() {
    this.fetch();
  }

  fetch() {
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

  editItem(item: any) {
    // this.editing = true;
    // this.setActive(item);
    // this.navigate({ id: item._id, page: "board", editing: "true" });
    // this.dialog = true;
  }
}
</script>
