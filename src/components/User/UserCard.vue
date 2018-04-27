<template>
  <div
    id="e3"
    style="max-width: 800px; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar color="blue">
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
                <div class="headline">{{item["姓名"]}}</div>
              </v-card-title>
              <v-card-text class="grey--text">{{item["学历"]}}</v-card-text>
              <v-card-actions>
                <v-avatar class="indigo" @click="navigate(item._id)">
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
import UserInfo from "@/components/User/UserInfo.vue";
import { defaultUser } from "@/store/Model/BaseModel";
const nsUser = { namespace: types.nsUser };

@Component({
  components: { UserInfo }
})
export default class UserCard extends Vue {
  // Props
  dialog: boolean = false;
  editing: boolean = false;
  formTitle: string = "人员信息";
  headers: any[];
  editIndex: number = -1;
  // State
  @State("activeItem", nsUser)
  activeItem: object;
  @State("items", nsUser)
  items: any[];
  @State("filterKey") globalFilterKey: string;
  // Getters
  @Getter("itemFiltered", nsUser)
  itemFiltered: any[];
  @Getter("itemKeys", nsUser)
  itemKeys: any[];
  // Mutations
  @Mutation(types.mSetActive, nsUser)
  setActive: Function;
  @Mutation(types.mSetValue, nsUser)
  setValue: Function;
  @Mutation(types.mSetFilter, nsUser)
  setFilter: Function;
  // Actions
  @Action(types.aCreate, nsUser)
  createItem: Function;
  @Action(types.aDelete, nsUser)
  deleteItem: Function;
  @Action(types.aUpdate, nsUser)
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
    this.setActive(defaultUser);
    this.dialog = true;
  }
}
</script>
