<template>
  <div
    id="e3"
    style="width: 90%; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar color="purple">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{$route.params.page}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex            
          :key= "item._id"
            v-for="item in itemFiltered" xs12>
            <v-card 
            color="darken-2" class="black--text">
              <v-card-title primary-title>
                <v-avatar>
                  <img src="https://vuetifyjs.com/static/doc-images/john.jpg" alt="John">
                </v-avatar>
                <div class="headline">{{item["主送机关"]}}</div>
              </v-card-title>
              <v-card-text class="grey--text">{{item["事由"]}}</v-card-text>
              <v-card-actions>
                <v-avatar class="purple lighten-2" @click="navigate(item._id)">
                  <v-icon dark>account_circle</v-icon>
                </v-avatar>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import DocumentInfo from "@/components/Document/DocumentInfo.vue";
import { defaultDocument } from "@/store/Model/BaseModel";
const nsDocument = { namespace: types.nsDocument };

@Component({
  components: { DocumentInfo }
})
export default class DocumentCard extends Vue {
  // Props
  dialog: boolean = false;
  editing: boolean = false;
  formTitle: string = "文档信息";
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
  @Mutation(types.mSetFilter, nsDocument)
  setFilter: Function;
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

  navigate(payload: string) {
    this.$router.push({ path: "/user/profile", params: { id: payload } });
  }

  headerBuilder() {
    this.itemKeys.map((key, index) => {
      if (index > 10) return;
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
