<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card dark color="primary">
                    <v-card-text class="px-0">12</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6 v-for="i in 2" :key="i">
                <v-card dark color="secondary">
                    <v-card-text class="px-0">6</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4 v-for="i in 3" :key="i">
                <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs3 v-for="i in 4" :key="i">
                <v-card dark color="secondary">
                    <v-card-text class="px-0">3</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2 v-for="i in 6" :key="i">
                <v-card dark color="primary">
                    <v-card-text class="px-0">2</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs1 v-for="i in 12" :key="i">
                <v-card dark color="secondary">
                    <v-card-text class="px-0">1</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
export default class UserGrid extends Vue {
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
