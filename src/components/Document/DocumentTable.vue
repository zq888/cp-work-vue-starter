<template>
  <v-layout justify-center>
    <v-flex xs12>
    <v-btn @click="addItem" color="primary" dark slot="activator" class="mb-2">New</v-btn>
    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <DocumentInfo :editing="editing" />
              <v-btn @click="dialog = false">close</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="itemFiltered"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left"
            :key="header.text"
            :autocomplete="props.item[header.text]"
            v-for="header in headers">
            {{ props.item[header.text] }}
        </td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import DocumentInfo from "@/components/Document/DocumentInfo.vue";
import { defaultDocument } from "@/store/Model/BaseModel";
const nsDocument = { namespace: types.nsDocument };

@Component({
  components: { DocumentInfo },
})
export default class DocumentTable extends Vue {
  // Props
  dialog: boolean = false;
  editing: boolean = false;
  formTitle: string = "文书信息";
  headers: any[];
  editIndex: number = -1;
  // State
  @State("activeItem", nsDocument)
  activeItem: object;
  @State("items", nsDocument)
  items: any[];
  @State("filterKey") globalFilterKey: string;
  // Getters
  @Getter("itemFiltered", nsDocument)
  itemFiltered: any[];
  @Getter("itemKeys", nsDocument)
  itemKeys: any[];
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
    this.dialog = false;
    this.editing = false;
    this.headers = [];
  }

  mounted() {
    this.headerBuilder();
  }

  headerBuilder() {
    this.itemKeys.map((key, index) => {
      if (index > 6) return;
      this.headers.push({ text: key, value: key, align: "left" });
    });
  }

  editItem(item: any) {
    this.editing = true;
    this.setActive(item);
    this.dialog = true;
  }

  addItem() {
    this.editing = false;
    this.setActive(defaultDocument);
    this.dialog = true;
  }
}
</script>
