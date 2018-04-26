<template>
  <div
    id="e3"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar color="pink">
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
            v-for="item in items" xs12>
            <v-card 
            color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{item["姓名"]}}</div>
                <div>{{item["学历"]}}</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark @click="navigate(item._id)">Info</v-btn>
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
    this.headers = [
      /* {
         *   text: "姓名",
         *   align: "left",
         *   value: "姓名",
         * },
         * { text: "部门", value: "部门" },
         * { text: "性别", value: "性别" },
         * { text: "民族", value: "民族" },
         * { text: "学历", value: "学历" },
         * { text: "外语语种", value: "外语语种" },
         * { text: "对内身份", value: "对内身份" },
         * { text: "对外身份", value: "对外身份" },
         * { text: "行政级别", value: "行政级别" },
         * { text: "担任工作", value: "担任工作" },*/
    ];
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
